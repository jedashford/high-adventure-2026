const fs = require('fs');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const scriptCode = html.match(/<script>([\s\S]*?)<\/script>/i)[1];

const mockDoc = { 
    addEventListener: () => {}, 
    getElementById: () => ({ addEventListener: () => {} }), 
    querySelectorAll: () => [] 
};
const ctx = vm.createContext({ document: mockDoc, window: {}, console: console });
vm.runInContext(scriptCode + '; window.PRODUCTS = PRODUCTS;', ctx);

const PRODUCTS = ctx.window.PRODUCTS;

console.log('=== CHECK 3: DATA MODEL & MATH INTEGRITY ===');
console.log(`Total Products Count: ${PRODUCTS.length}`);

// 1. Categories
const categoriesMap = {};
PRODUCTS.forEach(p => {
    categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
});
const categories = Object.keys(categoriesMap);
console.log(`Distinct Categories Count: ${categories.length}`);
console.log('Categories distribution:', categoriesMap);

// 2. Profiles
const profilesMap = { adult: 0, youth: 0, ultralight: 0, budget: 0 };
const allObservedProfiles = new Set();
PRODUCTS.forEach(p => {
    if (Array.isArray(p.profiles)) {
        p.profiles.forEach(prof => {
            allObservedProfiles.add(prof);
            if (profilesMap[prof] !== undefined) {
                profilesMap[prof]++;
            }
        });
    }
});
console.log('Observed profile tags:', Array.from(allObservedProfiles));
console.log('Profiles distribution:', profilesMap);

// 3. Discount Math Verification
let discountMathFailures = [];
PRODUCTS.forEach(p => {
    const computedDiscount = Math.round(((p.msrp - p.currentPrice) / p.msrp) * 100);
    if (p.discountPercent !== computedDiscount) {
        discountMathFailures.push({
            id: p.id,
            name: p.name,
            msrp: p.msrp,
            currentPrice: p.currentPrice,
            stated: p.discountPercent,
            computed: computedDiscount,
            diff: Math.abs(p.discountPercent - computedDiscount)
        });
    }
});

console.log(`Discount Math Failures: ${discountMathFailures.length}`);
if (discountMathFailures.length > 0) {
    console.log('Discount Math Failures Detail:', JSON.stringify(discountMathFailures, null, 2));
}

// 4. Authenticity Checks
let priceHistoryCheck = { pass: 0, fail: 0, details: [] };
let specsCheck = { pass: 0, fail: 0, details: [] };
let ratingsCheck = { pass: 0, fail: 0, details: [] };
let prosConsCheck = { pass: 0, fail: 0, details: [] };
let verdictCheck = { pass: 0, fail: 0, details: [] };

PRODUCTS.forEach(p => {
    // Price history
    if (Array.isArray(p.priceHistory) && p.priceHistory.length >= 2 && p.priceHistory.every(ph => typeof ph === 'number' && ph > 0)) {
        priceHistoryCheck.pass++;
    } else {
        priceHistoryCheck.fail++;
        priceHistoryCheck.details.push(p.id);
    }

    // Specs
    if (p.specs && typeof p.specs === 'object' && Object.keys(p.specs).length >= 2) {
        specsCheck.pass++;
    } else {
        specsCheck.fail++;
        specsCheck.details.push(p.id);
    }

    // Rating
    if (typeof p.rating === 'number' && p.rating >= 1.0 && p.rating <= 5.0) {
        ratingsCheck.pass++;
    } else {
        ratingsCheck.fail++;
        ratingsCheck.details.push(p.id);
    }

    // Pros & Cons
    if (Array.isArray(p.pros) && p.pros.length > 0 && Array.isArray(p.cons) && p.cons.length > 0) {
        prosConsCheck.pass++;
    } else {
        prosConsCheck.fail++;
        prosConsCheck.details.push(p.id);
    }

    // Verdict
    if (typeof p.verdict === 'string' && p.verdict.trim().length > 10) {
        verdictCheck.pass++;
    } else {
        verdictCheck.fail++;
        verdictCheck.details.push(p.id);
    }
});

console.log('\n--- Authentic Content Verification ---');
console.log(`Price History Array check: ${priceHistoryCheck.pass}/38 pass, ${priceHistoryCheck.fail} fail`);
console.log(`Specs Object check: ${specsCheck.pass}/38 pass, ${specsCheck.fail} fail`);
console.log(`Ratings (1-5 range) check: ${ratingsCheck.pass}/38 pass, ${ratingsCheck.fail} fail`);
console.log(`Pros & Cons Arrays check: ${prosConsCheck.pass}/38 pass, ${prosConsCheck.fail} fail`);
console.log(`Verdict Text check: ${verdictCheck.pass}/38 pass, ${verdictCheck.fail} fail`);
