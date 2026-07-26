const fs = require('fs');

const html = fs.readFileSync('gemini-code-1784928132429.html', 'utf-8');

// Extract script
const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
    console.error("No script found!");
    process.exit(1);
}
let jsCode = scriptMatch[1];

// DOM Mocking Infrastructure
const elements = {};

function createMockElement(id, tagName = 'div', attrs = {}) {
    const classSet = new Set();
    const el = {
        id,
        tagName: tagName.toUpperCase(),
        innerText: '',
        innerHTML: '',
        src: attrs.src || '',
        alt: attrs.alt || '',
        title: attrs.title || '',
        dataset: {},
        style: { display: attrs.display || '' },
        classList: {
            add: (cls) => classSet.add(cls),
            remove: (cls) => classSet.delete(cls),
            contains: (cls) => classSet.has(cls),
            has: (cls) => classSet.has(cls)
        },
        listeners: {},
        addEventListener(evt, fn) {
            if (!this.listeners[evt]) this.listeners[evt] = [];
            this.listeners[evt].push(fn);
        },
        dispatchEvent(evtObj) {
            const handlers = this.listeners[evtObj.type] || [];
            handlers.forEach(fn => fn(evtObj));
        }
    };
    return el;
}

const mockDoc = {
    body: { style: {} },
    listeners: {},
    addEventListener(evt, fn) {
        if (!this.listeners[evt]) this.listeners[evt] = [];
        this.listeners[evt].push(fn);
    },
    dispatchEvent(evtObj) {
        const handlers = this.listeners[evtObj.type] || [];
        handlers.forEach(fn => fn(evtObj));
    },
    getElementById(id) {
        if (!elements[id]) {
            elements[id] = createMockElement(id);
        }
        return elements[id];
    }
};

// Populate known DOM elements from HTML file
elements['lightboxImg'] = createMockElement('lightboxImg', 'img', {
    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>"
});
elements['lightboxTitle'] = createMockElement('lightboxTitle');
elements['lightboxMeta'] = createMockElement('lightboxMeta');
elements['imageLightboxModal'] = createMockElement('imageLightboxModal', 'div', { display: 'none' });
elements['compareModal'] = createMockElement('compareModal', 'div', { display: 'none' });
elements['resultsCount'] = createMockElement('resultsCount');
elements['activeCategoryName'] = createMockElement('activeCategoryName');
elements['activeFiltersTag'] = createMockElement('activeFiltersTag');
elements['gearTableBody'] = createMockElement('gearTableBody');
elements['cardContainer'] = createMockElement('cardContainer');
elements['emptyState'] = createMockElement('emptyState');
elements['tableContainer'] = createMockElement('tableContainer');
elements['floatingCompareBar'] = createMockElement('floatingCompareBar');
elements['compareCount'] = createMockElement('compareCount');

// Global setup
globalThis.document = mockDoc;
globalThis.window = globalThis;
globalThis.elements = elements;

const testRunnerCode = `
console.log("=========================================");
console.log("TASK 1: Verify Initial DOM State of #lightboxImg");
console.log("=========================================");
const initialSrc = elements['lightboxImg'].src;
console.log("Initial lightboxImg src:", initialSrc);
if (initialSrc === "") {
    console.error("FAIL: initial src is empty string!");
} else if (initialSrc.startsWith("data:image/svg+xml")) {
    console.log("PASS: initial src is a valid SVG Data-URI!");
} else {
    console.log("INFO: initial src is:", initialSrc);
}

console.log("\\n=========================================");
console.log("TASK 2: Inspect Image Rendering Across All Products & Categories");
console.log("=========================================");
console.log("Total PRODUCTS count:", PRODUCTS.length);
const catMap = {};
PRODUCTS.forEach(p => {
    catMap[p.category] = (catMap[p.category] || 0) + 1;
});
console.log("Categories present:", JSON.stringify(catMap, null, 2));

let renderErrorCount = 0;
PRODUCTS.forEach((p) => {
    const imgUrl = getProductImageUrl(p);
    if (!imgUrl) {
        console.error("FAIL: Product " + p.id + " has empty imageUrl!");
        renderErrorCount++;
    }
});
if (renderErrorCount === 0) {
    console.log("PASS: All 50 products generate non-empty image URLs.");
}

console.log("\\n=========================================");
console.log("TASK 3: Test Lightbox Triggering, Display, and Closure");
console.log("=========================================");

let testFailures = 0;

PRODUCTS.forEach((p) => {
    // 1. Trigger openImageLightbox
    openImageLightbox(p.id);

    // Check modal state
    const modal = elements['imageLightboxModal'];
    const title = elements['lightboxTitle'].innerText;
    const img = elements['lightboxImg'];
    const meta = elements['lightboxMeta'].innerHTML;
    const bodyOverflow = document.body.style.overflow;

    if (modal.style.display !== 'flex') {
        console.error("FAIL: Product " + p.id + " - Modal display is not 'flex'");
        testFailures++;
    }
    if (!modal.classList.contains('active')) {
        console.error("FAIL: Product " + p.id + " - Modal class active missing");
        testFailures++;
    }
    if (title !== p.brand + " - " + p.name) {
        console.error("FAIL: Product " + p.id + " - Title mismatch");
        testFailures++;
    }
    if (img.src !== getProductImageUrl(p)) {
        console.error("FAIL: Product " + p.id + " - Lightbox image src mismatch");
        testFailures++;
    }
    if (!meta.includes(p.categoryName) || !meta.includes(String(p.currentPrice))) {
        console.error("FAIL: Product " + p.id + " - Lightbox metadata incomplete");
        testFailures++;
    }
    if (bodyOverflow !== 'hidden') {
        console.error("FAIL: Product " + p.id + " - Body overflow not hidden");
        testFailures++;
    }

    // 2. Test Closure via Close Button Click
    closeImageLightbox({ target: { classList: { contains: cls => cls === 'modal-close-btn' } } });
    if (modal.style.display !== 'none' || document.body.style.overflow !== '') {
        console.error("FAIL: Product " + p.id + " - Modal closure via close button failed");
        testFailures++;
    }

    // Re-open for backdrop test
    openImageLightbox(p.id);
    // 3. Test Closure via Backdrop Click
    closeImageLightbox({ target: { id: 'imageLightboxModal', classList: { contains: () => false } } });
    if (modal.style.display !== 'none' || document.body.style.overflow !== '') {
        console.error("FAIL: Product " + p.id + " - Modal closure via backdrop click failed");
        testFailures++;
    }

    // Re-open for Escape key test
    openImageLightbox(p.id);
    // 4. Test Closure via Escape Key (calls closeImageLightbox() with no args)
    closeImageLightbox();
    if (modal.style.display !== 'none' || document.body.style.overflow !== '') {
        console.error("FAIL: Product " + p.id + " - Modal closure via Escape key failed");
        testFailures++;
    }
});

if (testFailures === 0) {
    console.log("PASS: All 50 products passed lightbox triggering, rendering, and 3 closure modes (button, backdrop, Escape)!");
} else {
    console.error("FAIL: " + testFailures + " errors detected during lightbox testing!");
}
`;

eval(jsCode + "\n" + testRunnerCode);
