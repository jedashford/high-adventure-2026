import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test('Get exact profile counts', async ({ page }) => {
    await page.goto(HTML_PATH);
    await page.waitForSelector('#gearTableBody tr');

    const profiles = ['all', 'adult', 'youth', 'ultralight', 'budget'];
    for (const p of profiles) {
        await page.locator(`.profile-pill-btn[data-profile="${p}"]`).click();
        const countText = await page.locator('#resultsCount').textContent();
        const rowCount = await page.locator('#gearTableBody tr').count();
        console.log(`Profile ${p}: Banner=${countText.trim()}, Rows=${rowCount}`);
    }
});
