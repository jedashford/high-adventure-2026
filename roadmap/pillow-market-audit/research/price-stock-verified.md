# Street price & stock verification

## Pillow Strap (S/M/L)

**Question:** No verifiable price — reported $35 to $62, a 77% spread. Find the maker's own site and a second stockist; get per-size price AND per-size weight.

**Confidence:** CONFIRMED

**Answer:** Maker's site is pillowstrap.com (NOT thepillowstrap.com — that domain does not resolve). Price is tiered by BOTH size and colorway, which is what produced the fake spread. Solid colors (Green/Red/Blue/Grey): Small $39.00, Medium $42.00, Large $45.00. Patterns (Night Shadows / Tie Dyed / Chroma Currents / Prismatic Springs): Small $42.00, Medium $45.00, Large $48.00. Per-size weights, quoted verbatim from the product pages' Dimensions & Weight panel: Small 'Weight: 1.8 ounces (52g)', Medium 'Weight: 2.3 ounces (65g)', Large 'Weight: 3.3 ounces (93g)'. Stock direct: every SKU available EXCEPT 'Pillow Strap Large in Chroma Currents' (available:false). Shipping: site banner reads '$6 USA Shipping'; shipping policy reads 'Orders will typically ship within one business day of placing the order' and 'Delivery is typically within 4-8 business days after shipping the order.' SECOND STOCKIST — Garage Grown Gear, garagegrowngear.com/products/pillow-strap-by-pillow-strap: 'Size: Small / Medium', 'Sale price $ 39.00' (Small) and $42.00 (Medium), all four colors available:true, description states 'Ships in 1-2 business days | Based in Chicago, IL'. CRITICAL: GGG carries ONLY Small and Medium. There is no Large at GGG — Large is direct-from-maker only. Fit spec for Large: 'fits pillows 19" (48cm) wide to 24" (61cm) wide' and 'sleeping pads up to 30" (76cm) wide x 5" (13cm) thick'; if pad circumference exceeds 70" the maker says add the Elastic Extension Strap ($9.00/12", $10.00/24", $11.00/36"). Maker also sells 'The Camp Pillow' $25.00 (105 g).

**Source:** https://www.pillowstrap.com/products/large-green , /small-green , /medium-green (rendered pages, accordions force-opened); https://www.pillowstrap.com/products.json?limit=250 (all 28 SKUs, per-variant price + available); https://www.pillowstrap.com/policies/shipping-policy ; https://garagegrowngear.com/products/pillow-strap-by-pillow-strap (rendered) + garagegrowngear.com/products.json paginated to 1,298 products

**Changes recommendation?** Yes — flips the headline number and the buying route. The real range is $39–$48, not $35–$62; nothing at $62 or $35 exists anywhere. For Jed (broad shoulders, Big Agnes pad, rotisserie sleeper) Large is the size, so he must buy DIRECT — GGG cannot sell him one. Large solid = $45.00 + $6 shipping = $51.00 all-in, 3.3 oz. Lead time is the risk: 1 business day to ship + 4-8 business days transit means order-by ~Aug 5 for a mid-August trip. Order it first, not last. Also budget the Extension Strap if his Big Agnes is a wide/rectangular model.

## Zpacks — Padded Pillowcase vs Comfy Camp Pillow vs Inflatable Pillow

**Question:** Three SKUs discovery says are being conflated. Get each SKU's real name, price, weight, and what's in the box.

**Confidence:** CONFIRMED

**Answer:** They are three genuinely separate products, and the conflation is caused by all three sharing the same $34.95 entry price. (1) 'Comfy Camp Pillow' — $34.95 USD, 'Weight 3.2 oz / 92 g', 4 colors (Black/Blue/Olive Drab/Purple) all in stock. In the box: a standalone synthetic-insulated pillow, Octa fleece face, NO air bladder at all. Elastic bands on the back + shock cord to strap it to a pad. (2) 'Zpacks Inflatable Pillow' — $34.95 USD with option 'ATTACHMENT CORD: No', $39.95 with 'Yes'. 'Weight 1.4 oz / 40 g'. In the box: bare crescent-shaped air bladder only, no cover. Page warns '*This Item is Non-Returnable if Removed from Packaging*'. (3) 'Padded Pillowcase for Inflatable Pillow' — $34.95 USD with STYLE 'No Inflatable Pillow', $59.95 with STYLE 'Include Inflatable Pillow'. 'Weight 2.4 oz / 68 g' for the case alone (108 g for the case+pillow bundle). In the box at $34.95: the padded Octa-fleece case only. At $59.95: case + the inflatable pillow together. All colors of all three in stock. All three pages state 'Lead Time Ships in 1-3 Business Days'. Bundle math: buying case ($34.95) and pillow ($34.95) separately = $69.90 vs $59.95 as the combined SKU — the bundle saves $9.95. Separately listed: 'Pillow Attachment Cord' $5.95. The four 'Bargain' variants of both the Comfy Camp Pillow and the Inflatable Pillow Case are $24.47 but every one is available:false.

**Source:** https://zpacks.com/products/comfy-camp-pillow , /zpacks-inflatable-pillow , /padded-pillowcase-for-inflatable-pillow (all three rendered — weight and lead-time strings read off the page); plus zpacks.com/products.json paginated to 799 products for per-variant availability

**Changes recommendation?** Yes — the guide must stop treating these as one item. For a side-sleeper who wants a traditional-pillow feel, the buy is the $59.95 'Include Inflatable Pillow' SKU (108 g total): fleece face + loft + a bladder for height, with a shock-cord strap to the pad. The $34.95 Comfy Camp Pillow is a no-bladder synthetic pillow and won't give a 250-300 lb side sleeper the neck height he needs. Any line item citing 'Zpacks pillow $34.95' is ambiguous and should be replaced with the full SKU name.

## Zenbivy SoftTop Pillow — Large + Overstuffed

**Question:** Reported $65 / $75 / $90. Resolve. Get component prices (bladder, case, topper) and whether they sum to the bundle price.

**Confidence:** CONFIRMED

**Answer:** All three reported figures are wrong. Large + Overstuffed is $99.00. Components, each read off its own product page: SoftTop Pillowcase Large $19.00 ('Large: 1.1 oz (31 g)'); SoftTop Pillow Bladder Large $30.00 ('Large: 1.8 oz (52 g)'); SoftTop Pillow Topper Overstuffed/Large $50.00 ('Overstuffed Large: 5.0 oz (141 g)', fill 125 g of 650+FP duck down). They sum to exactly $99.00 and I verified it as a transaction, not a label: POSTing those three variant IDs to Zenbivy's cart returned total_price 9900 with line items $50.00 + $30.00 + $19.00. So yes — components sum exactly to the bundle price; there is no bundle discount and no bundle premium. Total system weight 7.9 oz / 224 g. Where '$75' came from: the 'Build a SoftTop Pillow' builder page loads showing 'Regular price $74.00 USD', which is the DEFAULT configuration (Regular case $19 + Regular bladder $25 + Light/Regular topper $30 = $74). Full topper matrix: Light/Regular $30.00, Light/Large $40.00, Overstuffed/Regular $40.00, Overstuffed/Large $50.00. Bladder: Regular $25.00, Large $30.00. Pillowcase: $19.00 flat, Regular or Large, all 5 colors. Everything in stock. Closeout 2025-model parts also live: pillowcase $8.45, bladder Large $14.30, topper Down/Regular $26.00.

**Source:** https://zenbivy.com/products/softtop-pillows (rendered builder, '$74.00 USD' default); /softtop-pillowcase , /softtop-pillow-bladder , /softtop-pillow-topper (rendered spec tables); zenbivy.com/products.json?limit=250 ; and a live cart check — POST zenbivy.com/cart/add.js with variants 47085652148445 + 47085658996957 + 47085666009309, then GET /cart.js → total_price 9900

**Changes recommendation?** Yes — the price is $99.00, a 10-52% increase over every figure discovery reported. That matters because at $99 it stops being the cheap modular option and lands above the Therm-a-Rest Air Head Down Large ($75.95) and the Exped Mega ($69.95). It's still the most on-target product for Jed's stated want: 5.0 oz of actual down loft on top of an adjustable bladder is the closest thing to a home pillow in this set, and it's the only one where he can buy a bigger topper later without rebuying the pillow. Quote it as '$99.00, 7.9 oz' and show the three line items so he can see he isn't being marked up for the bundle.

## Exped Mega Pillow

**Question:** Price, stock, sizes.

**Confidence:** CONFIRMED

**Answer:** $69.95, one size. OUT OF STOCK at Exped's own store, IN STOCK at REI. Exped USA rendered page reads verbatim: 'MEGA PILLOW', 'Regular price $69.95', 'OUT OF STOCK', both colors marked 'VARIANT SOLD OUT OR UNAVAILABLE' (Burgundy and Cypress), and the only button is 'EMAIL ME WHEN AVAILABLE'. No restock date given. REI, same product, is buyable: '$69.95', Cypress, One Size, JSON-LD availability 'InStock', and the page reads 'Ship to store Ready Thurs, Jul 30 at Salt Lake City FREE' / 'Ship to address By Fri, Jul 31 to 84111 FREE' / 'Add to cart—$69.95'. REI specs: 'Weight: 9 ounces', 'Dimensions: 20.5 x 12.6 x 4.7 inches', 4.5 stars / 25 reviews. Exped's own copy: vertical sidewalls so the top surface runs edge-to-edge with no tapering, removable washable cover, fabric eyelets for pad attachment.

**Source:** https://www.expedusa.com/products/mega-pillow-2025 (rendered; also expedusa.com/products.json shows both variants available:false); https://www.rei.com/product/239220/exped-mega-pillow (rendered + JSON-LD)

**Changes recommendation?** Yes — do not link the brand page. Anyone following an expedusa.com link gets a dead 'EMAIL ME WHEN AVAILABLE' with no date, which for an August trip is a disqualification. Retarget the link to REI, where it ships by Fri Jul 31. Also worth noting for a 5'10" 250-300 lb broad-shouldered side sleeper: 20.5" wide with true edge-to-edge (no tapered sidewalls) is the widest usable sleeping surface in this whole lineup, and 9 oz is honest backpacking weight.

## Exped Versaluxe Pillow

**Question:** Price, stock, sizes.

**Confidence:** CONFIRMED

**Answer:** $49.95, one size, in stock at both retailers. Exped USA: all three colors (Sunburst, Ocean, Greygoose) available:true at $49.95. REI: '$49.95', JSON-LD 'InStock' for all three colors, but the page carries a warning — 'Low inventory. Order soon!' — and delivery is slower than the Mega: 'Ship to address By Wed, Aug 5 to 84111 FREE', 'Pick up Not offered', 'Online Only—Not available in stores'. REI specs: 'Weight: 7 ounces', 'Dimensions: 19 x 11 x 6 inches'. No reviews yet on REI ('No reviews yet; be the first!'). Exped USA also lists a used one: 'Versaluxe Pillow (Used)' $24.97, Greygoose and Ocean each available in one of two listings.

**Source:** https://www.rei.com/product/C02185/exped-versaluxe-pillow (rendered + JSON-LD); https://www.expedusa.com/products.json?limit=250

**Changes recommendation?** Mild — price holds at $49.95 but add the two caveats. REI flags 'Low inventory. Order soon!' and won't land it until Aug 5, so it is not a last-minute buy. At 6" thick and 7 oz it is the loftiest-per-ounce option here, which suits a big side sleeper, but with zero REI reviews there is no durability signal at all — don't rank it on reputation.

## Sea to Summit Foam Core Pillow (Regular and Large)

**Question:** Street price, stock, per-size price and weight.

**Confidence:** CONFIRMED

**Answer:** Regular $29.95, Large $34.95, XL $39.95 — identical at seatosummit.com and REI, so this one was never disputed. REI weights: 'Regular: 5.6 ounces - Large: 7.4 ounces - XL: 12 ounces'. REI dimensions: 'Regular: 13.4 x 9.4 x 5.1 inches - Large: 16.5 x 11.8 x 5.1 inches - XL: 22 x 14.2 x 6.3 inches'. Stock is colorway-dependent. At REI: Regular InStock in Aqua Sea and Bombay Brown, OutOfStock in Starfish; Large InStock in all three (Aqua Sea, Bombay Brown, Starfish); XL InStock in Bombay Brown and Starfish, OutOfStock in Aqua Sea. At seatosummit.com: Regular in stock Aqua Sea + Bombay Brown (Starfish out); Large in stock Starfish + Bombay Brown (Aqua Sea out). REI page reads 'Pick up Not offered' and 'Online Only—Not available in stores'; 'Ship to address FREE $60 minimum'. 4.8 stars / 43 reviews at REI.

**Source:** https://www.rei.com/product/C04885/sea-to-summit-foam-core-pillow (rendered + per-variant JSON-LD offers); https://seatosummit.com/products.json (paginated, 429 products)

**Changes recommendation?** No price change. One correction worth making: this is the only genuinely non-crinkly option in the lineup — it's foam, not an air bladder — which is exactly what Jed said he wanted. Large is $34.95 / 7.4 oz and is the cheapest thing here that actually meets the 'feels like a real pillow' requirement. It is also the best youth pick for the 5'1" son at Regular, $29.95 / 5.6 oz. Buy Large in Bombay Brown or Starfish to avoid the out-of-stock colorways.

## Sea to Summit Aeros Premium Pillow (Regular/Large/XL)

**Question:** Street price, stock, per-size price and weight.

**Confidence:** CONFIRMED

**Answer:** Regular $54.95, Large $59.95, XL $69.95 — same at brand and REI. REI weights: 'Regular: 3.5 ounces - Large: 5.3 ounces - XL: 8.8 ounces'. REI dimensions: 'Regular: 13.4 x 9.4 x 4.3 inches - Large: 16.9 x 11.8 x 4.7 inches - XL: 22.0 x 14.2 x 4.7 inches'. The LARGE is the thin size across every channel and this is the real finding. At REI, Large: Cabbage InStock, Picante InStock, Burnt Olive OutOfStock, Mediterranean OutOfStock. At seatosummit.com, Large: only Cabbage available:true — Picante, Mediterranea and Burnt Olive all false. At Garage Grown Gear, BOTH Large colorways it carries are available:false. XL is healthier than Large (Burnt Olive and Cabbage in stock at both). REI: 5.0 stars / 27 reviews, '304 people purchased this week'.

**Source:** https://www.rei.com/product/C04276/sea-to-summit-aeros-premium-pillow (rendered + per-variant JSON-LD offers); https://seatosummit.com/products.json ; https://garagegrowngear.com/products.json

**Changes recommendation?** Yes — add a stock warning, not a price change. If the guide recommends Aeros Premium Large, it should name Cabbage as effectively the only reliably buyable colorway right now, or push to XL ($69.95 / 8.8 oz) which is both wider (22") and better stocked. Given Jed is a broad-shouldered side sleeper, XL is arguably the correct size anyway — but be honest that at 8.8 oz it costs more weight than the Exped Mega for a narrower 4.7" loft.

## Sea to Summit PillowLock stickers

**Question:** Street price, stock.

**Confidence:** CONFIRMED

**Answer:** The product's real name is 'Pillow Lock Patches' and it is FREE. Rendered page reads verbatim: 'Pillow Lock Patches', '$0.00', 'IN STOCK', 'Secure delivery with tracking', 'ADD TO CART', 4.9 stars / 17 reviews. Description: 'Set of four replacement pillow lock patches for your sleeping mat.' Feature: 'Secures pillow to sleeping pad with adhesive hook-and-loop patches'. Shipping terms on the same page: 'Free US Shipping on Orders $50+', 'Easy 60-Day Returns'. Shopify variant confirms price '0.00', available:true, 1 g.

**Source:** https://seatosummit.com/products/pillow-lock-patches (rendered); seatosummit.com/products/pillow-lock-patches.js

**Changes recommendation?** Yes — any non-zero price in the guide is wrong; they're $0.00. But add the catch: at $0.00 the order won't clear the '$50+' free-shipping threshold on its own, so they're effectively an add-on to another Sea to Summit order. Relevant caveat for Jed specifically — these are adhesive patches designed for a Sea to Summit mat surface; he's on a Big Agnes Rapide SL/Zoom/Divide, and I found no Sea to Summit statement that they're validated on Big Agnes pad fabric. A strap-based solution (Pillow Strap, or the Zpacks/Zenbivy shock cord) is the safer anti-migration answer for his pad.

## Therm-a-Rest Compressible Pillow Cinch (S/R/L)

**Question:** Pricing reported both as flat $34.95 and tiered $34.95/$39.95/$49.95. Resolve.

**Confidence:** CONFIRMED

**Answer:** TIERED is correct. The flat-$34.95 claim is the Small price mistaken for the whole line. Confirmed on both the brand site and REI, independently. thermarest.com per-variant: Small $34.95, Regular $39.95, Large $49.95 across all three US colorways (Woodland, Desert, Outer Space), every one available:true. REI shows the identical ladder — page reads '$34.95 – to $49.95' with the size selector listing '$49.95 L', '$39.95 M', '$34.95 S'; JSON-LD gives S 34.95 / M 39.95 / L 49.95, all InStock except Outerspace/S which is 'PreOrder'. REI weights: 'S: 8 oz. - M: 11.5 oz. - L: 1 lb.' REI dimensions: 'S: 15 x 11 x 5 inches - M: 18 x 13 x 6 inches - L: 22 x 15 x 7 inches'. 4.3 stars / 50 reviews, '201 people purchased this week'. (Separate EU-market listing exists at $31.95/$36.95/$46.95 — do not quote it for a US buyer.)

**Source:** https://www.thermarest.com/products.json?limit=250 (per-variant); https://www.rei.com/product/241043/therm-a-rest-compressible-pillow-cinch (rendered + per-variant JSON-LD)

**Changes recommendation?** Yes — kill the flat-$34.95 line. For Jed the relevant size is Large at $49.95, and the honest weight is 1 lb / 16 oz, which is 5x the Zenbivy bladder-based system and roughly 2x the Exped Mega. That's the tradeoff the guide has to state plainly: it is genuinely the most traditional-feeling pillow here (compressible foam fill, no air), 22 x 15 inches of surface, and it is the heaviest thing in the lineup by a wide margin. Since he set no weight ceiling, it stays eligible — but the 1 lb figure must be printed, not buried.

## Therm-a-Rest Air Head Down Pillow (Regular and Large)

**Question:** Street price, stock, per-size price.

**Confidence:** CONFIRMED

**Answer:** Regular $64.95, Large $75.95 — identical at thermarest.com and REI, both sizes in stock at both. thermarest.com: Regular $64.95 available:true, Large $75.95 available:true. REI: page reads '$64.95 – to $75.95' with selector '$75.95 Large' / '$64.95 Regular'; JSON-LD confirms Large 75.95 InStock and Regular 64.95, Midnight Print colorway, 4.6 stars / 8 reviews, '11 people purchased this week'. REI dimensions: 'Regular: 15.5 x 11 x 4 inches - Large: 18 x 12.5 x 4 inches'. Fill: 'Cover: 650-fill Duck Nikwax Hydrophobic RDS down'. Construction: down-insulated brushed cover over an inflatable baffled core, cover removable and machine washable, nonslip fabric. DATA DEFECT FOUND: REI's spec block reads 'Weight: Regular: 7.3 ounces - Large: 4.9 ounces' — the Large cannot be lighter than the Regular. Therm-a-Rest's own store lists shipping weights of 139 g (Regular) and 207 g (Large), which is the sane ordering. Treat REI's Large weight as a data-entry error and do not publish '4.9 oz'.

**Source:** https://www.rei.com/product/246294/therm-a-rest-air-head-down-pillow (rendered + JSON-LD); https://www.thermarest.com/products.json?limit=250

**Changes recommendation?** Price confirmed, no change. But add a correction flag: if the guide sourced Air Head Down weights from REI it may have picked up the bogus '4.9 oz' for Large. State Large as ~7.3 oz / 207 g and mark it as brand-site-derived, or state 'manufacturer weight not independently published per size'. This is a strong pick for Jed on merit — real down loft plus an adjustable core plus a nonslip cover (anti-migration) at $75.95 — and it undercuts the Zenbivy Large/Overstuffed build by $23.05.

## NEMO Fillo

**Question:** Is it actually out of stock? Two lenses returned opposite answers on the same day. Check NEMO direct, REI, Amazon, Backcountry.

**Confidence:** CONFIRMED

**Answer:** Both lenses were right — they were looking at different retailers. It is SOLD OUT at NEMO direct and IN STOCK at all three third-party retailers. NEMO direct (nemoequipment.com/products/fillo-backpacking-pillow), rendered, verbatim: 'Fillo™ / Lightweight Camping & Backpacking Pillow / 4.7 / (143) / $49.95' then 'SOLD OUT | JOIN THE WAITLIST'. All four colors (Mango, Silt Stripe, Blue Horizon, Black Pearl) return available:false in NEMO's own inventory feed. REI (#242748): '$49.95', JSON-LD availability 'InStock', page reads 'Pick up Today after 11:40am at Salt Lake City FREE & FAST', 'Ship to address By Fri, Jul 31 to 84111 FREE $60 minimum', 'Find it in store — In Stock at Salt Lake City', 'Add to cart—$49.95', 4.4 stars / 341 reviews. Backcountry (ASIN-equivalent page nemo-equipment-inc.-fillo-pillow): 'Fillo Pillow $49.95', live 'Add To Cart', three colors selectable, 5.0 (44), and 'Shipping to 84606, Estimated arrival by Wed, Jul 29' — the fastest of the four. Amazon (B0DK7PMPQX, 'Sold by NEMO Equipment', 'Ships from Amazon'): '$49.95', 'FREE delivery August 3 - 6' / 'Or fastest delivery August 3 - 5', 4.6 stars / (832), '800+ bought in past month'. Garage Grown Gear also has it: $49.95 Silt Stripe, available:true. Street price is $49.95 everywhere — zero discounting. NEMO spec: 'Minimum Weight 9.2 oz | 260 g', 'Packed Weight 0 lb 9.3 oz | 265 g', '17 x 11 x 4.0 in'. Fillo Elite $59.95 is in stock at REI (all 3 colors InStock) and GGG, but NEMO direct has only Black Pearl.

**Source:** https://www.nemoequipment.com/products/fillo-backpacking-pillow (rendered) + nemoequipment.com/products.json ; https://www.rei.com/product/242748/nemo-fillo-pillow (rendered + JSON-LD); https://www.backcountry.com/nemo-equipment-inc.-fillo-pillow (rendered); https://www.amazon.com/dp/B0DK7PMPQX (rendered buybox); garagegrowngear.com/products.json

**Changes recommendation?** Yes — remove any 'discontinued / unavailable' framing. The Fillo is fully buyable at $49.95 and can be in hand by Wed Jul 29 from Backcountry or Jul 31 from REI, weeks ahead of the trip. The lesson for the guide's methodology: brand-direct stock is not lineup-wide stock, and the two lenses did not actually contradict each other. Buy-link priority should be Backcountry > REI > Amazon (Amazon is the slowest at Aug 3-6) and never NEMO direct.

## Trekology Aluft 2.0

**Question:** Amazon price and current rating histogram — 1-2 star percentage and total N, since discovery used this as a defect proxy.

**Confidence:** CONFIRMED

**Answer:** ASIN B07MQJPVWD. Price '$19.99'. Availability block reads 'In Stock'. Rating '4.4 out of 5 stars', total N = '(24,982)'. Histogram exactly as rendered: 5 star 70%, 4 star 17%, 3 star 7%, 2 star 2%, 1 star 4%. So 1-2 star combined = 6%, roughly 1,499 of 24,982 ratings. Fulfilment: 'Ships from Amazon', 'Sold by Trekology', 'Returns FREE 30-day refund/replacement'. Delivery: 'FREE delivery Saturday, August 1 on orders shipped by Amazon over $35 Or Prime members get FREE delivery Tomorrow, July 28.' Badged 'Amazon's Choice', '1K+ bought in past month'. Default variant on the page was Navy Blue, listed attribute 'Size: Small'.

**Source:** https://www.amazon.com/dp/B07MQJPVWD?th=1 (rendered; #productTitle, .a-price, #availability, #mir-layout-DELIVERY_BLOCK, #acrCustomerReviewText, #histogramTable)

**Changes recommendation?** Yes if the guide quoted MSRP — street is $19.99, and it can be at the door July 28 with Prime. The defect proxy is genuinely reassuring at this N: 6% at 1-2 stars over ~25,000 ratings is a large, stable sample. Caveat to print: this is an air bladder, which is the exact 'crinkly' category Jed said he does not want, and the default listing is the Small. Keep it as the budget/son option, not the primary recommendation.

## Trekology Aluft Ultra

**Question:** Amazon price and current rating histogram — 1-2 star percentage and total N.

**Confidence:** CONFIRMED

**Answer:** ASIN B0CDGCKKJQ, listed as 'TREKOLOGY Camping Pillow - Large Inflatable (24"x15") ... Removable Strap for Secure Fit, ALUFT Ultra'. Price '$24.99'. Availability reads 'In Stock'. Rating '4.3 out of 5 stars', total N = '(985)'. Histogram exactly as rendered: 5 star 72%, 4 star 10%, 3 star 7%, 2 star 4%, 1 star 7%. So 1-2 star combined = 11%, roughly 108 of 985 ratings. 'Ships from Amazon', 'Sold by Trekology', 'FREE 30-day refund/replacement'. Delivery: 'FREE delivery Saturday, August 1 ... Or Prime members get FREE delivery Tomorrow, July 28.' Badged 'Amazon's Choice', '300+ bought in past month'. Size attribute '24"x15"', fill 'TPU/ Air'.

**Source:** https://www.amazon.com/dp/B0CDGCKKJQ?th=1 (rendered; same selector set)

**Changes recommendation?** Yes — this is a real inversion the guide should surface. The Ultra's 1-2 star rate is 11% versus the Aluft 2.0's 6%, i.e. roughly 1.8x the defect proxy, and its 1-star bucket alone (7%) is higher than the 2.0's 1-and-2-star buckets combined. But N is only 985 versus 24,982, so the confidence interval is far wider and this is suggestive, not conclusive — say so rather than treating 11% as settled. On fit it is the tempting one for Jed at 24 x 15 inches with a pad strap; if the guide recommends it, it should pair the size advantage with the worse and less-certain reliability signal, and note it costs $5 more at $24.99.

## Feathered Friends Geoduck Travel Pillow

**Question:** Street price, stock, weight, availability.

**Confidence:** CONFIRMED

**Answer:** $45.00, in stock, buyable now. Rendered page reads 'Geoduck Travel Pillow', 'Regular price $45.00', '37 Reviews', live 'Add to cart'. Specs from the page: 'Average weight: 6 oz / 170 g', 'FILL WEIGHT 4.6 oz / 130 g', 'FILL POWER 900+ Fill Power Ultrasonic Muscovy Down™', 'DIMENSIONS 16 in x 10 in x 3.5 in / 40 cm x 27 cm x 9 cm', 'ORIGIN Made in Seattle, USA of imported materials'. 'Stuffs in to its own pocket.' On-page rating breakdown: 4.4 based on 37 reviews — 5★ 59% (22), 4★ 22% (8), 3★ 16% (6), 2★ 0%, 1★ 3% (1). Note the product name is 'Geoduck Travel Pillow', not 'Geoduck' alone, and it is the only sub-1lb pillow Feathered Friends sells — their other pillows are 1,361-1,814 g household pillows at $179-$459.

**Source:** https://featheredfriends.com/products/feathered-friends-geoduck-travel-down-pillow (rendered); featheredfriends.com/products.json paginated to 853 products

**Changes recommendation?** Price confirmed at $45.00 and it's in stock, so it stays in the lineup. Two honest qualifiers for Jed: it is pure down with NO air bladder and NO strap or anti-slip surface, so it gives loft but does nothing about migration — he'd want to pair it with the Pillow Strap Large ($45.00), making the real system cost $90.00 and ~9.3 oz. And 16 x 10 x 3.5 inches is on the small side for a broad-shouldered side sleeper; the 3.5" loft is the thinnest in this comparison set.

## Exped REM Pillow

**Question:** Discovery says REM may be unbuyable — confirm.

**Confidence:** CONFIRMED

**Answer:** CONFIRMED UNBUYABLE. It does not exist as a purchasable SKU anywhere I could reach. Exped USA's own site search returns literally nothing: GET expedusa.com/search/suggest.json?q=REM returned {"resources":{"results":{"products":[]}}} — zero products. I then pulled Exped USA's entire catalog (165 products) and there is no REM in it; the pillow line is Mega Pillow, Versaluxe Pillow, Ultra Pillow, Trailhead Pillow, DeepSleep Pillow, Down Pillow, LuxeWool Pillow and Pillow Pump. exped.com (the Swiss corporate domain) returns HTTP 404 on both /products.json and its pillow category paths, so there is no live global catalog to check against either. REI's camp pillow category (30 products, includes 5 Exped SKUs) has no REM. Separately, expedusa.com's Down Pillow L ($79.95) is itself sold out in both colors.

**Source:** https://www.expedusa.com/search/suggest.json?q=REM (empty product array); expedusa.com/products.json?limit=250 paginated, full 165-product catalog; https://www.rei.com/c/camp-pillows?pagesize=90 (rendered, all product links enumerated); exped.com/products.json → 404

**Changes recommendation?** Yes — remove the Exped REM from the lineup entirely rather than listing it as 'availability uncertain'. There is no price to quote and no retailer to link, so it cannot be part of a buying guide for an August trip. If the guide needs an Exped in that slot, the Versaluxe Pillow at $49.95 (in stock, ships Aug 5 from REI) or the Mega Pillow at $69.95 (in stock at REI only, ships Jul 31) are the live substitutes.

## Litesmith FlexAir Large

**Question:** Street price, stock, weight.

**Confidence:** CONFIRMED

**Answer:** Real product name is 'FlexAir® Inflatable Pillows' and it is priced by size AND pack quantity, which is why a single number was never going to work. I selected each combination on the live page and read the price back: Small / Single = $2.25; LARGE / Single = $2.60; Large / 3 Pack = $6.95. Listing headline shows '$2.25' and the search page shows the range '$2.25 - $6.95'. Both sizes are selectable and 'Adding to cart… The item has been added' fires, with the 'Current Stock:' field blank (Litesmith does not display a tracked count). Weights from the page: 'The small pillow for the minimalist is 13 x 9 x 3 in ... and weighs a scant 0.56 oz (16 g). The large pillow for more comfort is 16 x 11 x 4 in (40.6 x 27.9 x 10.2 cm) when inflated and weighs 0.9 oz (27 g).' The page explicitly says 'Large is a better size if you roll side to side during the night.' Shipping: 'Free US Shipping over $60*' — so a $2.60 order pays shipping. 19 reviews. CROSS-CHECK: Garage Grown Gear sells the same pillow as 'Flex Air Ultralight Pillow by Graham Medical' at Small $1.99 / Large $2.19 — cheaper — but the Large there is available:false.

**Source:** https://www.litesmith.com/flexair-inflatable-pillows/ (rendered; option combinations clicked and price re-read each time); https://www.litesmith.com/search.php?search_query=flexair ; garagegrowngear.com/products.json

**Changes recommendation?** Yes — quote it as $2.60 for the Large single, not $2.25 (that's the Small), and print the free-shipping threshold since shipping will exceed the item price several times over. Buy the 3-pack at $6.95 if buying at all. Worth noting the page's own copy independently backs Jed's use case — 'Large is a better size if you roll side to side during the night' — and at 0.9 oz this is the natural bladder to drop inside a Pillow Strap Large rather than paying $30 for the Zenbivy bladder. That combination (Pillow Strap Large $45.00 + FlexAir Large $2.60 = $47.60, ~4.2 oz) is the cheapest credible build in the entire lineup and should probably be in the guide.

## Still unresolved

- Zenbivy shipping lead time and transit estimate — I confirmed the $99.00 Large+Overstuffed price by live cart total but never opened Zenbivy's shipping policy page, so I cannot state a ship-by date. For a mid-August trip this needs one more check before the guide promises delivery.
- Whether ANY third-party retailer stocks the Pillow Strap LARGE. Garage Grown Gear carries only Small and Medium. The maker's page mentions an Etsy store and a 'retailer page' for other options, which I did not enumerate. Right now the only verified source for Large is pillowstrap.com direct, and that is a single point of failure on a 4-8 business day transit.
- Exped Mega Pillow restock date at Exped USA. The page offers only 'EMAIL ME WHEN AVAILABLE' with no ETA, so I can't say whether direct becomes an option before August.
- Trekology Aluft 2.0 size/variant pricing beyond the default. The B07MQJPVWD page loaded with attribute 'Size: Small' at $19.99 and showed sibling swatch prices ranging $19.99-$24.99; I did not click through each variant, so a larger Aluft 2.0 may carry a different price than the $19.99 I quoted.
- True per-size spec weight for the Therm-a-Rest Air Head Down. REI's spec block is self-contradictory ('Regular: 7.3 ounces - Large: 4.9 ounces') and thermarest.com exposes only shipping weights (139 g / 207 g), which are not the same thing. The Large weight I gave (~7.3 oz / 207 g) is inferred, not a published manufacturer spec.
- Backcountry stock for everything other than the NEMO Fillo. I verified Backcountry only for the Fillo line; the Sea to Summit, Therm-a-Rest, Exped and Zenbivy items were priced at REI and brand-direct only, so Backcountry may hold stock (or better delivery dates) on items I marked thin.
- Whether Sea to Summit Pillow Lock Patches actually adhere to Big Agnes Rapide SL / Zoom / Divide pad fabric. The product is free and in stock, but Sea to Summit only says 'your sleeping mat' — I found no compatibility statement covering Big Agnes, and Jed is on a Big Agnes pad.
- Order-quantity limits on the free $0.00 Pillow Lock Patches, and whether they can be ordered standalone at all given the '$50+' free-shipping threshold. I did not attempt a checkout.

## Method

Playwright browser MCP (mcp__plugin_playwright_playwright__browser_run_code_unsafe / browser_navigate). Two techniques: (a) rendered-page reads — opened a fresh page via page.context().newPage(), navigated, waited 4-7s, then read document.body.innerText and embedded JSON-LD (this is how REI, Amazon, Backcountry, NEMO, Exped USA, Zpacks, Zenbivy, Litesmith, Pillow Strap, Sea to Summit and Feathered Friends were read); (b) page.request.get() against each store's own live Shopify inventory endpoints (/products.json, /products/<handle>.js, /search/suggest.json) using the browser's context — this returns per-variant price + available boolean straight from the merchant. Retailers that 403 plain WebFetch (REI, Amazon, Backcountry, Garage Grown Gear) all loaded fine this way; Garage Grown Gear specifically was NOT a 403 via this method. One price was verified by transaction rather than by label: I POSTed the three Zenbivy component variant IDs to /cart/add.js and read back /cart.js total_price. Note the browser session was shared with another agent, so I opened my own page per task to avoid cross-navigation.