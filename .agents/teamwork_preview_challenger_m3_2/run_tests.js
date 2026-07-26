const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TARGET_HTML_PATH = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function runTestSuite() {
    const browser = await chromium.launch({ headless: true });
    const report = {
        timestamp: new Date().toISOString(),
        edgeCaseInteractions: {},
        mobileViewportResilience: {},
        imageFallback: {},
        summary: []
    };

    console.log('=== STARTING EMPIRICAL TEST SUITE ===');

    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('dialog', async dialog => {
        console.log(`[Browser Dialog] Type: ${dialog.type()}, Message: "${dialog.message()}"`);
        await dialog.dismiss();
    });

    await page.goto(TARGET_HTML_PATH);
    await page.waitForLoadState('domcontentloaded');

    // -------------------------------------------------------------
    // TEST SECTION 1: EDGE CASE INTERACTIONS
    // -------------------------------------------------------------
    
    // 1.1 Rapid Clicking between Profile Pills and Category Tabs
    console.log('\n--- Test 1.1: Rapid Clicking Profile Pills & Category Tabs ---');
    const profiles = ['all', 'adult', 'youth', 'ultralight', 'budget'];
    let rapidClickErrors = [];
    page.on('pageerror', err => rapidClickErrors.push(err.message));
    page.on('console', msg => {
        if (msg.type() === 'error') rapidClickErrors.push(msg.text());
    });

    for (let i = 0; i < 40; i++) {
        const pProf = profiles[i % profiles.length];
        const pTabIdx = (i % 5) + 1;
        await page.click(`.profile-pill-btn[data-profile="${pProf}"]`).catch(e => rapidClickErrors.push(e.message));
        await page.click(`#categoryTabs button:nth-child(${pTabIdx})`).catch(e => rapidClickErrors.push(e.message));
    }

    const activeProfile = await page.evaluate(() => state.activeProfile);
    const activeCategory = await page.evaluate(() => state.activeCategory);
    const renderedProductsCount = await page.evaluate(() => getFilteredAndSortedProducts().length);
    const resultsCountText = await page.innerText('#resultsCount');

    report.edgeCaseInteractions.rapidClicking = {
        pass: rapidClickErrors.length === 0 && parseInt(resultsCountText) === renderedProductsCount,
        errors: rapidClickErrors,
        activeProfile,
        activeCategory,
        resultsCountText: parseInt(resultsCountText),
        renderedProductsCount
    };
    console.log(`Rapid Click Result: Pass=${report.edgeCaseInteractions.rapidClicking.pass}, Errors=${rapidClickErrors.length}`);

    // 1.2 Edge Case Search Queries
    console.log('\n--- Test 1.2: Edge Case Search Queries ---');
    const testQueries = [
        { name: 'empty_string', query: '' },
        { name: 'leading_trailing_spaces', query: '   tent   ' },
        { name: 'only_spaces', query: '     ' },
        { name: 'newlines_tabs', query: '\t\ntent\n' },
        { name: 'xss_script', query: '<script>alert("xss")</script>' },
        { name: 'html_tags', query: '<div>tent</div>' },
        { name: 'sql_injection', query: "' OR '1'='1" },
        { name: 'non_matching_term', query: 'XYZ_NON_EXISTENT_GEAR_99999' },
        { name: 'special_characters', query: "5'4\"" },
        { name: 'degree_symbol', query: "20°F" },
        { name: 'case_insensitive_rei', query: 'rei' },
        { name: 'case_insensitive_REI', query: 'REI' }
    ];

    const searchResults = [];
    for (const t of testQueries) {
        await page.fill('#gearSearch', t.query);
        await page.dispatchEvent('#gearSearch', 'input');
        
        const count = await page.evaluate(() => getFilteredAndSortedProducts().length);
        const emptyStateVisible = await page.isVisible('#emptyState');
        const clearBtnVisible = await page.isVisible('#clearSearchBtn');
        const stateQuery = await page.evaluate(() => state.searchQuery);

        searchResults.push({
            name: t.name,
            query: JSON.stringify(t.query),
            stateQuery: JSON.stringify(stateQuery),
            count,
            emptyStateVisible,
            clearBtnVisible
        });
    }

    // Test Clear Search button
    await page.fill('#gearSearch', 'test query');
    await page.dispatchEvent('#gearSearch', 'input');
    await page.click('#clearSearchBtn');
    const searchAfterClear = await page.inputValue('#gearSearch');
    const countAfterClear = await page.evaluate(() => getFilteredAndSortedProducts().length);

    report.edgeCaseInteractions.searchQueries = {
        queries: searchResults,
        clearSearchWorks: searchAfterClear === '' && countAfterClear > 0
    };
    console.log(`Search Queries Tested: ${searchResults.length}. Clear Search Works=${report.edgeCaseInteractions.searchQueries.clearSearchWorks}`);

    // 1.3 Modal Soft-Lock Test (Compare Modal & Image Lightbox)
    console.log('\n--- Test 1.3: Modal Soft-Lock & Scroll State Restoration ---');
    await page.evaluate(() => resetFilters());
    
    // Select 2 items to compare
    await page.evaluate(() => {
        state.selectedCompareIds = [PRODUCTS[0].id, PRODUCTS[1].id];
        renderProducts();
    });
    
    // Sub-test A: Close Compare Modal via Escape Key
    await page.click('#openCompareModalBtn');
    await page.waitForTimeout(200);
    const modalActiveA = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    const bodyOverflowA = await page.evaluate(() => document.body.style.overflow);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const modalActiveAfterEsc = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    const bodyOverflowAfterEsc = await page.evaluate(() => document.body.style.overflow);

    // Sub-test B: Close Compare Modal via Backdrop Click
    await page.click('#openCompareModalBtn');
    await page.waitForTimeout(200);
    // Click on backdrop (outside modal container, at top-left corner)
    await page.click('#compareModal', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(200);
    const modalActiveAfterBackdrop = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    const bodyOverflowAfterBackdrop = await page.evaluate(() => document.body.style.overflow);

    // Sub-test C: Close Compare Modal via Close Button
    await page.click('#openCompareModalBtn');
    await page.waitForTimeout(200);
    await page.click('#compareModal .modal-close-btn');
    await page.waitForTimeout(200);
    const modalActiveAfterBtn = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    const bodyOverflowAfterBtn = await page.evaluate(() => document.body.style.overflow);

    // Sub-test D: Open Image Lightbox inside Compare Modal, then close Lightbox
    await page.click('#openCompareModalBtn');
    await page.waitForTimeout(200);
    const modalImg = await page.$('.compare-matrix-table img');
    let lightboxOpenedFromModal = false;
    let overflowStateDuringLightbox = '';
    let overflowStateAfterLightboxEsc = '';
    let compareModalActiveAfterLightboxEsc = false;

    if (modalImg) {
        await modalImg.click();
        await page.waitForTimeout(200);
        lightboxOpenedFromModal = await page.evaluate(() => document.getElementById('imageLightboxModal').classList.contains('active'));
        overflowStateDuringLightbox = await page.evaluate(() => document.body.style.overflow);
        
        // Press Escape -> Should close Lightbox AND/OR Compare Modal?
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
        overflowStateAfterLightboxEsc = await page.evaluate(() => document.body.style.overflow);
        compareModalActiveAfterLightboxEsc = await page.evaluate(() => document.getElementById('compareModal').classList.contains('active'));
    }
    
    // Ensure modals closed
    await page.evaluate(() => {
        closeCompareModal();
        closeImageLightbox();
    });

    report.edgeCaseInteractions.modalSoftLock = {
        escapeKey: { openedOverflow: bodyOverflowA, closedOverflow: bodyOverflowAfterEsc, closedActive: modalActiveAfterEsc },
        backdropClick: { closedOverflow: bodyOverflowAfterBackdrop, closedActive: modalActiveAfterBackdrop },
        closeBtn: { closedOverflow: bodyOverflowAfterBtn, closedActive: modalActiveAfterBtn },
        lightboxNestedInModal: {
            lightboxOpenedFromModal,
            overflowStateDuringLightbox,
            overflowStateAfterLightboxEsc,
            compareModalActiveAfterLightboxEsc
        }
    };
    console.log(`Modal Soft-Lock Test: Escape restores overflow="${bodyOverflowAfterEsc}", Backdrop restores overflow="${bodyOverflowAfterBackdrop}"`);
    console.log(`Lightbox inside Compare Modal: Esc overflow="${overflowStateAfterLightboxEsc}", Compare Modal active="${compareModalActiveAfterLightboxEsc}"`);

    // 1.4 Image Fallback Verification
    console.log('\n--- Test 1.4: Image Fallback Hierarchy ---');
    const fallbackResults = await page.evaluate(() => {
        const testImg = document.createElement('img');
        testImg.id = 'testFallback';
        testImg.dataset.category = 'tents';
        testImg.dataset.fallbackTier = '1';
        testImg.src = 'https://invalid-404-domain.test/fake.jpg';
        document.body.appendChild(testImg);

        const trace = [];
        trace.push({ tier: 1, src: testImg.src });

        // First error event (Tier 1 -> Tier 2)
        handleImageError(testImg, 'tents');
        trace.push({ tier: testImg.dataset.fallbackTier, src: testImg.src });

        // Second error event (Tier 2 -> Tier 3)
        handleImageError(testImg, 'tents');
        trace.push({ tier: testImg.dataset.fallbackTier, src: testImg.src });

        // Third error event (Tier 3 -> Tier 4)
        handleImageError(testImg, 'tents');
        trace.push({ tier: testImg.dataset.fallbackTier, src: testImg.src.substring(0, 40) + '...' });

        document.body.removeChild(testImg);
        return trace;
    });

    report.imageFallback = {
        hierarchyTrace: fallbackResults,
        universalSvgPresent: await page.evaluate(() => typeof UNIVERSAL_EQUIPMENT_SVG === 'string')
    };
    console.log(`Image Fallback Hierarchy Trace:`, fallbackResults);

    await page.close();

    // -------------------------------------------------------------
    // TEST SECTION 2: MOBILE VIEWPORT & LAYOUT RESILIENCE
    // -------------------------------------------------------------
    console.log('\n--- Test Section 2: Mobile Viewport & Layout Resilience ---');

    const viewports = [
        { name: 'iPhone SE (375px)', width: 375, height: 667 },
        { name: 'iPhone XR / Pro Max (414px)', width: 414, height: 896 },
        { name: 'iPad Portrait (768px)', width: 768, height: 1024 }
    ];

    report.mobileViewportResilience = {};

    for (const vp of viewports) {
        console.log(`\nTesting Viewport: ${vp.name}`);
        const mobPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        await mobPage.goto(TARGET_HTML_PATH);
        await mobPage.waitForLoadState('domcontentloaded');

        // Check outer viewport horizontal overflow
        const overflowAnalysis = await mobPage.evaluate(() => {
            const viewportWidth = window.innerWidth;
            const documentScrollWidth = document.documentElement.scrollWidth;
            const bodyScrollWidth = document.body.scrollWidth;

            const overflowingElements = [];
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > viewportWidth + 1.5) { // 1.5px tolerance
                    overflowingElements.push({
                        tagName: el.tagName,
                        id: el.id,
                        className: el.className,
                        right: Math.round(rect.right),
                        width: Math.round(rect.width),
                        overflowAmount: Math.round(rect.right - viewportWidth),
                        textSnippet: el.innerText ? el.innerText.trim().substring(0, 40) : ''
                    });
                }
            });

            return {
                viewportWidth,
                documentScrollWidth,
                bodyScrollWidth,
                hasHorizontalScrollbar: documentScrollWidth > viewportWidth + 1.5,
                overflowingElementsCount: overflowingElements.length,
                topOverflowingElements: overflowingElements.slice(0, 8)
            };
        });

        // Check Touch Target Sizes (< 44x44px)
        const touchTargets = await mobPage.evaluate(() => {
            const violations = [];
            const targets = document.querySelectorAll('button, a, input, select, label, .profile-pill-btn, .tab-btn, .view-btn, .modal-close-btn, .compare-chip-remove');

            targets.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null) return;

                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    if (rect.width < 44 || rect.height < 44) {
                        violations.push({
                            tagName: el.tagName,
                            id: el.id,
                            className: el.className,
                            label: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().substring(0, 30),
                            width: Math.round(rect.width),
                            height: Math.round(rect.height)
                        });
                    }
                }
            });

            return {
                totalChecked: targets.length,
                violationsCount: violations.length,
                violations
            };
        });

        // Check Layout Mode & Card Stacking
        const cardLayout = await mobPage.evaluate(() => {
            const cardGrid = document.getElementById('cardContainer');
            const tableWrapper = document.getElementById('tableContainer');
            const gridStyle = window.getComputedStyle(cardGrid);
            const tableStyle = window.getComputedStyle(tableWrapper);

            const cards = document.querySelectorAll('.product-card');
            const cardWidths = Array.from(cards).map(c => Math.round(c.getBoundingClientRect().width));

            return {
                gridDisplay: gridStyle.display,
                tableDisplay: tableStyle.display,
                cardCount: cards.length,
                cardWidths: cardWidths.slice(0, 5)
            };
        });

        // Check Typography & Text Readability
        const fontAnalysis = await mobPage.evaluate(() => {
            const smallTextElements = [];
            document.querySelectorAll('h1, h2, h3, p, span, button, a, label, div, td, th').forEach(el => {
                if (el.offsetParent === null) return;
                const style = window.getComputedStyle(el);
                const size = parseFloat(style.fontSize);
                if (size < 12 && el.innerText && el.innerText.trim().length > 0) {
                    smallTextElements.push({
                        tagName: el.tagName,
                        className: el.className,
                        size: size + 'px',
                        text: el.innerText.trim().substring(0, 30)
                    });
                }
            });
            return {
                smallTextCount: smallTextElements.length,
                smallTextElements: smallTextElements.slice(0, 8)
            };
        });

        report.mobileViewportResilience[vp.name] = {
            viewport: vp,
            overflowAnalysis,
            touchTargets,
            cardLayout,
            fontAnalysis
        };

        console.log(`[${vp.name}] Horizontal Scrollbar: ${overflowAnalysis.hasHorizontalScrollbar} (scrollWidth=${overflowAnalysis.documentScrollWidth}px vs viewport=${vp.width}px)`);
        console.log(`[${vp.name}] Overflowing Elements Count: ${overflowAnalysis.overflowingElementsCount}`);
        console.log(`[${vp.name}] Touch Target Violations (<44x44px): ${touchTargets.violationsCount}`);
        console.log(`[${vp.name}] Cards Grid Display: ${cardLayout.gridDisplay}, Table Display: ${cardLayout.tableDisplay}`);

        await mobPage.close();
    }

    await browser.close();

    // Save report to disk
    const jsonPath = path.resolve('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_m3_2/test_results.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`\n=== ALL TESTS EXECUTED SUCCESSFULLY. Results saved to ${jsonPath} ===`);
}

runTestSuite().catch(err => {
    console.error('Test Suite Failed:', err);
    process.exit(1);
});
