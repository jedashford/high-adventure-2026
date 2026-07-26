const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const productsStartIndex = htmlContent.indexOf('const PRODUCTS = [');
if (productsStartIndex === -1) {
    console.error('Could not find const PRODUCTS = [');
    process.exit(1);
}

const categoriesStartIndex = htmlContent.indexOf('const CATEGORIES = [', productsStartIndex);
if (categoriesStartIndex === -1) {
    console.error('Could not find const CATEGORIES = [');
    process.exit(1);
}

// Slice from 'const PRODUCTS = [' up to 'const CATEGORIES = ['
let productsJs = htmlContent.slice(productsStartIndex, categoriesStartIndex);
productsJs = productsJs.replace('const PRODUCTS =', 'var PRODUCTS =');

const context = {};
vm.createContext(context);
try {
    vm.runInContext(productsJs, context);
} catch (e) {
    console.error('VM execution error:', e);
    process.exit(1);
}

const PRODUCTS = context.PRODUCTS;

// Also extract CATEGORIES
const categoriesEndIndex = htmlContent.indexOf('];', categoriesStartIndex);
let categoriesJs = htmlContent.slice(categoriesStartIndex, categoriesEndIndex + 2);
categoriesJs = categoriesJs.replace('const CATEGORIES =', 'var CATEGORIES =');
try {
    vm.runInContext(categoriesJs, context);
} catch (e) {
    console.error('VM categories execution error:', e);
}

const CATEGORIES = context.CATEGORIES || [];

console.log(`Successfully extracted ${PRODUCTS.length} products and ${CATEGORIES.length} categories.\n`);

const requiredFields = [
    'id', 'name', 'brand', 'category', 'profiles', 'msrp', 'currentPrice',
    'discountPercent', 'rating', 'reviewCount', 'weightOz', 'weightDisplay',
    'dealBadge', 'valueRating', 'specs', 'priceHistory', 'pros', 'cons', 'verdict'
];

const results = {
    totalProducts: PRODUCTS.length,
    missingFields: [],
    invalidFieldTypes: [],
    discountMismatches: [],
    invalidPriceHistories: [],
    profileCounts: { adult: 0, youth: 0, ultralight: 0, budget: 0 },
    otherProfileCounts: {},
    invalidProfiles: [],
    categoryStats: {},
    specIssues: [],
    prosConsIssues: [],
    valueRatingStats: { min: Infinity, max: -Infinity, list: [] }
};

PRODUCTS.forEach((product, idx) => {
    const id = product.id || `index_${idx}`;
    
    // 1. Field presence check
    requiredFields.forEach(field => {
        if (!(field in product) || product[field] === undefined || product[field] === null) {
            results.missingFields.push({ id, field });
        }
    });

    // Check specific types
    if (typeof product.id !== 'string') results.invalidFieldTypes.push({ id, field: 'id', val: product.id });
    if (typeof product.name !== 'string') results.invalidFieldTypes.push({ id, field: 'name', val: product.name });
    if (typeof product.brand !== 'string') results.invalidFieldTypes.push({ id, field: 'brand', val: product.brand });
    if (typeof product.category !== 'string') results.invalidFieldTypes.push({ id, field: 'category', val: product.category });
    if (!Array.isArray(product.profiles)) results.invalidFieldTypes.push({ id, field: 'profiles', val: product.profiles });
    if (typeof product.msrp !== 'number') results.invalidFieldTypes.push({ id, field: 'msrp', val: product.msrp });
    if (typeof product.currentPrice !== 'number') results.invalidFieldTypes.push({ id, field: 'currentPrice', val: product.currentPrice });
    if (typeof product.discountPercent !== 'number') results.invalidFieldTypes.push({ id, field: 'discountPercent', val: product.discountPercent });
    if (typeof product.rating !== 'number') results.invalidFieldTypes.push({ id, field: 'rating', val: product.rating });
    if (typeof product.reviewCount !== 'number') results.invalidFieldTypes.push({ id, field: 'reviewCount', val: product.reviewCount });
    if (typeof product.weightOz !== 'number') results.invalidFieldTypes.push({ id, field: 'weightOz', val: product.weightOz });
    if (typeof product.weightDisplay !== 'string') results.invalidFieldTypes.push({ id, field: 'weightDisplay', val: product.weightDisplay });
    if (typeof product.dealBadge !== 'string') results.invalidFieldTypes.push({ id, field: 'dealBadge', val: product.dealBadge });
    if (typeof product.valueRating !== 'number') results.invalidFieldTypes.push({ id, field: 'valueRating', val: product.valueRating });
    if (typeof product.specs !== 'object' || product.specs === null || Array.isArray(product.specs)) results.invalidFieldTypes.push({ id, field: 'specs', val: product.specs });
    if (!Array.isArray(product.priceHistory)) results.invalidFieldTypes.push({ id, field: 'priceHistory', val: product.priceHistory });
    if (!Array.isArray(product.pros)) results.invalidFieldTypes.push({ id, field: 'pros', val: product.pros });
    if (!Array.isArray(product.cons)) results.invalidFieldTypes.push({ id, field: 'cons', val: product.cons });
    if (typeof product.verdict !== 'string') results.invalidFieldTypes.push({ id, field: 'verdict', val: product.verdict });

    // 2. Discount calculation: round((msrp - currentPrice) / msrp * 100)
    if (typeof product.msrp === 'number' && typeof product.currentPrice === 'number' && product.msrp > 0) {
        const expectedDiscount = Math.round(((product.msrp - product.currentPrice) / product.msrp) * 100);
        if (product.discountPercent !== expectedDiscount) {
            results.discountMismatches.push({
                id,
                name: product.name,
                msrp: product.msrp,
                currentPrice: product.currentPrice,
                storedDiscount: product.discountPercent,
                calculatedDiscount: expectedDiscount,
                diff: product.discountPercent - expectedDiscount
            });
        }
    }

    // 3. Price history validation
    if (Array.isArray(product.priceHistory)) {
        if (product.priceHistory.length === 0) {
            results.invalidPriceHistories.push({ id, reason: 'empty array' });
        } else {
            const nonNumbers = product.priceHistory.filter(p => typeof p !== 'number' || isNaN(p) || p <= 0);
            if (nonNumbers.length > 0) {
                results.invalidPriceHistories.push({ id, reason: 'invalid numeric entries', nonNumbers });
            }
        }
    }

    // 4. Profiles population
    if (Array.isArray(product.profiles)) {
        const knownProfiles = ['adult', 'youth', 'ultralight', 'budget'];
        product.profiles.forEach(prof => {
            if (knownProfiles.includes(prof)) {
                results.profileCounts[prof]++;
            } else {
                results.otherProfileCounts[prof] = (results.otherProfileCounts[prof] || 0) + 1;
                results.invalidProfiles.push({ id, profile: prof });
            }
        });
    }

    // 5. Category stats & specs / pros / cons
    const cat = product.category || 'unknown';
    if (!results.categoryStats[cat]) {
        results.categoryStats[cat] = { count: 0, products: [] };
    }
    results.categoryStats[cat].count++;
    results.categoryStats[cat].products.push(id);

    if (product.specs && typeof product.specs === 'object') {
        const keys = Object.keys(product.specs);
        if (keys.length === 0) {
            results.specIssues.push({ id, reason: 'empty specs object' });
        }
    }
    if (!Array.isArray(product.pros) || product.pros.length === 0) {
        results.prosConsIssues.push({ id, field: 'pros', reason: 'empty or missing pros' });
    }
    if (!Array.isArray(product.cons) || product.cons.length === 0) {
        results.prosConsIssues.push({ id, field: 'cons', reason: 'empty or missing cons' });
    }

    // Value rating stats
    if (typeof product.valueRating === 'number') {
        if (product.valueRating < results.valueRatingStats.min) results.valueRatingStats.min = product.valueRating;
        if (product.valueRating > results.valueRatingStats.max) results.valueRatingStats.max = product.valueRating;
        results.valueRatingStats.list.push({ id, val: product.valueRating });
    }
});

console.log('=== VERIFICATION SUMMARY ===');
console.log(`Total Products: ${results.totalProducts}`);
console.log(`Missing Required Fields: ${results.missingFields.length}`);
console.log(`Invalid Field Types: ${results.invalidFieldTypes.length}`);
console.log(`Discount Mismatches: ${results.discountMismatches.length}`);
console.log(`Invalid Price Histories: ${results.invalidPriceHistories.length}`);
console.log('Profile Counts:', JSON.stringify(results.profileCounts, null, 2));
console.log('Other Profiles:', JSON.stringify(results.otherProfileCounts, null, 2));
console.log(`Invalid Profiles: ${results.invalidProfiles.length}`);
console.log(`Categories Found (${Object.keys(results.categoryStats).length}):`, Object.keys(results.categoryStats));
console.log(`Spec Issues: ${results.specIssues.length}`);
console.log(`Pros/Cons Issues: ${results.prosConsIssues.length}`);
console.log(`Value Rating Range: ${results.valueRatingStats.min} to ${results.valueRatingStats.max}\n`);

if (results.missingFields.length > 0) {
    console.log('--- Missing Fields ---');
    console.log(JSON.stringify(results.missingFields, null, 2));
}

if (results.discountMismatches.length > 0) {
    console.log('--- Discount Mismatches ---');
    console.log(JSON.stringify(results.discountMismatches, null, 2));
}

if (results.invalidPriceHistories.length > 0) {
    console.log('--- Invalid Price Histories ---');
    console.log(JSON.stringify(results.invalidPriceHistories, null, 2));
}

if (results.specIssues.length > 0 || results.prosConsIssues.length > 0) {
    console.log('--- Spec/Pros/Cons Issues ---');
    console.log('Spec Issues:', JSON.stringify(results.specIssues, null, 2));
    console.log('Pros/Cons Issues:', JSON.stringify(results.prosConsIssues, null, 2));
}

console.log('--- Category Breakdown ---');
Object.keys(results.categoryStats).forEach(cat => {
    console.log(`Category: ${cat} (${results.categoryStats[cat].count} products)`);
});

fs.writeFileSync(
    path.join(__dirname, 'verification_results.json'),
    JSON.stringify(results, null, 2)
);
