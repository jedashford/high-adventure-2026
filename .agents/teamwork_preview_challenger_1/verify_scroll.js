const { chromium } = require('playwright');
const path = require('path');

const TARGET_HTML_PATH = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function testMobileScrolling() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
    const page = await context.newPage();

    await page.route('**/*', route => {
        const url = route.request().url();
        if (url.startsWith('file:') || url.startsWith('data:')) {
            route.continue();
        } else {
            route.abort('failed');
        }
    });

    await page.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
        PRODUCTS.forEach((p, idx) => {
            p.imageUrl = `https://invalid-domain-${idx}.example/bad.jpg`;
        });
        renderProducts();
    });

    // Scroll down iteratively
    for (let i = 0; i < 15; i++) {
        await page.evaluate(() => window.scrollBy(0, 1000));
        await page.waitForTimeout(100);
    }

    const fallbackStatus = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('#cardContainer img'));
        return {
            total: imgs.length,
            dataUriCount: imgs.filter(i => i.src.startsWith('data:image/svg+xml')).length,
            tier3Count: imgs.filter(i => i.dataset.fallbackTier === '3').length
        };
    });

    console.log('Post-Scroll Mobile Fallback Status:', fallbackStatus);
    await browser.close();
}

testMobileScrolling();
