# Data Model & Multi-Category Analysis for High-Adventure Gear Hub

**Author:** Explorer 2  
**Milestone:** Milestone 1 — Exploration & Analysis  
**Date:** July 24, 2026  
**Target Application:** `/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html`  
**Reference Notes:** `/Users/jed/jedstuff/high-adventure/notes/family-gear-comparison.md`  

---

## Executive Summary

An in-depth analysis of `gemini-code-1784928132429.html` was conducted to evaluate the current JS data structure, product category coverage, user profile support, spec field completeness, and data requirements for **Requirement R2 (Multi-Category Deal Research & Market Monitoring)**.

### Key Discoveries:
1. **Zero JS Data Model:** Products are currently hardcoded inside static HTML `<table>` elements across 8 category `<div>`s. There are no JavaScript arrays or objects storing product data.
2. **Missing Product Categories:** Electronics/Navigation and Apparel are **completely missing** as dedicated categories. Basic headlamps are in `#lighting`, but no GPS communicators, solar/power banks, or apparel items exist.
3. **Incomplete User Profile Coverage:** The HTML header defines Adult and Youth profile pills, but there are **no structured filters or tags** for **Ultralight** or **Budget** profiles in the dataset or UI.
4. **Missing Price Tracking & Market Monitoring Data:** There is no price history array, price trend tracking, calculated value rating, or dynamic discount engine in the codebase.

---

## 1. Audit of Existing Application (`gemini-code-1784928132429.html`)

### 1.1 UI & DOM Architecture
- **Single-File Standalone HTML:** 878 lines of combined HTML, CSS3, and inline JavaScript.
- **Header Profile Badges (lines 263–266):** Static pills describing Adult (5'10", 230 lbs) and Youth/Wife (5'1", 105 lbs) targets.
- **Tabs (lines 281–286):** 8 tabs (`#tents`, `#bags`, `#pads`, `#poles`, `#chairs`, `#kitchen`, `#lighting`, `#packs`).
- **Tables (lines 288–830):** HTML `<table>` elements per tab with inconsistent headers across categories.

### 1.2 Existing JavaScript Logic (lines 833–876)
The `<script>` block contains only two basic DOM manipulation functions:
```javascript
function openTab(evt, tabName) { ... } // Toggles CSS 'active' class on tab buttons and contents
function filterTables() { ... }       // Performs basic case-insensitive substring search on <td> textContent
```

#### Codebase Gaps:
- **No Data State:** No JS array, object, or JSON representation of products.
- **No Programmatic Filtering:** Cannot filter by profile (`Adult`, `Youth`, `Ultralight`, `Budget`), price range, weight, discount %, or rating.
- **No Dynamic Table / Card Rendering:** Tables cannot be sorted, re-ordered, or dynamically filtered.
- **No Charting / Visualizations:** Price history trends and spec comparisons cannot be graphed.

---

## 2. Category Coverage Analysis

### 2.1 Standard Required Categories vs. Current HTML State

| Required Category | HTML Tab | Current Status | Items Count | Gap Analysis & Missing Gear |
|---|---|---|---|---|
| **Tents** | `#tents` | Partial | 6 items | Focuses on 3P tents. Lacks 2P / 4P options and Durston/Naturehike alternatives from notes. |
| **Sleeping Bags** | `#bags` | Partial | 6 items | Covers 20°F down/synthetic bags. Good fit notes for 230lb/5'1", but lacks quilt & 15°F options. |
| **Backpacks** | `#packs` | Severe Gap | 3 items (+ 1 FAK) | Only 3 packs (Atmos 65, Crown3 60, Ace 50, Kyte 48). Lacks ultralight frameless/semi-framed packs. |
| **Stoves & Cooking** | `#kitchen` | Partial | 7 items | Contains 2 stoves (SOTO Amicus, BRS 3000T), pots, spork, and filters (Sawyer/Platypus). Needs categorization cleanup. |
| **Electronics & Nav** | `#lighting` | **MISSING CATEGORY** | 4 items (lights only) | Missing GPS communicators (Garmin inReach Mini 2), power banks (Anker 10k/20k), solar panels, GPS watches. |
| **Apparel** | None | **MISSING CATEGORY** | 0 items | Completely missing! Needs rain shells, down puffies, merino base layers, camp shoes/Crocs, hiking pants. |

### 2.2 Extra / Non-Standard Categories in Current HTML
- `#pads` (5 items: Ether Light XT, Rapide SL, Tensor, Trail Lite, Klymit Static V)
- `#poles` (4 items: Cascade Mountain Tech, BD Trail Pro Shock, BD First Strike, LEKI FX Carbon)
- `#chairs` (4 items: NEMO Moonlite, Helinox Chair Zero, REI Flexlite, Cascade Mountain Tech)

*Recommendation:* Retain `pads`, `poles`, and `chairs` either as sub-categories or dedicated gear modules under a normalized multi-category system.

---

## 3. User Profile Coverage Analysis

The PRD and prompt mandate coverage across 4 core user profiles:

| Profile | Profile Description | Current Coverage in HTML | Recommended Data Attributes & Schema Requirements |
|---|---|---|---|
| **Adult** | 5'10", 230 lbs (Needs Wide/Long/High-Support, 64"+ shoulder girth, 3.5"+ pad thickness, 250lb+ chair capacity) | Represented via `.badge-adult` in tables and header pill. | Profile tag: `'adult'`. Require girth, torso range, and weight capacity specs. |
| **Youth** | 5'1", 105 lbs (Needs Petite/Short, 13"-16" torso, lightweight, short sleeping bag to eliminate dead air) | Represented via `.badge-youth` in tables and header pill. | Profile tag: `'youth'`. Require max user height, pack torso range, and packed length specs. |
| **Ultralight** | Target sub-3lb tents, sub-1lb packs, minimal weight per item, titanium cookset, compact gear | Mentioned in table badge text ("Ultralight King"), but **no profile filter** exists. | Profile tag: `'ultralight'`. Add weight threshold flags (e.g. `isUltralight: true`) and sort by weight/oz. |
| **Budget** | Focus on highest discount, sub-$150 tents, sub-$100 bags, high value-per-dollar gear | Mentioned in table badge text ("Budget Pick"), but **no profile filter** exists. | Profile tag: `'budget'`. Add `valueRating` metric and `priceTier: 'budget'`. |

---

## 4. Requirement R2 & Market Research / Deal Integration Analysis

Requirement R2 requires automated deal research data integration, price tracking, discount percentages, deal badges, value ratings, and profile top picks.

### 4.1 Required Product Data Schema (JS Object Format)

To support rich dynamic filtering, price history charts, deal badges, and side-by-side comparisons, we recommend structuring products into a JS array `PRODUCTS`:

```javascript
/**
 * @typedef {Object} PricePoint
 * @property {string} date - ISO date string (YYYY-MM-DD)
 * @property {number} price - Historical price USD
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier (e.g., "tent-ba-crag-3")
 * @property {string} name - Product model name
 * @property {string} brand - Brand manufacturer
 * @property {string} category - Category ('tents'|'sleeping_bags'|'backpacks'|'stoves'|'electronics'|'apparel'|'pads'|'poles'|'chairs')
 * @property {string[]} profiles - Profiles supported (['adult', 'youth', 'ultralight', 'budget'])
 * @property {number} msrp - Original manufacturer retail price
 * @property {number} currentPrice - Current market / deal price
 * @property {number} discountPercent - Calculated ((msrp - currentPrice) / msrp) * 100
 * @property {number} rating - User rating out of 5 (e.g. 4.7)
 * @property {number} reviewCount - Number of verified reviews
 * @property {number} weightOz - Weight in total ounces for numeric sorting
 * @property {string} weightDisplay - Human readable weight string ("4 lbs 4 oz")
 * @property {string} dealBadge - Highlight badge ("Top Sweet Spot", "Deepest Discount", "Gold Standard", etc.)
 * @property {number} valueRating - Calculated value score (1.0 to 10.0)
 * @property {boolean} isTopPick - Whether this is a top pick for its primary profile
 * @property {Object.<string, string|number|boolean>} specs - Category-specific technical key-value pairs
 * @property {PricePoint[]} priceHistory - Historical price trend data points
 * @property {string[]} pros - Key advantages
 * @property {string[]} cons - Key limitations
 * @property {string} verdict - Expert summary recommendation
 */
```

### 4.2 Category-Specific Spec Fields Table

| Category | Key Spec Fields Needed | Example Values |
|---|---|---|
| **Tents** | `capacity`, `floorAreaSqFt`, `packedWeightOz`, `freestanding`, `peakHeightIn`, `doors`, `shortPoles` | `capacity: "3P"`, `floorAreaSqFt: 48.75`, `freestanding: true`, `shortPoles: true` |
| **Sleeping Bags** | `tempRatingF`, `insulation`, `shoulderGirthIn`, `fitLength`, `packedVolumeL`, `shape` | `tempRatingF: 20`, `insulation: "650-Fill Down"`, `shoulderGirthIn: 65`, `shape: "Spoon"` |
| **Backpacks** | `volumeL`, `torsoFitIn`, `maxLoadLbs`, `weightOz`, `frameType`, `genderFit` | `volumeL: 65`, `torsoFitIn: "18-21"`, `maxLoadLbs: 45`, `frameType: "Internal Frame"` |
| **Stoves & Cooking** | `stoveType`, `boilTime1L`, `fuelType`, `weightOz`, `autoIgnition`, `nestingCap` | `stoveType: "Canister"`, `boilTime1L: "3.5 min"`, `autoIgnition: true` |
| **Electronics & Nav** | `batteryLife`, `waterproofRating`, `satelliteMessaging`, `powerOutput`, `weightOz` | `satelliteMessaging: true`, `batteryLife: "14 days"`, `waterproofRating: "IPX7"` |
| **Apparel** | `apparelType`, `material`, `waterproofRating`, `breathability`, `weightOz`, `packable` | `apparelType: "Rain Jacket"`, `waterproofRating: "20,000 mm"`, `weightOz: 6.3` |

### 4.3 Deal Badges & Discount Percentage System
- **Discount Percentage Formula:** `discountPercent = Math.round(((msrp - currentPrice) / msrp) * 100)`
- **Dynamic Badge Classification Rules:**
  - `discountPercent >= 40`: 🏷️ `Deepest Discount` / `Clearance Steal`
  - `discountPercent >= 20`: 🔥 `Great Deal`
  - `profiles.includes('ultralight') && weightOz <= threshold`: 🪶 `Ultralight Pick`
  - `valueRating >= 9.0`: 🏆 `Top Value Sweet Spot`

### 4.4 Price History & Trend Data Structure
Each product will feature a 6-month historical price log:
```javascript
priceHistory: [
    { date: "2026-02-01", price: 399.95 },
    { date: "2026-04-01", price: 379.00 },
    { date: "2026-06-01", price: 349.00 },
    { date: "2026-07-24", price: 299.00 }
]
```
- **Price Indicators:**
  - `Lowest Price in 90 Days` (if `currentPrice === min(priceHistory)`)
  - `Price Stability Index`

### 4.5 Value Rating Algorithm
To calculate an objective **Value Rating (1.0 to 10.0)**:
$$\text{Value Rating} = (\text{Rating} \times 1.2) + \left(\frac{\text{Discount \%}}{10} \times 0.4\right) + \left(\frac{\text{Value Metric Score}}{2}\right)$$
This ensures products with high user satisfaction, deep discounts, and strong specs receive top value ratings.

---

## 5. Recommendations for Implementation (Milestone 2)

1. **Refactor HTML Data to JavaScript Module / Array:**
   - Construct a unified `const PRODUCTS = [...]` dataset in `<script>`.
   - Add data items from `notes/family-gear-comparison.md` (e.g. REI Half Dome SL 3+, Kelty Cosmic Down 20, Therm-a-Rest Z Lite Sol, Garmin inReach Mini 2, Outdoor Research Helium Rain Jacket).
2. **Expand Product Categories:**
   - Add dedicated tabs & data for `Electronics & Navigation` and `Apparel`.
3. **Implement Profile Filter Controls:**
   - Add interactive filter pills/buttons for `Adult`, `Youth`, `Ultralight`, `Budget`, and `All Profiles`.
4. **Implement Interactive Features:**
   - Multi-column sort (Price, Weight, Rating, Discount %, Value Rating).
   - Side-by-side comparison drawer/modal for selected items.
   - Inline SVG sparkline charts for `priceHistory`.
