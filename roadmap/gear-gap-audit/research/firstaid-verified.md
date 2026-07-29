# First Aid & Blister Care — Verified Specs

**Audit date:** 2026-07-28
**Trip context:** 4-day Sawtooth Wilderness (Idaho), August 2026, ~12 teenage boys plus adult leaders, zero cell service, satellite communicator only. Trip guide: blisters are "the #1 thing that ruins this for a boy."
**Method:** REI and Amazon via Playwright browser MCP (JSON-LD `Product` extraction plus rendered spec tables and rating strings). Manufacturer pages where they resolve.
**Rating rule:** A rating is recorded only when a publisher renders a numeric rating value AND a review count on the same page. Anything else is `NO RATING FOUND`. Nothing on this page is estimated, inferred, or averaged across retailers.

**Blocked / no-data domains (recorded, not retried):** `walmart.com` (CAPTCHA interstitial — "Robot or human?"), `engoblisterprevention.com` (DNS `ENOTFOUND`), `adventuremedicalkits.com/mountain-series-explorer.html` (HTTP 404), direct `curl` to `rei.com` (egress proxy refused, exit 92), `WebFetch` to `amazon.com/dp/*` (HTTP 500). Playwright browser MCP was used instead wherever a domain rendered.

---

## Adventure Medical Kits Mountain Series Explorer Medical Kit

**Question:** Price, weight, rating, review count. Is it sized for a 12-person, 4-day, remote group?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim JSON-LD): **`"price":"86.50"`**, `"priceCurrency":"USD"`, `"availability":"https://schema.org/InStock"`
- REI weight (verbatim JSON-LD + rendered Specs table): **`"weight":"1 lb. 6.4 oz."`** (= 22.4 oz)
- REI rating (verbatim JSON-LD): **`"aggregateRating":{"ratingValue":"4.6","reviewCount":"53"}`**; rendered as **"View the 53 reviews with an average rating of 4.6 out of 5 stars"**
- REI group/trip sizing (verbatim description): **"tailored to smaller groups (1–4 people) on extended camping trips (1–7 days) or trail adventures"**
- SKU `113008`, GTIN `0707708010057`, color `"Blue"`

**Source:**
- https://www.rei.com/product/113008/adventure-medical-kits-mountain-series-explorer-medical-kit (Playwright browser MCP, JSON-LD + rendered)

**Changes recommendation?** **Yes — this is the headline finding for Tier 2.** The Explorer is manufacturer-rated for **1–4 people**, not 12. For ~12 boys plus leaders on a 4-day remote trip this kit is undersized by roughly 3x. Either (a) label it clearly as a *per-patrol* kit and carry three, or (b) move up to the Guide. Do not present the Explorer as "the group kit" for this trip. Price and rating are solid and should be shown as $86.50 / 4.6 ⭐ (53).

---

## Adventure Medical Kits Mountain Series Guide Medical Kit

**Question:** Price, weight, rating, review count. Is this the right size for ~12 people, 4 days, remote?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim listing tile): **"$149.95"**
- REI weight (verbatim JSON-LD): **`"weight":"2 lbs. 2.4 oz."`** (= 34.4 oz)
- REI rating (verbatim JSON-LD): **`"aggregateRating":{"ratingValue":"4.0","reviewCount":"8"}`**; rendered as **"View the 8 reviews with an average rating of 4.0 out of 5 stars"**
- REI group/trip sizing (verbatim description): **"With supplies to meet the needs of 7 people headed into the backcountry for up to 2 weeks, the Adventure Medical Kits Mountain-Series Guide medical kit is essential for leading group excursions."**
- SKU `113009`, GTIN `0707708010071`

**Source:**
- https://www.rei.com/product/113009/adventure-medical-kits-mountain-series-guide-medical-kit (Playwright, JSON-LD)
- https://www.rei.com/b/adventure-medical-kits/f/pl-mountain-series (Playwright, rendered listing tile — price)

**Changes recommendation?** **Yes.** This is the closest off-the-shelf match to the trip profile, but note the honest gap: it is rated for **7 people / up to 2 weeks**, and the group is ~12 boys plus leaders. For 4 days that trades out roughly evenly (7 people × 14 days ≈ 98 person-days vs. ~14 people × 4 days ≈ 56 person-days), so the Guide is defensible as the single group kit *provided* blister consumables are supplemented separately — see the Tier 1 findings. Show the 4.0 ⭐ (8) rating with its low sample size visible; do not suppress it, but do not let 8 reviews outrank the Explorer's 53.

---

## Adventure Medical Kits Mountain Series Hiker Medical Kit

**Question:** Price, weight, rating, review count. Viable as a per-patrol or leader-carried kit?

**Confidence:** CONFIRMED

**Answer:**
- REI price (verbatim listing tile): **"$34.50"**
- REI weight (verbatim JSON-LD): **`"weight":"7.2 ounces"`**
- REI rating (verbatim JSON-LD): **`"aggregateRating":{"ratingValue":"4.6","reviewCount":"129"}`**; rendered as **"129 reviews with an average rating of 4.6 out of 5 stars"**; REI badges it **"TOP RATED"**
- REI group/trip sizing (verbatim description): **"equipped with carefully selected supplies tailored to meet any basic first-aid needs you and a friend might experience on a 2-day adventure"**
- SKU `113006`

**Source:**
- https://www.rei.com/product/113006/adventure-medical-kits-mountain-series-hiker-medical-kit (Playwright same-origin fetch, JSON-LD)
- https://www.rei.com/b/adventure-medical-kits/f/pl-mountain-series (Playwright, rendered listing tile)

**Changes recommendation?** **Yes.** The Hiker is the best-rated kit in the whole Mountain Series (4.6 ⭐ from 129 reviews — the largest sample of any AMK kit at REI) and the lightest at 7.2 oz, but it is rated for **2 people / 2 days**. It is not a group kit. Its correct role in this trip is a *satellite* kit — one per patrol or one per adult leader — not the primary. If the UI currently lists it as a group option, re-label it.

---

## Adventure Medical Kits Mountain Series — full lineup context (captured for comparison)

**Question:** What else is in the Mountain Series, and where do the audited kits sit?

**Confidence:** CONFIRMED

**Answer (all verbatim from the REI Mountain Series listing page):**

| Kit | Price | Rating | Reviews |
|---|---|---|---|
| Mountain Series Hiker Medical Kit | "$34.50" | 4.6 | (129) — "TOP RATED" |
| Mountain Series Backpacker Medical Kit | "$57.50" | 4.4 | (70) |
| Mountain Series Explorer Medical Kit | "$86.50" | 4.6 | (53) — "TOP RATED" |
| Mountain Series Guide Medical Kit | "$149.95" | 4.0 | (8) |
| Mountain Series Mountaineer Medical Kit | "$288.50" | 3.7 | (3) |

REI reports **"(5 products)"** in the Mountain Series line.

**Source:** https://www.rei.com/b/adventure-medical-kits/f/pl-mountain-series (Playwright, rendered)

**Changes recommendation?** Informational. The Backpacker at $57.50 / 4.4 ⭐ (70) sits between Explorer and Hiker and was not on the brief; flag it as a candidate if budget matters more than group sizing.

---

# TIER 1 — Blister care

## Leukotape P (BSN Medical) — 1.5 in x 15 yd rigid strapping tape

**Question:** Price, weight, rating, review count for the thru-hiker-standard blister tape.

**Confidence:** CONFIRMED

**Answer:**
- Amazon title (verbatim): **"Leukotape P Adhesive Strapping Tape – for Sports Injuries, Strains and Sprains - 1.5 in x 15 yds, Tan, (1 Roll) | Tan, For Sprains and Injury Prevention"**
- Price, 1 roll (verbatim): **"$12.82"**; Amazon badges it **"Overall Pick"** and **"#1 Top Rated"**, **"10K+ bought in past month"**
- Rating (verbatim): **"4.7 out of 5 stars"**, **"(8.6K)"** — plus the badge **"Positively reviewed for tape quality"**
- Weight (verbatim, Amazon product detail): **"Item Weight 91 g"** (= 3.21 oz for a single 1.5 in x 15 yd roll)
- Multi-packs (verbatim): **"Leukotape P Sports Tape /1 1/2\" X 15 Yd - (Pack of 3)"** — **"$32.78"** (**"$10.93/count"**), **"4.7 out of 5 stars"**, **"(293)"**; **"BSN Medical Leukotape P Sports Tape, 1 1/2 Inch x 15 Yard(Pack of 5)"** — **"$48.00"** (**"$0.21/feet"**), **"4.7 out of 5 stars"**, **"(167)"**, listed against **"Typical: $50.46"**

**Source:**
- https://www.amazon.com/s?k=Leukotape+P+sports+tape (Playwright browser MCP, rendered search result cards)
- https://www.amazon.com/dp/B0FW13Z8L1 (Playwright same-origin fetch, product detail table)
- Cross-check attempt at walmart.com blocked by CAPTCHA — NO DATA recorded for Walmart.

**Changes recommendation?** **Yes — this should be the #1 item in the blister section.** 4.7 ⭐ from 8.6K reviews is the strongest rating/volume combination in this entire audit, at $12.82 and 91 g. Given the trip guide's "#1 thing that ruins this for a boy," one roll is not enough for ~14 people over 4 days: buy the **3-pack at $32.78** ($10.93/roll) and pre-cut strips at home. Note for the UI: Leukotape is a *prevention/anchor* tape, not a wound dressing — pair it with benzoin (below), which is what makes it hold on sweaty teenage feet.

---

## Moleskin — Dr. Scholl's

**Question:** Price, weight, rating, review count.

**Confidence:** PARTIAL — price/rating/reviews CONFIRMED; **weight not published** on any responding source.

**Answer:**
- Best-selling single roll (verbatim): **"Dr. Scholl's Moleskin Padding ROLL, 1 roll // Thin, Flexible Cushioning & Pain Relief - Cut to Any Size - Doctor Recommended - 24 Inches X 4 5/8 Inches Cushioned Insole"** — **"$9.92"** (**"$9.92/count"**), **"4.6 out of 5 stars"**, **"(12K)"**, **"9K+ bought in past month"**
- 2-roll pack (verbatim): **"Dr. Scholl's Moleskin 2 Rolls Comfort Insole"** — **"$15.22"** (**"$7.61/count"**), **"4.6 out of 5 stars"**, **"(546)"**; Amazon **"Overall Pick"**
- "Moleskin Plus" 4-pack (verbatim): **"Dr. Scholl's Moleskin Plus Padding Roll 1 Each (Pack of 4) 1 Count (Pack of 4)"** — **"$26.91"** (**"$6.73/count"**), **"4.2 out of 5 stars"**, **"(152)"**, **"Only 4 left in stock - order soon."**
- Thicker foam variant (verbatim): **"Dr. Scholls Molefoam Padding, 2 each (Pack of 2)"** — **"$9.79"** (**"$2.45/count"**), **"4.6 out of 5 stars"**, **"(347)"**
- **Weight: not published.** No responding retailer or manufacturer page rendered an item weight for the moleskin rolls. **Weight not published.**

**Source:** https://www.amazon.com/s?k=Dr%20Scholl's%20Moleskin%20Plus%20Padding%20Roll (Playwright same-origin fetch, rendered search result cards)

**Changes recommendation?** **Yes, two.** (1) Use the **plain "Moleskin Padding ROLL" at $9.92 / 4.6 ⭐ (12K)** as the listed SKU, not "Moleskin Plus" — the Plus 4-pack rates lower (4.2 ⭐, 152) and is nearly low-stock. (2) If the UI shows a weight column, this row must read **"weight not published"** — do not fill it with an estimate. Also worth a UI note: moleskin is the *treatment* for a hot spot that already formed; Leukotape is the prevention. Both belong in the kit for a 4-day trip with no bail-out option.

---

## Blister cushions — Compeed vs. Band-Aid Hydro Seal

**Question:** Price, weight, rating, review count for hydrocolloid blister cushions.

**Confidence:** PARTIAL — price/rating/reviews CONFIRMED; **weight not published**.

**Answer — Compeed:**
- (verbatim) **"Compeed Advanced Blister Care Pads, Hydrocolloid Gel Cushions for Instant Pain Relief and Faster Healing, Mixed Sizes, 10 Count (2 Packs)"** — **"$21.62"** (**"$1.08/count"**), **"4.7 out of 5 stars"**, **"(2.2K)"**, **"4K+ bought in past month"**; Amazon **"Overall Pick"**
- (verbatim) **"Compeed Advanced Blister Cusions, Mixed Sizes, 10 Count"** (single pack) — **"$9.99"** (**"$1.00/count"**), **"4.6 out of 5 stars"**, **"(111)"**
- (verbatim) **"Compeed Advanced Blister Care Pads ... Sports Medium, 8 Count (2 Packs)"** — **"$16.20"** (**"$1.01/count"**), **"4.7 out of 5 stars"**, **"(544)"**

**Answer — Band-Aid Hydro Seal / Pro Heal:**
- (verbatim) **"Band-Aid Brand Pro Heal 5 Day Protect Hydrocolloid Blister Bandages, 6 Ct | 100% Waterproof, Advanced Healing for Wound Care, Extra Cushion for Blister Protection"** — **"$5.48"** (**"$0.91/count"**), **"4.6 out of 5 stars"**, **"(14K)"**, **"20K+ bought in past month"**
- (verbatim) **"Band-Aid Brand Pro Heal 5 Day Protect Hydrocolloid Bandages, Assorted, 14ct"** — **"$12.99"**, **"4.6 out of 5 stars"**; Amazon **"Overall Pick"**
- (verbatim) **"Band-Aid Brand HYDRO SEAL® BLISTER HEEL CUSHIONS, 6 COUNT 6 Count (Pack of 2)"** — **"No featured offers available"**, **"$15.84"**, **"(7 new offers)"**, **"4.5 out of 5 stars"**, **"(32)"** — **the original Hydro Seal branding appears to be transitioning to "Pro Heal"; the Hydro Seal heel SKU has no featured offer.**
- Budget cross-shop (verbatim): **"Amazon Basic Care Extreme Hydrocolloid Gel Blister Cushion Bandages ... 1.65 in x 2.67 in, 10 ct"** — **"$7.38"** (**"$0.74/count"**), **"4.5 out of 5 stars"**, **"(3.2K)"**, **"Limited time deal"**
- **Weight: not published** for any of these SKUs on the responding pages. **Weight not published.**

**Source:**
- https://www.amazon.com/s?k=Compeed+blister+cushions (Playwright same-origin fetch)
- https://www.amazon.com/s?k=Band-Aid+Brand+Hydro+Seal+Blister+Cushions (Playwright same-origin fetch)

**Changes recommendation?** **Yes — change the listed SKU.** If the UI currently lists "Band-Aid Hydro Seal," that exact product is showing **"No featured offers available"** and only 4.5 ⭐ (32). Replace it with **Band-Aid Pro Heal 6 Ct at $5.48 / 4.6 ⭐ (14K)** — same hydrocolloid, current branding, 14K reviews, and the cheapest per-cushion of any option here. Keep **Compeed 10 Count single pack at $9.99 / 4.6 ⭐ (111)** as the premium alternative rather than the 2-pack, unless buying for the whole troop, in which case the 2-pack at $21.62 / 4.7 ⭐ (2.2K) is the better rating. Weight column must read "weight not published."

---

## Tincture of benzoin

**Question:** Price, weight, rating, review count. Which format for a backcountry kit?

**Confidence:** CONFIRMED (price/rating/reviews); **weight not published**.

**Answer:**
- Single-use ampules (verbatim): **"3M Steri-Strip Compound Benzoin Tincture, 2/3cc Vial, 40/Bx, 3MC1544"** — **"$34.31"** (**"$0.86/count"**), **"4.7 out of 5 stars"**, **"(60)"**, **"100+ bought in past month"**; Amazon **"Overall Pick"**
- Same product, alternate listing (verbatim): **"7774526 PT# C1544 Steri-Strip Compound of Benzoin Tincture 2/3mL 40/Bx Made by 3M Medical Products"** — **"$33.53"** (**"$0.84/count"**), **"5.0 out of 5 stars"**, **"(32)"**
- Bulk bottle (verbatim): **"Tincture Of Benzoin w/Applicator Brush Cap, 4 oz. [Bottle]"** — **"$21.58"**, **"4.6 out of 5 stars"**, **"(243)"**, **"300+ bought in past month"**; also **"More Buying Choices $19.65 (8 new offers)"**
- **Weight: not published** on the responding listings (the 4 oz bottle states fluid volume, not shipped weight). **Weight not published.**

**Source:** https://www.amazon.com/s?k=tincture+of+benzoin+swabsticks (Playwright same-origin fetch)

**Changes recommendation?** **Yes.** For this trip take the **40-count single-use vials at $33.53–$34.31**, not the 4 oz bottle. A glass bottle of benzoin in a pack is a spill risk and it is heavier than the group needs; the vials are one-per-application, cannot leak into the food bag, and 40 covers ~14 people generously over 4 days. Flag the two listings as the *same 3M product* — the "5.0 ⭐ (32)" listing is a reseller of the same box as the "4.7 ⭐ (60)" listing, so do not present them as competing options. Weight column: "weight not published."

---

## ENGO Blister Prevention Patches

**Question:** Price, weight, rating, review count. (Applied inside the shoe, not on the foot.)

**Confidence:** CONFIRMED (price/rating/reviews); **weight not published**.

**Answer:**
- (verbatim) **"ENGO Blister Prevention Patch | Oval 6 Pack | Hot Spot Relief - Shoe Cleat | Friction Reduction Technology; long lasting performance; athletic & footwear use; Self-Adhesive, Ultra-Thin, Fits Curves"** — **"$16.99"** (**"$2.83/count"**), **"4.3 out of 5 stars"**, **"(1.8K)"**, **"500+ bought in past month"**, **"Options: 3 sizes"**, badged **"Small Business"**
- (verbatim) **"ENGO Large Oval Blister Prevention Patches | 4 Pack | Hot Spot Relief | Friction Reduction Technology; athletic & footwear use; long lasting performance; Extra Coverage, Lightweight"** — **"$13.99"** (**"$3.50/count"**), **"4.3 out of 5 stars"**, **"(1.8K)"**; Amazon **"Overall Pick"**
- (verbatim) **"Heel Blister Patches (2 Patches) | Tennis Shoes, Athletes, Runners, High Heels, Dress Shoes | Friction Reduction Technology; hot spot prevention; long lasting performance"** — **"4.0 out of 5 stars"**, **"(1.2K)"**, **"200+ bought in past month"**
- **Weight: not published.** **Weight not published.**
- Manufacturer site `engoblisterprevention.com` did **not resolve** (DNS `ENOTFOUND`) — NO DATA from the brand site.

**Source:** https://www.amazon.com/s?k=ENGO+Blister+Prevention+Patch+Oval+6+Pack (Playwright same-origin fetch)

**Changes recommendation?** **Yes, with a caveat.** ENGO is the lowest-rated Tier 1 item at **4.3 ⭐** (and the heel variant at 4.0 ⭐), and at **$2.83–$3.50 per patch** it is by far the most expensive per-application blister measure here. It is also the only *preventive-by-modifying-the-shoe* option, which is genuinely different from tape. Recommendation for the UI: list it as a **secondary/optional** item aimed at boys with a known recurring hot spot, applied at home *before* the trip — not as a field-repair item, because sticking a patch inside a sweaty boot on day 3 will not adhere. Do not put it above Leukotape in the ordering.

---

# TIER 2 — Budget group kit alternative

## Surviveware Comprehensive Premium Survival First Aid Kit (238 pcs)

**Question:** Is there a real, in-stock budget alternative to the AMK Guide?

**Confidence:** PARTIAL — price/rating/reviews CONFIRMED; **weight not published** on the search listing; group sizing not stated for this SKU.

**Answer:**
- (verbatim) **"Surviveware Comprehensive Premium Survival First Aid Kit | 238 Pcs Comprehensive Survival Medical Emergency Kit for Travel Camping Gear, Home Essentials Outdoor Emergencies"** — **"$89.99"** (**"$0.38/count"**), **"4.8 out of 5 stars"**, **"(4K)"**, **"100+ bought in past month"**, badged **"#1 Top Rated"**
- Competing budget brand seen in the same results (verbatim): **"SurviveX Large Pro First Aid Kit, Labeled Pockets, Zip Stitch Wound Closure | Emergency kit for 5-6 people, close wounds without stitches, organized first aid for car, home..."** (sponsored; price not rendered in the card) and **"SurviveX Large Waterproof First Aid Kit for Car, Travel & Home - Emergency Kit for Hiking, Camping, Backpacking and Outdoors - Includes Zip Stitch Wound Closure Strips"** — **"4.6"** out of 5 stars
- **Weight: not published** in the search listing. **Weight not published.**

**Source:** https://www.amazon.com/s?k=Surviveware+large+first+aid+kit (Playwright same-origin fetch)

**Changes recommendation?** **Yes.** Surviveware Comprehensive at **$89.99 / 4.8 ⭐ (4K)** is the highest-rated first aid kit in this entire audit by a wide margin — 4K reviews vs. the AMK Guide's 8 — and it undercuts the Guide's $149.95 by $60. That is a real finding and it should be surfaced. **But** be honest in the copy about the two things that are not verified: it has **no published weight**, and unlike the AMK kits it does **not state a people/days rating**, so it cannot be compared to the Guide's "7 people / up to 2 weeks" claim on equal terms. Recommend listing it as "Best Value — budget alternative" with those caveats visible.

---

# TIER 3 — Signalling

## Fox 40 Classic Whistle (pealess)

**Question:** Price, weight, rating, review count.

**Confidence:** PARTIAL — price/rating/reviews CONFIRMED; **weight not published**; decibel rating not rendered on any responding page.

**Answer:**
- (verbatim) **"Fox 40 Classic Whistle"** — **"$7.95"**, **"4.7 out of 5 stars"**, **"(737)"**, **"400+ bought in past month"**
- (verbatim) **"Fox 40 Classic Official Whistle with Break Away Lanyard (Black)"** — **"4.7 out of 5 stars"**, **"(6.7K)"**, **"4K+ bought in past month"**; Amazon **"Overall Pick"**. **Price NOT rendered — the card reads "Click to see price."** NO PRICE CONFIRMED for this SKU.
- Troop-quantity option (verbatim): **"Fox 40 Classic CMG w/Breakaway Lanyard 3 Pack"** — **"$24.99"**, **"4.8 out of 5 stars"**, **"(2.3K)"**, **"700+ bought in past month"**
- (verbatim) **"Fox 40 Classic w/Breakaway Lanyard 3 Pack"** — **"$22.99"**, **"4.8 out of 5 stars"**, **"(331)"**
- **Weight: not published.** **Weight not published.**
- **Decibel rating: NOT FOUND.** `fox40world.com` rendered only navigation and category taglines — no product-level price, weight, decibel, or rating data. Recorded as NO DATA for the brand site.

**Source:**
- https://www.amazon.com/s?k=Fox+40+Classic+whistle+pealess (Playwright same-origin fetch)
- https://fox40world.com/products/classic-whistle — HTTP 404; https://fox40world.com/ rendered no product data (NO DATA)

**Changes recommendation?** **Yes.** Use **Fox 40 Classic Whistle, $7.95 / 4.7 ⭐ (737)** as the listed SKU, or the **CMG 3-Pack at $24.99 / 4.8 ⭐ (2.3K)** if every boy gets one — which for a zero-cell-service trip with a satellite communicator as the only comms, they should. Do **not** publish a decibel figure (commonly cited as 115 dB) — it was not confirmed on any responding source in this audit. Weight column: "weight not published."

---

# Audit gaps — explicit

**NO RATING FOUND:** none. Every product in Tiers 1–3 returned a numeric rating value with a review count.

**Price not confirmed (1):**
- Fox 40 Classic Official Whistle with Break Away Lanyard (Black) — card rendered **"Click to see price"**. Price NOT confirmed. (The plain Classic Whistle and both 3-packs did render prices.)

**Weight not published (7):**
- Dr. Scholl's Moleskin (all variants)
- Compeed Advanced Blister Care Pads (all variants)
- Band-Aid Pro Heal / Hydro Seal blister cushions (all variants)
- Tincture of benzoin (both the 3M vials and the 4 oz bottle)
- ENGO Blister Prevention Patches (all variants)
- Surviveware Comprehensive Premium First Aid Kit
- Fox 40 Classic Whistle (all variants)

Weights WERE confirmed for: Leukotape P (**"Item Weight 91 g"**), AMK Hiker (**"7.2 ounces"**), AMK Explorer (**"1 lb. 6.4 oz."**), AMK Guide (**"2 lbs. 2.4 oz."**).

**Other unconfirmed specs:**
- Fox 40 decibel rating — NOT FOUND on any responding source. Do not publish one.
- Surviveware people/days group rating — not stated by the manufacturer listing, so it is not comparable to the AMK kits' stated sizing.

**Domains that returned no data (not retried, per rate-limit budget):** walmart.com (CAPTCHA), engoblisterprevention.com (DNS failure), adventuremedicalkits.com (404 on the Explorer path), fox40world.com (no product-level data rendered).
