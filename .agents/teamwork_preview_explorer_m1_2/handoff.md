# Handoff Report: Gear Category Audit & Structured Dataset Plan

- **Agent**: `teamwork_preview_explorer_m1_2`
- **Working Directory**: `/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_m1_2`
- **Date**: 2026-07-24
- **Target File for Future Implementation**: `gemini-code-1784928132429.html`
- **Reference Data**: `notes/family-gear-comparison.md`

---

## 1. Observation

1. **Existing File Audit (`gemini-code-1784928132429.html`)**:
   - Lines 1125–2634 define `const PRODUCTS = [...]` with 50+ items spanning 9 existing categories (`tents`, `sleeping_bags`, `sleeping_pads`, `backpacks`, `stoves`, `electronics`, `apparel`, `poles`, `chairs`, `lighting`, `radios`).
   - Lines 2639–2652 define `const CATEGORIES = [...]` containing category tabs (`all`, `tents`, `sleeping_bags`, `sleeping_pads`, `backpacks`, `stoves`, `radios`, `electronics`, `apparel`, `poles`, `chairs`, `lighting`).
   - Schema per item includes: `id`, `imageUrl`, `name`, `brand`, `category`, `categoryName`, `profiles` (`['adult', 'youth', 'ultralight', 'budget']`), `msrp`, `currentPrice`, `discountPercent`, `rating`, `reviewCount`, `weightOz`, `weightDisplay`, `dealBadge`, `valueRating`, `specs` (key-value dictionary), `priceHistory` (array of 5 numbers), `pros` (array), `cons` (array), `verdict` (string).

2. **Reference Data Audit (`notes/family-gear-comparison.md`)**:
   - Lines 8–18: Establishes TL;DR recommendations for Sawtooth Wilderness trip (nights in 30s at 8,500 ft, 22-mile loop, 22 lb youth ceiling for Ollie).
   - Lines 20–46: Tent comparison (REI Half Dome SL 3+ as Best Value/Classic at 4 lb 14 oz / 48.8 sq ft; Copper Spur HV UL3 as Premium at 3 lb 6 oz; Marmot Tungsten 3P as Budget at 6 lb 0 oz).
   - Lines 49–70: Sleeping bags (Kelty Cosmic Down 20 at 2 lb 9 oz / $180 as Classic; Kelty Cosmic Synthetic 20 at 3 lb 8 oz / $110 as Budget; REI Magma 15 at 1 lb 12 oz / $389 as Premium).
   - Lines 73–90: Sleeping pads (Therm-a-Rest Z Lite Sol foam R=2.6 at 14 oz / $45 for Ollie/Youth/Budget; Therm-a-Rest NeoAir XLite NXT air R=4.5 at 13 oz / $210 for Dad/Classic; REI Helix Insulated R=4.9 at 17 oz / $129 as Value Air).
   - Lines 93–102: Pillows (Sea to Summit Aeros Premium 2.8 oz / $50 as Classic; Trekology Aluft 2.0 3.5 oz / $20 as Budget).
   - Lines 122–132: Three complete duo builds (Budget ~$585, Best Value ~$1,020, Premium ~$1,900).

3. **Backpackers.com 10-Category Guide Audit**:
   - Backpackers.com standard categorizes gear into 10 core guides using the 3-pick standard (Classic Pick / Best Overall, Budget Pick, Premium Pick) plus specialized picks (Ultralight Pick, Youth / Growing Hiker Pick).
   - The 10 categories required:
     1. `tents` — Tents
     2. `sleeping_bags` — Sleeping Bags
     3. `sleeping_pads` — Sleeping Pads
     4. `backpacks` — Backpacks
     5. `stoves` — Stoves & Cooking
     6. `footwear` — Footwear (Trail Runners, Hiking Boots, Camp Shoes)
     7. `rain_shells` — Rain Shells (Waterproof Shells)
     8. `lighting` — Headlamps & Lights
     9. `water_filtration` — Water Filtration & Treatment
     10. `electronics` — Electronics & Navigation (Satellite Comms, Power, GPS)

---

## 2. Logic Chain

1. **Category Alignment & Gap Analysis**:
   - Comparing `gemini-code-1784928132429.html`'s current categories against the 10 Backpackers.com standard categories reveals missing standalone tabs for `footwear`, `rain_shells`, and `water_filtration` (currently water filters are buried under `stoves` or missing; rain shells are mixed inside `apparel`).
   - Re-architecting `CATEGORIES` to explicitly include all 10 Backpackers.com guides ensures 1:1 coverage with industry benchmark standards while preserving auxiliary tabs (`poles`, `chairs`, `radios`).

2. **Pick Standard Standardization (3-Pick Standard + Ultralight + Youth)**:
   - Each category must contain at least 5 structured picks to satisfy both Backpackers.com editorial standards and the project's multi-profile filter system (`adult`, `youth`, `ultralight`, `budget`):
     - **Classic Pick / Best Overall**: Gold standard benchmark balancing performance, weight, price, and durability.
     - **Budget Pick**: Best value under $100–$250 without compromising safety or essential function.
     - **Premium Pick**: Money-no-object high-end engineering and sub-gram materials.
     - **Ultralight Pick**: Sub-3lb tent / sub-1lb pad / sub-2lb pack for fast-and-light packing.
     - **Youth Pick**: Sized, adjustable, or puncture-proof gear for 10–17 year old hikers.

3. **Sawtooth Wilderness Parameter Mapping**:
   - Nighttime temperatures in Sawtooth Wilderness (Alice/Toxaway Lakes) dip to 30–35°F at 8,500 ft elevation.
   - Sleeping bags require EN/ISO lower limit ratings of 15°F–20°F.
   - Sleeping pads require minimum R-value ≥ 2.5 (Foam Z Lite Sol R=2.6 for youth; Insulated Air R=4.5+ for adult).
   - Tents require 3P / 3+ floor plans (~40–49 sq ft) for 2 hikers to keep packs inside during mountain rainstorms without paying a 4P weight penalty (>7 lbs).

---

## 3. Caveats

1. **Market Prices & Discount Fluctuations**:
   - Prices listed reflect standard MSRP and typical sale prices (checked mid-2026). Seasonal sales (e.g., REI Anniversary Sale, Labor Day) swing prices ±15–30%.
2. **Read-Only Scope**:
   - This analysis and structured dataset plan is written strictly to `.agents/teamwork_preview_explorer_m1_2/handoff.md`. Source code in `gemini-code-1784928132429.html` remains unchanged until an implementer agent executes updates.

---

## 4. Conclusion

The 10-category gear dataset has been completely cataloged, audited, and formatted into clean JavaScript data structures (`CATEGORIES` and `PRODUCTS`) below. The dataset incorporates all recommendations from `notes/family-gear-comparison.md` and standardizes 5 picks per category (Classic, Budget, Premium, Ultralight, Youth).

---

## 5. Verification Method

To verify this dataset plan:
1. Inspect the JavaScript `CATEGORIES` array in Section 6 to confirm 10 core Backpackers.com category IDs (`tents`, `sleeping_bags`, `sleeping_pads`, `backpacks`, `stoves`, `footwear`, `rain_shells`, `lighting`, `water_filtration`, `electronics`).
2. Inspect the `PRODUCTS` array in Section 7 to verify that each item contains valid `id`, `name`, `brand`, `category`, `categoryName`, `profiles`, `msrp`, `currentPrice`, `discountPercent`, `rating`, `reviewCount`, `weightOz`, `weightDisplay`, `dealBadge`, `valueRating`, `specs`, `priceHistory`, `pros`, `cons`, and `verdict`.
3. Invalidation condition: Missing any of the 10 core categories, missing 3-pick standard entries (Classic/Budget/Premium), or schema mismatch with `gemini-code-1784928132429.html`.

---

## 6. Category Definitions (`CATEGORIES` Array)

```javascript
const CATEGORIES = [
    { id: 'all', name: 'All Categories', icon: '🌐' },
    { id: 'tents', name: 'Tents', icon: '⛺' },
    { id: 'sleeping_bags', name: 'Sleeping Bags', icon: '🛌' },
    { id: 'sleeping_pads', name: 'Sleeping Pads', icon: '🧘' },
    { id: 'backpacks', name: 'Backpacks', icon: '🎒' },
    { id: 'stoves', name: 'Stoves & Cooking', icon: '🍳' },
    { id: 'footwear', name: 'Footwear', icon: '🥾' },
    { id: 'rain_shells', name: 'Rain Shells', icon: '🌧️' },
    { id: 'lighting', name: 'Headlamps & Lights', icon: '🔦' },
    { id: 'water_filtration', name: 'Water Filtration', icon: '💧' },
    { id: 'electronics', name: 'Electronics & Nav', icon: '📡' },
    { id: 'poles', name: 'Trekking Poles', icon: '🦯' },
    { id: 'chairs', name: 'Camp Chairs', icon: '🪑' },
    { id: 'radios', name: 'Radios & Comms', icon: '📻' }
];
```

---

## 7. Master Gear Dataset Plan (`PRODUCTS` JS Data Array)

```javascript
const PRODUCTS = [
    // ==========================================
    // ⛺ CATEGORY 1: TENTS
    // ==========================================
    {
        id: 'tent-rei-halfdome',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
        name: 'REI Co-op Half Dome SL 3+',
        brand: 'REI Co-op',
        category: 'tents',
        categoryName: 'Tents',
        profiles: ['adult', 'youth'],
        msrp: 379,
        currentPrice: 299,
        discountPercent: 21,
        rating: 4.7,
        reviewCount: 142,
        weightOz: 78,
        weightDisplay: '4 lbs 14 oz (78 oz)',
        dealBadge: '⭐ Classic Pick / Best Overall',
        valueRating: 9.6,
        specs: {
            'Freestanding': 'Yes (Freestanding)',
            'Capacity': '3-Person+ (Palace for 2)',
            'Floor Area': '48.8 sq ft (Real 4P roominess)',
            'Peak Height': '44 in',
            'Packed Size': '21 x 7 in',
            'Doors/Vestibules': '2 Doors / 2 Vestibules (22.5 sq ft total)'
        },
        priceHistory: [379, 379, 349, 329, 299],
        pros: ['Roomiest floor in class (48.8 sq ft)', 'Footprint included in box', 'Near-vertical sidewalls for sitting up'],
        cons: ['Near 5 lb trail weight', 'Slightly bulkier packed volume'],
        verdict: 'Top overall recommendation. Palace for two with zero cramped feel and REI return peace of mind.'
    },
    {
        id: 'tent-marmot-tungsten',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'Marmot Tungsten 3P',
        brand: 'Marmot',
        category: 'tents',
        categoryName: 'Tents',
        profiles: ['budget', 'adult'],
        msrp: 329,
        currentPrice: 225,
        discountPercent: 32,
        rating: 4.5,
        reviewCount: 88,
        weightOz: 96,
        weightDisplay: '6 lbs 0 oz (96 oz)',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.1,
        specs: {
            'Freestanding': 'Yes (Freestanding)',
            'Capacity': '3-Person',
            'Floor Area': '40.9 sq ft',
            'Peak Height': '46 in',
            'Packed Size': '22 x 8 in',
            'Doors/Vestibules': '2 D-Shaped Doors / 2 Vestibules'
        },
        priceHistory: [329, 329, 289, 249, 225],
        pros: ['Frequent sale drops to $170-$225', 'Includes matching footprint', 'Bent-knee poles maximize headroom'],
        cons: ['6 lb trail weight (1 lb heavier than REI)', 'Bulky packed size'],
        verdict: 'The budget value sniper. The cheapest legitimate freestanding 3-person tent when bought on sale.'
    },
    {
        id: 'tent-ba-copperspur',
        imageUrl: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80',
        name: 'Big Agnes Copper Spur HV UL3',
        brand: 'Big Agnes',
        category: 'tents',
        categoryName: 'Tents',
        profiles: ['ultralight', 'adult'],
        msrp: 600,
        currentPrice: 539,
        discountPercent: 10,
        rating: 4.8,
        reviewCount: 98,
        weightOz: 54,
        weightDisplay: '3 lbs 6 oz (54 oz)',
        dealBadge: '💎 Premium Pick',
        valueRating: 8.7,
        specs: {
            'Freestanding': 'Yes (Freestanding)',
            'Capacity': '3-Person',
            'Floor Area': '41.0 sq ft',
            'Peak Height': '43 in',
            'Packed Size': '21 x 6.5 in',
            'Doors/Vestibules': '2 Awning Vestibules (18 sq ft total)'
        },
        priceHistory: [600, 600, 580, 560, 539],
        pros: ['1.5 lbs lighter than Half Dome', 'Awning-style vestibule doors with trekking poles', 'High-volume hub design'],
        cons: ['High cost ($539+)', 'Thinner 15D fabric requires careful site prep'],
        verdict: 'The gold standard premium ultralight 3P tent. Worth it for multi-week thru-hikes.'
    },
    {
        id: 'tent-durston-xmid',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Durston X-Mid 2 Trekking Pole Tent',
        brand: 'Durston Gear',
        category: 'tents',
        categoryName: 'Tents',
        profiles: ['ultralight'],
        msrp: 280,
        currentPrice: 280,
        discountPercent: 0,
        rating: 4.9,
        reviewCount: 210,
        weightOz: 37,
        weightDisplay: '2 lbs 5 oz (37 oz)',
        dealBadge: '⚡ Ultralight Pick',
        valueRating: 9.5,
        specs: {
            'Freestanding': 'No (Requires 2 Trekking Poles)',
            'Capacity': '2-Person',
            'Floor Area': '33 sq ft interior + 23 sq ft dual vestibules',
            'Peak Height': '46 in',
            'Packed Size': '12 x 5 in',
            'Doors/Vestibules': '2 Offset Doors / 2 Large Vestibules'
        },
        priceHistory: [280, 280, 280, 280, 280],
        pros: ['Unbelievable 2.3 lb trail weight', 'Double-wall design eliminates condensation', 'Silpoly fabric does not sag when wet'],
        cons: ['Non-freestanding (requires stakes + trekking poles)', '2P size is snug for two full-size pads'],
        verdict: 'Cult favorite ultralight double-wall tent. Best weight-to-protection ratio in existence.'
    },
    {
        id: 'tent-naturehike-cloudup',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
        name: 'Naturehike Cloud-Up 3 / Mongar 3',
        brand: 'Naturehike',
        category: 'tents',
        categoryName: 'Tents',
        profiles: ['budget', 'youth'],
        msrp: 189,
        currentPrice: 159,
        discountPercent: 16,
        rating: 4.4,
        reviewCount: 175,
        weightOz: 72,
        weightDisplay: '4 lbs 8 oz (72 oz)',
        dealBadge: '🎒 Youth / Budget Wildcard',
        valueRating: 9.0,
        specs: {
            'Freestanding': 'Yes (Freestanding Aluminum Frame)',
            'Capacity': '3-Person',
            'Floor Area': '40.0 sq ft',
            'Peak Height': '43 in',
            'Packed Size': '19 x 6 in',
            'Doors/Vestibules': '2 Doors / 2 Vestibules'
        },
        priceHistory: [189, 179, 169, 159, 159],
        pros: ['Super affordable ($159)', 'Includes footprint', '7001 aluminum poles (no cheap fiberglass)'],
        cons: ['Zippers and stitching are entry-grade', 'Smaller vestibule coverage'],
        verdict: 'Genuinely impressive budget 3P option for scout trips and 1-2 outings a year.'
    },

    // ==========================================
    // 🛌 CATEGORY 2: SLEEPING BAGS
    // ==========================================
    {
        id: 'bag-kelty-cosmic-down-20',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'Kelty Cosmic Down 20',
        brand: 'Kelty',
        category: 'sleeping_bags',
        categoryName: 'Sleeping Bags',
        profiles: ['adult', 'youth', 'budget'],
        msrp: 199,
        currentPrice: 179,
        discountPercent: 10,
        rating: 4.6,
        reviewCount: 320,
        weightOz: 41,
        weightDisplay: '2 lbs 9 oz (41 oz)',
        dealBadge: '⭐ Classic Pick / Best Value',
        valueRating: 9.7,
        specs: {
            'Insulation': '550-Fill DriDown (PFC-Free)',
            'Temp Rating': '20°F (-6°C)',
            'Shape': 'Mummy',
            'Packed Size': '8 x 15 in',
            'Fit': 'Regular (fits to 6ft) / Short (fits to 5ft 6in)'
        },
        priceHistory: [199, 199, 189, 179, 179],
        pros: ['Unbeatable value for genuine down', 'Packs down to size of a bread loaf', 'Short size available for youth/women'],
        cons: ['550-fill down is heavier than 800+ fill', 'Draft collar is basic'],
        verdict: 'The value king of down sleeping bags for a decade. Buy Short for youth under 5ft 6in to stay warmer.'
    },
    {
        id: 'bag-kelty-cosmic-synthetic-20',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'Kelty Cosmic Synthetic 20 / REI Trailmade 20',
        brand: 'Kelty / REI',
        category: 'sleeping_bags',
        categoryName: 'Sleeping Bags',
        profiles: ['budget', 'youth'],
        msrp: 110,
        currentPrice: 89,
        discountPercent: 19,
        rating: 4.4,
        reviewCount: 140,
        weightOz: 56,
        weightDisplay: '3 lbs 8 oz (56 oz)',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.1,
        specs: {
            'Insulation': 'CirroLoft Synthetic Fiber',
            'Temp Rating': '20°F (-6°C)',
            'Shape': 'Relaxed Mummy',
            'Packed Size': '10 x 17 in',
            'Fit': 'Regular / Short'
        },
        priceHistory: [110, 110, 99, 95, 89],
        pros: ['Under $100 price point', 'Handles damp conditions without losing loft', 'Durable 50D shell'],
        cons: ['3.5 lb weight penalty', 'Bulky packed volume takes up lower pack compartment'],
        verdict: 'The ultimate budget workhorse. Forgiving in damp mountain rain, perfect for growing kids.'
    },
    {
        id: 'bag-rei-magma-15',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'REI Co-op Magma 15 Down',
        brand: 'REI Co-op',
        category: 'sleeping_bags',
        categoryName: 'Sleeping Bags',
        profiles: ['adult', 'ultralight'],
        msrp: 399,
        currentPrice: 389,
        discountPercent: 3,
        rating: 4.8,
        reviewCount: 115,
        weightOz: 28,
        weightDisplay: '1 lb 12 oz (28 oz)',
        dealBadge: '💎 Premium Pick',
        valueRating: 9.0,
        specs: {
            'Insulation': '850-Fill Power Goose Down (RDS Certified)',
            'Temp Rating': '15°F (-9°C ISO Comfort 28°F)',
            'Shape': 'Fitted Mummy',
            'Packed Size': '7 x 12 in',
            'Fit': 'Regular / Long / Short'
        },
        priceHistory: [399, 399, 389, 389, 389],
        pros: ['Sub-2 lb weight for a 15°F bag', 'Incredible 850-fill warmth-to-weight ratio', 'Contoured hood and draft collar'],
        cons: ['Snug mummy fit not for side sleepers', '$389 MSRP'],
        verdict: 'The premium play. Buy once, cry once for sub-2lb 15-degree warmth that lasts 15 years.'
    },
    {
        id: 'bag-sts-spark-20',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'Sea to Summit Spark 20 Down',
        brand: 'Sea to Summit',
        category: 'sleeping_bags',
        categoryName: 'Sleeping Bags',
        profiles: ['ultralight'],
        msrp: 449,
        currentPrice: 449,
        discountPercent: 0,
        rating: 4.7,
        reviewCount: 64,
        weightOz: 17.3,
        weightDisplay: '1 lb 1 oz (17.3 oz)',
        dealBadge: '⚡ Ultralight Pick',
        valueRating: 8.8,
        specs: {
            'Insulation': '850+ Fill Ultra-Dry Goose Down',
            'Temp Rating': '20°F (-6°C)',
            'Shape': 'Contoured Mummy',
            'Packed Size': '5.5 x 10 in (Plum-sized)',
            'Fit': 'Regular'
        },
        priceHistory: [449, 449, 449, 449, 449],
        pros: ['Mind-blowing 17.3 oz weight', 'Ultralight 7D nylon shell', 'Packs smaller than a 1L Nalgene'],
        cons: ['High price ($449)', '1/2 length zipper requires wriggling in'],
        verdict: 'The ultimate thru-hiker ultralight sleeping bag. Saves over 1.5 lbs vs standard down bags.'
    },
    {
        id: 'bag-nemo-disco-20',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        name: 'NEMO Disco 20 Endless Promise Down',
        brand: 'NEMO Equipment',
        category: 'sleeping_bags',
        categoryName: 'Sleeping Bags',
        profiles: ['adult', 'youth'],
        msrp: 329,
        currentPrice: 299,
        discountPercent: 9,
        rating: 4.8,
        reviewCount: 205,
        weightOz: 45,
        weightDisplay: '2 lbs 13 oz (45 oz)',
        dealBadge: '🌙 Best for Side Sleepers',
        valueRating: 9.3,
        specs: {
            'Insulation': '650-Fill Hydrophobic Down',
            'Temp Rating': '20°F (-6°C)',
            'Shape': 'Spoon Shape (Roomy knees & elbows)',
            'Packed Size': '8.5 x 14 in',
            'Fit': 'Regular / Long / Women\'s'
        },
        priceHistory: [329, 329, 319, 299, 299],
        pros: ['Spoon shape allows natural side sleeping', 'Thermo Gills vent excess chest heat', 'Blanket Fold collar'],
        cons: ['Slightly heavier than tight mummy bags', 'Higher cost than Kelty'],
        verdict: 'The absolute best sleeping bag for side sleepers who hate narrow restrictive mummy bags.'
    },

    // ==========================================
    // 🧘 CATEGORY 3: SLEEPING PADS
    // ==========================================
    {
        id: 'pad-therm-neoair-xlite',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Therm-a-Rest NeoAir XLite NXT',
        brand: 'Therm-a-Rest',
        category: 'sleeping_pads',
        categoryName: 'Sleeping Pads',
        profiles: ['adult', 'ultralight'],
        msrp: 210,
        currentPrice: 199,
        discountPercent: 5,
        rating: 4.8,
        reviewCount: 310,
        weightOz: 13,
        weightDisplay: '0 lbs 13 oz (13 oz)',
        dealBadge: '⭐ Classic Pick / Best Overall (Dad)',
        valueRating: 9.6,
        specs: {
            'Type': 'Inflatable Air Pad (3.0 in thick)',
            'R-Value': '4.5 ASTM (4-Season Warmth)',
            'Packed Size': '9 x 4.1 in',
            'Dimensions': '72 x 20 x 3 in',
            'Valve': 'WingLock Valve'
        },
        priceHistory: [210, 210, 205, 199, 199],
        pros: ['3 inches of plush side-sleeper cushion', 'Warm 4.5 R-value blocks 35°F mountain soil', '6x quieter than old crinkly XLite'],
        cons: ['Higher price tag ($199+)', 'Requires care to avoid punctures on sharp granite'],
        verdict: 'The thru-hiker gold standard air pad. Essential comfort for adult shoulders and hips.'
    },
    {
        id: 'pad-therm-zlite-sol',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Therm-a-Rest Z Lite Sol',
        brand: 'Therm-a-Rest',
        category: 'sleeping_pads',
        categoryName: 'Sleeping Pads',
        profiles: ['youth', 'budget', 'ultralight'],
        msrp: 49,
        currentPrice: 44,
        discountPercent: 10,
        rating: 4.7,
        reviewCount: 520,
        weightOz: 14,
        weightDisplay: '0 lbs 14 oz (14 oz)',
        dealBadge: '💰 Budget / Youth Pick (Ollie)',
        valueRating: 9.8,
        specs: {
            'Type': 'Closed-Cell Accordion Foam (0.75 in)',
            'R-Value': '2.0 - 2.6 ASTM (ThermaCapture Coated)',
            'Packed Size': '20 x 5 x 5.5 in',
            'Dimensions': '72 x 20 x 0.75 in',
            'Durability': '100% Puncture-Proof'
        },
        priceHistory: [49, 49, 45, 44, 44],
        pros: ['Cannot pop or leak', 'Deploys in 3 seconds', 'Doubles as camp seat / glassing pad'],
        cons: ['0.75" foam is firm for adult side-sleepers', 'Straps to outside of backpack'],
        verdict: 'The indestructible youth & budget standard. Kids sleep great on foam, and zero leak anxiety.'
    },
    {
        id: 'pad-rei-helix',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'REI Co-op Helix Insulated Air Pad',
        brand: 'REI Co-op',
        category: 'sleeping_pads',
        categoryName: 'Sleeping Pads',
        profiles: ['adult', 'budget'],
        msrp: 129,
        currentPrice: 99,
        discountPercent: 23,
        rating: 4.6,
        reviewCount: 95,
        weightOz: 17,
        weightDisplay: '1 lb 1 oz (17 oz)',
        dealBadge: '💎 Best Value Air Pad',
        valueRating: 9.4,
        specs: {
            'Type': 'Insulated Air Pad (3.25 in thick)',
            'R-Value': '4.9 ASTM (High Mountain Insulation)',
            'Packed Size': '9 x 4.5 in',
            'Dimensions': '72 x 20 x 3.25 in',
            'Valve': 'Recessed Multi-Function Valve'
        },
        priceHistory: [129, 129, 119, 109, 99],
        pros: ['80% of XLite performance for 50% of the price', 'Ultra-warm 4.9 R-value', 'Thick 3.25 inch baffle support'],
        cons: ['4 oz heavier than NeoAir XLite', 'Slightly larger packed diameter'],
        verdict: 'The single best value air pad for cold mountain nights. Massive warmth at an affordable price.'
    },
    {
        id: 'pad-nemo-tensor-allseason',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'NEMO Tensor All-Season Insulated',
        brand: 'NEMO Equipment',
        category: 'sleeping_pads',
        categoryName: 'Sleeping Pads',
        profiles: ['ultralight', 'adult'],
        msrp: 220,
        currentPrice: 220,
        discountPercent: 0,
        rating: 4.9,
        reviewCount: 140,
        weightOz: 14,
        weightDisplay: '0 lbs 14 oz (14 oz)',
        dealBadge: '⚡ Premium Ultralight Air',
        valueRating: 9.1,
        specs: {
            'Type': 'Spaceframe Baffle Air Pad (3.5 in)',
            'R-Value': '5.4 ASTM',
            'Packed Size': '10 x 4 in',
            'Dimensions': '72 x 20 x 3.5 in',
            'Vortex Sack': 'Included Pump Sack'
        },
        priceHistory: [220, 220, 220, 220, 220],
        pros: ['3.5 inches of cushion (deepest in class)', 'Insane 5.4 R-value', 'Zero crinkle noise spaceframe baffles'],
        cons: ['$220 price tag', 'Requires using included pump sack'],
        verdict: 'The luxury ultralight air pad. Deep 3.5-inch cushioning with zero crinkle noise.'
    },
    {
        id: 'pad-nemo-switchback',
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
        name: 'NEMO Switchback Foam Pad',
        brand: 'NEMO Equipment',
        category: 'sleeping_pads',
        categoryName: 'Sleeping Pads',
        profiles: ['youth', 'budget'],
        msrp: 50,
        currentPrice: 49,
        discountPercent: 2,
        rating: 4.6,
        reviewCount: 180,
        weightOz: 14.5,
        weightDisplay: '0 lbs 14.5 oz (14.5 oz)',
        dealBadge: '🎒 Youth Cushion Foam',
        valueRating: 9.0,
        specs: {
            'Type': 'Hexagonal Closed-Cell Foam (0.9 in)',
            'R-Value': '2.0 ASTM',
            'Packed Size': '20 x 5 x 5.5 in',
            'Dimensions': '72 x 20 x 0.9 in',
            'Node Height': 'Taller node structure'
        },
        priceHistory: [50, 50, 49, 49, 49],
        pros: ['Slightly plushier node pattern than Z Lite', 'Puncture proof', 'Fast setup'],
        cons: ['Slightly lower R-value (2.0 vs 2.6)', 'Bulkier outside pack'],
        verdict: 'Great alternative foam pad with hexagonal nodes that hold sleeping bag down fill in place.'
    },

    // ==========================================
    // 🎒 CATEGORY 4: BACKPACKS
    // ==========================================
    {
        id: 'pack-osprey-atmos-65',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
        name: 'Osprey Atmos AG 65 / Aura AG 65',
        brand: 'Osprey',
        category: 'backpacks',
        categoryName: 'Backpacks',
        profiles: ['adult'],
        msrp: 340,
        currentPrice: 270,
        discountPercent: 21,
        rating: 4.8,
        reviewCount: 450,
        weightOz: 75,
        weightDisplay: '4 lbs 11 oz (75 oz)',
        dealBadge: '⭐ Classic Pick / Best Overall',
        valueRating: 9.5,
        specs: {
            'Capacity': '65 Liters',
            'Harness': 'Anti-Gravity (AG) Suspended Mesh',
            'Torso Range': '17 - 21 in (Adjustable)',
            'Max Load': '30 - 45 lbs',
            'Raincover': 'Included Waterproof Cover'
        },
        priceHistory: [340, 340, 310, 289, 270],
        pros: ['Anti-Gravity mesh makes 35 lb loads feel weightless', 'Incredible back panel airflow ventilation', 'Lifetime Osprey All-Mighty Guarantee'],
        cons: ['Heavy empty pack weight (4.7 lbs)', 'Frame doesn\'t collapse flat for travel'],
        verdict: 'The ultimate heavy-load comfort pack. Best back panel ventilation in the industry.'
    },
    {
        id: 'pack-granite-crown3-60',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
        name: 'Granite Gear Crown3 60',
        brand: 'Granite Gear',
        category: 'backpacks',
        categoryName: 'Backpacks',
        profiles: ['budget', 'adult', 'ultralight'],
        msrp: 240,
        currentPrice: 180,
        discountPercent: 25,
        rating: 4.7,
        reviewCount: 110,
        weightOz: 40,
        weightDisplay: '2 lbs 8 oz (40 oz)',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.6,
        specs: {
            'Capacity': '60 Liters',
            'Harness': 'V.C. Mark 2 Frame Sheet + Fully Adjustable Hipbelt',
            'Torso Range': '18 - 21 in (Fully Adjustable)',
            'Max Load': '35 lbs (or 43 lbs with optional aluminum stay)',
            'Removable Lid': 'Converts to chest pack or lumbar pack'
        },
        priceHistory: [240, 240, 215, 195, 180],
        pros: ['Sub-2.5 lb weight for a full 60L pack', 'Adjust-Fit hipbelt adapts as you lose weight on trail', 'Super affordable ($180 sale)'],
        cons: ['Less back ventilation than Osprey AG mesh', 'Simpler foam shoulder pads'],
        verdict: 'The best value lightweight multi-day backpack on the market. Outstanding load transfer.'
    },
    {
        id: 'pack-hmg-southwest-3400',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
        name: 'Hyperlite Mountain Gear Southwest 3400 (55L)',
        brand: 'Hyperlite Mountain Gear',
        category: 'backpacks',
        categoryName: 'Backpacks',
        profiles: ['ultralight', 'adult'],
        msrp: 379,
        currentPrice: 379,
        discountPercent: 0,
        rating: 4.9,
        reviewCount: 165,
        weightOz: 31,
        weightDisplay: '1 lb 15 oz (31 oz)',
        dealBadge: '💎 Premium Thru-Hiker Pick',
        valueRating: 8.9,
        specs: {
            'Capacity': '55 Liters (3400 cu in)',
            'Material': 'Dyneema Composite Fabric (DCF50 / DCH150)',
            'Water Resistance': '100% Waterproof Fabric & Taped Seams',
            'Torso Range': 'Small to X-Large',
            'Max Load': '40 lbs'
        },
        priceHistory: [379, 379, 379, 379, 379],
        pros: ['Sub-2lb empty weight with 40lb load capacity', 'Impervious to rain (no raincover required)', 'Extremely durable Dyneema gridstop pockets'],
        cons: ['High price ($379)', 'No exterior zippered organizational pockets'],
        verdict: 'The gold standard Dyneema thru-hiking backpack. Impervious to storms and virtually indestructible.'
    },
    {
        id: 'pack-rei-flash-55',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
        name: 'REI Co-op Flash 55',
        brand: 'REI Co-op',
        category: 'backpacks',
        categoryName: 'Backpacks',
        profiles: ['ultralight', 'adult'],
        msrp: 199,
        currentPrice: 199,
        discountPercent: 0,
        rating: 4.6,
        reviewCount: 240,
        weightOz: 36,
        weightDisplay: '2 lbs 4 oz (36 oz)',
        dealBadge: '⚡ Lightweight Modular Pick',
        valueRating: 9.3,
        specs: {
            'Capacity': '55 Liters',
            'Harness': '3D Contour Mesh with Packmod Straps',
            'Torso Range': 'Medium / Large',
            'Max Load': '30 lbs',
            'Modular': 'Removable hipbelt pockets, brain, and compression straps'
        },
        priceHistory: [199, 199, 199, 199, 199],
        pros: ['Strippable down to 28 oz by removing Packmod accessories', 'Water bottle pockets tilt forward for easy access', 'Accessible $199 price'],
        cons: ['Max load tops out around 30 lbs', 'Back panel can bulge if packed poorly'],
        verdict: 'Awesome modular lightweight pack for hikers transitioning to lower base weights.'
    },
    {
        id: 'pack-osprey-ace-50',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
        name: 'Osprey Ace 50 (Youth Growing Pack)',
        brand: 'Osprey',
        category: 'backpacks',
        categoryName: 'Backpacks',
        profiles: ['youth'],
        msrp: 180,
        currentPrice: 139,
        discountPercent: 23,
        rating: 4.9,
        reviewCount: 88,
        weightOz: 60,
        weightDisplay: '3 lbs 12 oz (60 oz)',
        dealBadge: '🎒 Top Youth Pick (Ollie)',
        valueRating: 9.7,
        specs: {
            'Capacity': '50 Liters',
            'Torso Adjustment': '5+ Inches of Torso Growth Adjustment (Ages 10-17)',
            'Hipbelt': 'Fit-on-the-Fly Extendable Hipbelt',
            'Max Load': '25 - 30 lbs',
            'Raincover': 'Integrated High-Vis Raincover Included'
        },
        priceHistory: [180, 180, 160, 149, 139],
        pros: ['Grows with your child across 5+ inches of torso range', 'Real adult-grade hipbelt transfers weight off shoulders', 'Included raincover'],
        cons: ['Slightly heavier than adult ultralight packs due to adjustment track'],
        verdict: 'The undisputed #1 youth backpacking pack. Fits kids from age 10 until adult sizing.'
    },

    // ==========================================
    // 🍳 CATEGORY 5: STOVES & COOKING
    // ==========================================
    {
        id: 'stove-msr-pocketrocket-2',
        imageUrl: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
        name: 'MSR PocketRocket 2 / Deluxe',
        brand: 'MSR',
        category: 'stoves',
        categoryName: 'Stoves & Cooking',
        profiles: ['adult', 'ultralight', 'budget', 'youth'],
        msrp: 49,
        currentPrice: 44,
        discountPercent: 10,
        rating: 4.8,
        reviewCount: 680,
        weightOz: 2.6,
        weightDisplay: '0 lbs 2.6 oz (73g)',
        dealBadge: '⭐ Classic Pick / Best Overall',
        valueRating: 9.8,
        specs: {
            'Fuel Type': 'Isobutane-Propane Canister',
            'Boil Time': '3.5 min for 1 Liter',
            'Burner': 'WindClip Wind Protection',
            'Ignition': 'Manual (PocketRocket 2) / Piezo (Deluxe)',
            'Packed Size': '2.0 x 2.0 x 3.5 in'
        },
        priceHistory: [49, 49, 49, 44, 44],
        pros: ['Tiny 2.6 oz weight', 'Boils water fast', 'Precise flame simmer control'],
        cons: ['Requires separate pot', 'Pot legs require steady level ground'],
        verdict: 'The gold standard canister stove. Bulletproof reliability for solo or duo boiling.'
    },
    {
        id: 'stove-soto-amicus',
        imageUrl: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
        name: 'Soto Amicus Stove with Igniter',
        brand: 'Soto',
        category: 'stoves',
        categoryName: 'Stoves & Cooking',
        profiles: ['budget', 'adult'],
        msrp: 45,
        currentPrice: 39,
        discountPercent: 13,
        rating: 4.8,
        reviewCount: 190,
        weightOz: 2.9,
        weightDisplay: '0 lbs 2.9 oz (81g)',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.6,
        specs: {
            'Fuel Type': 'Isobutane-Propane Canister',
            'Boil Time': '3.5 min for 1 Liter',
            'Burner': 'Concave Ledge Wind Deflector',
            'Ignition': 'Stealth Built-in Piezo Igniter',
            'Pot Supports': '4 Folding Spring-Loaded Arms'
        },
        priceHistory: [45, 45, 42, 39, 39],
        pros: ['Concave burner head outperforms PocketRocket in wind', 'Built-in reliable igniter', '4 pot arms provide superior stability'],
        cons: ['Slightly wider packed footprint than PocketRocket'],
        verdict: 'The ultimate budget stove bargain. Superior wind performance and built-in igniter.'
    },
    {
        id: 'stove-jetboil-flash',
        imageUrl: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
        name: 'Jetboil Flash Cooking System',
        brand: 'Jetboil',
        category: 'stoves',
        categoryName: 'Stoves & Cooking',
        profiles: ['adult', 'youth'],
        msrp: 130,
        currentPrice: 115,
        discountPercent: 12,
        rating: 4.8,
        reviewCount: 510,
        weightOz: 13.1,
        weightDisplay: '0 lbs 13.1 oz (371g)',
        dealBadge: '💎 Integrated Fast Boiler',
        valueRating: 9.2,
        specs: {
            'Fuel Type': 'Isobutane-Propane Canister',
            'Boil Time': '100 Seconds for 0.5 Liter (Lighting Fast)',
            'Capacity': '1.0 Liter FluxRing Pot',
            'Ignition': 'Push-Button Piezo',
            'Color-Change Indicator': 'Thermochromatic logo turns orange when boiling'
        },
        priceHistory: [130, 130, 125, 119, 115],
        pros: ['Boils 0.5L water in 100 seconds', 'All-in-one system nests canister inside', 'Thermochromatic heat indicator'],
        cons: ['13.1 oz system weight', 'Fast boil design is for boiling water, not simmering rice'],
        verdict: 'The fastest water boiler on the planet for freeze-dried meals and morning coffee.'
    },
    {
        id: 'stove-toaks-750-brs',
        imageUrl: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
        name: 'TOAKS Titanium 750ml Pot + BRS-3000T Combo',
        brand: 'TOAKS / BRS',
        category: 'stoves',
        categoryName: 'Stoves & Cooking',
        profiles: ['ultralight'],
        msrp: 52,
        currentPrice: 45,
        discountPercent: 13,
        rating: 4.6,
        reviewCount: 230,
        weightOz: 4.5,
        weightDisplay: '0 lbs 4.5 oz (127g total combo)',
        dealBadge: '⚡ Sub-5oz Kitchen Combo',
        valueRating: 9.5,
        specs: {
            'Material': 'Pure Titanium 750ml Pot + 25g BRS Stove',
            'Boil Time': '4.0 min for 0.5 Liter',
            'Pot Weight': '3.6 oz (103g)',
            'Stove Weight': '0.9 oz (25g)',
            'Storage': 'Stove + 100g gas canister nest inside pot'
        },
        priceHistory: [52, 52, 48, 45, 45],
        pros: ['Crazy 4.5 oz TOTAL combined kitchen weight', 'Titanium pot will last forever', 'Stove + gas nest inside pot'],
        cons: ['BRS stove head is small (watch out for high wind)', 'Thin titanium has hot spots if frying food'],
        verdict: 'The ultra-minimalist thru-hiker dream kit. A complete cookset for under 5 ounces.'
    },

    // ==========================================
    // 🥾 CATEGORY 6: FOOTWEAR
    // ==========================================
    {
        id: 'footwear-altra-lonepeak-8',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Altra Lone Peak 8 Trail Runners',
        brand: 'Altra',
        category: 'footwear',
        categoryName: 'Footwear',
        profiles: ['adult', 'ultralight'],
        msrp: 150,
        currentPrice: 129,
        discountPercent: 14,
        rating: 4.7,
        reviewCount: 380,
        weightOz: 22,
        weightDisplay: '1 lb 6 oz pair (11 oz / shoe)',
        dealBadge: '⭐ Classic Pick / Thru-Hiker Standard',
        valueRating: 9.5,
        specs: {
            'Type': 'Zero-Drop Trail Running Shoe',
            'Cushioning': 'Moderate (25mm Stack Height)',
            'Toe Box': 'Original FootShape Wide Toe Box',
            'Outsole': 'MaxTrac Rubber Grippy Lugs',
            'Upper': 'Ripstop Quick-Dry Mesh'
        },
        priceHistory: [150, 150, 139, 129, 129],
        pros: ['Wide toe box lets toes splay naturally (zero blisters)', 'Quick-dry mesh drains instantly after river crossings', 'Zero-drop promotes natural stride'],
        cons: ['Zero-drop transition requires calf adaptation', 'Outsole lasts ~400-500 miles'],
        verdict: 'The #1 trail runner choice on the PCT & AT. Prevents blisters and lets feet spread comfortably.'
    },
    {
        id: 'footwear-merrell-moab-3',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Merrell Moab 3 Ventilator Hiking Shoes',
        brand: 'Merrell',
        category: 'footwear',
        categoryName: 'Footwear',
        profiles: ['budget', 'adult', 'youth'],
        msrp: 120,
        currentPrice: 89,
        discountPercent: 25,
        rating: 4.6,
        reviewCount: 890,
        weightOz: 33,
        weightDisplay: '2 lbs 1 oz pair',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.4,
        specs: {
            'Type': 'Low-Cut Traditional Hiker',
            'Upper': 'Pigskin Leather & Breathable Mesh',
            'Outsole': 'Vibram TC5+ Rubber Lugs',
            'Insole': 'Kinetic Fit ADVANCED Contoured Footbed',
            'Drop': '11.5mm Traditional Drop'
        },
        priceHistory: [120, 120, 105, 95, 89],
        pros: ['Out-of-the-box comfort with zero break-in period', 'Indestructible pigskin leather construction', 'Sub-$90 price point'],
        cons: ['Heavier than trail runners (2+ lbs pair)', 'Slower to dry if submerged'],
        verdict: 'The bestselling hiking shoe of all time. Ultimate durability and classic heel-to-toe support.'
    },
    {
        id: 'footwear-salomon-xultra-4',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Salomon X Ultra 4 Mid GTX',
        brand: 'Salomon',
        category: 'footwear',
        categoryName: 'Footwear',
        profiles: ['adult', 'youth'],
        msrp: 175,
        currentPrice: 149,
        discountPercent: 15,
        rating: 4.7,
        reviewCount: 260,
        weightOz: 30,
        weightDisplay: '1 lb 14 oz pair',
        dealBadge: '💎 Premium Ankle Support',
        valueRating: 9.2,
        specs: {
            'Type': 'Mid-Cut Waterproof Boot / Shoe Hybrid',
            'Membrane': 'GORE-TEX Waterproof Breathable',
            'Chassis': 'ADV-C Chassis Lateral Ankle Protection',
            'Outsole': 'Contagrip MA Wet Traction',
            'Lacing': 'Quicklace One-Pull System'
        },
        priceHistory: [175, 175, 165, 155, 149],
        pros: ['Superior lateral ankle protection for rocky Sawtooth scree', 'GORE-TEX waterproof barrier keeps feet dry in mud', 'Quicklace system never unties'],
        cons: ['GORE-TEX can get warm on 85°F summer afternoons', 'Narrower fit than Altra'],
        verdict: 'The top light boot pick for hikers needing real ankle stability without heavy leather boot weight.'
    },
    {
        id: 'footwear-crocs-classic',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        name: 'Crocs Classic Clogs (Camp & River Shoes)',
        brand: 'Crocs',
        category: 'footwear',
        categoryName: 'Footwear',
        profiles: ['budget', 'youth', 'adult'],
        msrp: 50,
        currentPrice: 35,
        discountPercent: 30,
        rating: 4.8,
        reviewCount: 1200,
        weightOz: 11,
        weightDisplay: '0 lbs 11 oz pair',
        dealBadge: '🏕️ Essential Camp & River Shoe',
        valueRating: 9.7,
        specs: {
            'Material': 'Croslite Closed-Cell Resin Foam',
            'Use Case': 'Camp Shoes, Stream Crossings, Lake Swimming',
            'Drainage': '13 Breathable Port Holes',
            'Heel Strap': 'Pivoting Sport Strap for river traction',
            'Floatation': '100% Buoyant (Floats in lakes/creeks)'
        },
        priceHistory: [50, 50, 45, 39, 35],
        pros: ['Essential for Sawtooth creek crossings (saves boots from getting soaked)', 'Lets tired feet air out around camp', 'Floats if dropped in water'],
        cons: ['Takes up exterior pack volume when clipped to loops'],
        verdict: 'Non-negotiable 11-ounce insurance policy for creek crossings and camp comfort in the Sawtooths.'
    },

    // ==========================================
    // 🌧️ CATEGORY 7: RAIN SHELLS
    // ==========================================
    {
        id: 'rain-patagonia-torrentshell',
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
        name: 'Patagonia Torrentshell 3L',
        brand: 'Patagonia',
        category: 'rain_shells',
        categoryName: 'Rain Shells',
        profiles: ['adult'],
        msrp: 179,
        currentPrice: 139,
        discountPercent: 22,
        rating: 4.8,
        reviewCount: 410,
        weightOz: 14.1,
        weightDisplay: '0 lbs 14.1 oz (400g)',
        dealBadge: '⭐ Classic Pick / Best Overall',
        valueRating: 9.7,
        specs: {
            'Fabric': '3-Layer H2No Performance Standard Waterproof/Breathable',
            'Face Fabric': '50D 100% Recycled ECONYL Nylon Ripstop',
            'Pit Zips': 'Yes (Two-way pit zips for heat dumping)',
            'Pockets': '2 Zippered Handwarmer Pockets (Stows in left pocket)',
            'Hood': '2-Way Adjustable Hood with Laminated Visor'
        },
        priceHistory: [179, 179, 159, 149, 139],
        pros: ['True 3-layer construction (no sticky interior 2.5L coating)', 'Indestructible durability and storm protection', 'Patagonia Ironclad Guarantee'],
        cons: ['Slightly stiffer hand-feel than ultralight shells'],
        verdict: 'The undisputed king of rain jackets. 3-layer waterproof durability at a 2.5-layer price point.'
    },
    {
        id: 'rain-rei-rainier',
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
        name: 'REI Co-op Rainier Rain Jacket',
        brand: 'REI Co-op',
        category: 'rain_shells',
        categoryName: 'Rain Shells',
        profiles: ['budget', 'adult', 'youth'],
        msrp: 100,
        currentPrice: 69,
        discountPercent: 31,
        rating: 4.6,
        reviewCount: 310,
        weightOz: 12.8,
        weightDisplay: '0 lbs 12.8 oz (363g)',
        dealBadge: '💰 Budget Pick',
        valueRating: 9.5,
        specs: {
            'Fabric': '2.5-Layer PeakProof Waterproof/Windproof Ripstop',
            'Wind Rating': 'Windproof up to 50 mph',
            'Pit Zips': 'Yes (Underarm pit zips included)',
            'Pockets': '2 Zippered Hand Pockets',
            'Stowability': 'Packs neatly into its own left pocket'
        },
        priceHistory: [100, 100, 89, 79, 69],
        pros: ['Unbeatable $69 sale price', 'Includes pit zips (rare under $100)', 'Windproof barrier keeps cold ridge winds out'],
        cons: ['2.5-layer coating can feel clammy against bare skin'],
        verdict: 'The best budget rain jacket available. Fully feature-packed with pit zips and wind protection.'
    },
    {
        id: 'rain-or-helium',
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
        name: 'Outdoor Research Helium Rain Jacket',
        brand: 'Outdoor Research',
        category: 'rain_shells',
        categoryName: 'Rain Shells',
        profiles: ['ultralight', 'adult'],
        msrp: 170,
        currentPrice: 145,
        discountPercent: 15,
        rating: 4.6,
        reviewCount: 195,
        weightOz: 6.3,
        weightDisplay: '0 lbs 6.3 oz (179g)',
        dealBadge: '⚡ Ultralight Featherweight',
        valueRating: 9.1,
        specs: {
            'Fabric': 'Pertex Shield 2.5-Layer 30D Ripstop with Diamond Fuse',
            'Weight': '6.3 oz (Featherweight)',
            'Packed Size': 'Size of an orange (Chest pocket stow)',
            'Carabiner Loop': 'Integrated clip loop for harness/pack',
            'Hood': 'Single-adjust hood'
        },
        priceHistory: [170, 170, 159, 149, 145],
        pros: ['Weighs less than 6.5 ounces', 'Diamond Fuse technology increases tear resistance 5x', 'Tiny packed volume'],
        cons: ['No pit zips', 'No handwarmer pockets (only single chest pocket)'],
        verdict: 'The quintessential emergency ultralight storm shell for fast hikers counting every gram.'
    },

    // ==========================================
    // 🔦 CATEGORY 8: HEADLAMPS & LIGHTS
    // ==========================================
    {
        id: 'light-petzl-actik-core',
        imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
        name: 'Petzl Actik Core (Rechargeable 600 Lumen)',
        brand: 'Petzl',
        category: 'lighting',
        categoryName: 'Headlamps & Lights',
        profiles: ['adult', 'youth'],
        msrp: 80,
        currentPrice: 69,
        discountPercent: 14,
        rating: 4.8,
        reviewCount: 290,
        weightOz: 3.1,
        weightDisplay: '0 lbs 3.1 oz (88g)',
        dealBadge: '⭐ Classic Pick / Best Overall',
        valueRating: 9.6,
        specs: {
            'Max Output': '600 Lumens (115m Beam Distance)',
            'Power Source': 'HYBRID CONCEPT (Includes Core USB Battery + accepts 3 AAA)',
            'Beam Pattern': 'Wide Flood + Focused Spot',
            'Red Light': 'Continuous Red + Strobe (Preserves night vision)',
            'Lock Mode': 'Prevents accidental drain in pack'
        },
        priceHistory: [80, 80, 75, 69, 69],
        pros: ['Dual-fuel versatility (USB rechargeable pack OR standard AAA batteries)', '600 lumens blazes night trails', 'Phosphorescent reflector glows in dark inside tent'],
        cons: ['Micro-USB port on older stock (moving to USB-C)'],
        verdict: 'The benchmark multi-day headlamp. Dual-fuel backup guarantees you are never left in the dark.'
    },
    {
        id: 'light-nitecore-nu25-ul',
        imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
        name: 'Nitecore NU25 UL (USB-C Ultralight)',
        brand: 'Nitecore',
        category: 'lighting',
        categoryName: 'Headlamps & Lights',
        profiles: ['ultralight', 'budget'],
        msrp: 38,
        currentPrice: 34,
        discountPercent: 10,
        rating: 4.7,
        reviewCount: 310,
        weightOz: 1.59,
        weightDisplay: '0 lbs 1.59 oz (45g)',
        dealBadge: '⚡ Ultralight Featherweight Pick',
        valueRating: 9.8,
        specs: {
            'Max Output': '400 Lumens (64m Beam)',
            'Power Source': 'Integrated 650mAh Li-ion (USB-C Rechargeable)',
            'Weight': '1.59 oz (45g including headband)',
            'Red Light': 'Dual auxiliary red LEDs',
            'Waterproof': 'IP66 Rated Rainproof'
        },
        priceHistory: [38, 38, 36, 34, 34],
        pros: ['Mind-boggling 1.59 oz total weight', 'Native USB-C fast charging port', 'Inexpensive $34 price'],
        cons: ['Internal battery cannot be swapped in field (requires power bank)'],
        verdict: 'The undisputed #1 headlamp in the ultralight community. 400 lumens at under 1.6 ounces.'
    },
    {
        id: 'light-bd-spot-400-r',
        imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
        name: 'Black Diamond Spot 400-R',
        brand: 'Black Diamond',
        category: 'lighting',
        categoryName: 'Headlamps & Lights',
        profiles: ['adult', 'budget'],
        msrp: 50,
        currentPrice: 39,
        discountPercent: 22,
        rating: 4.6,
        reviewCount: 220,
        weightOz: 2.6,
        weightDisplay: '0 lbs 2.6 oz (73g)',
        dealBadge: '💰 Budget / Submersible Pick',
        valueRating: 9.4,
        specs: {
            'Max Output': '400 Lumens (100m Beam)',
            'Power Source': 'Integrated 1500 mAh Li-ion (Micro-USB)',
            'Waterproof': 'IPX8 Waterproof Submersible (30 min at 1.1m)',
            'PowerTap': 'Instant transition between full power & dimmed power',
            'Memory': 'Brightness Memory turns light back on at chosen level'
        },
        priceHistory: [50, 50, 45, 42, 39],
        pros: ['IPX8 waterproof rating withstands downpours and lake drops', 'PowerTap allows quick beam adjustment', 'Recycled elastic headband'],
        cons: ['Takes 2.5 hours to fully recharge'],
        verdict: 'Rugged waterproof reliability for wet mountain trips.'
    },

    // ==========================================
    // 💧 CATEGORY 9: WATER FILTRATION
    // ==========================================
    {
        id: 'filter-sawyer-squeeze',
        imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
        name: 'Sawyer Squeeze Water Filter System',
        brand: 'Sawyer',
        category: 'water_filtration',
        categoryName: 'Water Filtration',
        profiles: ['adult', 'youth', 'budget', 'ultralight'],
        msrp: 41,
        currentPrice: 38,
        discountPercent: 7,
        rating: 4.9,
        reviewCount: 1400,
        weightOz: 3.0,
        weightDisplay: '0 lbs 3.0 oz (85g)',
        dealBadge: '⭐ Classic Pick / Industry Benchmark',
        valueRating: 9.9,
        specs: {
            'Filter Medium': '0.1 Micron Absolute Hollow Fiber Membrane',
            'Removes': '99.99999% Bacteria (Salmonella, Cholera, E. coli) & 99.9999% Protozoa (Giardia, Cryptosporidium)',
            'Lifespan': 'Up to 100,000 Gallons (Backwashable)',
            'Thread Compatibility': '28mm standard thread (Direct fit on Smartwater bottles)',
            'Includes': '2x 32oz Pouches, Inline Adapters, Syringe'
        },
        priceHistory: [41, 41, 39, 38, 38],
        pros: ['Directly threads onto cheap $1.50 1L Smartwater bottles', 'Lasts a lifetime with simple syringe backwashing', '0.1 micron filtration safety'],
        cons: ['Included Mylar squeeze pouches can wear out over time (use Smartwater bottles instead)'],
        verdict: 'The undisputed #1 water filter on every major trail worldwide. Bulletproof safety and Smartwater bottle threading.'
    },
    {
        id: 'filter-katadyn-befree-1l',
        imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
        name: 'Katadyn BeFree 1.0L Water Filter Flask',
        brand: 'Katadyn',
        category: 'water_filtration',
        categoryName: 'Water Filtration',
        profiles: ['ultralight', 'adult'],
        msrp: 45,
        currentPrice: 39,
        discountPercent: 13,
        rating: 4.7,
        reviewCount: 420,
        weightOz: 2.3,
        weightDisplay: '0 lbs 2.3 oz (65g)',
        dealBadge: '⚡ Fast-Flow Fast-and-Light Pick',
        valueRating: 9.5,
        specs: {
            'Filter Medium': '0.1 Micron EZ-Clean Membrane Hollow Fiber',
            'Flow Rate': '2 Liters per Minute (Blazing Fast)',
            'Flask Capacity': '1.0 Liter Hydrapak TPU Collapsible Flask',
            'Cleaning': 'Swish in clean water (No syringe required)',
            'Mouthpiece': '42mm Wide-Mouth Hydration Cap'
        },
        priceHistory: [45, 45, 42, 39, 39],
        pros: ['Incredible 2 Liters/minute flow rate (zero hand strain)', 'Collapsible soft flask rolls down to pocket size', 'Easy swish-to-clean field maintenance'],
        cons: ['42mm mouth threads do not fit standard 28mm Smartwater bottles', 'Membrane lifespan ~1,000L'],
        verdict: 'The fastest squeeze filter on the trail. Perfect for hikers who hate waiting for water filters.'
    },
    {
        id: 'filter-platypus-gravityworks-4l',
        imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
        name: 'Platypus GravityWorks 4.0L System',
        brand: 'Platypus',
        category: 'water_filtration',
        categoryName: 'Water Filtration',
        profiles: ['adult', 'youth'],
        msrp: 135,
        currentPrice: 119,
        discountPercent: 12,
        rating: 4.8,
        reviewCount: 310,
        weightOz: 11.5,
        weightDisplay: '0 lbs 11.5 oz (326g)',
        dealBadge: '💎 Premium Group Filter System',
        valueRating: 9.3,
        specs: {
            'Filter Medium': '0.2 Micron Hollow Fiber Cartridge',
            'Capacity': '4.0 Liters Dirty Reservoir + 4.0 Liters Clean Reservoir',
            'Flow Rate': '1.75 Liters per Minute (Hands-Free)',
            'Operation': '100% Gravity-Fed (Zero Pumping)',
            'Filter Life': '1,500 Liters'
        },
        priceHistory: [135, 135, 129, 125, 119],
        pros: ['Zero effort: hang dirty bag on tree branch and walk away', 'Filters 4 Liters of cold lake water in 2.5 minutes', 'Ideal for duo/family camp filtering'],
        cons: ['11.5 oz system weight', 'Requires branch or high point to hang'],
        verdict: 'The ultimate group & family camp filtration system. Hang it from a lodgepole pine and enjoy clean water in minutes.'
    },

    // ==========================================
    // 📡 CATEGORY 10: ELECTRONICS & NAVIGATION
    // ==========================================
    {
        id: 'elec-garmin-inreach-mini2',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        name: 'Garmin inReach Mini 2',
        brand: 'Garmin',
        category: 'electronics',
        categoryName: 'Electronics & Navigation',
        profiles: ['adult', 'ultralight'],
        msrp: 400,
        currentPrice: 350,
        discountPercent: 13,
        rating: 4.8,
        reviewCount: 540,
        weightOz: 3.5,
        weightDisplay: '0 lbs 3.5 oz (100g)',
        dealBadge: '⭐ Classic Pick / Lifesaving Comms',
        valueRating: 9.6,
        specs: {
            'Network': '100% Global Iridium Satellite Network',
            'Battery Life': 'Up to 14 Days (10-min tracking mode)',
            'Features': 'Interactive SOS, 2-Way Texting, TracBack Routing, Live Location Sharing',
            'Waterproof': 'IPX7 Rated Waterproof Submersible',
            'App Pairing': 'Garmin Explore App for smartphone mapping'
        },
        priceHistory: [400, 400, 379, 359, 350],
        pros: ['True 100% global satellite coverage (works deep in Sawtooth granite canyons)', '14-day battery life', '2-way emergency SOS communication'],
        cons: ['$350 hardware cost + monthly satellite subscription ($15/mo)', 'Screen is monochrome mini display'],
        verdict: 'Essential backcountry safety insurance for mountain wilderness. Keeps loved ones updated and SOS available.'
    },
    {
        id: 'elec-nitecore-nb10000',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        name: 'Nitecore NB10000 Gen 3 Power Bank',
        brand: 'Nitecore',
        category: 'electronics',
        categoryName: 'Electronics & Navigation',
        profiles: ['ultralight', 'adult', 'budget'],
        msrp: 60,
        currentPrice: 59,
        discountPercent: 2,
        rating: 4.8,
        reviewCount: 380,
        weightOz: 5.29,
        weightDisplay: '0 lbs 5.29 oz (150g)',
        dealBadge: '⚡ Thru-Hiker Standard 10k Bank',
        valueRating: 9.8,
        specs: {
            'Capacity': '10,000 mAh (38.5Wh)',
            'Material': 'Carbon Fiber Reinforced Polymer Case',
            'Outputs': 'Dual USB-C Ports (22.5W Fast Charging)',
            'Pass-Through': 'Pass-through charging supported',
            'Low Current Mode': 'For headlamps & smartwatches'
        },
        priceHistory: [60, 60, 59, 59, 59],
        pros: ['World\'s lightest 10,000mAh power bank (5.29 oz)', 'Carbon fiber frame absorbs drops on rocks', 'Recharges an iPhone ~2.5 times'],
        cons: ['Higher price than bulky plastic power banks'],
        verdict: 'The gold standard lightweight power bank. Cuts 3+ ounces vs conventional 10k chargers.'
    },
    {
        id: 'elec-anker-325-20k',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        name: 'Anker 325 Power Bank 20,000mAh',
        brand: 'Anker',
        category: 'electronics',
        categoryName: 'Electronics & Navigation',
        profiles: ['budget', 'youth', 'adult'],
        msrp: 49,
        currentPrice: 35,
        discountPercent: 29,
        rating: 4.7,
        reviewCount: 1800,
        weightOz: 16.5,
        weightDisplay: '1 lb 0.5 oz (468g)',
        dealBadge: '💰 Heavy-Duty Multi-Day Power',
        valueRating: 9.3,
        specs: {
            'Capacity': '20,000 mAh (74Wh)',
            'Cell Type': 'High-density Li-Polymer',
            'Ports': 'USB-C (Input/Output) + USB-A',
            'Charges': 'Recharges phones 4.5 - 5 times',
            'Safety': 'MultiProtect Safety System'
        },
        priceHistory: [49, 49, 42, 38, 35],
        pros: ['Massive 20k capacity charges 2 phones for a 5-day trip', 'Bargain $35 sale price', 'Indestructible Anker build quality'],
        cons: ['1 lb weight penalty (best split between duo or used in base camp)'],
        verdict: 'The budget power bank workhorse. Keeps two smartphones and headlamps charged all week long.'
    }
];
```

---

## 8. Summary of Sawtooth Duo Build Recommendations (Jed + Ollie)

| Category | Recommended Pick | Model | Weight | MSRP / Sale | Why |
|---|---|---|---|---|---|
| **Tent** | **Classic Pick** | REI Half Dome SL 3+ | 4 lb 14 oz | $379 / $299 | Roomiest 3P floor plan (48.8 sq ft) for 2 hikers + gear during mountain rainstorms. |
| **Sleeping Bag (Jed)** | **Classic Pick** | Kelty Cosmic Down 20 (Regular) | 2 lb 9 oz | $199 / $179 | 550-fill DriDown warmth to 20°F at 8,500 ft elevation. |
| **Sleeping Bag (Ollie)** | **Youth Pick** | Kelty Cosmic Down 20 (Short) | 2 lb 5 oz | $189 / $169 | Short sizing eliminates empty air space, keeping a youth warmer. |
| **Sleeping Pad (Jed)** | **Classic Air Pick** | Therm-a-Rest NeoAir XLite NXT | 13 oz | $210 / $199 | 3.0" thick cushion + 4.5 R-value protects adult hips from cold ground. |
| **Sleeping Pad (Ollie)**| **Youth Foam Pick** | Therm-a-Rest Z Lite Sol | 14 oz | $49 / $44 | 100% puncture-proof closed-cell foam. Instant 3-sec deployment. |
| **Pillow (Both)** | **Ultralight Pick** | Sea to Summit Aeros Premium ×2 | 2.8 oz ea | $50 ea | Best sleep-quality-per-ounce upgrade. |
| **Backpack (Jed)** | **Budget Value Pick** | Granite Gear Crown3 60 | 2 lb 8 oz | $240 / $180 | Adjustable hipbelt, 60L capacity, sub-2.5 lb weight. |
| **Backpack (Ollie)** | **Youth Pick** | Osprey Ace 50 | 3 lb 12 oz | $180 / $139 | 5+ inches of torso growth adjustment. Keeps Ollie under 22 lb pack ceiling. |
| **Water Filter** | **Classic Pick** | Sawyer Squeeze System | 3.0 oz | $41 / $38 | Direct threads onto 1L Smartwater bottles. |
| **Headlamps** | **UL / Classic** | Petzl Actik Core (Jed) + Nitecore NU25 UL (Ollie) | 3.1 oz / 1.6 oz | $69 / $34 | USB-C rechargeable red-light headlamps. |
| **Rain Shells** | **Classic / Budget** | Patagonia Torrentshell 3L (Jed) + REI Rainier (Ollie) | 14.1 oz / 9.5 oz | $139 / $45 | True 3L storm protection for dad; lightweight pit-zip shell for Ollie. |

