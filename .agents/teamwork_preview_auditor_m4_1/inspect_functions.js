const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const scriptCode = html.match(/<script>([\s\S]*?)<\/script>/i)[1];

const functions = [
    'renderTabs',
    'getFilteredProductsBase',
    'getFilteredAndSortedProducts',
    'renderProducts',
    'renderProfileBadges',
    'renderSparklineSVG',
    'setCategoryFilter',
    'setProfileFilter',
    'onSearchInput',
    'onSortChange',
    'onDealsOnlyToggle',
    'setViewMode',
    'applyViewLayoutMode',
    'resetFilters',
    'toggleCompareItem',
    'removeFromCompareModal',
    'removeFromCompare',
    'clearCompareSelection',
    'renderFloatingCompareBar',
    'openCompareModal',
    'closeCompareModal',
    'setupKeyboardNav'
];

console.log('=== FUNCTION IMPLEMENTATION ANALYSIS ===\n');

functions.forEach(fnName => {
    const reg = new RegExp(`function\\s+${fnName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'g');
    const match = reg.exec(scriptCode);
    if (match) {
        const body = match[1];
        const lines = body.split('\n').length;
        const stubCheck = /return\s+["'`]?true["'`]?;|return\s+false;|return\s+\[\];|return\s+\{\};|TODO|dummy|mock/i.test(body);
        console.log(`Function: ${fnName}`);
        console.log(`- Line count: ${lines}`);
        console.log(`- Stub/Facade flags detected: ${stubCheck}`);
        console.log(`- Sample code:\n  ${body.trim().substring(0, 200).replace(/\n/g, '\n  ')}\n`);
    } else {
        console.log(`Function: ${fnName} - NOT FOUND BY REGEX`);
    }
});
