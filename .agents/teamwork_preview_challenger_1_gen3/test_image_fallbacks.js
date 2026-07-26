const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TARGET_FILE = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function runAdversarialStressTests() {
    console.log('====================================================');
    console.log('STARTING ADVERSARIAL IMAGE FALLBACK STRESS TESTS');
    console.log('Target:', TARGET_FILE);
    console.log('====================================================\n');

    const browser = await chromium.launch({ headless: true });

    const results = {
        passed: [],
        failed: [],
        consoleErrors: [],
        pageErrors: [],
        details: {}
    };

    const context = await browser.newContext();
    const page = await context.newPage();

    // Track console errors and uncaught exceptions
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error(' [CONSOLE ERROR]', msg.text());
            results.consoleErrors.push(msg.text());
        }
    });

    page.on('pageerror', err => {
        console.error(' [UNCAUGHT EXCEPTION]', err.message);
        results.pageErrors.push(err.message);
    });

    // Helper to scroll page and trigger lazy loading
    async function scrollFullPage() {
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
                }, 50);
            });
        });
        await page.waitForTimeout(1000);
    }

    // ----------------------------------------------------
    // TEST 1: Force 404 / Offline on External Product Images
    // ----------------------------------------------------
    console.log('--- TEST 1: Force 404 / Offline on External Product Images ---');
    
    // Intercept image network requests and fail them
    await page.route('**/*.{png,jpg,jpeg,webp,gif}*', route => route.abort());
    await page.route('https://images.unsplash.com/**', route => route.abort());
    await page.route('https://cdn.absolute-snow.co.uk/**', route => route.abort());
    await page.route('https://seatosummit.com/**', route => route.abort());
    await page.route('https://www.adventurealan.com/**', route => route.abort());

    await page.goto(TARGET_FILE, { waitUntil: 'load' });
    await scrollFullPage();

    const imagesStatus = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
            src: img.src,
            fallbackTier: img.dataset.fallbackTier,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            isDataUri: img.src.startsWith('data:image/svg+xml')
        }));
    });

    console.log(`Total images rendered on page: ${imagesStatus.length}`);
    const dataUriCount = imagesStatus.filter(i => i.isDataUri).length;
    console.log(`Images successfully converted to SVG Data URI: ${dataUriCount}/${imagesStatus.length}`);
    results.details.test1 = { totalImages: imagesStatus.length, dataUriCount };

    if (dataUriCount === imagesStatus.length && imagesStatus.length > 0) {
        console.log('✅ TEST 1 PASSED: All 101 product images successfully fell back to SVG Data URIs when external images failed.');
        results.passed.push('Test 1: Force 404 / Network Offline Image Fallback');
    } else {
        console.error('❌ TEST 1 FAILED: Some images did not fall back to SVG Data URIs.');
        results.failed.push('Test 1: Force 404 / Network Offline Image Fallback');
    }

    // ----------------------------------------------------
    // TEST 2: Fallback SVG XML Syntax Integrity
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Fallback SVG XML Syntax Integrity ---');

    const svgParseResults = await page.evaluate(() => {
        const categories = [
            'tents', 'sleeping_bags', 'sleeping_pads', 'backpacks', 
            'stoves', 'electronics', 'apparel', 'poles', 'chairs', 
            'poles_chairs', 'lighting', 'radios', 'unknown_cat', '', null, undefined
        ];
        const parser = new DOMParser();
        const errors = [];

        // Check category SVGs
        for (const cat of categories) {
            const uri = getCategorySvgDataUri(cat);
            if (!uri.startsWith('data:image/svg+xml;utf8,')) {
                errors.push(`Category ${cat} returned invalid URI format`);
                continue;
            }
            const svgString = decodeURIComponent(uri.replace('data:image/svg+xml;utf8,', ''));
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                errors.push(`Category ${cat} SVG XML Parse Error: ${parserError.textContent}`);
            }
        }

        // Check universal SVG
        const uniUri = UNIVERSAL_EQUIPMENT_SVG;
        const uniSvg = decodeURIComponent(uniUri.replace('data:image/svg+xml;utf8,', ''));
        const uniDoc = parser.parseFromString(uniSvg, 'image/svg+xml');
        if (uniDoc.querySelector('parsererror')) {
            errors.push(`Universal SVG XML Parse Error: ${uniDoc.querySelector('parsererror').textContent}`);
        }

        return errors;
    });

    results.details.test2 = { parseErrors: svgParseResults };

    if (svgParseResults.length === 0) {
        console.log('✅ TEST 2 PASSED: All generated category & universal SVGs have valid XML/SVG syntax.');
        results.passed.push('Test 2: Fallback SVG XML Syntax Integrity');
    } else {
        console.error('❌ TEST 2 FAILED:', svgParseResults);
        results.failed.push('Test 2: Fallback SVG XML Syntax Integrity');
    }

    // ----------------------------------------------------
    // TEST 3: Missing / Unknown / Malformed Category Keys
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Missing / Unknown / Malformed Category Keys ---');

    const categoryEdgeResults = await page.evaluate(() => {
        const testCases = [
            { category: undefined, desc: 'undefined category' },
            { category: null, desc: 'null category' },
            { category: '', desc: 'empty string category' },
            { category: '   ', desc: 'whitespace category' },
            { category: 'non_existent_category_xyz', desc: 'unknown category' },
            { category: 'TENTS', desc: 'uppercase category' },
            { category: ' Sleeping Bags ', desc: 'spaces category' },
            { category: 'stoves-kitchen', desc: 'hyphenated category' }
        ];

        const errors = [];
        const img = document.createElement('img');
        document.body.appendChild(img);

        for (const tc of testCases) {
            try {
                img.dataset.fallbackTier = '1';
                handleImageError(img, tc.category);
                
                // If it set src to Tier 2 CDN URL and it fails, trigger Tier 2 error
                if (img.dataset.fallbackTier === '2') {
                    handleImageError(img, tc.category);
                }

                // Verify it ends up at Tier 3 or 4 with valid data URI
                if (!img.src.startsWith('data:image/svg+xml')) {
                    errors.push(`Failed for ${tc.desc}: src is ${img.src}`);
                }
            } catch (err) {
                errors.push(`Exception for ${tc.desc}: ${err.message}`);
            }
        }

        img.remove();
        return errors;
    });

    results.details.test3 = { errors: categoryEdgeResults };

    if (categoryEdgeResults.length === 0) {
        console.log('✅ TEST 3 PASSED: Robust handling of missing, unknown, uppercase, and whitespace category keys.');
        results.passed.push('Test 3: Missing / Unknown / Malformed Category Keys');
    } else {
        console.error('❌ TEST 3 FAILED:', categoryEdgeResults);
        results.failed.push('Test 3: Missing / Unknown / Malformed Category Keys');
    }

    // ----------------------------------------------------
    // TEST 4: Lightbox Modal Opening/Closing under Broken State
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Lightbox Modal Opening/Closing under Broken State ---');

    const lightboxTest = await page.evaluate(async () => {
        const errors = [];
        const modal = document.getElementById('imageLightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');

        // Test every product in PRODUCTS
        for (const p of PRODUCTS) {
            try {
                openImageLightbox(p.id);

                // Verify modal is visible
                if (modal.style.display !== 'flex' || !modal.classList.contains('active')) {
                    errors.push(`Modal did not open properly for product ${p.id}`);
                }

                // Simulate broken image event if src is external
                if (lightboxImg.src.startsWith('http')) {
                    lightboxImg.onerror();
                    if (lightboxImg.dataset.fallbackTier === '2' && lightboxImg.src.startsWith('http')) {
                        lightboxImg.onerror();
                    }
                }

                // Verify image resolved to data URI SVG
                if (!lightboxImg.src.startsWith('data:image/svg+xml')) {
                    errors.push(`Lightbox image failed fallback for product ${p.id}: src=${lightboxImg.src}`);
                }

                closeImageLightbox();

                if (modal.style.display !== 'none' || modal.classList.contains('active')) {
                    errors.push(`Modal did not close properly for product ${p.id}`);
                }
            } catch (err) {
                errors.push(`Exception in lightbox test for product ${p.id}: ${err.message}`);
            }
        }

        return errors;
    });

    results.details.test4 = { errors: lightboxTest };

    if (lightboxTest.length === 0) {
        console.log('✅ TEST 4 PASSED: Lightbox opened/closed cleanly for all products with broken images.');
        results.passed.push('Test 4: Lightbox Modal under Broken Image State');
    } else {
        console.error('❌ TEST 4 FAILED:', lightboxTest);
        results.failed.push('Test 4: Lightbox Modal under Broken Image State');
    }

    // ----------------------------------------------------
    // TEST 5: Rapid Stress Testing Lightbox Open/Close Controls
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Rapid Stress Testing Lightbox Open/Close Controls ---');

    let rapidErrors = 0;
    const productsToTest = await page.evaluate(() => PRODUCTS.slice(0, 10).map(p => p.id));

    for (let i = 0; i < 30; i++) {
        const prodId = productsToTest[i % productsToTest.length];
        
        // Open lightbox
        await page.evaluate((id) => openImageLightbox(id), prodId);
        
        const isVisible = await page.evaluate(() => {
            const m = document.getElementById('imageLightboxModal');
            return m.style.display === 'flex' && document.body.style.overflow === 'hidden';
        });

        if (!isVisible) rapidErrors++;

        // Close using different methods (close button, Escape key, backdrop click)
        const method = i % 3;
        if (method === 0) {
            await page.click('#imageLightboxModal .modal-close-btn');
        } else if (method === 1) {
            await page.keyboard.press('Escape');
        } else {
            await page.evaluate(() => closeImageLightbox({ target: { id: 'imageLightboxModal' } }));
        }

        const isClosed = await page.evaluate(() => {
            const m = document.getElementById('imageLightboxModal');
            return m.style.display === 'none' && document.body.style.overflow === '';
        });

        if (!isClosed) rapidErrors++;
    }

    results.details.test5 = { rapidErrors };

    if (rapidErrors === 0) {
        console.log('✅ TEST 5 PASSED: 30 rapid open/close cycles executed with 100% state consistency.');
        results.passed.push('Test 5: Rapid Lightbox Open/Close Stress Test');
    } else {
        console.error(`❌ TEST 5 FAILED: ${rapidErrors} errors occurred during rapid open/close.`);
        results.failed.push('Test 5: Rapid Lightbox Open/Close Stress Test');
    }

    // ----------------------------------------------------
    // TEST 6: View Mode Switch & Category Filter Resilience
    // ----------------------------------------------------
    console.log('\n--- TEST 6: View Mode Switch & Category Filter Resilience ---');

    const viewModeTest = await page.evaluate(() => {
        const errors = [];
        try {
            // Switch to Table Mode
            setViewMode('table');
            const tableImgs = document.querySelectorAll('#gearTableBody img');
            if (tableImgs.length === 0) errors.push('No images in table mode');

            // Switch to Grid Mode
            setViewMode('grid');
            const gridImgs = document.querySelectorAll('#cardContainer img');
            if (gridImgs.length === 0) errors.push('No images in grid mode');

            // Category filters
            for (const cat of CATEGORIES) {
                setCategoryFilter(cat.id);
                const visibleImgs = Array.from(document.querySelectorAll('img')).filter(img => img.offsetParent !== null);
                for (const img of visibleImgs) {
                    if (!img.src || img.src === 'about:blank') {
                        errors.push(`Blank image found under category filter ${cat.id}`);
                    }
                }
            }

            // Reset filters
            resetFilters();
        } catch (err) {
            errors.push(`Exception in view mode test: ${err.message}`);
        }
        return errors;
    });

    results.details.test6 = { errors: viewModeTest };

    if (viewModeTest.length === 0) {
        console.log('✅ TEST 6 PASSED: View mode switching and category filtering maintain image fallback stability.');
        results.passed.push('Test 6: View Mode Switch & Category Filter Resilience');
    } else {
        console.error('❌ TEST 6 FAILED:', viewModeTest);
        results.failed.push('Test 6: View Mode Switch & Category Filter Resilience');
    }

    // ----------------------------------------------------
    // TEST 7: Non-String Category Input Injection Stress Test
    // ----------------------------------------------------
    console.log('\n--- TEST 7: Non-String Category Input Injection Stress Test ---');

    const injectionTest = await page.evaluate(() => {
        const errors = [];

        try {
            getCategorySvgDataUri(99999);
            getCategorySvgDataUri({ invalid: true });
        } catch (e) {
            errors.push(`getCategorySvgDataUri threw error on non-string input: ${e.message}`);
        }

        try {
            handleImageError(document.createElement('img'), 99999);
            handleImageError(document.createElement('img'), { invalid: true });
        } catch (e) {
            errors.push(`handleImageError threw error on non-string category input: ${e.message}`);
        }

        return errors;
    });

    results.details.test7 = { errors: injectionTest };

    if (injectionTest.length === 0) {
        console.log('✅ TEST 7 PASSED: Non-string category injection handled without exception.');
        results.passed.push('Test 7: Non-String Category Injection');
    } else {
        console.error('❌ TEST 7 FAILED:', injectionTest);
        results.failed.push('Test 7: Non-String Category Injection');
    }

    await browser.close();

    console.log('\n====================================================');
    console.log('TEST SUMMARY');
    console.log(`Passed: ${results.passed.length}/7`);
    console.log(`Failed: ${results.failed.length}/7`);
    console.log(`Console Errors (network 404s intercepted): ${results.consoleErrors.length}`);
    console.log(`Page Uncaught Exceptions: ${results.pageErrors.length}`);
    console.log('====================================================');

    return results;
}

runAdversarialStressTests().then(res => {
    fs.writeFileSync(
        path.resolve(__dirname, 'test_results.json'),
        JSON.stringify(res, null, 2)
    );
}).catch(err => {
    console.error('Fatal test execution error:', err);
});
