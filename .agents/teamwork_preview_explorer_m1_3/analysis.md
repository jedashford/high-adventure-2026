# Interactive Filtering & Comparison Matrix Logic Analysis
**Target File:** `/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html`  
**Explorer:** Explorer 3 (Milestone 1)  
**Date:** July 24, 2026  

---

## 1. Executive Summary

An investigation of `/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html` was conducted to evaluate its current interactive JavaScript logic, filtering mechanisms, user profile controls, comparison table rendering, and side-by-side comparison capabilities. 

The current implementation serves as a visual, content-rich HTML document showcasing 8 categories of backpacking gear with markdown-derived tables and CSS styling. However, from a functional and interactive perspective, the application relies on lightweight, legacy ES5 JavaScript functions that exhibit major architectural limitations:

1. **No Data Model:** Gear data is entirely hardcoded in HTML `<table>` elements (878 total lines of HTML/CSS), preventing programmatic sorting, multi-criteria filtering, data aggregation, or dynamic comparison.
2. **Missing Side-by-Side Comparison Matrix:** There is **zero support** for selecting items across or within categories to generate a side-by-side spec comparison table or comparison drawer.
3. **Static User Profiles:** Header profile pills (`Adult Target: 5'10" | 230 lbs` and `Youth/Wife Target: 5'1" | 105 lbs`) are unclickable HTML spans without event listeners or filter associations.
4. **Flawed Filter Logic:** `filterTables()` performs raw string matching across all table rows in the DOM (including hidden tabs), pollutes the global JavaScript namespace via an unvariabled loop index `h`, and lacks empty-state UI feedback.
5. **Lack of Sorting & Advanced Controls:** Users cannot sort columns (e.g., by weight, price, rating, discount %), nor can they filter by price range, weight limit, rating, or deal status.

---

## 2. Detailed Component Analysis

### 2.1 Filtering Components & Search Logic
- **Location:** Lines 271-274 (HTML Input) and Lines 848-875 (JavaScript Function `filterTables()`).
- **Code:**
  ```javascript
  function filterTables() {
      var input, filter, tables, tr, td, i, j, txtValue;
      input = document.getElementById("gearSearch");
      filter = input.value.toUpperCase();
      tables = document.getElementsByTagName("table");

      for (h = 0; h < tables.length; h++) {
          tr = tables[h].getElementsByTagName("tr");
          for (i = 1; i < tr.length; i++) {
              var showRow = false;
              td = tr[i].getElementsByTagName("td");
              for (j = 0; j < td.length; j++) {
                  if (td[j]) {
                      txtValue = td[j].textContent || td[j].innerText;
                      if (txtValue.toUpperCase().indexOf(filter) > -1) {
                          showRow = true;
                          break;
                      }
                  }
              }
              if (showRow) {
                  tr[i].style.display = "";
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
  }
  ```
- **Operational Mechanism:**
  - `filterTables()` is bound via an inline `onkeyup="filterTables()"` event handler on `<input id="gearSearch">`.
  - It loops through every `<table>` in the document (8 tables across all tabs, active and hidden).
  - For each table row `tr[i]`, it converts all combined `td` text content to uppercase and tests if `indexOf(filter) > -1`.
  - If a match is found, `tr[i].style.display` is reset to `""` (visible); otherwise set to `"none"`.

### 2.2 Category Selection & Tab Navigation Logic
- **Location:** Lines 280-287 (HTML Buttons) and Lines 834-846 (JavaScript Function `openTab()`).
- **Code:**
  ```javascript
  function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tab-content");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].classList.remove("active");
      }
      tablinks = document.getElementsByClassName("tab-btn");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
  }
  ```
- **Operational Mechanism:**
  - Tab buttons use inline `onclick="openTab(event, 'tab_id')"` attributes.
  - Switches visibility by cycling through `.tab-content` elements to remove `.active`, cycling through `.tab-btn` elements to remove `.active`, and adding `.active` to the targeted tab ID and button.
  - **State Disconnect:** Tab switching is completely independent of search state. Switching tabs does not re-evaluate search filters, nor does it update tab badge counts (e.g. showing "⛺ Tents (3)").

### 2.3 User Profile Selection
- **Location:** Lines 263-266.
- **Code:**
  ```html
  <div class="user-profiles">
      <span class="profile-pill adult">Adult Target: 5'10" | 230 lbs (Needs Wide/Long/High-Support)</span>
      <span class="profile-pill youth">Youth/Wife Target: 5'1" | 105 lbs (Needs Petite/Short/Ultralight)</span>
  </div>
  ```
- **Operational Mechanism:**
  - Purely static presentation elements styled with CSS classes `.profile-pill.adult` and `.profile-pill.youth`.
  - **Gap:** Clicking these pills produces no action. They cannot be toggled to isolate gear tailored for the adult profile vs. youth/wife profile.

### 2.4 Comparison Table Rendering & Schema Variation
- **Location:** Lines 288-829.
- **Structure:** 8 individual `<table>` elements wrapped in `.table-wrapper` divs.
- **Column Schema Inconsistency:**
  - **Tents (Tab 1):** Model & Brand | Cap. | Trail / Packed Weight | Floor Area | MSRP / Sale Price | Rating | Key Features & Value Verdict
  - **Sleeping Bags (Tab 2):** Model | Fit Target | Insulation & Temp | Weight | Shoulder Girth | MSRP / Sale Price | Key Advantage
  - **Sleeping Pads (Tab 3):** Model | Fit Target | Thickness | R-Value | Weight | MSRP / Sale Price | Support Type
  - **Trekking Poles (Tab 4):** Model | Material | Target User | Weight / Pair | Adjustability | Price Range | Verdict
  - **Camp Chairs (Tab 5):** Model | Weight | Weight Cap. | Packed Size | MSRP / Sale Price | Best For
  - **Kitchen & Cookware (Tab 6):** Item | Category | Weight | Price | Why You Need It
  - **Headlamps & Lights (Tab 7):** Model | Lumens | Weight | Power Source | Price | Key Features
  - **Backpacks & Essentials (Tab 8):** Backpack Model | Fit Target | Volume | Weight | Torso / Belt Fit | Price Range
- **Formatting:** Prices use HTML tags (`<span class="price-original">`, `<span class="price-sale">`, `<span class="discount-tag">`), while ratings use emoji string representations (`⭐ 4.7/5`).

### 2.5 Direct Side-by-Side Comparison Metrics
- **Current Status:** **NON-EXISTENT**.
- **Deficiencies:**
  - No item selection mechanism (e.g. compare checkbox, toggle switch, or action button per row).
  - No comparison state store to track selected items across tabs.
  - No sticky comparison bar/drawer at the bottom of the viewport.
  - No modal or view layout displaying items side-by-side with spec attribute rows (e.g., Weight, Price, R-Value, Dimensions, Capacity, Rating).

### 2.6 Top Picks & Deal Highlighting
- **Location:** Embedded in `<td>` elements across all tables.
- **Badges:**
  - `<span class="badge badge-both">Top Sweet Spot</span>`
  - `<span class="badge badge-deal">Deepest Discount</span>`
  - `<span class="badge badge-both">Gold Standard</span>`
  - `<span class="badge badge-adult">Adult 230lb</span>`
  - `<span class="badge badge-youth">Youth/Wife 5'1"</span>`
- **Gap:** These highlights are hardcoded inline elements. There is no filter button or view toggle to "Filter by Top Picks" or "Filter by Deep Discount (>30%)".

---

## 3. Critical Logic Gaps, Bug Vulnerabilities, & UX Deficiencies

| Defect / Deficiencies | File Location | Root Cause & Risk Impact |
|---|---|---|
| **Global Scope Pollution (`h` variable)** | Line 854 | In `filterTables()`, `for (h = 0; h < tables.length; h++)` omits `var`, `let`, or `const`. This assigns `h` to the global `window.h` object, leading to potential variable collisions or strict-mode (`"use strict"`) runtime exceptions. |
| **No JavaScript Data Model** | Lines 288–829 | Gear information is hardcoded in HTML markup. Data cannot be programmatically sorted, parsed for numeric weight/price range filtering, or reformatted into alternative views (e.g., matrix comparison view). |
| **Search Filter Matches Raw HTML & Markup** | Lines 861–863 | `txtValue = td[j].textContent || td[j].innerText`. Searching text parses everything inside table cells, including badge text, price dollar signs, and formatting text. Searching "OFF" matches every sale item because of `(25% OFF)`. |
| **No Debouncing on Search Input** | Line 272 | `onkeyup="filterTables()"` fires on every single keydown/keyup event, causing un-debounced DOM traversal and layout recalculation across all 8 tables. |
| **Profile Pills are Non-Interactive** | Lines 263–266 | Users expecting to filter by "Adult" vs "Youth/Wife" targets receive no feedback upon clicking profile pills. |
| **No Empty State Feedback** | Lines 848–875 | When search query returns 0 matches in an active tab, an empty table header remains displayed without a friendly "No matching gear items found" message or search reset button. |
| **Lack of Column Sorting** | Table headers (all tabs) | Table `<th>` elements are static text labels. Clicking header titles does not trigger sorting by price, weight, rating, or brand name. |
| **No Deep Linking / History State** | Lines 834–846 | Active tab state is lost on page reload because state is not reflected in URL hash (e.g., `#tents`, `#bags`) or `URLSearchParams`. |

---

## 4. Side-by-Side Comparison Matrix Requirements & Technical Architecture

To upgrade `gemini-code-1784928132429.html` into a fully functional interactive comparison matrix, the following functional and technical components must be implemented:

```
+-----------------------------------------------------------------------------------+
| CENTRAL REACTIVE STATE STORE                                                      |
| { activeCategory, searchFilter, profileFilter, dealFilter, compareList: [] }       |
+-----------------------------------------------------------------------------------+
                                         |
    +------------------------------------+------------------------------------+
    |                                    |                                    |
    v                                    v                                    v
+-----------------------+    +-----------------------+    +-----------------------+
| CATEGORY TABS &       |    | FILTERED GEAR TABLE   |    | FLOATING COMPARE BAR  |
| MULTI-CRITERIA BAR    |    | (With Checkboxes &    |    | (Selected items counter|
| (Search, Profile,     |    |  Sortable Headers)    |    |  & "Compare Now" btn) |
|  Deals, Price, Weight)|    +-----------------------+    +-----------------------+
+-----------------------+                |                            |
                                         +----------------------------+
                                                      |
                                                      v
                                        +---------------------------+
                                        | SIDE-BY-SIDE MATRIX MODAL |
                                        | - Items as Columns        |
                                        | - Normalized Specs as Rows|
                                        | - Spec Diff Highlighting  |
                                        +---------------------------+
```

### 4.1 Data Model Standardization Schema
Extract all table rows into a structured JavaScript array of objects (`GEAR_DATA`):

```javascript
interface GearItem {
  id: string;                  // Unique identifier, e.g. "tent-ba-crag-lake-sl3"
  category: string;            // "tents", "bags", "pads", "poles", "chairs", "kitchen", "lighting", "packs"
  name: string;                // "Crag Lake SL3"
  brand: string;               // "Big Agnes"
  fitTarget: "adult" | "youth" | "both"; // Target user profile
  capacity?: string;           // "3P", "65L", "400 Lumens", etc.
  weightOz: number;            // Normalized total packed weight in ounces
  weightFormatted: string;     // Display string e.g. "4 lbs 12 oz"
  msrp: number;                // 399.95
  salePrice: number;           // 299.00
  discountPct: number;         // 25
  rating: number;              // 4.7
  badges: string[];            // ["Top Sweet Spot", "Adult 230lb"]
  keyFeatures: string;         // Feature description string
  specs: Record<string, string | number>; // Category-specific specs (Floor Area, R-Value, Girth, Lumens, etc.)
}
```

### 4.2 Interactive Selection & Comparison Drawer
- **Item Selection:** Add a checkbox `<input type="checkbox" class="compare-checkbox" data-id="item-id">` to every table row.
- **Maximum Limit:** Limit selection to **4 items** concurrently for optimal side-by-side layout readability.
- **Floating Comparison Drawer:**
  - Fixed positioning at bottom of screen (`position: fixed; bottom: 0; left: 0; right: 0;`).
  - Appears when `compareList.length > 0`.
  - Displays selected item chips/badges, a clear button, and a prominent **"Compare Items (N/4)"** CTA button.

### 4.3 Side-by-Side Comparison Matrix View Modal
When the user clicks "Compare Items", launch a dedicated modal/view rendering a side-by-side comparison matrix:

| Metric / Spec | Item 1 (Big Agnes Crag Lake) | Item 2 (Marmot Limelight 3P) | Item 3 (Sierra Designs Meteor Lite) |
|---|---|---|---|
| **Fit Target** | Both | Both | Both |
| **Sale Price** | **$299.00** *(25% OFF)* | **$189.95** *(52% OFF)* ⭐ Best Price | **$299.95** *(28% OFF)* |
| **Packed Weight** | 4 lbs 12 oz (76 oz) | 5 lbs 15 oz (95 oz) | **4 lbs 2 oz (66 oz)** ⭐ Lightest |
| **Floor Area** | 38.5 sq ft | 40.9 sq ft | 40.8 sq ft |
| **Rating** | ⭐ 4.7 / 5 | ⭐ 4.7 / 5 | ⭐ 4.6 / 5 |
| **Key Advantage** | Recycled Robic nylon | Vertical walls, footprint included | Roll-back stargazing rainfly |
| **Actions** | `[Remove]` | `[Remove]` | `[Remove]` |

- **Spec Difference Highlighting:** Include a toggle switch `[ ] Highlight Differences` to shade rows where spec values differ across compared items.
- **Best Spec Badges:** Automatically compute and highlight the lowest weight, lowest price, or highest R-value/rating per spec row with a visual star badge.

---

## 5. Recommended Refactoring Roadmap

1. **Refactor HTML to JS Data Array (`gear-data.js`):**
   Convert static HTML rows into a structured JSON/JS data file containing all 45+ gear items with normalized attributes (price numbers, weight in ounces, ratings, badges).
2. **Implement Reactive State Manager (`app-state.js`):**
   Manage active tab, search query, profile filters (Adult / Youth / All), deal filter (All / Deals Only), sort column (`price`, `weight`, `rating`), sort direction (`asc`, `desc`), and `compareList` array.
3. **Build Dynamic Table Renderer (`table-renderer.js`):**
   Render table headers with click-to-sort controls (`th.sortable`), render row checkboxes, style rows dynamically based on selected state, and display empty state UI when zero items match active filters.
4. **Implement Interactive Profile Filters:**
   Make header profile pills clickable toggle buttons (`.profile-pill.active`) bound to the state manager.
5. **Build Floating Compare Drawer & Side-by-Side Matrix Modal (`comparison-matrix.js`):**
   Render floating bar on checkbox toggle; render side-by-side spec comparison table in modal overlay with difference highlighting and item removal.

---
*Report compiled by Explorer 3 (Milestone 1).*
