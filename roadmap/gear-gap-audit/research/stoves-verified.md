# Stoves — adversarial spec verification

MSR, Jetboil, Soto and GSI canister stoves re-checked against MSR's own product pages (cascadedesigns.com,
which msrgear.com 301-redirects to). REI was attempted as the second source for all three
(and for the REI homepage itself, as a reachability sanity check) but **every REI.com
request timed out** in this session — this is a tooling/network limitation, not a finding
about REI's content, and is called out per-product below rather than silently omitted.

Tally: **all four in-guide stove prices were WRONG, every one of them understated** —
PocketRocket 2 $39→$49.95, PocketRocket Deluxe $69→$84.95, Soto Amicus $34→$49.95, Jetboil
Flash $109→$115.99. All four weights were CORRECT. Also corrected: Jetboil Flash packed
dimensions, and four `priceHistory` arrays that were drawing a green "price falling"
sparkline on stoves whose prices had risen. REI cross-check UNAVAILABLE for every product
(see the gap note at the end).

Four candidate stoves were also verified but **not** added — Jetboil Stash, Jetboil MiniMo,
Soto WindMaster, GSI Glacier Canister-Top. Reasons per product below.

**Video claims that did not survive contact with a manufacturer page:** Jetboil Stash is
$164.99, not the $149.99 or $135 two videos claimed, and 7.1 oz, not 6.6 oz. MSR WindBurner
is 15.3 oz, not 14.6 oz. Soto WindMaster's "3.05 oz stove alone" is really the as-shipped
4Flex weight; the bare stove is 2.12 oz. The GSI stove in the video is the Glacier
**Canister-Top** ($64.95), not the Glacier **Camp** Stove ($39.95) — different products.
One video also stated propane's boiling point as −4 °C; it is −42 °C.

## MSR PocketRocket 2 Stove

**Question:** Guide claims $39 and 2.6 oz. Confirm both on cascadedesigns.com.

**Confidence:** PARTIAL

**Answer:** Weight is exactly right; price is wrong by $10.95. MSR's own tech-specs table,
verbatim: "Minimum Weight | 2.6 oz (73 g)", "Packaged Weight | 3.7 oz (105 g)", "Dimensions |
1.3 x 1.6 x 3.1 in (3.3 x 4.1 x 7.9 cm)", "Boil time (MSR IsoPro), 1 liter | 3.5 minutes",
"Burn time (MSR IsoPro) per 227-g / 8-oz. canister | Appx. 60 minutes", "Water boiled (MSR
IsoPro) per 227-g canister | 16 liters", "Water boiled (MSR IsoPro) per 1 oz. of fuel | 2
liters", SKU 09884. Current listed price on the page is **"$49.95"**, not $39 — the guide's
own `priceHistory: [50, 50, 45, 42, 39]` array suggests $39 was a real historical sale price
at some point, but it is not what MSR is charging today. No pressure regulator is mentioned
anywhere in the tech specs (correct — that's the Deluxe's differentiator). MSR does not
publish a BTU/watt burner-output figure for this stove; it only publishes boil time, burn
time, and liters-boiled-per-canister. The page currently shows **"Out of Stock"** with a
"Join the waitlist" option. The page also carries its own embedded review widget: "4.617647
/ 5 from 170 reviews".

**Source:** https://cascadedesigns.com/products/pocketrocket-2-stove (rendered, full tech
specs table + description quoted above). REI (https://www.rei.com/product/114890/msr-pocketrocket-2-stove)
attempted 3 times this session — every request timed out (ETIMEDOUT / 60s), including a
bare fetch of https://www.rei.com/ itself, so this is REI-wide unreachability in this
session, not a bad URL. Star rating / review count above is from MSR's own site, not REI —
flag as "MSR-hosted rating," not cross-verified against REI.

**Changes recommendation?** Yes. Print **$49.95**, cite cascadedesigns.com, and drop the $39
figure or explicitly label it a past sale price with a date if one is known. Weight, boil
time, and dimensions can stay as-is (all confirmed). Add "Out of Stock at MSR direct as of
2026-07-28 (waitlist only)" if the guide wants to flag availability, but note this doesn't
mean it's unavailable everywhere — REI/other retailers were not checkable this session.

## MSR PocketRocket Deluxe Stove

**Question:** Guide claims $69 and 2.9 oz. Confirm both on cascadedesigns.com.

**Confidence:** PARTIAL

**Answer:** Weight is exactly right; price is wrong by $15.95. MSR's tech specs, verbatim:
"Weight | 2.9 oz (83 g)" (minimum weight), "Packed Dimensions | 1.5 x 2.2 x 3.3 in (3.8 ×
5.6 × 8.4 cm)", "Boil Time | 3.3 minutes" (1 liter with MSR IsoPro). Current listed price is
**"$84.95"**, not $69 — again the guide's own `priceHistory: [85, 85, 79, 74, 69]` array
implies $69 was a past sale low, not today's price. Regulator: **yes**, confirmed by the
product description text itself: it "boasts premium features, including a pressure
regulator." No BTU/watt figure is published, same as the standard PocketRocket 2. Stock
status on the page reads **"Sale Out of Stock."** MSR's own review widget: "4.5030675 / 5
from 163 reviews".

**Source:** https://cascadedesigns.com/products/pocketrocket-deluxe-stove (rendered).
REI (https://www.rei.com/product/148209/msr-pocketrocket-deluxe-stove) attempted — timed
out, same REI-wide unreachability as above.

**Changes recommendation?** Yes. Print **$84.95**, cite cascadedesigns.com. Weight, boil
time, dimensions, and "has a pressure regulator" all confirmed as-is. Flag "Sale Out of
Stock" at MSR direct if the guide tracks availability.

## MSR WindBurner Personal Stove System

**Question:** Not currently in the guide. A video claimed $199.95 and 14.6 oz including pot
— check both, plus boil time, BTU, regulator, dimensions, availability.

**Confidence:** PARTIAL

**Answer:** Price matches exactly; weight does not. MSR's tech specs, verbatim: "Minimum
Weight | 15.3 oz (433 g)", "Packaged Weight | 16.4 oz (465 g)", "Volume | 1 Liter",
"Dimensions | 4.5 x 4.5 x 7.1 in (11.5 x 11.5 x 18 cm)", "Burn Time (MSR IsoPro) per 227-g /
8-oz. Canister | ~95 minutes", "Boil Time (MSR IsoPro), 1 Liter | 4.5 minutes", "Water
Boiled (MSR IsoPro) per 227-g Canister | 18 Liters", "Water Boiled (MSR IsoPro) per 1 oz. of
Fuel | 2.3 Liters". Listed price is **"$199.95"** — the video's figure is exactly right.
Weight: the video's "14.6 oz including pot" does **not** match MSR's current published
**15.3 oz minimum weight**, a 0.7 oz (~5%) difference. This is billed and sold only as an
integrated system (burner + 1.0 L hard-anodized pot with heat exchanger + insulated cozy +
lid + 0.5 L bowl all included — see "What's Included" quote below), and MSR does not
publish a separate stove-only vs. pot-only weight breakdown anywhere on the page, so the
15.3 oz figure should be read as the full boil-ready unit, not stove-alone. The 14.6 oz
figure could be a stale/prior-revision spec, a rounding difference from an older WindBoiler-era
listing (the page's own award-badge image filename still reads
`MFO_logo_Award_2014_4C_WindBoiler.png`, confirming the product was previously sold as
"WindBoiler"), or simply an error in the video. Treat 14.6 oz as **UNVERIFIED / likely
wrong** — print MSR's current 15.3 oz instead. Regulator: **yes**, explicitly listed among
included components: "Pressure Regulator For Consistent Performance." No BTU/watt figure is
published. What's Included, verbatim: "Radiant Burner With Boil-To-Simmer Control /
Pressure Regulator For Consistent Performance / 1.0 L Hard-Anodized Aluminum Pot With
Integrated Heat Exchanger & Insulated Cozy With Handle / BPA-Free Drinking/Straining Lid /
0.5 L Integrated Bowl." Stock status: **"Out of Stock"** with a "Join the waitlist" option.
MSR's own review widget: "4.5800867 / 5 from 231 reviews".

**Source:** https://cascadedesigns.com/products/windburner-personal-stove-system (rendered,
tech specs table, What's Included list, and stock status all quoted above).
REI (https://www.rei.com/product/238316/msr-windburner-personal-stove-system) attempted —
timed out, same REI-wide unreachability.

**Changes recommendation?** If adding this product: print **$199.95** (confirmed) and
**15.3 oz minimum weight (system, includes pot) / 16.4 oz packaged**, not 14.6 oz — cite
cascadedesigns.com and do not repeat the video's weight figure without a correction note.
Confirm it does have a pressure regulator and no published BTU rating (MSR doesn't publish
burner wattage/BTU for its canister stoves generally — true for all three stoves in this
file). Flag "Out of Stock, waitlist only" at MSR direct as of 2026-07-28.

## Jetboil Flash Cooking System (FLDC3)

**Question:** Guide claims $109 and 13.1 oz. Confirm on jetboil.com.

**Confidence:** CONFIRMED (Jetboil direct; REI blocked)

**Answer:** Weight right, price wrong, dimensions wrong. Spec block verbatim: "Weight
13.088 oz | 371 g" (footnote "System weight excludes fuel stabilizer"; "Stabilizer Weight
0.9 oz | 27 g"), "Volume 1 Liter Tall", "Water Boiled 10 liters per 100g JetPower Can",
"Boil Time 120sec per .5 liter (avg. over life of JetPower can)", "Fuel Regulator No",
"Dimensions (Packed) 4.25 in x 7.5 in | 10.8 cm x 19.05 cm". The 13.088 oz is the full
system (burner + 1 L pot + cozy + lid + bottom cover), confirmed against the page's
WHAT'S IN THE BOX list — so the guide's 13.1 oz is correct and correctly framed. Price
today is **"$115.99"** on sale against an MSRP of **"$144.99"**, not $109. Guide's packed
dimensions of "4.1 x 7.1 in" are also wrong; Jetboil publishes 4.25 x 7.5 in. In stock.
Jetboil-hosted rating widget: "4.9 ... Read 176 Reviews".

**Source:** https://jetboil.johnsonoutdoors.com/us/shop/stoves-systems/flash-10l-fast-boil-system/fldc3
(DOM-verified in a live browser session, not a search summary)

**Changes recommendation?** Yes — print $115.99 sale / $144.99 MSRP and fix dimensions to
4.25 x 7.5 in. Both applied 2026-07-28.

## Jetboil Stash Cooking System — candidate, not in guide

**Confidence:** CONFIRMED

**Answer:** **Both video claims are wrong.** One video said $149.99, another $135; Jetboil's
own page reads **"$164.99"** with no sale or strikethrough. One video said 6.6 oz; Jetboil
publishes "Weight 7.1 oz | 201.282 g" (system, excludes stabilizer). Other specs verbatim:
"Volume .8 Liter", "Water Boiled 12 liters per 100 g Jetpower can", "Boil Time 150sec per
.5 liter", "Fuel Regulator No", "Dimensions (Packed) 4.4 in x 5.1 in | 11.2 cm x 13 cm".
In stock. Jetboil-hosted rating: "4.3 ... Read 129 Reviews. (129)".

**Source:** https://jetboil.johnsonoutdoors.com/us/shop/stoves-systems/stash-cooking-system

**Changes recommendation?** Only add with $164.99 / 7.1 oz. This is the single best
fuel-efficiency number in the lineup (12 L per 100 g) but it is also the most expensive
per unit, and three of them is $495 — hard to justify for a group that only boils water.

## Jetboil MiniMo Cooking System — candidate, not in guide

**Confidence:** PARTIAL — **Jetboil's own page contradicts itself on weight**

**Answer:** Spec table reads "Weight 12 oz | 415 g". Those are not the same quantity: 12 oz
= 340 g, and 415 g = 14.6 oz. The figure was pulled three times (twice by WebFetch, once via
raw document.body.innerText in a live browser) and returned the identical string every time,
so this is a real error on Jetboil's page, not a fetch artifact. Do not print a bare "12 oz".
Everything else confirmed verbatim: "$116.99" sale against "$179.99" MSRP, "Includes Free
Coffee Press", "Volume 1 Liter Short", "Water Boiled 12 liters per 100 g Jetpower can",
"Boil Time 2m 15sec per .5 liter", **"Fuel Regulator Yes"**, "Dimensions (Packed) 5 in x
5.5 in | 12.7 cm x 14 cm". In stock. Rating "4.6 ... Read 315 Reviews. (315)".

**Source:** https://jetboil.johnsonoutdoors.com/us/shop/stoves-systems/minimo-cooking-system

**Changes recommendation?** Not added — the weight is unresolvable from the manufacturer
alone, and the repo rule forbids picking one of two contradictory published figures and
presenting it as fact. Revisit when REI is reachable as a tiebreaker.

## Soto Amicus Stove with Igniter

**Question:** Guide claims $34. Confirm on sotooutdoors.com and get the weight.

**Confidence:** CONFIRMED

**Answer:** **Price wrong by $15.95 — and wrong in a way that inverts the guide's framing.**
Soto's page shows "$49.95" with no sale price, no strikethrough, no compare-at. The guide
listed $34 against a claimed $45 MSRP, i.e. it advertised a discount on a stove that
actually costs more than the guide's stated list price. Weight confirmed verbatim: "Weight:
2.9 oz　(81g)". Output verbatim: "Output: 2800 kcal/h 3260w 10210 BTU". Duration verbatim:
"Duration: Burns approx.1.5 hours with 8 oz (250g) canister". Dimensions verbatim: "In use
3.0 x 4.0 x 3.4 in ... When stowed 1.7 x 1.6 x 3.0 in". **No pressure regulator** — the word
"regulator" does not appear on the page, unlike the WindMaster page. In stock. Note: Soto
publishes **no time-to-boil figure** for the Amicus, so the guide's "3.5 min / 1 Liter"
spec is not sourced from the manufacturer and should be dropped or attributed.

**Source:** https://www.sotooutdoors.com/products/amicus-stove-with-igniter (opened twice,
identical both times; sotooutdoors.com blocks curl with mod_security 406)

**Changes recommendation?** Yes. $49.95 applied 2026-07-28. The unsourced boil-time spec is
still present and should be resolved in a later pass.

## Soto WindMaster — candidate, not in guide

**Confidence:** CONFIRMED

**Answer:** Resolves the video conflict. Price is **"$69.95"**, so the "$70 stove alone"
claim is right and the "$114.94" figure was the stove plus a separately-bundled titanium
mug — Soto's page offers no pot/mug bundle at all. Weight depends on which pot support is
attached, and Soto publishes all three, verbatim: "3.0. oz.(87g) with the 4Flex pot
support", "2.3 oz.(67g) with the optional TriFlex pot support", "2.12 oz. (60g) with no pot
support". Default shipping config confirmed verbatim: "The WindMaster OD-1RXN which comes
with only the 4Flex pot support replaces the previous WindMaster OD-1RXC that came with
both the TriFlex and the 4Flex." So the shipped weight is **3.0 oz with the 4Flex**, and
the video's "3.05 oz stove alone" was really the as-shipped 4Flex weight, not the bare
stove. Regulator confirmed verbatim: "The WindMaster uses the Micro Regulator valve
system." Output verbatim: "Output: 2800 kcal/h 3260w 11000 BTU". Boil claim verbatim:
"Boil 2 cups of water in under 2-1/2 minutes in strong winds and gusty weather."
**Out of stock** at Soto direct, confirmed on two separate loads.

**Source:** https://www.sotooutdoors.com/products/windmaster-stove (opened three times)

**Changes recommendation?** Not added this pass — it is out of stock at the manufacturer
with the trip leaving 2026-08-10, and it is a bare burner, which the fuel math now argues
against for the three group stoves. Worth adding later as the wide-support burner option.

## GSI Glacier Canister-Top Stove — candidate, not in guide

**Confidence:** CONFIRMED (name, price, availability); PARTIAL (weight is a Shopify
shipping-weight field, not a published spec)

**Answer:** **The product name matters.** GSI sells at least four "Glacier" stoves: Glacier
Remote Stove ($94.95), Glacier Camp Stove ($39.95), Glacier Canister-Top Stove ($64.95),
Glacier Stainless Explorer Set ($89.95). The video's $64.95 / 3.2 oz figures match the
**Glacier Canister-Top Stove** — confirmed by the page h1 and the Shopify JSON
"title":"Glacier Canister-Top Stove". Adding it under the name "Glacier Camp Stove" would
attach the wrong price ($39.95) and wrong weight (168 g / 5.93 oz) to a different product.
Price confirmed from Shopify JSON "price":6495 and meta og:price:amount 64.95. Weight 88 g
= 3.10 oz from the Shopify variant "weight":88 field — GSI's own spec accordion prints no
weight line, only "Dimensions: 2.3" x 2" x 2.6"", so treat 3.10 oz as derived from the
shipping-weight field, not published. Output verbatim: "a powerful 10,900 BTU output".
Piezo confirmed: "Featuring a reliable piezo ignition for easy lighting." **No regulator** —
zero matches for "regulat" in the full raw HTML. In stock per Shopify JSON "available":true.

**Method warning worth keeping:** WebFetch's summarizer reported "Sold Out" for both GSI
products on its first two passes while the Shopify JSON said available:true. GSI's static
HTML carries dormant "Sold out" button markup that an AI page-summarizer misreads as live
state. The sibling Glacier Camp Stove page shows the same pattern alongside an explicit
schema.org/InStock tag. **Trust the .js endpoint over the rendered summary for GSI.**

**Source:** https://gsioutdoors.com/products/glacier-canister-top-stove and its .js endpoint;
https://gsioutdoors.com/collections/camping-stoves

**Changes recommendation?** Not added this pass. Cheapest credible bare burner in the
lineup, but still a bare burner, and the trip needs integrated systems.

## Price history arrays removed

All four in-guide stoves carried a `priceHistory` array from the original generation pass
([50,50,45,42,39] on the PocketRocket 2, and similar). Every one trended downward to the
stale price. `renderSparklineSVG` colors the line **green when the last point is at or
below the first**, so each of these stoves was rendering a "price is falling" sparkline
while its real price had in fact gone **up** — $39→$49.95, $69→$84.95, $34→$49.95,
$109→$115.99. None of the historical points are verifiable. All four arrays were set to
`[]`; the function returns an empty string for `history.length < 2`, so the sparkline
simply does not render. Do not repopulate these without dated primary sources.

## Known gap: REI unreachable this session

Every REI.com request in this session timed out (ETIMEDOUT after 60s) — three different
product URLs plus the bare REI homepage. This looks like a session-specific network/bot-
protection issue with WebFetch reaching REI, not a problem with any particular URL. Star
ratings and review counts above are therefore sourced from MSR's own site-hosted review
widget, not REI, and have not been cross-verified against REI's numbers. A later session
should retry REI directly (or via a different fetch path) before treating REI-sourced
ratings as confirmed for these three products.
