const fs = require('fs');
const https = require('https');
const http = require('http');

const filePath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(filePath, 'utf-8');

// Step 1: Extract complete PRODUCTS array
const startIdx = content.indexOf('const PRODUCTS = [');
if (startIdx === -1) {
    console.error("Could not find 'const PRODUCTS = ['");
    process.exit(1);
}

const endIdx = content.indexOf('];', startIdx);
if (endIdx === -1) {
    console.error("Could not find ending '];'");
    process.exit(1);
}

const productsCode = content.substring(startIdx + 'const PRODUCTS = '.length, endIdx + 1);

let PRODUCTS;
try {
    PRODUCTS = eval(`(${productsCode})`);
    console.log(`Successfully evaluated complete PRODUCTS array. Total products: ${PRODUCTS.length}`);
} catch (e) {
    console.error("Error evaluating PRODUCTS code:", e);
    process.exit(1);
}

// Step 2: Check for duplicate product IDs
const idCounts = {};
PRODUCTS.forEach((p, idx) => {
    if (!p.id) {
        console.error(`Product at index ${idx} missing ID!`);
        return;
    }
    idCounts[p.id] = (idCounts[p.id] || 0) + 1;
});
const duplicateIds = Object.entries(idCounts).filter(([id, count]) => count > 1);

// Step 3: Check for duplicate keys in object literals
function scanDuplicateKeysInJS(src) {
    let inString = false;
    let stringChar = '';
    let inLineComment = false;
    let inBlockComment = false;

    const objectStack = [];
    const duplicatesFound = [];

    for (let i = 0; i < src.length; i++) {
        const char = src[i];
        const nextChar = i < src.length - 1 ? src[i + 1] : '';
        const prevChar = i > 0 ? src[i - 1] : '';

        if (inLineComment) {
            if (char === '\n') inLineComment = false;
            continue;
        }
        if (!inString && !inBlockComment && char === '/' && nextChar === '/') {
            inLineComment = true;
            i++;
            continue;
        }

        if (inBlockComment) {
            if (char === '*' && nextChar === '/') {
                inBlockComment = false;
                i++;
            }
            continue;
        }
        if (!inString && !inLineComment && char === '/' && nextChar === '*') {
            inBlockComment = true;
            i++;
            continue;
        }

        if (!inString && (char === '"' || char === "'" || char === '`')) {
            inString = true;
            stringChar = char;
            continue;
        }
        if (inString) {
            if (char === stringChar && prevChar !== '\\') {
                inString = false;
            }
            continue;
        }

        if (char === '{') {
            objectStack.push({ keys: new Set(), lastKey: null });
            continue;
        }

        if (char === '}') {
            objectStack.pop();
            continue;
        }

        if (objectStack.length > 0) {
            const currentObj = objectStack[objectStack.length - 1];
            if (char === ':') {
                let keyStr = '';
                let j = i - 1;
                while (j >= 0 && /\s/.test(src[j])) j--;
                
                if (src[j] === '\'' || src[j] === '"') {
                    const q = src[j];
                    j--;
                    while (j >= 0 && src[j] !== q) {
                        keyStr = src[j] + keyStr;
                        j--;
                    }
                } else {
                    while (j >= 0 && /[a-zA-Z0-9_$]/.test(src[j])) {
                        keyStr = src[j] + keyStr;
                        j--;
                    }
                }

                if (keyStr) {
                    if (currentObj.keys.has(keyStr)) {
                        duplicatesFound.push({
                            objectDepth: objectStack.length,
                            key: keyStr,
                            position: i
                        });
                    } else {
                        currentObj.keys.add(keyStr);
                    }
                }
            }
        }
    }

    return duplicatesFound;
}

const duplicateKeysFound = scanDuplicateKeysInJS(productsCode);

// Step 4: Extract image URLs from all 50 products
const imageEntries = PRODUCTS.map((p, idx) => ({
    index: idx + 1,
    id: p.id,
    name: p.name,
    category: p.category,
    categoryName: p.categoryName,
    image: p.imageUrl || p.image
}));

// Step 5: Check URL validity via HTTP HEAD/GET
function checkUrl(entry) {
    return new Promise((resolve) => {
        const urlStr = entry.image;
        if (!urlStr) {
            resolve({
                ...entry,
                status: 'MISSING_URL',
                statusCode: 0,
                contentType: 'N/A',
                isHttps: false,
                error: 'Image URL is missing or empty'
            });
            return;
        }

        let urlObj;
        try {
            urlObj = new URL(urlStr);
        } catch (err) {
            resolve({
                ...entry,
                status: 'INVALID_URL',
                statusCode: 0,
                contentType: 'N/A',
                isHttps: false,
                error: err.message
            });
            return;
        }

        const isHttps = urlObj.protocol === 'https:';

        const makeRequest = (method, currentUrl, redirectCount = 0) => {
            if (redirectCount > 5) {
                resolve({
                    ...entry,
                    status: 'TOO_MANY_REDIRECTS',
                    statusCode: 302,
                    contentType: 'N/A',
                    isHttps,
                    error: 'Too many redirects'
                });
                return;
            }

            const client = currentUrl.startsWith('https:') ? https : http;
            const req = client.request(currentUrl, {
                method,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
                }
            }, (res) => {
                const statusCode = res.statusCode;
                const contentType = res.headers['content-type'] || 'N/A';

                if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
                    const redirectUrl = new URL(res.headers.location, currentUrl).toString();
                    makeRequest(method, redirectUrl, redirectCount + 1);
                    return;
                }

                if ((statusCode === 405 || statusCode === 403 || statusCode === 400) && method === 'HEAD') {
                    makeRequest('GET', currentUrl, redirectCount);
                    return;
                }

                res.on('data', () => {});
                res.on('end', () => {
                    const isImageContentType = contentType.toLowerCase().includes('image/') || contentType.toLowerCase().includes('octet-stream');
                    const isSuccess = statusCode === 200;
                    resolve({
                        ...entry,
                        finalUrl: currentUrl,
                        status: isSuccess ? 'OK' : 'HTTP_ERROR',
                        statusCode,
                        contentType,
                        isValidContentType: isImageContentType,
                        isHttps,
                        error: isSuccess ? null : `HTTP status ${statusCode}`
                    });
                });
            });

            req.on('error', (err) => {
                if (method === 'HEAD') {
                    makeRequest('GET', currentUrl, redirectCount);
                } else {
                    resolve({
                        ...entry,
                        status: 'NETWORK_ERROR',
                        statusCode: 0,
                        contentType: 'N/A',
                        isHttps,
                        error: err.message
                    });
                }
            });

            req.setTimeout(12000, () => {
                req.destroy();
                resolve({
                    ...entry,
                    status: 'TIMEOUT',
                    statusCode: 0,
                    contentType: 'N/A',
                    isHttps,
                    error: 'Request timed out after 12s'
                });
            });

            req.end();
        };

        makeRequest('HEAD', urlStr);
    });
}

async function runAudit() {
    console.log(`Starting automated URL validation on 100% of PRODUCTS image URLs (${imageEntries.length} items)...`);
    const results = [];
    const batchSize = 5;
    for (let i = 0; i < imageEntries.length; i += batchSize) {
        const batch = imageEntries.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(entry => checkUrl(entry)));
        results.push(...batchResults);
        batchResults.forEach(res => {
            console.log(`[${res.index}/${imageEntries.length}] ${res.id} (${res.category}) => Status: ${res.statusCode}, Type: ${res.contentType}, HTTPS: ${res.isHttps}`);
        });
    }

    const summary = {
        totalProducts: PRODUCTS.length,
        totalUrlsTested: imageEntries.length,
        status200Count: results.filter(r => r.statusCode === 200).length,
        status404Count: results.filter(r => r.statusCode === 404).length,
        otherErrorCount: results.filter(r => r.statusCode !== 200 && r.statusCode !== 404).length,
        validContentTypeCount: results.filter(r => r.isValidContentType).length,
        secureHttpsCount: results.filter(r => r.isHttps).length,
        brokenLinksCount: results.filter(r => r.statusCode !== 200 || !r.isValidContentType).length,
        duplicateProductIds: duplicateIds,
        duplicateKeysFoundCount: duplicateKeysFound.length
    };

    console.log("\n=== AUDIT SUMMARY ===");
    console.log(JSON.stringify(summary, null, 2));

    fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_2_gen2/audit_results_50.json', JSON.stringify({ summary, results, duplicateIds, duplicateKeysFound }, null, 2));
}

runAudit();
