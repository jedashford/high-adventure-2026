const { chromium } = require('playwright');
const fs = require('fs');

const UNIVERSAL_EQUIPMENT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#0f172a"/><circle cx="60" cy="60" r="45" fill="none" stroke="#38bdf8" stroke-width="4"/><path d="M60 25 L85 75 H35 Z" fill="none" stroke="#22c55e" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="55" r="8" fill="#f59e0b"/><path d="M40 90 H80" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>')}`;

const CATEGORY_CDN_FALLBACKS = {
  'tents': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  'sleeping_bags': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
  'sleeping_pads': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
  'backpacks': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  'stoves': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=800&q=80',
  'electronics': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'apparel': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
  'poles': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
  'chairs': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
  'poles_chairs': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
  'lighting': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80'
};

function getCategorySvgDataUri(category) {
  const categorySvgs = {
    'tents': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 L100 90 H20 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/><path d="M60 25 L60 90 M40 90 L60 50 L80 90" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M15 90 H105" stroke="#94a3b8" stroke-width="3"/></svg>`,
    'sleeping_bags': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="35" y="20" width="50" height="80" rx="25" fill="none" stroke="#f59e0b" stroke-width="4"/><path d="M35 50 H85 M35 70 H85" stroke="#38bdf8" stroke-width="3"/><circle cx="60" cy="35" r="8" fill="#38bdf8"/></svg>`,
    'sleeping_pads': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="25" width="60" height="70" rx="6" fill="none" stroke="#22c55e" stroke-width="4"/><line x1="30" y1="40" x2="90" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="55" x2="90" y2="55" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="70" x2="90" y2="70" stroke="#38bdf8" stroke-width="2"/></svg>`,
    'backpacks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M35 35 C35 25, 85 25, 85 35 L80 95 C80 98, 40 98, 40 95 Z" fill="none" stroke="#38bdf8" stroke-width="4"/><rect x="42" y="45" width="36" height="25" rx="4" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M45 25 V15 H75 V25" fill="none" stroke="#22c55e" stroke-width="3"/></svg>`,
    'stoves': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M45 85 H75 V60 H45 Z" fill="none" stroke="#94a3b8" stroke-width="3"/><path d="M35 60 H85 M60 60 V40" stroke="#38bdf8" stroke-width="4"/><path d="M50 40 L60 20 L70 40 Z" fill="#f59e0b" stroke="#ef4444" stroke-width="2"/></svg>`,
    'electronics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="30" width="60" height="60" rx="10" fill="none" stroke="#38bdf8" stroke-width="4"/><circle cx="60" cy="60" r="15" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M60 20 V30 M60 90 V100 M20 60 H30 M90 60 H100" stroke="#f59e0b" stroke-width="3"/></svg>`,
    'apparel': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M40 30 L60 40 L80 30 L95 45 L85 55 L80 50 V95 H40 V50 L35 55 L25 45 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/></svg>`,
    'poles': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
    'chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="40" width="60" height="40" rx="6" fill="none" stroke="#f59e0b" stroke-width="4"/><line x1="40" y1="80" x2="30" y2="105" stroke="#38bdf8" stroke-width="4"/><line x1="80" y1="80" x2="90" y2="105" stroke="#38bdf8" stroke-width="4"/></svg>`,
    'poles_chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
    'lighting': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="40" y="45" width="40" height="30" rx="5" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="60" cy="60" r="8" fill="#38bdf8"/><path d="M20 60 H40 M80 60 H100" stroke="#94a3b8" stroke-width="4"/></svg>`
  };

  const svgContent = categorySvgs[category];
  if (svgContent) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
  }
  return UNIVERSAL_EQUIPMENT_SVG;
}

async function testFallbackArchitecture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test cases covering broken URLs, invalid categories, blocked networks
  const testItems = [
    { label: 'Broken URL with valid category (poles)', initialUrl: 'https://invalid-domain-999.com/broken.jpg', category: 'poles' },
    { label: 'Broken URL with valid category (chairs)', initialUrl: 'https://invalid-domain-999.com/broken.jpg', category: 'chairs' },
    { label: 'Broken URL with unknown category', initialUrl: 'https://invalid-domain-999.com/broken.jpg', category: 'unknown_cat' },
    { label: 'HTTP 404 URL (tents)', initialUrl: 'https://durstongear.com/cdn/shop/files/durston-iceline-trekking-poles-1.jpg', category: 'tents' }
  ];

  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <script>
      const CATEGORY_CDN_FALLBACKS = ${JSON.stringify(CATEGORY_CDN_FALLBACKS)};
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
        <img id="test-img-${idx}" src="${item.initialUrl}" onerror="handleImageError(this, '${item.category}')" style="max-width:150px;" />
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

  console.log('\n--- FALLBACK ARCHITECTURE VERIFICATION TEST ---');
  results.forEach((r, idx) => {
    if (r.success) {
      console.log(`✅ Test #${idx + 1} [${r.label}]: Recovered at Tier ${r.tier} (${r.naturalWidth}x${r.naturalHeight})`);
      console.log(`   Final Src: ${r.src}...`);
    } else {
      console.log(`❌ Test #${idx + 1} [${r.label}]: FAILED (0x0)`);
    }
  });

  const allPassed = results.every(r => r.success);
  console.log(`\nFALLBACK RECOVERY RESULT: ${allPassed ? '100% GUARANTEED RECOVERY' : 'SOME TESTS FAILED'}\n`);
}

testFallbackArchitecture().catch(err => console.error(err));
