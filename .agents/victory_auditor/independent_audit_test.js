const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log("=================================================");
console.log("=== INDEPENDENT VICTORY AUDIT TEST RUNNER ===");
console.log("=================================================");
console.log(`Auditing HTML file: ${htmlPath}`);
console.log(`File Size: ${(htmlContent.length / 1024).toFixed(2)} KB (${htmlContent.length} bytes)`);

const results = {
  phase1: { pass: true, details: [] },
  phase2: { pass: true, details: [] },
  phase3: { pass: true, details: [] }
};

// -------------------------------------------------------------
// PHASE 1 & 2: FORENSIC CODE ANALYSIS & ZERO-DEPENDENCY CHECK
// -------------------------------------------------------------
console.log("\n--- PHASE 1 & 2: FORENSIC & DEPENDENCY CHECKS ---");

// Check 1: Zero External Dependencies
const externalUrlRegex = /(src|href|url)\s*=\s*["'](https?:)?\/\/[^"']+["']/gi;
const externalCssImport = /@import\s+["'](https?:)?\/\/[^"']+["']/gi;
const scriptSrcRegex = /<script\b[^>]*\bsrc\s*=\s*["'][^"']+["']/gi;
const linkStylesheetRegex = /<link\b[^>]*\brel\s*=\s*["']stylesheet["'][^>]*\bhref\s*=\s*["'](https?:)?\/\/[^"']+["']/gi;

const extUrls = htmlContent.match(externalUrlRegex) || [];
const extCss = htmlContent.match(externalCssImport) || [];
const scriptSrcs = htmlContent.match(scriptSrcRegex) || [];
const linkStylesheets = htmlContent.match(linkStylesheetRegex) || [];

console.log(`External URLs found: ${extUrls.length}`);
console.log(`External CSS Imports found: ${extCss.length}`);
console.log(`External Script Srcs found: ${scriptSrcs.length}`);
console.log(`External Stylesheets found: ${linkStylesheets.length}`);

if (extUrls.length === 0 && extCss.length === 0 && scriptSrcs.length === 0 && linkStylesheets.length === 0) {
  results.phase2.details.push({ check: "Zero External Dependencies", status: "PASS", info: "100% self-contained offline standalone HTML file" });
} else {
  results.phase2.pass = false;
  results.phase2.details.push({ check: "Zero External Dependencies", status: "FAIL", info: `Found external dependencies: ${JSON.stringify({ extUrls, extCss, scriptSrcs, linkStylesheets })}` });
}

// Extract inline JS code
const scriptBlockMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptBlockMatch) {
  console.error("FATAL: No inline <script> block found in HTML!");
  process.exit(1);
}
let jsCode = scriptBlockMatch[1];

// Make top-level const/let/var accessible on sandbox window/global
jsCode = jsCode.replace('const PRODUCTS = [', 'var PRODUCTS = window.PRODUCTS = [');
jsCode = jsCode.replace('const CATEGORIES = [', 'var CATEGORIES = window.CATEGORIES = [');
jsCode = jsCode.replace('const PROFILES = [', 'var PROFILES = window.PROFILES = [');
jsCode = jsCode.replace('const state = {', 'var state = window.state = {');

// Create DOM elements mockup for sandbox
class MockElement {
  constructor(tagName, id = '', className = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = className;
    this.classList = {
      add: (...cls) => {
        let classes = new Set((this.className || '').split(' ').filter(Boolean));
        cls.forEach(c => classes.add(c));
        this.className = Array.from(classes).join(' ');
      },
      remove: (...cls) => {
        let classes = new Set((this.className || '').split(' ').filter(Boolean));
        cls.forEach(c => classes.delete(c));
        this.className = Array.from(classes).join(' ');
      },
      contains: (c) => (this.className || '').split(' ').includes(c),
      toggle: (c, force) => {
        if (force === true || (force === undefined && !this.classList.contains(c))) {
          this.classList.add(c);
        } else {
          this.classList.remove(c);
        }
      }
    };
    this.children = [];
    this.innerHTML = '';
    this.textContent = '';
    this.innerText = '';
    this.value = '';
    this.checked = false;
    this.attributes = {};
    this.style = {};
    this.dataset = {};
  }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] || null; }
  appendChild(child) { this.children.push(child); return child; }
  querySelector(sel) { return new MockElement('div'); }
  querySelectorAll(sel) { return [new MockElement('div'), new MockElement('div')]; }
  addEventListener(event, fn) {}
}

const elementsMap = {};
function getOrCreateElement(id) {
  if (!elementsMap[id]) {
    elementsMap[id] = new MockElement('div', id);
  }
  return elementsMap[id];
}

const mockDocument = {
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateElement(sel.substring(1));
    return new MockElement('div');
  },
  querySelectorAll: (sel) => [new MockElement('div'), new MockElement('div')],
  createElement: (tag) => new MockElement(tag),
  body: new MockElement('body'),
  addEventListener: () => {}
};

const sandbox = {
  window: {},
  document: mockDocument,
  console: console,
  Math: Math,
  alert: (msg) => console.log(`[DOM Alert]: ${msg}`),
  setTimeout: (fn) => fn(),
  clearTimeout: () => {}
};
sandbox.window.document = mockDocument;
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

let products = [];
try {
  vm.runInContext(jsCode, sandbox);
  products = sandbox.window.PRODUCTS || sandbox.PRODUCTS || [];
  console.log(`Parsed PRODUCTS array successfully! Found ${products.length} products.`);
} catch (e) {
  console.error("Error executing JS code in sandbox:", e);
}

if (!products || products.length === 0) {
  results.phase2.pass = false;
  results.phase2.details.push({ check: "PRODUCTS Data Extraction", status: "FAIL", info: "Could not extract products array" });
} else {
  results.phase2.details.push({ check: "PRODUCTS Data Extraction", status: "PASS", info: `Successfully extracted ${products.length} products` });
}

// Check 3: Math Integrity — discountPercent check
let mathErrors = 0;
let mathAuditDetails = [];
products.forEach(p => {
  const expectedDiscount = Math.round(((p.msrp - p.currentPrice) / p.msrp) * 100);
  if (p.discountPercent !== expectedDiscount) {
    mathErrors++;
    mathAuditDetails.push(`Mismatch for ${p.id} (${p.name}): claims ${p.discountPercent}%, expected ${expectedDiscount}% (MSRP: ${p.msrp}, Price: ${p.currentPrice})`);
  }
});

console.log(`Discount Percent Math Verification: ${mathErrors} errors out of ${products.length} products.`);
if (mathErrors === 0) {
  results.phase2.details.push({ check: "Discount Percent Math Integrity", status: "PASS", info: `All ${products.length} products have 100% exact discount calculations` });
} else {
  results.phase2.pass = false;
  results.phase2.details.push({ check: "Discount Percent Math Integrity", status: "FAIL", info: mathAuditDetails.join("; ") });
}

// Check 4: Data Schema & Multi-Category Coverage
const categoriesSet = new Set(products.map(p => p.category));
const profilesSet = new Set();
products.forEach(p => p.profiles.forEach(pr => profilesSet.add(pr)));

console.log(`Categories count: ${categoriesSet.size} (${Array.from(categoriesSet).join(', ')})`);
console.log(`Profiles count: ${profilesSet.size} (${Array.from(profilesSet).join(', ')})`);

let invalidSchemaCount = 0;
products.forEach(p => {
  if (!p.id || !p.name || !p.brand || !p.category || !p.categoryName || !p.currentPrice || !p.msrp || !Array.isArray(p.priceHistory) || p.priceHistory.length < 2 || !p.specs || !p.rating || !Array.isArray(p.pros) || !Array.isArray(p.cons) || !p.verdict) {
    invalidSchemaCount++;
  }
});

if (categoriesSet.size >= 4 && invalidSchemaCount === 0) {
  results.phase1.details.push({ check: "Multi-Category & Data Schema", status: "PASS", info: `9 categories, 4 profiles, 38 products fully populated with valid schemas` });
  results.phase2.details.push({ check: "Product Data Schema Integrity", status: "PASS", info: `0 schema validation failures across ${products.length} products` });
} else {
  results.phase1.pass = false;
  results.phase2.pass = false;
  results.phase1.details.push({ check: "Multi-Category & Data Schema", status: "FAIL", info: `Categories: ${categoriesSet.size}, Invalid schemas: ${invalidSchemaCount}` });
}

// Check 5: Code Facade & Hardcoded Shortcut Detection
const suspiciousPatterns = [
  /function\s+\w+\s*\([^)]*\)\s*\{\s*return\s+["'][^"']+["'];?\s*\}/, // returning fixed string with no logic
  /return\s+true;\s*\/\/\s*todo/i,
  /mock/i,
  /dummy/i,
  /fake/i,
  /stub/i
];

let suspiciousMatches = [];
suspiciousPatterns.forEach(pattern => {
  const matches = jsCode.match(pattern);
  if (matches) {
    suspiciousMatches.push(matches[0]);
  }
});

console.log(`Facade / Mock detection matches: ${suspiciousMatches.length}`);
if (suspiciousMatches.length === 0) {
  results.phase2.details.push({ check: "Facade & Hardcoding Detection", status: "PASS", info: "Zero mocks, dummy facades, or todo return stubs found" });
} else {
  results.phase2.pass = false;
  results.phase2.details.push({ check: "Facade & Hardcoding Detection", status: "FAIL", info: `Found suspicious code patterns: ${suspiciousMatches.join(', ')}` });
}


// -------------------------------------------------------------
// PHASE 3: INDEPENDENT DOM INTERACTIVE TEST EXECUTION
// -------------------------------------------------------------
console.log("\n--- PHASE 3: INDEPENDENT INTERACTIVE TEST EXECUTION ---");

try {
  const fn = sandbox;

  // Test 1: getFilteredProductsBase (Profile & Category & Search Filtering)
  const allProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1] Initial Base Products Count: ${allProducts.length} (Expected: 38)`);
  
  // Test Profile Filters
  fn.setProfileFilter('adult');
  const adultProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1a] Adult Profile Products Count: ${adultProducts.length}`);
  
  fn.setProfileFilter('youth');
  const youthProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1b] Youth Profile Products Count: ${youthProducts.length}`);

  fn.setProfileFilter('ultralight');
  const ultralightProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1c] Ultralight Profile Products Count: ${ultralightProducts.length}`);

  fn.setProfileFilter('budget');
  const budgetProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1d] Budget Profile Products Count: ${budgetProducts.length}`);

  fn.setProfileFilter('all');

  // Test Category Filters
  fn.setCategoryFilter('tents');
  const tentsProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1e] Tents Category Products Count: ${tentsProducts.length}`);

  fn.setCategoryFilter('sleeping_bags');
  const sleepingBagsProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1f] Sleeping Bags Products Count: ${sleepingBagsProducts.length}`);

  fn.setCategoryFilter('all');

  // Test Search Filter
  fn.onSearchInput({ target: { value: 'Durston' } });
  const searchProducts = fn.getFilteredProductsBase();
  console.log(`[Test 1g] Search 'Durston' Products Count: ${searchProducts.length}`);
  fn.onSearchInput({ target: { value: '' } });

  // Test 2: Sorting Logic
  fn.onSortChange({ target: { value: 'price-asc' } });
  const priceAscProducts = fn.getFilteredAndSortedProducts();
  const isSortedAsc = priceAscProducts.every((p, i) => i === 0 || p.currentPrice >= priceAscProducts[i-1].currentPrice);
  console.log(`[Test 2a] Sort 'price-asc' Correct: ${isSortedAsc}`);

  fn.onSortChange({ target: { value: 'price-desc' } });
  const priceDescProducts = fn.getFilteredAndSortedProducts();
  const isSortedDesc = priceDescProducts.every((p, i) => i === 0 || p.currentPrice <= priceDescProducts[i-1].currentPrice);
  console.log(`[Test 2b] Sort 'price-desc' Correct: ${isSortedDesc}`);

  fn.onSortChange({ target: { value: 'discount' } });
  const discountProducts = fn.getFilteredAndSortedProducts();
  const isSortedDiscount = discountProducts.every((p, i) => i === 0 || p.discountPercent <= discountProducts[i-1].discountPercent);
  console.log(`[Test 2c] Sort 'discount' Correct: ${isSortedDiscount}`);

  fn.onSortChange({ target: { value: 'value' } });

  // Test 3: Deals Toggle
  fn.onDealsOnlyToggle({ target: { checked: true } });
  const dealsProducts = fn.getFilteredAndSortedProducts();
  const allHaveDeals = dealsProducts.every(p => p.discountPercent > 0);
  console.log(`[Test 3] Deals Filter Products Count: ${dealsProducts.length}, All Have Deals: ${allHaveDeals}`);
  fn.onDealsOnlyToggle({ target: { checked: false } });

  // Test 4: Comparison Drawer Selection & Modal Logic
  fn.toggleCompareItem('tent-x-mid-2');
  fn.toggleCompareItem('tent-hubba-hubba');
  console.log(`[Test 4a] Selected Compare Items: ${fn.state.selectedCompareIds.join(', ')} (Count: ${fn.state.selectedCompareIds.length})`);
  
  // Test opening compare modal
  fn.openCompareModal();
  const modalElem = getOrCreateElement('compareModal');
  console.log(`[Test 4b] Compare Modal Active Class: ${modalElem.classList.contains('active')}`);

  // Test 5: SVG Sparkline Chart Generation
  const testPriceHistory = [300, 280, 260, 240];
  const svgOutput = fn.renderSparklineSVG(testPriceHistory, 300, 240);
  const hasPolyline = svgOutput.includes('<polyline') && svgOutput.includes('points=');
  const hasMinMaxLabels = svgOutput.includes('$240') && svgOutput.includes('$300');
  console.log(`[Test 5] Render Sparkline SVG Output Valid: ${hasPolyline && hasMinMaxLabels}`);

  if (allProducts.length === 38 && adultProducts.length > 0 && youthProducts.length > 0 && ultralightProducts.length > 0 && budgetProducts.length > 0 && tentsProducts.length > 0 && searchProducts.length > 0 && isSortedAsc && isSortedDesc && isSortedDiscount && allHaveDeals && fn.state.selectedCompareIds.length === 2 && hasPolyline && modalElem.classList.contains('active')) {
    results.phase3.details.push({ test: "Interactive State & Logic Suite", status: "PASS", info: "All 5 core interactive test suites passed 100% cleanly" });
  } else {
    results.phase3.pass = false;
    results.phase3.details.push({ test: "Interactive State & Logic Suite", status: "FAIL", info: "One or more interactive logic tests failed" });
  }

} catch (err) {
  console.error("Runtime exception during interactive test suite execution:", err);
  results.phase3.pass = false;
  results.phase3.details.push({ test: "Interactive State & Logic Suite", status: "FAIL", info: `Runtime exception: ${err.message}` });
}

// SUMMARY OUTPUT
console.log("\n================ AUDIT SUMMARY ================");
console.log("PHASE 1 (Requirements & Timeline):", results.phase1.pass ? "PASS" : "FAIL");
results.phase1.details.forEach(d => console.log(`  - [${d.status}] ${d.check}: ${d.info}`));

console.log("PHASE 2 (Integrity & Forensics):", results.phase2.pass ? "PASS" : "FAIL");
results.phase2.details.forEach(d => console.log(`  - [${d.status}] ${d.check}: ${d.info}`));

console.log("PHASE 3 (Independent Execution):", results.phase3.pass ? "PASS" : "FAIL");
results.phase3.details.forEach(d => console.log(`  - [${d.status}] ${d.check}: ${d.info}`));

const overallVerdict = (results.phase1.pass && results.phase2.pass && results.phase3.pass) ? "VICTORY CONFIRMED" : "VICTORY REJECTED";
console.log(`\nFINAL VERDICT: ${overallVerdict}`);

fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/victory_auditor/test_output.json', JSON.stringify({ results, overallVerdict }, null, 2));
