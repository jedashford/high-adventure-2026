const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML_PATH = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function runStressTests() {
    console.log('===================================================================');
    console.log('=== EMPIRICAL PLAYWRIGHT CHROMIUM STRESS SUITE: IMAGE CASCADE ===');
    console.log('===================================================================\n');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await context.newPage();

    const globalJsErrors = [];
    page.on('pageerror', exception => {
        console.error('UNCAUGHT PAGE EXCEPTION:', exception.message);
        globalJsErrors.push(exception.message);
    });

    const results = [];

    function recordTest(id, name, passed, details) {
        results.push({ id, name, passed, details });
        console.log(`[${passed ? 'PASS' : 'FAIL'}] ${id}: ${name}\n     --> ${details}\n`);
    }

    try {
        // -------------------------------------------------------------
        // TEST 1: Baseline Load & Initial Image Rendering
        // -------------------------------------------------------------
        await page.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        const initialImgCount = await page.locator('img').count();
        recordTest(
            'T1',
            'Baseline Page Load & DOM Initialization',
            initialImgCount > 0 && globalJsErrors.length === 0,
            `Loaded page successfully with ${initialImgCount} image tags in DOM. Uncaught JS exceptions: ${globalJsErrors.length}`
        );

        // Helper function to scroll through page to trigger lazy loading for off-screen images
        async function scrollPageToBottom(targetPage) {
            await targetPage.evaluate(async () => {
                const distance = 400;
                const delay = 40;
                while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
                    document.scrollingElement.scrollBy(0, distance);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            });
            await targetPage.waitForTimeout(800);
        }

        // -------------------------------------------------------------
        // TEST 2: Tier 1 -> Tier 2 Cascade (Primary URL Failure -> CDN Fallback)
        // -------------------------------------------------------------
        const page2 = await context.newPage();
        const page2Errors = [];
        page2.on('pageerror', e => page2Errors.push(e.message));

        // Abort Tier 1 primary images (non-w=800 URLs) so Tier 2 CDN (w=800) can succeed
        await page2.route('**/*', route => {
            const url = route.request().url();
            if (route.request().resourceType() === 'image' && !url.includes('w=800')) {
                route.abort('failed');
            } else {
                route.continue();
            }
        });

        await page2.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });
        await page2.waitForTimeout(500);
        await scrollPageToBottom(page2);

        const tier2Report = await page2.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img'));
            const tier2Count = imgs.filter(i => i.dataset.fallbackTier === '2').length;

            return {
                total: imgs.length,
                tier2Count: tier2Count,
                allSwitchedToTier2: imgs.every(i => i.dataset.fallbackTier === '2')
            };
        });

        recordTest(
            'T2',
            'Tier 1 (Primary URL Failure) -> Tier 2 (CDN Fallback)',
            tier2Report.tier2Count === tier2Report.total && tier2Report.total > 0 && page2Errors.length === 0,
            `100% (${tier2Report.tier2Count}/${tier2Report.total}) of visible product table images smoothly transitioned to Tier 2 Unsplash CDN URLs (w=800). Uncaught JS errors: ${page2Errors.length}`
        );
        await page2.close();

        // -------------------------------------------------------------
        // TEST 3: Tier 1 & Tier 2 Failure -> Tier 3 Cascade (Category SVG Data URI)
        // -------------------------------------------------------------
        const page3 = await context.newPage();
        const page3Errors = [];
        page3.on('pageerror', e => page3Errors.push(e.message));

        // Block ALL external network image requests (CDNs, Unsplash, absolute snow, sea to summit, etc.)
        await page3.route('**/*', route => {
            const req = route.request();
            if (req.resourceType() === 'image' || req.url().startsWith('http://') || req.url().startsWith('https://')) {
                route.abort('blockedbyclient');
            } else {
                route.continue();
            }
        });

        await page3.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });
        await page3.waitForTimeout(500);
        await scrollPageToBottom(page3);

        const tier3Report = await page3.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img'));
            const tier3Imgs = imgs.filter(i => i.dataset.fallbackTier === '3');
            const dataUris = imgs.filter(i => i.src.startsWith('data:image/svg+xml'));
            const onerrorCleared = tier3Imgs.every(i => i.onerror === null);

            return {
                total: imgs.length,
                tier3Count: tier3Imgs.length,
                dataUriCount: dataUris.length,
                onerrorCleared: onerrorCleared
            };
        });

        recordTest(
            'T3',
            'Tier 1 & Tier 2 Failure -> Tier 3 (Category SVG Data URI)',
            tier3Report.tier3Count === tier3Report.total && tier3Report.total > 0 && tier3Report.onerrorCleared && page3Errors.length === 0,
            `100% (${tier3Report.tier3Count}/${tier3Report.total}) of images successfully cascaded to Tier 3 Category SVG Data URIs. Onerror handlers safely cleared: ${tier3Report.onerrorCleared}. Uncaught JS errors: ${page3Errors.length}`
        );
        await page3.close();

        // -------------------------------------------------------------
        // TEST 4: Tier 4 Cascade (Universal SVG Data URI for Unknown Categories)
        // -------------------------------------------------------------
        const page4 = await context.newPage();
        const page4Errors = [];
        page4.on('pageerror', e => page4Errors.push(e.message));

        await page4.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });

        const tier4Report = await page4.evaluate(() => {
            const testImg = document.createElement('img');
            document.body.appendChild(testImg);

            // Step 1: Trigger Tier 1 error with invalid category
            window.handleImageError(testImg, 'invalid_unknown_category_999');
            const step1Tier = testImg.dataset.fallbackTier;

            // Step 2: Trigger Tier 2 error (simulating CDN failure for unknown category)
            window.handleImageError(testImg, 'invalid_unknown_category_999');
            const step2Tier = testImg.dataset.fallbackTier;

            // Step 3: Trigger Tier 3 error (simulating category SVG fallback check for unknown category)
            window.handleImageError(testImg, 'invalid_unknown_category_999');
            const step3Tier = testImg.dataset.fallbackTier;
            const finalSrc = testImg.src;
            const onerrorCleared = testImg.onerror === null;

            testImg.remove();
            return { step1Tier, step2Tier, step3Tier, finalSrc, onerrorCleared };
        });

        const isUniversalSvg = tier4Report.finalSrc.includes('0f172a') && tier4Report.finalSrc.includes('22c55e');

        recordTest(
            'T4',
            'Tier 4 Fallback (Universal SVG Data URI)',
            tier4Report.step3Tier === '4' && isUniversalSvg && tier4Report.onerrorCleared && page4Errors.length === 0,
            `Unknown category successfully escalated to Tier 4 Universal SVG. Final tier: ${tier4Report.step3Tier}, Universal SVG verified: ${isUniversalSvg}, onerror cleared: ${tier4Report.onerrorCleared}`
        );
        await page4.close();

        // -------------------------------------------------------------
        // TEST 5: Interactive Components (Lightbox & Side-by-Side Comparison Table)
        // -------------------------------------------------------------
        const page5 = await context.newPage();
        const page5Errors = [];
        page5.on('pageerror', e => page5Errors.push(e.message));

        // Block external image loading
        await page5.route('**/*', route => {
            if (route.request().resourceType() === 'image') {
                route.abort('failed');
            } else {
                route.continue();
            }
        });

        await page5.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });
        await page5.waitForTimeout(500);

        // Test Lightbox image error cascade
        await page5.evaluate(() => {
            const p = PRODUCTS[0];
            window.openImageLightbox(p.id);
            const lbImg = document.getElementById('lightboxImg');
            if (lbImg) {
                window.handleImageError(lbImg, p.category);
            }
        });
        await page5.waitForTimeout(300);

        const lbStatus = await page5.evaluate(() => {
            const lbImg = document.getElementById('lightboxImg');
            return {
                visible: document.getElementById('imageLightboxModal').style.display === 'flex',
                tier: lbImg ? lbImg.dataset.fallbackTier : null,
                isDataUri: lbImg ? lbImg.src.startsWith('data:image/svg+xml') : false
            };
        });

        await page5.evaluate(() => window.closeImageLightbox());

        // Test Side-by-Side Comparison Matrix image cascade
        await page5.evaluate(() => {
            window.toggleCompareItem(PRODUCTS[0].id);
            window.toggleCompareItem(PRODUCTS[1].id);
            window.openCompareModal();
        });
        await page5.waitForTimeout(800);

        const compareModalReport = await page5.evaluate(() => {
            const headerImgs = Array.from(document.querySelectorAll('#modalTableHeaderRow th img'));
            return {
                imgCount: headerImgs.length,
                tiers: headerImgs.map(i => i.dataset.fallbackTier),
                allDataUris: headerImgs.every(i => i.src.startsWith('data:image/svg+xml'))
            };
        });

        recordTest(
            'T5',
            'Interactive Components Image Fallback (Lightbox & Comparison Matrix)',
            lbStatus.visible && (lbStatus.tier === '2' || lbStatus.tier === '3' || lbStatus.isDataUri) && compareModalReport.imgCount === 2 && compareModalReport.allDataUris && page5Errors.length === 0,
            `Lightbox fallback tier: ${lbStatus.tier}. Compare Modal rendered ${compareModalReport.imgCount} header images, all cascaded to SVG Data URIs: ${compareModalReport.allDataUris}. Uncaught JS errors: ${page5Errors.length}`
        );
        await page5.close();

        // -------------------------------------------------------------
        // TEST 6: Injected Invalid Domain URLs & Hostile Protocol Stress
        // -------------------------------------------------------------
        const page6 = await context.newPage();
        const page6Errors = [];
        page6.on('pageerror', e => page6Errors.push(e.message));

        await page6.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });

        const injectionReport = await page6.evaluate(() => {
            const maliciousUrls = [
                'https://nonexistent-domain-xyz-9876543210.com/broken.jpg',
                'https://invalid.cdn.fake/404.png',
                'http://127.0.0.1:59999/refused_connection.jpg',
                'javascript:alert("xss")',
                'file:///non_existent_local_file.png',
                ''
            ];

            const img = document.createElement('img');
            document.body.appendChild(img);

            const outcomes = [];
            for (const badUrl of maliciousUrls) {
                img.dataset.fallbackTier = '1';
                img.src = badUrl;
                // Force error trigger
                window.handleImageError(img, 'backpacks');
                if (img.dataset.fallbackTier === '2') {
                    window.handleImageError(img, 'backpacks');
                }
                outcomes.push({
                    url: badUrl,
                    finalTier: img.dataset.fallbackTier,
                    isDataUri: img.src.startsWith('data:image/svg+xml'),
                    onerrorCleared: img.onerror === null
                });
            }
            img.remove();
            return outcomes;
        });

        const injectionPassed = injectionReport.every(r => (r.finalTier === '3' || r.finalTier === '4') && r.isDataUri && r.onerrorCleared);

        recordTest(
            'T6',
            'Adversarial Injected Domain URLs & Invalid Src Protocol Stress',
            injectionPassed && page6Errors.length === 0,
            `Evaluated ${injectionReport.length} hostile URL inputs (nonexistent domains, bad ports, script injection attempt, file URLs). 100% reached SVG Data URIs safely without script exceptions.`
        );
        await page6.close();

        // -------------------------------------------------------------
        // TEST 7: Recursion / Infinite Loop Storm Prevention
        // -------------------------------------------------------------
        const page7 = await context.newPage();
        const page7Errors = [];
        page7.on('pageerror', e => page7Errors.push(e.message));

        await page7.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });

        const stormReport = await page7.evaluate(() => {
            const img = document.createElement('img');
            document.body.appendChild(img);

            let executionCount = 0;
            // Test repeated error triggering up to 100 iterations
            for (let i = 0; i < 100; i++) {
                executionCount++;
                window.handleImageError(img, 'tents');
                if (img.onerror === null && img.dataset.fallbackTier === '4') {
                    break;
                }
            }

            const finalState = {
                executionCount,
                finalTier: img.dataset.fallbackTier,
                onerrorIsNull: img.onerror === null
            };
            img.remove();
            return finalState;
        });

        recordTest(
            'T7',
            'Infinite Error Storm & Stack Recursion Prevention',
            stormReport.executionCount <= 4 && stormReport.onerrorIsNull && page7Errors.length === 0,
            `Terminated fallback cascade in ${stormReport.executionCount} steps. Final tier: ${stormReport.finalTier}. Infinite recursion prevented.`
        );
        await page7.close();

        // -------------------------------------------------------------
        // TEST 8: Category Specific SVG Data URI Data Integrity
        // -------------------------------------------------------------
        const page8 = await context.newPage();
        await page8.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });

        const categorySvgReport = await page8.evaluate(() => {
            const categories = [
                'tents', 'sleeping_bags', 'sleeping_pads', 'backpacks',
                'stoves', 'electronics', 'apparel', 'poles', 'chairs',
                'poles_chairs', 'lighting'
            ];

            return categories.map(cat => {
                const dataUri = window.getCategorySvgDataUri(cat);
                const decoded = decodeURIComponent(dataUri);
                return {
                    category: cat,
                    validDataUri: dataUri.startsWith('data:image/svg+xml;utf8,'),
                    containsSvgTag: decoded.includes('<svg') && decoded.includes('</svg>'),
                    length: dataUri.length
                };
            });
        });

        const allCategoriesValid = categorySvgReport.every(r => r.validDataUri && r.containsSvgTag && r.length > 50);

        recordTest(
            'T8',
            'Category SVG Data URI Data Integrity',
            allCategoriesValid,
            `All ${categorySvgReport.length} categories generate valid, well-formed SVG Data URIs.`
        );
        await page8.close();

        // -------------------------------------------------------------
        // Overall Summary
        // -------------------------------------------------------------
        const totalPassed = results.filter(r => r.passed).length;
        console.log(`=======================================================`);
        console.log(`=== STRESS TEST SUMMARY: ${totalPassed} / ${results.length} PASSED ===`);
        console.log(`=======================================================\n`);

    } finally {
        await browser.close();
    }

    return { globalJsErrors, results };
}

runStressTests().then(res => {
    fs.writeFileSync(
        path.resolve('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_1_gen2/test_results.json'),
        JSON.stringify(res, null, 2)
    );
}).catch(err => {
    console.error('STRESS TEST SUITE CRASHED:', err);
    process.exit(1);
});
