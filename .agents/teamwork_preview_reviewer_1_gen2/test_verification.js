const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const filePath = 'file://' + path.resolve(__dirname, '../../gemini-code-1784928132429.html');
    console.log('Testing file:', filePath);

    const consoleErrors = [];
    const pageErrors = [];

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    page.on('pageerror', err => {
        pageErrors.push(err.message);
    });

    await page.goto(filePath);
    await page.waitForLoadState('domcontentloaded');

    console.log('\n--- TEST 1: ARIA Attributes ---');
    const lightbox = await page.$('#imageLightboxModal');
    const role = await lightbox.getAttribute('role');
    const ariaModal = await lightbox.getAttribute('aria-modal');
    const ariaLabelledby = await lightbox.getAttribute('aria-labelledby');
    const titleElem = await page.$('#' + ariaLabelledby);

    console.log('role:', role);
    console.log('aria-modal:', ariaModal);
    console.log('aria-labelledby:', ariaLabelledby);
    console.log('Target element id matching aria-labelledby exists:', !!titleElem);

    const pass1 = role === 'dialog' && ariaModal === 'true' && ariaLabelledby === 'lightboxTitle' && !!titleElem;
    console.log('TEST 1 RESULT:', pass1 ? 'PASS' : 'FAIL');

    console.log('\n--- TEST 2: Hierarchical Escape key handling ---');
    // First, open Compare modal with 2 items
    await page.evaluate(() => {
        state.selectedCompareIds = [PRODUCTS[0].id, PRODUCTS[1].id];
        openCompareModal();
    });
    
    let isCompareOpen = await page.evaluate(() => {
        const modal = document.getElementById('compareModal');
        return modal && modal.classList.contains('active');
    });
    console.log('Compare modal open:', isCompareOpen);

    // Now open Lightbox modal while Compare modal is open
    await page.evaluate(() => {
        openImageLightbox(PRODUCTS[0].id);
    });

    let isLightboxOpen = await page.evaluate(() => {
        const modal = document.getElementById('imageLightboxModal');
        return modal && modal.style.display !== 'none' && modal.style.display !== '';
    });
    console.log('Lightbox modal open inside Compare modal:', isLightboxOpen);

    // Press Escape key once
    console.log('Pressing 1st Escape key...');
    await page.keyboard.press('Escape');

    // Check state after 1st Escape key press
    isLightboxOpen = await page.evaluate(() => {
        const modal = document.getElementById('imageLightboxModal');
        return modal && modal.style.display !== 'none' && modal.style.display !== '';
    });

    isCompareOpen = await page.evaluate(() => {
        const modal = document.getElementById('compareModal');
        return modal && modal.classList.contains('active');
    });

    console.log('After 1st Escape -> Lightbox open:', isLightboxOpen, '(Expected: false)');
    console.log('After 1st Escape -> Compare modal open:', isCompareOpen, '(Expected: true)');

    const pass2 = (!isLightboxOpen) && isCompareOpen;

    // Press Escape key second time to confirm Compare modal dismisses
    console.log('Pressing 2nd Escape key...');
    await page.keyboard.press('Escape');
    isCompareOpen = await page.evaluate(() => {
        const modal = document.getElementById('compareModal');
        return modal && modal.classList.contains('active');
    });
    console.log('After 2nd Escape -> Compare modal open:', isCompareOpen, '(Expected: false)');

    console.log('TEST 2 RESULT:', pass2 ? 'PASS' : 'FAIL');

    console.log('\n--- TEST 3: Mobile Touch Targets in @media (max-width: 768px) ---');
    await page.setViewportSize({ width: 375, height: 812 }); // Mobile viewport width <= 768px

    const selectorsToCheck = [
        '.profile-pill',
        '.profile-pill-btn',
        '#gearSearch',
        '#sortSelect',
        '.view-mode-btn',
        '.view-btn',
        '.compare-btn',
        '#openCompareModalBtn',
        '#clearSearchBtn'
    ];

    const touchTargetResults = [];
    for (const selector of selectorsToCheck) {
        const elements = await page.$$(selector);
        for (let i = 0; i < elements.length; i++) {
            const box = await elements[i].boundingBox();
            if (box && box.height > 0) {
                const height = box.height;
                touchTargetResults.push({ selector: `${selector} [${i}]`, height, pass: height >= 44 });
            }
        }
    }

    console.log(`Measured ${touchTargetResults.length} interactive elements on mobile:`);
    let pass3 = touchTargetResults.length > 0;
    for (const res of touchTargetResults) {
        console.log(`  ${res.selector}: height = ${res.height}px -> ${res.pass ? 'PASS' : 'FAIL'}`);
        if (!res.pass) pass3 = false;
    }

    console.log('TEST 3 RESULT:', pass3 ? 'PASS' : 'FAIL');

    console.log('\n--- TEST 4: Zero Console / Page Errors ---');
    console.log('Console Errors count:', consoleErrors.length, consoleErrors);
    console.log('Page Errors count:', pageErrors.length, pageErrors);

    const pass4 = consoleErrors.length === 0 && pageErrors.length === 0;
    console.log('TEST 4 RESULT:', pass4 ? 'PASS' : 'FAIL');

    await browser.close();

    console.log('\n=========================================');
    console.log(`OVERALL STATUS: ${pass1 && pass2 && pass3 && pass4 ? 'ALL PASSED' : 'SOME FAILED'}`);
    process.exit(pass1 && pass2 && pass3 && pass4 ? 0 : 1);
})();
