import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test.describe('Empirical Challenger Verification & Stress-Test Suite — M3_1', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForSelector('#gearTableBody tr');
    });

    test('1. Category Navigation: Dynamic Tab Switching Across All 13 Categories', async ({ page }) => {
        const categories = [
            { id: 'all', name: 'All Categories', expectedCount: 62 },
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

        const tabs = page.locator('#categoryTabs .tab-btn');
        await expect(tabs).toHaveCount(14);

        for (const cat of categories) {
            const tabBtn = page.locator(`#categoryTabs .tab-btn:has-text("${cat.name}")`);
            await expect(tabBtn).toBeVisible();
            await tabBtn.click();

            // Verify active class and aria attribute
            await expect(tabBtn).toHaveClass(/active/);
            await expect(tabBtn).toHaveAttribute('aria-selected', 'true');

            // Verify active category title in banner
            const activeCatName = await page.locator('#activeCategoryName').textContent();
            expect(activeCatName).toBe(cat.name);

            // Verify count in banner vs rendered table rows
            const countText = await page.locator('#resultsCount').textContent();
            const countVal = parseInt(countText.trim(), 10);
            expect(countVal).toBe(cat.expectedCount);

            const rowCount = await page.locator('#gearTableBody tr').count();
            expect(rowCount).toBe(cat.expectedCount);
        }
    });

    test('2. Profile Filter Pills: Visibility Filtering & Item Count Accuracy', async ({ page }) => {
        const profiles = [
            { id: 'all', label: 'All Profiles', expectedCount: 62 },
            { id: 'adult', label: 'Adult Target', expectedCount: 46 },
            { id: 'youth', label: 'Youth/Wife Target', expectedCount: 31 },
            { id: 'ultralight', label: 'Ultralight', expectedCount: 29 },
            { id: 'budget', label: 'Budget Value', expectedCount: 27 }
        ];

        for (const prof of profiles) {
            const pillBtn = page.locator(`.profile-pill-btn[data-profile="${prof.id}"]`);
            await expect(pillBtn).toBeVisible();
            await pillBtn.click();

            await expect(pillBtn).toHaveClass(/active/);
            await expect(pillBtn).toHaveAttribute('aria-selected', 'true');

            // Check results count banner
            const countText = await page.locator('#resultsCount').textContent();
            expect(parseInt(countText.trim(), 10)).toBe(prof.expectedCount);

            // Check visible table rows
            const rows = page.locator('#gearTableBody tr');
            await expect(rows).toHaveCount(prof.expectedCount);

            // Verify dynamic tab counts update when profile filter is applied
            const allTabBadge = await page.locator('#categoryTabs .tab-btn:has-text("All Categories") .tab-count-badge').textContent();
            expect(parseInt(allTabBadge.trim(), 10)).toBe(prof.expectedCount);
        }
    });

    test('3. Real-Time Search Filter & #clearSearchBtn Reset Functionality', async ({ page }) => {
        const searchInput = page.locator('#gearSearch');
        const clearBtn = page.locator('#clearSearchBtn');

        // Clear button should initially be hidden
        await expect(clearBtn).toBeHidden();

        // Perform search query
        await searchInput.fill('MSR');
        await expect(clearBtn).toBeVisible();

        // Verify filtered rows count (MSR Hubba Hubba, MSR PocketRocket Deluxe, MSR Guardian, etc.)
        const msrRows = page.locator('#gearTableBody tr');
        const msrCount = await msrRows.count();
        expect(msrCount).toBeGreaterThan(0);
        expect(msrCount).toBeLessThan(62);

        const countText = await page.locator('#resultsCount').textContent();
        expect(parseInt(countText.trim(), 10)).toBe(msrCount);

        // Verify active filter tag displayed
        const activeFiltersTag = page.locator('#activeFiltersTag');
        await expect(activeFiltersTag).toContainText('Search: "MSR"');

        // Click #clearSearchBtn
        await clearBtn.click();

        // Verify search input cleared and clear button hidden
        await expect(searchInput).toHaveValue('');
        await expect(clearBtn).toBeHidden();

        // Verify product list restored to 62
        await expect(page.locator('#gearTableBody tr')).toHaveCount(62);
        await expect(page.locator('#resultsCount')).toHaveText('62');
    });

    test('4. Side-by-Side Comparison Matrix Modal Full Interactive Lifecycle', async ({ page }) => {
        const compareBar = page.locator('#floatingCompareBar');
        const compareModal = page.locator('#compareModal');
        const checkboxes = page.locator('#gearTableBody input[type="checkbox"]');

        // Initially compare bar & modal are hidden
        await expect(compareBar).not.toHaveClass(/visible/);
        await expect(compareModal).not.toHaveClass(/active/);

        // Select 1 item
        await checkboxes.nth(0).check();
        await expect(compareBar).toHaveClass(/visible/);
        await expect(page.locator('#compareCountNum')).toHaveText('1');

        // Attempting to open compare modal with 1 item triggers alert
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('select at least 2 items');
            await dialog.dismiss();
        });
        await page.locator('#openCompareModalBtn').click();
        await expect(compareModal).not.toHaveClass(/active/);

        // Select 2nd item
        await checkboxes.nth(1).check();
        await expect(page.locator('#compareCountNum')).toHaveText('2');

        // Select 3rd item
        await checkboxes.nth(2).check();
        await expect(page.locator('#compareCountNum')).toHaveText('3');

        // Open Comparison Modal
        await page.locator('#openCompareModalBtn').click();
        await expect(compareModal).toHaveClass(/active/);

        // Verify modal header has 3 product columns + 1 feature column = 4 th elements
        const headers = page.locator('#modalTableHeaderRow th');
        await expect(headers).toHaveCount(4);

        // Verify feature rows are populated (Category, Price, Rating, Weight, Value Score, Pros, Cons, Verdict)
        const featureRows = page.locator('#modalTableBody tr');
        const featureCount = await featureRows.count();
        expect(featureCount).toBeGreaterThanOrEqual(10);

        // Click "Remove" button on 1 item inside modal
        const removeBtns = page.locator('#modalTableHeaderRow button:has-text("Remove")');
        await removeBtns.first().click();

        // Should now have 2 products in comparison modal
        await expect(page.locator('#modalTableHeaderRow th')).toHaveCount(3);
        await expect(compareModal).toHaveClass(/active/);

        // Remove another item -> items remaining = 1 < 2 -> modal should auto-close
        await removeBtns.first().click();
        await expect(compareModal).not.toHaveClass(/active/);
        await expect(page.locator('#compareCountNum')).toHaveText('1');

        // Select 2 items again and test chip removal
        await checkboxes.nth(3).check();
        await expect(page.locator('#compareCountNum')).toHaveText('2');

        const chipRemoveBtns = page.locator('#compareChipsContainer .compare-chip-remove');
        await chipRemoveBtns.first().click({ force: true });
        await expect(page.locator('#compareCountNum')).toHaveText('1');
        await expect(compareBar).toHaveClass(/visible/);

        // Remove final chip -> 0 items remaining -> drawer hides completely
        await chipRemoveBtns.first().click({ force: true });
        await expect(compareBar).not.toHaveClass(/visible/);
        await expect(page.locator('#compareCountNum')).toHaveText('0');
    });

    test('5. Stress Test: Combinatorial Filters & Reset Interaction', async ({ page }) => {
        // Apply Profile: Youth (31 items total)
        await page.locator('.profile-pill-btn[data-profile="youth"]').click();
        await expect(page.locator('#resultsCount')).toHaveText('31');

        // Apply Category: Tents (should filter tents matching youth)
        await page.locator('#categoryTabs .tab-btn:has-text("Tents")').click();
        const youthTentsCountText = await page.locator('#resultsCount').textContent();
        const youthTentsCount = parseInt(youthTentsCountText.trim(), 10);

        const rows = page.locator('#gearTableBody tr');
        await expect(rows).toHaveCount(youthTentsCount);

        // Apply Search query "NEMO"
        await page.locator('#gearSearch').fill('NEMO');
        const nemoYouthTentsCount = await rows.count();
        const resultsText = await page.locator('#resultsCount').textContent();
        expect(parseInt(resultsText.trim(), 10)).toBe(nemoYouthTentsCount);

        // Clear search -> should keep Tents category & Youth profile active
        await page.locator('#clearSearchBtn').click();
        await expect(page.locator('#categoryTabs .tab-btn:has-text("Tents")')).toHaveClass(/active/);
        await expect(page.locator('.profile-pill-btn[data-profile="youth"]')).toHaveClass(/active/);
        await expect(page.locator('#resultsCount')).toHaveText(String(youthTentsCount));
    });

    test('6. Stress Test: Empty State Rendering on Zero Search Results', async ({ page }) => {
        const searchInput = page.locator('#gearSearch');
        const emptyState = page.locator('#emptyState');
        const tableContainer = page.locator('#tableContainer');

        await searchInput.fill('nonexistent_gear_xyz_999');

        await expect(emptyState).toBeVisible();
        await expect(tableContainer).toBeHidden();
        await expect(page.locator('#resultsCount')).toHaveText('0');

        // Clear search brings back table view and hides empty state
        await page.locator('#clearSearchBtn').click();
        await expect(emptyState).toBeHidden();
        await expect(tableContainer).toBeVisible();
        await expect(page.locator('#resultsCount')).toHaveText('62');
    });

    test('7. Stress Test: Max Selection Cap (4 Items Max) in Comparison Drawer', async ({ page }) => {
        const checkboxes = page.locator('#gearTableBody input[type="checkbox"]');

        // Select 4 items
        for (let i = 0; i < 4; i++) {
            await checkboxes.nth(i).check();
        }
        await expect(page.locator('#compareCountNum')).toHaveText('4');

        // Setup dialog handler before clicking 5th item
        let alertMsg = '';
        page.on('dialog', async dialog => {
            alertMsg = dialog.message();
            await dialog.accept();
        });

        // Try to select 5th item
        await checkboxes.nth(4).click();

        // Count should remain 4 and alert message should contain max items text
        await expect(page.locator('#compareCountNum')).toHaveText('4');
        expect(alertMsg).toContain('maximum of 4 items');
    });

    test('8. Stress Test: View Modes (Table vs Card Grid vs Auto)', async ({ page }) => {
        const tableContainer = page.locator('#tableContainer');
        const cardContainer = page.locator('#cardContainer');

        // Force Grid mode
        await page.locator('#viewBtnGrid').click();
        await expect(cardContainer).toBeVisible();
        await expect(tableContainer).toBeHidden();

        const cardCount = await page.locator('#cardContainer article.product-card').count();
        expect(cardCount).toBe(62);

        // Force Table mode
        await page.locator('#viewBtnTable').click();
        await expect(tableContainer).toBeVisible();
        await expect(cardContainer).toBeHidden();

        // Reset Auto mode
        await page.locator('#viewBtnAuto').click();
        await expect(page.locator('#viewBtnAuto')).toHaveClass(/active/);
    });
});
