const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const fileUrl = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    await page.goto(fileUrl, { waitUntil: 'load' });

    console.log('--- FOCUS-VISIBLE AUDIT ACROSS ELEMENTS ---');

    const selectors = [
        { name: 'Profile Pill Button', sel: '.profile-pill-btn' },
        { name: 'Category Tab Button', sel: '.tab-btn' },
        { name: 'Search Input', sel: '#gearSearch' },
        { name: 'Sort Select', sel: '#sortSelect' },
        { name: 'Deals Checkbox', sel: '#dealsOnlyCheck' },
        { name: 'View Mode Button', sel: '.view-btn' },
        { name: 'Table Compare Checkbox', sel: '#gearTableBody input[type="checkbox"]' }
    ];

    for (const item of selectors) {
        await page.focus(item.sel);
        const styles = await page.evaluate((s) => {
            const el = document.querySelector(s);
            const comp = getComputedStyle(el);
            return {
                outlineStyle: comp.outlineStyle,
                outlineColor: comp.outlineColor,
                outlineWidth: comp.outlineWidth,
                borderColor: comp.borderColor
            };
        }, item.sel);
        console.log(`Focus on ${item.name} (${item.sel}):`);
        console.log(`  outline: ${styles.outlineWidth} ${styles.outlineStyle} ${styles.outlineColor} | border-color: ${styles.borderColor}`);
    }

    await browser.close();
})();
