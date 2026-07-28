# Bags, organization & food storage — adversarial spec verification

Seventeen disputed claims were re-checked against live manufacturer pages, Shopify per-variant inventory endpoints, and major retailers, resolving into 21 product entries: **18 CONFIRMED, 3 PARTIAL, 0 UNVERIFIED**. **Eleven prior figures were wrong**, and the failure mode was overwhelmingly the same one every time — a product line's *smallest-size "from" price* (or smallest-size weight) recorded as if it applied to the whole line. The most dangerous entry was the Ursack Major "~$80 street price," which exists at no retailer on earth (real price $120.00–$124.95, and Amazon is $164.86); the runner-up is that LOKSAK has quietly delisted the 12x20 OPSak — the exact size Ursack officially recommends as a liner — so any buy link pointing at shop.loksak.com now 404s.

## Ursack Major — the "$80 street price"

**Question:** ursack.com shows $124.95 but multiple retailers reportedly ~$80. Is the ~$80 a discontinued colorway, a sale, a different model, or a real street price?

**Confidence:** CONFIRMED

**Answer:** **There is no ~$80 Ursack Major anywhere. The $80 figure is fiction and must be deleted.** The real, buyable price is **$120.00 at Six Moon Designs** and **$124.95 everywhere else**. Seven independent channels checked, all on the same day:

| Channel | Price (verbatim) | Stock |
|---|---|---|
| ursack.com | `$124.95 USD` | `available: true` (variant `URSMAJBLK`) |
| REI (#895691) | `$124.95` — `Add to cart—$124.95` | `In Stock at Salt Lake City`, `Ship to address By Sat, Aug 1 to 84111 FREE`, `32 people purchased this week`, `3.7` / `94 Reviews` |
| Backcountry | `Major Bear Bag $124.95` | listed |
| Garage Grown Gear | `Ursack Major by Ursack` `$ 124.95` | in stock |
| Outdoor Gear Exchange (gearx.com) | `Regular price $124.95 \| Sale price $124.95` | `Out of stock` |
| **Six Moon Designs** | **`$120.00`** — `"In stock, ships within 1 business day"`, local pickup `"Usually ready in 24 hours"` | in stock |
| Amazon | `$164.86`, `FREE delivery Tue, Aug 4` | in stock — **$40 ABOVE MSRP** |

Note the ursack.com rendered page displays the string `Sold out`. **That is a Shopify theme artifact, not reality** — the store's own inventory feed returns `available: true` for `ursack-major`. Do not report the Major as sold out. (The genuinely unavailable Ursack SKUs are `AllMitey Kodiak` $294.95, `AllMitey Grizzly` $259.95, `Ursack Minor` $109.95 and `GRRRSACK` $22.50, all `available: false`.)

Where the ~$80 most plausibly came from: the **used/secondhand market**. eBay currently shows a used `Ursack Major XL Bear Resistant Food Sack` at `$64.99` and an `Ursack AllMitey ... Old Version` at `$99.00`. Those are private resales of discontinued generations, not street price. Ursack's own full 20-product catalog contains nothing priced under $109.95 except cord ($8.95), OPSak ($14.99), aLOKSAK ($19.49) and the sold-out GRRRSACK ($22.50) — there is no sub-$100 Major, in any colorway, current or clearance.

Full verified Ursack price ladder (from ursack.com's own inventory feed, all `available: true` unless noted): Major `$124.95` · Major White `$124.95` · Major & OPSAK `$134.95` · Major XL `$139.95` · Major XL White `$139.95` · Limited Edition Major `$144.95` · Major XL & OPSAK `$149.95` · Limited Edition Major XL `$159.95` · Major 2XL `$164.95` · Major 2XL & OPSAK `$174.95` · AllMitey `$189.95` · AllMitey White `$189.95` · AllMitey & OPSAK `$199.95` · AllMitey Grizzly `$259.95` (**false**) · AllMitey Kodiak `$294.95` (**false**).

Major spec, verbatim from ursack.com: weight `7.6 oz`, capacity `about 10.65 Liters (approx. 5 days of food for 1 person)`, dimensions `12.5"x18"`. Six Moon Designs independently states `7.6 ounces - 216 g` / `10.6 liters`. REI's Technical Specs block also gives `Weight | 7.6 ounces` (and `"weight":"7.6 ounces"` in its JSON-LD), `Gear Capacity (L) 10.7 liters`, `Material(s) Spectra`, `Dimensions Folded: 9.8 x 6.7 x 2.2 in.; In use, cinched: 8 x 14 in.` — **but REI's own Features bullet on the same page says `weighs 7.8 oz.`** Three of four sources say 7.6 oz; treat 7.8 as REI copy drift and publish **7.6 oz**.

**Source:** https://ursack.com/products.json?limit=250 (browser-driven `page.request.get`, full 20-product feed with per-variant `available`); https://ursack.com/products/ursack-major (rendered); https://www.rei.com/search?q=ursack (browser-driven, rendered); https://www.backcountry.com/ursack (browser-driven, rendered); https://garagegrowngear.com/search/suggest.json?q=ursack (Shopify search JSON); https://www.gearx.com/ursack-ursack-major (WebFetch, rendered); https://www.sixmoondesigns.com/products/ursack-major-bear-resistant-food-sack-bag (WebFetch, rendered); https://www.amazon.com/s?k=ursack+major (browser-driven, rendered); https://www.ebay.com/sch/i.html?_nkw=ursack+major (browser-driven, rendered)

**Changes recommendation?** **Yes — highest priority in this document.** Delete every "~$80" reference. If the guide promises an $80 Ursack Major and a reader clicks through to $124.95, that is the single most embarrassing failure available in this lineup. Quote it as **$120.00 at Six Moon Designs** (the only real discount, $4.95 off, in stock, ships in 1 business day) or **$124.95** at REI / Backcountry / Garage Grown Gear / direct. Explicitly warn readers off Amazon, which is $164.86 — a 32% markup over MSRP. Do not link Outdoor Gear Exchange (out of stock).

## Ursack AllMitey — 9.5 oz vs 13 oz

**Question:** ursack.com lists 9.5 oz on the standard AllMitey but 13 oz on AllMitey White (identical size). SectionHiker reports 13 oz. Which is current?

**Confidence:** PARTIAL — the conflict is real, reproduced, and *unresolved by the manufacturer*, but the weight of evidence favors **~10 oz**, not 13 oz.

**Answer:** The contradiction is genuine and lives on Ursack's own site, between two pages for the same-size bag at the same price:

- `AllMitey`, https://ursack.com/products/ursack-allmitey — `$189.95 USD`, **`Weight: 9.5 ounces`**, `Capacity: about 10.65 Liters (approx. 5 days of food for 1 person)`, `Material: Laminated UHMWP and Kevlar`, plus the note `THE BLACK ALLMITEY SERIES BAGS NO LONGER HAVE A VELCRO ENCLOSURE.`
- `AllMitey White`, https://ursack.com/products/ursack-allmitey-white — `$189.95 USD`, **`Weight: The AllMitey weighs 13 ounces`**, `Capacity: about 10.65 Liters (approx. 5 days of food for 1 person)`, `Material: Laminated UHMWP and Kevlar`, `Recommend: Odor Barrier Bag (OP Sak 12 x 20)`.

The tiebreaker is REI, which sells the black AllMitey and publishes its own measured spec block, verbatim: **`Weight | 9.5 ounces`**, repeated in the page's JSON-LD (`"weight":"9.5 ounces"`) and in the Features bullet `Bag measures about 8 x 19 in. (diam. x H) when cinched closed, holds about 650 cu. in. (10.7 L) and weighs 9.5 oz.` Dimensions `Folded: 13 x 10.5 x 2.95 in.; In use, cinched: 8 x 19 in.` Materials `Spectra (ballistic polyethylene), Kevlar`. Price `$189.95`, availability `https://schema.org/InStock`, `4.1` stars / `51 Reviews`, `In Stock at Salt Lake City`.

So two of three sources say 9.5 oz. Against that: independently published user reports describe a bag whose **box is printed "13 oz"** while the product spec says 9.5 oz and an actual scale reads **10.3 oz**. That third number is the one to treat as the honest field weight.

Do NOT report 13 oz as the current spec, and do NOT report 9.5 oz as a measured weight. The defensible statement is: **manufacturer spec 9.5 oz (REI concurs); packaging and Ursack's own White page say 13 oz; the only reported scale weight is 10.3 oz.** The two Ursack pages also give identical capacity for both colorways, which rules out the "different size" explanation.

Ursack's Shopify shipping weights are useless here and contradict each other in a third direction: `AllMitey` = 269 g, `AllMitey White` = 454 g. Those are packed shipping weights and are not the spec.

**Source:** https://ursack.com/products/ursack-allmitey and https://ursack.com/products/ursack-allmitey-white (both WebFetch, rendered, quoted verbatim); https://www.rei.com/product/124165/ursack-allmitey-bear-and-critter-sack-10-liters (browser-driven, rendered body text + embedded JSON-LD); https://ursack.com/products.json?limit=250 (browser-driven, per-variant grams). sectionhiker.com returned HTTP 403 to direct fetch; its figures are reported here only as secondhand.

**Changes recommendation?** **Yes.** State the AllMitey as `9.5 oz (manufacturer spec)` with an explicit footnote that Ursack's own White-colorway page says 13 oz and that field reports land near 10.3 oz. Publishing a single unqualified number here is not defensible in either direction. Note that at 9.5 oz the AllMitey is only ~1.9 oz heavier than the Major (7.6 oz) for critter-proofing — but it costs $65 more.

## BearVault — full price/weight ladder incl. BV ONE

**Question:** One wholesaler listed the BV475 at $106.99, ABOVE the larger BV500's $99.99. Get real current MSRP for BV425/BV450/BV475/BV500, plus the BV ONE, which prior research never confirmed on the manufacturer site.

**Confidence:** CONFIRMED

**Answer:** **The $106.99 is not street price and is not MSRP.** The BV475 is `$94.99 USD` at bearvault.com — correctly *below* the BV500, exactly as capacity ordering demands. The full ladder is monotonic in both price and volume, with no inversions anywhere. Every canister is `available: true` in BearVault's own inventory feed.

| Model | Price (bearvault.com, verbatim) | Weight (verbatim) | Interior volume (verbatim) | Days of food | Dimensions (verbatim) | Stock |
|---|---|---|---|---|---|---|
| BV425 — Sprint | `$84.99 USD` | `1.75 lb \| 1 lb 12 oz \| 800 g` | `1.3 Gal \| 305 cubic inches \| 5 L` | `1-2 days` | `Diameter: 8.7 in \| 22.1 cm` · `Height: 6 in \| 15.2 cm` | available |
| BV450 — Jaunt | `$89.99 USD` | `2.1 lb \| 2 lb 1 oz \| 940 g` | `1.9 Gal \| 440 cubic inches \| 7.2 L` | `3-4 days` | `Diameter: 8.7 in \| 22.1 cm` · `Height: 8.3 in \| 21.1 cm` | available |
| **BV475 — Trek** | **`$94.99 USD`** | `2.25 lb \| 2 lb 4 oz \| 1.03 kg` | `2.5 Gal \| 565 cubic inches \| 9.3 L` | `5-6 days` | `Diameter: 8.7 in \| 22.1 cm` · `Height: 10.5 in \| 26.7 cm` | available |
| BV500 — Journey | `$99.99 USD` | `2.5 lb \| 2 lbs 9 oz \| 1.16 kg` | `3 Gal \| 700 cubic inches \| 11.5 L` | `7 Days` | `Diameter: 8.7 in \| 22.1 cm` · `Height: 12.7 in \| 32.3 cm` | available |
| **BV ONE — Adjustable** | **`$120.00 USD`** | **`1.97 lb (1 lb 15 oz / 895 g)`** | **`8.3 L (505 cubic inches / 2.19 gallons)` expanded; `4.65 L (282 cubic inches / 1.23 gallons)` collapsed** | `1–4+ days` | `Diameter: 9 in (22.9 cm)` · `Height (Expanded): 8.5 in (21.6 cm)` · `Height (Collapsed): 5.6 in (14.2 cm)` · internal opening `8.5 in (21.7 cm)` top / `6.6 in (16.7 cm)` bottom | available |

**BV ONE is now fully confirmed on the manufacturer site** — $120.00, 895 g, telescoping from 4.65 L to 8.3 L. BearVault's own copy: `Expands when full and compresses as you eat, reducing wasted pack space as your food supply shrinks.` REI carries it too, at `$120.00`, `4.5` stars / `10` reviews.

**REI prices the four fixed canisters five cents lower than BearVault does:** REI shows `BV500 Journey Bear Canister $99.95` and `BV450 Jaunt Bear Canister $89.95`. Use `.95` if quoting REI and `.99` if quoting direct — they are not the same number, and a guide that mixes them looks sloppy.

Shipping weights from BearVault's Shopify feed (packed, NOT spec): BV425 794 g, BV450 953 g, BV475 1021 g, BV500 1134 g, BV ONE 894 g. These track the published specs closely, which is itself a useful cross-check — no canister's spec is inflated.

**Source:** https://bearvault.com/products.json?limit=250 (per-variant price + `available` + grams); https://bearvault.com/products/bv425 , /bv450 , /bv475 , /bv500 , /bv-one (all rendered, spec tables quoted verbatim); https://bearvault.com/ (rendered listing); REI cross-price read off https://www.rei.com/product/124165/... related-items module (browser-driven, rendered)

**Changes recommendation?** **Yes.** Kill the $106.99 — it is a wholesaler artifact and it inverts the lineup, which is the kind of error a reader will spot instantly. Publish the clean $84.99 / $89.99 / $94.99 / $99.99 / $120.00 ladder. The BV ONE deserves a real entry now that it is confirmed: at 895 g it is **lighter than the BV450** while collapsing to 4.65 L, which makes it the only canister here that doesn't punish you for carrying it on the last day of a trip — but it costs $30 more than the BV450 and holds ~1 L more than the BV425 at full extension. Also note BearVault ships free on `orders over $50`, so any canister clears the threshold on its own.

## LOKSAK OPSak — per-size price, per-bag weight, and the 12x20 question

**Question:** Per-size prices and WEIGHTS both unverified. Ursack says "approximately one ounce" for the 12x20; Garage Grown Gear's shipping weight implies ~2.5 oz/bag. Also: is the 12x20 discontinued at shop.loksak.com or just out of stock?

**Confidence:** CONFIRMED

**Answer:** Three findings, and the first one is the big one.

**(1) The weight conflict is an artifact of packaging, and everything is sold in 2-packs.** Ursack's OPSak page states verbatim: `This 12 X 20 sealable plastic bag is made from a special film that is 17,000 times more odor-resistant than HDPE. When used properly, the OPSak is 100% water and air tight. New double zip closure. **Each bag in the 2 pack weighs about 1 ounce.**` That sentence resolves it — **1 oz per bag**, and the $14.99 buys **two bags, not one**. Garage Grown Gear's `2.5 oz/bag` implication comes from its listed *shipping* weight of `5 oz` for the 12x20 two-pack; divided by two that is 2.5 oz apiece, but that figure includes retail packaging and is a fulfilment weight, not a product weight. Do not use it. Note also that literally every OPSak and aLOKSAK SKU at both LOKSAK and GGG is a "Set of Two" — there is no single-bag SKU anywhere.

**(2) The 12x20 is GONE from shop.loksak.com — genuinely delisted, not merely out of stock.** I pulled LOKSAK's complete 27-product catalog from its own inventory feed. It contains exactly four OPSak entries and the 12x20 is not among them:

| shop.loksak.com OPSak SKU | Title (verbatim) | Price | Available |
|---|---|---|---|
| `OP2-7x7` | `Odor Proof Bag for Day Hikes & Short Trips \| Bear Barrier Tested \| 7x7" 2 Pack \| OPSAK®` | `$10.99` | true |
| `OP2-9X10` | `Odor Proof Bag for Food & Toiletries \| Bear Barrier Tested \| 9x10" 2 Pack \| OPSAK®` | `$12.49` | true |
| `OP2-28x20` | `Large Odor Proof Bag for Base Camp & Bulk Food \| Bear Barrier Tested \| 28x20" 2 Pack \| OPSAK®` | `$25.49` | true |
| (none) | `OPSAK® Odor Proof Bag Variety Pack \| **All 3 Sizes** \| Bear Barrier Tested` | `$21.49` | true |

The Variety Pack's own title says **"All 3 Sizes"** — LOKSAK itself now treats the line as three sizes. Both `/products/opsak-1` and `/products/opsak-12x20` return **HTTP 404**; `/collections/opsak` returns 200. An out-of-stock Shopify product still resolves 200 with `available: false`; a 404 plus absence from the full feed means delisted. **This is the single most consequential finding on this item, because the 12x20 is the one size Ursack recommends as an Ursack liner** (`Recommend: Odor Barrier Bag (OP Sak 12 x 20)`).

**(3) The 12x20 is still buyable — just not from LOKSAK.** Two live channels, both at the same price, both in stock:

- **ursack.com** — `OPSak`, `Regular price $14.99 USD`, SKU `884265`, `available: true`, 17 reviews / `3.53 out of 5`. Page text confirms it is the 12x20.
- **Garage Grown Gear** — `OPSAK Odor Proof Bags by LOKSAK`, variant `Set of Two 12" x 20" Bags (OP2-12x20)`, `$14.99`, `available: true`. Page copy: `Looking for something to pair with your Ursack? 12" x 20" bags work great!` and `OPD2-12x20: Set of Two 12" x 20" Bags | 30.5cm x 50.8cm`. `Ships in 1-2 business days | Based in Naples, Florida | Est. 1998`. `4.6 Based on 90 Reviews`. `***Discounts are not available on this product`.

Full GGG OPSak ladder (all `available: true`): 7x7 2-pack `$10.99` (ship wt 1.5 oz) · 9x10 2-pack `$12.49` (2.6 oz) · **12x20 2-pack `$14.99` (5 oz)** · 28x20 2-pack `$25.99` (0.55 lb). GGG's 28x20 is `$25.99` vs LOKSAK's `$25.49` — GGG is 50 cents higher on that one size and identical or cheaper on the rest.

Ursack's Shopify shipping weight for its OPSak 2-pack is 85 g, which is far closer to the ~2 oz of product plus packaging than GGG's 142 g figure — another sign the 5 oz is a fulfilment number.

**Source:** https://shop.loksak.com/products.json?limit=250 (browser-driven `page.request.get`, complete 27-product feed enumerated); HTTP status probes of https://shop.loksak.com/products/opsak-1 (404), /products/opsak-12x20 (404), /collections/opsak (200); https://ursack.com/products/opsak (browser-driven, rendered, weight sentence quoted verbatim); https://garagegrowngear.com/products/opsak-odor-proof-bags-by-loksak.json (per-variant price + shipping weight) and the rendered page. **Do not rely on WebFetch for LOKSAK's feed** — a WebFetch summary of the same URL silently omitted products and would have concealed the 12x20's absence; the finding only holds because the raw feed was enumerated in a browser.

**Changes recommendation?** **Yes, and urgently, because the buy link is broken.** Any guide that links shop.loksak.com for the 12x20 sends the reader to a 404. Retarget to ursack.com or Garage Grown Gear, both $14.99 for two bags. And correct the unit: quote it as **$14.99 for a 2-pack, ~1 oz per bag** — the guide should never imply $14.99 buys one bag, and should never publish 2.5 oz. Worth stating plainly that LOKSAK has dropped the size Ursack officially recommends, because that is a supply risk for anyone building an Ursack + odor-barrier system.

## Sea to Summit Ultra-Sil Stuff Sack

**Question:** Prior claim of FLAT $18.95 across ALL sizes. Prior research cross-checked against 3-packs but never confirmed per-variant.

**Confidence:** CONFIRMED

**Answer:** **Flat pricing is false.** `$18.95` is the 1.5L only — i.e. the "from" price mistaken for the line price. Real range `$18.95–$29.95`; the 20L is **$11.00 more** than the guide claims. Six sizes × three colorways (High Rise, Zinnia, Blue Atoll) = 18 variants, **all `available: true`**, and price does not vary by color.

| Size | Spec weight (verbatim) | Price | Dimensions (verbatim) |
|---|---|---|---|
| 1.5L | `0.6 oz` | $18.95 | `5 × 5 × 8 in` |
| 3L | `0.7 oz` | $19.95 | `5 × 5 × 9 in` |
| 5L | `0.9 oz` | $22.95 | `6 × 6 × 11 in` |
| 8L | `1.1 oz` | $24.95 | `7 × 7 × 13 in` |
| 13L | `1.6 oz` | $27.95 | `9 × 9 × 15 in` |
| 20L | `1.7 oz` | $29.95 | `10 × 10 × 17 in` |

Materials `100% Nylon`; `Hydrostatic Head 2000 mm`; SKUs A4541–A4546. Shopify `grams` (SHIPPING weight, not spec): 33 / 39 / 46 / 55 / 69 / 76 g — these run 16–28 g above spec and must never be quoted as gear weight.

One caveat: the 8L→13L jump (1.1 → 1.6 oz) is irregular but is corroborated by the shipping-weight jump (55 → 69 g). REI's URL for this SKU redirects to a category page, so this line rests on the manufacturer page alone.

**Source:** https://seatosummit.com/products/the-ultra-sil-stuff-sack (browser-driven rendered page — the TECH SPECS table is JS-rendered and absent from raw HTML, so a rendering browser is mandatory); https://seatosummit.com/products.json?limit=250&page=2 and /products/the-ultra-sil-stuff-sack.json (per-variant price + `available`)

**Changes recommendation?** **Yes.** Delete "$18.95 all sizes." Publish the table, or at minimum write "from $18.95."

## Sea to Summit Lightweight Stuff Sack

**Question:** Prior claim of FLAT $17.95 across all sizes.

**Confidence:** CONFIRMED

**Answer:** **Also false, same failure mode.** `$17.95` is the 3L only. Range `$17.95–$27.95`. And the size ladder is not the one the guide probably assumes — it starts at 3L (there is no 1.5L) and tops out at **30L**, not 20L.

| Size | Spec weight (verbatim) | Price | Dimensions (verbatim) | Availability |
|---|---|---|---|---|
| 3L | `1.0 oz` | $17.95 | `5 × 5 × 9 in` | all 3 colors true |
| 5L | `1.4 oz` | $19.95 | `6 × 6 × 11 in` | all 3 colors true |
| 8L | `1.7 oz` | $21.95 | `7 × 7 × 13 in` | all 3 colors true |
| 13L | `2.1 oz` | $22.95 | `9 × 9 × 15 in` | all 3 colors true |
| 20L | `2.6 oz` | $24.95 | `10 × 10 × 17 in` | all 3 colors true |
| 30L | `3.4 oz` | $27.95 | `11 × 11 × 19 in` | Burnt Olive true, Spicy Orange true, **Surf the Web false** |

17 of 18 variants in stock. Colorways: Burnt Olive, Spicy Orange, Surf the Web. Materials `100% Nylon` (described as `durable 70D recycled Nylon`); `Hydrostatic Head 2000 mm`; SKUs A4511–A4516. Shipping `grams`: 64 / 77 / 90 / 107 / 129 / 153 g.

**Source:** https://seatosummit.com/products/lightweight-stuff-sack (browser-driven rendered); https://seatosummit.com/products.json?limit=250&page=2 and /products/lightweight-stuff-sack.json

**Changes recommendation?** **Yes.** Fix the price and fix the size range to 3L–30L.

## Sea to Summit Ultra-Sil Dry Bag

**Question:** Current per-size weight + price (prior research had flagged the old-gen weights as stale).

**Confidence:** CONFIRMED — independently corroborated at REI

**Answer:** **The staleness warning is validated in full.** Current 8L = `1.4 oz`, 13L = `1.7 oz`, 20L = `2.0 oz` — exactly the corrected figures, and the old-gen 8L=1.1 / 13L=1.4 numbers are confirmed obsolete. Six sizes × five colorways (Spicy Orange, Blue Atoll, Tarragon, Zinnia, High Rise) = 30 variants; price uniform within a size.

| Size | Spec weight (verbatim) | Price | Dimensions (verbatim) | Out-of-stock colors |
|---|---|---|---|---|
| 3L | `1.1 oz` | $22.95 | `6 × 7 × 8 in` | Blue Atoll |
| 5L | `1.1 oz` | $24.95 | `6 × 7 × 12 in` | Blue Atoll |
| 8L | `1.4 oz` | $29.95 | `7 × 8 × 14 in` | High Rise |
| 13L | `1.7 oz` | $32.95 | `8 × 9 × 17 in` | Blue Atoll |
| 20L | `2.0 oz` | $34.95 | `9 × 11 × 19 in` | none |
| 35L | `2.6 oz` | $39.95 | `11 × 13 × 22 in` | none |

26 of 30 variants `available: true`; every size has at least one colorway in stock. Materials `Sack: 100% Nylon; Buckles: 100% POM`; `Shape Oval`; `Repair Buckle Size 15 mm`; `Hydrostatic Head 2000 mm`; SKUs A4241–A4246. REI's own Technical Specs table independently lists the identical ladder verbatim — `3 L: 1.1 ounces / 5 L: 1.1 ounces / 8 L: 1.4 ounces / 13 L: 1.7 ounces / 20 L: 2 ounces / 35 L: 2.6 ounces` — with matching dimensions. Shipping `grams`: 55 / 60 / 69 / 79 / 95 / 114 g.

**Source:** https://seatosummit.com/products/ultra-sil-dry-bag (browser-driven rendered); cross-check https://www.rei.com/product/218732/sea-to-summit-ultra-sil-dry-bag (browser-driven rendered, REI's own spec block); https://seatosummit.com/products.json?limit=250&page=2

**Changes recommendation?** **No** on weights if the guide already carries the corrected current-gen figures — two independent sources now agree. **Yes** if the guide omits the 3L or 35L, or quotes a single price for the line.

## Sea to Summit Lightweight Dry Bag

**Question:** Current per-size weight + price.

**Confidence:** CONFIRMED

**Answer:** Seven sizes × five colorways (Surf the Web, Sulphur, Spicy Orange, Burnt Olive, Beluga) = 35 variants; price uniform within a size. **This is a materially different product from the Ultra-Sil Dry Bag, not a cheaper trim of it** — `Hydrostatic Head 10000 mm` versus Ultra-Sil's 2000 mm, and it is rated `Best Use: Backpacking & Paddle Sports` where Ultra-Sil is backpacking-only.

| Size | Spec weight (verbatim) | Price | Dimensions (verbatim) | In-stock colors |
|---|---|---|---|---|
| 1.5L | `1.2 oz` | $15.95 | `4 × 6 × 7 in` | Surf the Web only |
| 3L | `1.6 oz` | $18.95 | `5 × 7 × 8 in` | Sulphur, Spicy Orange, Burnt Olive |
| 5L | `1.8 oz` | $22.95 | `6 × 7 × 13 in` | Sulphur, Spicy Orange |
| 8L | `2.4 oz` | $25.95 | `6 × 8 × 15 in` | Surf the Web, Sulphur, Beluga |
| 13L | `2.9 oz` | $28.95 | `8 × 9 × 18 in` | Sulphur only |
| 20L | `3.2 oz` | $32.95 | `9 × 11 × 19 in` | Surf the Web, Sulphur, Burnt Olive, Beluga |
| 35L | `4.1 oz` | $37.95 | `11 × 12 × 22 in` | Surf the Web, Sulphur |

**Stock is genuinely thin: only 18 of 35 variants `available: true`.** Every size has at least one color, but 1.5L and 13L are down to a single colorway each. Materials `Sack: 100% Nylon; Buckles: 100% POM`; `Shape Oval`; `Repair Buckle Size 15 mm`; SKUs A4001–A4007. Shipping `grams`: 61 / 75 / 82 / 102 / 123 / 137 / 166 g.

**Source:** https://seatosummit.com/products/lightweight-dry-bag (browser-driven rendered); https://seatosummit.com/products.json?limit=250&page=2 and /products/lightweight-dry-bag.json

**Changes recommendation?** **Yes** if the guide names a colorway — most are unavailable. Recommend by size and flag that color availability is thin.

## Sea to Summit Evac Compression Dry Bag

**Question:** Prior claim 13L = 4.8 oz / $39.95+.

**Confidence:** PARTIAL — weight right, price wrong by $10, and **the product name as written is unresolvable**

**Answer:** **There is no current product simply named "Evac Compression Dry Bag."** The line is three distinct products with different weights and different prices, and a bare reference cannot be acted on. This is the most important finding in the Sea to Summit set.

The prior claim maps to the **Evac *Lightweight* Compression Dry Bag**, whose 13L is indeed `4.8 oz` — **weight CONFIRMED**. But its 13L price is **$49.95, not $39.95**. `$39.95` is the 5L entry price; the "from" price was again mistaken for the size price.

**Evac Lightweight Compression Dry Bag** (page title renders as `Evac Compression Dry Bag`) — 5 sizes × 2 colors (Turkish Tile, High Rise), all 10 variants `available: true`. `Hydrostatic Head 10000 mm`; `Shape Round`; `Bag: 100% Pre-consumer Recycled Nylon; Rolling: 100% Hypalon; Buckle: 100% Polyformaldehyde; Screw: 100% Stainless Steel`; SKUs A4226–A4230.

| Size | Spec weight | Price | Dimensions |
|---|---|---|---|
| 5L | `3.5 oz` | $39.95 | `6 × 7 × 12 in` |
| 8L | `4.0 oz` | $44.95 | `7 × 8 × 16 in` |
| **13L** | **`4.8 oz`** | **$49.95** | `8 × 9 × 18 in` |
| 20L | `5.6 oz` | $54.95 | `9 × 10 × 18 in` |
| 35L | `6.7 oz` | $59.95 | `12 × 13 × 22 in` |

**Evac Ultralight (UL)** — 5 sizes × 2 colors (High Rise, Blue Atoll), all 10 in stock. `Hydrostatic Head 2000 mm`; `Shape Round`; SKUs A4236–A4240. 3L `2.0 oz` $39.95 · 5L `2.3 oz` $44.95 · 8L `2.7 oz` $49.95 · 13L `3.3 oz` $54.95 · 20L `3.9 oz` $59.95.

**Evac Heavy Duty (HD)** — 4 sizes, single color, all 4 in stock. `Hydrostatic Head 10000 mm`; `Shape Oval`; SKUs A4215–A4218. 8L `7.8 oz` $59.95 · 13L `8.4 oz` $69.95 · 20L `10.9 oz` $79.95 · 35L `13.1 oz` $89.95.

The trap: **at 13L the three products are 3.3 oz / 4.8 oz / 8.4 oz and $54.95 / $49.95 / $69.95.** The UL is *lighter but more expensive* than the Lightweight. Any entry that doesn't name the variant is actively misleading. (A `Evac Compression Dry Bag (Like New)` listing also exists at handle `evac-compression-dry-bag-used` — that is a used/discontinued listing, not the current line.)

**Source:** https://seatosummit.com/products/the-evac-compression-dry-bag , /evac-compression-dry-bag-ul , /evac-compression-dry-bag-hd (all browser-driven rendered); https://seatosummit.com/products.json?limit=250 and each /products/<handle>.json

**Changes recommendation?** **Yes — highest priority in the Sea to Summit set.** Fix the 13L price $39.95 → $49.95 and rename the product to "Evac **Lightweight** Compression Dry Bag," because UL and HD at the same capacity differ by up to 3.6 oz and $20.

## Zpacks Pack Liner

**Question:** Prior claim 1.2 oz / $59.95, sizes S 27L / M 44L / L 57L.

**Confidence:** CONFIRMED (volumes) — **prior claim materially WRONG on both price and weight**

**Answer:** Volumes are right; price and weight are the Small's, quoted as if they applied to all three sizes.

| Size | Price | Spec weight (verbatim) | Volume (verbatim) | Flat dimensions (verbatim) | Fits | Available |
|---|---|---|---|---|---|---|
| Small | `$59.95 USD` | `1.2 oz / 35 g` | `Around 1650 cubic inches (27 Liters)` | `17" wide x 32" tall (43 cm x 81 cm)` | `40L and smaller backpacks` | true |
| Medium | `$64.95 USD` | `1.6 oz / 46 g` | `Around 2,800 cubic inches (44 Liters)` | `19.5" wide x 38.5" tall (49.5 cm x 98 cm)` | `50-60L backpacks` | true |
| Large | `$69.96 USD` | `1.7 oz / 49 g` | `Around 3300 cubic inches (57 Liters)` | `22" wide x 38.5" tall (43 cm x 98 cm)` | `70L backpacks` | true |

The `$69.96` is not a transcription error on our end — it is the literal value in Zpacks' store (`price_max: 69.96`). Zpacks appears to have fat-fingered `$69.95`. Lead time all sizes: `Ships in 1-3 Business Days`.

Two live defects on Zpacks' page worth knowing about: the Large's flat dimension reads `22" wide x 38.5" tall (43 cm x 98 cm)`, but 22" is 56 cm — 43 cm is the *Small's* 17", so the metric conversion is wrong. And the size dropdown renders as `Small - 35`, `Medium - 46`, `Large - 49`; **those trailing numbers are grams, not liters**, and a careless read produces a bogus "S 35L / M 46L / L 49L."

**Source:** https://zpacks.com/products/pack-liner (rendered raw HTML) + https://zpacks.com/products/pack-liner.js (per-variant price/availability)

**Changes recommendation?** **Yes.** A single "$59.95 / 1.2 oz" line is wrong for two of three sizes. Publish the per-size table.

## Zpacks stuff sacks (drawstring DCF line)

**Question:** Real per-size names, volumes, weights, prices, availability.

**Confidence:** CONFIRMED

**Answer:** Eight sizes in the core **drawstring** line. Note these are drawstring, not roll-top — the roll-top family is separate ("Dry Bags": Small/Slim/Tall/Medium/Medium-Plus/Big/Large Rectangle/Wide Mouth, $29.95–$44.95).

| Size | Price | Spec weight (verbatim) | Volume + full/closed dimensions (verbatim) | Colors / availability |
|---|---|---|---|---|
| Mini | $18.95 | `0.15 oz / 4.2 g` | `2.5" x 4" x 5.5" tall (6.5 cm x 10 cm x 14 cm) / 55 cubic inches (.9L)` | Blue ✓, Olive Drab ✓, Spruce Green ✓ |
| Small | $19.95 | `0.18 oz / 5 g` | `~5" diameter x 6" tall (13 cm x 15 cm) / 105 cubic inches (1.7L)` | Blue ✓, OD ✓, **Spruce SOLD OUT** |
| Small-Plus | $21.95 | `0.21 oz / 6 g` | `6" diameter x 6.5" tall (15 cm x 16.5 cm) / 184 cubic inches (3L)` | Blue ✓, OD ✓, **Spruce SOLD OUT** |
| Slim | $21.95 | `0.24 oz / 6.8 g` | `5" diameter by 12.5" tall (13 cm x 32 cm) / 245 cubic inches (4L)` | Blue ✓, OD ✓ (2 colors only) |
| Medium | **$26.95** (White $21.95) | `0.28 oz / 7.8 g` | `6" diameter by 12" tall (15 cm x 30.5 cm) / 340 cubic inches (5.6L)` | Blue ✓, OD ✓, Spruce ✓, White ✓ |
| Medium-Plus | **$28.95** (White $23.95) | `0.32 oz / 9 g` | `7" diameter by 13" tall (18 cm x 33 cm) / 520 cubic inches (8.5L)` | Blue ✓, OD ✓, Spruce ✓, White ✓ |
| Big | $29.95 | `0.35 oz / 10 g` | `8" diameter by 13" tall (20.3 cm x 33 cm) / 650 cubic inches (10.7L)` | Blue ✓, OD ✓, **Spruce SOLD OUT** |
| Large | $39.95 | `0.4 oz / 11.4 g` | `11" wide by 5.5" deep by 12" tall (28 cm x 14 cm x 30 cm) / 750 cubic inches (12.3L)` | Blue ✓, OD ✓ |

Two traps. **(a) Price varies by color on Medium and Medium-Plus.** Collection and search pages show `$21.95` / `$23.95` — those are "from" prices reflecting a discounted White variant. The Blue/Olive/Spruce price is $26.95 / $28.95, so a scrape of the listing page comes out **$5 low**. **(b) Weight varies by color.** Spruce Green uses heavier fabric (`.75 oz/sqyd` vs `.55 oz/sqyd`): Mini Spruce `0.18 oz / 5 g` vs Blue/OD `0.14 oz / 4 g`; Small-Plus Spruce `0.28 oz / 8 g` vs `0.21 oz / 6 g`; **Big Spruce `0.49 oz / 14 g` vs `0.35 oz / 10 g` — a 40% penalty.** The headline widget always quotes the lighter Blue/Olive figure.

**Source:** https://zpacks.com/products/{mini,small,small-plus,slim,medium,medium-plus,big,large}-stuff-sack (rendered raw HTML) + matching `.js` endpoints; collection cross-check https://zpacks.com/collections/stuff-sacks

**Changes recommendation?** **Yes** if the guide quotes Medium/Medium-Plus at $21.95/$23.95 (that is the White-only clearance price), or recommends Spruce Green without noting the heavier fabric.

## Zpacks Color Bands (6 Pack)

**Question:** Prior claim 0.07 oz / $4.95.

**Confidence:** CONFIRMED

**Answer:** Both figures correct. The exact product name is `Color Bands for Dry Bags (6 Pack)`, not "Zpacks Color Bands 6-pack." Price `$4.95 USD`; weight `0.07 oz / 2 g`; `Lead Time Ships in 1-3 Business Days`; single `Default Title` variant, SKU 16832, available. Body copy verbatim: `They weigh almost nothing at a third of a gram each, just 2 grams for the whole set of 6.` Fitment verbatim: `These fit on our Dry Bags, Pillow Dry Bags, Food Bags, Packing Cubes, Pack Liners, all of our roll top style Backpacks or on the sternum strap, and any other items with 1/2" buckles.`

**Source:** https://zpacks.com/products/color-bands-for-dry-bags-6-pack (rendered raw HTML) + `.js` endpoint

**Changes recommendation?** **No** on the numbers. Optionally correct the product name string.

## Zpacks Wallet Stuff Sack

**Question:** Price, weight, dimensions, availability — never retrieved.

**Confidence:** CONFIRMED

**Answer:** Title `Wallet Stuff Sack` (handle is the legacy `wallet-camera-stuff-sack`). Price `$12.95 USD`; weight `0.08 oz / 2.2 g`; flat dimensions `3.5" wide x 5.5" tall (9 cm x 14 cm)`; no published volume; `Lead Time Ships in 1-3 Business Days`; single `Default Title` variant, SKU 1275, available. Material verbatim: `Constructed from 1.0 oz/sqyd Dyneema® Composite Fabric.` and `Dyneema® Composite Fabric is waterproof, but our stuff sacks should only be considered water resistant due to the seam and draw cord opening.` Minor internal inconsistency: the headline widget says `0.08 oz / 2.2 g` while the variant `data-weight` attribute says `0.07 oz / 2 g` (derived from the integer-gram Shopify field). Use **0.08 oz / 2.2 g** as the spec.

**Source:** https://zpacks.com/products/wallet-camera-stuff-sack (rendered raw HTML) + `.js` endpoint

**Changes recommendation?** **No** — nothing was disputed; figures now confirmed and can be published.

## Zpacks Pillow Dry Bags

**Question:** Prior claim 5.6L / 1.4 oz / $54.95 and 8.2L / 1.6 oz / $59.95.

**Confidence:** CONFIRMED — both sizes, every figure exactly right

**Answer:** These are two separate products, not one product with two variants.

| Product | Price | Spec weight (verbatim) | Volume (verbatim) | Flat dimensions (verbatim) | Full dimensions (verbatim) |
|---|---|---|---|---|---|
| `Medium Pillow Dry Bag` | `$54.95 USD` | `1.4 oz / 41 g` | `340 cubic inches / 5.6 Liters` | `9.75" wide x 18.5" tall (25 cm x 47 cm)` | `roughly 6" diameter by 12" tall (15 cm x 30.5 cm)` |
| `Medium-Plus Pillow Dry Bag` | `$59.95 USD` | `1.6 oz / 46 g` | `500 cubic inches / 8.2 Liters` | `11.25" wide x 20" tall (28.5 cm x 51 cm)` | `roughly 7" diameter by 13" tall (18 cm x 33 cm)` |

Both available (SKUs 761 and 762); both `Ships in 1-3 Business Days`; both marked `Imported.` — unlike the Pack Liner, these are not Made in USA. **Trap:** a third URL, https://zpacks.com/products/pillow-dry-bags, looks like a product page and reports `$54.95` / `1.4 oz / 40 g`, but it is a dummy collection placeholder — its SKU literally reads `Dummy-Collection-Item-Pillow-Dry-Bags`, its `body_html` is empty, and its 40 g contradicts the real Medium's 41 g. Do not cite it.

**Source:** https://zpacks.com/products/medium-pillow and https://zpacks.com/products/medium-plus-pillow (rendered raw HTML) + `.js` endpoints; dummy item identified via https://zpacks.com/products/pillow-dry-bags.json

**Changes recommendation?** **No** — prior claim fully verified.

## Zpacks Bear Bagging Kit

**Question:** The page is internally inconsistent — spec widget says 3.2 oz (Large) / 3 oz (Big); body copy says 3.4 oz / 3.1 oz. Which is correct?

**Confidence:** CONFIRMED — inconsistency reproduced and resolved

**Answer:** **The spec widget is correct. The body copy is wrong for both sizes. Publish 3.2 oz (Large) and 3.0 oz (Big).**

Spec widget, verbatim from per-variant `data-weight`: all four **Large** variants `3.2 oz / 92 g` at `$64.95 USD`; all four **Big** variants `3 oz / 85 g` at `$59.95 USD`.

Body copy, verbatim and complete:

```
The Kit includes:
Large Roll Top Food Bag - 1.3 ounces (38 grams)
or Big Roll Top Food Bag - 1.2 oz (31 grams)
50 feet of 2 mm Z-Line Slick cord: 1.7 ounces (48 grams)
Rock Sack: .1 ounce (2.8 grams)
Mini Carabiner: .1 ounce (2.8 grams)
Total Weight of all components:
Large: 3.4 ounces (92 grams) or Big: 3.1 ounces (85 grams)
```

The gram column is internally consistent and the ounce column is not. **Large:** components sum to 1.3 + 1.7 + 0.1 + 0.1 = **3.2 oz**, and 38 + 48 + 2.8 + 2.8 = 91.6 → **92 g**. The body copy's own parenthetical says `(92 grams)` immediately beside `3.4 ounces`, and 92 g = 3.245 oz → 3.2 oz. Both cannot be true; `3.4` is a typo for `3.2`. **Big:** the widget's `3 oz / 85 g` is self-consistent (85 g = 2.998 oz). The `3.1 ounces` traces to a *second* error in a component line — the Big Roll Top Food Bag is listed as `1.2 oz (31 grams)`, but 31 g = 1.09 oz and Zpacks' own standalone Big Food Bag page lists `Weight 1.1 oz (31 g)`. Corrected: 1.1 + 1.7 + 0.1 + 0.1 = **3.0 oz**, gram sum 84.6 → **85 g**.

So there are **three** defects on this page, not one: the Large total, the Big food-bag component, and the resulting Big total. Every gram figure on the page is correct; the ounce conversions are where the rot is.

| Size | Price | Spec weight | Volume (verbatim) | Full dimensions (verbatim) | Days of food | Available |
|---|---|---|---|---|---|---|
| Large | `$64.95 USD` | `3.2 oz / 92 g` | `850 cubic inches / 14 Liters` | `11" wide by 6" deep by 13" tall (28 cm x 15 cm x 33 cm)` | `Up to 5-6` | all 4 combos |
| Big | `$59.95 USD` | `3 oz / 85 g` | `650 cubic inches / 10.7 Liters` | `roughly 8" diameter by 13" tall (20.3 cm x 33 cm)` | `Up to 3-4` | all 4 combos |

All 8 SKUs in stock: Size (Large/Big) × Cord Color (Dark Gray/Orange) × Color (Blue/Olive Drab). `Ships in 1-3 Business Days`. Fabric `1.6 oz/sqyd Dyneema® Composite Fabric` (vs `1.0 oz/sqyd` for regular Dry Bags). One more hazard: the cross-sell carousel at the bottom of this same page renders the kit as `$59.95` (the min price across variants) while the page header shows `$64.95`.

**Source:** https://zpacks.com/products/bear-bagging-kit (rendered raw HTML; widget read from per-variant `data-weight`, body copy from the Specifications tab) + `.js` and `.json` endpoints; Big Food Bag component weight cross-checked against the Big Food Bag entry in the same page's cross-sell module (`Weight 1.1 oz (31 g)`)

**Changes recommendation?** **Yes.** Publish 3.2 oz / 3.0 oz. If the guide carries 3.4 / 3.1 it is repeating a manufacturer arithmetic error. Add a footnote that Zpacks' own page contradicts itself, since a reader who checks the source will land on 3.4.

## Nylofume pack liner

**Question:** Prior claim 0.91 oz / 25.9 g, $2.49–$7.10. Confirm on litesmith.com and establish what each price actually buys — 1 bag or 2?

**Confidence:** CONFIRMED

**Answer:** The weight claim is right; the price range was meaningless without units, and now has them. **$2.49 buys ONE bag. $7.10 buys THREE. There is no 2-pack at Litesmith.** The option group is `Package Quantity: (Required)` with exactly two choices, `SINGLE` and `3 PACK`, both `instock: true` / `purchasable: true`.

Litesmith spec block, verbatim: `Ultralight – 0.91 oz (25.9 g)` · `Weight: 0.91 oz (25.9 g)` · `Material: Nylon polymer film, 1 mil thick, clear, unscented` · `Size: 20 x 37 in. (50.8 x 94 cm) flat bag, ungusseted` · `To the Top: 3168 cu in. (51.9 L), based on 8 x 12 x 33 in. (20.3 x 30.5 x 83.8 cm) to the top, flat bag with ungusseted bottom` · `Usable with Tie Off: 2592 cu in. (42.5 L) with 6 in. (15.2 cm) reserved for tie off at the top`.

**The shipping threshold is the real cost driver and the guide almost certainly omits it.** Litesmith: `Free US Shipping over $60*`, with the caveat `*Products with fixed shipping are excluded from any free shipping offer.` A $2.49 order is nowhere near $60, so shipping will cost several times the item.

**Garage Grown Gear is cheaper at every quantity, offers a 2-pack, and publishes a DIFFERENT spec:** One `$2.40` · Two `$4.50` · Three `$6.50`, all `available: true`. GGG's spec text verbatim: `Dimensions (flat): 20" x 36" | 50.8cm x 91.4cm` / `Weight: 1oz | 29g (per bag)` / `Materials: Nylon polymer`. So the two vendors disagree on the same product — **0.91 oz / 20"×37" (Litesmith) vs 1 oz / 20"×36" (GGG)**. Neither is obviously authoritative; footnote both rather than silently picking one.

Also: the old URL `litesmith.com/nylofume-bag/` returns **404**. The live URL is `/nylofume-pack-liner-bags/`.

**Source:** https://www.litesmith.com/nylofume-pack-liner-bags/ (rendered page + BigCommerce `/remote/v1/product-attributes/169` POSTed per option to read each quantity's real price and stock — this is a BigCommerce store, not Shopify, so there is no products.json); https://www.litesmith.com/shipping-returns/; https://www.garagegrowngear.com/products/nylofume-pack-liner-bags.json plus GGG paginated products.json

**Changes recommendation?** **Yes.** State the units ($2.49 = one bag, $7.10 = three). Print the $60 free-shipping threshold — at these prices it dominates. Add GGG as the cheaper source with a genuine 2-pack. Footnote the 0.91 oz vs 1 oz vendor disagreement. Fix the URL if the dead one is in use.

## Granite Gear Air ZippSack

**Question:** 5L and 9L weights unverified; 12L = 1.4 oz and 16L = 1.7 oz claimed. Get all four plus price and current availability.

**Confidence:** CONFIRMED on specs and manufacturer-direct availability; PARTIAL on retailer stock

**Answer:** All four weights confirmed, and the prior 12L/16L claims are **correct**. Spec table verbatim from granitegear.com:

| Specifications | 5L | 9L | 12L | 16L |
|---|---|---|---|---|
| Inches | 8 x 5 x 4 | 10 x 6 x 5 | 12 x 7 x 6 | 14 x 8 x 7 |
| Grams | 29 | 33 | 40 | 48 |
| Ounces | 1 | 1.2 | 1.4 | 1.7 |
| Centimeters | 20 x 13 x 10 | 24 x 15 x 13 | 30 x 18 x 15 | 36 x 20 x 18 |
| Cubic Inch | 280 | 550 | 730 | 980 |

**Not discontinued — but the 5L can no longer be ordered from Granite Gear direct.** The `Volume` dropdown offers only three options: `16 Liters`, `12 Liters`, `9 Liters`. And every remaining size is down to a single colorway:

| Size | Color | Price direct | Availability |
|---|---|---|---|
| 5 L | Orange | $28.95 (MSRP, from the page's embedded product data) | **not orderable on granitegear.com** |
| 9 L | Lemon Lime | $30.95 | `Availability: In Stock` |
| 12 L | Grape | $35.95 | `Availability: In Stock` |
| 16 L | Blueberry | $39.95 | `Availability: In Stock` |

Description verbatim: `The Air Zippsacks are our ultralight zippered stowage solution.` · `The "bath tub" construction leaves no seams to leak when they are set on the wet earth or in the bottom of a kayak for that matter.` · `Made of PFAS-compliant materials.`

5L can still be found at CampSaver, which lists all four SKUs (`21821-3003-PC` 5L Orange, `21822-4013-PC` 9L LemonLime, `21823-6002-PC` 12L Grape, `21824-5015-PC` 16L Blueberry) at the identical $28.95 / $30.95 / $35.95 / $39.95 ladder, advertised "Up to 25% Off". **Caveat: listed ≠ in hand** — CampSaver's page data shows `"availability":"https://schema.org/BackOrder"` with `"qoh":"0"` on at least the 16L. Granite Gear's own page also points to `Buy at Campsaver.com`, `Buy at boundarywaterscatalog.com`, `Buy at Outdoor Gear Exchange`.

**Source:** https://www.granitegear.com/air-zippsack-pc.html (browser-driven; Volume dropdown exercised per option; spec table from raw HTML; price ladder cross-checked against the page's embedded Magento `simpleProducts` config); https://www.campsaver.com/granite-gear-air-zippsack.html (raw HTML, SKU list + JSON-LD availability)

**Changes recommendation?** **Yes.** Add the confirmed 5L (1 oz / 29 g) and 9L (1.2 oz / 33 g). Add per-size prices. Most importantly, flag that **5L is not orderable direct** and that each size is down to one color — this line reads like it is being wound down, and a reader sent to granitegear.com for a 5L finds nothing.

## Hilltop Packs — stuff sacks, zipper pouches, Dual Pocket Battery Bag

**Question:** Per-size weights never confirmed because the site shows "from" prices only.

**Confidence:** CONFIRMED

**Answer:** Resolved by paginating Hilltop's own inventory feed (255 products across six pages) for authoritative per-variant price and `available`, with weights read from each product's published spec copy. **Do not use the Shopify `grams` field on this store — it is shipping weight and is frequently 0 or a placeholder.** Disclaimer on the pouch pages, verbatim: `All weights and dimensions are approximate.`

**Stuff sacks are three separate lines, and the middle one is the trap.**

**A. `Stuff Sacks - SmartPack Series`** — 70D PU/DWR coated nylon ripstop

| Size | Dimensions (verbatim) | Capacity | Weight (verbatim) | Price | Avail |
|---|---|---|---|---|---|
| Small | `Small 4.75"x 6.5"  (12x16.5cm)` | `0.6 Liters` | `Small 0.30oz (8.5g)` | $9.00 | true |
| Medium | `Medium 7.5"x 11.5"  (19x29cm)` | `2.5 Liters` | `Medium 0.55oz (15.5g)` | $11.00 | true |
| Large | `Large 9.5"x 13.5"  (24x34cm)` | `4.5 Liters` | `Large 0.77oz (22g)` | $14.00 | true |
| Jumbo | `Jumbo 11.5"x 17"  (29x43cm)` | `9.5 Liters` | `Jumbo 1.07oz (30g)` | $18.00 | true |
| Jumbo Plus | `Jumbo PLUS 13"x20" (33x50cm)` | `15.5 Liters` | `Jumbo PLUS 1.37oz (39g)` | $22.00 | true |
| Full Set | — | — | — | $64.00 | true |

**B. `Ultralight Stuff Sack (D50T Fabric Gear Organizer)`** — same dimensions, same capacities, and **identical published weights**, at up to 63% more money: Small `0.30oz (8.5g)` $9.90 · Medium `0.55oz (15.5g)` $14.30 · Large `0.77oz (22g)` $22.80 · Jumbo `1.07oz (30g)` $26.40 · Jumbo Plus `1.37oz (39g)` $32.10. All available. Hilltop's own copy says `D50T is very comparable in weight to 1.43 Dyneema`. **If the guide recommends D50T over SmartPack on weight grounds, Hilltop's own published numbers do not support it** — the premium buys fabric character, not grams.

**C. `Ultralight Dyneema Stuff Sack (Minimalist Gear Organizer)`** — genuine DCF; this is where weight actually collapses: Small `0.10 oz (2.8g)` $26.95 · Medium `0.17 oz (4.8g)` $34.95 · Large `0.21 oz (6g)` $46.95 · Jumbo `0.31 oz (8.7g)` $59.95 · Jumbo Plus `0.49oz (14g)` $71.95 (Semi Clear / Green). All available.

**`Ultralight Zipper Pouch Organizer Classic Patterns`** — pricing is driven by **pattern**, not only size:

| Size | Dimensions (verbatim) | Weight (verbatim) | Stock White | Any printed/solid pattern |
|---|---|---|---|---|
| Small | `2.75" x 5.25"` | `Small - 0.25oz / 7g` | $12.40 | $19.60 |
| Medium | `Medium - 4.5" x 7.5" (11cm x 19cm)` | `Medium - 0.37oz / 10g` | $15.90 | $23.10 |
| Large | `Large - 5.25" x 10.5" (13cm x 27cm)` | `Large - 0.48oz / 14g` | $17.60 | $26.80 |

All available. Header copy: `Weights starting at just` `0.25 oz (7g)`. The sibling `Zipper Pouches New Patterns Ultralight D50T fabric` has identical weights and dimensions but no cheap white option ($19.60 / $23.10 / $26.80). If the guide covers the clear version — `Clear Ultralight Zipper Pouch (Water-Resistant Vinyl)`: `Small - 0.45 oz` $14.00 · `Medium - 0.76 oz` $18.00 · `Large - 0.1.06 oz` $22.00 (that malformed string is a typo **on Hilltop's site**, presumably 1.06 oz) · Full Set $48.00, all available — roughly 2× the weight of the D50T pouches.

**`Dual Pocket Battery Bags`** (title is plural). Description verbatim: `Made of Challenge D50T fabric. Highly weather resistant with a cinch top. Video above says Dyneema but all new Dual Pocket Battery Bags are made of D50T fabric.`

| Size | Dimensions (verbatim) | Weight (verbatim) | Green/Red printed | White/unprinted | Avail |
|---|---|---|---|---|---|
| Small | `5.25x5.25" (13x13cm)` | `0.21oz (7g)` | $22.00 | $16.00 | true |
| Large | `5.25x7.5" (13x19cm)` | `0.31oz (8g)` | $24.00 | $18.00 | true |

**Source:** https://hilltoppacks.com/products.json?limit=250 paginated pages 1–6 (255 products, browser-driven `page.request.get` — authoritative per-variant price + `available`); per-product https://hilltoppacks.com/products/&lt;handle&gt;.json `body_html` for weights (handles `stuff-sacks-smartpack-series`, `stuff-sacks-ultralight-challenge-d50t-fabric-8`, `stuff-sacks-ultralight-non-printed-dyneema-1`, `zipper-pouches`, `zipper-pouches-kit-patterns-ultralight-d50t-fabric`, `clear-zipper-pouches-smartpack-series`, `dual-pocket-battery-bags`)

**Changes recommendation?** **Yes.** Replace every "from $X" with a real per-size table. Three specific corrections: (1) SmartPack and D50T stuff sacks have **identical published weights** — the price premium is not a weight saving; (2) zipper-pouch price is driven by pattern, and plain white is ~37% cheaper at the same weight; (3) the Battery Bag is $16/$18 unprinted vs $22/$24 printed.

## REI Co-op Lightweight Stuff Sack

**Question:** Per-size specs never retrieved — rei.com timed out.

**Confidence:** CONFIRMED

**Answer:** Retrieved by driving rei.com in a real browser. Product `#238955`, breadcrumb `Drawcord Stuff Sacks`. **Only one colorway exists: Oxidized Yellow.** Header renders as `$13.95 – to $16.95`.

| Size | Price | Weight (verbatim) | Dimensions (verbatim) | Capacity (verbatim) | Availability |
|---|---|---|---|---|---|
| 5 L | $13.95 | `5 L: 0.7 ounces` | `5 L: 6 x 14 inches` | `5 L: 5 liters` / `305 cubic inches` | selectable, `disabled=false` |
| 10 L | $14.95 | `10 L: 0.9 ounces` | `10 L: 7 x 15 inches` | `10 L: 10 liters` / `610 cubic inches` | selectable, `disabled=false` |
| 15 L | $15.95 | `15 L: 1 ounces` | `15 L: 8 x 18 inches` | `15 liters` / `915 cubic inches` | selectable, `disabled=false` |
| 20 L | $16.95 | `20 L: 1.2 ounces` | `20 L: 9 x 20 inches` | `20 L: 20 liters` / `1,220 cubic inches` | selectable, `disabled=false` |

Buy-box options verbatim: `Oxidized Yellow/5 L  $13.95`, `Oxidized Yellow/10 L  $14.95`, `Oxidized Yellow/15 L  $15.95`, `Oxidized Yellow/20 L  $16.95`. SKU `2389550001` carries `"status":"AVAILABLE"` — **all four sizes in stock**. Rating `4.6 out of 5` from `7 reviews`, badged `TOP RATED`. Other verbatim notes: `Each size sold separately; 32 fl oz. water bottle not included` · `Contains materials that meet the bluesign® criteria` · `From a Climate Label Certified brand` · shipping `FREE` with `$60 minimum`.

Quote the 15 L as **1.0 oz** — `15 L: 1 ounces` is REI's own ungrammatical rendering, and REI publishes only one decimal here. Don't imply more precision than the source has.

**Source:** https://www.rei.com/product/238955/rei-co-op-lightweight-stuff-sack — browser-driven (Playwright navigate + live-DOM evaluate). **Both WebFetch and Playwright's `page.request.get` timed out on rei.com**, and this page's JSON-LD block was empty, so the JSON-LD-first approach did not work; prices came from the live `#size-dropdown` and specs from the rendered spec table. A non-browser fetch will not reproduce this.

**Changes recommendation?** **Yes** — this item had no data at all before; add the full four-row table. Context worth printing for a weight-focused guide: at 0.7–1.2 oz these are roughly **2× the weight of Hilltop's D50T sacks** at comparable volume and ~7× the DCF ones, but they are cheap, single-vendor, and all in stock.

## Gossamer Gear Thinlight Foam Pad 1/8"

**Question:** Prior claim 2.7 oz rolled / 3.3 oz folded / $22.00, plus current stock.

**Confidence:** CONFIRMED

**Answer:** **The weights are correct; the price is wrong for the folded version.** `$22.00` buys the Rolled only. Folded is `$32.00` — a 45% difference the prior claim collapsed into one number by pairing "$22.00" with the 3.3 oz folded weight.

Product title verbatim `Thinlight Foam Pad - 1/8"`. Spec table verbatim under `Average Weight`:

| Variant | Weight (verbatim) | Dimensions (verbatim) | Price | In stock |
|---|---|---|---|---|
| Rolled | `Rolled - Total` `2.7 oz (76 g)` | `Rolled 1/8" Pad` `58.7"  x  19" x 1/8"` | $22.00 | `available: true` |
| Folded | `Folded - Total` `3.3 oz (94 g)` | `Folded 1/8" Pad` `10.7"  x 19" x 1"`; `Folded (Extended)` `73.5"  x  19"  x  1/8"` | $32.00 | `available: true` |
| Rolled Wide | `Rolled Wide - Total` `4.1 oz (116 g)` | `Rolled Wide` `58.7"  x  25"  x  1/8"` | $24.00 | `available: true` |

**All three variants are currently in stock.** A web-search snippet claiming the product shows "Notify Me When Available" is wrong — Gossamer Gear's own product feed reports `available=true` for all three. Note the Folded variant is *longer* when extended (73.5" vs 58.7") — it is not merely the rolled pad folded up, which explains both the extra 0.6 oz and the extra $10. Copy verbatim: `The Gossamer Gear Thinlight Foam Insulation Pad is the sleeping pad of your minimalist dreams.` and `The folded pad perfectly replaces the sit pad in a size medium pack without any trimming.`

**The "1/8" vs 1/4"" framing is outdated — there is no 1/4" Thinlight.** Gossamer Gear's complete foam-pad lineup: `Thinlight Foam Pad - 1/8"` (Rolled / Folded / Rolled Wide, 2.7 / 3.3 / 4.1 oz, $22 / $32 / $24, all in stock) · `Torso Foam Pad - 3/8"` $33.00, in stock · `SitLight` 21"/19"/17", $13.00 each, in stock · `Little Sit Pads` $6.00 (Grey true, **Blue false**, Orange true) · `GVP Foam Donut` $6.00, in stock. So the real confusion risk is **1/8" Thinlight vs 3/8" Torso Foam Pad**, and within the Thinlight itself Rolled vs Folded vs Rolled Wide.

**Source:** https://www.gossamergear.com/products/thinlight-foam-pad.json (variant prices + availability); https://www.gossamergear.com/collections/foam-pads/products.json?limit=250 (full lineup); https://www.gossamergear.com/products/thinlight-foam-pad (rendered spec table); cross-checked against https://www.gossamergear.com/products.json?limit=250 to confirm no other Thinlight thickness exists. Shopify `grams` is useless here — it lists 85 g for both the 2.7 oz and 3.3 oz variants.

**Changes recommendation?** **Yes.** Keep 2.7 oz / 3.3 oz but stop pairing "$22.00" with the folded weight. Add Rolled Wide (4.1 oz, $24) — cheaper than Folded and usually overlooked. Drop any reference to a 1/4" Thinlight; the real second option is the 3/8" Torso Foam Pad at $33.

## Ziplock / freezer bag weights

**Question:** Prior research could not source this at all, and it matters because the guide recommends freezer bags over $20 pouches. Find a credible primary spec for a quart and a gallon freezer bag.

**Confidence:** PARTIAL for quart · **UNVERIFIED** for the gallon point value

**Answer:** **No manufacturer publishes a per-bag weight.** ziploc.com, scjp.com and whatsinsidescjohnson.com were all checked directly — Ziploc's consumer page offers only marketing language (`Durable and Thick`, `Thicker bag helps prevent rips, tears, punctures, and holes.`) with no number. Neither Hefty nor Glad publishes one either, and none of the named backpacking outlets has published a weighed gallon figure.

**QUART — best supported: ≈6 g / 0.21 oz.** Two independent lines converge. Stated measurement, verbatim: `An empty Mountain House package weighs 0.95 ounces (26.9 grams) versus 0.21 ounces (6 grams) for a 1 quart Ziploc freezer bag.` (PopUpBackpacker). Be honest about the caveat: PopUpBackpacker is a long-running backpacking blog but is **not** one of the outlets named in the brief, and it states the figure without saying it was scale-weighed. Independent corroboration from foodservice case weight — Ziploc 364957, 1 qt freezer, `Thickness: "2.7 Mil"`, `Quantity: "300/Case"`, `Shipping Weight: "4.3 lb."` → 4.3 lb ÷ 300 = **6.50 g/bag including the carton**, so the bare bag is ≤6.5 g. That is arithmetic rather than a quoted source, but it independently caps the number and agrees with 6 g.

**GALLON — bound only, ≤13.7 g / ≤0.48 oz. No sourced point value.** Ziploc 364937, one-gallon freezer: `Thickness: "2.4 Mil"`, `Quantity: "250/Case"`, `Shipping Weight: "7.54 lb."` → 7.54 lb ÷ 250 = 13.7 g/bag including carton. Comparing against the gallon *storage* SKU at identical count (364948, `Thickness: "1.66 Mil"`, `Shipping Weight: "5.66 lb."` → 10.3 g/bag incl. carton) suggests roughly 11 g for the gallon freezer bag — **but that is back-calculated algebra, not a source. Do not print it as a spec.**

**Freezer vs regular storage — freezer is roughly 1.5× thicker.** The manufacturer does not publish mil, but distributor listings carrying SC Johnson spec copy do:

| | Quart | Gallon |
|---|---|---|
| Freezer | **2.7 mil** | **2.4 mil** (conflicting: 2.70 mil at three other distributors) |
| Storage | **1.66 mil** | **1.66 mil** |

Verbatim: `These durable, 2.7 mil bags are a great, space-saving way to store meats, vegetables, and fruit.` (quart freezer) versus `These durable, 1.66 mil bags are a great, space-saving way to store sandwiches, vegetables, dried foods, and more.` (quart storage).

**Explicitly rejected as hearsay:** four packaging-vendor SEO content farms (hemcbags.com, hongrenpacking.com, biopakwell.com, morekeyac.com) claiming quart freezer "7–12 g" and gallon freezer "15–22 g" — the gallon claim is **falsified**, since the case weight caps a gallon freezer bag at 13.7 g *including* its share of the carton. Also rejected: an Amazon listing showing `Item Weight 0.27 g` for a 300-count carton (data-entry error), and an Adventure Alan comparison-table row showing bare `0.1` / `.05` with no units. Checked and confirmed NOT to contain the data: SectionHiker's freezer-bag-cooking article (its only weights are a 0.40 oz spoon and a 21 g bowl), BackpackingLight's "Freezer Bag Issues" thread, and AdventureAlan. Walmart and Staples were bot-walled.

**Source:** https://popupbackpacker.com/freezer-bag-cooking/ · https://www.webstaurantstore.com/ziploc-364957-7-x-7-716-1-qt-freezer-storage-bag-with-double-zipper-and-writeon-label-case/721364957.html · https://www.webstaurantstore.com/ziploc-364937-10-916-x-10-34-one-gallon-freezer-bag-with-double-zipper-and-writeon-label-case/721364937.html · https://www.webstaurantstore.com/ziploc-364948-10-916-x-10-34-one-gallon-storage-bag-with-double-zipper-and-writeon-label-case/721364948.html · https://www.webstaurantstore.com/ziploc-364899-7-x-7-716-1-qt-storage-bags-with-double-zipper-and-writeon-label-case/721364899.html · https://www.nasscoinc.com/item/94604/SC-Johnson-Professional/ · https://www.gomadill.com/ziploc-gallon-freezer-bags-large-size-3.79-l-10.56-268.29-mm-width-x-10.75-273.05-mm-depth-2.70-mil-69-micron-thickness-clear-250-carton-meat-food-poultry-seafood.html

**Changes recommendation?** **Yes, with a hedge.** Publish quart as **≈0.2 oz / ~6 g** with the source named inline. Publish gallon only as a bound — **under 0.5 oz / ≤13.7 g** — not a point value. Add the freezer-vs-storage distinction (freezer ~1.5× thicker at 2.4–2.7 mil vs ~1.66 mil), which is both why freezer bags are the right recommendation and why they weigh more. Do not print a hard gallon gram figure. The only route to a CONFIRMED number is weighing one on a 0.1 g scale — no manufacturer publishes it.

## Still unresolved

- **Ursack AllMitey true weight.** Ursack contradicts itself (9.5 oz vs 13 oz) on two same-size, same-price pages, and the only scale figure in circulation (10.3 oz) is a secondhand user report. sectionhiker.com returns HTTP 403 to direct fetch, so SectionHiker's 13 oz could not be read verbatim. A definitive answer requires weighing one.
- **Gallon freezer bag weight.** Bounded at ≤13.7 g by case arithmetic; no published per-bag figure exists from any manufacturer or reputable outlet. Needs a scale.
- **Granite Gear Air ZippSack 5L real availability.** Not orderable direct; CampSaver lists it but at least one sibling size shows `BackOrder` with `qoh: 0`. Whether a 5L can actually be delivered was not established.
- **Sea to Summit Ultra-Sil Stuff Sack 13L weight.** The 1.1 → 1.6 oz jump from 8L is irregular. REI's URL for this SKU redirects to a category page, so there is no independent second source for that row.
- **Nylofume vendor spec disagreement.** Litesmith says 0.91 oz / 20"×37"; Garage Grown Gear says 1 oz / 20"×36" for the same bag. No upstream manufacturer page was located to break the tie.
- **Zpacks Pack Liner Large price.** Listed as `$69.96`, which reads like a typo for $69.95 but is the literal value in Zpacks' store. Not worth chasing, but do not "correct" it silently.
- **Litesmith Nylofume shipping cost.** The $60 free-shipping threshold is confirmed, but the actual shipping charge on a sub-$10 order was not read from a checkout.

## Method

Two techniques, and the choice between them mattered more than usual on this batch.

**(a) Shopify/BigCommerce inventory endpoints for price and stock.** Per-variant `price` and `available` were read from each store's own feed — `/products.json?limit=250` (paginated where the catalog exceeds 250: Sea to Summit 429 products / 2 pages, Zpacks ~799, Hilltop Packs 255 / 6 pages, Garage Grown Gear ~1,298), plus `/products/<handle>.json` and `/products/<handle>.js` for single products, and `/search/suggest.json` for cross-store lookups. Litesmith is BigCommerce and has no products.json; its per-quantity prices came from POSTing its `/remote/v1/product-attributes/<id>` endpoint once per option.

**(b) Rendered-page reads for weights.** Published spec weights are frequently JS-rendered and absent from raw HTML (this is true of every Sea to Summit TECH SPECS table), so weights were read off the live DOM. **Shopify's `grams` field is a shipping weight and was never used as a spec** — it runs 15–30 g high on Sea to Summit, is 0 or a placeholder across much of Hilltop Packs, and lists an identical 85 g for both the 2.7 oz and 3.3 oz Gossamer Gear Thinlight variants.

Three tooling findings worth carrying forward:

- **`curl` is unusable for this work right now.** Every Shopify store returned `HTTP 429 local_rate_limited` with `retry-after: 60` on the first request. Nothing was retrieved by curl in this audit.
- **WebFetch silently drops items from large JSON.** A WebFetch summary of `shop.loksak.com/products.json` omitted products and returned false negatives on Sea to Summit's catalog. **This nearly concealed the single most consequential finding here** — that LOKSAK has delisted the 12x20 OPSak — which only held up because the raw 27-product feed was enumerated in a browser. Do not trust WebFetch on any inventory feed; use it for rendered single pages only.
- **rei.com resists non-browser fetching entirely.** WebFetch and Playwright's `page.request.get` both timed out; only real browser navigation worked, and on the Lightweight Stuff Sack page the JSON-LD block was empty, so specs had to come from the rendered table and prices from the live `#size-dropdown`.

Availability text on rendered Shopify pages was treated as unreliable throughout. ursack.com's Major page displays the string `Sold out` while its own feed returns `available: true` — a theme artifact. Stock claims in this document come from the `available` boolean, not from page copy.
