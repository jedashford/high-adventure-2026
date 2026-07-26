const { chromium } = require('playwright');
const path = require('path');

const TARGET_FILE = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Abort image network requests
    await page.route('**/*.{png,jpg,jpeg,webp,gif}*', route => route.abort());
    await page.route('https://images.unsplash.com/**', route => route.abort());
    await page.route('https://cdn.absolute-snow.co.uk/**', route => route.abort());
    await page.route('https://seatosummit.com/**', route => route.abort());
    await page.route('https://www.adventurealan.com/**', route => route.abort());

    await page.goto(TARGET_FILE, { waitUntil: 'load' });

    console.log('Initial images in data URI state (before scroll):');
    let status = await getImagesStatus(page);
    console.log(`Data URI images: ${status.dataUriCount}/${status.totalCount}`);

    // Scroll down gradually to trigger lazy loading on all images
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
                    resolve();
                }
            }, 100);
        });
    });

    // Wait for error handlers to finish cascading
    await page.waitForTimeout(2000);

    console.log('Images status after scroll:');
    status = await getImagesStatus(page);
    console.log(`Data URI images: ${status.dataUriCount}/${status.totalCount}`);

    console.log('\nDetailed image breakdown:');
    console.log(`Total: ${status.totalCount}`);
    console.log(`Tier 1 (Original): ${status.tier1}`);
    console.log(`Tier 2 (CDN Fallback): ${status.tier2}`);
    console.log(`Tier 3/4 (SVG Data URI): ${status.dataUriCount}`);
    console.log(`Failed / Broken / Unknown: ${status.totalCount - status.dataUriCount}`);

    await browser.close();
})();

async function getImagesStatus(page) {
    return await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        let dataUriCount = 0;
        let tier1 = 0;
        let tier2 = 0;

        imgs.forEach(img => {
            if (img.src.startsWith('data:image/svg+xml')) {
                dataUriCount++;
            } else if (!img.dataset.fallbackTier || img.dataset.fallbackTier === '1') {
                tier1++;
            } else if (img.dataset.fallbackTier === '2') {
                tier2++;
            }
        });

        return {
            totalCount: imgs.length,
            dataUriCount,
            tier1,
            tier2
        };
    });
}
