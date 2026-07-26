const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TARGET_HTML_PATH = 'file://' + path.resolve('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html');

async function runMobileAndDetailTests() {
    console.log('Running Mobile Viewport & Detailed Verification...');
    const browser = await chromium.launch({ headless: true });
    
    // Mobile context
    const mobileContext = await browser.newContext({
        viewport: { width: 375, height: 667 },
        isMobile: true
    });
    const page = await mobileContext.newPage();

    const jsErrors = [];
    page.on('pageerror', err => jsErrors.push(err.message));

    // Block external image CDN to force fallback on mobile
    await page.route('**/*.{png,jpg,jpeg,webp}', route => route.abort('failed'));
    await page.route('**/*unsplash.com/**', route => route.abort('failed'));

    await page.goto(TARGET_HTML_PATH, { waitUntil: 'domcontentloaded' });
    
    // Mutate product image URLs to invalid domain
    await page.evaluate(() => {
        PRODUCTS.forEach((p, idx) => {
            p.imageUrl = `https://invalid-domain-mobile-${idx}.example/bad_${idx}.png`;
        });
        renderProducts();
    });

    await page.waitForTimeout(1200);

    // Verify mobile layout
    const isCardGridVisible = await page.evaluate(() => {
        const cardGrid = document.getElementById('cardContainer');
        return cardGrid && window.getComputedStyle(cardGrid).display !== 'none';
    });

    // Count mobile cards with fallbacks
    const mobileFallbackStatus = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('#cardContainer img'));
        return {
            totalCardsImgs: imgs.length,
            tier3Count: imgs.filter(i => i.dataset.fallbackTier === '3').length,
            tier4Count: imgs.filter(i => i.dataset.fallbackTier === '4').length,
            dataUriCount: imgs.filter(i => i.src.startsWith('data:image/svg+xml')).length
        };
    });

    console.log('Mobile Viewport Card Grid Visible:', isCardGridVisible);
    console.log('Mobile Fallback Status:', mobileFallbackStatus);
    console.log('JS Errors on Mobile:', jsErrors);

    await browser.close();
}

runMobileAndDetailTests();
