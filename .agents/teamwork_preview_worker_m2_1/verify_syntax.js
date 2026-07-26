const fs = require('fs');
const path = require('path');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract script content
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
    console.error('No script tag found!');
    process.exit(1);
}

const scriptCode = scriptMatch[1];
console.log('Extracted script code length:', scriptCode.length);

// Check syntax using Function constructor
try {
    new Function(scriptCode);
    console.log('✅ JS Syntax check PASSED: No syntax errors!');
} catch (e) {
    console.error('❌ JS Syntax Error:', e);
    process.exit(1);
}

// Extract PRODUCTS array text and check for duplicate object keys in each product object
const productsMatch = scriptCode.match(/const PRODUCTS = (\[[\s\S]*?\]);/);
if (!productsMatch) {
    console.error('No PRODUCTS array found!');
    process.exit(1);
}

// Evaluate PRODUCTS in a safe context
const products = eval(productsMatch[1]);
console.log(`✅ Total products parsed: ${products.length}`);

// Check keys per product object in raw text to detect duplicate keys like 'imageUrl:'
const productBlocks = productsMatch[1].split(/\{\s*id:\s*'/);
let duplicateKeyCount = 0;

productBlocks.forEach((block, idx) => {
    if (idx === 0) return;
    const lines = block.split('\n');
    const keyCounts = {};
    lines.forEach(line => {
        const keyMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*:/);
        if (keyMatch) {
            const key = keyMatch[1];
            keyCounts[key] = (keyCounts[key] || 0) + 1;
            if (keyCounts[key] > 1) {
                console.error(`Duplicate key '${key}' found in product block #${idx}`);
                duplicateKeyCount++;
            }
        }
    });
});

if (duplicateKeyCount === 0) {
    console.log('✅ Zero duplicate keys found in PRODUCTS array!');
} else {
    console.error(`❌ Found ${duplicateKeyCount} duplicate keys!`);
    process.exit(1);
}
