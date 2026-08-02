# Peak Refuel — Verified Meal Dataset

**Verified:** 2026-08-01
**Source:** peakrefuel.com product pages (manufacturer's own site) — every figure below was read
from the actual page, not from search snippets or AI summaries.

## How this was verified

1. **Catalog enumeration:** Fetched `https://peakrefuel.com/products.json` (the store's own
   Shopify catalog endpoint, 37 published products — under the 250/page limit, so complete) and
   `https://peakrefuel.com/collections.json` plus the published `breakfast`, `lunch-dinner`,
   `desserts`, `drinks`, and `meals` collection feeds to use Peak Refuel's *own* categorization.
2. **Per-product page reads:** Downloaded each of the 25 meal/dessert product pages
   (raw HTML via curl) and extracted:
   - The spec list Peak Refuel prints in every product description
     (`Protein – Xg per pouch / Servings – 2 / Serving size – ½ pouch / Contains – … /
     Net Weight – X oz / Calories per Pouch – X / Prep Time – X`).
   - The on-page stats panel (`ProductStats`), which displays **per-pouch** protein and
     calories plus prep time and servings.
   - The Loox review widget attributes rendered into the product header
     (`data-rating`, `data-raters`) — this is the star rating / review count the page displays.
   - The embedded Shopify product JSON for price, compare-at price (sale detection), and
     availability.
3. **Cross-validation:** Two pages (Breakfast Skillet, Beef Stroganoff) were independently
   re-read with a second fetch tool; all figures matched the parsed data.
4. **Plausibility check:** Calories-per-gram computed from each page's own net weight and
   per-pouch calories runs 4.1–6.2 cal/g across all 25 products — physically plausible for
   freeze-dried food. If the pages' calorie figures were per *serving* instead of per pouch,
   several meals would exceed 9 cal/g (denser than pure fat), which is impossible. The
   per-pouch labeling is therefore internally consistent.
5. Raw scrape evidence archived alongside this file:
   `peak-refuel-raw-scrape-2026-08-01.json`.

**Key facts that apply to every product below:**

- **Every pouch is 2 servings, serving size ½ pouch** — stated identically on all 25 pages.
- **Peak Refuel's headline numbers are per POUCH**, not per serving (opposite of many
  competitors). Per-serving columns below are computed (÷ 2) and marked as such.
- No product was on sale on 2026-08-01 (no compare-at price shown); prices are regular prices.
- Prep is boiling water added to the pouch for everything except the two granolas
  (**cold** water) and the three "Bites" desserts (ready to eat, "Rip and Pop" — no water).

## Master table

Per-pouch figures are as displayed on each page. Per-serving figures are **computed** (pouch ÷ 2,
since every serving size is ½ pouch). Ratings/review counts are as shown on peakrefuel.com
(Loox widget) on 2026-08-01.

| Meal | Category (site's) | Price | Servings | Cal/pouch (page) | Cal/serving (computed) | Protein/pouch (page) | Protein/serving (computed) | Net wt | Rating | Reviews | Water needed (page) | Prep time | Allergens ("Contains") / dietary flags |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Breakfast Skillet | Breakfast | $14.99 | 2 | 540 | 270 | 31 g | 15.5 g | 3.88 oz | 4.6 | 201 | 1 cup (8 oz) boiling | 15 min (spec list); stats panel says 10 min | Eggs |
| Biscuits & Sausage Gravy | Breakfast | $14.99 | 2 | 1,100 | 550 | 34 g | 17 g | 6.77 oz | 4.6 | 304 | 1⅓ cups (10.5 oz) boiling | 10 min | Milk, Wheat |
| Strawberry Granola | Breakfast | $7.99 | 2 | 530 | 265 | 23 g | 11.5 g | 4.59 oz | 4.8 | 101 | 1 cup (8 oz) **cold** | 5 min | Milk, Soy |
| Mountain Berry Granola | Breakfast | $8.99 | 2 | 570 | 285 | 13 g | 6.5 g | 5.07 oz | 4.9 | 68 | 1 cup (8 oz) **cold** | 5 min | Soy; **Vegan** |
| Creamy Peaches and Oats | Meals (breakfast-style; not in site's Breakfast collection) | $12.99 | 2 | 1,010 | 505 | 30 g | 15 g | 7.05 oz | 4.6 | 89 | 1⅓ cup (10.66 oz) boiling | 10 min | Milk |
| Chicken Alfredo | Lunch/Dinner | $13.99 | 2 | 870 | 435 | 53 g | 26.5 g | 4.97 oz | 4.9 | 206 | ¾ cup (6 oz) boiling | 10 min | Milk, Wheat |
| Beef Pasta Marinara | Lunch/Dinner | $14.99 | 2 | 1,040 | 520 | 49 g | 24.5 g | 6.34 oz | 4.8 | 128 | ¾ cup (6 oz) boiling (prep instructions; marketing copy says "1 cup") | 10 min | Milk, Wheat |
| Beef Stroganoff | Lunch/Dinner | $14.99 | 2 | 810 | 405 | 41 g | 20.5 g | 5.00 oz | 4.7 | 214 | 1¼ cup (10 oz) boiling | 10 min | Milk, Wheat |
| Chicken Pesto Pasta | Lunch/Dinner | $14.99 | 2 | 920 | 460 | 43 g | 21.5 g | 5.71 oz | 4.6 | 130 | "2/3 cups of water" (marketing copy; no oz figure on page) | 10 min | Milk, Wheat |
| Chicken Teriyaki Rice | Lunch/Dinner | $13.99 | 2 | 580 | 290 | 40 g | 20 g | 4.66 oz | 4.4 | 120 | 1⅓ cups (10.5 oz) boiling | 10 min | Soy |
| Homestyle Chicken & Rice | Lunch/Dinner | $13.99 | 2 | 740 | 370 | 40 g | 20 g | 5.15 oz | 4.5 | 126 | 1 cup (8 oz) boiling | 10 min | Milk, Wheat; CA Prop 65 warning on page |
| Sweet Pork & Rice | Lunch/Dinner | $13.99 | 2 | 800 | 400 | 40 g | 20 g | 6.07 oz | 4.7 | 137 | unverified (no water amount stated on page) | 10 min | none listed on page |
| Chicken Coconut Curry | Lunch/Dinner | $14.99 | 2 | 850 | 425 | 44 g | 22 g | 5.36 oz | 4.8 | 149 | 1⅓ cups (10.5 oz) boiling | 10 min | Tree Nut (Coconut) |
| Three Bean Chili Mac | Lunch/Dinner | $13.99 | 2 | 610 | 305 | 30 g | 15 g | 4.79 oz | 4.3 | 45 | 1⅓ cups (10.5 oz) boiling | 10 min | Wheat; **Vegan** |
| Butternut Dal Bhat | Lunch/Dinner | $13.99 | 2 | 870 | 435 | 23 g | 11.5 g | 5.85 oz | 4.8 | 68 | 1⅓ cups (10.5 oz) boiling | 10 min | Soy, Tree Nut (coconut); **Vegan**; CA Prop 65 warning on page |
| White Chicken Chili | Meals (signature-style) | $14.99 | 2 | 760 | 380 | 41 g | 20.5 g | 4.94 oz | 4.6 | 68 | 1 cup (8 oz) boiling | 10 min | Milk, Wheat |
| Venison Country Casserole | Meals (signature/game) | $15.99 | 2 | 920 | 460 | 40 g | 20 g | 6.20 oz | 4.7 | 78 | 1 cup (8 oz) boiling | 10 min | Milk, Wheat |
| Backcountry Bison Bowl | Meals (signature/game) | $15.99 | 2 | 930 | 465 | 42 g | 21 g | 7.05 oz | 4.5 | 92 | 1¾ cups (14 oz) boiling | 10 min | Milk, Wheat; **SOLD OUT** on 2026-08-01 |
| MeatEater American Buffalo Goulash | Meals (signature/game) | $15.99 | 2 | 740 | 370 | 45 g | 22.5 g | 4.94 oz | 4.6 | 43 | 1 cup (8 oz) boiling | 10 min | Milk, Wheat |
| Bison Ranch Mashers | Meals (signature/game, mashed-potato entrée) | $15.99 | 2 | 1,120 | 560 | 40 g | 20 g | 7.40 oz | 4.9 | 37 | 2 cups (16 oz) boiling | 10 min | Milk, Wheat |
| Peach Cobbler | Dessert | $11.99 | 2 | 670 | 335 | 11 g | 5.5 g | 4.93 oz | 4.8 | 115 | ⅔ cup (5.3 oz) boiling | 10 min | Milk, Soy, Wheat, Eggs |
| Mountain Berry Cobbler | Dessert | $11.99 | 2 | 600 | 300 | 10 g | 5 g | 4.93 oz | 4.9 | 51 | ⅔ cup (5.3 oz) boiling | 10 min | Milk, Soy, Wheat, Eggs |
| Strawberry Cheesecake Bites | Dessert | $7.99 | 2 | 400 | 200 | 4 g | 2 g | 2.82 oz | 4.7 | 66 | none — "Rip and Pop" (ready to eat) | none | Milk, Wheat, Egg |
| Peanut Butter Chocolate Chip Cookie Bites | Dessert | $7.99 | 2 | 640 | 320 | 11 g | 5.5 g | 4.72 oz | 4.7 | 59 | none — "Rip and Pop" (ready to eat) | none | Milk, Wheat, Soy, Peanut |
| Chocolate Fudge Brownie Bites | Dessert | $7.99 | 2 | 610 | 305 | 7 g | 3.5 g | 4.58 oz | 4.6 | 55 | none — "Rip and Pop" (ready to eat) | none | Milk, Wheat, Soy |

## Lineup notes

- **20 meals** (5 breakfast-style, 10 core lunch/dinner entrées, 5 signature/game-meat
  entrées) plus **5 desserts** = 25 food products. This is the complete published food
  catalog on peakrefuel.com as of 2026-08-01.
- **Signature/game line:** Venison Country Casserole, Backcountry Bison Bowl, Bison Ranch
  Mashers (bison/venison sourced from Durham Ranch, Gillette, WY — stated on pages),
  MeatEater American Buffalo Goulash (MeatEater collab), plus Chad Mendes co-branded packs.
  These run $15.99 vs $13.99–$14.99 for core entrées.
- **No budget sub-brand:** peakrefuel.com shows no secondary or budget line. Value pricing is
  via multi-meal packs/buckets instead: Entree Essentials Bucket 2.0 $169.99, Backcountry
  (14-day) Pack $519.99, Reserve (30-day) Pack $1,069.99, Cabin Cache $2,999.99, Mendes
  8-Pack $115.82, Anniversary Pack $94.99, onX Elite packs. (Pack prices from the same
  catalog feed, 2026-08-01; not individually audited.)
- **Drinks:** a "Drinks" collection exists but has zero published products — the drink line
  appears discontinued/unavailable.
- **Non-food:** Titanium Spork $9.99, merch (hats).
- **No gluten-free claims** appear on any product page — do not label anything GF. Dietary
  signals on-site are the "Contains" allergen line and a "vegan" tag on exactly three meals
  (Mountain Berry Granola, Three Bean Chili Mac, Butternut Dal Bhat).
- **Water/prep:** every meal rehydrates in the pouch. Entrées/cobblers use boiling water
  (5.3–16 oz depending on meal), granolas use cold water, Bites need none. Typical prep
  time 10 min (granolas 5 min, Breakfast Skillet lists 15 min in its spec).

## Per-product source URLs (all opened 2026-08-01)

| Product | URL |
|---|---|
| Breakfast Skillet | https://peakrefuel.com/products/breakfast-skillet-meal |
| Biscuits & Sausage Gravy | https://peakrefuel.com/products/biscuits-sausage-gravy |
| Strawberry Granola | https://peakrefuel.com/products/strawberry-granola-meal |
| Mountain Berry Granola | https://peakrefuel.com/products/mountain-berry-granola |
| Creamy Peaches and Oats | https://peakrefuel.com/products/peaches-and-cream |
| Chicken Alfredo | https://peakrefuel.com/products/chicken-alfredo |
| Beef Pasta Marinara | https://peakrefuel.com/products/beef-pasta-marinara-meal |
| Beef Stroganoff | https://peakrefuel.com/products/beef-stroganoff |
| Chicken Pesto Pasta | https://peakrefuel.com/products/chicken-pesto-pasta |
| Chicken Teriyaki Rice | https://peakrefuel.com/products/chicken-teriyaki-rice-meal |
| Homestyle Chicken & Rice | https://peakrefuel.com/products/homestyle-chicken-rice |
| Sweet Pork & Rice | https://peakrefuel.com/products/sweet-pork-rice-meal |
| Chicken Coconut Curry | https://peakrefuel.com/products/chicken-coconut-curry |
| Three Bean Chili Mac | https://peakrefuel.com/products/three-bean-chili-mac |
| Butternut Dal Bhat | https://peakrefuel.com/products/butternut-dal-bhat |
| White Chicken Chili | https://peakrefuel.com/products/white-chicken-chili |
| Venison Country Casserole | https://peakrefuel.com/products/venison-country-casserole |
| Backcountry Bison Bowl | https://peakrefuel.com/products/backcountry-bison-bowl |
| MeatEater American Buffalo Goulash | https://peakrefuel.com/products/meateater-american-buffalo-goulash |
| Bison Ranch Mashers | https://peakrefuel.com/products/bison-ranch-mashers |
| Peach Cobbler | https://peakrefuel.com/products/peach-cobbler |
| Mountain Berry Cobbler | https://peakrefuel.com/products/mountain-berry-cobbler |
| Strawberry Cheesecake Bites | https://peakrefuel.com/products/strawberry-cheesecake-bites |
| Peanut Butter Chocolate Chip Cookie Bites | https://peakrefuel.com/products/peanut-butter-chocolate-chip-cookie-bites |
| Chocolate Fudge Brownie Bites | https://peakrefuel.com/products/chocolate-fudge-brownie-bites |
| Catalog feed | https://peakrefuel.com/products.json |
| Collection feeds | https://peakrefuel.com/collections/{breakfast,lunch-dinner,desserts,meals}/products.json |

## Could not verify / honest gaps

- **Sweet Pork & Rice water amount** — no water quantity anywhere on its product page.
  Marked unverified (the pouch itself will state it; check a physical pouch or contact
  Peak Refuel).
- **Chicken Pesto Pasta water amount** — page's marketing copy says "2/3 cups of water" but
  the page has no "Carefully add X cup (Y oz)" prep-instruction line like the other meals,
  so no ounce figure is available from the page.
- **Sweet Pork & Rice allergens** — the page's spec list has no "Contains" line. That is not
  the same as allergen-free; treat as unstated.
- **Per-serving calories/protein** are computed (pouch ÷ 2), not printed on the pages — the
  pages state per-pouch figures and "Serving size – ½ pouch."
- **On-page discrepancies found (recorded, not resolved):**
  - Breakfast Skillet: stats panel says 10 min prep; spec list says 15 min.
  - Beef Pasta Marinara: marketing copy says "1 cup" water; prep instructions say ¾ cup (6 oz).
  - Beef Stroganoff: marketing copy and prep instructions agree on 1¼ cups (10 oz).
- **Ratings/review counts** are the Loox widget values embedded in each page's HTML header
  (the numbers the page displays); they change over time — re-check before publishing.
- **Third-party listings disagree with current pages for some meals** (e.g., older sources
  cite Breakfast Skillet at ~880–990 cal/pouch vs the current page's 540 cal / 3.88 oz;
  Chicken Teriyaki Rice cited higher elsewhere too). The current manufacturer pages are
  internally consistent (see plausibility check above) and are what this dataset records —
  it appears some meals were reformulated/resized. Do not "correct" these numbers from
  third-party sources.
- **Pack/bucket contents and per-meal pack pricing** were not audited — only the meal
  singles above were verified page-by-page.
