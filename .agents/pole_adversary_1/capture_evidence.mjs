import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
await page.goto('file:///Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.evaluate(async () => {
  const tab = [...document.querySelectorAll('button, [role="tab"], .tab, [data-category]')]
    .find((el) => /poles/i.test(el.textContent || '') || el.dataset?.category === 'lighting');
  if (tab) { tab.click(); await new Promise((r) => setTimeout(r, 1000)); }
});
await page.waitForTimeout(800);
await page.screenshot({ path: 'roadmap/headlamp-audit/evidence/poles-tab-after.png', fullPage: false });
await browser.close();
console.log('screenshot saved');
