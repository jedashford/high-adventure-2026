const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

// Helper to compute relative luminance and contrast ratio (WCAG 2.1)
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return [ (num >> 16) & 255, (num >> 8) & 255, num & 255 ];
}

function getLuminance([r, g, b]) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hexToRgb(hex1));
    const lum2 = getLuminance(hexToRgb(hex2));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

console.log('--- 1. WCAG 2.1 AA COLOR CONTRAST RATIO AUDIT ---');

const colorPairs = [
    // Badges vs Badge BGs
    { name: 'Adult Badge (text #ffffff on bg #1d4ed8)', fg: '#ffffff', bg: '#1d4ed8' },
    { name: 'Youth Badge (text #ffffff on bg #be185d)', fg: '#ffffff', bg: '#be185d' },
    { name: 'Ultralight Badge (text #ffffff on bg #047857)', fg: '#ffffff', bg: '#047857' },
    { name: 'Budget Badge (text #ffffff on bg #b45309)', fg: '#ffffff', bg: '#b45309' },
    { name: 'Both Badge (text #ffffff on bg #6d28d9)', fg: '#ffffff', bg: '#6d28d9' },
    { name: 'Deal Badge (text #ffffff on bg #065f46)', fg: '#ffffff', bg: '#065f46' },

    // Primary Page Theme
    { name: 'Primary Text (#f8fafc) on Page BG (#0f172a)', fg: '#f8fafc', bg: '#0f172a' },
    { name: 'Primary Text (#f8fafc) on Card BG (#1e293b)', fg: '#f8fafc', bg: '#1e293b' },
    { name: 'Secondary Text (#cbd5e1) on Card BG (#1e293b)', fg: '#cbd5e1', bg: '#1e293b' },
    { name: 'Muted Text (#94a3b8) on Card BG (#1e293b)', fg: '#94a3b8', bg: '#1e293b' },

    // Accents & Buttons
    { name: 'Accent Blue (#38bdf8) on Page BG (#0f172a)', fg: '#38bdf8', bg: '#0f172a' },
    { name: 'Accent Blue (#38bdf8) on Card BG (#1e293b)', fg: '#38bdf8', bg: '#1e293b' },
    { name: 'Accent Green Light (#4ade80) on Card BG (#1e293b)', fg: '#4ade80', bg: '#1e293b' },
    { name: 'Button Text (#0f172a) on Accent Blue (#38bdf8)', fg: '#0f172a', bg: '#38bdf8' },
    { name: 'Button Text (#0f172a) on Active Green (#22c55e)', fg: '#0f172a', bg: '#22c55e' },
    { name: 'Discount Tag Text (#f87171) on Card BG (#1e293b)', fg: '#f87171', bg: '#1e293b' },
    { name: 'Value Badge Text (#4ade80) on Card BG (#1e293b)', fg: '#4ade80', bg: '#1e293b' }
];

let contrastFailures = 0;
colorPairs.forEach(pair => {
    const ratio = getContrastRatio(pair.fg, pair.bg);
    const passesAA = ratio >= 4.5;
    const passesAALarge = ratio >= 3.0;
    const status = passesAA ? '✅ PASS (AA Normal)' : (passesAALarge ? '⚠️ PASS (AA Large only)' : '❌ FAIL');
    if (!passesAA) contrastFailures++;
    console.log(`- ${pair.name}: ${ratio.toFixed(2)}:1 → ${status}`);
});

console.log('\n--- 2. DATASET INTEGRITY & COMPLETENESS AUDIT ---');

// Extract PRODUCTS array JS string and parse
const jsMatch = content.match(/const PRODUCTS = (\[[\s\S]*?\]);/);
if (!jsMatch) {
    console.error('Could not extract PRODUCTS array!');
    process.exit(1);
}

const products = eval(jsMatch[1]);
console.log(`Total Products in dataset: ${products.length}`);

const requiredFields = [
    'id', 'name', 'brand', 'category', 'categoryName', 'profiles', 
    'msrp', 'currentPrice', 'discountPercent', 'rating', 'reviewCount', 
    'weightOz', 'weightDisplay', 'dealBadge', 'valueRating', 'specs', 
    'priceHistory', 'pros', 'cons', 'verdict'
];

let missingFieldsCount = 0;
products.forEach((p, idx) => {
    requiredFields.forEach(f => {
        if (p[f] === undefined || p[f] === null || p[f] === '') {
            console.error(`Product [${idx}] (${p.id || 'no-id'}) missing field: ${f}`);
            missingFieldsCount++;
        }
    });
    if (!Array.isArray(p.profiles) || p.profiles.length === 0) {
        console.error(`Product [${idx}] (${p.id}) has invalid profiles array`);
        missingFieldsCount++;
    }
    if (!Array.isArray(p.priceHistory) || p.priceHistory.length < 2) {
        console.error(`Product [${idx}] (${p.id}) has invalid priceHistory`);
        missingFieldsCount++;
    }
    if (!Array.isArray(p.pros) || p.pros.length === 0) {
        console.error(`Product [${idx}] (${p.id}) has empty pros`);
        missingFieldsCount++;
    }
    if (!Array.isArray(p.cons) || p.cons.length === 0) {
        console.error(`Product [${idx}] (${p.id}) has empty cons`);
        missingFieldsCount++;
    }
});

console.log(`Missing fields / data irregularities: ${missingFieldsCount}`);
