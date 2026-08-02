# Mountain House — Verified Meal Dataset (single Adventure Meal pouches)

**Verified:** 2026-08-01
**Source:** mountainhouse.com product pages (manufacturer's own site) — every figure below was
read from the actual page (page text, embedded product JSON, the page's own review widget
data source, or the back-of-pouch label photo the page itself publishes), not from search
snippets or AI summaries.

## How this was verified

1. **Catalog enumeration:** Fetched `https://www.mountainhouse.com/products.json?limit=250`
   (the store's own Shopify catalog endpoint — 109 published products on page 1, page 2 empty,
   so complete) plus `collections.json` and the site's own collection feeds
   (`adventure-meal-pouches`, `breakfast-pouches-recharge`, `lunch-dinner-pouches-recharge`,
   `desserts`, `gluten-free-*`, `mountain-house-classics`, `vegetarian-meals`) to use Mountain
   House's *own* categorization. The `adventure-meal-pouches` collection contains 40 products:
   34 single pouches + 6 two-packs (excluded per scope). The Classic line adds 2 more singles.
2. **Per-product page reads:** Downloaded all 36 single-pouch product pages (raw HTML via curl)
   and extracted: the on-page **Nutrition tab** (servings per container, serving size, the
   "Calories | Per Pouch" panel, protein), the **Ingredients tab** ("CONTAINS:" allergen line),
   the embedded Shopify product JSON (price in cents, compare-at price for sale detection,
   availability, tags — including the site's "Gluten-Free" tag), and the JSON-LD Product block
   (displayed price, InStock/OutOfStock).
3. **Back-of-pouch label photos:** Every Adventure Meal product page publishes a photo of the
   actual pouch back label (`…-back.jpg`; the two Classics publish `…-nutritional.png`). All 36
   label images were downloaded from the page's own image set and read visually to extract the
   label's dual-column Nutrition Facts (**Per serving / Per container**), the TO PREPARE panel
   (water quantity and timing), the "CONTAINS" line, and the GFCO **Certified Gluten Free** seal.
4. **Ratings/review counts:** The pages display ratings via a Bazaarvoice widget that loads
   client-side (`data-bv-show="inline_rating"`), so the widget's own data source was queried
   directly: the Bazaarvoice statistics API using the passkey from Mountain House's own BV
   deployment config (`apps.bazaarvoice.com/deployments/mountainhouse/...`). All 36 products
   returned. **Browser cross-check:** two pages (Beef Stroganoff, Buffalo-Style Chicken Mac &
   Cheese) were rendered in a real browser; the displayed widget text ("4.8 out of 5 stars.
   63 reviews" / "4.3 out of 5 stars. 48 reviews" plus a SOLD OUT flag on the latter) matched
   the API values exactly (the page rounds the average to 1 decimal; counts match exactly).
   Exact unrounded averages are archived in the raw-scrape JSON.
5. **Cross-validation:** For every one of the 36 products, the site Nutrition-tab per-pouch
   calories and protein were compared against the pouch label's "Per container" column
   (**0 mismatches**), per-serving × servings was checked against per-container
   (**0 mismatches**), and the site's "Gluten-Free" tag was compared against the GFCO seal
   printed on the label (**0 mismatches — perfect 18/18 agreement**).
6. **Plausibility check:** calories-per-gram computed from each label's own dry-mix weight
   (serving grams × servings) runs ≈ 3.9–5.3 cal/g across the line — physically plausible for
   freeze-dried food and consistent with the per-POUCH interpretation (per-serving would be
   impossible at > 9 cal/g for several meals).
7. Raw scrape evidence archived alongside this file:
   `mountain-house-raw-scrape-2026-08-01.json`.

**Key facts that apply to every product below:**

- **Mountain House's website nutrition panel displays PER-POUCH figures** (its header is
  literally "Calories | Per Pouch") — the *same* convention as Peak Refuel, not per-serving.
  The pouch label itself prints both columns (Per serving / Per container); the per-serving
  column below is the **label's own displayed figure**, not a computation (it also equals
  pouch ÷ servings exactly in all cases).
- **Servings per pouch: 2** for every standard Adventure Meal pouch — none are 2.5. Three
  items are single-serving ("Serving size: 1 Package"): Scrambled Eggs with Uncured Bacon and
  the two ice-cream sandwiches. The two Classic-line pouches are **3 servings**.
- **No product was on sale on 2026-08-01** (compare-at price equals price on all 36); prices
  are regular prices. Standard entrées are $12.49 flat.
- Prep is boiling water added to the pouch for everything except Granola with Milk and
  Blueberries (**cold** water, no wait) and the two ice-cream sandwiches (ready to eat,
  "NO DRIP, READY TO EAT, NO MESS" — no water).
- **Gluten-free claims are third-party certified**: the 18 gluten-free meals carry the GFCO
  (Gluten-Free Certification Organization) seal on the pouch, matching the site's Gluten-Free
  tag/collections 18-for-18. (Peak Refuel claims none.)
- Ratings/counts are what the mountainhouse.com Bazaarvoice widget displays (rating rounded
  to 1 decimal, as displayed) on 2026-08-01.

## Master table

Cal/protein per pouch = the figure displayed in the site's Nutrition tab AND the label's "Per
container" column (verified identical for all 36). Cal/protein per serving = the label's "Per
serving" column (displayed on the label photo; equals pouch ÷ servings). Net weight is not
stated anywhere in the page text — see the unverified column note.

| Meal | Category (site's) | Price | Servings | Cal/pouch (displayed) | Cal/serving (label) | Protein/pouch (displayed) | Protein/serving (label) | Net wt | Rating | Reviews | Water needed (label) | Prep time (label) | Allergens ("Contains") / dietary flags |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Breakfast Skillet | Breakfast | $12.49 | 2 | 520 | 260 | 28 g | 14 g | unverified (dry mix 106 g computed) | 4.4 | 95 | 1 1/4 cups (10 fl oz/296 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Egg; **GLUTEN-FREE** (GFCO seal + site tag) |
| Biscuits and Gravy | Breakfast | $11.49 | 2 | 540 | 270 | 22 g | 11 g | unverified (dry mix 124 g computed) | 4.3 | 67 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Wheat |
| Breakfast Fried Rice | Breakfast | $12.49 | 2 | 640 | 320 | 32 g | 16 g | unverified (dry mix 134 g computed) | 4.5 | 4 | 1 1/4 cups (10 fl oz/296 mL) boiling | 6 min + 6 min stand (12 min) | Milk, Egg, Soy |
| Granola with Milk and Blueberries | Breakfast | $7.99 | 2 | 500 | 250 | 16 g | 8 g | unverified (dry mix 112 g computed) | 4.8 | 39 | 1/2 cup (4 fl oz/118 mL) COLD | none - stir and eat | Milk, Wheat, Treenut (coconut) |
| Scrambled Eggs | Breakfast | $10.99 | 2 | 460 | 230 | 30 g | 15 g | unverified (dry mix 85 g computed) | no reviews yet | 0 | 1 1/4 cups (10 fl oz/296 mL) boiling | 5 min + 4 min stand, then drain excess (9 min) | Milk, Egg; **GLUTEN-FREE** (GFCO seal + site tag) |
| Scrambled Eggs with Uncured Bacon | Breakfast | $10.49 | 1 | 350 | 350 | 23 g | 23 g | unverified (no gram figure in page text) | 4.4 | 47 | 1 cup (8 fl oz/237 mL) boiling | 5 min + 4 min stand, then drain excess (9 min) | Milk, Egg; **GLUTEN-FREE** (GFCO seal + site tag) |
| Veggie Chorizo Breakfast Scramble | Breakfast | $12.49 | 2 | 580 | 290 | 28 g | 14 g | unverified (dry mix 112 g computed) | 4.7 | 32 | 1 1/3 cups (11 fl oz/325 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Egg; **GLUTEN-FREE** (GFCO seal + site tag) |
| Beef Stew | Lunch & Dinner | $12.49 | 2 | 420 | 210 | 20 g | 10 g | unverified (dry mix 92 g computed) | 4.8 | 74 | 1 3/4 cups (14 fl oz/414 mL) boiling | 5 min + 4 min stand (9 min) | none listed; **GLUTEN-FREE** (GFCO seal + site tag) |
| Beef Stroganoff with Noodles | Lunch & Dinner | $12.49 | 2 | 560 | 280 | 24 g | 12 g | unverified (dry mix 122 g computed) | 4.8 | 63 | 1 2/3 cups (13 fl oz/385 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Egg, Wheat |
| Buffalo-Style Chicken Mac & Cheese | Lunch & Dinner | $12.49 | 2 | 580 | 290 | 36 g | 18 g | unverified (dry mix 130 g computed) | 4.3 | 48 | 1 2/3 cups (13 fl oz/385 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Wheat; **SOLD OUT** |
| Cajun Style Jambalaya | Lunch & Dinner | $12.49 | 2 | 640 | 320 | 32 g | 16 g | unverified (dry mix 134 g computed) | 4.8 | 4 | 1 1/3 cups (11 fl oz/325 mL) boiling | 8 min + 7 min stand (15 min) | none listed; **GLUTEN-FREE** (GFCO seal + site tag) |
| Cheesy Beef Enchilada Bowl | Lunch & Dinner | $12.49 | 2 | 660 | 330 | 32 g | 16 g | unverified (dry mix 134 g computed) | 4.6 | 15 | 1 1/2 cups (12 fl oz/355 mL) boiling | 8 min + 7 min stand (15 min) | Milk; **GLUTEN-FREE** (GFCO seal + site tag) |
| Cheesy Pepperoni Pizza Bowl | Lunch & Dinner | $12.49 | 2 | 740 | 370 | 28 g | 14 g | unverified (dry mix 144 g computed) | 4.2 | 33 | 1 1/3 cups (11 fl oz/325 mL) boiling | 9 min wait (9 min) | Milk, Wheat |
| Chicken and Dumplings | Lunch & Dinner | $12.49 | 2 | 600 | 300 | 36 g | 18 g | unverified (dry mix 128 g computed) | 4.8 | 51 | 1 1/3 cups (11 fl oz/325 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Wheat |
| Chicken and Mashed Potatoes | Lunch & Dinner | $12.49 | 2 | 460 | 230 | 44 g | 22 g | unverified (dry mix 108 g computed) | 4.8 | 56 | 1 2/3 cups (13 fl oz/385 mL) boiling | 4 min + 3 min stand (7 min) | Milk; **GLUTEN-FREE** (GFCO seal + site tag) |
| Chicken Fajita Bowl | Lunch & Dinner | $12.49 | 2 | 560 | 280 | 34 g | 17 g | unverified (dry mix 120 g computed) | 4.8 | 35 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | none listed; **GLUTEN-FREE** (GFCO seal + site tag) |
| Chicken Fried Rice | Lunch & Dinner | $12.49 | 2 | 600 | 300 | 26 g | 13 g | unverified (dry mix 132 g computed) | 3.6 | 22 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Egg, Soy, Sesame; **GLUTEN-FREE** (GFCO seal + site tag) |
| Chicken Teriyaki | Lunch & Dinner | $12.49 | 2 | 460 | 230 | 22 g | 11 g | unverified (dry mix 118 g computed) | 4.4 | 23 | 1 2/3 cups (13 fl oz/385 mL) boiling | 5 min + 4 min stand (9 min) | Soy; **GLUTEN-FREE** (GFCO seal + site tag) |
| Chicken Tikka Masala | Lunch & Dinner | $12.49 | 2 | 560 | 280 | 24 g | 12 g | unverified (dry mix 120 g computed) | 4.8 | 11 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 5 min stand (10 min) | Milk, Treenuts (Coconut); **GLUTEN-FREE** (GFCO seal + site tag) |
| Chili Mac with Beef | Lunch & Dinner | $12.49 | 2 | 460 | 230 | 24 g | 12 g | unverified (dry mix 108 g computed) | 4.3 | 34 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Wheat |
| Creamy Macaroni & Cheese | Lunch & Dinner | $11.49 | 2 | 620 | 310 | 26 g | 13 g | unverified (dry mix 128 g computed) | 3.5 | 21 | 1 1/3 cups (11 fl oz/325 mL) boiling | 8 min + 7 min stand (15 min) | Milk, Wheat |
| Fettuccine Alfredo with Chicken | Lunch & Dinner | $12.49 | 2 | 820 | 410 | 34 g | 17 g | unverified (dry mix 156 g computed) | 4.7 | 53 | 1 1/3 cups (11 fl oz/325 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Egg, Wheat |
| Homestyle Chicken Noodle Casserole | Lunch & Dinner | $12.49 | 2 | 560 | 280 | 38 g | 19 g | unverified (dry mix 130 g computed) | 4.9 | 55 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Egg, Milk, Wheat |
| Korean Inspired Beef | Lunch & Dinner | $12.49 | 2 | 580 | 290 | 22 g | 11 g | unverified (dry mix 126 g computed) | 3.9 | 17 | 1 1/3 cups (11 fl oz/325 mL) boiling | 8 min + 7 min stand (15 min) | Soy, Sesame; **GLUTEN-FREE** (GFCO seal + site tag) |
| Kung Pao Chicken | Lunch & Dinner | $12.49 | 2 | 580 | 290 | 32 g | 16 g | unverified (dry mix 134 g computed) | 4.6 | 14 | 1 1/2 cups (12 fl oz/355 mL) boiling | 8 min + 7 min stand (15 min) | Soy, Sesame; **GLUTEN-FREE** (GFCO seal + site tag) |
| Beef Lasagna | Lunch & Dinner | $12.49 | 2 | 440 | 220 | 22 g | 11 g | unverified (dry mix 102 g computed) | 4.7 | 37 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Wheat |
| Mexican-Style Adobo Rice & Chicken | Lunch & Dinner | $12.49 | 2 | 560 | 280 | 30 g | 15 g | unverified (dry mix 130 g computed) | 4.6 | 20 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | none listed; **GLUTEN-FREE** (GFCO seal + site tag); **SOLD OUT** |
| Pad Thai with Chicken | Lunch & Dinner | $12.49 | 2 | 500 | 250 | 20 g | 10 g | unverified (dry mix 110 g computed) | 4.5 | 45 | 1 1/3 cups (11 fl oz/325 mL) boiling | 5 min + 4 min stand (9 min) | Sesame, Soy, Fish (anchovies); **GLUTEN-FREE** (GFCO seal + site tag) |
| Pasta Primavera | Lunch & Dinner | $11.49 | 2 | 440 | 220 | 16 g | 8 g | unverified (dry mix 108 g computed) | 4.7 | 17 | 1 2/3 cups (13 fl oz/385 mL) boiling | 8 min + 7 min stand (15 min) | Milk, Wheat; May contain: Egg |
| Rice & Chicken | Lunch & Dinner | $12.49 | 2 | 500 | 250 | 14 g | 7 g | unverified (dry mix 120 g computed) | 4.5 | 40 | 1 1/3 cups (11 fl oz/325 mL) boiling | 5 min + 4 min stand (9 min) | none listed; **GLUTEN-FREE** (GFCO seal + site tag) |
| Spaghetti with Beef Marinara | Lunch & Dinner | $12.49 | 2 | 500 | 250 | 20 g | 10 g | unverified (dry mix 120 g computed) | 4.5 | 34 | 1 3/4 cups (14 fl oz/414 mL) boiling | 5 min + 4 min stand (9 min) | Wheat |
| Yellow Curry with Chicken & Rice | Lunch & Dinner | $12.49 | 2 | 500 | 250 | 26 g | 13 g | unverified (dry mix 110 g computed) | 4.7 | 52 | 1 1/2 cups (12 fl oz/355 mL) boiling | 5 min + 4 min stand (9 min) | Fish (Anchovy), Treenut (Coconut), Crustacean (Shrimp); **GLUTEN-FREE** (GFCO seal + site tag) |
| Vanilla Ice Cream Sandwich | Dessert | $4.99 | 1 | 140 | 140 | 2 g | 2 g | unverified (no gram figure in page text) | 4.0 | 14 | none - ready to eat (NO DRIP, READY TO EAT, NO MESS) | none | Milk, Soy, Wheat |
| Mint Chocolate Chip Ice Cream Sandwich | Dessert | $4.99 | 1 | 140 | 140 | 2 g | 2 g | unverified (no gram figure in page text) | 4.1 | 15 | none - ready to eat (NO DRIP, READY TO EAT, NO MESS) | none | Milk, Wheat, Soy |
| Classic Chili Mac with Beef | Classic line (entree) | $14.99 | 3 | 690 | 230 | 36 g | 12 g | unverified (dry mix 162 g computed) | 4.8 | 8 | 2 1/3 cups (19 fl oz/562 mL) boiling | 5 min + 4 min stand (9 min) | Soy, Wheat |
| Classic Biscuits & Gravy | Classic line (breakfast) | $14.99 | 3 | 900 | 300 | 30 g | 10 g | unverified (dry mix 195 g computed) | 4.7 | 6 | 2 1/4 cups (18 fl oz/532 mL) boiling | 5 min + 4 min stand (9 min) | Milk, Wheat |
## Lineup notes

- **34 single Adventure Meal pouches** (7 breakfasts, 25 lunch/dinner entrées, 2 pouch
  desserts) is the complete published single-pouch Adventure Meals catalog on
  mountainhouse.com as of 2026-08-01, per the site's own `adventure-meal-pouches` collection
  feed. The **Classic line** adds 2 larger-format (3-serving) value pouches, audited above.
- **Pricing tiers:** standard entrées $12.49 flat; Biscuits and Gravy / Creamy Mac & Cheese /
  Pasta Primavera $11.49; Scrambled Eggs $10.99; Scrambled Eggs with Bacon $10.49; Granola
  $7.99; ice-cream sandwiches $4.99; Classic pouches $14.99 (3 servings — cheapest per
  serving at $5.00).
- **Sold out on 2026-08-01:** Buffalo-Style Chicken Mac & Cheese, Mexican-Style Adobo Rice &
  Chicken (both pages render a SOLD OUT flag; embedded JSON `available: false`).
- **Exists but excluded per scope (not audited):** six 2-packs of existing meals (Breakfast
  Skillet, Biscuits and Gravy, Chicken and Dumplings, Granola, Beef Lasagna, Creamy Mac), a
  "Takeout on the Trail" 3-pack, Pro-Paks (single-serving vacuum pouches for high altitude),
  #10 cans (33), buckets/kits (Build Your Own 3/5/7-day, emergency kits up to 1 year),
  Military rations line, and freeze-dried protein cans. Every meal sold as a single pouch was
  audited; no meal is multi-pack-only.
- **Gluten-free (18 meals, GFCO-certified, seal on pouch + site tag/collection):** Breakfast
  Skillet, Scrambled Eggs, Scrambled Eggs with Uncured Bacon, Veggie Chorizo Breakfast
  Scramble, Beef Stew, Cajun Style Jambalaya, Cheesy Beef Enchilada Bowl, Chicken and Mashed
  Potatoes, Chicken Fajita Bowl, Chicken Fried Rice, Chicken Teriyaki, Chicken Tikka Masala,
  Korean Inspired Beef, Kung Pao Chicken, Mexican-Style Adobo Rice & Chicken, Pad Thai with
  Chicken, Rice & Chicken, Yellow Curry with Chicken & Rice.
- **Five meals list no "CONTAINS" allergen statement at all** (Beef Stew, Cajun Style
  Jambalaya, Chicken Fajita Bowl, Mexican-Style Adobo Rice & Chicken, Rice & Chicken) — the
  ingredients list on both the page and the pouch label simply has no CONTAINS line. That is
  the manufacturer's statement, not an omission of this audit.
- **Vegetarian (site's collection):** Granola, Creamy Mac & Cheese, Pasta Primavera, Veggie
  Chorizo Breakfast Scramble, Scrambled Eggs. No vegan singles.
- **Watch the review counts:** several strong-sounding ratings sit on tiny samples
  (Breakfast Fried Rice 4.5 on 4 reviews; Cajun Jambalaya 4.8 on 4; Classic pouches on 8 and
  6). Scrambled Eggs (the new bacon-free one) has no reviews yet. Lowest-rated meals:
  Creamy Mac & Cheese 3.5 (21), Chicken Fried Rice 3.6 (22), Korean Inspired Beef 3.9 (17).
- **Comparison to Peak Refuel** (see `peak-refuel-verified.md`): Peak pouches run 530–1,120
  cal/pouch at $13.99–$15.99; Mountain House meal pouches run 350–820 cal/pouch at
  $10.49–$12.49. Protein: Peak 10–53 g/pouch (entrées 23–53 g) vs Mountain House meal pouches 14–44 g.
  Both brands display per-POUCH nutrition on their sites. Mountain House's edge: 18
  GFCO-certified gluten-free meals (Peak has zero GF claims) and lower prices; Peak's edge:
  more calories and protein per pouch.

## Per-product source URLs (all opened 2026-08-01)

| Product | URL |
|---|---|
| Breakfast Skillet | https://www.mountainhouse.com/products/breakfast-skillet-pouch |
| Biscuits and Gravy | https://www.mountainhouse.com/products/biscuits-and-gravy-pouch |
| Breakfast Fried Rice | https://www.mountainhouse.com/products/breakfast-fried-rice-pouch |
| Granola with Milk and Blueberries | https://www.mountainhouse.com/products/granola-with-milk-and-blueberries-pouch |
| Scrambled Eggs | https://www.mountainhouse.com/products/scrambled-eggs-pouch |
| Scrambled Eggs with Uncured Bacon | https://www.mountainhouse.com/products/scrambled-eggs-with-bacon-pouch |
| Veggie Chorizo Breakfast Scramble | https://www.mountainhouse.com/products/veggie-chorizo-breakfast-scramble-pouch |
| Beef Stew | https://www.mountainhouse.com/products/beef-stew-pouch |
| Beef Stroganoff with Noodles | https://www.mountainhouse.com/products/beef-stroganoff-pouch |
| Buffalo-Style Chicken Mac & Cheese | https://www.mountainhouse.com/products/buffalo-style-chicken-mac-cheese |
| Cajun Style Jambalaya | https://www.mountainhouse.com/products/cajun-style-jambalaya-pouch |
| Cheesy Beef Enchilada Bowl | https://www.mountainhouse.com/products/cheesy-beef-enchilada-bowl-pouch |
| Cheesy Pepperoni Pizza Bowl | https://www.mountainhouse.com/products/cheesy-pepperoni-pizza-bowl-pouch |
| Chicken and Dumplings | https://www.mountainhouse.com/products/chicken-and-dumplings-pouch |
| Chicken and Mashed Potatoes | https://www.mountainhouse.com/products/chicken-and-mashed-potatoes-pouch |
| Chicken Fajita Bowl | https://www.mountainhouse.com/products/chicken-fajita-bowl-pouch |
| Chicken Fried Rice | https://www.mountainhouse.com/products/chicken-fried-rice-pouch |
| Chicken Teriyaki | https://www.mountainhouse.com/products/chicken-teriyaki-with-rice-pouch |
| Chicken Tikka Masala | https://www.mountainhouse.com/products/chicken-tikka-masala-pouch |
| Chili Mac with Beef | https://www.mountainhouse.com/products/chili-mac-with-beef-pouch |
| Creamy Macaroni & Cheese | https://www.mountainhouse.com/products/creamy-macaroni-cheese-pouch |
| Fettuccine Alfredo with Chicken | https://www.mountainhouse.com/products/fettuccine-alfredo-with-chicken-pouch |
| Homestyle Chicken Noodle Casserole | https://www.mountainhouse.com/products/homestyle-chicken-noodle-casserole-pouch |
| Korean Inspired Beef | https://www.mountainhouse.com/products/korean-inspired-beef-pouch |
| Kung Pao Chicken | https://www.mountainhouse.com/products/kung-pao-chicken-pouch |
| Beef Lasagna | https://www.mountainhouse.com/products/lasagna-with-meat-sauce-pouch |
| Mexican-Style Adobo Rice & Chicken | https://www.mountainhouse.com/products/mexican-adobo-rice-chicken-pouch |
| Pad Thai with Chicken | https://www.mountainhouse.com/products/pad-thai-with-chicken-pouch |
| Pasta Primavera | https://www.mountainhouse.com/products/pasta-primavera-pouch |
| Rice & Chicken | https://www.mountainhouse.com/products/rice-chicken-pouch |
| Spaghetti with Beef Marinara | https://www.mountainhouse.com/products/spaghetti-with-meat-sauce-pouch |
| Yellow Curry with Chicken & Rice | https://www.mountainhouse.com/products/yellow-curry-with-chicken-rice-pouch |
| Vanilla Ice Cream Sandwich | https://www.mountainhouse.com/products/vanilla-ice-cream-sandwich |
| Mint Chocolate Chip Ice Cream Sandwich | https://www.mountainhouse.com/products/mint-chocolate-chip-ice-cream-sandwich |
| Classic Chili Mac with Beef | https://www.mountainhouse.com/products/classic-chili-mac-with-beef |
| Classic Biscuits & Gravy | https://www.mountainhouse.com/products/classic-biscuits-gravy |
| Catalog feed | https://www.mountainhouse.com/products.json?limit=250 |
| Collection feeds | https://www.mountainhouse.com/collections/{adventure-meal-pouches,breakfast-pouches-recharge,lunch-dinner-pouches-recharge,desserts,gluten-free-meals,mountain-house-classics,vegetarian-meals}/products.json |
| Ratings source (the widget's own API) | https://api.bazaarvoice.com/data/statistics.json (passkey from https://apps.bazaarvoice.com/deployments/mountainhouse/main_site/production/en_US/) |

## Could not verify / honest gaps

- **Net weight** — not stated anywhere in the page text of any product. Marked unverified
  for all 36. The table's parenthetical dry-mix grams (serving-size grams × servings) is a
  **computed floor**, not the pouch's printed NET WT (which is only on the front-label photo
  and was not extracted; printed net weights typically run slightly above the serving-math
  figure due to label rounding). The Shopify variant shipping weight (gross, in grams) is
  archived per product in the raw-scrape JSON.
- **Water/prep for the 2 Classic pouches** comes from the `…-nutritional.png` label image the
  product page publishes (same standard as the back-label photos), not from page text — page
  text carries no prep info for any product beyond "Just add water / Ready in minutes" icons.
- **Ice-cream-sandwich "Cal/pouch"** is the label's per-package figure (1 serving = 1
  package); there is no separate per-container column on those labels.
- **Protein %DV quirk (recorded, not resolved):** the site panel prints per-pouch protein
  grams, but its protein %DV appears to be computed on a different basis (e.g. Beef
  Stroganoff "24g / 23%", where 24 g of the 50 g DV would be 48%). Likely the
  PDCAAS-corrected or per-serving basis. Gram figures — the numbers this dataset records —
  are consistent everywhere; only that one percentage column is odd.
- **Ratings change over time** — re-check before publishing. Counts are the widget's native
  review counts (syndicated counts, if any, did not differ on the two browser-rendered
  pages). Exact unrounded averages are in the raw-scrape JSON; the table shows the 1-decimal
  value the page displays.
- **Third-party listings (REI, Amazon) show much larger review counts** for the same meals —
  those are other retailers' review pools, not what mountainhouse.com displays. This dataset
  records only the manufacturer's own site.
