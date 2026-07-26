const { chromium } = require('playwright');

const altTestCases = [
  { id: 'pack-rei-flash-55', url: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80' },
  { id: 'elec-nitecore-nb10000', url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80' },
  { id: 'light-nitecore-nu25-ul', url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80' }
];

async function testAlts() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const testHtml = `<!DOCTYPE html>
  <html><body>
    ${altTestCases.map((p, i) => `<img id="img-${i}" src="${p.url}" />`).join('')}
  </body></html>`;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const res = await page.evaluate((cases) => {
    return cases.map((c, i) => {
      const img = document.getElementById(`img-${i}`);
      return { id: c.id, url: c.url, w: img ? img.naturalWidth : 0, h: img ? img.naturalHeight : 0 };
    });
  }, altTestCases);

  await browser.close();
  console.log(res);
}

testAlts();
