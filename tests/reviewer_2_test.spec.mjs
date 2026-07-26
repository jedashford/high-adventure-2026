import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test.describe('High-Adventure Outdoor Gear Comparison Hub Verification', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');
    });

    test('1. UI Rendering and Page Structure', async ({ page }) => {
        // Verify Title and Banner Header
        const header = page.locator('header h1');
        await expect(header).toContainText('Ultimate Backpacking Gear');

        // Verify Profile Filter Buttons exist (5 buttons)
        const profileBtns = page.locator('.profile-pill-btn');
        await expect(profileBtns).toHaveCount(5);

        // Verify Category Navigation Tabs exist (14 tabs: All + 13 categories)
        const categoryTabs = page.locator('#categoryTabs .tab-btn');
        await expect(categoryTabs).toHaveCount(14);

        // Verify Toolbar elements
        await expect(page.locator('#gearSearch')).toBeVisible();
        await expect(page.locator('#sortSelect')).toBeVisible();
        await expect(page.locator('#dealsOnlyCheck')).toBeVisible();

        // Verify Product Table loads 62 products
        const initialProducts = page.locator('#gearTableBody tr');
        const count = await initialProducts.count();
        expect(count).toBe(62);
    });

    test('2. Interactive Category Switching across all 13 categories', async ({ page }) => {
        const categories = [
            { id: 'tents', name: 'Tents', expectedCount: 5 },
            { id: 'sleeping_bags', name: 'Sleeping Bags', expectedCount: 5 },
            { id: 'sleeping_pads', name: 'Sleeping Pads', expectedCount: 6 },
            { id: 'backpacks', name: 'Backpacks', expectedCount: 5 },
            { id: 'stoves', name: 'Stoves & Cooking', expectedCount: 5 },
            { id: 'footwear', name: 'Footwear', expectedCount: 5 },
            { id: 'rain_shells', name: 'Rain Shells', expectedCount: 5 },
            { id: 'lighting', name: 'Lighting & Headlamps', expectedCount: 5 },
            { id: 'water_filtration', name: 'Water Filtration', expectedCount: 5 },
            { id: 'radios', name: 'Radios & Comms', expectedCount: 4 },
            { id: 'electronics', name: 'Electronics & Nav', expectedCount: 4 },
            { id: 'poles', name: 'Trekking Poles', expectedCount: 4 },
            { id: 'chairs', name: 'Camp Chairs', expectedCount: 4 }
        ];

        for (const cat of categories) {
            // Click category tab
            const tabBtn = page.locator(`#categoryTabs button:has-text("${cat.name}")`);
            await expect(tabBtn).toBeVisible();
            await tabBtn.click();

            // Verify Active Class on tab
            await expect(tabBtn).toHaveClass(/active/);

            // Verify Results Count Banner
            const resultsCountText = await page.locator('#resultsCount').textContent();
            expect(parseInt(resultsCountText.trim(), 10)).toBe(cat.expectedCount);

            // Verify Category Name display
            const activeCatName = await page.locator('#activeCategoryName').textContent();
            expect(activeCatName).toBe(cat.name);

            // Verify Table Rows count
            const rows = page.locator('#gearTableBody tr');
            await expect(rows).toHaveCount(cat.expectedCount);
        }

        // Return to All Categories
        const allTab = page.locator('#categoryTabs button:has-text("All Categories")');
        await allTab.click();
        await expect(page.locator('#gearTableBody tr')).toHaveCount(62);
    });

    test('3. User Profile Filtering across all 5 profiles', async ({ page }) => {
        const profiles = [
            { id: 'all', label: 'All Profiles', expectedCount: 62 },
            { id: 'adult', label: 'Adult Target', expectedCount: 46 },
            { id: 'youth', label: 'Youth/Wife Target', expectedCount: 31 },
            { id: 'ultralight', label: 'Ultralight', expectedCount: 29 },
            { id: 'budget', label: 'Budget Value', expectedCount: 27 }
        ];

        for (const prof of profiles) {
            const pillBtn = page.locator(`.profile-pill-btn[data-profile="${prof.id}"]`);
            await pillBtn.click();
            await expect(pillBtn).toHaveClass(/active/);

            const countText = await page.locator('#resultsCount').textContent();
            expect(parseInt(countText.trim(), 10)).toBe(prof.expectedCount);

            const rows = page.locator('#gearTableBody tr');
            await expect(rows).toHaveCount(prof.expectedCount);
        }
    });

    test('4. Image Display & 4-Tier Fallback Mechanism Validation', async ({ page }) => {
        const firstImg = page.locator('#gearTableBody tr img').first();
        await expect(firstImg).toBeVisible();

        const initialSrc = await firstImg.getAttribute('src');

        // Trigger 1st error -> Tier 1 -> Tier 2 (Category Unsplash CDN)
        await page.evaluate(() => {
            const img = document.querySelector('#gearTableBody tr img');
            if (img) img.dispatchEvent(new Event('error'));
        });

        const tier2Src = await firstImg.getAttribute('src');
        expect(tier2Src).not.toBe(initialSrc);
        expect(tier2Src).toContain('unsplash.com');

        // Trigger 2nd error -> Tier 2 -> Tier 3 (Category Vector SVG Data URI)
        await page.evaluate(() => {
            const img = document.querySelector('#gearTableBody tr img');
            if (img) img.dispatchEvent(new Event('error'));
        });

        const tier3Src = await firstImg.getAttribute('src');
        expect(tier3Src).toMatch(/^data:image\/svg\+xml/);

        // Verify all 62 rendered images have valid non-empty src attributes
        const allImgs = page.locator('#gearTableBody img');
        const imgCount = await allImgs.count();
        for (let i = 0; i < imgCount; i++) {
            const img = allImgs.nth(i);
            const src = await img.getAttribute('src');
            expect(src).toBeTruthy();
            expect(src.length).toBeGreaterThan(0);
        }
    });

    test('5. Lightbox Modal Functionality', async ({ page }) => {
        // Verify lightbox is initially hidden
        const lightbox = page.locator('#imageLightboxModal');
        await expect(lightbox).toBeHidden();

        // Click the first product thumbnail to open lightbox
        const firstThumbnail = page.locator('#gearTableBody tr img').first();
        await firstThumbnail.click();

        // Verify Lightbox Modal opens
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toHaveClass(/active/);

        // Verify Lightbox Title and Content
        const lightboxTitle = page.locator('#lightboxTitle');
        await expect(lightboxTitle).not.toBeEmpty();

        const lightboxImg = page.locator('#lightboxImg');
        await expect(lightboxImg).toBeVisible();
        const imgSrc = await lightboxImg.getAttribute('src');
        expect(imgSrc).toBeTruthy();

        // Close via close button
        const closeBtn = page.locator('#imageLightboxModal .modal-close-btn');
        await closeBtn.click();
        await expect(lightbox).toBeHidden();

        // Open lightbox again and close via Escape key
        await firstThumbnail.click();
        await expect(lightbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(lightbox).toBeHidden();
    });

    test('6. Side-by-Side Comparison Drawer & Modal', async ({ page }) => {
        // Select 2 items for comparison
        const checkboxes = page.locator('#gearTableBody input[type="checkbox"]');
        await checkboxes.nth(0).check();
        await checkboxes.nth(1).check();

        // Verify Floating Compare Bar is visible
        const compareBar = page.locator('#floatingCompareBar');
        await expect(compareBar).toHaveClass(/visible/);
        await expect(page.locator('#compareCountNum')).toHaveText('2');

        // Click Compare Now button
        const compareBtn = page.locator('#openCompareModalBtn');
        await compareBtn.click();

        // Verify Compare Modal is visible
        const compareModal = page.locator('#compareModal');
        await expect(compareModal).toHaveClass(/active/);

        // Verify comparison table header has 2 product columns + 1 feature col
        const headers = page.locator('#modalTableHeaderRow th');
        await expect(headers).toHaveCount(3);

        // Close Compare Modal via close button
        const closeBtn = page.locator('#compareModal .modal-close-btn');
        await closeBtn.click();
        await expect(compareModal).not.toHaveClass(/active/);
    });

    test('7. View Layout Toggle (Table vs Grid vs Auto)', async ({ page }) => {
        const tableContainer = page.locator('#tableContainer');
        const cardContainer = page.locator('#cardContainer');

        // Force Table Mode
        await page.locator('#viewBtnTable').click();
        await expect(tableContainer).toBeVisible();
        await expect(cardContainer).toBeHidden();

        // Force Cards Grid Mode
        await page.locator('#viewBtnGrid').click();
        await expect(cardContainer).toBeVisible();
        await expect(tableContainer).toBeHidden();

        // Reset to Auto
        await page.locator('#viewBtnAuto').click();
        await expect(page.locator('#viewBtnAuto')).toHaveClass(/active/);
    });
});
