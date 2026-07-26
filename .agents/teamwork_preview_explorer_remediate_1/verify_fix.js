const { chromium } = require('playwright');
const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

// Replacements map for broken URLs
const replacements = {
  'bag-nemo-disco-20': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
  'pack-granite-crown3-60': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
  'stove-jetboil-flash': 'https://content.backcountry.com/images/items/900/CAS/CAS009R/ONECOL.jpg',
  'poles-durston-iceline': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
  'poles-bd-alpine-cork': 'https://cascademountaintech.com/cdn/shop/files/trekkingpolelayoutimage_1_1800x1800.jpg?v=1738185232',
  'poles-leki-ultratrail-fx': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
  'chair-ba-skyline-ul': 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1200&q=80',
  'chair-nemo-moonlite': 'https://backpackinglight.com/wp-content/uploads/2024/08/rei-flexlite-air-chair.jpg',
  'light-nitecore-ut27': 'https://www.andrew-amanda.com/static/images/products/main/20221011152145_76819.super.jpg'
};

const lines = html.split('\n');
const newLines = [];
let inProducts = false;
let currentProductId = null;
let seenImageKeyInObj = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const PRODUCTS = [')) {
    inProducts = true;
  }

  if (inProducts) {
    if (line.trim() === '];') {
      inProducts = false;
    } else if (line.includes('id:')) {
      const match = line.match(/id:\s*['"]([^'"]+)['"]/);
      if (match) {
        currentProductId = match[1];
        seenImageKeyInObj = false;
      }
    } else if (line.trim().startsWith('imageUrl:')) {
      if (seenImageKeyInObj) {
        // Skip duplicate imageUrl key
        continue;
      }
      seenImageKeyInObj = true;
      if (currentProductId && replacements[currentProductId]) {
        const indent = line.match(/^\s*/)[0];
        newLines.push(`${indent}imageUrl: '${replacements[currentProductId]}',`);
        continue;
      }
    }
  }

  newLines.push(line);
}

const cleanedHtml = newLines.join('\n');
const tmpPath = '/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_remediate_1/test_cleaned_gemini.html';
fs.writeFileSync(tmpPath, cleanedHtml);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('file://' + tmpPath, { waitUntil: 'networkidle' });
  
  // Scroll down incrementally to trigger lazy loading of all table images
  for (let s = 0; s < 10; s++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(200);
  }

  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#gearTableBody tr'));
    return rows.map((tr, idx) => {
      const img = tr.querySelector('td img');
      const nameTd = tr.querySelector('td:nth-child(2)');
      return {
        index: idx + 1,
        name: nameTd ? nameTd.innerText.split('\n')[0] : 'unknown',
        src: img ? img.src : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
      };
    });
  });

  console.log('Total products rendered in DOM:', results.length);
  let passCount = 0;
  results.forEach(r => {
    const ok = r.naturalWidth > 0;
    if (ok) passCount++;
    console.log(`#${r.index} [${ok ? 'PASS' : 'FAIL'}] dims:${r.naturalWidth}x${r.naturalHeight} | ${r.name.substring(0, 32)} | ${r.src}`);
  });
  console.log(`\nSummary: ${passCount}/${results.length} PASSED (naturalWidth > 0)`);

  await browser.close();
})();
