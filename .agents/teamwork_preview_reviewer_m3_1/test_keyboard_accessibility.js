const { chromium } = require('playwright');
const path = require('path');

(async () => {
    console.log('--- STARTING KEYBOARD ACCESSIBILITY AUDIT ---');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const fileUrl = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    await page.goto(fileUrl, { waitUntil: 'load' });

    console.log('\n--- 1. FOCUS VISIBILITY & KEYBOARD TABBING ---');
    
    // Focus the first interactive element (first profile button)
    await page.focus('.user-profiles button:nth-child(1)');
    let activeTag = await page.evaluate(() => document.activeElement.tagName + '.' + document.activeElement.className);
    console.log('Initially focused element:', activeTag);

    // Press Tab to navigate through profile buttons
    await page.keyboard.press('Tab');
    activeTag = await page.evaluate(() => document.activeElement.tagName + '.' + document.activeElement.className + ' [text: ' + document.activeElement.innerText.slice(0, 20) + ']');
    console.log('After Tab 1:', activeTag);

    // Press Enter to activate focused profile pill button
    await page.keyboard.press('Enter');
    let adultSelected = await page.evaluate(() => document.querySelector('.adult-target').getAttribute('aria-selected'));
    console.log('Adult profile pill aria-selected after Enter key:', adultSelected);

    // Tab into category tabs
    await page.focus('#categoryTabs button:nth-child(2)'); // Tents tab
    await page.keyboard.press('Enter');
    let tentsSelected = await page.evaluate(() => document.querySelector('#categoryTabs button:nth-child(2)').getAttribute('aria-selected'));
    let tentsCount = await page.innerText('#resultsCount');
    console.log('Tents tab aria-selected after Enter key:', tentsSelected, '| Products count:', tentsCount);

    // Tab into Search input
    await page.focus('#gearSearch');
    await page.keyboard.type('Jetboil');
    let jetboilCount = await page.innerText('#resultsCount');
    console.log('Search count typing "Jetboil":', jetboilCount);

    // Clear search
    await page.fill('#gearSearch', '');
    await page.evaluate(() => setCategoryFilter('all'));

    // Check compare checkboxes keyboard toggling via Space key
    await page.focus('#gearTableBody tr:nth-child(1) input[type="checkbox"]');
    await page.keyboard.press('Space');
    await page.focus('#gearTableBody tr:nth-child(2) input[type="checkbox"]');
    await page.keyboard.press('Space');

    let compareCount = await page.innerText('#compareCountNum');
    console.log('Selected count after Space key on checkboxes:', compareCount);

    // Open Compare modal with keyboard
    await page.focus('#openCompareModalBtn');
    await page.keyboard.press('Enter');

    let modalActive = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    console.log('Compare modal active after Enter key on Compare Now button:', modalActive);

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    let modalActiveAfterEsc = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    console.log('Compare modal active after Escape key:', modalActiveAfterEsc);

    // Close modal via Close button Enter key
    await page.click('#openCompareModalBtn');
    await page.focus('.modal-close-btn');
    await page.keyboard.press('Enter');
    let modalActiveAfterCloseBtn = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    console.log('Compare modal active after Enter key on close button:', modalActiveAfterCloseBtn);

    console.log('\n--- 2. FOCUS OUTLINE COMPUTED STYLES CHECK ---');
    await page.focus('#gearSearch');
    const outlineStyle = await page.evaluate(() => {
        const input = document.getElementById('gearSearch');
        const style = getComputedStyle(input, ':focus-visible');
        return {
            outlineStyle: style.outlineStyle || getComputedStyle(input).outlineStyle,
            outlineColor: style.outlineColor || getComputedStyle(input).outlineColor,
            outlineWidth: style.outlineWidth || getComputedStyle(input).outlineWidth
        };
    });
    console.log('Search Input focus outline style:', outlineStyle);

    await browser.close();
    console.log('--- KEYBOARD ACCESSIBILITY AUDIT COMPLETE ---');
})();
