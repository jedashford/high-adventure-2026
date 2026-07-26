const { chromium } = require('playwright');

async function testLightboxOpen() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
    
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
    
    const lbResult = await page.evaluate(async () => {
        openImageLightbox('tent-rei-halfdome');
        const img = document.getElementById('lightboxImg');
        await new Promise(r => setTimeout(r, 1000));
        return {
            src: img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
        };
    });
    
    console.log('Opened Lightbox Image status for tent-rei-halfdome:', lbResult);
    
    await browser.close();
}

testLightboxOpen().catch(err => console.error(err));
