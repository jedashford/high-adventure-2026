const fs = require('fs');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract JS script from HTML
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
    console.error('No script tag found!');
    process.exit(1);
}
let scriptCode = scriptMatch[1];

// Set up mock DOM environment for VM execution
function createDOMMock() {
    const elements = {};
    
    function createMockElement(tagName, id = '') {
        const children = [];
        const listeners = {};
        const classes = new Set();
        const attrs = {};
        
        const el = {
            tagName: tagName.toUpperCase(),
            id: id,
            innerHTML: '',
            innerText: '',
            textContent: '',
            value: '',
            className: '',
            style: {},
            children: children,
            dataset: {},
            
            setAttribute(name, val) {
                attrs[name] = String(val);
                if (name === 'class') {
                    this.className = String(val);
                    classes.clear();
                    String(val).split(/\s+/).filter(Boolean).forEach(c => classes.add(c));
                }
            },
            getAttribute(name) {
                return attrs[name] || null;
            },
            removeAttribute(name) {
                delete attrs[name];
            },
            
            classList: {
                add(...cols) {
                    cols.forEach(c => classes.add(c));
                    el.className = Array.from(classes).join(' ');
                },
                remove(...cols) {
                    cols.forEach(c => classes.delete(c));
                    el.className = Array.from(classes).join(' ');
                },
                toggle(c, force) {
                    if (force === true) classes.add(c);
                    else if (force === false) classes.delete(c);
                    else if (classes.has(c)) classes.delete(c);
                    else classes.add(c);
                    el.className = Array.from(classes).join(' ');
                },
                contains(c) {
                    return classes.has(c);
                }
            },
            
            addEventListener(event, handler) {
                if (!listeners[event]) listeners[event] = [];
                listeners[event].push(handler);
            },
            removeEventListener(event, handler) {
                if (listeners[event]) {
                    listeners[event] = listeners[event].filter(h => h !== handler);
                }
            },
            dispatchEvent(eventObj) {
                const evtType = typeof eventObj === 'string' ? eventObj : eventObj.type;
                if (listeners[evtType]) {
                    listeners[evtType].forEach(h => h.call(el, eventObj));
                }
            },
            
            appendChild(child) {
                children.push(child);
                return child;
            },
            querySelector(sel) {
                return createMockElement('div');
            },
            querySelectorAll(sel) {
                return [createMockElement('button'), createMockElement('div')];
            },
            cloneNode(deep) {
                return createMockElement(tagName, id);
            }
        };
        
        return el;
    }
    
    const doc = {
        getElementById(id) {
            if (!elements[id]) {
                elements[id] = createMockElement('div', id);
            }
            return elements[id];
        },
        querySelector(sel) {
            if (sel.startsWith('#')) {
                return this.getElementById(sel.substring(1));
            }
            return createMockElement('div');
        },
        querySelectorAll(sel) {
            return [createMockElement('button'), createMockElement('div')];
        },
        createElement(tagName) {
            return createMockElement(tagName);
        },
        createElementNS(ns, tagName) {
            const el = createMockElement(tagName);
            el.namespaceURI = ns;
            return el;
        },
        addEventListener(evt, handler) {
            if (evt === 'DOMContentLoaded') {
                setTimeout(handler, 10);
            }
        },
        body: createMockElement('body')
    };

    const win = {
        document: doc,
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval,
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
    win.window = win;
    return { win, doc, elements };
}

const { win, doc, elements } = createDOMMock();
const context = vm.createContext(win);

try {
    // Append code to expose top-level declarations to window
    const extendedCode = scriptCode + '\n; window.PRODUCTS = PRODUCTS;\n';
    vm.runInContext(extendedCode, context);
    console.log('Script executed cleanly in VM without syntax errors!');
} catch (e) {
    console.error('Script runtime error during load:', e);
}

const PRODUCTS = context.window.PRODUCTS;
console.log(`PRODUCTS loaded: ${PRODUCTS ? PRODUCTS.length : 0} items`);

// Perform Check 3: Data Model & Math Integrity
console.log('\n--- CHECK 3: DATA MODEL & MATH INTEGRITY ---');

if (!PRODUCTS || !Array.isArray(PRODUCTS)) {
    console.error('FAIL: PRODUCTS is not an array!');
    process.exit(1);
}

console.log(`Product count: ${PRODUCTS.length} (Expected: 38)`);
const productCountPass = PRODUCTS.length === 38;

const categories = new Set(PRODUCTS.map(p => p.category));
console.log(`Distinct categories count: ${categories.size} (Expected: 9)`);
console.log('Categories:', Array.from(categories));
const categoriesPass = categories.size === 9;

// Profiles checking
const allTargetAudience = new Set();
PRODUCTS.forEach(p => {
    if (Array.isArray(p.targetAudience)) {
        p.targetAudience.forEach(ta => allTargetAudience.add(ta));
    }
});
console.log('Target profiles found across products:', Array.from(allTargetAudience));

// Check each required profile: 'adult', 'youth', 'ultralight', 'budget'
const requiredProfiles = ['adult', 'youth', 'ultralight', 'budget'];
const profileCounts = {};
requiredProfiles.forEach(prof => {
    profileCounts[prof] = PRODUCTS.filter(p => p.targetAudience && p.targetAudience.includes(prof)).length;
});
console.log('Profile product counts:', profileCounts);

// Math check: discountPercent vs Math.round((msrp - currentPrice) / msrp * 100)
let discountMathMismatches = 0;
let discountMathDetails = [];

PRODUCTS.forEach((p, idx) => {
    const expectedDiscount = Math.round(((p.msrp - p.currentPrice) / p.msrp) * 100);
    if (p.discountPercent !== expectedDiscount) {
        discountMathMismatches++;
        discountMathDetails.push({
            id: p.id,
            name: p.name,
            msrp: p.msrp,
            currentPrice: p.currentPrice,
            statedDiscount: p.discountPercent,
            computedDiscount: expectedDiscount
        });
    }
});

console.log(`Discount math mismatches: ${discountMathMismatches}`);
if (discountMathMismatches > 0) {
    console.log('Mismatch details:', JSON.stringify(discountMathDetails, null, 2));
}

// Authenticity checks
let invalidPriceHistory = 0;
let invalidSpecs = 0;
let invalidRatings = 0;
let invalidProsCons = 0;
let invalidVerdicts = 0;

PRODUCTS.forEach((p, idx) => {
    if (!Array.isArray(p.priceHistory) || p.priceHistory.length === 0) {
        invalidPriceHistory++;
    }
    if (!p.specs || typeof p.specs !== 'object' || Object.keys(p.specs).length === 0) {
        invalidSpecs++;
    }
    if (typeof p.rating !== 'number' || p.rating < 1 || p.rating > 5) {
        invalidRatings++;
    }
    if (!Array.isArray(p.pros) || p.pros.length === 0 || !Array.isArray(p.cons) || p.cons.length === 0) {
        invalidProsCons++;
    }
    if (!p.verdict || typeof p.verdict !== 'string' || p.verdict.trim().length === 0) {
        invalidVerdicts++;
    }
});

console.log(`Invalid priceHistory: ${invalidPriceHistory}`);
console.log(`Invalid specs: ${invalidSpecs}`);
console.log(`Invalid ratings: ${invalidRatings}`);
console.log(`Invalid pros/cons: ${invalidProsCons}`);
console.log(`Invalid verdicts: ${invalidVerdicts}`);
