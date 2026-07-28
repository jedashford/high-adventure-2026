# Cooking & utensils — adversarial spec verification

Twenty-one disputed claims were re-checked against manufacturer product pages, Shopify per-variant inventory endpoints, MSR's own PDF instruction manuals, and REI/Amazon as second sources. **Eight prior figures were flat wrong** — including a $15.00 error on the GSI Halulite Boiler, a product ("GSI Pinnacle Dualist II") that does not exist in any current catalog, and a $9.00 error on the Victorinox Classic SD. Two prior "conflicts" turned out to be real data that discovery misread (the Kitchen Sink weight, the Wilderness Wash price), and the safety claim is TRUE but the quoted wording was a paraphrase, not MSR's text.

Tally: **18 CONFIRMED, 3 PARTIAL, 0 UNVERIFIED.**

## GSI Halulite Boiler (1.8 L)

**Question:** Claimed 11 oz / $39.95. Confirm both on gsioutdoors.com.

**Confidence:** PARTIAL

**Answer:** The price is WRONG by $15.00. It is a two-variant product and neither variant is $39.95. From GSI's own Shopify variant feed, verbatim: `"1.1 Liter" price "49.95" available true sku 50190` and `"1.8 Liter" price "54.95" available true sku 50191`. The rendered page confirms the default: "Regular price $49.95 USD" with a size selector, and both sizes are in stock. So the 1.8 L is **$54.95**, the 1.1 L is $49.95. GSI publishes NO weight anywhere on this product page — the entire Measurements & Specs block reads only "Dimensions (1.1 L) 5 in x 4.8 in x 5.1 or (1.8 L) 5.8 in x 6 in x 5.6 in" and "Includes Boiler, Lid, Mesh Stuff Sack". The 11 oz claim is therefore not confirmable from GSI. It is however plausible: GSI's Shopify variant `grams` are 245 (1.1 L) and 313 (1.8 L), and REI's published spec for the 1.1 L is "Weight 8.6 ounces" — 245 g = 8.64 oz, an exact match, which suggests 313 g = **11.0 oz** for the 1.8 L is the real figure. Treat that as derived, not published. Note also REI carries ONLY the 1.1 L ("Halulite Boiler Pot - 1.1 Liters, $49.95"); the 1.8 L is GSI-direct only. GSI page also carries a hard caution: "CAUTION: Never heat Halulite cookware to extreme temperatures or allow it to boil dry. Pot and lid intended for stovetop use only. Not for use with microwave ovens, conventional ovens or open campfires." Free shipping threshold on gsioutdoors.com is "$55+", so a lone 1.8 L at $54.95 misses it by 5 cents.

**Source:** https://gsioutdoors.com/products/halulite-boiler.js (per-variant price + available, authoritative); https://gsioutdoors.com/products/halulite-boiler (rendered); https://www.rei.com/product/895451/gsi-outdoors-halulite-boiler-pot-11-liters (browser-driven, spec block)

**Changes recommendation?** Yes. A $39.95 line item is 27% under the real price and would blow a youth-group budget sheet. Print "$54.95, 1.8 L, GSI direct only" and stop linking REI for the 1.8 L. If the guide wants a sub-$50 aluminum boiler, the 1.1 L at $49.95 is the one REI actually stocks, at a published 8.6 oz.

## GSI "Pinnacle Dualist II" vs GSI Halulite Dualist

**Question:** Pinnacle Dualist II claimed $59.99 vs Halulite Dualist claimed $99.99 — are these different products? Get current price/weight for each.

**Confidence:** CONFIRMED

**Answer:** They are not two live products. **The Pinnacle Dualist II does not exist in any current catalog and cannot be bought.** GSI's own site search returns an empty product array for "pinnacle dualist" (`{"resources":{"results":{"products":[]}}}`), the handles /products/pinnacle-dualist, /pinnacle-dualist-ii and /pinnacle-dualist-2 all return HTTP 404, and a full pull of GSI's 357-product catalog contains no Pinnacle Dualist of any generation. REI's search for "gsi pinnacle dualist" returns 20 GSI products and not one is a Pinnacle Dualist; the legacy REI page /product/830774/gsi-outdoors-pinnacle-dualist-cookset renders with no price and no spec block. Amazon's legacy listing B006ERS9VU reads "Currently unavailable." The $59.99 figure is a stale/legacy number for a discontinued SKU. What GSI actually sells today, per-variant from its own feed, all `available: true`: **Halulite Dualist $99.95** (sku 50278, variant grams 590), **Halulite Dualist HS $109.95** (sku 50259, grams 655), **Halulite Dualist HS Complete $189.95** (sku 50152), **Halulite Microdualist $89.95** (sku 50277, grams 473), **Glacier Dualist $79.95** (sku 68278). So "$99.99" was near-right — the real number is **$99.95**. GSI publishes no weights; REI does, for the two it carries: Halulite Dualist HS "Weight 1 lb. 8.8 oz." and Halulite Microdualist "Weight 1 lb. 0.7 oz." REI does not carry the plain Halulite Dualist at all. Contents, verbatim from GSI: Halulite Dualist HS "Includes: 1.8 L pot, strainer lid, 20 fl. oz. mugs with insulated sleeves, 2 20 fl. oz. bowls, 2 sip-it tops, 2 folding sporks, welded sink."; Microdualist "Includes: 1.4 L pot, strainer lid, 2 14 fl. oz. mugs with insulated sleeves, 2 14 fl. oz. bowls, 2 sip-it tops, 2 folding sporks, welded sink."

**Source:** https://gsioutdoors.com/search/suggest.json?q=pinnacle%20dualist (empty); gsioutdoors.com/products.json?limit=250 paginated to 357 products; https://gsioutdoors.com/products/halulite-dualist , /halulite-dualist-hs , /halulite-microdualist-1 (rendered); https://www.rei.com/search?q=gsi%20pinnacle%20dualist , /product/225824/... , /product/225825/... (browser-driven); https://www.amazon.com/dp/B006ERS9VU (browser-driven, "Currently unavailable.")

**Changes recommendation?** Yes — delete the Pinnacle Dualist II line entirely rather than marking it "cheaper option". There is no price to quote and no retailer to link, and a scout troop chasing a $59.99 two-person cookset will find nothing. If the guide needs a budget two-person set in that slot, the live substitute is the **Glacier Dualist at $79.95** (stainless, heavier) or the **Halulite Microdualist at $89.95 / 1 lb 0.7 oz**, which is the cheapest aluminum Dualist REI actually stocks. Also flag the weight reality out loud: every one of these is over a pound with the mugs, bowls and sink in it — they are group kits, not ultralight.

## TOAKS Titanium Long Handle Spoon (SLV-03)

**Question:** Claimed 0.65 oz / $9.95. Confirm on toaksoutdoor.com.

**Confidence:** CONFIRMED

**Answer:** Both figures are exactly right. Variant feed: `"Toaks Titanium Long Handle Spoon" price "9.95" available true sku SLV-03`. Product page spec line, verbatim: "SKU: SLV-03 Material: Titanium (no coating) Weight: 0.65 oz (19 g) Length: 8 5/8" (220 mm) Origin: Designed in the USA, manufactured in China". In stock. For context on the neighbours, all confirmed from the same feed: TOAKS Titanium Short Handle Spoon (SLV-10) $8.95; Titanium Spoon (SLV-13) $8.95; Ultralight Titanium Spoon (SLV-05) $8.95; **Long Handle Spoon with Polished Bowl (SLV-11) $10.95 silver / $14.95 blue or green**; Long Handle Spork with Polished Bowl (SLV-14) $10.95 silver / $14.95 colored; Titanium Spork (SLV-01) $8.95 silver / $12.95 colored; Titanium Folding Spork (SLV-06) $10.95; Petite Folding Spork (SLV-16) $8.95; 3-Piece Cutlery Set (SLV-02) $19.95.

**Source:** https://www.toaksoutdoor.com/products/slv-03 (rendered spec line); toaksoutdoor.com/products.json?limit=250 (114-product catalog, per-variant price + available)

**Changes recommendation?** No change — this one was right. Worth adding as a note: for $1.00 more the SLV-11 polished-bowl version is the one REI stocks and rates 4.8/5 over 168 reviews, and the polished bowl is meaningfully nicer in the mouth for kids. Either is a fine youth-group answer.

## TOAKS Titanium 1300 ml Pot (POT-1300) and bail-handle variant (POT-1300-BH)

**Question:** POT-1300 claimed 4.8 oz / $50.95; POT-1300-BH price unverified. Get both.

**Confidence:** CONFIRMED

**Answer:** POT-1300 price and weight both confirmed, and the previously-unverified BH price is now known. **POT-1300: $50.95**, `available true`, sku POT-1300. Page spec verbatim: "Weight: Pot only: 3.7 oz (105 g); Pot with lid: 4.8 oz (136 g)" — so the prior "4.8 oz" is the pot-**with-lid** figure, which is the honest one to print since the lid ships with it. Also verbatim: "Capacity: 44 oz (1300 ml), measured to the top of the pot", "Pot: 5 1/8" (130 mm) diameter × 3 7/8" (100 mm) height", "With lid and handles folded: 5 3/4" (145 mm) diameter × 3 7/8" (102 mm) height". **POT-1300-BH: $52.95**, `available true`, sku POT-1300-BH, spec verbatim "Weight: 5 oz (141 g)", "Capacity: 44 oz (1300 ml), measured to the top", "With bail handle on: 6" (152 mm) diameter x 3 7/8" (102 mm) height", "With bail handle removed: 5 3/4" (145 mm) diameter x 3 7/8" (102 mm) height", "Gradation: Yes, in oz and ml", and it "comes equipped with a lockable-handled lid, internal gradations in oz and ml, and a mesh storage sack." Related, same feed: POT-1350 $52.95, CKW-1300 (1300 ml pot with pan) $52.95, POT-1100 $46.95, POT-1100-BH $48.95, POT-1600 $52.95, POT-1600-BH $56.95.

**Source:** https://www.toaksoutdoor.com/products/pot-1300 and /products/pot-1300-bh (rendered spec blocks); toaksoutdoor.com/products.json?limit=250

**Changes recommendation?** Yes, mildly. The BH premium is only **$2.00** (+0.2 oz) and buys a bail handle you can hang over a fire or lift with a stick — for a youth group that is a real safety and usability upgrade for almost nothing. Also fix the weight framing: say "4.8 oz with lid (3.7 oz pot alone)" rather than a bare 4.8 oz, so nobody thinks they're getting a lid for free.

## TOAKS Titanium 750 ml Pot (POT-750)

**Question:** Currently in the guide. Confirm current price and weight.

**Confidence:** CONFIRMED

**Answer:** **$26.00**, `available true`, sku POT-750. Page spec verbatim: "Weight: Pot only: 3oz (86g), Pot with lid: 3.6oz (103g)", "Capacity: 25.4 oz (750ml), 760ml if measured to the top of the pot", "Dimensions: 3 3/4" (94mm) diameter x 4 3/8" (110mm) height (Internal)". REI sells the same pot at **$26.95** (4.7 stars / 158 reviews), so TOAKS direct is 95 cents cheaper. Adjacent variants from the same feed: POT-750-BH (bail handle) **$30.00**, 241 g shipping; POT-750-NH (no handle) $32.95. Combos: "TOAKS Titanium 750ml Pot and 450ml Cup Combo Set" $50.95; "750ml Pot and Wood Stove Combo Set" $70.95.

**Source:** https://www.toaksoutdoor.com/products/pot-750 (rendered); toaksoutdoor.com/products.json?limit=250; https://www.rei.com/product/223112/... similar-items panel showing "TOAKS Titanium 750 ml Pot $26.95" (browser-driven)

**Changes recommendation?** No price change needed if the guide already says ~$26. Do print the weight as **3.6 oz with lid**, not 3 oz — the 3 oz number is the bare pot and every published comparison in this category quotes with-lid. For a solo scout boiling water this is still the best price-to-weight item in the whole cookware list.

## Snow Peak Titanium Spork Long

**Question:** Claimed 0.7 oz / $10.95. Confirm.

**Confidence:** CONFIRMED

**Answer:** Price confirmed exactly; weight is off by 0.1 oz per Snow Peak's own page. Variant feed: `"Long Titanium Spork" price "10.95" available true sku SCT-014`. Snow Peak's product page spec block reads, verbatim: "weight" / "0.8 oz (22.6 g)". REI's spec for the same SKU reads "Weight 0.7 ounces" and "Dimensions 8.2 x 1.6 x 0.08 inches" at "$10.95" — so the 0.7 oz figure traces to REI, and the manufacturer says 0.8 oz (22.6 g). Prefer the manufacturer. For comparison from the same Snow Peak feed: the standard (short) Titanium Spork SCT-004 is **$8.95 uncolored / $9.95 blue, green or purple**, spec "Weight 0.6 oz (16 g)".

**Source:** https://www.snowpeak.com/products/long-titanium-spork (rendered spec block); snowpeak.com/products.json?limit=250 paginated to 880 products; https://www.rei.com/product/223112/snow-peak-titanium-spork-long (browser-driven)

**Changes recommendation?** Minor. Price is right; publish **0.8 oz (22.6 g)** and cite Snow Peak, noting REI lists 0.7 oz. A tenth of an ounce changes nothing for a scout, but the guide loses credibility fast if a reader checks the brand page and finds a different number than we printed.

## Light My Fire Spork Original

**Question:** Claimed 0.3 oz / $3.95. Confirm.

**Confidence:** PARTIAL

**Answer:** The $3.95 single-unit price does not exist at the manufacturer, and the weight is not published anywhere I could reach. Light My Fire's own store sells the Spork original as a bulk single at **$5.00** in twelve colorways (Dustypink, mustyyellow, rustyorange, rockyred, mistypurple, sandygreen, deeplyblue, hazyblue, slatyblack, cream, cocoa, sagegreen), all `available: true`; multipacks are 2-pack $9.00, 4-pack $15.00, 10-pack $40.00. Amazon, browser-driven: the "Spork Original 2-Pack ... SageGreen/Cream" is **$8.95, "In Stock"** ($4.48/ea) and the "Spork Original 4-Pack ... Nature" is **$13.95, "In Stock"** ($3.49/ea). So the only way to get near $3.95 apiece is to buy the 4-pack. The weight is genuinely UNVERIFIED — Light My Fire's product page publishes no weight at all; its only dimensional spec is "3 in 1 spoon-fork-knife combo, 17cm/6,7inches", and the Shopify variant `grams` field is 0 for every SKU. REI does not carry Light My Fire at all (its "light my fire spork" search returns only humangear, MSR, Sea to Summit, Snow Peak, TOAKS and UCO). For the record, Light My Fire's Titanium Spork is $25.00 direct.

**Source:** https://lightmyfire.com/products/swedish-spork-original-bulk and /swedish-spork-original-2-pack (rendered — no weight present); lightmyfire.com/products.json?limit=250 (58 products, per-variant price + available, all grams=0); https://www.amazon.com/dp/B0DX3WZS35 and /dp/B07NQF3NYL (browser-driven buybox); https://www.rei.com/search?q=light%20my%20fire%20spork (browser-driven, brand absent)

**Changes recommendation?** Yes. Quote it as **"$3.49/ea in the Amazon 4-pack, $5.00 single direct"**, never a bare $3.95, and drop the 0.3 oz claim or mark it unpublished. For a youth group buying 8–12 of them the 4-pack framing is actually the useful one, and it's the cheapest utensil in the entire lineup. If the guide needs a published weight for the budget-plastic slot, use the humangear Uno instead — humangear publishes ".53 oz (15g)".

## Sea to Summit Alpha Light → Frontier UL (long-handle spoon)

**Question:** Alpha Light claimed DISCONTINUED, replaced by "Frontier UL". Confirm the line, and get the Frontier UL long-handle spoon's WEIGHT (prior research could not find it) and price.

**Confidence:** CONFIRMED

**Answer:** Discontinuation confirmed and the missing weight is now found. A full 429-product pull of seatosummit.com contains **zero** products matching "Alpha Light" or "AlphaLight" — the line is gone from the catalog, including the outlet/"Like New" section. The current ultralight cutlery line is **Frontier Ultralight**. The item the guide wants is **"Frontier Ultralight Spoon - Long Handle", $10.95, sku A1331, `available: true`**, and its spec panel reads verbatim "Weight 12 g 0.4 oz" and "Packed Weight 11.8 g 0.4 oz", page status "in stock". Its siblings, all from the same feed: Frontier Ultralight Spork **$9.95**, sku A1330, "Weight 9 g 0.3 oz" / "Packed Weight 9.1 g 0.3 oz", in stock; **Frontier Ultralight Spork - Long Handle $10.95, sku A1332, `available: false`** — page reads "out of stock" and "Register to receive a notification when this item comes back in stock", spec "Weight 11 g 0.4 oz"; Frontier Ultralight Spork - Short Handle $8.95, sku A1329, in stock. Sets: Frontier UL Cutlery Set 3-Piece $32.95 (in stock); Frontier UL Cutlery Set 2-Piece (spork & knife) $20.95 (in stock); **Frontier UL Cutlery Long Handle Set 2-Piece $25.95, `available: false`**. Sea to Summit's other current cutlery lines are Camp Cutlery (spoon/fork/knife $1.00 each, 3-piece set $6.95), Passage ($5.97 2-pc / $7.77 3-pc) and Detour stainless ($27.95–$69.95).

**Source:** seatosummit.com/products.json?limit=250 paginated to 429 products (per-variant price + available; no Alpha Light present); https://seatosummit.com/products/frontier-ultralight-long-spoon , /frontier-ultralight-long-spork , /frontier-ultralight-spork (rendered spec panels)

**Changes recommendation?** Yes. Replace every "Alpha Light" reference with **Frontier Ultralight Spoon - Long Handle, $10.95, 0.4 oz / 12 g**, which is in stock and is now the lightest long-handle utensil in the comparison set (lighter than TOAKS SLV-03 at 0.65 oz and Vargo's long spoon at 0.5 oz on the same measure). Add a stock warning: the long-handle **spork** and the long-handle 2-piece set are both out of stock at Sea to Summit right now, so if the guide recommends the spork version it needs a substitute — the TOAKS SLV-14 at $10.95 is the direct equivalent and is in stock.

## humangear GoBites Uno and Duo

**Question:** Prices entirely unverified. Get them.

**Confidence:** CONFIRMED

**Answer:** Both prices found, plus a naming change the guide needs to absorb: humangear has **dropped the "GoBites" prefix**. The products are now listed simply as "Uno" and "Duo" (only "GoBites Click" still carries the old name; REI still uses the legacy "GoBites" naming, which is why the two sources look like different products). From humangear's own store data: **Uno $3.99** (sku HG0490, 13 colors), spec panel verbatim "Dry Weight" / ".53 oz (15g)" and "Dimensions 6.5" X 1.6" (165 x 40 mm)". **Duo $8.49** in Gray/Red/Blue (skus HG0410/0413/0412) and **$10.99** in the two-tone colorways Mint/Dark Gray and Light Green/Dark Blue (HG0416/HG0418) — so Duo is *not* a single price. Duo spec verbatim: "Dry Weight" / ".78 oz (22g)", "Dimensions Nested - 5.8" X 1.6" (148.5 X 40mm)" and "Extended - 9.1" X 1.6" (231 X 40mm)". Adjacent, all confirmed: **Titanium Uno $15.99** (HG0440 titanium / HG0446 black), ".88 oz. (25g)", 6.5" x 1.6"; **Bio-Uno Long $8.99**, ".63oz (18g)", "8.54" X 1.57 X .79" (217mm X 40mm X 20mm)"; Bio Uno $5.99; Uno Mini (kids) $3.50; Uno 3-Pack $14.99; Uno Kids 3-Pack $11.99; Trio $14.99; Quattro $15.99; GoBites Click $11.99; GoKit $16.99–$32.99.

**Source:** https://www.humangear.com/shop/eat?format=json-pretty (Squarespace commerce feed — per-variant SKU, price in cents, colorway); https://www.humangear.com/shop/p/uno , /duo , /titanium-uno , /uno-long (rendered spec panels)

**Changes recommendation?** Yes. These are the strongest budget picks in the whole utensil section and the guide should say so with real numbers: **Uno $3.99 / 0.53 oz**, **Duo $8.49–$10.99 / 0.78 oz**. For a youth group buying in bulk the Uno 3-Pack at $14.99 is $5.00/ea and *worse* than buying singles at $3.99 — call that out so nobody buys the multipack thinking it's a discount. Also rename the entries to "Uno" / "Duo" with "(formerly GoBites)" in parentheses, or readers searching humangear.com for "GoBites Uno" will hit a 404 exactly as I did.

## GSI Infinity Bowl

**Question:** Claimed 2.3 oz / $4.95. Confirm.

**Confidence:** PARTIAL

**Answer:** The price is wrong and the item is colorway-priced. GSI's own variant feed: `Infinity Bowl — Blue price "6.50" available true sku 75142` and `Green price "4.75" available FALSE sku 75143`. So the only buyable Infinity Bowl is **$6.50 in Blue**; the $4.75 Green is out of stock; **$4.95 does not exist**. GSI publishes no weight for it — the product page's entire spec content is "6 inch, all-purpose camp bowl Made of CLEAN + GREEN non-leaching, 100% recyclable, Clear Polypropylene Lightweight, stacking design", "Dimensions 6.3 in x 6.3 in x 2.5", "Includes 6" Bowl". The Shopify variant `grams` is 64 for both colors, i.e. 2.26 oz, which rounds to the claimed 2.3 oz — and GSI's grams field proved to be a true product weight rather than a shipping weight on two independent checks (Halulite Boiler 1.1 L: 245 g = 8.64 oz vs REI's published "8.6 ounces"; Halulite Microdualist: 473 g = 16.7 oz vs REI's "1 lb. 0.7 oz."). It is not perfect — Halulite Dualist HS is 655 g = 23.1 oz vs REI's "1 lb. 8.8 oz." — so treat 2.3 oz as strongly-supported-but-derived. REI does not carry the Infinity Bowl (its "gsi infinity bowl" search returns 22 products, none of them an Infinity Bowl). Rest of the Infinity line, same feed: Infinity Mug Blue $6.50 / Green $4.95; Infinity Plate Blue $6.50; Infinity Stacking Cup Blue $6.50 / Green $4.75 (out of stock); Infinity Divided Plate Blue $7.50 / Green $5.50 (out of stock); Infinity Backpacker Mug $15.95.

**Source:** gsioutdoors.com/products.json?limit=250 (per-variant price + available + grams); https://gsioutdoors.com/products/infinity-bowl (rendered — no weight published); https://www.rei.com/search?q=gsi%20infinity%20bowl (browser-driven, product absent)

**Changes recommendation?** Yes. Print **$6.50** and note Blue is the only colorway in stock — a troop ordering 12 green bowls at $4.75 will get nothing. Also flag that this is a GSI-direct-only item with a $55 free-shipping floor, so twelve bowls at $6.50 ($78.00) clears it but a small order does not. The 2.3 oz weight can stay but should be attributed as "GSI catalog weight, not published on the product page".

## Snow Peak Ti-Single 450 Cup

**Question:** Claimed 2.4 oz / $29.95. Confirm.

**Confidence:** CONFIRMED

**Answer:** Both figures exactly right. Variant feed: `"Ti-Single 450 Cup" price "29.95" available true sku MG-143`. Product page spec block, verbatim: "Weight" / "2.4 oz (70 g)", and the product summary line "Lightweight & Compact Titanium Cup with Foldable Handles, Can be Put Into Direct Heat". Line context from the same feed: Ti-Single 300 Cup (MG-142) $24.95; Ti-Single 600 Cup (MG-044R) $37.95; **Ti-Single 450 Anodized Cup $39.95** in Blue, Green or Purple (MG-143-BL/GR/PR) — a $10.00 premium over the plain, all in stock; Snow Peak x Danner Ti Single Wall 450 Mug $52.95; Ti-Single 300 Cup Cover $14.95.

**Source:** https://www.snowpeak.com/products/titanium-single-450-cup-mg-043 (rendered spec block); snowpeak.com/products.json?limit=250 paginated to 880 products

**Changes recommendation?** No change — confirmed. One useful addition for a youth-group guide: the page explicitly states it "Can be Put Into Direct Heat", which the anodized $39.95 version's colored finish makes a worse idea. If the guide lists a Snow Peak cup, list the plain $29.95 MG-143 and say why, rather than letting a scout pick the pretty blue one and cook in it.

## TOAKS titanium mugs — full lineup

**Question:** Never researched. Get the lineup with prices/weights.

**Confidence:** CONFIRMED

**Answer:** Full lineup, every price from the per-variant feed (all `available: true` except where noted) and every weight quoted verbatim off its own product page:

- **CUP-450 — 450 ml, $14.95.** "Weight : 2.7 oz (76g)", "Dimension: 3 1/8" (79 mm) Dia × 3 1/2" (90 mm) H", "Capacity : 15.2 oz (450ml)", "Gradation : Yes, in oz and ml", "Fits other containers : 27 oz Kleen Kanteen"
- **CUP-450-C — 450 ml with lid, $18.95.** "Weight : 3.2 oz (91g), 2.7oz (76g) without lid"
- **CUP-450-L — Ultralight 450 ml, $19.95 Silver / $22.95 Blue / $22.95 Green / $22.95 Rainbow (Rainbow `available: false`).** "Weight : 1.7 oz (48g)", and the page's own copy "Featherweight 48 g — ultralight without feeling flimsy"
- **CUP-450-L-C — Ultralight 450 ml with lid, $23.95.** "Weight : 2.2 oz (62g), 1.7oz (48g) without lid"
- **CUP-375 — 375 ml, $18.95.** "Weight: 1.7 oz (48g)", "Capacity: 12.7 oz (375ml)"
- **CUP-375-C — 375 ml with lid, $23.95.** "Weight: 2.7 oz (76g)"
- **CUP-450-DW — 450 ml double wall, $39.95.** "SKU : CUP-450-DW Material : Titanium (no coating) Weight : 4.2 oz (120g) Capacity : 15.2 oz (450ml)", internal 79 mm × 90 mm, external 89 mm × 95 mm
- **CUP-370-DW — 370 ml double wall, $38.95.** "Weight : 3.1 oz (88g) Capacity : 12.5 oz (370ml)", 80 mm × 90 mm

Related bowls: BWL-550-D103 and BWL-550-D118, both $26.95.

**Source:** toaksoutdoor.com/products.json?limit=250 (114 products, per-variant price + available); https://www.toaksoutdoor.com/products/cup-450 , /cup-450-c , /cup-450-l , /cup-450-l-c , /cup-375 , /cup-375-c , /cup-450-dw , /cup-370-dw (rendered spec blocks)

**Changes recommendation?** Yes — this is a whole missing section. The headline for a youth group: **CUP-450-L at $19.95 / 1.7 oz is the value pick**, beating Snow Peak's Ti-Single 450 on both price (−$10.00) and weight (−0.7 oz) at identical 450 ml capacity. Do NOT recommend the double-wall CUP-450-DW ($39.95 / 4.2 oz) — double-wall titanium cannot go on a stove and weighs 2.5× the ultralight, which is the opposite of what a backpacking scout needs. Skip the Rainbow colorway; it's out of stock.

## MSR PanHandler and Vargo Titanium Pot Lifter

**Question:** PanHandler claimed 1.9 oz / $19.95; Vargo Pot Lifter claimed 0.8 oz / $26.95. Confirm both.

**Confidence:** CONFIRMED

**Answer:** All four numbers correct. **MSR PanHandler: $19.95**, `available: true`, sku 13000, vendor MSR; product page spec verbatim "Weight (Standard):" / "1.9 oz". The page also carries a materials caution worth quoting to a youth group: "Stainless steel pots may be used over open fire—with caution. You should expect some soot, and if you place the pot in too hot of an environment, some warping." **Vargo Titanium Pot Lifter: $26.95**, `available: true`, sku T-419; page spec verbatim "Weight: 0.8 ounces (23 grams)" and "Length: 5.0 inches (126 mm)", with the feature bullet "Extremely lightweight".

**Source:** https://www.cascadedesigns.com/products/panhandler (rendered) and cascadedesigns.com/products.json?limit=250 (378 products); https://vargooutdoors.com/products/titanium-pot-lifter (rendered) and vargooutdoors.com/products.json?limit=250 (114 products)

**Changes recommendation?** No numeric change. Add the comparison the numbers make obvious: the Vargo saves **1.1 oz for $7.00 more** — a bad trade for a group kit and a reasonable one for a solo ultralight scout. For a troop, the MSR is the better buy and its stainless-over-fire caveat should be printed, because scouts will absolutely put a pot on a campfire.

## MSR Universal Canister Stand

**Question:** Claimed 1.2 oz / $25.95 but ALSO reported DISCONTINUED by one retailer. Determine actual current status.

**Confidence:** CONFIRMED

**Answer:** **NOT discontinued.** It is live and in stock at both the manufacturer and REI, and both figures are correct. Cascade Designs (MSR's own store) variant feed: `"Universal Canister Stand" price "25.95" available true sku 05346 grams 34`, vendor MSR. Product page spec verbatim "Weight (Standard):" / "1.2 oz", with the feature bullet "Ultralight and Compact: Minimal weight and collapsible design makes it an essential addition to any trip." REI, browser-driven, product 814692 "MSR Universal Fuel Canister Stand": price **$25.95**, JSON-LD `"availability":"https://schema.org/InStock"`, live "Add to cart", spec block "Material(s) Stainless steel", "Dimensions (Packed size) 5.4 x 1 x 0.8 inches", "Weight 1.2 ounces". The whichever-retailer "discontinued" report is wrong. Separately: MSR also sells a cheaper **WindBurner Hinged Canister Stand at $5.95** (sku 09029), which is a different, system-specific part and not a substitute.

**Source:** cascadedesigns.com/products.json?limit=250 (per-variant, `available: true`); https://www.cascadedesigns.com/products/universal-canister-stand (rendered); https://www.rei.com/product/814692/msr-universal-fuel-canister-stand (browser-driven, rendered + JSON-LD availability)

**Changes recommendation?** Yes — remove any "discontinued / may be unavailable" hedge and keep it in the lineup. This matters more than a normal accessory: **MSR's own PocketRocket 2 manual names this exact part as the required mitigation for oversized fuel canisters** (see the safety item below). If the guide tells a troop to use larger canisters, it must also tell them to buy this, and it must be presented as buyable — which it is, at $25.95 / 1.2 oz from either MSR or REI.

## Sea to Summit Wilderness Wash

**Question:** Same $10.95 price shown for both 50 ml and 250 ml — almost certainly a rendering artifact. Resolve via products.json. Get per-size price AND weight.

**Confidence:** CONFIRMED

**Answer:** Confirmed a rendering artifact, and resolved. The two sizes are **different prices** and the rendered page was showing whichever variant happened to be selected. Per-variant, straight from the merchant feed: `Wilderness Wash — "50ml" price "6.95" available FALSE sku A2403` and `"250ml" price "10.95" available TRUE sku 375`. So **50 ml = $6.95 and is OUT OF STOCK; 250 ml = $10.95 and is in stock**. Per-size weights from the page's spec table, verbatim: 50 ml "63 g 2.2 oz"; 250 ml "295.4 g 10.4 oz" (the page's summary line reads "Packed Weight 10.4 oz | 295.4 g" for the selected 250 ml). Page also states verbatim: "Smaller sizes (50ml and 100ml) comply with airport regulations for carry-on liquids". Related and in stock: **Wilderness Wash Pocket Soap - [50 Piece] $6.95**, sku 376, 20 g. The outlet "Wilderness Wash (Like New)" listings (1.6 oz $4.87, 8.5 oz $7.66) are both `available: false`.

**Source:** seatosummit.com/products.json?limit=250 paginated to 429 products (authoritative per-variant price + available — this is what exposed the artifact); https://seatosummit.com/products/wilderness-wash (rendered spec table for per-size weights)

**Changes recommendation?** Yes, and it changes the recommendation itself. The 50 ml at $6.95 is the size a backpacker wants and **it cannot be bought right now**. The only in-stock liquid size is the 250 ml at $10.95 and **10.4 oz** — 0.65 lb of soap, which is absurd in a backpack. For a youth group the live answer is the **Wilderness Wash Pocket Soap 50-sheet at $6.95 / 20 g**: same brand, in stock, 1/15th the weight, and impossible for a scout to spill inside a pack. Recommend the sheets and demote the liquid to a car-camping note.

## Sea to Summit Ultra-Sil Kitchen Sink 10L

**Question:** Conflicting weights (55 g vs 2.5 oz / 71 g) and no confirmed price. Resolve.

**Confidence:** CONFIRMED

**Answer:** The "conflict" is not a conflict — both numbers are correct and they measure different things, which the prior research collapsed into one field. The page's spec table lists both, verbatim: "Weight" / "55 g 1.9 oz" and "Packed Weight" / "72 g 2.5 oz". The page summary line reads "Packed Weight 2.5 oz | 72 g" and the marketing copy reads "So light you'll barely notice it. At just 55g, it packs into its own micro storage pouch for effortless carrying" — so 55 g is the sink itself and 72 g is the sink plus its stuff pouch. (Note 72 g, not the 71 g previously reported.) **Price is $44.95** for the single 10 L size, `available: true`, sku 044601, page reads "10L" / "in stock". The non-Ultra-Sil **Kitchen Sink** line is a separate, cheaper, heavier product: 5 L $27.95, 10 L $33.95, 20 L $38.95, all in stock. There is also a "Kitchen Sink - Past Season" clearance at 10 L $17.97 and 20 L $20.97 (both in stock; 5 L sold out), and an outlet "Ultra-Sil Kitchen Sink (Like New)" at $19.98 which is `available: false`.

**Source:** https://seatosummit.com/products/ultra-sil-kitchen-sink (rendered spec table showing Weight and Packed Weight as separate rows); seatosummit.com/products.json?limit=250 paginated to 429 products

**Changes recommendation?** Yes — but the price is the real news, not the weight. **$44.95 for a 10 L sink** is hard to justify for a youth group when the standard Kitchen Sink 10 L is **$33.95** and the past-season 10 L is **$17.97** for the same capacity. Print it as "1.9 oz sink / 2.5 oz packed" so both published numbers are visible and nobody re-opens this argument, then recommend the $17.97 past-season unit as the troop buy and reserve the Ultra-Sil for someone genuinely counting grams.

## UCO Stormproof Match Kit

**Question:** Claimed 1.7 oz / $11.99. Confirm.

**Confidence:** CONFIRMED

**Answer:** Price exactly right, weight wrong. Variant feed: `"Stormproof Match Kit" — Dark Green / Orange / Yellow, each price "11.99", available true, skus MT-SM-CONT-DKGRN / -ORANGE / -YELLOW`. Product page spec, verbatim: "**Weight: 1.2 oz (34 g)**" — not 1.7 oz. Also verbatim from the same page: "Includes waterproof match container with 25 UCO Stormproof Matches", "Container floats and keeps matches dry, includes extra strikers", "Match Length: 2.75 in / 7 cm", "Kit Includes: 25 stormproof matches, waterproof case, extra strikers". The near neighbours, confirmed from the same feed: **Titan Stormproof Match Kit $15.99** (sku MT-TSM-CONT), spec "Weight: 2.0 oz (57 g)", "Match Length: 4.125 in / 10.5 cm", "Kit Includes: 12 Titan matches, waterproof match case, 3 strikers"; Survival Stormproof Match Kit $3.99 (case only, sku MT-SV-CASE); Stormproof Matches refill box of 25 $7.99, 2 boxes $13.99.

**Source:** https://www.ucogear.com/products/stormproof-match-container-w-25-matches and /titan-stormproof-match-kit (rendered spec blocks); ucogear.com/products.json?limit=250 (155 products, per-variant price + available)

**Changes recommendation?** Correct the weight to **1.2 oz (34 g)** — it's lighter than we claimed, which is a point in its favor. Two additions worth making for a youth-group guide: the **$7.99 refill box of 25** means one $11.99 kit can be reloaded cheaply across a whole troop rather than buying a kit per scout, and the **Titan kit at $15.99** gives 4.125" matches that keep a kid's fingers away from the flame — for a first-time fire-starter that's arguably worth the $4.00 and 0.8 oz.

## Victorinox Classic SD

**Question:** Claimed ~$15 from a review, never from a retailer. Get real current price and weight.

**Confidence:** CONFIRMED

**Answer:** The ~$15 figure is wrong by roughly $9.00. Victorinox's own US store shows **"$ 24.00 excl. tax"**, with the spec block reading verbatim "Swiss made pocket knife with 7 functions", "Blade, small / Scissors / Nail file | Screwdriver 2.5 mm / Key ring / Tweezers / Toothpick / Nail file", "Height: 0.4 in", "Length: 2.3 in", "Width: 0.7 in", "**Weight: 0.8 oz**". REI, browser-driven, sells the same knife as "Swiss Army Classic Knife" at **$24.00** (4.x stars, 229 reviews) with spec block "Max Blade Length (in.) 1.5 inches", "Closed Length 2.25 inches", "Handle Material Acid-resistant plastic/aluminum", "Blade Construction Stainless steel", "Standard Screwdriver(s) 1", "Tweezers Yes", "Toothpick Yes", "Scissors Yes", "Fingernail File Yes", "Lanyard Ring Yes", "**Weight 0.7 ounce**". So two independent sources agree on **$24.00**, and the weight is 0.7–0.8 oz (Victorinox says 0.8, REI says 0.7).

**Source:** https://www.victorinox.com/en-US/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Essentials/Classic-SD-Printed/p/0.6223 (rendered — note victorinox.com redirects the 0.6223 SKU here); https://www.rei.com/product/403028/swiss-army-classic-knife (browser-driven, rendered spec block)

**Changes recommendation?** Yes — $15 to $24.00 is a 60% understatement and it compounds across a troop. Budget **$24.00 each** at retail. Also print the honest caveat for a youth group: the Classic SD's blade is 1.5 inches, which many councils and camps treat as the practical ceiling for a scout-carried knife — that's a feature here, not a limitation, and worth stating explicitly next to the price.

## Jetboil 1.5L Ceramic FluxRing Cook Pot

**Question:** Price unverified. Get it, and confirm compatibility with the Jetboil Flash.

**Confidence:** CONFIRMED

**Answer:** **$74.99**, Item # CRCPT15, live "Add to cart - $74.99" on Jetboil's own store. Spec block verbatim: "Weight 14.4 oz | 408.2 g", "Dimensions 6.3 in x 4.8 in | 16 cm x 12.2 cm", "Volume 1.5 Liter", "Color Carbon", "UPC 0858941006830". **Flash compatibility: YES, with a caveat.** The compatibility field reads verbatim: "Compatible With (Series) — Flash, Flash 1.0L, Flash 1.8L, Luna, MicroMo, MightyMo, MiniMo, SUMO, TrailCook 1.2L, TrailCook 2.0L, Zip, Zip 0.8L". But the feature bullet immediately qualifies it: "Pot Support on Select Systems — Use with Pot Support accessory (sold separately) on compatible stoves, except MightyMo, Stash, TrailCook 1.2L, TrailCook 2.0L, Genesis, and HalfGen." The Flash is not on that exception list, so **a Flash owner also needs the Pot Support 2.0 at $12.99** — real all-in cost is **$87.98**. Also confirmed, and important: Jetboil's own Discontinued Products page lists "1.5 Cook Pot (Item #CPT15)" — that is the older non-ceramic 1.5 L pot, a different SKU from the live ceramic CRCPT15, so do not let a stale "1.5L cook pot discontinued" note kill this item. The page carries a Prop 65 warning: "This product can expose you to chemicals including Nickel (Metallic), which are known to the State of California to cause cancer."

**Source:** https://jetboil.johnsonoutdoors.com/us/shop/cookware/pots-pans/15l-ceramic-cook-pot (rendered — price, SPECS block, compatibility and Pot Support caveat all read off the page); https://jetboil.com/discontinued-products (rendered, confirms CPT15 ≠ CRCPT15)

**Changes recommendation?** Yes — and it should change the verdict, not just the number. Quote it as **"$74.99 + $12.99 Pot Support = $87.98, 14.4 oz"**, because a guide that says "$74.99, works with your Flash" will send someone home with a pot that won't sit on their stove. At 14.4 oz and $88 all-in, this is a car-camping / basecamp luxury, not a backpacking upgrade — the TOAKS POT-1300 at $50.95 / 4.8 oz does more for a third of the weight.

## Vargo titanium utensils — full lineup

**Question:** Never researched. Get the lineup.

**Confidence:** CONFIRMED

**Answer:** Full lineup, prices from the per-variant feed (every item `available: true`), weights quoted verbatim from each product page:

- **Titanium Spork (T-203) — $11.95** in Titanium, and $11.95 each in Blue (T-208), Lavender (T-209), Yellow (T-210). "Weight: 0.5 ounces (14 grams)", "Length: 6.4 inches (162 mm)"
- **Titanium Spork - ULV (T-212) — $11.95**, also Blue/Lavendar/Yellow at $11.95. "Weight: 0.38 ounces (11 grams)", "Length: 6.5 inches (165 mm)" — the lightest utensil found anywhere in this audit
- **Titanium Eagle Spork (T-204) — $11.95.** "Weight: 0.5 ounces (14 grams)", "Length: 6.0 inches (152 mm)"
- **Titanium Folding Spork (T-217) — $14.95** in Natural, plus Blue/Lavender/Yellow at $14.95. "Weight: 0.6 ounces (17 grams)"
- **Titanium Long-Handle Spoon (T-221) — $14.95.** "Weight: 0.5 ounces (14 grams)", "Length: 8.5 inches (216 mm)"
- **Titanium Long Handle Fork-N-Spoon (T-224) — $19.95.** "Weight: 0.8 ounces (23g)", "Length: 9.5 inches (24cm)"
- **Titanium Spoon / Fork Set (T-201) — $19.95.** "Weight: 1.0 ounce (28 grams)", "Length: 6.3 inches (160 mm)"
- **Titanium Spoon / Fork / Knife Set (T-202) — $29.95.** "Weight: 1.5 ounces (43 grams)", "Length: 6.3 inches (spoon and fork), 7.2 inches (knife)"
- **Titanium Spoon / Fork / Knife Set - ULV (T-216) — $24.95.** "Weight: 1.35 ounces (38 grams)", "Length: 6.0 inches (152 mm)"
- **Titanium Chopsticks (T-223) — $29.95.** "Weight: 0.67 ounces (19 grams)", "Length (stored): 4.56 inches (116 mm)", "Length (extended): 7.79 inches (198 mm)"

Adjacent Vargo cookware for context: Titanium Ti-Lite 750 Mug $54.95, Ti-Lite 900 Mug $64.95, Ti-Boiler $69.95, Utiliti Knife $49.95, Ti-Carbon Folding Knife $35.00.

**Source:** vargooutdoors.com/products.json?limit=250 (114 products, per-variant price + available); https://vargooutdoors.com/products/titanium-spork , /titanium-spork-ulv , /titanium-eagle-spork , /titanium-folding-spork , /titanium-long-handle-spoon , /titanium-long-handle-fork-n-spoon , /titanium-spoon-fork-set , /titanium-spoon-fork-knife-set , /titanium-spoon-fork-knife-set-ulv , /titanium-chopsticks (rendered spec blocks)

**Changes recommendation?** Yes — add the section, but be honest that Vargo is the premium tier here and mostly loses on value. The **ULV Spork at $11.95 / 0.38 oz** is the single lightest utensil in the entire audit and is the only Vargo item worth a "best in class" callout. Everything else is beaten on price by TOAKS at equal or near-equal weight (Vargo Long-Handle Spoon $14.95 / 0.5 oz vs TOAKS SLV-03 $9.95 / 0.65 oz; Vargo 3-piece set $29.95 / 1.5 oz vs TOAKS SLV-02 $19.95). For a troop buying a dozen, TOAKS is the right call and the guide should say so plainly.

## SAFETY: MSR's official windscreen warning for canister stoves

**Question:** Confirm that MSR's own documentation forbids windscreens with canister stoves, and quote the EXACT warning text verbatim with the document URL. Prior claim: "DO NOT use any windscreen with the stove... may cause the canister to explode".

**Confidence:** CONFIRMED — the claim is TRUE, but the quoted wording is a paraphrase, not MSR's text.

**Answer:** The prohibition is real, it is unambiguous, and it appears in MSR's current official instruction manuals for **both** the PocketRocket 2 and the PocketRocket Deluxe, in identical wording. I downloaded both PDFs from Cascade Designs' own CDN (they are the files linked from the "Instructions Manual - All Languages" selector on each product page) and extracted the English column. The exact text, verbatim, from the WARNINGS section of both manuals:

> "• Keep stove and fuel container away from other heat sources. Never use any kind of windscreen. If you expose the fuel container to high heat, it will explode or leak and you can be killed or seriously burned."

So the operative sentence is "**Never use any kind of windscreen.**" — not "DO NOT use any windscreen with the stove", and the stated consequence is stronger than the paraphrase: MSR says the canister "**will** explode or leak", not "may cause the canister to explode". Do not soften it.

There is a second, separate prohibition in the operating instructions of both manuals that the guide should carry alongside it, verbatim:

> "Never use a reflector or diffuser. Use of stove in any of the preceding manners can result in the fuel canister exploding and causing fire, burns, severe injury or death."

And a third warning in the same WARNINGS block that directly connects to the Universal Canister Stand item above — MSR limits canister size and names the stand as the mitigation. The English fragment reads:

> "...MSR Universal Canister Stand or LowDown™ Remote Stove Adapter, because oversized containers decrease stove stability."

(The German column of the same bullet makes the threshold explicit: no fuel container over 227 g or taller than 10 cm without the Universal Canister Stand or the LowDown adapter, and never a container over 450 g.)

**Source:** PocketRocket 2 manual PDF, document 82-820-5: https://cascadedesigns.com/cdn/shop/files/82-820-5_PocketRocket2_Instructions.pdf — downloaded and text-extracted with pdftotext; the windscreen warning is on the WARNINGS page, English column. PocketRocket Deluxe manual PDF, document 33-266-5: https://cascadedesigns.com/cdn/shop/files/33-266-5_PR_Deluxe_Instructions.pdf — same wording, English column. Both PDF URLs were harvested from the `#manual-select` element on https://www.cascadedesigns.com/products/pocketrocket-2-stove and https://www.cascadedesigns.com/products/pocketrocket-deluxe-stove (rendered).

**Changes recommendation?** Yes — this is the single highest-value correction in the audit, and it should be quoted, not summarized. In a youth-group guide, print MSR's own sentence in quotation marks with the PDF link, because a leader who is told "the manufacturer says don't" will comply, and a leader who is told "windscreens can be risky" will improvise one out of foil. Three concrete guide changes: (1) any windscreen product in the cookware list must carry a "canister stoves: NO" flag — note that TOAKS sells titanium windscreens at $10.95 (WSC-01 and WSC-02) that are intended for its **alcohol** stoves, and a scout who buys one for a PocketRocket is doing exactly what MSR forbids; (2) state the real consequence in MSR's words ("will explode or leak", "killed or seriously burned"), not a hedged version; (3) pair the warning with the legitimate wind mitigations — a body/pack shield placed well away from the stove, cooking in a sheltered spot, or a regulated/remote system — and with the **MSR Universal Canister Stand ($25.95 / 1.2 oz, in stock)** for the oversized-canister case the same manual calls out.

## Still unresolved

- **Light My Fire Spork Original weight.** Light My Fire publishes no weight on any Spork page, its Shopify `grams` field is 0 for every SKU, and REI does not carry the brand. The commonly-repeated 0.3 oz figure could not be sourced to the manufacturer or any retailer spec block.
- **GSI published weights, generally.** GSI Outdoors does not print a weight on any product page I opened (Halulite Boiler, Halulite Dualist, Dualist HS, Microdualist, Glacier Dualist, Infinity Bowl). Every GSI weight in this report is either from REI's spec block or derived from GSI's Shopify variant `grams`. That derivation matched REI exactly on two items and was off by 1.7 oz on a third (Dualist HS: 655 g = 23.1 oz vs REI's "1 lb. 8.8 oz."), so GSI weights should be labelled as second-source, not manufacturer spec.
- **GSI Halulite Boiler 1.8 L weight specifically.** 11.0 oz is derived from the 313 g variant field, not published. No retailer carries the 1.8 L to cross-check against.
- **Second-source stock for the 1.8 L Halulite Boiler and the plain Halulite Dualist.** Both are GSI-direct only in the channels I checked (absent from REI). I did not check Backcountry, Moosejaw, CampSaver or Amazon for either — CampSaver and Public Lands both blocked automated access during this pass.
- **Whether any retailer still has NOS Pinnacle Dualist II stock.** I confirmed it is gone from GSI, REI and Amazon (Amazon: "Currently unavailable."). I did not sweep the smaller outdoor retailers, so a clearance unit may exist somewhere; it should not be relied on for a guide either way.
- **Sea to Summit Frontier UL long-handle spork restock date.** The page offers only "Register to receive a notification when this item comes back in stock" with no ETA, so I cannot say whether it returns before a trip date.
- **Snow Peak Long Titanium Spork weight discrepancy.** Snow Peak's page says 0.8 oz (22.6 g); REI's spec block says 0.7 ounces. I could not find a third source to break the tie and defaulted to the manufacturer.
- **Victorinox Classic SD tax/shipping.** Victorinox's own price is stated as "$ 24.00 excl. tax"; REI's $24.00 is the shelf price. I did not run a checkout to determine the delivered cost from either.
- **Jetboil Pot Support 2.0 necessity, verified by transaction.** The $12.99 add-on requirement for the Flash is read off Jetboil's own feature bullet and exception list, not confirmed by fitting the parts or by a Jetboil support statement.

## Method

Primary technique was direct HTTPS fetches from a scripted client with a desktop user-agent, hitting each merchant's own live inventory endpoints — `/products.json?limit=250` paginated, and `/products/<handle>.js` for single SKUs. These return per-variant `price`, `available` and `grams` straight from the merchant and are what caught the Sea to Summit Wilderness Wash rendering artifact, the two-tier GSI Infinity Bowl and Duo pricing, and the out-of-stock Frontier UL long spork. Catalogs pulled this way: GSI Outdoors (357 products), TOAKS (114), Vargo (114), Snow Peak (880), Cascade Designs/MSR (378), Sea to Summit (429), Light My Fire (58), UCO (155). Shopify rate-limits `/products.json` per IP with `retry-after: 60`; the pull script backs off and retries. humangear is Squarespace, not Shopify, and was read via `?format=json-pretty` on its shop collection. Rendered spec blocks were fetched and stripped to text with a local HTML-to-text pass. Jetboil (Johnson Outdoors platform) required following its cross-host redirect to `jetboil.johnsonoutdoors.com` explicitly. MSR's safety wording came from the actual PDF instruction manuals — URLs harvested from the `#manual-select` element on each product page, downloaded, and extracted with `pdftotext -layout`, then the multi-language columns were split so the English text could be quoted without contamination. REI, Amazon and Victorinox block plain HTTP clients (REI returns a connection failure, CampSaver and Public Lands return 403/forbidden), so those were read with the Playwright browser MCP: a fresh page per batch, `domcontentloaded` plus a 5-second settle, then `document.body.innerText` and embedded JSON-LD `availability`. Every quoted spec string in this report was read off the source in that pass; nothing was carried over from prior research.
