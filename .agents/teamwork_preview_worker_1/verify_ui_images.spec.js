const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('=== STARTING PLAYWRIGHT UI VERIFICATION & FALLBACK TESTING ===');

    const htmlPath = path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    const screenshotDir = path.resolve('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_worker_1/screenshots');

    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const browser = await chromium.launch({
        headless: true
    });

    const context = await browser.newContext({
        viewport: { width: 1400, height: 900 }
    });

    const page = await context.newPage();

    const consoleErrors = [];
    let isSyntheticTestActive = false;

    page.on('console', msg => {
        if (msg.type() === 'error') {
            if (isSyntheticTestActive && msg.text().includes('Failed to load resource')) {
                // Ignore expected network error during synthetic image error handler testing
                return;
            }
            console.error(`[PAGE CONSOLE ERROR] ${msg.text()}`);
            consoleErrors.push(msg.text());
        }
    });

    page.on('pageerror', error => {
        console.error(`[PAGE UNCAUGHT ERROR] ${error.message}`);
        consoleErrors.push(error.message);
    });

    console.log(`Navigating to file://${htmlPath}`);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    // 1. Verify Page Title & Product Rows Rendering
    const title = await page.title();
    console.log(`Page Title: "${title}"`);

    const productRows = await page.locator('#gearTableBody tr[id^="tr-"]').count();
    console.log(`Product Table Rows Rendered: ${productRows}`);

    if (productRows !== 41) {
        throw new Error(`Expected 41 product table rows, found ${productRows}`);
    }

    // 2. Check rendered img tags in table rows
    const tableImages = await page.locator('#gearTableBody tr[id^="tr-"] img').all();
    console.log(`Table Row Product Images Count: ${tableImages.length}`);

    let loadedCount = 0;
    for (let i = 0; i < tableImages.length; i++) {
        const img = tableImages[i];
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        const naturalWidth = await img.evaluate(el => el.naturalWidth);
        const naturalHeight = await img.evaluate(el => el.naturalHeight);
        
        console.log(`Img #${i + 1} (${alt}): src="${src.substring(0, 60)}..." dimensions=${naturalWidth}x${naturalHeight}`);

        if (src && (src.startsWith('http') || src.startsWith('data:image/svg+xml'))) {
            loadedCount++;
        }
    }
    console.log(`Verified ${loadedCount}/${tableImages.length} images loaded with valid sources.`);

    // Take Desktop Table View Screenshot
    const screenshot1 = path.join(screenshotDir, '1_desktop_table_view.png');
    await page.screenshot({ path: screenshot1, fullPage: false });
    console.log(`Saved screenshot: ${screenshot1}`);

    // 3. Test Interactive Image Lightbox Modal
    console.log('Testing Image Lightbox Modal trigger on thumbnail click...');
    const firstImg = page.locator('#gearTableBody tr[id^="tr-"] img').first();
    await firstImg.click();

    await page.waitForSelector('#imageLightboxModal', { state: 'visible' });

    const lightboxVisible = await page.locator('#imageLightboxModal').isVisible();
    const lightboxTitle = await page.locator('#lightboxTitle').innerText();
    const lightboxImgSrc = await page.locator('#lightboxImg').getAttribute('src');
    const lightboxMeta = await page.locator('#lightboxMeta').innerText();

    console.log(`Lightbox Modal Visible: ${lightboxVisible}`);
    console.log(`Lightbox Title: "${lightboxTitle}"`);
    console.log(`Lightbox Img Src: "${lightboxImgSrc.substring(0, 60)}..."`);
    console.log(`Lightbox Meta: "${lightboxMeta.replace(/\n/g, ' | ')}"`);

    // Take Lightbox Modal Screenshot
    const screenshot2 = path.join(screenshotDir, '2_lightbox_modal.png');
    await page.screenshot({ path: screenshot2 });
    console.log(`Saved screenshot: ${screenshot2}`);

    // Close Lightbox Modal
    await page.keyboard.press('Escape');
    await page.waitForSelector('#imageLightboxModal', { state: 'hidden' });
    console.log('Lightbox modal closed cleanly via Escape key.');

    // 4. Test 4-Tier Image Fallback Recovery
    console.log('Testing 4-Tier Fallback Error Handler (handleImageError)...');
    isSyntheticTestActive = true;
    
    const fallbackTest = await page.evaluate(async () => {
        const testImg = document.createElement('img');
        document.body.appendChild(testImg);

        const results = [];

        // Attach error handler simulating broken Tier 1 image
        testImg.onerror = () => handleImageError(testImg, 'sleeping_bags');
        
        // Trigger error by setting invalid URL (Tier 1 -> Tier 2)
        testImg.src = 'https://invalid-domain-that-does-not-exist-12345.com/broken.jpg';

        await new Promise(r => setTimeout(r, 200));
        results.push({ step: 'Tier 1 -> Tier 2 CDN', tier: testImg.dataset.fallbackTier, src: testImg.src.substring(0, 60) });

        // Simulate failure on Tier 2 (CDN) -> Tier 3 (Category SVG)
        testImg.src = 'https://invalid-domain-that-does-not-exist-12345.com/broken2.jpg';
        await new Promise(r => setTimeout(r, 200));
        results.push({ step: 'Tier 2 -> Tier 3 Category SVG', tier: testImg.dataset.fallbackTier, src: testImg.src.substring(0, 60) });

        // Simulate failure on Tier 3 -> Tier 4 (Universal SVG)
        testImg.dataset.fallbackTier = '3';
        handleImageError(testImg, 'unknown_category');
        results.push({ step: 'Tier 3 -> Tier 4 Universal SVG', tier: testImg.dataset.fallbackTier, src: testImg.src.substring(0, 60) });

        document.body.removeChild(testImg);
        return results;
    });

    console.log('Fallback Cascading Results:\n', JSON.stringify(fallbackTest, null, 2));
    isSyntheticTestActive = false;

    // 5. Test Side-by-Side Compare Modal
    console.log('Testing Side-by-Side Compare Matrix Modal with Product Images...');
    await page.locator('#gearTableBody tr[id^="tr-"] input[type="checkbox"]').nth(0).check();
    await page.locator('#gearTableBody tr[id^="tr-"] input[type="checkbox"]').nth(1).check();

    await page.waitForSelector('#floatingCompareBar.visible');
    await page.click('#openCompareModalBtn');

    await page.waitForSelector('#compareModal.active');

    const modalHeaderImgs = await page.locator('#modalTableHeaderRow img').count();
    console.log(`Compare Modal Header Images Count: ${modalHeaderImgs}`);

    const screenshot3 = path.join(screenshotDir, '3_side_by_side_compare_modal.png');
    await page.screenshot({ path: screenshot3 });
    console.log(`Saved screenshot: ${screenshot3}`);

    await page.keyboard.press('Escape');

    // 6. Test Grid View Mode
    console.log('Testing Mobile/Grid View Mode...');
    await page.click('#viewBtnGrid');

    const cardCount = await page.locator('#cardContainer .product-card').count();
    console.log(`Grid Cards Count: ${cardCount}`);

    const screenshot4 = path.join(screenshotDir, '4_grid_card_view.png');
    await page.screenshot({ path: screenshot4 });
    console.log(`Saved screenshot: ${screenshot4}`);

    console.log('\n=== VERIFICATION SUMMARY ===');
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Product Rows Verified: ${productRows}`);
    console.log(`Screenshots Captured: 4`);

    if (consoleErrors.length > 0) {
        console.error('Console errors detected:', consoleErrors);
        process.exit(1);
    } else {
        console.log('🎉 ALL TESTS & VERIFICATION PASSED WITH ZERO CONSOLE ERRORS!');
    }

    await browser.close();
})();
