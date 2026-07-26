const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log("==================================================================");
    console.log("=== CHECK 3: PLAYWRIGHT CHROMIUM DOM IMAGE RENDERING AUDIT ===");
    console.log("==================================================================");

    const htmlPath = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');
    console.log("Loading page:", htmlPath);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Collect console errors or page errors
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto(htmlPath, { waitUntil: 'networkidle', timeout: 30000 });

    // Scroll through the entire page to trigger lazy loading on table rows and grid cards
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    window.scrollTo(0, 0);
                    resolve();
                }
            }, 100);
        });
    });

    // Wait 2 seconds for any fallback handlers or lazy loads to finalize
    await page.waitForTimeout(2000);

    // Inspect all <img> elements in the entire document
    const imgAudit = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map((img, idx) => ({
            index: idx + 1,
            id: img.id || '',
            alt: img.alt || '',
            src: img.src || '',
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            clientWidth: img.clientWidth,
            clientHeight: img.clientHeight,
            isRendered: img.naturalWidth > 0 && img.naturalHeight > 0,
            parentElement: img.parentElement ? img.parentElement.tagName + (img.parentElement.id ? '#' + img.parentElement.id : '') : ''
        }));
    });

    console.log(`\nTotal <img> elements found in DOM: ${imgAudit.length}`);

    const failedImgs = imgAudit.filter(img => !img.isRendered);
    const passedImgs = imgAudit.filter(img => img.isRendered);

    console.log(`Rendered successfully (naturalWidth > 0 & naturalHeight > 0): ${passedImgs.length}/${imgAudit.length}`);
    console.log(`Failed to render (naturalWidth === 0 || naturalHeight === 0): ${failedImgs.length}/${imgAudit.length}`);

    if (failedImgs.length > 0) {
        console.log("\n❌ FAILED IMAGES DETAIL:");
        failedImgs.forEach(img => {
            console.log(`- Img #${img.index} [alt="${img.alt}"]: src="${img.src.substring(0, 90)}..." | naturalWidth=${img.naturalWidth}, naturalHeight=${img.naturalHeight} | parent=${img.parentElement}`);
        });
    }

    // Now specifically inspect table rows in #gearTableBody
    const tableImgAudit = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('#gearTableBody tr img'));
        return imgs.map((img, idx) => ({
            index: idx + 1,
            alt: img.alt || '',
            src: img.src || '',
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            isRendered: img.naturalWidth > 0 && img.naturalHeight > 0
        }));
    });

    console.log(`\nTable Row <img> count in #gearTableBody: ${tableImgAudit.length}`);
    const failedTableImgs = tableImgAudit.filter(img => !img.isRendered);
    console.log(`Table images rendered (naturalWidth > 0): ${tableImgAudit.length - failedTableImgs.length}/${tableImgAudit.length}`);

    // Check Grid View images
    await page.evaluate(() => {
        const gridBtn = document.querySelector('button[onclick*="switchView(\'grid\')"]') || document.querySelector('#gridViewBtn') || document.querySelector('[data-view="grid"]');
        if (gridBtn) gridBtn.click();
    });
    await page.waitForTimeout(1000);

    const gridImgAudit = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('#gearGrid .card img, #gearGrid img'));
        return imgs.map((img, idx) => ({
            index: idx + 1,
            alt: img.alt || '',
            src: img.src || '',
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            isRendered: img.naturalWidth > 0 && img.naturalHeight > 0
        }));
    });

    console.log(`Grid View <img> count: ${gridImgAudit.length}`);
    const failedGridImgs = gridImgAudit.filter(img => !img.isRendered);
    console.log(`Grid images rendered (naturalWidth > 0): ${gridImgAudit.length - failedGridImgs.length}/${gridImgAudit.length}`);

    await browser.close();

    console.log("\n=======================================================");
    console.log("=== CHECK 3: DOM IMAGE RENDERING RESULT ===");
    console.log("=======================================================");

    if (failedImgs.length === 0) {
        console.log("✅ PASS: 100% of rendered <img> elements have naturalWidth > 0 and naturalHeight > 0!");
    } else {
        console.log(`❌ FAIL: ${failedImgs.length} <img> elements rendered with 0x0 natural dimensions (naturalWidth === 0).`);
    }

    fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_auditor_2/check3_results.json', JSON.stringify({
        total: imgAudit.length,
        passed: passedImgs.length,
        failed: failedImgs.length,
        failedDetails: failedImgs,
        consoleErrors: consoleErrors
    }, null, 2));

})();
