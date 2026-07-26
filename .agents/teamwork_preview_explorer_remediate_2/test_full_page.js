const { chromium } = require('playwright');

async function testFullPage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen for console messages and error events
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  await page.goto('file:///Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const stats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('#gearTableBody img, table img'));
    return imgs.map((img, i) => ({
      index: i + 1,
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      alt: img.alt
    }));
  });

  await browser.close();

  let ok = 0;
  let fail = 0;
  console.log('\n--- FULL PAGE RENDERED IMAGES STATS ---');
  stats.forEach(s => {
    if (s.naturalWidth > 0) {
      ok++;
      console.log(`✅ Img #${s.index} (${s.naturalWidth}x${s.naturalHeight}): ${s.alt} -> ${s.src.substring(0, 80)}`);
    } else {
      fail++;
      console.log(`❌ Img #${s.index} (${s.naturalWidth}x${s.naturalHeight}): ${s.alt} -> ${s.src.substring(0, 80)}`);
    }
  });

  console.log(`\nFULL PAGE SUMMARY: Total rendered <img> tags: ${stats.length} | Passing (>0): ${ok} | Failing (0x0): ${fail}`);
}

testFullPage().catch(err => console.error(err));
