import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = 'file://' + path.resolve(__dirname, '../gemini-code-1784928132429.html');

test.describe('Deep Image Audit with Scrolling and Network Behavior', () => {

    test('Audit image rendering under normal environment (allowing fallback handlers)', async ({ page }) => {
        await page.goto(HTML_PATH);
        await page.waitForLoadState('domcontentloaded');

        // Scroll down to force lazy-loaded images to enter viewport and trigger onerror / load
        await page.evaluate(async () => {
            const distance = 500;
            const delay = 100;
            while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
                document.scrollingElement.scrollBy(0, distance);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            // Scroll back to top
            document.scrollingElement.scrollTo(0, 0);
            await new Promise(resolve => setTimeout(resolve, 500));
        });

        // Trigger error event on any image that failed to load or has 0 dimensions
        await page.evaluate(() => {
            const imgs = document.querySelectorAll('#gearTableBody img');
            imgs.forEach(img => {
                if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                    img.dispatchEvent(new Event('error'));
                }
            });
        });

        await page.waitForTimeout(1000);

        const imgResults = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('#gearTableBody img'));
            return imgs.map((img, i) => ({
                index: i,
                alt: img.alt,
                src: img.src.substring(0, 80) + '...',
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete,
                fallbackTier: img.dataset.fallbackTier || '1'
            }));
        });

        const failed = imgResults.filter(img => img.naturalWidth === 0 || img.naturalHeight === 0);
        console.log(`Scrolled & Error-Dispatched Image Audit: ${imgResults.length - failed.length}/${imgResults.length} images loaded.`);
        if (failed.length > 0) {
            console.log('Remaining 0x0 images:', failed);
        }
    });
});
