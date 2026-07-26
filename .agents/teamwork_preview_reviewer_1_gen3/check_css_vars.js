const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

// 1. Extract defined CSS variables from :root
const rootVars = new Set();
const rootMatches = html.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g);
for (const match of rootMatches) {
    rootVars.add(`--${match[1]}`);
}

console.log('Defined CSS Variables in :root:', Array.from(rootVars));

// 2. Find all var(...) usages in the HTML file
const varUsages = [];
const varMatches = html.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*(?:,\s*([^)]+))?\)/g);
for (const match of varMatches) {
    varUsages.push({
        full: match[0],
        varName: match[1],
        fallback: match[2] || null
    });
}

const undefinedVars = [];
varUsages.forEach(u => {
    if (!rootVars.has(u.varName)) {
        undefinedVars.push(u);
    }
});

console.log(`Total var(...) usages in file: ${varUsages.length}`);
console.log(`Undefined CSS variables in file: ${undefinedVars.length}`);
if (undefinedVars.length > 0) {
    console.log('UNDEFINED VARS:', undefinedVars);
}

// 3. Specific check for #imageLightboxModal
const lightboxMatch = html.match(/id=["']imageLightboxModal["'][\s\S]*?<\/div>\s*<\/div>/i);
if (!lightboxMatch) {
    console.error('Could not find #imageLightboxModal block!');
} else {
    const lightboxHtml = lightboxMatch[0];
    console.log('\n--- #imageLightboxModal Content snippet ---');
    console.log(lightboxHtml);
    
    const lightboxVars = [];
    const lbMatches = lightboxHtml.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*(?:,\s*([^)]+))?\)/g);
    for (const m of lbMatches) {
        lightboxVars.push({
            varName: m[1],
            isDefined: rootVars.has(m[1])
        });
    }
    
    console.log('\n--- TASK 2 RESULT ---');
    console.log('CSS Variables used in #imageLightboxModal:', lightboxVars);
    const usesCardBg = lightboxVars.some(v => v.varName === '--card-bg');
    const allLbVarsValid = lightboxVars.every(v => v.isDefined);
    console.log('var(--card-bg) used correctly in #imageLightboxModal:', usesCardBg);
    console.log('All CSS variables in #imageLightboxModal valid and defined:', allLbVarsValid);
}
