const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract the PRODUCTS array text
const startIdx = content.indexOf('const PRODUCTS = [');
if (startIdx === -1) {
    console.error("FAIL: Could not find 'const PRODUCTS = [' in HTML");
    process.exit(1);
}

// Find matching bracket for PRODUCTS array
let openCount = 0;
let endIdx = -1;
for (let i = startIdx + 17; i < content.length; i++) {
    if (content[i] === '[') openCount++;
    if (content[i] === ']') {
        if (openCount === 0) {
            endIdx = i + 1;
            break;
        }
        openCount--;
    }
}

const productsArrayText = content.substring(startIdx + 17, endIdx);

// Inspect each product block for duplicate keys in raw source text
// Split products by `{` and `}`
const objectBlocks = [];
let blockStart = -1;
let braceDepth = 0;

for (let i = 0; i < productsArrayText.length; i++) {
    if (productsArrayText[i] === '{') {
        if (braceDepth === 0) blockStart = i;
        braceDepth++;
    } else if (productsArrayText[i] === '}') {
        braceDepth--;
        if (braceDepth === 0 && blockStart !== -1) {
            objectBlocks.push({
                text: productsArrayText.substring(blockStart, i + 1),
                index: objectBlocks.length + 1
            });
            blockStart = -1;
        }
    }
}

console.log(`Auditing ${objectBlocks.length} JS product objects...`);

let totalDuplicates = 0;
const report = [];

objectBlocks.forEach((obj, idx) => {
    // Match all object key names (e.g. `id:`, `imageUrl:`, `name:`, etc.)
    const keys = [];
    const lines = obj.text.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:/);
        if (match) {
            keys.push(match[1]);
        }
    });

    // Check for duplicate keys
    const keyCounts = {};
    keys.forEach(k => keyCounts[k] = (keyCounts[k] || 0) + 1);

    const duplicates = Object.keys(keyCounts).filter(k => keyCounts[k] > 1);
    const idMatch = obj.text.match(/id:\s*['"]([^'"]+)['"]/);
    const productId = idMatch ? idMatch[1] : `Object #${idx+1}`;

    if (duplicates.length > 0) {
        totalDuplicates += duplicates.length;
        report.push({
            index: idx + 1,
            id: productId,
            duplicateKeys: duplicates,
            counts: duplicates.map(k => `${k}: ${keyCounts[k]}`)
        });
    }
});

console.log("\n=== AST / SOURCE OBJECT KEY UNIQUENESS RESULT ===");
if (totalDuplicates === 0) {
    console.log(`✅ PASS: Audited ${objectBlocks.length} products. 0 duplicate object keys found!`);
} else {
    console.log(`❌ FAIL: Found ${totalDuplicates} duplicate keys across products:`);
    console.log(JSON.stringify(report, null, 2));
}
