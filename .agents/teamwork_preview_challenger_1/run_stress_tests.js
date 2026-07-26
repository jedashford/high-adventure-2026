const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TARGET_HTML_PATH = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function runTests() {
    console.log('Starting Empirical Stress Test Suite...');
    const browser = await chromium.launch({ headless: true });
    const report = {
        timestamp: new Date().toISOString(),
        summary: {},
        testSuites: {}
    };

    try {
        // -------------------------------------------------------------
        // Test Suite 1: Product Inventory & Data Model Verification
        // -------------------------------------------------------------
        console.log('\n--- Test Suite 1: Data Model & Product Count Verification ---');
        const page1 = await browser.newPage();
        
        const consoleErrors1 = [];
        page1.on('console', msg => {
            if (msg.type() === 'error') consoleErrors1.push(msg.text());
        });
        page1.on('pageerror', err => consoleErrors1.push(err.stack || err.message));

        await page1.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });

        const productCount = await page1.evaluate(() => typeof PRODUCTS !== 'undefined' ? PRODUCTS.length : null);
        const productsData = await page1.evaluate(() => PRODUCTS);
        const categoriesData = await page1.evaluate(() => CATEGORIES);

        console.log(`Total PRODUCTS found: ${productCount}`);
        
        // Detailed inventory check
        const categoryCounts = {};
        const profileCounts = { adult: 0, youth: 0, ultralight: 0, budget: 0 };
        const missingFields = [];

        productsData.forEach(p => {
            categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
            if (Array.isArray(p.profiles)) {
                if (p.profiles.includes('adult')) profileCounts.adult++;
                if (p.profiles.includes('youth')) profileCounts.youth++;
                if (p.profiles.includes('ultralight')) profileCounts.ultralight++;
                if (p.profiles.includes('budget')) profileCounts.budget++;
            }
            // Field validation
            const requiredKeys = ['id', 'name', 'brand', 'category', 'categoryName', 'msrp', 'currentPrice', 'weightOz', 'weightDisplay', 'rating', 'reviewCount', 'valueRating', 'verdict', 'imageUrl', 'profiles'];
            requiredKeys.forEach(key => {
                if (p[key] === undefined || p[key] === null) {
                    missingFields.push({ productId: p.id, missingKey: key });
                }
            });
        });

        console.log('Category Counts:', categoryCounts);
        console.log('Profile Counts:', profileCounts);

        const suite1Pass = (productCount === 41) && (missingFields.length === 0) && (consoleErrors1.length === 0);
        report.testSuites.inventory = {
            name: 'Product Inventory Verification',
            passed: suite1Pass,
            totalProducts: productCount,
            expectedProducts: 41,
            missingFields,
            categoryBreakdown: categoryCounts,
            profileBreakdown: profileCounts,
            errors: consoleErrors1
        };
        console.log(`Suite 1 Result: ${suite1Pass ? 'PASS' : 'FAIL'}`);

        await page1.close();

        // -------------------------------------------------------------
        // Test Suite 2: Category Tabs & Profile Filters Interaction Test
        // -------------------------------------------------------------
        console.log('\n--- Test Suite 2: Category Tabs & Profile Filters Interaction Test ---');
        const page2 = await browser.newPage();
        const consoleErrors2 = [];
        page2.on('console', msg => {
            if (msg.type() === 'error') consoleErrors2.push(msg.text());
        });
        page2.on('pageerror', err => consoleErrors2.push(err.stack || err.message));

        await page2.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });

        const tabResults = [];
        const categoryIds = categoriesData.map(c => c.id);

        for (const catId of categoryIds) {
            await page2.evaluate((id) => setCategoryFilter(id), catId);
            await page2.waitForTimeout(50);

            const activeTabId = await page2.evaluate(() => state.activeCategory);
            const renderedCount = await page2.evaluate(() => {
                const tableRows = document.querySelectorAll('#gearTableBody tr');
                const cardGridItems = document.querySelectorAll('#cardContainer > div');
                return Math.max(tableRows.length, cardGridItems.length);
            });

            const expectedCount = await page2.evaluate((id) => {
                return PRODUCTS.filter(p => id === 'all' || p.category === id).length;
            }, catId);

            const pass = (activeTabId === catId) && (renderedCount === expectedCount);
            tabResults.push({ catId, activeTabId, renderedCount, expectedCount, pass });
        }

        const profileIds = ['all', 'adult', 'youth', 'ultralight', 'budget'];
        const profileResults = [];

        // Reset category tab to 'all'
        await page2.evaluate(() => setCategoryFilter('all'));

        for (const profId of profileIds) {
            await page2.evaluate((id) => setProfileFilter(id), profId);
            await page2.waitForTimeout(50);

            const activeProfileId = await page2.evaluate(() => state.activeProfile);
            const renderedCount = await page2.evaluate(() => {
                const tableRows = document.querySelectorAll('#gearTableBody tr');
                const cardGridItems = document.querySelectorAll('#cardContainer > div');
                return Math.max(tableRows.length, cardGridItems.length);
            });

            const expectedCount = await page2.evaluate((id) => {
                return PRODUCTS.filter(p => id === 'all' || (Array.isArray(p.profiles) && p.profiles.includes(id))).length;
            }, profId);

            const pass = (activeProfileId === profId) && (renderedCount === expectedCount);
            profileResults.push({ profId, activeProfileId, renderedCount, expectedCount, pass });
        }

        // Test combination matrix (10 Categories x 5 Profiles = 50 combinations)
        let comboFailures = 0;
        let comboTotal = 0;
        const comboDetails = [];

        for (const catId of categoryIds) {
            for (const profId of profileIds) {
                comboTotal++;
                await page2.evaluate(({ c, p }) => {
                    setCategoryFilter(c);
                    setProfileFilter(p);
                }, { c: catId, p: profId });
                await page2.waitForTimeout(10);

                const renderedCount = await page2.evaluate(() => {
                    const tableRows = document.querySelectorAll('#gearTableBody tr');
                    const cardGridItems = document.querySelectorAll('#cardContainer > div');
                    return Math.max(tableRows.length, cardGridItems.length);
                });

                const expectedCount = await page2.evaluate(({ c, p }) => {
                    return PRODUCTS.filter(item => {
                        const matchCat = (c === 'all' || item.category === c);
                        const matchProf = (p === 'all' || (Array.isArray(item.profiles) && item.profiles.includes(p)));
                        return matchCat && matchProf;
                    }).length;
                }, { c: catId, p: profId });

                const match = (renderedCount === expectedCount);
                if (!match) comboFailures++;
                comboDetails.push({ catId, profId, renderedCount, expectedCount, match });
            }
        }

        // Also test UI click interaction via DOM elements directly
        console.log('Testing direct DOM clicks for category tabs & profile pills...');
        const tabClickResults = [];
        for (const cat of categoriesData) {
            const btnSelector = `#categoryTabs button[onclick*="${cat.id}"]`;
            const btn = page2.locator(btnSelector).first();
            if (await btn.count() > 0) {
                await btn.click();
                await page2.waitForTimeout(50);
                const activeCat = await page2.evaluate(() => state.activeCategory);
                tabClickResults.push({ catId: cat.id, activeCat, ok: activeCat === cat.id });
            }
        }

        const profileClickResults = [];
        for (const profId of profileIds) {
            const btnSelector = `button.profile-pill-btn[data-profile="${profId}"]`;
            const btn = page2.locator(btnSelector).first();
            if (await btn.count() > 0) {
                await btn.click();
                await page2.waitForTimeout(50);
                const activeProf = await page2.evaluate(() => state.activeProfile);
                profileClickResults.push({ profId, activeProf, ok: activeProf === profId });
            }
        }

        const suite2Pass = (tabResults.every(r => r.pass)) && 
                           (profileResults.every(r => r.pass)) && 
                           (tabClickResults.every(r => r.ok)) &&
                           (profileClickResults.every(r => r.ok)) &&
                           (comboFailures === 0) && 
                           (consoleErrors2.length === 0);

        report.testSuites.filtersAndTabs = {
            name: 'Category Tabs and Profile Filter Suite',
            passed: suite2Pass,
            tabResults,
            profileResults,
            tabClickResults,
            profileClickResults,
            comboTotal,
            comboFailures,
            errors: consoleErrors2
        };
        console.log(`Suite 2 Result: ${suite2Pass ? 'PASS' : 'FAIL'}`);

        await page2.close();

        // -------------------------------------------------------------
        // Test Suite 3: Image Fallback Cascade Stress Testing
        // -------------------------------------------------------------
        console.log('\n--- Test Suite 3: Image Fallback Cascade Stress Test ---');

        // Subtest 3A: Baseline default loading test
        const page3Baseline = await browser.newPage();
        const consoleErrors3Base = [];
        page3Baseline.on('console', msg => {
            if (msg.type() === 'error') consoleErrors3Base.push(msg.text());
        });
        page3Baseline.on('pageerror', err => consoleErrors3Base.push(err.stack || err.message));

        await page3Baseline.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });
        await page3Baseline.waitForTimeout(500);

        const baselineImgs = await page3Baseline.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img, #cardContainer img'));
            return imgs.map(img => ({
                src: img.src,
                fallbackTier: img.dataset.fallbackTier || '1',
                complete: img.complete
            }));
        });
        console.log(`Baseline Product Images Loaded in DOM: ${baselineImgs.length}`);
        await page3Baseline.close();

        // Subtest 3B & 3C: Injection of Invalid Tier 1 URLs + Network Block of Tier 2 CDN
        const page3 = await browser.newPage();
        const consoleErrors3 = [];
        page3.on('console', msg => {
            if (msg.type() === 'error') consoleErrors3.push(msg.text());
        });
        page3.on('pageerror', err => consoleErrors3.push(err.stack || err.message));

        // Block external image loading (simulating Tier 2 CDN network outage)
        await page3.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => {
            const url = route.request().url();
            if (url.startsWith('data:')) {
                route.continue();
            } else {
                route.abort('failed');
            }
        });
        await page3.route('**/*unsplash.com/**', route => route.abort('failed'));
        await page3.route('**/*invalid-domain*.example/**', route => route.abort('failed'));

        await page3.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });

        // Mutate all products in PRODUCTS array to invalid URLs (Tier 1 injection)
        await page3.evaluate(() => {
            PRODUCTS.forEach((p, idx) => {
                p.imageUrl = `https://invalid-domain-test-${idx}.example/nonexistent_${idx}.jpg`;
            });
            renderProducts();
        });

        await page3.waitForTimeout(1000); // Allow error events to trigger and cascade through handleImageError

        // Inspect image elements DOM status
        const fallbackStatus = await page3.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img, #cardContainer img'));
            const statusList = imgs.map((img, i) => ({
                index: i,
                src: img.src.substring(0, 60) + '...',
                fallbackTier: img.dataset.fallbackTier,
                isDataUri: img.src.startsWith('data:image/svg+xml'),
                complete: img.complete
            }));
            return {
                totalImgs: imgs.length,
                tier3Count: statusList.filter(s => s.fallbackTier === '3').length,
                tier4Count: statusList.filter(s => s.fallbackTier === '4').length,
                dataUriCount: statusList.filter(s => s.isDataUri).length,
                sample: statusList.slice(0, 5)
            };
        });

        console.log('Fallback Cascade Status (Tier 1 Invalid + Tier 2 Network Blocked):');
        console.log(`  Total Product Images in DOM: ${fallbackStatus.totalImgs}`);
        console.log(`  Images Reached Tier 3 (Category SVG): ${fallbackStatus.tier3Count}`);
        console.log(`  Images Reached Tier 4 (Universal SVG): ${fallbackStatus.tier4Count}`);
        console.log(`  Images displaying Data-URI SVG: ${fallbackStatus.dataUriCount}`);

        // Subtest 3D: Edge case - Unknown/Invalid Category Fallback to Tier 4 Universal SVG
        const tier4TestResult = await page3.evaluate(() => {
            const dummyImg = document.createElement('img');
            dummyImg.dataset.fallbackTier = '1';
            dummyImg.src = 'https://invalid-domain.example/invalid.jpg';
            
            // Step 1: Call handleImageError for invalid category
            handleImageError(dummyImg, 'nonexistent_category_xyz');
            const tierAfterStep1 = dummyImg.dataset.fallbackTier; // Should be '3' because cdnUrl is undefined
            const srcAfterStep1 = dummyImg.src;

            // Step 2: Trigger error on the Tier 3 SVG / next failure
            handleImageError(dummyImg, 'nonexistent_category_xyz');
            
            return {
                tierAfterStep1,
                finalTier: dummyImg.dataset.fallbackTier,
                finalSrc: dummyImg.src,
                onerrorIsNull: dummyImg.onerror === null,
                isUniversalSvg: dummyImg.src === UNIVERSAL_EQUIPMENT_SVG
            };
        });

        console.log('Tier 4 Universal SVG Fallback Test:', tier4TestResult);

        // Subtest 3E: Lightbox Image Modal Stress Test with Broken Image
        await page3.evaluate(() => {
            openImageLightbox('tent-rei-halfdome');
        });
        await page3.waitForTimeout(300);

        // Trigger error on lightboxImg if not already fired
        await page3.evaluate(() => {
            const lightboxImg = document.getElementById('lightboxImg');
            if (lightboxImg) {
                handleImageError(lightboxImg, 'tents');
                handleImageError(lightboxImg, 'tents');
            }
        });

        const lightboxStatus = await page3.evaluate(() => {
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxModal = document.getElementById('imageLightboxModal');
            const title = document.getElementById('lightboxTitle').innerText;
            return {
                modalDisplay: lightboxModal ? window.getComputedStyle(lightboxModal).display : 'none',
                modalTitle: title,
                fallbackTier: lightboxImg.dataset.fallbackTier,
                isDataUri: lightboxImg.src.startsWith('data:image/svg+xml')
            };
        });

        console.log('Lightbox Modal Status under Image Error:', lightboxStatus);

        const suite3Pass = (fallbackStatus.totalImgs > 0) &&
                           (fallbackStatus.dataUriCount === fallbackStatus.totalImgs) &&
                           (tier4TestResult.isUniversalSvg) &&
                           (lightboxStatus.modalDisplay !== 'none') &&
                           (consoleErrors3.length === 0);

        report.testSuites.imageFallback = {
            name: 'Image Fallback Cascade Stress Test',
            passed: suite3Pass,
            fallbackStatus,
            tier4TestResult,
            lightboxStatus,
            errors: consoleErrors3
        };
        console.log(`Suite 3 Result: ${suite3Pass ? 'PASS' : 'FAIL'}`);

        await page3.close();

        // -------------------------------------------------------------
        // Summary Assessment
        // -------------------------------------------------------------
        const allSuitesPassed = suite1Pass && suite2Pass && suite3Pass;
        report.summary = {
            overallResult: allSuitesPassed ? 'PASS' : 'FAIL',
            suitesPassed: [suite1Pass, suite2Pass, suite3Pass].filter(Boolean).length,
            totalSuites: 3
        };

        console.log('\n==================================================');
        console.log(`OVERALL STRESS TEST RESULT: ${report.summary.overallResult}`);
        console.log('==================================================');

    } catch (err) {
        console.error('Test Execution Error:', err);
        report.summary = { overallResult: 'FAIL', fatalError: err.stack || err.message };
    } finally {
        await browser.close();
        fs.writeFileSync(
            path.resolve('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_1/test_results.json'),
            JSON.stringify(report, null, 2)
        );
        console.log('Wrote results to test_results.json');
    }
}

runTests();
