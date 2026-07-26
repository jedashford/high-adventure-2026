const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('--- STARTING PLAYWRIGHT ACCESSIBILITY & INTERACTIVITY AUDIT ---');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const consoleErrors = [];
    const consoleWarnings = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
        if (msg.type() === 'warning') consoleWarnings.push(msg.text());
    });
    page.on('pageerror', err => {
        consoleErrors.push(err.message);
    });

    const fileUrl = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    await page.goto(fileUrl, { waitUntil: 'load' });

    console.log('\n--- 1. CONSOLE AUDIT ---');
    console.log('Console Errors count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
        consoleErrors.forEach(e => console.error('  ERROR:', e));
    }
    console.log('Console Warnings count:', consoleWarnings.length);
    if (consoleWarnings.length > 0) {
        consoleWarnings.forEach(w => console.warn('  WARNING:', w));
    }

    console.log('\n--- 2. INITIAL RENDER AUDIT ---');
    const title = await page.title();
    console.log('Page Title:', title);

    const initialCountText = await page.innerText('#resultsCount');
    console.log('Initial product count:', initialCountText);

    // Desktop table visibility
    const tableVisible = await page.isVisible('#tableContainer');
    console.log('Desktop Table visible on 1280px width:', tableVisible);

    // Mobile grid hidden on desktop
    const cardGridVisible = await page.isVisible('#cardContainer');
    console.log('Mobile Card Grid visible on 1280px width:', cardGridVisible);

    console.log('\n--- 3. CATEGORY TABS AUDIT ---');
    const tabsCount = await page.locator('#categoryTabs .tab-btn').count();
    console.log('Category Tabs rendered count:', tabsCount);

    // Click Tents tab
    await page.click('button:has-text("Tents")');
    const tentsCount = await page.innerText('#resultsCount');
    console.log('Product count after selecting Tents:', tentsCount);

    // Click All Categories tab
    await page.click('button:has-text("All Categories")');
    const resetCount = await page.innerText('#resultsCount');
    console.log('Product count after selecting All Categories:', resetCount);

    console.log('\n--- 4. PROFILE FILTER AUDIT ---');
    await page.click('button:has-text("Adult Target")');
    const adultCount = await page.innerText('#resultsCount');
    console.log('Product count for Adult Target:', adultCount);

    await page.click('button:has-text("Youth/Wife Target")');
    const youthCount = await page.innerText('#resultsCount');
    console.log('Product count for Youth Target:', youthCount);

    await page.click('button:has-text("Ultralight")');
    const ulCount = await page.innerText('#resultsCount');
    console.log('Product count for Ultralight:', ulCount);

    await page.click('button:has-text("Budget Picks")');
    const budgetCount = await page.innerText('#resultsCount');
    console.log('Product count for Budget Picks:', budgetCount);

    // Reset profile filter to All
    await page.click('button:has-text("All Profiles")');

    console.log('\n--- 5. SEARCH & SORT AUDIT ---');
    await page.fill('#gearSearch', 'Sawyer');
    const searchCount = await page.innerText('#resultsCount');
    console.log('Product count searching "Sawyer":', searchCount);
    await page.fill('#gearSearch', '');

    await page.check('#dealsOnlyCheck');
    const dealsCount = await page.innerText('#resultsCount');
    console.log('Product count with Deals Only checked:', dealsCount);
    await page.uncheck('#dealsOnlyCheck');

    console.log('\n--- 6. COMPARISON DRAWER & MODAL AUDIT ---');
    const checkboxes = page.locator('#gearTableBody input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    const compareBarVisible = await page.evaluate(() => {
        const bar = document.getElementById('floatingCompareBar');
        return bar.classList.contains('visible');
    });
    console.log('Floating compare bar visible after selecting 2 items:', compareBarVisible);

    const compareNum = await page.innerText('#compareCountNum');
    console.log('Compare count number:', compareNum);

    // Open Compare Modal
    await page.click('#openCompareModalBtn');
    const modalVisible = await page.evaluate(() => {
        const modal = document.getElementById('compareModal');
        return modal.classList.contains('active') && getComputedStyle(modal).display !== 'none';
    });
    console.log('Comparison Modal active and visible:', modalVisible);

    const modalTitle = await page.innerText('#modalTitle');
    console.log('Modal title:', modalTitle);

    // Test ESC key close
    await page.keyboard.press('Escape');
    const modalVisibleAfterEsc = await page.evaluate(() => {
        const modal = document.getElementById('compareModal');
        return modal.classList.contains('active');
    });
    console.log('Modal active after Escape key:', modalVisibleAfterEsc);

    console.log('\n--- 7. RESPONSIVE VIEWPORT AUDIT (375x667 Mobile) ---');
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check computed visibility on mobile viewport in Auto mode
    const mobileTableDisp = await page.evaluate(() => getComputedStyle(document.getElementById('tableContainer')).display);
    const mobileCardDisp = await page.evaluate(() => getComputedStyle(document.getElementById('cardContainer')).display);
    console.log('Mobile Viewport (Auto mode) - Table display:', mobileTableDisp, '| Card grid display:', mobileCardDisp);

    // Test explicit mode switching
    await page.click('#viewBtnTable');
    const forceTableDisp = await page.evaluate(() => getComputedStyle(document.getElementById('tableContainer')).display);
    console.log('Force Table mode - Table display:', forceTableDisp);

    await page.click('#viewBtnGrid');
    const forceGridDisp = await page.evaluate(() => getComputedStyle(document.getElementById('cardContainer')).display);
    console.log('Force Cards mode - Card grid display:', forceGridDisp);

    await page.click('#viewBtnAuto');

    console.log('\n--- 8. FINAL CONSOLE CHECK ---');
    console.log('Total Errors:', consoleErrors.length);
    console.log('Total Warnings:', consoleWarnings.length);

    await browser.close();
    console.log('--- AUDIT COMPLETE ---');
})();
