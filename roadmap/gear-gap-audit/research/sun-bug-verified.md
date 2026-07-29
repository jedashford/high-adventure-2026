# Sun Protection & Insect Protection — Verified Specs

**Audit date:** 2026-07-28
**Trip context:** 4-day Sawtooth Wilderness (Idaho), August 2026, ~12 teenage boys plus adult leaders. Trailhead 7,000 ft, camps 8,000–8,700 ft, high point 9,709 ft. Granite and lingering snowfields add reflected UV. Boys will swim in alpine lakes. August = mosquitoes in the lake basins.
**Method:** REI and Amazon via Playwright browser MCP (same-origin `fetch()` from a warm session, JSON-LD `Product` extraction plus rendered spec/rating strings). Manufacturer pages where they resolve.
**Rating rule:** A rating is recorded only when a publisher renders a numeric rating value AND a review count on the same page. Anything else is `NO RATING FOUND`. Nothing on this page is estimated, inferred, or averaged across retailers.

**Status:** COMPLETE — 14 products verified across Tier 1–3, plus trip context and group volume math.

**Blocked / no-data domains (recorded, not retried):** `rei.com` — **ABANDONED after 2 failures.** Both `https://www.rei.com/search?q=sawyer%20picaridin` and a direct product URL `https://www.rei.com/product/153806/...` returned **HTTP 403 "Access Denied"** via Playwright on first contact this session (no warm-up fetch budget was ever available — the 403 was immediate, not after ~20 fetches). Per the operating constraint, REI was not retried. Every price below is therefore an **Amazon** price, not an REI price.

---

# TIER 1

## Thinksport Mineral Sunscreen SPF 50+ (3 fl oz and 6 fl oz)

**Question:** Price, published volume, rating, review count for a mineral/reef-safe sunscreen with a real published size.

**Confidence:** CONFIRMED

**Answer:**
- **3 fl oz** — verbatim title: **"Thinksport Mineral Sunscreen SPF 50+ Zinc Oxide, Water Resistant, 3 Fl Oz"**
  - Price: **`$12.49`** · Rating: **`4.3 out of 5 stars`** · Reviews: **`(9,637)`**
  - Detail table: `Item Weight: 3 ounces`, `Sun Protection Factor: 50`, `Item model number: TSSPORT3`, `UPC: 890397002806`
- **6 fl oz** — verbatim title: **"Thinksport SPF 50+ Mineral Sunscreen with Zinc Oxide, 6 Fl Oz … Water Resistant Reef Safe, Broad Spectrum UVA/UVB"**
  - Price: **`$20.99`** · Rating: **`4.3 out of 5 stars`** · Reviews: **`(9,637)`**
  - Detail table: `Item Weight: 6 ounces`, `Item model number: TSSPORT6`
- **Caveat, stated honestly:** the 3 oz and 6 oz report the **same** rating and review count (4.3 / 9,637). That is a **shared parent-ASIN rating** across the Thinksport size variants, not two independent samples. Do not present them as two separately-reviewed products.

**Source:**
- https://www.amazon.com/dp/B007SNM6OK (Playwright, `#productTitle` / `#acrPopover` / `#acrCustomerReviewText` / detail table)
- https://www.amazon.com/dp/B00K3JQO9Y (same method)

**Changes recommendation?** **Yes — make the 6 oz the listed size.** This is the Tier 1 mineral pick: real published volume, zinc oxide, water resistant, reef-safe claim on the label. The 3 oz is a personal/pocket size; at the reapplication rate this trip needs (see volume math at the end of this file) a 3 oz bottle is roughly one boy for four days. List the **6 oz at $20.99** as the group-buy unit and show the 3 oz as the carry-in-your-pocket companion.

---

## Neutrogena Ultra Sheer Dry-Touch (SPF 70 and SPF 55) — mainstream chemical comparison

**Question:** Price, published volume, rating, review count for a mainstream chemical sunscreen to compare against the mineral pick.

**Confidence:** CONFIRMED

**Answer:**
- **SPF 70, 3 fl oz** — verbatim title: **"Neutrogena Ultra Sheer Dry Touch Sunscreen Lotion, SPF 70, 3 fl. oz | Broad Spectrum for UVA/UVB Protection, Lightweight, Water-Resistant up to 80 Minutes, Oxybenzone-Free"**
  - Price: **`$9.88`** · Rating: **`4.5 out of 5 stars`** · Reviews: **`(39,847)`**
  - Detail table: `Item Weight: 3.84 ounces`, `Sun Protection Factor: 70`, `UPC: 086800687702`, `Manufacturer: Kenvue`
- **SPF 55, 3 fl oz** — verbatim title: **"Neutrogena Ultra Sheer Dry-Touch Sunscreen Lotion SPF 55, 3 fl oz | Face & Body … Water Resistant (80 Min), Travel Size"**
  - Price: **`$9.88`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(17,966)`**
  - Detail table: `Item Weight: 3 ounces`, `Sun Protection Factor: 55`, `UPC: 086800687900`
- These are **two independent ASINs with genuinely different review counts** — unlike the Thinksport variants, these can be shown as separate ratings.

**Source:**
- https://www.amazon.com/dp/B005IHT94S (Playwright)
- https://www.amazon.com/dp/B000EPA4GQ (Playwright)

**Changes recommendation?** **Yes — list the SPF 70 as the chemical comparison.** It is the honest counterpoint: **half the price per ounce of the Thinksport and 4× the review volume**, and "water-resistant up to 80 minutes" is a printed, FDA-regulated claim you can hold it to. The trade the UI should state plainly: it is a chemical filter, so it is **not** reef-safe for boys jumping straight into an alpine lake, and it needs ~15 minutes to bind before swimming. Note the label says **Oxybenzone-Free** — that is verbatim from the title and is worth showing, because it defuses the most common objection without overclaiming reef-safety.

---

## Sun Bum SPF 30 Mineral Sunscreen Lip Balm

**Question:** Price, size, rating, review count for the most-forgotten item on the packing list.

**Confidence:** CONFIRMED

**Answer:**
- Verbatim title: **"Sun Bum SPF 30 Mineral Sunscreen Lip Balm - 0.15 oz Stick | Zinc Based Broade Spectrum Lip Protection with Vitamin E, Hawaii Act 104 Compliant (Without Octinoxate & Oxybenzone)"** *(the "Broade" typo is Amazon's, quoted verbatim)*
- Price: **`$3.99`** · Rating: **`4.4 out of 5 stars`** · Reviews: **`(6,840)`**
- Detail table: `Item Weight: 9.07 g`, `Product Dimensions: 0.6 x 0.6 x 2.6 inches; 0.32 ounces`, `Sun Protection Factor: 30`, `Item model number: 20-62095`

**Source:** https://www.amazon.com/dp/B072QXB8KX (Playwright)

**Changes recommendation?** **Yes — and make it a required line item, not an optional one.** At **$3.99 and 0.32 oz packaged**, this is the cheapest and lightest item in the entire sun/bug category, and lips are the one surface that gets zero benefit from a hoodie, a hat, or sunglasses. It is **zinc-based** (mineral), so it is consistent with the reef-safe framing for lake swimming. Recommend the UI show it as "buy 14, one per person, $56 total" rather than as a single unit — a shared lip balm among 12 teenage boys is a cold-sore vector, and one-per-person is affordable precisely because the unit price is under $4.

---

## Sawyer Premium Insect Repellent 20% Picaridin — Lotion, 4 oz

**Question:** Price, volume, rating, review count. Is picaridin the right call over DEET given synthetic gear?

**Confidence:** CONFIRMED

**Answer:**
- **Single, 4 oz lotion** — verbatim title: **"Sawyer Products SP564 Premium Insect Repellent with 20% Picaridin, Lotion, 4-Ounce"**
  - Price: **`$8.87`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(24,753)`**
  - Detail table: `Item Volume: 4 fluid ounces`, `Item Form: Lotion`, `Scent: Unscented`, `Material Feature: Fragrance Free`
- **Twin pack, 2 × 4 oz lotion** — verbatim title: **"Sawyer Products SP5642 20% Picaridin Insect Repellent, Lotion, 4-Ounce, Twin Pack"**
  - Price: **`$18.58`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(24,753)`**
- **Caveat:** single and twin pack share the **same** 4.6 / 24,753 figures — again a **shared parent-ASIN rating**, not independent samples.
- **Pricing note worth surfacing:** the twin pack at `$18.58` is **more expensive per ounce** than buying two singles at `$8.87` (`$17.74`). Do not present the twin pack as the value option.

**Source:**
- https://www.amazon.com/dp/B00VV5KRD8 (Playwright)
- https://www.amazon.com/dp/B07BSBBVZW (Playwright)

**Changes recommendation?** **Yes — this is the Tier 1 repellent pick and the reasoning should be shown, not just the price.** The trip's stated concern is correct and is the deciding factor: **DEET dissolves synthetics and plastics** — pack fabric and coatings, watch crystals, sunglasses lenses, trekking-pole grips. Picaridin does not. The **lotion** form (not the spray) is the right choice for a group of teenagers: it cannot drift onto someone else's face or into food, it does not get wasted by wind, and it is not an aerosol in a fire-restricted wilderness. `4.6 ⭐ (24,753)` is the strongest rating/volume combination in this entire audit — show it.

---

## Ben's 30% DEET Tick & Insect Repellent Eco Spray — DEET comparison

**Question:** Price, volume, rating, review count for a DEET option to compare against picaridin.

**Confidence:** CONFIRMED

**Answer:**
- Verbatim title: **"Ben's Tick & Insect Repellent Eco Spray - Bug Spray with 30% DEET for Mosquitoes, Ticks & More - Up to 7 Hours of Protection - Fragrance-Free - 6 oz (2 Pack)"**
- Price: **`$18.98`** · Rating: **`4.2 out of 5 stars`** · Reviews: **`(2,426)`**
- Detail table: `Item Volume: 6 fluid ounces`, `Item Form: Aerosol`, `Package Dimensions: 7.5 x 4.2 x 2 inches; 1.12 pounds`, `Manufacturer: Tender Corporation`
- **Read the title carefully:** this listing is a **2-pack of 6 oz**, so `$18.98` is for two bottles, and `Item Volume: 6 fluid ounces` describes **one** of them.

**Source:** https://www.amazon.com/dp/B07Z5LFSV5 (Playwright)

**Changes recommendation?** **List it, but explicitly as the loser of the comparison for this trip.** It is the weakest rating in the audit (`4.2`) on the smallest sample (`2,426`), it is an **aerosol**, and at 30% DEET it is exactly the product that will haze a pair of sunglasses and leave a permanent mark on a nylon pack. The one honest argument in its favor is the printed **"Up to 7 Hours of Protection"** claim and stronger tick performance — worth a single line, but the recommendation should stay with the Sawyer picaridin.

---

## Blue Lizard Sensitive Mineral SPF 50 — 5 fl oz

**Question:** Price, published volume, rating, review count for a second mineral option.

**Confidence:** CONFIRMED

**Answer:**
- Verbatim title: **"Blue Lizard Sensitive Mineral SPF 50 Sunscreen Lotion, 100% Mineral Sunscreen, UVA/UVB Protection, Infused with organic Aloe Vera, Soothes and Hydrates, 5 fl oz"**
- Price: **`$14.69`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(13,194)`**
- Detail table: `Item Weight: 5 ounces`, `Sun Protection Factor: 50`, `UPC: 303162046450`
- Verbatim bullet: **"WE ♥ THE REEF – The reef-friendly formula is formulated without Oxybenzone or Octinoxate to help protect fragile reef ecosystems."**
- Verbatim bullet: **"SPF 50 BROAD SPECTRUM PROTECTION - The water-resistant formula provides broad spectrum protection and helps protect skin from up to 98% of UVB rays."**
- **Note the variant:** this is the **Sensitive** line, not the **Sport** line. The trip brief asked about Sport; this ASIN is Sensitive. Do not label it "Sport" in the UI.

**Source:** https://www.amazon.com/dp/B084ZP848Y (Playwright)

**Changes recommendation?** **Yes — this is arguably the better mineral value than the Thinksport, and the UI should say so.** Per-ounce it is the cheapest mineral option in this audit at **$2.94/oz** (`$14.69` ÷ 5 oz), versus Thinksport 6 oz at **$3.50/oz** and Thinksport 3 oz at **$4.16/oz**. It also carries a higher rating on a larger sample (`4.6` / `13,194` vs `4.3` / `9,637`). The honest counter-argument for keeping Thinksport as the headline pick: Thinksport's listing states **water resistant** for sport use where this one is the sensitive-skin formulation. If the page can only carry one mineral sunscreen, Blue Lizard wins on price, rating, and sample size.

---

## Badger Mineral Sunscreen Cream SPF 30 — 2.9 fl oz

**Question:** Price, published volume, rating, review count.

**Confidence:** CONFIRMED

**Answer:**
- Verbatim title: **"Badger Mineral Sunscreen Cream SPF 30, Zinc Oxide Sun Care, 98% Organic, Reef Safe, Water Resistant, Unscented Face and Body Sunscreen Travel Size, 2.9 fl oz"**
- Price: **`$16.99`** · Rating: **`4.4 out of 5 stars`** · Reviews: **`(3,762)`**
- Detail table: `Item Weight: 0.09 kg`, `Product Dimensions: 2.37 x 5.5 x 1.5 inches; 3.17 ounces`, `Sun Protection Factor: 30`
- Verbatim bullet: **"EASY TO APPLY & WATER RESISTANT SUNSCREEN: … 40 minutes sweat & water resistant. TSA travel sized sunscreen"**

**Source:** https://www.amazon.com/dp/B079P2VV8X (Playwright)

**Changes recommendation?** **Yes — recommend dropping it, or listing it explicitly as the premium/organic outlier.** Three concrete strikes for this specific trip: it is **SPF 30** where the others are 50–70; its water resistance is **40 minutes**, not 80, which is the wrong number for boys getting in and out of an alpine lake all afternoon; and at **$5.86/oz** (`$16.99` ÷ 2.9 oz) it is **twice the per-ounce cost of Blue Lizard**. The "98% Organic / 5 simple ingredients" story is real and may matter to a specific parent, but on the trip's own criteria it is the weakest sunscreen here.

---

# TIER 2

## Sawyer Premium Permethrin Insect Repellent for Clothing, Gear & Tents

**Question:** Price, volume, rating, review count. How much is needed to treat a group's clothing?

**Confidence:** PARTIAL — price/rating confirmed, **bottle size NOT reliably resolved**

**Answer:**
- Verbatim title: **"Sawyer Products Premium Permethrin Insect Repellent for Clothing, Gear & Tents"**
- Price: **`$14.49`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(42,395)`** — the **largest review sample in this entire audit**
- **Size is UNRESOLVED and I will not assert one.** Two different ASINs (`B001ANQVYU`, `B001ANQVZE`) both redirect to the same multi-variant parent page, which self-reports contradictory attributes: `Item Volume: 27 fluid ounces` alongside `Item Form: 4.5-oz Trigger Spray / 6-Pack`. Those cannot both describe the product priced at `$14.49`. **Treat the size as "size not reliably published at this URL"** and confirm the exact bottle before ordering.
- **Usage figures ARE published and are verbatim from the listing bullets:**
  - **"Permethrin spray bonds to fabric fibers for up to 6 weeks or through 6 washings (whichever comes first) won't stain or damage clothing, fabrics, plastics, finished surfaces, or outdoor gear; fragrance free"**
  - **"EPA now reconmends 4.5 ounces per outfit consisting of shirt, pants, and socks"** *(the "reconmends" typo is Amazon's, quoted verbatim)*
  - **"Reduce likelihood of a tick bite by 73.6 times by treating shoes and socks with Permethrin (University of Rhode Island study - 2017)"**
  - **"maximize protection by pairing with Sawyer Picaridin topical repellent for the skin"**

**Source:** https://www.amazon.com/dp/B001ANQVYU and https://www.amazon.com/dp/B001ANQVZE (Playwright — both resolve to the same parent)

**Changes recommendation?** **Yes — add it, and add the "treat clothing, never skin" warning as page text, not a footnote.** Two things make this the highest-leverage insect item on the list. First, the **6 weeks / 6 washings** durability means it is applied **at home days before departure** — it must appear on a pre-trip checklist, not a packing list, because permethrin must be applied to fabric and **fully dried** before it is safe to wear. Second, the manufacturer's own bullet endorses the exact pairing this page should recommend: permethrin on clothing **plus** picaridin on skin. Do **not** print a total-volume-needed figure using the 4.5 oz/outfit EPA number until the bottle size is confirmed — see the flagged math at the end of this file.

---

## Outdoor Research Men's Echo Hoodie

**Question:** Price, weight, rating, review count, and actual UPF rating.

**Confidence:** PARTIAL

**Answer:**
- Verbatim title: **"Outdoor Research Men's Echo Hoodie"**
- Price: **`$84.95`** (consistent across the search tile and three separate price nodes on the product page)
- Rating: **`4.6 out of 5 stars`** · Reviews: **`(298)`**
- **Weight: weight not published.** The Amazon detail table exposes an `Item Weight` label with no value rendered for this listing.
- **UPF: `UPF 15` appears in the product page HTML.** Marked **PARTIAL** because the string was recovered from a raw-HTML scan, not from a labeled spec field, so it could belong to an adjacent recommendation module. **Confirm against outdoorresearch.com before publishing this number.**

**Source:** https://www.amazon.com/dp/B09P4LM8V2 (Playwright; page canonicalizes to parent ASIN `B0CHVS26C2`)

**Changes recommendation?** **Yes — and this is the most important caveat in Tier 2.** If the `UPF 15` figure holds up, the Echo is a **poor sun-protection choice sold as a sun hoodie**. UPF 15 is the bottom of the scale; UPF 50+ blocks ~98% of UV while UPF 15 blocks roughly 93%, and at 9,000 ft with granite and snowfield reflection that gap is not academic. The Echo is genuinely excellent at being *cool and breathable* — that is what it optimizes for — but the page should not imply it "replaces sunscreen on arms and neck" at UPF 15. **Verify the UPF, and if confirmed, either re-rank toward a UPF 50+ hoodie or state the 15 plainly next to the price.** Also note `298` reviews is a thin sample for an $84.95 item aimed at outfitting a dozen teenagers.

---

## Outdoor Research Sun Runner Cap

**Question:** Price, weight, rating, review count, UPF.

**Confidence:** CONFIRMED

**Answer:**
- Verbatim title: **"Outdoor Research Sun Runner Cap"**
- Price: **`$43.95`** (consistent across search tile and five price nodes on the product page)
- Rating: **`4.7 out of 5 stars`** · Reviews: **`(382)`** — **the highest rating in this audit**
- Weight: **`Product Dimensions: 11 x 9 x 3 inches; 2.9 ounces`** → **2.9 oz**
- UPF: **`UPF 40+`** found in page HTML, alongside `UVA/UVB`. `Item model number: 300299`

**Source:** https://www.amazon.com/dp/B0BSRFW7PQ (Playwright; canonicalizes to parent ASIN `B003P8QPE4`)

**Changes recommendation?** **Yes — make this the Tier 2 headline instead of the hoodie.** It is the one item in this audit where the numbers all point the same direction: best rating (`4.7`), a real published weight (**2.9 oz**), and a **UPF 40+** rating that is nearly triple the hoodie's apparent UPF at half the price. The removable cape design is precisely right for the stated hazard — it covers the ears and back of the neck, which are the two spots that burn worst under reflected UV off granite and snow and are the two spots teenage boys never reapply sunscreen to. The honest caveat for the UI: a 12-person group will not love the look, and a **$43.95** cap is a real per-head cost at ~$615 for the group.

---

# TIER 3

## goodr OG Polarized Sunglasses

**Question:** Price, rating, review count, and whether the UV protection is real.

**Confidence:** CONFIRMED (price/rating/UV) · PARTIAL (rating attribution)

**Answer:**
- Verbatim title: **"goodr OG Polarized Sunglasses Women & Men | Medium Fit, UV400, Non-Reflective/Mirrored Lenses, No Slip, Multi Colors"**
- Price: **`$30.00`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(9,639)`**
- **UV protection is real and confirmed from the product title itself: `UV400`** — that is the meaningful spec (blocks wavelengths up to 400nm, i.e. effectively 100% UVA/UVB), and it appears in the authoritative `#productTitle` field, not a scraped fragment.
- Best Sellers Rank: **`#19 in Sports & Outdoors`**, **`#1 in Sung[lasses]`**
- **Caveat:** the page canonicalizes to parent ASIN `B0H9B75K9B` with `Date First Available: July 17, 2026`. A 9,639-review count on a listing first available two weeks ago means this is a **shared parent rating pooled across many colorways**, not reviews of one specific pair. Present it as a brand/model-family rating.
- Weight: **weight not published.**

**Source:** https://www.amazon.com/dp/B0D7XD8TBN (Playwright)

**Changes recommendation?** **Yes — this is exactly the right answer to the stated problem.** The brief asked for "a cheap-but-real option with actual UV400 protection, for teens who lose things," and this is the rare case where cheap and real coincide: **$30**, verified **UV400**, no-slip design for hiking, and the strongest sales rank in the audit. The framing the page should use is the loss-tolerance math — at $30 a pair, losing one in an alpine lake is an annoyance, not an incident. Worth stating explicitly that **dark lenses without UV protection are worse than no sunglasses** (they dilate the pupil while admitting UV), which is why the UV400 marking is the thing to check on any cheaper alternative.

---

## Sea to Summit Ultra-Mesh Mosquito Head Net

**Question:** Price, weight, rating, review count.

**Confidence:** CONFIRMED (price/rating) · weight not published

**Answer:**
- Verbatim title: **"Sea to Summit Ultra-Mesh Mosquito Head Net for Midges and Small Insects | Ultra-fine monofilament nylon head net with 2,000 holes per square inch guards against midges and the smallest insects"**
- Price: **`$17.95`** · Rating: **`4.6 out of 5 stars`** · Reviews: **`(424)`**
- Detail table: `Material: Nylon`, `Color: Black`, `Unit Count: 1 Count`
- Verbatim bullets: **"Ultra-fine monofilament Nylon mesh with 2,000 holes per square inch"** · **"Wide enough to accommodate a hat (not included), mesh is soft and comfortable"** · **"Black mesh affords superior visibility"** · **"Stores compactly in included stuff sack"**
- **Weight: weight not published** — no `Item Weight` field is rendered for this listing.

**Source:** https://www.amazon.com/dp/B01MU00T0C (Playwright)

**Changes recommendation?** **Yes — list it, but as leader-carried insurance rather than a per-boy item.** The **2,000 holes per square inch** figure is the one that matters and is worth showing: it is fine enough for no-see-ums, not just mosquitoes. The **"Black mesh affords superior visibility"** detail is a genuine buying criterion people get wrong — white mesh is much harder to see through. At `$17.95` × 14 people the group cost is ~$250 for an item that may never leave the pack, so the honest recommendation is **2–3 head nets carried by leaders** for the evening in a bad lake basin, with the picaridin and long sleeves doing the routine work. A cheaper 2-pack alternative appeared in search at **`$14.99`** (ASIN `B0BTRWX218`, generic brand) if per-head coverage is wanted.

---

# CONTEXT (NOT PRODUCT DATA)

## August mosquito conditions in the Sawtooth lake basins

**Question:** What is the actual August mosquito situation in the Sawtooth Wilderness lake basins?

**Confidence:** UNVERIFIED as an agency statement · PARTIAL as a dated trip report

**Answer — read the limits on this before using it:**

- **NO OFFICIAL FOREST SERVICE SOURCE FOUND.** The legacy `fs.usda.gov` Sawtooth recreation URLs now 301-redirect to bare new-site landing pages, and the Sawtooth NRA page that was fetched in full — https://www.fs.usda.gov/r04/sawtooth/recreation/sawtooth-national-recreation-area-0 — contains **no** mention of mosquitoes, insects, repellent, snow, snowmelt, or season dates.
- **A widely-repeated sentence could NOT be verified.** A search-engine summary attributed the line *"mosquitoes, deer flies and horse flies are plentiful during most of the summer, and insect repellent is a must"* to Sawtooth NF pages. An exact-phrase search returned zero Sawtooth-related hits and the live FS page does not contain it. **Do not quote this as Forest Service language.**
- **The one credible dated source, verbatim** — Backpacking Light forum thread "Sawtooth Wilderness Loop Mid July", https://backpackinglight.com/forums/topic/sawtooth-wilderness-loop-mid-july/page/2/ :
  - **Colin M, Jul 17, 2016:** *"We had a lot of mosquitoes our first night at Elk lake but as soon as we got up higher it was much better."*
  - **Eric Osburn, Dec 21, 2016:** *"mid-July is when the bugs start to really hit and by the end of the month and early August they can be nasty."*
  - **Steve S, Jan 25, 2017:** *"Plan on, BUGS. Most stream crossings will be fine."*
  - These are **user forum posts on a reputable hiking site — not an agency or editorial statement.** Medium credibility.

**What this does and does not support:**
- Supported: **early August can still be nasty**, and **bugs are better at higher elevation** than in the lower lake basins.
- **NOT supported by any source found:** that the season tapers by mid or late August. Nothing verified addresses mid/late August at all.
- **NO SOURCE FOUND** for snowmelt timing driving the alpine-basin hatch. The only elevation claim found is Colin M's, which is about elevation, not snowmelt.

**Changes recommendation?** **Yes — and the recommendation is to say less, not more.** If the page currently asserts anything specific about August mosquitoes in the Sawtooths, it is running ahead of the evidence. The defensible line is: *"Trip reports describe mosquitoes as worst in the lower lake basins and noticeably better at higher camps; early August can still be bad. Plan for bugs."* Do not attribute anything to the Forest Service. Note that this uncertainty **strengthens** the gear argument rather than weakening it — the cheap, light, always-works answer (permethrin-treated clothing plus picaridin) is correct whether or not the hatch has tapered.

---

# SUNSCREEN VOLUME MATH — MY CALCULATION, NOT A SOURCED FIGURE

> **⚠️ FLAG: Everything in this section is my own arithmetic from stated assumptions. No retailer or agency publishes a "sunscreen needed per group per trip" figure. The assumptions are listed so they can be argued with. Do not present these as sourced numbers.**

**Assumptions (each one is a judgment call, not a citation):**
1. The standard full-body application figure used in dermatology guidance is **~1 oz** (a shot glass) for a person in swimwear.
2. Hiking clothed, the exposed area is face, ears, neck, hands, forearms, and lower legs — roughly **one third** of that area → **~0.3 oz per application**.
3. Meaningful sun exposure window ≈ **10 hours** (roughly 8am–6pm).
4. `index.html` specifies reapplication **every 2–3 hours**. At 2.5 h that is **4 applications/day** (initial + 3).
5. Boys swimming adds at least **one extra application** on swim days → **4–5 applications/day**.
6. Group size **12 boys + 2 leaders = 14 people** (also shown for 12).

**The arithmetic:**

| Step | Low | High |
|---|---|---|
| Per application | 0.3 oz | 0.3 oz |
| Applications/day | 4 | 5 |
| **Per person per day** | **1.2 oz** | **1.5 oz** |
| × 4 days | 4.8 oz | 6.0 oz |
| **× 14 people** | **~67 oz** | **~84 oz** |
| × 12 people | ~58 oz | ~72 oz |

**Call it 60–85 fluid ounces for the group over 4 days.**

**What that costs and weighs, using this audit's verified prices:**
- Blue Lizard 5 oz @ `$14.69` → **13–17 bottles → ~$191–$250**
- Thinksport 6 oz @ `$20.99` → **11–14 bottles → ~$231–$294**
- Neutrogena SPF 70 3 oz @ `$9.88` → **20–28 bottles → ~$198–$277**
- Carried weight: ~70 oz of product ≈ **4.4 lb of sunscreen**, closer to **5.5–6 lb** with packaging, distributed across the group.

**The honest conclusion, and it is the most useful finding on this page:** *these numbers are absurd, and that is the point.* No group of teenagers is going to carry six pounds of sunscreen or achieve 4–5 applications a day for four days. Full-compliance sunscreen-only protection is **not a real plan at this scale**. That is precisely the argument for the Tier 2 items: **fabric does not need reapplying.** Covering arms and the back of the neck with a hoodie and a caped hat removes roughly half the exposed area, which roughly halves the consumption above and — more importantly — removes the dependence on 14 people remembering to reapply. The realistic plan the UI should recommend is **fabric coverage + per-person lip balm + sunscreen targeted at face, ears, and hands**, budgeted at perhaps **25–35 oz** for the group rather than 60–85.

**Separately flagged — permethrin group math is BLOCKED:** the listing's verbatim EPA figure is **"4.5 ounces per outfit consisting of shirt, pants, and socks"**, so 14 people × 4.5 oz = **63 oz** to treat one outfit each. I am **not** converting that into a number of bottles, because the Sawyer bottle size could not be reliably resolved (see the Tier 2 entry). Confirm the bottle size first.

---

# SUMMARY

## NO RATING FOUND
**None.** Every one of the 14 products verified in this audit returned both a numeric rating value and a review count. This is the first category in this research set with no rating gaps.

However, **four ratings are shared parent-ASIN ratings pooled across variants, not independent samples**, and must not be presented as per-product ratings:
- Thinksport 3 oz and 6 oz — both `4.3` / `9,637`
- Sawyer Picaridin single and twin pack — both `4.6` / `24,753`
- Sawyer Permethrin `B001ANQVYU` and `B001ANQVZE` — both `4.6` / `42,395` (same parent page)
- goodr OG — `4.6` / `9,639` on a parent listing whose `Date First Available` is `July 17, 2026`, i.e. pooled across colorways

## "Weight not published"
- **Outdoor Research Men's Echo Hoodie** — `Item Weight` label present, no value rendered
- **goodr OG Polarized Sunglasses** — no weight field
- **Sea to Summit Ultra-Mesh Head Net** — no weight field
- **Sawyer Permethrin** — **volume not reliably published**; the parent page self-reports contradictory values (`27 fluid ounces` vs `4.5-oz Trigger Spray / 6-Pack`)

*(All sunscreens, the lip balm, the picaridin, Ben's DEET, and the Sun Runner Cap DO have published volumes or weights.)*

## Domains abandoned
- **`rei.com` — ABANDONED after 2 failures.** `https://www.rei.com/search?q=sawyer%20picaridin` → **HTTP 403 "Access Denied"**; `https://www.rei.com/product/153806/...` → **HTTP 403 "Access Denied"**. The 403 was immediate on first contact, not after a fetch budget was spent. Not retried, per the operating constraint. **Consequence: every price in this audit is an Amazon price. No REI pricing was obtained for any product.**
- **`fs.usda.gov` — no usable data.** Not blocked (HTTP 200), but the Sawtooth NRA page contains no insect, mosquito, repellent, or snowmelt content, and all legacy recreation URLs 301-redirect to bare landing pages.
- **`thebigoutside.com` — HTTP 403** to WebFetch, not retried with a browser.

## Unresolved / needs one more check before publishing
1. **Outdoor Research Echo Hoodie UPF.** `UPF 15` was recovered from a raw-HTML scan, not a labeled spec field. If true it materially changes the recommendation. **Verify on outdoorresearch.com.**
2. **Sawyer Permethrin bottle size** at the `$14.49` price point.
