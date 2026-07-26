const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const fileUrl = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    await page.goto(fileUrl, { waitUntil: 'load' });

    console.log('--- TESTING TAB CLICKING IN DETAIL ---');

    let stateVal = await page.evaluate(() => state.activeCategory);
    let countVal = await page.innerText('#resultsCount');
    console.log('Initial state.activeCategory:', stateVal, 'count:', countVal);

    // Click Tents tab button specifically by selector
    await page.evaluate(() => setCategoryFilter('tents'));
    stateVal = await page.evaluate(() => state.activeCategory);
    countVal = await page.innerText('#resultsCount');
    console.log('After setCategoryFilter("tents"): state.activeCategory:', stateVal, 'count:', countVal);

    // Click All tab button specifically by function call
    await page.evaluate(() => setCategoryFilter('all'));
    stateVal = await page.evaluate(() => state.activeCategory);
    countVal = await page.innerText('#resultsCount');
    console.log('After setCategoryFilter("all"): state.activeCategory:', stateVal, 'count:', countVal);

    // Now test clicking via DOM click on the button element
    const allTabBtn = page.locator('#categoryTabs button:has-text("All Categories")');
    await allTabBtn.click();
    stateVal = await page.evaluate(() => state.activeCategory);
    countVal = await page.innerText('#resultsCount');
    console.log('After clicking #categoryTabs "All Categories" button: state.activeCategory:', stateVal, 'count:', countVal);

    // Now test clicking Tents button
    const tentsBtn = page.locator('#categoryTabs button:has-text("Tents")');
    await tentsBtn.click();
    stateVal = await page.evaluate(() => state.activeCategory);
    countVal = await page.innerText('#resultsCount');
    console.log('After clicking #categoryTabs "Tents" button: state.activeCategory:', stateVal, 'count:', countVal);

    await browser.close();
})();
