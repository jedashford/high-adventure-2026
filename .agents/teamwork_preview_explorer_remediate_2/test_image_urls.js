const { chromium } = require('playwright');
const fs = require('fs');

async function testAllImages() {
  const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

  // Extract products from PRODUCTS array in html
  const startIdx = html.indexOf('const PRODUCTS = [');
  const endIdx = html.indexOf('];', startIdx);
  const slice = html.substring(startIdx + 17, endIdx + 1);

  const products = eval(slice);
  console.log(`Extracted ${products.length} products from PRODUCTS array.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Create an HTML test page containing <img> tags for each product
  const imgElements = products.map((p, index) => 
    `<div data-id="${p.id}" data-category="${p.category || ''}" style="margin:10px; padding:10px; border:1px solid #ccc;">
      <h3>${index + 1}. ${p.name} (${p.id}) [${p.category}]</h3>
      <img id="img-${index}" src="${p.imageUrl}" alt="${p.name}" loading="eager" style="max-width:200px; max-height:200px;" />
    </div>`
  ).join('\n');

  const testHtml = `<!DOCTYPE html>
  <html>
  <head><title>Image Test</title></head>
  <body>
    ${imgElements}
  </body>
  </html>`;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });

  // Give 3 seconds for image loading
  await page.waitForTimeout(3000);

  const results = await page.evaluate((prods) => {
    return prods.map((p, idx) => {
      const img = document.getElementById(`img-${idx}`);
      return {
        index: idx + 1,
        id: p.id,
        category: p.category,
        name: p.name,
        imageUrl: p.imageUrl,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
        loaded: img && img.naturalWidth > 0
      };
    });
  }, products);

  await browser.close();

  let passCount = 0;
  let failCount = 0;

  console.log('\n--- HEADLESS CHROMIUM IMAGE TEST RESULTS ---');
  results.forEach(r => {
    if (r.loaded) {
      passCount++;
      console.log(`✅ [${r.index}/${products.length}] ID: ${r.id} | Cat: ${r.category} | Dim: ${r.naturalWidth}x${r.naturalHeight}\n   URL: ${r.imageUrl}`);
    } else {
      failCount++;
      console.log(`❌ [${r.index}/${products.length}] ID: ${r.id} | Cat: ${r.category} | Dim: ${r.naturalWidth}x${r.naturalHeight}\n   URL: ${r.imageUrl}`);
    }
  });

  console.log(`\n==========================================`);
  console.log(`TOTAL PRODUCTS TESTED: ${products.length}`);
  console.log(`PASSING (naturalWidth > 0): ${passCount}`);
  console.log(`FAILING (naturalWidth === 0): ${failCount}`);
  console.log(`==========================================\n`);

  fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_remediate_2/test_results.json', JSON.stringify(results, null, 2));
}

testAllImages().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});
