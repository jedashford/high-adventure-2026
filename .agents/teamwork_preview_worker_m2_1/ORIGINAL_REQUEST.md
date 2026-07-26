## 2026-07-24T18:20:30Z
<USER_REQUEST>
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You are teamwork_preview_worker_m2_1.
Your working directory is /Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_worker_m2_1.
Create your working directory and briefing/progress files in your working directory.

Scope & Mission:
Update the High Adventure gear web application at `/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html` (and associated files such as `index.html` / `styles.css` / JS modules if applicable).

Key Deliverables:
1. **Backpackers.com Data & Gear Category Expansion (R1)**:
   - Expand the product dataset to cover all 9 major categories:
     - Tents
     - Sleeping Bags
     - Sleeping Pads
     - Backpacks
     - Stoves & Cooking
     - Footwear
     - Rain Shells
     - Lighting & Headlamps
     - Water Filtration
   - Provide structured 3-pick standards (Classic Pick / Best Overall, Budget Pick, Premium Pick) plus Ultralight Pick and Youth Pick badges for products in each category.
   - For every product, include: id, name, category, pickType, price, salePrice, weight, dimensions, specs, rating (e.g. ⭐ 4.8/5), structured pros (array), structured cons (array), buying advice, price history array (for SVG sparkline rendering), and profile tags (`["youth", "adult", "value", "ultralight"]`).

2. **Youth Sleeping Pad Expansion (5'1" - 5'4") (R2)**:
   - Include targeted sleeping pad picks specifically designed or optimal for youth/child (5'1"–5'4"):
     - REI Co-op Helix Insulated Air Pad (3.25" thick, 25" wide, 17 oz, R4.9, $129 MSRP) - Classic Pick / Best Value Air
     - Big Agnes Rapide SL Insulated (3.5" thick [4" rails], 25" wide, 19-21 oz, R4.8, $149 MSRP) - Plush Side-Sleeper Pick
     - Klymit Insulated Static V Wide (3.0" thick, 25" wide, 25 oz, R4.4, $80 MSRP) - Budget Wide Pick
     - Exped Ultra 3R / 5R Medium Wide (3.0" thick, 25" wide, 18-20 oz, R3.0-4.8, $130-$160 MSRP) - Ergonomic Pick
     - Therm-a-Rest NeoAir Topo / XLite NXT RW (3.0" thick, 25" wide, 16-19 oz, R3.7-4.5, $140-$210 MSRP) - Ultralight Pick
     - Therm-a-Rest Z Lite Sol Short / Regular (0.75" thick, 20" wide, 10-14 oz, R2.6, $45-$55 MSRP) - Foam Reference Pick
   - Add explicit spec tags: `Thickness: 3.25"`, `Width: 25"`, `Height Fit: 5'1"–5'4" (Youth)`, `R-Value`, `Weight`.

3. **High Adventure Site Integration & UI Enhancements (R3 & R4)**:
   - High-Contrast Dark Theme meeting WCAG 2.1 AA (ensure contrast ratio >= 4.5:1 for `.badge-adult`, `.badge-youth`, `.badge-both`, `.discount-tag`).
   - Interactive Profile Filter Chips/Buttons: "All Gear", "Adult (230 lb)", "Youth / Child (5'1"-5'4")", "Ultralight", "Budget Value". Clicking profile tags filters products dynamically.
   - Interactive Category Navigation Tabs across all categories.
   - Real-time text search with match counts and clear search button.
   - Inline SVG Price History Sparklines for products showing price trends and discount badges.
   - Side-by-side Specs Comparison Drawer/Matrix modal with checkboxes to compare products across `Thickness (in)`, `Width (in)`, `Height Fit`, `R-Value`, `Weight`, `Price`, and `Rating`.
   - Responsive layout: clean table view for desktop and responsive grid/card layout for mobile screens (`<= 768px`).

4. **Testing & Verification**:
   - Run node syntax checks or Playwright tests to ensure zero JS console errors or broken syntax.
   - Verify that `gemini-code-1784928132429.html` loads cleanly.
</USER_REQUEST>
