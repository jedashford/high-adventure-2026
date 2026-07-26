const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const https = require('https');
const { chromium } = require('playwright');

const HTML_PATH = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';

async function verifyRemediation() {
    console.log('=== WORKER 3 REMEDIATION VERIFICATION ===\n');

    const htmlContent = fs.readFileSync(HTML_PATH, 'utf8');

    // 1. Parse PRODUCTS array using VM
    const startIdx = htmlContent.indexOf('const PRODUCTS = [');
    if (startIdx === -1) {
        throw new Error('Could not find const PRODUCTS = [ in HTML file');
    }
    const endIdx = htmlContent.indexOf('];', startIdx);
    if (endIdx === -1) {
        throw new Error('Could not find end of PRODUCTS array in HTML file');
    }

    const productsCode = htmlContent.slice(startIdx, endIdx + 2);
    const sandbox = {};
    const products = vm.runInNewContext(productsCode.replace('const PRODUCTS =', 'var PRODUCTS =') + '\nPRODUCTS;', sandbox);

    console.log(`[Check 1: Product Count] Parsed PRODUCTS count: ${products.length}`);
    if (!products || products.length !== 50) {
        throw new Error(`Expected 50 products, but found ${products ? products.length : 0}`);
    }
    console.log('  ✅ PASS: Exactly 50 products parsed.\n');

    // 2. Verify 0 duplicate imageUrl: keys across the 50 product objects in source
    console.log('[Check 2: Duplicate imageUrl Keys & Object Key Uniqueness]');
    const rawProductsBlock = productsCode.slice(productsCode.indexOf('['), productsCode.lastIndexOf(']') + 1);
    
    let depth = 0;
    let inArray = false;
    let currentBlock = [];
    const objectBlocks = [];

    for (let i = 0; i < rawProductsBlock.length; i++) {
        const char = rawProductsBlock[i];
        if (char === '[') {
            if (!inArray) {
                inArray = true;
                continue;
            }
        }
        if (inArray) {
            if (char === '{') {
                if (depth === 0) currentBlock = [];
                depth++;
            }
            if (depth > 0) {
                currentBlock.push(char);
            }
            if (char === '}') {
                depth--;
                if (depth === 0 && currentBlock.length > 0) {
                    objectBlocks.push(currentBlock.join(''));
                    currentBlock = [];
                }
            }
        }
    }

    console.log(`  Extracted ${objectBlocks.length} product object code blocks.`);
    if (objectBlocks.length !== 50) {
        throw new Error(`Expected 50 object code blocks, but extracted ${objectBlocks.length}`);
    }

    let duplicateKeyCount = 0;
    objectBlocks.forEach((block, idx) => {
        const matches = block.match(/^\s*imageUrl\s*:/gm);
        if (matches && matches.length > 1) {
            console.error(`  ❌ Duplicate imageUrl key found in product block index ${idx} (id: ${products[idx].id})`);
            duplicateKeyCount++;
        }
    });

    if (duplicateKeyCount > 0) {
        throw new Error(`Found ${duplicateKeyCount} duplicate imageUrl keys!`);
    }
    console.log('  ✅ PASS: 0 duplicate imageUrl: keys found across all 50 products.\n');

    // 3. Test all 50 product imageUrls via HTTP GET request for HTTP 200 status
    console.log('[Check 3: HTTP Network Request Status for 50 Product Image URLs]');
    const fetchUrlStatus = (url) => {
        return new Promise((resolve) => {
            const client = url.startsWith('https') ? https : http;
            const req = client.request(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            }, (res) => {
                resolve({ status: res.statusCode, finalUrl: res.headers.location || url });
            });
            req.on('error', (err) => resolve({ status: 0, error: err.message }));
            req.setTimeout(8000, () => {
                req.destroy();
                resolve({ status: 408, error: 'Timeout' });
            });
            req.end();
        });
    };

    let httpFailures = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const res = await fetchUrlStatus(p.imageUrl);
        if (res.status !== 200) {
            console.error(`  ❌ Failed Product ${i + 1}/${products.length} [${p.id}]: Status ${res.status} | URL: ${p.imageUrl}`);
            httpFailures++;
        } else {
            console.log(`  [${i + 1}/50] HTTP 200 OK: ${p.id} -> ${p.imageUrl.substring(0, 65)}...`);
        }
    }

    if (httpFailures > 0) {
        throw new Error(`HTTP Check Failed: ${httpFailures} product image URLs failed with non-200 status!`);
    }
    console.log('  ✅ PASS: 100% of 50 product image URLs returned HTTP 200 OK.\n');

    // 4. Playwright Headless Chromium DOM Inspection
    console.log('[Check 4: Playwright Headless Chromium DOM Inspection]');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`  Navigating to file://${HTML_PATH}`);
    await page.goto(`file://${HTML_PATH}`, { waitUntil: 'load' });

    // Scroll to bottom to trigger any lazy loading
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    window.scrollTo(0, 0);
                    resolve();
                }
            }, 50);
        });
    });

    // Short pause to ensure image rendering completes
    await page.waitForTimeout(1000);

    const imgElements = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map((img, i) => ({
            index: i,
            id: img.id || '(no id)',
            src: img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
        }));
    });

    console.log(`  Total DOM <img> elements inspected: ${imgElements.length}`);

    let brokenDomImgs = 0;
    imgElements.forEach((img) => {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.error(`  ❌ 0x0 Image found in DOM: index ${img.index}, id="${img.id}", src="${img.src.substring(0, 80)}"`);
            brokenDomImgs++;
        }
    });

    await browser.close();

    if (brokenDomImgs > 0) {
        throw new Error(`DOM Inspection Failed: ${brokenDomImgs} images have naturalWidth/naturalHeight equal to 0!`);
    }

    console.log(`  ✅ PASS: 100% of ${imgElements.length} DOM <img> elements rendered with naturalWidth > 0 and naturalHeight > 0.\n`);

    console.log('=== ALL 4 INTEGRITY REMEDIATION CHECKS PASSED SUCCESSFULLY ===');
}

verifyRemediation().catch((err) => {
    console.error('\n🔴 VERIFICATION FAILED:', err.message);
    process.exit(1);
});
