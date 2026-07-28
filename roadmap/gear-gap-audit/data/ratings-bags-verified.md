# Verified customer ratings & review counts — bags / organization / food storage

Collected 2026-07-28. Every number below was read off a live retailer/manufacturer
product page — JSON-LD `aggregateRating`, the rendered review widget, or the widget's
`aria-label` (Zpacks publishes its average only in the `aria-label`). Nothing is
estimated, averaged, or carried over between SKUs.

Source preference applied: REI → manufacturer → Amazon → Backcountry / Garage Grown Gear.

| Product | Rating | Review count | Source | URL | Notes |
|---|---|---|---|---|---|
| Sea to Summit Ultra-Sil Stuff Sack | 4.7 | 35 | Sea to Summit (mfr) | https://seatosummit.com/products/the-ultra-sil-stuff-sack | **Size: all sizes on one page** (single multi-size product, 1.5 L–35 L — no per-size rating exists). Header + JSON-LD = 4.7 / 35; live widget = "Based on 36 reviews" (value agrees, count lags by 1). REI does **not** carry a single Ultra-Sil Stuff Sack — only "Ultra-Sil Stuff Sack – Set of 3" (product 218710) at 4.8 / 15, a different SKU. |
| Sea to Summit Lightweight Stuff Sack | 4.8 | 78 | Sea to Summit (mfr) | https://seatosummit.com/products/lightweight-stuff-sack | All sizes on one page. Header + cached JSON-LD = 4.8 / 78; live widget JSON = 4.8 / 79 (value agrees, count lags by 1). Not carried at REI — REI's "Lightweight Stuff Sack" is REI Co-op's own house SKU (row 18), a different product. Sibling "Lightweight Stuff Sack Set" = 4.8 / 26. |
| Sea to Summit Ultra-Sil Dry Bag | 4.5 | 118 | REI | https://www.rei.com/product/218732/sea-to-summit-ultra-sil-dry-bag | **DISAGREEMENT.** REI = 4.5 / 118 (JSON-LD and widget agree). Sea to Summit's own page = **4.8 / 229** (https://seatosummit.com/products/ultra-sil-dry-bag). REI is the audited source per preference order. Sibling "Ultra-Sil Dry Bag – Set of 3" (REI 218733) = 4.7 / 35. |
| Sea to Summit Lightweight Dry Bag | 4.8 | 413 | Sea to Summit (mfr) | https://seatosummit.com/products/lightweight-dry-bag | Product-level aggregate across all sizes. REI has **no combined product** — it splits this into per-size SKUs, each separately rated: 5 L 4.7 / 109 (220556), 8 L 4.8 / 103 (220557), 13 L 4.7 / 112 (220552), 20 L 4.8 / 113 (220553). Use the per-size REI figure if the UI lists a specific size; do not sum the REI counts (437) against the mfr's 413. |
| Sea to Summit Evac Compression Dry Bag HD | 4.8 | 25 | REI | https://www.rei.com/product/246135/sea-to-summit-evac-heavy-duty-compression-dry-bag | **DISAGREEMENT.** REI lists it as "Evac Heavy Duty Compression Dry Bag" = 4.8 / 25. Sea to Summit's own page = **4.9 / 56** (https://seatosummit.com/products/evac-compression-dry-bag-hd). Sibling non-HD "Evac Lightweight Compression Dry Bag" (REI 246134) = 4.8 / 57 — different SKU, do not substitute. |
| Nylofume pack liner bag | 5 | 82 | Litesmith | https://www.litesmith.com/nylofume-pack-liner-bags/ | **DISAGREEMENT + precision caveat.** Litesmith (BigCommerce) publishes `ratingValue: "5"` / `reviewCount: "82"` — BigCommerce rounds the average to an integer, so 5 is the published value but is not a 1-decimal figure. Garage Grown Gear publishes **4.8 / 681** for the same product (https://www.garagegrowngear.com/products/nylofume-pack-liner-bags) on a far larger sample. GGG is the better number for a sort-by-rating; Litesmith is the requested primary. |
| Zpacks Pack Liner | 4.9 | 18 | Zpacks (mfr) | https://zpacks.com/products/pack-liner | No JSON-LD `aggregateRating` on the page; value read from the review widget's `aria-label`: "Rated 4.9 out of 5 stars 18 reviews". |
| Zpacks Bear Bagging Kit | 4.8 | 65 | Zpacks (mfr) | https://zpacks.com/products/bear-bagging-kit | Widget `aria-label`: "Rated 4.8 out of 5 stars 65 reviews". Page title "Ultralight Bear Bagging Kit". |
| Zpacks Pillow Dry Bag — **Medium** | 4.6 | 56 | Zpacks (mfr) | https://zpacks.com/products/medium-pillow | Zpacks sells this as two separately-rated size SKUs; pick per the size the guide lists. H1/`og:title` = "Medium Pillow Dry Bag". **Zpacks' `<title>` tag on this URL is wrong** (it reads "Medium-Plus"); H1, og:title and the collection link text all agree on Medium. Widget `aria-label`: "Rated 4.6 out of 5 stars 56 reviews". |
| Zpacks Pillow Dry Bag — **Medium-Plus** | 4.9 | 24 | Zpacks (mfr) | https://zpacks.com/products/medium-plus-pillow | H1/`og:title` = "Medium-Plus Pillow Dry Bag" (its `<title>` tag is likewise swapped). Widget `aria-label`: "Rated 4.9 out of 5 stars 24 reviews". The size-picker landing page /products/pillow-dry-bags carries **0 reviews** of its own. |
| Zpacks Color Bands (6 Pack) | **NO RATING FOUND** | — | — | https://zpacks.com/products/color-bands-for-dry-bags-6-pack | Page is live and in stock; widget `aria-label` reads "Rated 0.0 out of 5 stars **0 reviews**". Not carried at REI, Amazon, Backcountry or Garage Grown Gear as a standalone SKU. |
| Granite Gear Air ZippSack | 4.8 | 10 | CampSaver | https://www.campsaver.com/granite-gear-air-zippsack.html | **Outside the stated preference chain** — nothing in the chain publishes a rating: not carried at REI (no product page), granitegear.com's own page (https://www.granitegear.com/air-zippsack-pc.html) has no review widget, no standalone Amazon listing (only search/marketplace results), Outdoor Gear Exchange shows 0 reviews. CampSaver JSON-LD and widget agree (4.8 / 10). OpticsPlanet's page title also advertises "4.8 Star Rating" — likely the same syndicated feed, not an independent sample. |
| Gossamer Gear Thinlight Foam Pad 1/8" | 4.8 | 441 | Gossamer Gear (mfr) | https://www.gossamergear.com/products/thinlight-foam-pad | H1/`og:title`/JSON-LD `name` all = `Thinlight Foam Pad - 1/8"` — this is the 1/8"-specific product, **not** a combined 1/8"+1/4" listing. Not carried at REI. |
| Ursack Major (S29.3) | 3.7 | 94 | REI | https://www.rei.com/product/895691/ursack-major-bear-sack-10-liters | **DISAGREEMENT.** REI lists the S29.3 as "Major Bear Sack – 10 Liters" = 3.7 / 94. Ursack's own page = **3.96 / 23** (https://ursack.com/products/ursack-major). Lowest-rated item in this set. Sibling sizes at REI: Major XL 15 L 4.1 / 57 (109165), Major 2XL 30 L 4.1 / 19 (173826) — do not substitute. |
| Ursack AllMitey | 4.1 | 51 | REI | https://www.rei.com/product/124165/ursack-allmitey-bear-and-critter-sack-10-liters | **DISAGREEMENT.** REI (10 L) = 4.1 / 51. Ursack's own page = **4.19 / 27** (https://ursack.com/products/ursack-allmitey). Sibling "AllMitey Grizzly 20 L" (REI 194815) = 4.5 / 4 — different SKU, tiny n. |
| BearVault BV500 Journey | 4.1 | 320 | REI | https://www.rei.com/product/768902/bearvault-bv500-journey-bear-canister | JSON-LD and widget agree. bearvault.com's own BV500 page publishes stars but **no review count and no JSON-LD aggregate** — unusable, so no cross-check. |
| BearVault BV450 Jaunt | 4.2 | 326 | REI | https://www.rei.com/product/768901/bearvault-bv450-jaunt-bear-canister | JSON-LD and widget agree. bearvault.com's own page shows 5.00 / 3 — n=3, ignore. Sibling canisters at REI: BV475 Trek 4.4 / 43, BV425 Sprint 4.3 / 44, BV ONE 4.5 / 10. |
| Hyperlite Mountain Gear Roll-Top Food Bag Kit | 3.7 | 3 | Hyperlite Mountain Gear (mfr) | https://hyperlitemountaingear.com/products/roll-top-food-bag-kit | **Very small n (3).** JSON-LD and widget agree ("Rated 3.7 out of 5 stars", "Based on 3 reviews"). Not carried at REI. The **non-kit** "Roll-Top Food Bag" is a separate, much better-rated SKU: **5.0 / 19** (https://hyperlitemountaingear.com/products/roll-top-food-bag) — do not substitute it for the Kit. |
| REI Co-op Lightweight Stuff Sack | 4.6 | 7 | REI | https://www.rei.com/product/238955/rei-co-op-lightweight-stuff-sack | Small n (7). JSON-LD and widget agree. Sibling REI Co-op sacks: Lightweight Compression Stuff Sack 4.7 / 42 (238959), Durable Stuff Sack 4.7 / 42 (238954), Lightweight Dry Sack 3.5 / 8 (238956). |

## NO RATING FOUND

- **Zpacks Color Bands (6 Pack)** — the live Zpacks product page explicitly publishes
  0 reviews, and no other reachable retailer carries the SKU standalone.

## Caveats worth surfacing in the UI

- **Six value disagreements between REI and the manufacturer.** Ultra-Sil Dry Bag
  (REI 4.5 / 118 vs STS 4.8 / 229), Evac Compression Dry Bag HD (REI 4.8 / 25 vs
  STS 4.9 / 56), Ursack Major (REI 3.7 / 94 vs Ursack 3.96 / 23), Ursack AllMitey
  (REI 4.1 / 51 vs Ursack 4.19 / 27), Nylofume (Litesmith 5 / 82 vs GGG 4.8 / 681),
  and BV450 (REI 4.2 / 326 vs BearVault 5.00 / 3). REI was taken as authoritative
  wherever it carries the product.
- **Two products have no combined SKU and must be rated per size** if the UI lists a
  size: Sea to Summit Lightweight Dry Bag (REI per-size 4.7–4.8) and the Zpacks Pillow
  Dry Bag (Medium 4.6 / 56, Medium-Plus 4.9 / 24).
- **Zpacks publishes no JSON-LD `aggregateRating`.** Its averages exist only in the review
  widget's `aria-label`, which requires a real browser plus a scroll to render. Any
  re-audit that only greps JSON-LD will wrongly conclude Zpacks has no ratings.
- **Litesmith's 5 is integer-rounded** by BigCommerce, not a true 1-decimal average.
  Rendering it as "⭐ 5 (82)" is defensible but overstates precision next to 1-decimal
  neighbors; GGG's 4.8 / 681 is the sounder number for the same product.
- **Small-n rows to treat with care in a sort-by-rating:** HMG Roll-Top Food Bag Kit (3),
  REI Co-op Lightweight Stuff Sack (7), Granite Gear Air ZippSack (10), Zpacks Pack Liner
  (18), Zpacks Pillow Dry Bag Medium-Plus (24), Evac Compression Dry Bag HD (25).
- **Not carried at REI at all** (so REI ratings are unavailable, not delisted): Sea to Summit
  Ultra-Sil Stuff Sack (single), Sea to Summit Lightweight Stuff Sack, Nylofume pack liner,
  all four Zpacks items, Granite Gear Air ZippSack, Gossamer Gear Thinlight, HMG Roll-Top
  Food Bag Kit.
- **Granite Gear Air ZippSack is the only row sourced outside the preference chain**
  (CampSaver). Nothing in REI → mfr → Amazon → Backcountry/GGG publishes a rating for it.
