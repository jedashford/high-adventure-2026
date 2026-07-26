import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test.describe('Iteration 2 Re-Audit of High-Adventure Gear Comparison Hub', () => {

    test.beforeEach(async ({ page }) => {
        // Abort external network requests so image onerror triggers instantly in offline / CODE_ONLY environment
        await page.route('https://**', route => route.abort());
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForSelector('#gearTableBody tr');
    });

    test('1. Structure & Metrics Verification', async ({ page }) => {
        const titleText = await page.title();
        expect(titleText).toContain('High-Adventure Deal Matrix');

        // Verify 5 Profile Buttons
        const profileBtns = page.locator('.profile-pill-btn');
        await expect(profileBtns).toHaveCount(5);

        // Verify 11 Category Tabs (All + 10 category tabs: Tents, Bags, Pads, Backpacks, Stoves, Electronics, Apparel, Poles, Chairs, Lights)
        const categoryTabs = page.locator('#categoryTabs .tab-btn');
        await expect(categoryTabs).toHaveCount(11);

        // Verify 46 total products rendered initially
        const rows = page.locator('#gearTableBody tr');
        await expect(rows).toHaveCount(46);
        console.log('✓ UI Structure & initial 46 products verified');
    });

    test('2. Interactive Category Switching across all 9+ categories', async ({ page }) => {
        const categories = [
            { name: 'All Categories', count: 46 },
            { name: 'Tents', count: 7 },
            { name: 'Sleeping Bags', count: 6 },
            { name: 'Sleeping Pads', count: 4 },
            { name: 'Backpacks', count: 4 },
            { name: 'Stoves & Kitchen', count: 4 },
            { name: 'Electronics & Nav', count: 4 },
            { name: 'Apparel', count: 4 },
            { name: 'Trekking Poles', count: 4 },
            { name: 'Camp Chairs', count: 4 },
            { name: 'Headlamps & Lights', count: 5 }
        ];

        for (const cat of categories) {
            const tabBtn = page.locator(`#categoryTabs .tab-btn:has-text("${cat.name}")`);
            await expect(tabBtn).toBeVisible();
            await tabBtn.click();

            await expect(tabBtn).toHaveClass(/active/);
            const countText = await page.locator('#resultsCount').textContent();
            expect(parseInt(countText.trim(), 10)).toBe(cat.count);

            const rowCount = await page.locator('#gearTableBody tr').count();
            expect(rowCount).toBe(cat.count);
        }
        console.log('✓ Category switching verified across all categories');
    });

    test('3. User Profile Filtering across all 5 profiles', async ({ page }) => {
        const profiles = [
            { id: 'all', count: 46 },
            { id: 'adult', count: 34 },
            { id: 'youth', count: 23 },
            { id: 'ultralight', count: 24 },
            { id: 'budget', count: 20 }
        ];

        for (const prof of profiles) {
            const pill = page.locator(`.profile-pill-btn[data-profile="${prof.id}"]`);
            await pill.click();
            await expect(pill).toHaveClass(/active/);

            const countText = await page.locator('#resultsCount').textContent();
            expect(parseInt(countText.trim(), 10)).toBe(prof.count);

            const rowCount = await page.locator('#gearTableBody tr').count();
            expect(rowCount).toBe(prof.count);
        }
        console.log('✓ User profile filtering verified across all 5 profiles');
    });

    test('4. 100% Product Image Rendering with naturalWidth > 0 & naturalHeight > 0', async ({ page }) => {
        // Switch to All Profiles & All Categories
        await page.locator('.profile-pill-btn[data-profile="all"]').click();
        await page.locator('#categoryTabs .tab-btn:has-text("All Categories")').click();

        // Wait a short moment for image fallback handlers to execute
        await page.waitForTimeout(500);

        // Check image metrics in DOM
        const imgMetrics = await page.evaluate(async () => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img'));
            
            // Give lazy/fallback images a frame to render
            await new Promise(r => setTimeout(r, 200));

            return imgs.map((img, i) => ({
                index: i,
                alt: img.alt,
                src: img.currentSrc || img.src,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete,
                fallbackTier: img.dataset.fallbackTier || '1'
            }));
        });

        console.log(`Auditing ${imgMetrics.length} product images in table view...`);
        let failedImages = [];
        for (const img of imgMetrics) {
            if (img.naturalWidth <= 0 || img.naturalHeight <= 0 || !img.complete) {
                failedImages.push(img);
            }
        }

        if (failedImages.length > 0) {
            console.error('Failed Images:', failedImages);
        }
        console.log(`Result: ${imgMetrics.length - failedImages.length}/${imgMetrics.length} images rendered with naturalWidth > 0 and naturalHeight > 0.`);
        expect(failedImages.length).toBe(0);

        // Also test Card view
        await page.locator('#viewBtnGrid').click();
        await page.waitForTimeout(500);

        const cardImgMetrics = await page.evaluate(async () => {
            const imgs = Array.from(document.querySelectorAll('#cardContainer img'));
            return imgs.map((img, i) => ({
                index: i,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
            }));
        });

        console.log(`Auditing ${cardImgMetrics.length} product images in card grid view...`);
        const failedCardImages = cardImgMetrics.filter(img => img.naturalWidth <= 0 || img.naturalHeight <= 0);
        expect(failedCardImages.length).toBe(0);
        console.log('✓ 100% of product images rendered with valid dimensions in both Table and Grid views');
    });

    test('5. Lightbox Modal Interactive Operation', async ({ page }) => {
        const lightbox = page.locator('#imageLightboxModal');
        await expect(lightbox).toBeHidden();

        // Click 1st product thumbnail
        const firstThumbnail = page.locator('#gearTableBody tr img').first();
        await firstThumbnail.click();

        // Modal should open
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toHaveClass(/active/);

        // Verify title & lightbox image dimensions
        const titleText = await page.locator('#lightboxTitle').textContent();
        expect(titleText.trim().length).toBeGreaterThan(0);

        const lbImgMetrics = await page.evaluate(() => {
            const img = document.querySelector('#lightboxImg');
            return {
                src: img ? img.src : '',
                naturalWidth: img ? img.naturalWidth : 0,
                naturalHeight: img ? img.naturalHeight : 0
            };
        });

        console.log('Lightbox image state:', lbImgMetrics);
        expect(lbImgMetrics.naturalWidth).toBeGreaterThan(0);
        expect(lbImgMetrics.naturalHeight).toBeGreaterThan(0);

        // Close via close button
        const closeBtn = page.locator('#imageLightboxModal .modal-close-btn');
        await closeBtn.click();
        await expect(lightbox).toBeHidden();

        // Re-open and close via Escape
        await firstThumbnail.click();
        await expect(lightbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(lightbox).toBeHidden();
        console.log('✓ Lightbox modal opens, displays enlarged image with natural dimensions > 0, and closes correctly');
    });
});
