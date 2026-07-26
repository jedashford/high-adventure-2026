const { chromium } = require('playwright');
const fs = require('fs');

async function analyzeAllUrls() {
  const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

  // Extract products block from HTML
  const startIdx = html.indexOf('const PRODUCTS = [');
  const endIdx = html.indexOf('];', startIdx);
  const productsBlock = html.substring(startIdx, endIdx);

  // Parse lines to collect each product's raw attributes
  const lines = productsBlock.split('\n');
  const items = [];
  let current = null;

  lines.forEach((line) => {
    const idM = line.match(/id:\s*['"]([^'"]+)['"]/);
    const nameM = line.match(/name:\s*['"]([^'"]+)['"]/);
    const catM = line.match(/category:\s*['"]([^'"]+)['"]/);
    const imgM = line.match(/imageUrl:\s*['"]([^'"]+)['"]/);

    if (idM) {
      if (current) items.push(current);
      current = { id: idM[1], name: '', category: '', urls: [] };
    }
    if (nameM && current) current.name = nameM[1];
    if (catM && current) current.category = catM[1];
    if (imgM && current) current.urls.push(imgM[1]);
  });
  if (current) items.push(current);

  console.log(`Extracted ${items.length} raw product blocks.`);

  // Launch Playwright Chromium to test every single URL found across all products
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allTestCases = [];
  items.forEach((item, itemIdx) => {
    item.urls.forEach((url, urlIdx) => {
      allTestCases.push({
        itemIndex: itemIdx + 1,
        id: item.id,
        name: item.name,
        category: item.category,
        urlIndex: urlIdx + 1,
        totalUrls: item.urls.length,
        url: url
      });
    });
  });

  console.log(`Testing ${allTestCases.length} total URLs in headless Chromium...`);

  // Build test HTML page
  const testHtml = `<!DOCTYPE html>
  <html>
  <head><title>URL Hotlink Test</title></head>
  <body>
    ${allTestCases.map((tc, idx) => `
      <div id="tc-${idx}">
        <h4>${tc.itemIndex}. ${tc.id} (URL #${tc.urlIndex}/${tc.totalUrls})</h4>
        <img id="img-${idx}" src="${tc.url}" style="max-width:100px; max-height:100px;" />
      </div>
    `).join('\n')}
  </body>
  </html>`;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const results = await page.evaluate((cases) => {
    return cases.map((tc, idx) => {
      const img = document.getElementById(`img-${idx}`);
      return {
        ...tc,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
        loaded: img && img.naturalWidth > 0
      };
    });
  }, allTestCases);

  await browser.close();

  // Print results grouped by product
  let totalLoaded = 0;
  let totalFailed = 0;

  console.log('\n==========================================');
  console.log('    RAW PRODUCT IMAGE URL TEST REPORT     ');
  console.log('==========================================\n');

  items.forEach((item, idx) => {
    console.log(`Product #${idx + 1} [${item.id}] "${item.name}" (Cat: ${item.category})`);
    const itemResults = results.filter(r => r.id === item.id);
    itemResults.forEach(r => {
      if (r.loaded) {
        totalLoaded++;
        console.log(`  ✅ URL #${r.urlIndex} LOADED (${r.naturalWidth}x${r.naturalHeight}): ${r.url}`);
      } else {
        totalFailed++;
        console.log(`  ❌ URL #${r.urlIndex} FAILED (0x0): ${r.url}`);
      }
    });
  });

  console.log('\n==========================================');
  console.log(`TOTAL URLS TESTED: ${allTestCases.length}`);
  console.log(`SUCCESSFUL (naturalWidth > 0): ${totalLoaded}`);
  console.log(`FAILED (naturalWidth === 0): ${totalFailed}`);
  console.log('==========================================\n');

  fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_remediate_2/raw_url_audit.json', JSON.stringify(results, null, 2));
}

analyzeAllUrls().catch(err => {
  console.error('Error analyzing URLs:', err);
  process.exit(1);
});
