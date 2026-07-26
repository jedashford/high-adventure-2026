const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

// Match PRODUCTS array
const match = html.match(/const PRODUCTS = (\[[\s\S]*?\n\s*\];)/);
if (!match) {
    console.error('Could not match PRODUCTS array!');
    process.exit(1);
}

const productsCode = match[1];

// Evaluate in VM to check runtime object structure
const vm = require('vm');
const productsObj = vm.runInNewContext('(' + productsCode.replace(/;\s*$/, '') + ')');

console.log('Total products evaluated:', productsObj.length);

// Now parse source text of each product object to find duplicate key declarations (AST check)
let braceDepth = 0;
let inString = false;
let stringChar = '';
let currentObjectStr = '';
let objectsStr = [];

for (let i = 0; i < productsCode.length; i++) {
    const ch = productsCode[i];
    const prev = i > 0 ? productsCode[i-1] : '';
    
    if (inString) {
        currentObjectStr += ch;
        if (ch === stringChar && prev !== '\\') {
            inString = false;
        }
        continue;
    }
    
    if (ch === "'" || ch === '"' || ch === '`') {
        inString = true;
        stringChar = ch;
        currentObjectStr += ch;
        continue;
    }
    
    if (ch === '{') {
        if (braceDepth === 0) {
            currentObjectStr = '{';
        } else {
            currentObjectStr += ch;
        }
        braceDepth++;
    } else if (ch === '}') {
        braceDepth--;
        currentObjectStr += ch;
        if (braceDepth === 0) {
            objectsStr.push(currentObjectStr);
            currentObjectStr = '';
        }
    } else if (braceDepth > 0) {
        currentObjectStr += ch;
    }
}

console.log('Extracted top-level product object strings count:', objectsStr.length);

let duplicateReport = [];
let allKeysPerProduct = [];

objectsStr.forEach((objStr, index) => {
    const lines = objStr.split('\n');
    let keyCounts = {};
    let id = '';
    
    lines.forEach(line => {
        let trimmed = line.trim();
        let m = trimmed.match(/^([a-zA-Z0-9_$]+)\s*:/);
        if (m) {
            let key = m[1];
            if (key === 'id') {
                let idMatch = trimmed.match(/id:\s*['"]([^'"]+)['"]/);
                if (idMatch) id = idMatch[1];
            }
            keyCounts[key] = (keyCounts[key] || 0) + 1;
        }
    });

    let duplicates = Object.keys(keyCounts).filter(k => keyCounts[k] > 1);
    if (duplicates.length > 0) {
        duplicateReport.push({ index, id, duplicates, keyCounts });
    }
    allKeysPerProduct.push({ id, keys: Object.keys(keyCounts) });
});

console.log('--- TASK 1 RESULT ---');
console.log('Total Product Objects:', objectsStr.length);
console.log('Products with duplicate keys:', duplicateReport.length);
if (duplicateReport.length > 0) {
    console.log('DUPLICATE KEYS FOUND:', JSON.stringify(duplicateReport, null, 2));
} else {
    console.log('VERIFIED: 0 duplicate keys across all 50 product objects (0 duplicate imageUrl: keys).');
}

// Additional check: verify all products have mandatory fields
const requiredFields = ['id', 'imageUrl', 'name', 'brand', 'category', 'categoryName', 'msrp', 'currentPrice'];
let missingFields = [];
productsObj.forEach((p, idx) => {
    requiredFields.forEach(field => {
        if (p[field] === undefined || p[field] === null) {
            missingFields.push({ index: idx, id: p.id, missingField: field });
        }
    });
});

console.log('Missing mandatory fields count:', missingFields.length);
if (missingFields.length > 0) {
    console.log('Missing fields:', missingFields);
}
