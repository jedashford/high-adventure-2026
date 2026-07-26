const { chromium } = require('playwright');

const UNIVERSAL_EQUIPMENT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#0f172a"/><circle cx="60" cy="60" r="45" fill="none" stroke="#38bdf8" stroke-width="4"/><path d="M60 25 L85 75 H35 Z" fill="none" stroke="#22c55e" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="55" r="8" fill="#f59e0b"/><path d="M40 90 H80" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>')}`;

async function testFullOfflineCascading() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Block network requests to simulate 100% network failure for remote HTTP images
  await context.route('**/*.jpg', route => route.abort());
  await context.route('**/*.png', route => route.abort());
  await context.route('**/*.webp', route => route.abort());

  const page = await context.newPage();

  const testItems = [
    { label: 'Blocked Network (tents)', category: 'tents' },
    { label: 'Blocked Network (poles)', category: 'poles' },
    { label: 'Blocked Network (chairs)', category: 'chairs' },
    { label: 'Blocked Network (unknown)', category: 'unknown_cat' }
  ];

  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <script>
      // Intentionally bad CDN URLs that will fail network request
      const CATEGORY_CDN_FALLBACKS = {
        'tents': 'https://blocked-cdn-999.com/tent.jpg',
        'poles': 'https://blocked-cdn-999.com/poles.jpg',
        'chairs': 'https://blocked-cdn-999.com/chair.jpg'
      };
      const UNIVERSAL_EQUIPMENT_SVG = "${UNIVERSAL_EQUIPMENT_SVG}";

      function getCategorySvgDataUri(category) {
        const categorySvgs = {
          'tents': \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 L100 90 H20 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/></svg>\`,
          'poles': \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/></svg>\`,
          'chairs': \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="40" width="60" height="40" rx="6" fill="none" stroke="#f59e0b" stroke-width="4"/></svg>\`
        };
        const svg = categorySvgs[category];
        return svg ? 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) : UNIVERSAL_EQUIPMENT_SVG;
      }

      function handleImageError(imgEl, category) {
        if (!imgEl) return;
        let tier = parseInt(imgEl.dataset.fallbackTier || '1', 10);
        const catKey = (category || '').toLowerCase().trim();

        if (tier === 1) {
          imgEl.dataset.fallbackTier = '2';
          const cdnUrl = CATEGORY_CDN_FALLBACKS[catKey] || CATEGORY_CDN_FALLBACKS['tents'];
          if (cdnUrl && imgEl.src !== cdnUrl) {
            imgEl.src = cdnUrl;
            return;
          }
          tier = 2;
        }

        if (tier === 2) {
          imgEl.dataset.fallbackTier = '3';
          const categorySvg = getCategorySvgDataUri(catKey);
          if (categorySvg && imgEl.src !== categorySvg) {
            imgEl.src = categorySvg;
            imgEl.onerror = null;
            return;
          }
          tier = 3;
        }

        imgEl.dataset.fallbackTier = '4';
        imgEl.onerror = null;
        imgEl.src = UNIVERSAL_EQUIPMENT_SVG;
      }
    </script>
  </head>
  <body>
    ${testItems.map((item, idx) => `
      <div>
        <h3>${item.label}</h3>
        <img id="test-img-${idx}" src="https://blocked-primary-999.com/initial.jpg" onerror="handleImageError(this, '${item.category}')" style="max-width:150px;" />
      </div>
    `).join('\n')}
  </body>
  </html>`;

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const results = await page.evaluate((items) => {
    return items.map((item, idx) => {
      const img = document.getElementById(`test-img-${idx}`);
      return {
        label: item.label,
        src: img ? img.src.substring(0, 80) : '',
        tier: img ? img.dataset.fallbackTier : '0',
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        success: img && img.naturalWidth > 0
      };
    });
  }, testItems);

  await browser.close();

  console.log('\n--- NETWORK-BLOCKED / OFFLINE CASCADING VERIFICATION ---');
  results.forEach((r, idx) => {
    if (r.success) {
      console.log(`✅ Test #${idx + 1} [${r.label}]: Cascaded to Tier ${r.tier} Data-URI (${r.naturalWidth}x${r.naturalHeight})`);
      console.log(`   Src: ${r.src}...`);
    } else {
      console.log(`❌ Test #${idx + 1} [${r.label}]: FAILED (0x0)`);
    }
  });

  const allPassed = results.every(r => r.success);
  console.log(`\nOFFLINE RECOVERY RESULT: ${allPassed ? '100% GUARANTEED DATA-URI SVG RECOVERY' : 'SOME TESTS FAILED'}\n`);
}

testFullOfflineCascading().catch(err => console.error(err));
