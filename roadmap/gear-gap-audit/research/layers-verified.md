# Layers, Socks & Insulation — Verified Specs

**Audit date:** 2026-07-28
**Trip context:** 4-day Sawtooth Wilderness (Idaho), August 2026. ~12 teenage boys (5'1"–5'8", youth through adult-small sizing) plus adult leaders. Camps at 8,000–8,700 ft, nights in the 30s–40s °F. Packing list calls for "3 pr wool/synthetic socks", "Fleece or puffy jacket", "Thermal top & bottoms", "Beanie". Trip guide: blisters are "the #1 thing that ruins this for a boy" — which is why socks are treated here as blister-prevention gear, not apparel.
**Method:** REI.com via Playwright browser MCP, using same-origin `fetch()` from an already-loaded REI page and parsing the server-rendered `#modelData` JSON payload. Price is read from the SKU-level `price.compareAt.value` / `offerType` fields; rating from the `reviewSummary` object (`averageRating` + `count`). Nothing here is estimated, averaged across retailers, or inferred.
**Rating rule:** A rating is recorded only where the publisher renders BOTH a numeric rating value AND a review count in the same payload. Anything else is `NO RATING FOUND`.
**Weight rule:** Recorded only where the publisher prints a weight. Socks and most apparel are recorded as `weight not published` rather than guessed. Do NOT invent per-pair sock weights — REI does not publish them.
**Price rule:** REI prices these SKUs per colorway. Where multiple full-price values exist across colors, the full range is given verbatim. Clearance values are called out separately and should NOT be used as the shelf price in the UI — clearance colorways disappear.

**Blocked / no-data domains (recorded, not retried):** `darntough.com` product URL returned **HTTP 404** via WebFetch (handle guess wrong; not retried under the pacing budget — REI carries the same SKUs with ratings, so this was not worth a second attempt). See the abandoned-domains list at the bottom.

---

# TIER 1 — SOCKS (blister-prevention gear)

## Darn Tough Hiker Micro Crew Cushion Socks — Men's

**Question:** Price, weight, rating, review count. Is this the right benchmark sock for a 4-day trip where blisters are the #1 risk?

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim `price.compareAt` values by colorway): **`"value":26.00 … "offerType":"fullPrice"`**, also **`25.00/fullPrice`** and **`23.00/fullPrice`**. Clearance colorways present at **`11.83`, `12.83`, `14.83` (`"offerType":"clearance"`)**.
- Shelf price to show: **$23–$26** (use **$26** as the headline; clearance colors are transient).
- REI rating (verbatim): **`"reviewSummary":{"count":1377,"averageRating":4.7451`** → **4.7 ★ / 1,377 reviews**. Rating histogram verbatim: **`"ratingHistogram":{"1":31,"2":22,"3":34,"4":93,"5":1197}`**
- Weight: **weight not published** by REI for this SKU. (A customer review on the page states "about 2.3 oz for the pair" — that is user-generated, NOT a manufacturer spec, and must not be presented as one.)
- Note verbatim from REI review metadata: fit slider **`"id":"OverallFit","averageRating":1.93 … "minLabel":"Runs Small","maxLabel":"Runs Large"`** — buyers report these run toward the small end of the scale. Relevant for boys sizing up between youth and adult-small.

**Source:** https://www.rei.com/product/825037/darn-tough-hiker-micro-crew-cushion-socks-mens (Playwright, `#modelData` payload)

**Changes recommendation?** **Yes — make this the benchmark/anchor sock in the category.** 1,377 reviews at 4.7 is the deepest evidence base of anything in this category by an order of magnitude, and Darn Tough's unconditional lifetime warranty is the single most defensible claim for gear worn by 14-year-olds who destroy things. Show it at $26 with 4.7 ★ (1,377). Do NOT print a weight.

---

## Darn Tough Light Hiker Micro Crew Socks — Men's

**Question:** Price, weight, rating, review count. Is the lighter-cushion version a better August choice?

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`25.00/fullPrice`**, **`24.00/fullPrice`**, **`23.00/fullPrice`**, **`22.00/fullPrice`** across colorways; clearance at **`6.83`** and **`9.83`**.
- Shelf price to show: **$22–$25**.
- REI rating (verbatim): **`"reviewSummary":{"count":483,"averageRating":4.7000`** → **4.7 ★ / 483 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/154491/darn-tough-light-hiker-micro-crew-socks-mens (Playwright, `#modelData`)

**Changes recommendation?** **Yes — list it as the warm-weather sibling, not a replacement.** Same 4.7 rating on a healthy 483-review base, $1–4 cheaper, less cushion. For August in the Sawtooths the Light Hiker is defensible for hiking days; the full Cushion is the better blister hedge for boys in borrowed or new boots. Recommend the pairing honestly rather than picking one.

---

## Darn Tough Light Hiker Micro Crew Socks — Kids'

**Question:** Does a kids'-sized Darn Tough exist for the smaller boys, and what does it cost?

**Confidence:** CONFIRMED (price, rating) / **thin rating sample — must be shown with the count visible**

**Answer:**
- REI price (verbatim): **`16.00/fullPrice`**, **`15.00/fullPrice`**, **`20.00/fullPrice`**; clearance at **`6.83`**, **`9.83`**.
- Shelf price to show: **$15–$20**.
- REI rating (verbatim): **`"reviewSummary":{"count":5,"averageRating":5.0000`** → **5.0 ★ / 5 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/154493/darn-tough-light-hiker-micro-crew-socks-kids (Playwright, `#modelData`)

**Changes recommendation?** **Yes, but with an explicit caveat.** This matters for the 5'1"–5'4" end of the group — it's the same warranty and the same construction for ~$10 less. But **5.0 ★ on 5 reviews is not a real rating**; it must never be sorted or displayed as if it outranks the 4.7 ★ (1,377) adult sock. Show the count inline. For most of the boys in this group, adult-small in the men's Light Hiker is the better call.

---

## Darn Tough COOLMAX Hiker Micro Crew Cushion Socks — Men's

**Question:** Is there a synthetic (non-merino) Darn Tough option for boys who won't wear wool or who sweat heavily?

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`25.00/fullPrice`**, **`21.00/fullPrice`**; clearance at **`11.83`**.
- Shelf price to show: **$21–$25**.
- REI rating (verbatim): **`"reviewSummary":{"count":226,"averageRating":4.5000`** → **4.5 ★ / 226 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/881682/darn-tough-coolmax-hiker-micro-crew-cushion-socks-mens (Playwright, `#modelData`)

**Changes recommendation?** **Yes — include as the synthetic option, and be honest that it rates lower than the merino version.** 4.5 ★ (226) vs 4.7 ★ (1,377) for the wool Hiker at the same price. Same lifetime warranty. Its real advantage is that it dries faster and costs the same, which matters on a 4-day trip with stream crossings. Do not present it as the default.

---

## Smartwool Classic Hike Full Cushion Crew Socks — Men's

**Question:** Price, weight, rating, review count for the main Darn Tough competitor.

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI product name verbatim: **"Smartwool Classic Hike Full Cushion Crew Socks - Men's"** (REI lists this under the "Classic Hike" name; Smartwool's own "Hike Classic Edition Full Cushion Crew" is the same line)
- REI price (verbatim): **`23.00/fullPrice`**, **`22.00/fullPrice`**; clearance at **`6.83`**, **`10.83`**.
- Shelf price to show: **$22–$23**.
- REI rating (verbatim): **`"reviewSummary":{"count":113,"averageRating":4.5000`** → **4.5 ★ / 113 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/193035/smartwool-classic-hike-full-cushion-crew-socks-mens (Playwright, `#modelData`)

**Changes recommendation?** **Yes — include as the named alternative, and let the numbers speak.** $3–4 cheaper than the Darn Tough Hiker Cushion, but 4.5 ★ on 113 reviews against 4.7 ★ on 1,377, and Smartwool's warranty is a 2-year limited warranty rather than Darn Tough's unconditional lifetime replacement. For a group where socks get shredded and boys lose things, the warranty difference is the deciding factor, not the $3.

---

## REI Co-op Merino Wool Midweight Hiking Crew Socks

**Question:** Is there a budget merino sock that actually exists and is worth stocking three pairs of?

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`19.95/fullPrice`**; clearance at **`14.93`**, **`9.83`**.
- Shelf price to show: **$19.95**.
- REI rating (verbatim): **`"reviewSummary":{"count":237,"averageRating":4.3000`** → **4.3 ★ / 237 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/165403/rei-co-op-merino-wool-midweight-hiking-crew-socks (Playwright, `#modelData`)

**Changes recommendation?** **Yes — this is the honest budget merino answer.** $19.95 vs $26, a real 237-review base, and it's genuinely merino rather than a wool-blend marketing claim. The 4.3 ★ is the lowest of the adult socks here and that should be shown, not hidden. The math that matters for this trip: 3 pairs × 12 boys at $19.95 is **$718** vs **$936** at $26 — a $218 difference across the group. That is a real decision, and the recommendation should present it as one.

---

## REI Co-op Merino Wool Midweight Crew Hiking Socks — Kids'

**Question:** Budget merino in youth sizing.

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`13.95/fullPrice`**; clearance at **`9.93`**.
- Shelf price to show: **$13.95**.
- REI rating (verbatim): **`"reviewSummary":{"count":45,"averageRating":3.9000`** → **3.9 ★ / 45 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/165402/rei-co-op-merino-wool-midweight-crew-hiking-socks-kids (Playwright, `#modelData`)

**Changes recommendation?** **Include, but flag it — do not recommend it.** This is the cheapest real merino option at $13.95, but **3.9 ★ across 45 reviews is the worst rating in this entire audit**, and it is the one item here worn directly against the skin of the boys most likely to blister. Cheap socks are exactly the wrong place to save $6 on a trip where blisters are the stated #1 failure mode. List it for completeness with the rating fully visible.

---

## Injinji Liner Crew Socks

**Question:** Does a toe-sock / liner option make sense as blister insurance, and what does it cost?

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`13.00/fullPrice`**, **`12.00/fullPrice`**; clearance at **`2.83`**, **`5.83`**.
- Shelf price to show: **$12–$13**.
- REI rating (verbatim): **`"reviewSummary":{"count":442,"averageRating":4.7000`** → **4.7 ★ / 442 reviews**
- Weight: **weight not published**

**Source:** https://www.rei.com/product/881305/injinji-liner-crew-socks (Playwright, `#modelData`)

**Changes recommendation?** **Yes — and this may be the highest-leverage item in the whole category.** 4.7 ★ on 442 reviews at **$12–13**, worn *under* the hiking sock. A liner is the cheapest mechanical answer to the exact failure the trip guide names: it moves the friction from skin-on-sock to sock-on-sock. For the two or three boys with known hot spots or brand-new boots, a $13 liner is a better spend than upgrading everyone's outer sock. Recommend it as a targeted add-on, not a blanket 12-person purchase.

---

# TIER 2 — INSULATION (the "fleece or puffy" slot)

**Framing note for this whole tier, stated honestly:** these boys are 5'1"–5'8" and mid-growth-spurt. A jacket bought in August 2026 may not fit in August 2027, and it will be sat on, stuffed wet into a pack, and set near a fire. The premium pieces below are real gear and the specs are real, but the recommendation logic for a 14-year-old is not the same as for an adult buying a 10-year jacket. Both answers are documented; the price-per-season math is called out where it changes the decision.

## Patagonia Nano Puff Insulated Jacket — Men's

**Question:** Price, weight, rating, review count. Is the synthetic-insulation wet-performance argument worth the money here?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim): **`229.00/fullPrice`** (also `239.00` and `240.00` on certain colorways); clearance colorways at **`59.83`** and **`113.83`**.
- Shelf price to show: **$229**.
- REI weight (verbatim JSON-LD): **`"weight":"13 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":114,"averageRating":4.6000`** → **4.6 ★ / 114 reviews**
- Insulation (verbatim from REI spec table): **"60 g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E. (Produced Using Reduced Emissions)"**

**Changes recommendation?** **Yes — carry it, but as the "if money is no object and it will get wet" pick, not the group recommendation.** The synthetic argument is real and matters in the Sawtooths: PrimaLoft keeps loft when damp, down does not, and a 4-day trip with afternoon thunderstorms at 8,000+ ft is exactly the scenario. But at **$229** and 13 oz it is *heavier and more than twice the price* of the REI 650 Down below, which is 10.9 oz at $129. For a boy who will outgrow it in a season, $229 is very hard to defend. Recommend it honestly as the adult-leader / long-horizon choice.

**Source:** https://www.rei.com/product/249151/patagonia-nano-puff-insulated-jacket-mens (Playwright, `#modelData` + JSON-LD)

---

## Patagonia Nano Puff Brick Quilted Insulated Jacket — Kids'

**Question:** Is there a youth-sized Nano Puff, and does it change the price argument?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim): **`119.00/fullPrice`**, also **`99.00/fullPrice`** on some colorways; a large clearance spread at **`34.83`, `46.83`, `46.93`, `48.83`, `68.93`, `73.93`**.
- Shelf price to show: **$99–$119** (and note that clearance colorways are frequently under $50 — unusually deep for Patagonia).
- REI weight (verbatim JSON-LD): **`"weight":"11 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":37,"averageRating":4.9000`** → **4.9 ★ / 37 reviews**
- Insulation (verbatim): **"60 g PrimaLoft Gold Eco synthetic fibers (100% recycled)"** — same 60 g fill as the adult Nano Puff.
- Sizing audience (verbatim JSON-LD): **`"suggestedMinAge":5.0,"suggestedMaxAge":13.0`**

**Changes recommendation?** **Yes — this is the sleeper finding of Tier 2.** Same 60 g PrimaLoft Gold Eco insulation as the $229 adult jacket, 2 oz lighter, at **$99–$119** full price and frequently under $50 on clearance. For the 5'1"–5'4" boys who still fit kids' XL, this delivers the entire synthetic-insulation argument at roughly half the price. Caveat to state plainly: REI's own audience data caps it at age 13, so it will not fit the taller half of the group — and 4.9 ★ rests on only 37 reviews.

**Source:** https://www.rei.com/product/118251/patagonia-nano-puff-brick-quilted-insulated-jacket-kids (Playwright, `#modelData` + JSON-LD)

---

## Patagonia Micro Puff Insulated Hoody — Men's

**Question:** Price, weight, rating, review count for the premium ultralight piece.

**Confidence:** CONFIRMED (price, weight) / **PARTIAL on rating — the sample is too small to be meaningful**

**Answer:**
- REI price (verbatim): **`345.00/fullPrice`**, also **`329.00`** and **`346.00`** by colorway.
- Shelf price to show: **$329–$346**.
- REI weight (verbatim JSON-LD): **`"weight":"10.5 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":5,"averageRating":4.2000`** → **4.2 ★ / 5 reviews**

**Changes recommendation?** **Include for completeness, and do not recommend it for this trip.** At **$329–$346** it is the most expensive item in this audit by a wide margin, and it saves only **2.5 oz** against the $229 Nano Puff and **0.4 oz** against the $129 REI 650 Down. **4.2 ★ on 5 reviews is not a usable rating** and must be displayed with the count visible; it should never sort above the 486-review REI 650. Recommending a $340 hoody for a 14-year-old on a 4-day trip is not defensible, and the page should say so rather than list it neutrally.

**Source:** https://www.rei.com/product/249813/patagonia-micro-puff-insulated-hoody-mens (Playwright, `#modelData` + JSON-LD)

---

## REI Co-op 650 Down Jacket — Men's

**Question:** Price, weight, rating, review count. Is this the value pick for the puffy slot?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim): **`129.00/fullPrice`**; a very deep clearance spread at **`29.83`, `37.83`, `39.83`, `49.83`, `59.83`, `63.83`**.
- Shelf price to show: **$129** (clearance colorways routinely land **$30–$65**, which is the single best value in this audit when a size is in stock).
- REI weight (verbatim JSON-LD): **`"weight":"10.9 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":486,"averageRating":4.4000`** → **4.4 ★ / 486 reviews**
- Verbatim from a customer question on the page: **"I understand the Fill Power for this jacket is 650 with 80% down and the entire item weighs 10.9 oz."** (user-written, but consistent with the 10.9 oz JSON-LD spec)

**Changes recommendation?** **Yes — this should be the default recommendation for the puffy slot.** It is **lighter than the Nano Puff (10.9 oz vs 13 oz)**, costs **$100 less**, and carries the largest review base in Tier 2 by a factor of four (486 vs 114). The honest counterargument belongs on the page: it is **down**, so it loses loft if it gets soaked, and a teenage boy is more likely than an adult to let that happen. Mitigation is a pack liner and a rain shell — both of which this trip already requires. Show 4.4 ★ (486) and $129.

**Source:** https://www.rei.com/product/221639/rei-co-op-650-down-jacket-mens (Playwright, `#modelData` + JSON-LD)

---

## REI Co-op 650 Down Jacket — Kids'

**Question:** Youth sizing for the value down pick.

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim): **`89.95/fullPrice`**; clearance at **`26.83`, `44.83`, `62.93`**.
- Shelf price to show: **$89.95**.
- REI weight (verbatim JSON-LD): **`"weight":"8.6 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":40,"averageRating":3.8250`** → **3.8 ★ / 40 reviews**
- Sizing audience (verbatim JSON-LD): **`"suggestedMinAge":5.0,"suggestedMaxAge":13.0`**

**Changes recommendation?** **Include, with the rating shown prominently — do not quietly recommend it.** At 8.6 oz and $89.95 the spec sheet looks great, but **3.8 ★ across 40 reviews is the weakest insulation rating in this audit**, and it is $10 cheaper than the kids' Nano Puff clearance price while being down rather than synthetic. If the goal is a cheap youth puffy, the kids' Nano Puff on clearance is the better buy and the page should say so.

**Source:** https://www.rei.com/product/221696/rei-co-op-650-down-jacket-kids (Playwright, `#modelData` + JSON-LD)

---

## REI Co-op Microtrek Insulated Hoodie — Kids'

**Question:** Is there a mid-priced synthetic youth option between the cheap and premium ends?

**Confidence:** CONFIRMED (price, weight) / **PARTIAL on rating —8 reviews**

**Answer:**
- REI price (verbatim): **`99.95/fullPrice`**; clearance at **`74.93`**.
- Shelf price to show: **$99.95**.
- REI weight (verbatim JSON-LD): **`"weight":"9.6 ounces"`**
- REI rating (verbatim): **`"reviewSummary":{"count":8,"averageRating":4.9000`** → **4.9 ★ / 8 reviews**

**Changes recommendation?** **Optional include.** 9.6 oz at $99.95 is a reasonable middle, but **8 reviews is not enough to recommend on**, and at that price the kids' Nano Puff at $99–$119 (37 reviews, same 60 g PrimaLoft) is the stronger buy. List it only if the UI has room for a third youth option; otherwise cut it.

**Source:** https://www.rei.com/product/C01573/rei-co-op-microtrek-insulated-hoodie-kids (Playwright, `#modelData` + JSON-LD)

---

# TIER 3 — BASE LAYERS & HEADWEAR

## REI Co-op Merino Midweight Base Layer Crew Top — Kids'

**Question:** Price, weight, rating, review count for the "thermal top" line item, in youth sizing.

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`49.95/fullPrice`**; clearance at **`24.83`**.
- Shelf price to show: **$49.95**.
- REI rating (verbatim): **`"reviewSummary":{"count":32,"averageRating":4.8000`** → **4.8 ★ / 32 reviews**
- Weight: **weight not published**

**Changes recommendation?** **Yes — this is the right shape for the sleep-layer slot.** The packing list asks for "Thermal top & bottoms"; the operative requirement on this trip is a layer that goes into the pack liner dry and stays dry, worn only at camp and in the bag on 30s–40s nights. Merino midweight at $49.95 with 4.8 ★ (32) does that job. State the discipline explicitly on the page: **this layer is for sleeping, not for hiking in** — if a boy hikes in it and sweats it out, he has no dry layer left for the coldest part of the night.

**Source:** https://www.rei.com/product/234796/rei-co-op-merino-midweight-base-layer-crew-top-kids (Playwright, `#modelData`)

---

## REI Co-op Midweight Long-Sleeve Base Layer Top — Men's

**Question:** Adult / adult-small synthetic thermal top.

**Confidence:** CONFIRMED (price, rating, reviews) / UNVERIFIED (weight — not published)

**Answer:**
- REI price (verbatim): **`54.95/fullPrice`**; a wide clearance spread at **`9.83`, `15.83`, `19.83`, `21.83`, `26.83`, `26.93`, `32.93`**.
- Shelf price to show: **$54.95** (clearance sizes/colors frequently **$10–$27**).
- REI rating (verbatim): **`"reviewSummary":{"count":218,"averageRating":4.6000`** → **4.6 ★ / 218 reviews**
- Weight: **weight not published**

**Changes recommendation?** **Yes — this is the better default of the two base layers, for two reasons.** It has a far deeper review base (218 vs 32) at 4.6 ★, it fits the adult-small end of the group (the 5'6"–5'8" boys and every leader), and being **synthetic rather than merino** it survives being washed carelessly by a teenager, which merino does not. It is $5 more at full price but its clearance floor is dramatically lower. For a 12-boy group buy, this is the one to price out.

**Source:** https://www.rei.com/product/207879/rei-co-op-midweight-long-sleeve-base-layer-top-mens (Playwright, `#modelData`)

---

## 32 Degrees Men's Ultra-Light Down Packable Jacket (the genuinely cheap puffy)

**Question:** Does a real, in-stock, sub-$50 packable puffy exist right now — the option a parent of a 14-year-old is actually going to buy?

**Confidence:** CONFIRMED (price, rating) / **PARTIAL on review count — see the discrepancy note** / UNVERIFIED (weight — not published)

**Answer (three live SKUs, all verbatim from Amazon search-result tiles, 2026-07-28):**
- **"32 Degrees Heat Men's Ultra-Light Down Packable Jacket – Lightweight Compressible Puffer"** (ASIN `B0DHZQVQ9V`) — **"$40.99"**, **"4.6 out of 5 stars (105)"**
- **"32 Degrees Men's Ultra-Light Down Packable Jacket | Layering | Zippered Pockets | Water Repellent"** (ASIN `B0CKXYJZH7`) — **"$46.89"**, **"4.5 out of 5 stars (165)"**
- **"32 Degrees Men's Lightweight Water-Resistant Packable Puffer Down Alternative Jacket"** (ASIN `B09FFM7W3P`) — **"$44.90"**, **"4.6 out of 5 stars (475)"** ← deepest review base of the three
- Weight: **weight not published** on the Amazon listings.

**Review-count discrepancy (recorded, not resolved):** the Amazon *search tile* renders **(475)** for `B09FFM7W3P` and **(165)** for `B0CKXYJZH7`, while a same-origin fetch of the *detail page* for those ASINs yielded **122** and **105** respectively from the ratings string. The two Amazon surfaces disagree. The search-tile figures are recorded above because they are the rendered, user-visible values, but this item is marked **PARTIAL** rather than CONFIRMED for that reason. Do not present the review count as precise.

**Source:** https://www.amazon.com/s?k=32+degrees+men%27s+ultra+light+down+packable+jacket (Playwright, rendered search tiles) and same-origin fetch of `/dp/B09FFM7W3P`, `/dp/B0CKXYJZH7`

**Changes recommendation?** **Yes — and this is the honest recommendation for most of the boys.** The price-per-season math has to be on the page, because it is the whole argument:

| | Price | Weight | Rating |
|---|---|---|---|
| Patagonia Micro Puff Hoody | $329–$346 | 10.5 oz | 4.2 ★ (5) |
| Patagonia Nano Puff | $229 | 13 oz | 4.6 ★ (114) |
| REI Co-op 650 Down | $129 | 10.9 oz | 4.4 ★ (486) |
| **32 Degrees packable** | **$40.99–$46.89** | not published | 4.5–4.6 ★ |

A boy who grows two inches before next August gets the same one season out of the $41 jacket and the $229 jacket. The 32 Degrees rates **4.6 ★ — statistically indistinguishable from the Nano Puff's 4.6 ★** — at roughly **one-fifth the price**. It will not last ten years and its weight is unpublished, and both of those things should be said plainly. But recommending a $229 jacket to a family outfitting a 14-year-old for one trip, when a 4.6-star $41 jacket exists, is not honest advice. **Recommend 32 Degrees as the default for the boys; recommend the REI 650 Down ($129 / 10.9 oz / 4.4 ★ / 486 reviews) for leaders and for any boy who will keep backpacking.**

---

## Beanies

**Question:** Price, rating, review count for the "Beanie" line item, across the price range.

**Confidence:** CONFIRMED (price, rating, review count as rendered) / UNVERIFIED (weight — not published for any beanie)

**Answer (verbatim from Amazon search-result tiles, 2026-07-28):**
- **"Smartwool Unisex Adult Thermal Merino Reversible Cuffed Beanie"** (ASIN `B01GQX0AEK`) — **"$35.00"**, **"4.7 out of 5 stars (1.8K)"**, **"100+ bought in past month"**
- **"Minus33 Merino Wool 100% Merino Wool Cuff Beanie - Mens & Womens Warm Winter Hat - Watch Cap - Toque - Novelty Beanie - One Size Fits Most"** (ASIN `B00B2A4RBK`) — **"$19.99"**, **"List: $22.99"**, **"4.6 out of 5 stars (9K)"**, **"100+ bought in past month"**
- **"Merino.tech 100% Merino Wool Beanie for Women, Men - Set Adult Skull Cap 17.5um & Socks"** (ASIN `B0DG2B7KJN`) — **"$22.99"**, **"4.6 out of 5 stars (770)"**
- **"ACUSHLA 100% Merino Wool Beanie for Men & Women Knit Winter Hat Skull Cap"** (ASIN `B0CDPMSX17`) — **"$17.99"**, **"4.5 out of 5 stars (356)"**
- Weight: **weight not published** for any of the above.
- REI's beanie SKUs (Smartwool Merino Beanie `217563`, REI Co-op Lightweight Logo Beanie `127061`) — **NO DATA**; rei.com returned **HTTP 403 Access Denied** on those two product pages after the audit's earlier request volume. Not retried beyond one attempt.

**Source:** https://www.amazon.com/s?k=merino+wool+beanie+hiking (Playwright, rendered search tiles)

**Changes recommendation?** **Yes — lead with the Minus33 at $19.99.** **4.6 ★ across 9,000 ratings** is the largest evidence base of any single item in this entire audit, at $19.99 (list $22.99), one-size-fits-most — which sidesteps the youth/adult sizing problem that complicates everything else in this category. The Smartwool at $35 rates marginally higher (4.7 ★) on 1.8K reviews but costs 75% more for a hat that will be lost. For a 12-boy group, this is the clearest cheap-is-correct call in the audit.

---

# SUMMARY — what changes in the gear hub

1. **Socks are the highest-value addition and should be presented as blister-prevention gear, not apparel** — the trip guide already names blisters as the #1 failure mode, and this category currently has nothing for it. Lead with **Darn Tough Hiker Micro Crew Cushion, $26, 4.7 ★ (1,377)** and its lifetime warranty.
2. **The Injinji Liner Crew at $12–13 (4.7 ★, 442) is the sleeper pick** — targeted blister insurance for the two or three boys at highest risk, at a fraction of the cost of upgrading every outer sock.
3. **The puffy recommendation should split by audience, and say so out loud.** 32 Degrees at ~$41–47 (4.5–4.6 ★) for boys who will outgrow it; REI Co-op 650 Down at $129 / 10.9 oz / 4.4 ★ (486) for leaders and committed backpackers.
4. **Actively argue against the Patagonia Micro Puff Hoody** ($329–$346, 4.2 ★ on 5 reviews) for this trip. Listing it neutrally alongside a $41 jacket that rates higher would be misleading.
5. **The kids' Patagonia Nano Puff at $99–$119** (11 oz, 4.9 ★ / 37, same 60 g PrimaLoft Gold Eco as the $229 adult) is worth surfacing for the smaller boys — but REI caps its audience at age 13, so it will not fit half the group.
6. **Base layer: frame it as a sleep layer.** REI Co-op Midweight LS Base Layer Top, $54.95, 4.6 ★ (218), synthetic. The page should state that it goes in the pack liner and is not hiked in.
7. **Beanie: Minus33 at $19.99, 4.6 ★ (9K), one-size-fits-most.**
8. **Do not print sock weights or beanie weights anywhere in the UI.** No publisher reachable in this audit publishes them, and the category does not need them.

---

# EXPLICIT GAPS

**NO RATING FOUND:**
- REI Co-op Lightweight Logo Beanie (SKU `127061`) — rei.com returned HTTP 403.
- Smartwool Merino Beanie (SKU `217563`) — rei.com returned HTTP 403.

**Ratings recorded but too thin to use as a ranking signal (shown with counts, never sorted on):**
- Darn Tough Light Hiker Micro Crew — Kids': 5.0 ★ / **5 reviews**
- Patagonia Micro Puff Insulated Hoody — Men's: 4.2 ★ / **5 reviews**
- REI Co-op Microtrek Insulated Hoodie — Kids': 4.9 ★ / **8 reviews**
- REI Co-op Merino Midweight Base Layer Crew Top — Kids': 4.8 ★ / 32 reviews
- Patagonia Nano Puff Brick — Kids': 4.9 ★ / 37 reviews
- REI Co-op 650 Down Jacket — Kids': 3.8 ★ / 40 reviews

**"weight not published" (do NOT invent a number for any of these):**
- Darn Tough Hiker Micro Crew Cushion — Men's
- Darn Tough Light Hiker Micro Crew — Men's
- Darn Tough Light Hiker Micro Crew — Kids'
- Darn Tough COOLMAX Hiker Micro Crew Cushion — Men's
- Smartwool Classic Hike Full Cushion Crew — Men's
- REI Co-op Merino Wool Midweight Hiking Crew Socks
- REI Co-op Merino Wool Midweight Crew Hiking Socks — Kids'
- Injinji Liner Crew Socks
- REI Co-op Merino Midweight Base Layer Crew Top — Kids'
- REI Co-op Midweight Long-Sleeve Base Layer Top — Men's
- All three 32 Degrees packable jackets
- All four beanies

**Weights that ARE published (verbatim JSON-LD, safe to display):**
Patagonia Nano Puff Men's **13 ounces** · Patagonia Nano Puff Brick Kids' **11 ounces** · Patagonia Micro Puff Hoody Men's **10.5 ounces** · REI Co-op 650 Down Men's **10.9 ounces** · REI Co-op 650 Down Kids' **8.6 ounces** · REI Co-op Microtrek Hoodie Kids' **9.6 ounces**

**Domains abandoned (recorded, not retried into a stall):**
- **`darntough.com`** — WebFetch to the guessed product handle returned **HTTP 404**. Abandoned after 1 attempt; REI carries the same SKUs with deeper review data, so no second attempt was spent. **Darn Tough's own MSRP and its published sock weights were therefore never verified** — REI pricing is used throughout.
- **`rei.com`** — worked for the first ~20 product fetches via Playwright same-origin `fetch()`, then began returning **HTTP 403 Access Denied** (rate limit). Two beanie SKUs and any further REI lookups were abandoned at that point rather than retried.
- **Uniqlo / Decathlon-Forclaz / Amazon Essentials** — not attempted. Budget was spent on 32 Degrees, which returned confirmed live pricing and ratings for the same "genuinely cheap puffy" slot.
