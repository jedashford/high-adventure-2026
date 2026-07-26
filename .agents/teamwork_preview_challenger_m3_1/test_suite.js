const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('--- STARTING EMPIRICAL STRESS TEST SUITE ---');

const dom = new JSDOM(htmlContent, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'file://' + htmlPath
});

const { window } = dom;
const { document } = window;

// Intercept alerts
const alerts = [];
window.alert = (msg) => {
    alerts.push(msg);
};

function evalInDOM(code) {
    return dom.window.eval(code);
}

function flush() {
    return new Promise(resolve => setTimeout(resolve, 20));
}

async function runTests() {
    await flush();

    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        details: []
    };

    function assert(description, condition, extraInfo = '') {
        results.total++;
        if (condition) {
            results.passed++;
            results.details.push({ status: 'PASS', description, extraInfo });
            console.log(`[PASS] ${description}`);
        } else {
            results.failed++;
            results.details.push({ status: 'FAIL', description, extraInfo });
            console.error(`[FAIL] ${description} | Info: ${extraInfo}`);
        }
    }

    const PRODUCTS = evalInDOM('PRODUCTS');
    const CATEGORIES = evalInDOM('CATEGORIES');

    assert('PRODUCTS array loaded and has 38 products', Array.isArray(PRODUCTS) && PRODUCTS.length === 38, `Length: ${PRODUCTS ? PRODUCTS.length : 0}`);
    assert('CATEGORIES array loaded and has 10 categories', Array.isArray(CATEGORIES) && CATEGORIES.length === 10, `Length: ${CATEGORIES ? CATEGORIES.length : 0}`);

    // ==========================================
    // 1. SEARCH FILTER COMBINATORICS
    // ==========================================
    console.log('\n--- Testing Search Filter Combinatorics ---');

    // Test Special Characters
    const specialChars = ["'", '"', '<script>', 'tent & bag', '\\', '/', '[tents]', '(ultralight)', '*', '?', '+', '%', '$', '#', '@', '!', ';', ':', '_', '-', '~', '⛺', '⭐'];
    for (const char of specialChars) {
        evalInDOM('resetFilters()');
        evalInDOM(`state.searchQuery = ${JSON.stringify(char)}`);
        evalInDOM('renderTabs()');
        evalInDOM('renderProducts()');
        assert(`Search query with special chars: ${JSON.stringify(char)} renders without error`, true, `Table rows: ${document.querySelectorAll('#gearTableBody tr').length}`);
    }

    // Test Case Sensitivity & Substrings
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "PATAGONIA"');
    evalInDOM('renderProducts()');
    const patagoniaCountUpper = evalInDOM('getFilteredAndSortedProducts()').length;

    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "patagonia"');
    evalInDOM('renderProducts()');
    const patagoniaCountLower = evalInDOM('getFilteredAndSortedProducts()').length;

    assert('Search query is case-insensitive ("PATAGONIA" vs "patagonia")', patagoniaCountUpper > 0 && patagoniaCountUpper === patagoniaCountLower, `Upper: ${patagoniaCountUpper}, Lower: ${patagoniaCountLower}`);

    // Leading / Trailing Whitespace Edge Case
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = " Osprey "');
    const whitespaceSearchResults = evalInDOM('getFilteredAndSortedProducts()').length;
    evalInDOM('state.searchQuery = "Osprey"');
    const trimmedSearchResults = evalInDOM('getFilteredAndSortedProducts()').length;
    
    assert('Search query strips leading/trailing whitespace', 
        whitespaceSearchResults === trimmedSearchResults, 
        `" Osprey " count: ${whitespaceSearchResults}, "Osprey" count: ${trimmedSearchResults}`
    );

    // Search Scope Testing
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "Garmin"');
    let resultsList = evalInDOM('getFilteredAndSortedProducts()');
    assert('Search matches Brand ("Garmin")', resultsList.length === 2 && resultsList.every(p => p.brand.toLowerCase().includes('garmin')), `Count: ${resultsList.length}`);

    // Spec search
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "Titanium"');
    resultsList = evalInDOM('getFilteredAndSortedProducts()');
    assert('Search matches Specs ("Titanium")', resultsList.length > 0 && resultsList.some(p => Object.values(p.specs).some(v => String(v).includes('Titanium'))), `Count: ${resultsList.length}`);

    // Verdict search
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "palace"');
    resultsList = evalInDOM('getFilteredAndSortedProducts()');
    assert('Search matches Verdict ("palace")', resultsList.length === 1 && resultsList[0].id === 'tent-rei-halfdome', `Count: ${resultsList.length}`);

    // Empty Search
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = ""');
    assert('Empty search query returns all 38 products', evalInDOM('getFilteredAndSortedProducts()').length === 38);

    // Whitespace Only Search
    evalInDOM('state.searchQuery = "   "');
    assert('Whitespace search query treated as empty search (38 products)', evalInDOM('getFilteredAndSortedProducts()').length === 38);

    // Non-Matching Search & Empty State
    evalInDOM('resetFilters()');
    evalInDOM('state.searchQuery = "nonexistentxyz123"');
    evalInDOM('renderProducts()');
    const emptyStateDisp = document.getElementById('emptyState').style.display;
    const tableDisp = document.getElementById('tableContainer').style.display;
    const cardDisp = document.getElementById('cardContainer').style.display;
    assert('Non-matching search triggers emptyState display block', emptyStateDisp === 'block', `emptyState display: ${emptyStateDisp}`);
    assert('Non-matching search hides tableContainer and cardContainer', tableDisp === 'none' && cardDisp === 'none', `table: ${tableDisp}, card: ${cardDisp}`);

    // Clearing Search restores view
    evalInDOM('resetFilters()');
    evalInDOM('renderProducts()');
    assert('Clearing search restores 38 products and hides empty state', evalInDOM('getFilteredAndSortedProducts()').length === 38 && document.getElementById('emptyState').style.display === 'none');


    // ==========================================
    // 2. CATEGORY + PROFILE FILTER COMBINATIONS
    // ==========================================
    console.log('\n--- Testing Category + Profile Filter Combinations ---');

    // Dynamically calculate expected counts from PRODUCTS array to verify filtering logic accuracy
    CATEGORIES.forEach(cat => {
        ['all', 'adult', 'youth', 'ultralight', 'budget'].forEach(prof => {
            evalInDOM('resetFilters()');
            evalInDOM(`setProfileFilter("${prof}")`);
            evalInDOM(`setCategoryFilter("${cat.id}")`);

            const expected = PRODUCTS.filter(p => {
                if (cat.id !== 'all' && p.category !== cat.id) return false;
                if (prof !== 'all' && !p.profiles.includes(prof)) return false;
                return true;
            }).length;

            const actual = evalInDOM('getFilteredAndSortedProducts()').length;
            assert(`Combination Category: ${cat.id} + Profile: ${prof}`, actual === expected, `Expected ${expected}, got ${actual}`);
        });
    });

    // Verify Tab Match Count Badge accuracy under Profile Filter
    evalInDOM('resetFilters()');
    evalInDOM('setProfileFilter("ultralight")');
    const tabButtons = document.querySelectorAll('#categoryTabs .tab-btn');
    let allTabBadgeCount = 0;
    let sumCategoryBadges = 0;

    tabButtons.forEach(btn => {
        const textSpans = btn.querySelectorAll('span');
        if (textSpans.length >= 2) {
            const catText = textSpans[0].textContent.trim();
            const badgeCount = parseInt(textSpans[1].textContent.trim(), 10);
            if (catText.includes('All Categories')) {
                allTabBadgeCount = badgeCount;
            } else {
                sumCategoryBadges += badgeCount;
            }
        }
    });

    assert('Sum of category tab badges equals "All Categories" tab badge under Profile filter', 
        allTabBadgeCount === sumCategoryBadges, 
        `All Tab Badge: ${allTabBadgeCount}, Sum Categories: ${sumCategoryBadges}`
    );

    // Deals-only toggle
    evalInDOM('resetFilters()');
    evalInDOM('onDealsOnlyToggle({ target: { checked: true } })');
    const dealsOnlyProducts = evalInDOM('getFilteredAndSortedProducts()');
    assert('Deals Only filter filters products with discountPercent >= 15', 
        dealsOnlyProducts.every(p => p.discountPercent >= 15), 
        `Count: ${dealsOnlyProducts.length}, Min discount in set: ${Math.min(...dealsOnlyProducts.map(p => p.discountPercent))}%`
    );


    // ==========================================
    // 3. COMPARISON SELECTION EDGE CASES
    // ==========================================
    console.log('\n--- Testing Comparison Selection Edge Cases ---');

    evalInDOM('clearCompareSelection()');
    assert('Initial compare selection is empty (0 items)', evalInDOM('state.selectedCompareIds.length') === 0);
    assert('Floating compare bar hidden when 0 items selected', !document.getElementById('floatingCompareBar').classList.contains('visible'));

    // Try opening modal with 0 items
    alerts.length = 0;
    evalInDOM('openCompareModal()');
    assert('Opening compare modal with 0 items shows alert', alerts.length === 1 && alerts[0].includes('at least 2 items'), `Alert: ${alerts[0]}`);
    assert('Compare modal stays hidden with 0 items', !document.getElementById('compareModal').classList.contains('active'));

    // Select 1 item
    evalInDOM('toggleCompareItem("tent-rei-halfdome")');
    assert('Selected 1 item', evalInDOM('state.selectedCompareIds.length') === 1);
    assert('Floating compare bar is visible with 1 item', document.getElementById('floatingCompareBar').classList.contains('visible'));

    // Try opening modal with 1 item
    alerts.length = 0;
    evalInDOM('openCompareModal()');
    assert('Opening compare modal with 1 item shows alert', alerts.length === 1 && alerts[0].includes('at least 2 items'), `Alert: ${alerts[0]}`);

    // Select 2, 3, 4 items
    evalInDOM('toggleCompareItem("tent-ba-copperspur")');
    evalInDOM('toggleCompareItem("tent-marmot-tungsten")');
    evalInDOM('toggleCompareItem("tent-durston-xmid")');
    assert('Selected 4 items successfully', evalInDOM('state.selectedCompareIds.length') === 4);

    // Try selecting 5th item (>4 items limit)
    alerts.length = 0;
    evalInDOM('toggleCompareItem("tent-nemo-aurora")');
    assert('Attempting to select 5th item triggers max 4 limit alert', alerts.length === 1 && alerts[0].includes('maximum of 4 items'), `Alert: ${alerts[0]}`);
    assert('5th item is NOT added to selectedCompareIds', evalInDOM('state.selectedCompareIds.length') === 4);

    // Open modal with 4 items
    evalInDOM('openCompareModal()');
    const modalActive = document.getElementById('compareModal').classList.contains('active');
    const headerCols = document.querySelectorAll('#modalTableHeaderRow th').length;
    assert('Compare modal opens with 4 items', modalActive && headerCols === 5, `Active: ${modalActive}, Cols: ${headerCols}`);

    // EDGE CASE BUG TEST: Removing item inside modal down to 1 item
    evalInDOM('toggleCompareItem("tent-rei-halfdome")');
    evalInDOM('toggleCompareItem("tent-ba-copperspur")');
    assert('Compare selection reduced to 2 items in state', evalInDOM('state.selectedCompareIds.length') === 2);

    // Now remove 1 more item using inline header remove button: `toggleCompareItem('id'); openCompareModal();`
    alerts.length = 0;
    evalInDOM('toggleCompareItem("tent-marmot-tungsten")'); // selection now has 1 item
    evalInDOM('openCompareModal()'); // inline button calls this
    const modalStillActiveAfterRemoveToOne = document.getElementById('compareModal').classList.contains('active');
    const bodyOverflowStyle = document.body.style.overflow;

    assert('EDGE CASE BUG DETECTED: Removing item down to 1 inside modal leaves modal active with backdrop stuck', 
        modalStillActiveAfterRemoveToOne === true && bodyOverflowStyle === 'hidden',
        `Modal Active: ${modalStillActiveAfterRemoveToOne}, Body Overflow: ${bodyOverflowStyle}`
    );

    // Close modal
    evalInDOM('closeCompareModal()');
    assert('Closing compare modal removes active class', !document.getElementById('compareModal').classList.contains('active'));

    // Test switching categories with items selected for compare
    evalInDOM('clearCompareSelection()');
    evalInDOM('toggleCompareItem("tent-rei-halfdome")');
    evalInDOM('toggleCompareItem("tent-ba-copperspur")');
    evalInDOM('setCategoryFilter("electronics")');
    assert('Compare selection persists across category tab changes', evalInDOM('state.selectedCompareIds.length') === 2);
    assert('Floating compare bar remains visible with selected items from other categories', document.getElementById('floatingCompareBar').classList.contains('visible'));

    // Clear compare selection
    evalInDOM('clearCompareSelection()');
    assert('clearCompareSelection resets array to empty', evalInDOM('state.selectedCompareIds.length') === 0);
    assert('Floating compare bar hides after clearCompareSelection', !document.getElementById('floatingCompareBar').classList.contains('visible'));


    // ==========================================
    // 4. LAYOUT VIEW MODE TOGGLING
    // ==========================================
    console.log('\n--- Testing Layout View Mode Toggling ---');

    evalInDOM('resetFilters()');
    
    // Default 'auto'
    evalInDOM('setViewMode("auto")');
    assert('setViewMode("auto") sets state.viewMode = "auto"', evalInDOM('state.viewMode') === 'auto');
    assert('viewBtnAuto has active class', document.getElementById('viewBtnAuto').classList.contains('active'));

    // Table mode
    evalInDOM('setViewMode("table")');
    assert('setViewMode("table") sets state.viewMode = "table"', evalInDOM('state.viewMode') === 'table');
    assert('viewBtnTable has active class', document.getElementById('viewBtnTable').classList.contains('active'));
    assert('tableContainer display is "block" in table mode', document.getElementById('tableContainer').style.display === 'block');
    assert('cardContainer display is "none" in table mode', document.getElementById('cardContainer').style.display === 'none');

    // Grid / Cards mode
    evalInDOM('setViewMode("grid")');
    assert('setViewMode("grid") sets state.viewMode = "grid"', evalInDOM('state.viewMode') === 'grid');
    assert('viewBtnGrid has active class', document.getElementById('viewBtnGrid').classList.contains('active'));
    assert('tableContainer display is "none" in grid mode', document.getElementById('tableContainer').style.display === 'none');
    assert('cardContainer display is "grid" in grid mode', document.getElementById('cardContainer').style.display === 'grid');

    // Restore auto mode
    evalInDOM('setViewMode("auto")');


    // ==========================================
    // 5. SORT ORDERING ACCURACY ACROSS ALL FIELDS
    // ==========================================
    console.log('\n--- Testing Sort Ordering Accuracy ---');

    evalInDOM('resetFilters()');

    // Sort: price-asc
    evalInDOM('state.sortBy = "price-asc"');
    let sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isPriceAsc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].currentPrice > sortedList[i + 1].currentPrice) {
            isPriceAsc = false;
            break;
        }
    }
    assert('Sort price-asc correctly orders products from lowest to highest price', isPriceAsc, `Min: $${sortedList[0].currentPrice}, Max: $${sortedList[sortedList.length - 1].currentPrice}`);

    // Sort: price-desc
    evalInDOM('state.sortBy = "price-desc"');
    sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isPriceDesc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].currentPrice < sortedList[i + 1].currentPrice) {
            isPriceDesc = false;
            break;
        }
    }
    assert('Sort price-desc correctly orders products from highest to lowest price', isPriceDesc, `Max: $${sortedList[0].currentPrice}, Min: $${sortedList[sortedList.length - 1].currentPrice}`);

    // Sort: rating
    evalInDOM('state.sortBy = "rating"');
    sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isRatingDesc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].rating < sortedList[i + 1].rating) {
            isRatingDesc = false;
            break;
        }
    }
    assert('Sort rating correctly orders products by rating descending', isRatingDesc, `Top: ${sortedList[0].rating}, Bottom: ${sortedList[sortedList.length - 1].rating}`);

    // Sort: weight
    evalInDOM('state.sortBy = "weight"');
    sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isWeightAsc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].weightOz > sortedList[i + 1].weightOz) {
            isWeightAsc = false;
            break;
        }
    }
    assert('Sort weight correctly orders products by weight ascending (lightest first)', isWeightAsc, `Lightest: ${sortedList[0].weightOz} oz, Heaviest: ${sortedList[sortedList.length - 1].weightOz} oz`);

    // Sort: discount
    evalInDOM('state.sortBy = "discount"');
    sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isDiscountDesc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].discountPercent < sortedList[i + 1].discountPercent) {
            isDiscountDesc = false;
            break;
        }
    }
    assert('Sort discount correctly orders products by discountPercent descending', isDiscountDesc, `Top discount: ${sortedList[0].discountPercent}%, Lowest: ${sortedList[sortedList.length - 1].discountPercent}%`);

    // Sort: value
    evalInDOM('state.sortBy = "value"');
    sortedList = evalInDOM('getFilteredAndSortedProducts()');
    let isValueDesc = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i].valueRating < sortedList[i + 1].valueRating) {
            isValueDesc = false;
            break;
        }
    }
    assert('Sort value correctly orders products by valueRating descending', isValueDesc, `Top value: ${sortedList[0].valueRating}, Lowest: ${sortedList[sortedList.length - 1].valueRating}`);


    // ==========================================
    // 6. ADVERSARIAL DATA INTEGRITY & BADGE CHECK
    // ==========================================
    console.log('\n--- Testing Data Integrity & WCAG AA Badges ---');

    let allValid = true;
    PRODUCTS.forEach((p, idx) => {
        const isValid = 
            typeof p.id === 'string' &&
            typeof p.name === 'string' &&
            typeof p.brand === 'string' &&
            typeof p.category === 'string' &&
            typeof p.categoryName === 'string' &&
            Array.isArray(p.profiles) && p.profiles.length > 0 &&
            typeof p.msrp === 'number' &&
            typeof p.currentPrice === 'number' &&
            typeof p.discountPercent === 'number' &&
            typeof p.rating === 'number' &&
            typeof p.reviewCount === 'number' &&
            typeof p.weightOz === 'number' &&
            typeof p.weightDisplay === 'string' &&
            typeof p.valueRating === 'number' &&
            typeof p.specs === 'object' &&
            Array.isArray(p.priceHistory) && p.priceHistory.length > 0 &&
            Array.isArray(p.pros) &&
            Array.isArray(p.cons) &&
            typeof p.verdict === 'string';

        if (!isValid) allValid = false;
    });

    assert('All 38 PRODUCTS have complete and valid schema attributes', allValid);

    // Summary output
    console.log('\n==========================================');
    console.log(`TEST SUMMARY: Total: ${results.total} | Passed: ${results.passed} | Failed: ${results.failed}`);
    console.log('==========================================\n');

    fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_m3_1/test_results.json', JSON.stringify(results, null, 2));

    return results;
}

runTests().catch(err => {
    console.error('Test execution failed with error:', err);
    process.exit(1);
});
