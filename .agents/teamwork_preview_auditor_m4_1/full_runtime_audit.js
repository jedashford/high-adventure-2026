const fs = require('fs');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const scriptCode = html.match(/<script>([\s\S]*?)<\/script>/i)[1];

// Create a robust Mock DOM tree for runtime testing
function createFullDOMMock() {
    const registry = {};

    function ElementMock(tagName, id = '', className = '') {
        this.tagName = tagName.toUpperCase();
        this.id = id;
        this.className = className;
        this.classList = {
            _set: new Set(className.split(/\s+/).filter(Boolean)),
            add: (...cls) => {
                cls.forEach(c => this.classList._set.add(c));
                this.className = Array.from(this.classList._set).join(' ');
            },
            remove: (...cls) => {
                cls.forEach(c => this.classList._set.delete(c));
                this.className = Array.from(this.classList._set).join(' ');
            },
            toggle: (c, force) => {
                if (force === true) this.classList._set.add(c);
                else if (force === false) this.classList._set.delete(c);
                else if (this.classList._set.has(c)) this.classList._set.delete(c);
                else this.classList._set.add(c);
                this.className = Array.from(this.classList._set).join(' ');
            },
            contains: (c) => this.classList._set.has(c)
        };
        this.children = [];
        this.innerHTML = '';
        this.innerText = '';
        this.textContent = '';
        this.value = '';
        this.checked = false;
        this.style = { display: '' };
        this._listeners = {};
        this._attrs = {};
    }

    ElementMock.prototype.setAttribute = function(name, val) {
        this._attrs[name] = String(val);
        if (name === 'class') {
            this.className = String(val);
            this.classList._set = new Set(String(val).split(/\s+/).filter(Boolean));
        }
    };
    ElementMock.prototype.getAttribute = function(name) {
        return this._attrs[name] !== undefined ? this._attrs[name] : null;
    };
    ElementMock.prototype.removeAttribute = function(name) {
        delete this._attrs[name];
    };
    ElementMock.prototype.addEventListener = function(evt, fn) {
        if (!this._listeners[evt]) this._listeners[evt] = [];
        this._listeners[evt].push(fn);
    };
    ElementMock.prototype.dispatchEvent = function(evtObj) {
        const evtType = typeof evtObj === 'string' ? evtObj : evtObj.type;
        if (this._listeners[evtType]) {
            this._listeners[evtType].forEach(fn => fn.call(this, evtObj));
        }
    };
    ElementMock.prototype.appendChild = function(child) {
        this.children.push(child);
        return child;
    };
    ElementMock.prototype.querySelector = function(sel) {
        return getOrRegister('mock-' + sel.replace(/[^a-zA-Z0-9]/g, ''));
    };
    ElementMock.prototype.querySelectorAll = function(sel) {
        if (sel === '.profile-pill-btn') {
            return [
                getOrRegister('pill-all', 'profile-pill-btn active'),
                getOrRegister('pill-adult', 'profile-pill-btn adult-target'),
                getOrRegister('pill-youth', 'profile-pill-btn youth-target'),
                getOrRegister('pill-ultralight', 'profile-pill-btn ultralight-target'),
                getOrRegister('pill-budget', 'profile-pill-btn budget-target')
            ];
        }
        if (sel === '.view-btn') {
            return [
                getOrRegister('viewBtnAuto', 'view-btn active'),
                getOrRegister('viewBtnTable', 'view-btn'),
                getOrRegister('viewBtnGrid', 'view-btn')
            ];
        }
        return [getOrRegister('mock-sub-item')];
    };

    function getOrRegister(id, className = '') {
        if (!registry[id]) {
            registry[id] = new ElementMock('div', id, className);
        }
        return registry[id];
    }

    const knownIds = [
        'categoryTabs', 'gearSearch', 'sortSelect', 'dealsOnlyCheck',
        'viewBtnAuto', 'viewBtnTable', 'viewBtnGrid', 'resultsCount',
        'activeCategoryName', 'activeFiltersTag', 'tableContainer', 'gearTable',
        'gearTableBody', 'cardContainer', 'emptyState', 'guideHeading',
        'floatingCompareBar', 'compareCountNum', 'compareChipsContainer',
        'openCompareModalBtn', 'compareModal', 'modalTitle', 'modalTableHeaderRow',
        'modalTableBody'
    ];
    knownIds.forEach(id => getOrRegister(id));

    const documentMock = {
        getElementById: (id) => getOrRegister(id),
        querySelector: (sel) => {
            if (sel.startsWith('#')) return getOrRegister(sel.substring(1));
            return getOrRegister('mock-' + sel.replace(/[^a-zA-Z0-9]/g, ''));
        },
        querySelectorAll: (sel) => registry['categoryTabs'].querySelectorAll(sel),
        createElement: (tag) => new ElementMock(tag),
        createElementNS: (ns, tag) => {
            const el = new ElementMock(tag);
            el.namespaceURI = ns;
            return el;
        },
        body: getOrRegister('bodyMock'),
        _listeners: {},
        addEventListener: function(evt, fn) {
            if (!this._listeners[evt]) this._listeners[evt] = [];
            this._listeners[evt].push(fn);
        },
        dispatchEvent: function(evtObj) {
            const evtType = typeof evtObj === 'string' ? evtObj : evtObj.type;
            if (this._listeners[evtType]) {
                this._listeners[evtType].forEach(fn => fn.call(this, evtObj));
            }
        }
    };

    const windowMock = {
        document: documentMock,
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval,
        alert: (msg) => { windowMock._lastAlert = msg; },
        Math: Math,
        Array: Array,
        Object: Object,
        String: String,
        Number: Number,
        Boolean: Boolean,
        JSON: JSON,
        RegExp: RegExp,
        window: null
    };
    windowMock.window = windowMock;

    return { windowMock, documentMock, registry };
}

const { windowMock, documentMock, registry } = createFullDOMMock();
const ctx = vm.createContext(windowMock);

// Expose globals for inspection
const extendedCode = scriptCode + `
;
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.state = state;
window.getFilteredProductsBase = getFilteredProductsBase;
window.getFilteredAndSortedProducts = getFilteredAndSortedProducts;
window.renderProducts = renderProducts;
window.renderTabs = renderTabs;
window.renderSparklineSVG = renderSparklineSVG;
window.setCategoryFilter = setCategoryFilter;
window.setProfileFilter = setProfileFilter;
window.onSearchInput = onSearchInput;
window.onSortChange = onSortChange;
window.onDealsOnlyToggle = onDealsOnlyToggle;
window.setViewMode = setViewMode;
window.applyViewLayoutMode = applyViewLayoutMode;
window.resetFilters = resetFilters;
window.toggleCompareItem = toggleCompareItem;
window.removeFromCompareModal = removeFromCompareModal;
window.removeFromCompare = removeFromCompare;
window.clearCompareSelection = clearCompareSelection;
window.renderFloatingCompareBar = renderFloatingCompareBar;
window.openCompareModal = openCompareModal;
window.closeCompareModal = closeCompareModal;
`;

console.log('--- EXECUTING SCRIPT IN VM ---');
let loadErrors = [];
try {
    vm.runInContext(extendedCode, ctx);
    console.log('Script loaded into VM context without syntax/parse errors.');
} catch (err) {
    console.error('VM Script Load Error:', err);
    loadErrors.push(err);
}

// Trigger DOMContentLoaded
if (documentMock._listeners['DOMContentLoaded']) {
    documentMock._listeners['DOMContentLoaded'].forEach(fn => fn());
}

console.log('\n=== CHECK 2 & CHECK 4: DETAILED INTERACTION & RUNTIME AUDIT ===\n');

let auditResults = [];

function recordTest(testName, passed, details) {
    auditResults.push({ testName, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${testName}: ${details}`);
}

// Initial render check
try {
    const products = ctx.getFilteredAndSortedProducts();
    recordTest('Initial Render Count', products.length === 38, `Returned ${products.length} products (expected 38)`);
} catch (e) {
    recordTest('Initial Render Count', false, e.message);
}

// 1. Profile Filtering Test
try {
    ctx.setProfileFilter('adult');
    const adultCount = ctx.getFilteredAndSortedProducts().length;
    
    ctx.setProfileFilter('ultralight');
    const ulCount = ctx.getFilteredAndSortedProducts().length;
    
    ctx.setProfileFilter('budget');
    const budgetCount = ctx.getFilteredAndSortedProducts().length;

    ctx.setProfileFilter('youth');
    const youthCount = ctx.getFilteredAndSortedProducts().length;

    ctx.setProfileFilter('all');
    const allCount = ctx.getFilteredAndSortedProducts().length;

    const profileFilterSuccess = (adultCount === 25) && (ulCount === 19) && (budgetCount === 20) && (youthCount === 22) && (allCount === 38);
    recordTest('Profile Filtering Logic', profileFilterSuccess, 
        `Adult=${adultCount}(25), Ultralight=${ulCount}(19), Budget=${budgetCount}(20), Youth=${youthCount}(22), All=${allCount}(38)`);
} catch (e) {
    recordTest('Profile Filtering Logic', false, e.message);
}

// 2. Category Tab Switching Test
try {
    ctx.setCategoryFilter('tents');
    const tentsCount = ctx.getFilteredAndSortedProducts().length;
    
    ctx.setCategoryFilter('stoves');
    const stovesCount = ctx.getFilteredAndSortedProducts().length;

    ctx.setCategoryFilter('all');
    const resetCount = ctx.getFilteredAndSortedProducts().length;

    const catSuccess = (tentsCount === 6) && (stovesCount === 4) && (resetCount === 38);
    recordTest('Category Tab Switching Logic', catSuccess, `Tents=${tentsCount}(6), Stoves=${stovesCount}(4), All=${resetCount}(38)`);
} catch (e) {
    recordTest('Category Tab Switching Logic', false, e.message);
}

// 3. Live Keyword Search Test
try {
    ctx.onSearchInput({ target: { value: 'Jetboil' } });
    const searchJetboil = ctx.getFilteredAndSortedProducts();
    
    ctx.onSearchInput({ target: { value: 'nonexistentproducttermxyz' } });
    const searchEmpty = ctx.getFilteredAndSortedProducts();

    ctx.onSearchInput({ target: { value: '' } });
    const searchReset = ctx.getFilteredAndSortedProducts();

    const searchSuccess = (searchJetboil.length === 1 && searchJetboil[0].name.includes('Jetboil')) &&
                          (searchEmpty.length === 0) &&
                          (searchReset.length === 38);
    recordTest('Live Keyword Search Logic', searchSuccess, `Jetboil query returned ${searchJetboil.length} item(s), Empty query returned ${searchEmpty.length}, Reset returned ${searchReset.length}`);
} catch (e) {
    recordTest('Live Keyword Search Logic', false, e.message);
}

// 4. 6-Mode Sorting Test
try {
    ctx.resetFilters();

    // price-asc
    ctx.onSortChange({ target: { value: 'price-asc' } });
    const priceAsc = ctx.getFilteredAndSortedProducts();
    let isPriceAsc = true;
    for (let i = 1; i < priceAsc.length; i++) {
        if (priceAsc[i].currentPrice < priceAsc[i-1].currentPrice) isPriceAsc = false;
    }

    // price-desc
    ctx.onSortChange({ target: { value: 'price-desc' } });
    const priceDesc = ctx.getFilteredAndSortedProducts();
    let isPriceDesc = true;
    for (let i = 1; i < priceDesc.length; i++) {
        if (priceDesc[i].currentPrice > priceDesc[i-1].currentPrice) isPriceDesc = false;
    }

    // rating
    ctx.onSortChange({ target: { value: 'rating' } });
    const ratingDesc = ctx.getFilteredAndSortedProducts();
    let isRatingDesc = true;
    for (let i = 1; i < ratingDesc.length; i++) {
        if (ratingDesc[i].rating > ratingDesc[i-1].rating) isRatingDesc = false;
    }

    // weight
    ctx.onSortChange({ target: { value: 'weight' } });
    const weightAsc = ctx.getFilteredAndSortedProducts();
    let isWeightAsc = true;
    for (let i = 1; i < weightAsc.length; i++) {
        if (weightAsc[i].weightOz < weightAsc[i-1].weightOz) isWeightAsc = false;
    }

    // discount
    ctx.onSortChange({ target: { value: 'discount' } });
    const discountDesc = ctx.getFilteredAndSortedProducts();
    let isDiscountDesc = true;
    for (let i = 1; i < discountDesc.length; i++) {
        if (discountDesc[i].discountPercent > discountDesc[i-1].discountPercent) isDiscountDesc = false;
    }

    // value score (default)
    ctx.onSortChange({ target: { value: 'value' } });
    const valueDesc = ctx.getFilteredAndSortedProducts();
    let isValueDesc = true;
    for (let i = 1; i < valueDesc.length; i++) {
        if (valueDesc[i].valueRating > valueDesc[i-1].valueRating) isValueDesc = false;
    }

    const sortSuccess = isPriceAsc && isPriceDesc && isRatingDesc && isWeightAsc && isDiscountDesc && isValueDesc;
    recordTest('6-Mode Sorting Logic', sortSuccess, 
        `price-asc:${isPriceAsc}, price-desc:${isPriceDesc}, rating:${isRatingDesc}, weight:${isWeightAsc}, discount:${isDiscountDesc}, value:${isValueDesc}`);
} catch (e) {
    recordTest('6-Mode Sorting Logic', false, e.message);
}

// 5. Deals Filtering Test
try {
    ctx.resetFilters();
    ctx.onDealsOnlyToggle({ target: { checked: true } });
    const dealsList = ctx.getFilteredAndSortedProducts();
    const allDealsHaveDiscounts = dealsList.length > 0 && dealsList.every(p => p.discountPercent > 0);
    
    ctx.onDealsOnlyToggle({ target: { checked: false } });
    const allList = ctx.getFilteredAndSortedProducts();

    recordTest('Deals Filtering Logic', allDealsHaveDiscounts && allList.length === 38, 
        `Deals count=${dealsList.length}/38, all have discountPercent > 0: ${allDealsHaveDiscounts}`);
} catch (e) {
    recordTest('Deals Filtering Logic', false, e.message);
}

// 6. Price History SVG Sparkline Generation Test
try {
    const sampleHistory = [379, 379, 349, 329, 299];
    const svgStr = ctx.renderSparklineSVG(sampleHistory);
    const validSVG = svgStr.includes('<svg') && svgStr.includes('<polyline') && svgStr.includes('<circle') && svgStr.includes('sparkline-meta');
    recordTest('Price History SVG Sparkline Generation', validSVG, `Generated SVG string length: ${svgStr.length}, contains polyline & circles & sparkline-meta`);
} catch (e) {
    recordTest('Price History SVG Sparkline Generation', false, e.message);
}

// 7. Layout View Toggles Test
try {
    ctx.setViewMode('table');
    const tableActive = registry['viewBtnTable'].classList.contains('active');
    ctx.setViewMode('grid');
    const gridActive = registry['viewBtnGrid'].classList.contains('active');
    ctx.setViewMode('auto');
    const autoActive = registry['viewBtnAuto'].classList.contains('active');
    
    recordTest('Layout View Toggles Logic', tableActive && gridActive && autoActive, 
        `Table active:${tableActive}, Grid active:${gridActive}, Auto active:${autoActive}`);
} catch (e) {
    recordTest('Layout View Toggles Logic', false, e.message);
}

// 8. Side-by-Side Comparison Modal Test
try {
    ctx.clearCompareSelection();
    ctx.toggleCompareItem('tent-rei-halfdome');
    ctx.toggleCompareItem('tent-nemo-dagger');
    
    const compareCount = ctx.state.selectedCompareIds.length;
    ctx.openCompareModal();
    
    const modalActive = registry['compareModal'].classList.contains('active');
    const modalHeaderHasContent = registry['modalTableHeaderRow'].innerHTML.includes('REI Co-op');
    const modalBodyHasContent = registry['modalTableBody'].innerHTML.length > 50;

    ctx.removeFromCompareModal('tent-rei-halfdome');
    const afterRemoveCount = ctx.state.selectedCompareIds.length;
    
    ctx.closeCompareModal();
    const modalClosed = !registry['compareModal'].classList.contains('active');

    const compareSuccess = (compareCount === 2) && modalActive && modalHeaderHasContent && modalBodyHasContent && (afterRemoveCount === 1) && modalClosed;
    recordTest('Side-by-Side Comparison Modal Logic', compareSuccess, 
        `Count=${compareCount}, ModalActive=${modalActive}, HeaderContent=${modalHeaderHasContent}, BodyContent=${modalBodyHasContent}, AfterRemove=${afterRemoveCount}`);
} catch (e) {
    recordTest('Side-by-Side Comparison Modal Logic', false, e.message);
}

console.log('\n=== AUDIT SUMMARY ===');
const failedTests = auditResults.filter(r => !r.passed);
console.log(`Total tests run: ${auditResults.length}, Passed: ${auditResults.length - failedTests.length}, Failed: ${failedTests.length}`);
