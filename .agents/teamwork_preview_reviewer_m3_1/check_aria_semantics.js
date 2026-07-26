const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('--- HTML SEMANTICS & ARIA AUDIT ---');

const checks = [
    { name: 'DOCTYPE declaration', pass: /^<!DOCTYPE html>/i.test(content) },
    { name: 'html lang="en"', pass: /<html lang="en">/i.test(content) },
    { name: 'meta charset UTF-8', pass: /<meta charset="UTF-8">/i.test(content) },
    { name: 'meta viewport', pass: /<meta name="viewport"/i.test(content) },
    { name: 'title tag present', pass: /<title>[\s\S]+<\/title>/i.test(content) },
    { name: 'header role="banner"', pass: /<header role="banner">/i.test(content) },
    { name: 'main role="main"', pass: /<main [^>]*role="main">/i.test(content) },
    { name: 'toolbar role="search"', pass: /role="search"/i.test(content) },
    { name: 'search input aria-label', pass: /id="gearSearch"[^>]*aria-label=/i.test(content) },
    { name: 'category tabs role="tablist"', pass: /id="categoryTabs"[^>]*role="tablist"/i.test(content) },
    { name: 'user profiles role="tablist"', pass: /class="user-profiles"[^>]*role="tablist"/i.test(content) },
    { name: 'view toggle role="group"', pass: /class="view-toggle-btns"[^>]*role="group"/i.test(content) },
    { name: 'gear table scope="col"', pass: /<th scope="col">/i.test(content) },
    { name: 'guide box aria-labelledby', pass: /class="guide-box"[^>]*aria-labelledby="guideHeading"/i.test(content) },
    { name: 'compare drawer aria-label', pass: /id="floatingCompareBar"[^>]*aria-label=/i.test(content) },
    { name: 'compare modal role="dialog" & aria-modal="true"', pass: /id="compareModal"[^>]*role="dialog"[^>]*aria-modal="true"/i.test(content) },
    { name: 'modal close button aria-label', pass: /class="modal-close-btn"[^>]*aria-label=/i.test(content) },
    { name: 'SVG sparkline aria-hidden="true"', pass: /class="sparkline-svg"[^>]*aria-hidden="true"/i.test(content) }
];

let failedChecks = 0;
checks.forEach(c => {
    console.log(`- ${c.name}: ${c.pass ? '✅ PASS' : '❌ FAIL'}`);
    if (!c.pass) failedChecks++;
});

console.log(`\nFailed semantic/ARIA checks: ${failedChecks}`);
