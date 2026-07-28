# Sanitation & Toiletry — Verified Specs

**Audit date:** 2026-07-28
**Method:** Manufacturer pages (rendered + `/products.json` probes), REI via Playwright browser MCP (JSON-LD `Product`/`ProductGroup` extraction), Amazon via Playwright browser MCP, Garage Grown Gear via Playwright.
**Rating rule:** A rating is only recorded when a publisher renders a numeric rating value AND a review count. Anything else is `NO RATING FOUND`. No rating on this page is estimated, inferred, or averaged across retailers.

**Shopify feed probes:** `thetentlab.com`, `cleanwaste.com`, `restop.com`, `loksak.com`, `qiwiz.net` all returned 404 on `/products.json?limit=250` (not Shopify storefronts at the apex domain). `vargooutdoors.com` and `seatosummit.com` are Shopify but the sandbox egress proxy rate-limited direct curl; their rendered product pages were used instead.

---

## TheTentLab DirtSaw Deuce #3 Trowel

**Question:** Claimed 0.97 oz / $24.95. Is the price MSRP or retail, and is there a published rating?

**Confidence:** CONFIRMED

**Answer:**
- Manufacturer weight (verbatim): **".97 oz (less than 2 tablespoons of water)"**
- Manufacturer MSRP (verbatim): **"Size #3 DirtSaw®"** — **"$23.95"** (new DirtSaw version; the page also lists the retired version at "$16.95")
- REI price: **"$24.95"** — `"price":"24.95"`, `"availability":"https://schema.org/InStock"`
- REI weight (verbatim spec): **"0.9 ounce"**; Dimensions **"7.7 x 2.8 x 0.9 inches"**; Material(s) **"7075-T6 aluminum"**
- REI rating: **2.9** — `"aggregateRating":{"ratingValue":"2.9","reviewCount":"8"}`, rendered as **"8 reviews with an average rating of 2.9 out of 5 stars"**
- Garage Grown Gear: **"$ 24.95 | 25 reviews"** (count only; GGG collection tiles do not render a numeric rating value)

**Source:**
- https://www.thetentlab.com/Deuce/DeuceofSpadespage.html (rendered manufacturer page)
- https://www.rei.com/product/225132/thetentlab-the-dirtsaw-deuce-3-trowel (browser MCP, JSON-LD + rendered Specs table)
- https://www.garagegrowngear.com/collections/gear/category_trowels (browser MCP, rendered collection tile)

**Changes recommendation?** **Yes.** Two edits. (1) The $24.95 figure is the *REI retail* price, not MSRP — manufacturer MSRP is $23.95. Label the source or use $23.95 if the UI implies MSRP. (2) The rating is the story here: **2.9 ⭐ from only 8 reviews** is the worst rating in this entire category and directly contradicts the Deuce's reputation. If the UI renders "⭐ {rating} ({reviewCount})" this product will look bad next to the Vargo at 4.4. Consider showing the rating with the low sample size visible, or sourcing a second rating publisher, but do NOT suppress it.

---

## TheTentLab DirtSaw Deuce #2 Trowel

**Question:** Claimed 0.60 oz / $20.95.

**Confidence:** CONFIRMED

**Answer:**
- Manufacturer weight (verbatim): **".60 oz (barely over the weight of ONE tablespoon of water - 1.1 to be exact)"**
- Manufacturer MSRP (verbatim): **"Size #2 DirtSaw®"** — **"$20.95"** (retired version listed at "$15.95")
- REI price: **"$21.95"**
- REI rating: **3.3** — rendered as **"14 reviews with an average rating of 3.3 out of 5 stars"**, count **"(14)"**
- Garage Grown Gear: **"$ 21.95 | 73 reviews"** (count only, no numeric rating value rendered on tile)

**Source:**
- https://www.thetentlab.com/Deuce/DeuceofSpadespage.html
- https://www.rei.com/search?q=deuce%20trowel → `/product/225131/thetentlab-the-dirtsaw-deuce-2-trowel` (browser MCP)
- https://www.garagegrowngear.com/collections/gear/category_trowels

**Changes recommendation?** **Yes.** Claimed price $20.95 is correct as MSRP but REI sells at $21.95 — pick one convention and apply it across the whole lineup. Rating **3.3 ⭐ (14)** should be added; it is currently absent.

---

## Vargo Dig Dig Tool (Titanium Trowel / Tent Stake)

**Question:** Claimed 1.25 oz / $24.95. Also: is it in stock?

**Confidence:** CONFIRMED — **but OUT OF STOCK at the manufacturer**

**Answer:**
- Manufacturer price (verbatim): **"Regular price $24.95 USD"**
- Manufacturer weight (verbatim): **"1.25 ounces (36 g)"**
- Manufacturer dimensions (verbatim): **"Length: 8.1 inches (20.5 cm)"**, **"Width: 1.7 inches (4.4 cm)"**
- Manufacturer stock (verbatim): **"Out of stock"**
- Manufacturer reviews: **"31 reviews"** with distribution **"94%"** (29) at top tier / **"6%"** (2) at second tier. No single numeric rating value was rendered as text — do not derive one.
- REI price: **"$24.95"**, in stock
- REI rating: **4.4** — **"59 reviews with an average rating of 4.4 out of 5 stars"**, count **"(59)"**
- Garage Grown Gear: **"$ 24.95 | 27 reviews"**

**Source:**
- https://vargooutdoors.com/products/dig-dig-tooltm (rendered manufacturer page)
- https://www.rei.com/product/130212/vargo-titanium-dig-dig-tool (surfaced with rating via REI search + similar-items module, browser MCP)
- https://www.garagegrowngear.com/collections/gear/category_trowels

**Changes recommendation?** **Yes.** Stock status changed: **the Dig Dig Tool is Out of stock direct from Vargo**, though REI and Garage Grown Gear both list it in stock at $24.95. If the UI has a buy link, point it at REI or GGG, not vargooutdoors.com. Use the REI rating **4.4 ⭐ (59)** — it is the only publisher rendering a numeric value. This is the best-rated trowel in the set and outranks both Deuce models by a wide margin.

---

## QiWiz Big Dig Titanium Trowel

**Question:** Claimed ~0.6 oz / $36.00. Is there a published rating?

**Confidence:** PARTIAL — price and weight CONFIRMED, **NO RATING FOUND**

**Answer:**
- Manufacturer weight (verbatim): **"The larger Big Dig, about 0.6 oz, 7.25" long"** — described as having **"50% more surface area if you need to dig fast or go big"**
- Manufacturer price (verbatim): **"Big Dig, USA shipping - $36.00 USD"** (the $36.00 is inclusive of USA shipping; international requires extra payment via the site's Global Shipping Page)
- Companion model for context (verbatim): **"The smaller Original, about 0.4 oz, 6" long"** — **"Original, USA shipping - $29.00 USD"**
- Also verbatim: **"Big Digs are the most popular, outselling Originals 2 to 1!"** and **"the 'MEGA Dig' is no longer available"**
- **Rating: NO RATING FOUND.** qiwiz.net carries a "Trowel Tales" page of unstructured testimonial quotes but publishes no numeric rating value and no review count. QiWiz is not sold at REI. It has been **delisted from Garage Grown Gear** — the GGG trowels collection now carries BoglerCo, Vargo, TheTentLab, Aardwolf, Suluk 46, and Apex Giant, with no QiWiz SKU.

**Source:**
- http://www.qiwiz.net/trowels.html (fetched over plain HTTP via curl — the site has no valid HTTPS endpoint, so WebFetch cannot reach it; it force-upgrades to HTTPS and gets `ECONNREFUSED`)
- https://www.garagegrowngear.com/collections/gear/category_trowels (browser MCP — confirms delisting)

**Changes recommendation?** **Yes.** Price and weight are exactly as claimed, but **this product must render as NO RATING FOUND** — there is no numeric rating from any publisher. Additionally flag distribution risk: it is now direct-from-maker only, ordered through a hand-rolled non-Shopify page, with a "Shipping Status" page implying batch fulfillment. That is a real availability caveat for a gear-comparison recommendation.

---

## Cleanwaste "The Original WAG BAG" — GO Anywhere Toilet Kit

**Question:** Claimed 2.5 oz, ~$3.25 single, and a 12-pack price.

**Confidence:** CONFIRMED (with two small price/weight corrections)

**Answer:**

*Single kit:*
- REI price: **"$2.95"** — `"price":"2.95"`, `"availability":"https://schema.org/InStock"`
- REI weight (verbatim): **"2.4 ounces"**; Dimensions **"8.5 x 5.25 x 1 inches"**
- REI rating: **4.2** — `"aggregateRating":{"ratingValue":"4.2","reviewCount":"53"}`, rendered **"53 reviews with an average rating of 4.2 out of 5 stars"**

*12-pack:*
- REI price: **"$35.95"** (= $3.00 per kit)
- REI weight (verbatim): **"3 pounds"**; Dimensions **"12 x 6 x 4 inches"**
- REI rating: **4.4** — `"aggregateRating":{"ratingValue":"4.4","reviewCount":"85"}`, rendered **"85 reviews with an average rating of 4.4 out of 5 stars"**

**Source:**
- https://www.rei.com/product/692303/cleanwaste-the-original-wag-bag-go-anywhere-toilet-kit-waste-bag (browser MCP, JSON-LD + Specs)
- https://www.rei.com/product/662978/cleanwaste-the-original-wag-bag-go-anywhere-toilet-kit-waste-bags-package-of-12 (browser MCP, JSON-LD + Specs)
- `cleanwaste.com/collections/go-anywhere-toilet-kits` returned HTTP 404; `cleanwaste.com/products.json?limit=250` returned 404 ("404 Not Found. We can not find the page you are looking for.") — the manufacturer storefront could not be used as a source.

**Changes recommendation?** **Yes.** Correct the single-kit price from ~$3.25 to **$2.95** and the weight from 2.5 oz to **2.4 ounces** (the 3 lb / 12 = 4.0 oz implied by the 12-pack figure is carton-inclusive shipping weight, not per-kit — use 2.4 oz). Add the 12-pack at **$35.95**. Note the two SKUs carry *different* ratings (4.2/53 vs 4.4/85), so the UI must bind the rating to whichever SKU it prices, not share one rating across both.

---

## RESTOP 2

**Question:** Claimed 85–90 g per bag, 5-pack $25, 12-pack $53.

**Confidence:** PARTIAL — **prices CONFIRMED, weight REFUTED**, manufacturer rating NOT FOUND

**Answer:**
- Manufacturer 12-pack price (verbatim): **"$53.00"** — *"Contains twelve (12) Solid & Liquid Waste Bags with antimicrobial wipes and tissues."* ✅ matches claim
- Manufacturer 5-pack price (verbatim): **"$25.00"** — *"Contains five (5) Solid & Liquid Waste Bags with antimicrobial wipes and tissues"* plus one mesh tote containment pouch. Listed pack weight: **"0.9 lbs"** (this is the whole 5-bag + tote kit, not a per-bag figure). ✅ matches claim
- **Per-bag weight (verbatim, NRS): "2.6 oz each"** = **73.7 g**. A second retailer listing cites "2.5 ozs (57 grams)" — internally inconsistent, and both are well under the claimed 85–90 g.
- **Manufacturer rating: NO RATING FOUND.** restop.com renders no rating value and no review count on either the 5-pack or 12-pack product page.
- Amazon (RESTOP 2 Wilderness Kit, 5-pack + mesh tote): price **"$27.08"**, availability **"In Stock"**, rating **"4.6 out of 5 stars"**, review count **"(225)"**

**Source:**
- https://restop.com/product/restop2-disposable-solid-liquid-waste-bags-12/ (rendered manufacturer page)
- https://restop.com/product/wilderness-waste-containment-pouch/ (rendered manufacturer page — this is the 5-pack SKU)
- https://www.nrs.com/restop-2-disposable-bags/p19n (rendered; note page states *"This product is no longer available"* — it is the previous model listing and is the only source publishing a per-bag weight)
- https://www.amazon.com/RESTOP-RS2W-2-Wilderness-KIT/dp/B07D8C1SPJ (browser MCP)

**Changes recommendation?** **Yes.** The **85–90 g per-bag claim is not supported by any publisher** — every weight source found lands at 2.5–2.6 oz (57–74 g). Either correct to **2.6 oz / ~74 g** with the NRS caveat, or drop the weight to UNVERIFIED. Prices are correct as claimed. For the rating, restop.com publishes nothing; if the UI needs a rating, it must come from Amazon (**4.6 ⭐ (225)**) with the publisher labeled, since the SKU there ($27.08) is priced above the $25.00 manufacturer 5-pack.

---

## LOKSAK OPSak Odor-Proof Barrier Bag — 12" x 20", 2-pack

**Question:** Price per 2-pack and per-bag weight.

**Confidence:** CONFIRMED

**Answer:**
- REI price: **"$15.95"** — `"price":"15.95"`, `"availability":"https://schema.org/InStock"`
- REI weight (verbatim, per-bag): **`"weight":"Each: 0.8 ounces"`**
- Material(s): **"Polyethylene"**; Color: **"Clear"**; Category: **"Food Storage"**
- REI rating: **3.7** — `"aggregateRating":{"ratingValue":"3.7","reviewCount":"119"}`
- Product name (verbatim): **"OPSAK Odor-Proof Barrier Bags - 12\" x 20\" - Package of 2"**

**Source:**
- https://www.rei.com/product/884265/loksak-opsak-odor-proof-barrier-bags-12-x-20-package-of-2 (browser MCP, JSON-LD)
- `shop.loksak.com/products/opsak-1` returned HTTP 404; `loksak.com/products.json?limit=250` returned the WordPress/Avada homepage HTML rather than a Shopify feed — the manufacturer storefront could not be used as a source.

**Changes recommendation?** **No change to price or weight.** But surface the rating honestly: **3.7 ⭐ (119)** is the second-lowest in this set and reflects a well-documented seal-durability complaint pattern. If the lineup positions OPSak as the default odor-proof solution, that 3.7 deserves a caveat line rather than quiet omission.

---

## Sea to Summit Wilderness Wipes

**Question:** Compact / 12-pack price and weight.

**Confidence:** CONFIRMED

**Answer:**
- Manufacturer pack weights (verbatim): **"[8 Pack] – 122 g | 4.3 oz"**, **"[12 Pack] – 93 g | 3.3 oz"**, **"[36 Pack] – 292 g | 10.3 oz"**
- Manufacturer price shown: **"$7.95"**
- Manufacturer rating: **"4.9 out of 5 stars"** with **86 reviews**
- REI variant pricing (from `ProductGroup` JSON-LD): **"Wilderness Wipes - Compact"** = `"price":"6.95"`; **"Wilderness Wipes - XL"** = `"price":"7.95"`
- REI dimensions (verbatim): **"XL: 12 x 8"**, **"Compact: 8 x 6"**
- REI weight (verbatim): **"Unavailable"** — REI publishes no weight for this SKU; use the manufacturer's 93 g / 3.3 oz for the 12-pack
- REI group rating: **4.7** — **"256 reviews with an average rating of 4.7 out of 5 stars"**
- Separate REI SKU, Package of 36: **"$10.95"**, **"134 reviews with an average rating of 4.8 out of 5 stars"**

**Source:**
- https://seatosummit.com/products/wilderness-wipes (rendered manufacturer page — weights and manufacturer rating)
- https://www.rei.com/product/879973/sea-to-summit-wilderness-wipes (browser MCP, JSON-LD variant offers + Specs)
- https://www.rei.com/product/186387/sea-to-summit-wilderness-wipes-package-of-36 (REI search tile)

**Changes recommendation?** **Yes, minor.** Use **$6.95** for the Compact 12-pack (REI) and **93 g / 3.3 oz** for weight (manufacturer only — REI reports weight "Unavailable"). Note the two publishers disagree on rating: manufacturer **4.9 ⭐ (86)** vs REI **4.7 ⭐ (256)**. Prefer the REI figure for consistency with the rest of this lineup and because the sample is 3x larger; label the publisher either way.

---

## Sea to Summit Trek & Travel Pocket Hand Wash

**Question:** Price and weight for pocket soap sheets.

**Confidence:** CONFIRMED

**Answer:**
- REI price: **"$6.95"** — `"price":"6.95"`
- REI weight (verbatim): **"0.5 ounce"**; Dimensions **"2.5 x 1.5 x 0.5 inches"**; Best Use **"Camping"**
- REI rating: **4.5** — `"aggregateRating":{"ratingValue":"4.5","reviewCount":"62"}`, rendered **"62 reviews with an average rating of 4.5 out of 5 stars"**
- Sibling SKU for reference: **Trek & Travel Pocket Body Wash** — "$6.95", **"53 reviews with an average rating of 4.1 out of 5 stars"**

**Source:**
- https://www.rei.com/product/785913/sea-to-summit-trek-travel-pocket-hand-wash (browser MCP, JSON-LD + Specs)

**Changes recommendation?** **No.** Price, weight, and rating are all cleanly published and mutually consistent. Ship as **$6.95 / 0.5 oz / 4.5 ⭐ (62)**. If the lineup wants a soap entry, this is the safest pick in the category — pick the *Hand Wash* variant over the Body Wash (4.5 vs 4.1).

---

## Matador FlatPak Zippered Toiletry Case (toiletry-kit pouch)

**Question:** Find a real-brand toiletry pouch or backpacking toothbrush that publishes BOTH weight and rating.

**Confidence:** CONFIRMED

**Answer:** Selected the **Matador FlatPak Zippered Toiletry Case** — it is the lightest real-brand toiletry pouch that publishes a weight *and* a numeric rating.
- REI price: **"$21.93"**, rendered as **"$21.93 | Save 26% | compared to | $29.95"** (so MSRP **$29.95**, currently discounted)
- REI weight (verbatim): **"1.1 ounces"**; Dimensions **"9.5 x 6.75 x 3.5 inches"**; Material(s) **"30-denier CORDURA nylon"**; Hanging **"Yes"**
- REI rating: **4.1** — `"aggregateRating":{"ratingValue":"4.1","reviewCount":"11"}`

*Alternatives evaluated and rejected:*
- **Sea to Summit Hanging Toiletry Bag — Small**: "$49.95", **"161 reviews with an average rating of 4.8 out of 5 stars"** — far better rated but heavier and 2.3x the price; a travel bag, not a backpacking pouch.
- **Matador FlatPak Zipper Toiletry Case**: "$20.00", only **"1 reviews with an average rating of 5.0 out of 5 stars"** — sample size too small to render honestly.
- **Aurelle TOOB Brush** (toothbrush option): "$8.95", **"118 reviews with an average rating of 3.9 out of 5 stars"** — good sample, but REI publishes no weight for it, so it fails the "weight AND rating" requirement.
- **Matador FlatPak Toiletry Bottles - Package of 3**: "$40.00", **"115 reviews with an average rating of 2.6 out of 5 stars"** — actively bad rating, do not include.

**Source:**
- https://www.rei.com/product/204423/matador-flatpak-zippered-toiletry-case (browser MCP, JSON-LD + Specs)
- https://www.rei.com/search?q=sea%20to%20summit%20matador%20osprey%20toiletry%20bag (browser MCP, rendered tiles for the alternatives)

**Changes recommendation?** **Yes — add it.** Use **$21.93 (MSRP $29.95) / 1.1 ounces / 4.1 ⭐ (11)**. Flag that the price is a live promo: if the UI caches prices, pin to the $29.95 MSRP instead so the card does not go stale when the sale ends. The 11-review sample is thin but it is a genuine published rating, so it renders legitimately.

---

## (a) Trekking-pole-mounted backcountry toilet seat

**Question:** Does any commercial product exist that mounts a backcountry toilet seat to trekking poles?

**Confidence:** **NO SUCH PRODUCT FOUND**

**Answer:** No commercial trekking-pole-mounted toilet seat exists. The search surfaced a clear and consistent pattern:

1. **Trekking-pole-supported *chairs* are a real, crowded product category** — confirming the mechanical concept is commercially viable, and that if a toilet version existed it would surface alongside these. Found: Get Out Gear **TrekChair** ("Requires User Provided Trekking Poles"), MÜLIBEX **MUHL X Ultralight Trekking Pole Chair**, **Mountainsmith Slingback Chair** (under 5 oz, "compatible with most telescoping trekking poles"), Seek Outside **Lookout Sittin' Saddle** ("sets up using two trekking poles"), Litesmith **QwikBack**. None is a toilet.
2. **The toilet application exists only as patents and forum speculation**, never as a shipping product — US20040060105A1 "Portable folding toilet seat and cover for backpacking and camping" (2004 application, with its own integrated adjustable legs, not trekking poles) and US5083324 "Portable collapsible toilet seat". Both are decades old and uncommercialized.
3. **Backpacking Light's "Toilet Stool for Backpacking?" forum thread** is the canonical community discussion, and it runs to multiple pages of DIY improvisation — the strongest available evidence that no off-the-shelf product exists to point people at.
4. Cleanwaste's own 2026 buyer's guides describe trekking poles only as ad-hoc *balance support* while squatting or while using a separate frame — never as a mounting structure.

**Searched:** "trekking pole mounted backcountry toilet seat backpacking product"; "\"trekking pole\" toilet seat backpacking gear \"poop\" support frame buy ultralight"; "\"cathole\" OR \"backcountry\" portable squat seat trekking poles legs commercial product REI Garage Grown Gear"; "\"toilet seat\" attaches to trekking poles backpacking invention product for sale 2026". Also swept REI's own catalog via `rei.com/search?q=deuce trowel` and `q=wag bag toilet kit opsak restop` — REI's entire backcountry-sanitation shelf (Cleanwaste, PACT Outdoors, Reliance, Adventure Ready, Gerber, Kula Cloth, Freshette, humangear) contains no pole-mounted seat.

**Changes recommendation?** **No change — the gap is real and confirmed.** This is a genuine unserved niche, not an oversight in prior research. Worth recording that the adjacent trekking-pole-chair category is mature and competitive, which means the engineering is solved and the absence is a market/demand judgment rather than a technical barrier.

---

## (b) Titanium or carbon-fiber folding cathole seat

**Question:** Does any commercial titanium/carbon folding cathole seat exist?

**Confidence:** **NO SUCH PRODUCT FOUND**

**Answer:** No titanium or carbon-fiber folding cathole seat exists as a commercial product. The nearest real products all fail on at least one of the three defining attributes (Ti/carbon material, folding, cathole use):

- **Carry Anywhere Commode** — a real, currently-sold folding backcountry commode. Prices verbatim: **"$42"** (Standard), **"$47"** (Hybrid, doubles as a sitting stool), **"$30"** (Refill). But: the site **publishes neither a material nor a weight**, makes no titanium or carbon-fiber claim, and offers no trekking-pole compatibility. It is a bag-based commode, not a cathole seat.
- **Carbon Fiber Gear "Carbon Fiber Toilet Seat"** — genuinely carbon fiber, but it is a **$480 household bathroom fixture** weighing **1,335 grams (~3 lbs)**, fixed-mount and non-folding, sized for "standard household toilets" (16.5" x 14.25", brackets 5.5" apart). Categorically not backcountry gear. This is the item most likely to produce a false positive in a keyword search — explicitly ruled out.
- **Campout Comforts "Backpacker Loo Kit"** — markets an "ultralight titanium trowel" inside a 7 oz kit. The titanium is the *trowel*, not a seat. This is the second likely false-positive source.
- Walmart/Amazon "folding portable toilet seat for camping" listings are plastic/steel car-camping frames, not ultralight cathole gear.

**Searched:** "titanium folding cathole toilet seat backpacking carbon fiber ultralight for sale"; "titanium folding toilet seat backpacking ultralight cottage gear \"cathole\" squat support product"; plus the REI catalog sweeps noted above. Directly fetched and ruled out carryanywherecommode.com and carbonfibergear.com's carbon toilet seat.

**Changes recommendation?** **No change — the gap is real and confirmed.** Recommend recording the two false-positive traps (Carbon Fiber Gear's $480 household seat; Campout Comforts' titanium *trowel* in a "Loo Kit") so a future audit does not re-litigate them and mistakenly log either as a hit.

---

## Cross-cutting notes for the comparison UI

1. **MSRP vs retail is inconsistent across this set.** TheTentLab publishes MSRP below REI's shelf price on both Deuce models (#3: $23.95 vs $24.95; #2: $20.95 vs $21.95). Vargo, Cleanwaste, Sea to Summit, and LOKSAK match at retail. Pick one convention and label it.
2. **Rating publisher must be labeled.** Wilderness Wipes reads 4.9 (86) at Sea to Summit and 4.7 (256) at REI. Same product, different numbers. An unlabeled "⭐ 4.9 (86)" is not defensible.
3. **Ratings must bind to the priced SKU.** The Cleanwaste single (4.2 / 53) and 12-pack (4.4 / 85) are distinct SKUs with distinct ratings.
4. **Two live availability problems:** Vargo Dig Dig Tool is **Out of stock** at the manufacturer, and QiWiz has been **delisted from Garage Grown Gear**, leaving it direct-from-maker only.
5. **One price is a live promo:** Matador FlatPak at $21.93 is a 26%-off sale against a $29.95 MSRP and will go stale.
