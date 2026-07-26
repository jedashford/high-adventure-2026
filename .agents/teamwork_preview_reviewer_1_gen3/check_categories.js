const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

// Match PRODUCTS array
const match = html.match(/const PRODUCTS = (\[[\s\S]*?\n\s*\];)/);
const productsCode = match[1];

const vm = require('vm');
const products = vm.runInNewContext('(' + productsCode.replace(/;\s*$/, '') + ')');

// Extract category keys in PRODUCTS
const productCategories = new Set();
products.forEach(p => productCategories.add(p.category));

console.log('Unique categories in PRODUCTS array:', Array.from(productCategories));

// Test normalization function on all categories in PRODUCTS
function normalizeCategory(cat) {
    return (cat || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
}

const normalizedCategories = Array.from(productCategories).map(cat => ({
    raw: cat,
    normalized: normalizeCategory(cat)
}));

console.log('Normalized Categories:', normalizedCategories);

// Extract CATEGORY_CDN_FALLBACKS keys
const cdnFallbackKeys = html.match(/const CATEGORY_CDN_FALLBACKS = {([\s\S]*?)};/)[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes(':'))
    .map(line => line.split(':')[0].replace(/['"]/g, '').trim());

console.log('Keys in CATEGORY_CDN_FALLBACKS:', cdnFallbackKeys);

// Extract getCategorySvgDataUri keys
const svgKeys = html.match(/const categorySvgs = {([\s\S]*?)};/)[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes(':'))
    .map(line => line.split(':')[0].replace(/['"]/g, '').trim());

console.log('Keys in categorySvgs generator:', svgKeys);

// Verification checks:
let missingFromCdn = [];
let missingFromSvg = [];

normalizedCategories.forEach(c => {
    if (!cdnFallbackKeys.includes(c.normalized)) {
        missingFromCdn.push(c);
    }
    if (!svgKeys.includes(c.normalized)) {
        missingFromSvg.push(c);
    }
});

console.log('\n--- TASK 3 RESULT ---');
console.log('Categories missing from CATEGORY_CDN_FALLBACKS:', missingFromCdn.length);
if (missingFromCdn.length > 0) console.log(missingFromCdn);

console.log('Categories missing from SVG generator:', missingFromSvg.length);
if (missingFromSvg.length > 0) console.log(missingFromSvg);

// Check if all fallback tiers evaluate correctly without breaking or returning undefined
let fallbackFailures = [];
products.forEach(p => {
    const norm = normalizeCategory(p.category);
    
    // Simulate Tier 2 CDN fallback
    const cdnUrl = cdnFallbackKeys.includes(norm);
    // Simulate Tier 3 SVG fallback
    const svgExists = svgKeys.includes(norm);
    
    if (!cdnUrl || !svgExists) {
        fallbackFailures.push({ product: p.id, category: p.category, norm, cdnUrl, svgExists });
    }
});

console.log('Products with unmapped category in Tier 2/3 fallbacks:', fallbackFailures.length);
if (fallbackFailures.length > 0) console.log(fallbackFailures);

// Test edge cases: empty category, spaced category, hypenated category, mixed case category
const edgeCases = ['Sleeping Bags', 'sleeping-pads', ' Poles & Chairs ', 'ELECTRONICS', 'unknown_cat', '', null];
console.log('\nEdge case normalization test:');
edgeCases.forEach(ec => {
    const norm = normalizeCategory(ec);
    const hasCdn = cdnFallbackKeys.includes(norm);
    const hasSvg = svgKeys.includes(norm);
    console.log(`Input: "${ec}" -> Normalized: "${norm}" | CDN match: ${hasCdn} | SVG match: ${hasSvg}`);
});
