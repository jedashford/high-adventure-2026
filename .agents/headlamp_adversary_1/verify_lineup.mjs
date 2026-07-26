// Post-edit verification: headlamp lineup swap in gemini-code-1784928132429.html
import { chromium } from 'playwright';

const PAGE = 'file:///Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const EXPECTED = [
  'Nitecore UT27 MCT 800 Headlamp',
  'Fenix HM55R Renegade Headlamp',
  'Petzl Tikkina Headlamp',
  'Nitecore NU25 MCT UL 400 Headlamp',
  'Nitecore NU21 Headlamp',
];
const REMOVED = ['Actik Core 600', 'Spot 400-R', 'BioLite HeadLamp 325'];

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error' && !/net::|Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`); });

await page.goto(PAGE, { waitUntil: 'load' });
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const P = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : null) || window.products || null;
  if (!P) return { fail: 'products array not found' };
  const lighting = P.filter((p) => p.category === 'lighting');
  return {
    total: P.length,
    lightingCount: lighting.length,
    lightingNames: lighting.map((p) => p.name),
    lightingBadges: lighting.map((p) => p.dealBadge),
    dupIds: P.map((p) => p.id).filter((id, i, a) => a.indexOf(id) !== i),
  };
});

let pass = true;
const log = (ok, msg) => { if (!ok) pass = false; console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); };

log(!data.fail, data.fail ? data.fail : 'products array located');
console.log(`INFO  total products = ${data.total} (informational — catalog is actively edited by other sessions; headlamp edits were 1:1 swaps)`);
log(data.lightingCount === 5, `lighting products = ${data.lightingCount} (expect 5)`);
for (const n of EXPECTED) log(data.lightingNames?.includes(n), `present: ${n}`);
for (const n of REMOVED) log(!JSON.stringify(data.lightingNames).includes(n), `removed: ${n}`);
log((data.dupIds || []).length === 0, `no duplicate product ids (${JSON.stringify(data.dupIds)})`);

// UI: click the Lighting tab if tabs exist, count rendered cards
const uiCheck = await page.evaluate(async () => {
  const tab = [...document.querySelectorAll('button, [role="tab"], .tab, [data-category]')]
    .find((el) => /lighting/i.test(el.textContent || '') || el.dataset?.category === 'lighting');
  if (!tab) return { clicked: false };
  tab.click();
  await new Promise((r) => setTimeout(r, 800));
  const cards = document.querySelectorAll('[data-product-id], .product-card, .gear-card, .card');
  return { clicked: true, visibleCards: cards.length, sample: document.body.innerText.includes('Fenix HM55R Renegade') };
});
if (uiCheck.clicked) {
  log(uiCheck.visibleCards > 0, `lighting tab click renders cards (${uiCheck.visibleCards})`);
  log(uiCheck.sample, 'Fenix HM55R Renegade visible in rendered DOM');
} else {
  console.log('INFO  no lighting tab element found via heuristic — data-level checks stand');
}

log(errors.length === 0, `zero JS errors (${errors.length ? errors.join(' | ') : 'clean'})`);

await browser.close();
console.log(pass ? '\nALL CHECKS PASSED' : '\nCHECKS FAILED');
process.exit(pass ? 0 : 1);
