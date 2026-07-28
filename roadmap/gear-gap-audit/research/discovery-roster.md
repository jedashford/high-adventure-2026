# Discovery roster — gear categories missing from the guide

**Status: RAW DISCOVERY. NOT VERIFIED.** Every number in this file is pre-audit and must be
treated as a lead, not a fact. Verified figures live in the sibling files
(`cookware-verified.md`, `bags-storage-verified.md`, `sanitation-verified.md`,
`regulations-verified.md`). Where those files disagree with this one, **they win.**

Trip context: Sawtooth Wilderness, Alice–Toxaway & Edith Lake Loop, August 10–13 2026,
Lakeside 14th Ward Young Men — roughly 8–12 teenage boys plus adult leaders, departing
Tin Cup Trailhead.

---

## 1. The gap analysis

`gemini-code-1784928132429.html` carries 14 categories: Tents, Sleeping Bags, Sleeping Pads,
Pillows, Backpacks, Stoves & Cooking, Footwear, Rain Shells, Lighting & Headlamps, Water
Filtration, Radios & Comms, Electronics & Nav, Trekking Poles, Camp Chairs.

**"Stoves & Cooking" is five products: four stoves and one pot.**

| Missing area | Current coverage | Consequence |
| --- | --- | --- |
| Eating utensils | **none** | Nobody has a way to eat. Long-handle spoons are the single cheapest high-impact fix. |
| Pots sized for 2–4 | TOAKS 750 ml only (solo/duo) | Cook groups of 3–4 must boil twice per meal. |
| Bowls / mugs | **none** | Blocks bulk cooking, which is the several-hundred-dollar-cheaper food plan. |
| Pot grippers, stabilizers, ignition backup | **none** | Handling 2 L of boiling water on uneven granite with teens. |
| Cleanup + LNT greywater | **none** | Strain-and-scatter is the step groups skip; food scraps habituate animals. |
| Food storage | **none** | Drives the bear-canister-vs-Ursack-vs-hang decision. |
| **Bags & organization** | **none — no category at all** | Pack liner is a genuine safety item, not an accessory. |
| **Sanitation** | **none — no category at all** | Local rule requires packing out TP; plastic trowels fail in this soil. |

---

## 2. Architecture note (why this is low-risk to add)

The document is cleanly data-driven:

- `CATEGORIES` array at line ~4587 drives the tab bar.
- Each product object carries a `category` key matching a `CATEGORIES[].id`.
- `renderTabs()` computes count badges automatically from the product set.
- `CATEGORY_CDN_FALLBACKS` maps category id → fallback image.

Adding a category = append to `CATEGORIES`, add product objects with the matching `category`,
add one `CATEGORY_CDN_FALLBACKS` entry. **No changes to render logic required.**

Product object shape (from `stove-msr-pocketrocket-2`): `id`, `imageUrl`, `name`, `brand`,
`category`, `categoryName`, `pickType`, `profiles[]`, `profileTags[]`, `price`, `currentPrice`,
`msrp`, `salePrice`, `weight`, `weightOz`, `weightDisplay`, `dimensions`, `dealBadge`,
`valueRating`, `rating`, `reviewCount`, `specs{}`, `priceHistory[]`, `pros[]`, `cons[]`,
`buyingAdvice`, `verdict`.

---

## 3. Raw discovery — cooking & utensils

⚠️ All figures UNVERIFIED pending `cookware-verified.md`.

| Product | Claimed weight | Claimed price | Note |
| --- | --- | --- | --- |
| TOAKS Ti Long Handle Spoon (SLV-03) | 0.65 oz | $9.95 | Lead candidate — 8⅝" clears a Mountain House pouch |
| Snow Peak Ti Spork Long | 0.7 oz | $10.95 | 8.2" |
| Snow Peak Ti Spork (standard) | 0.6 oz | $9.95 | 6.5" — **too short for pouches** |
| Light My Fire Spork Original | 0.3 oz | $3.95 | Spares pick; tines snap under leverage |
| Sea to Summit Alpha Light Spoon Long | 0.4 oz | ~$8 closeout | Reported **DISCONTINUED**, replaced by Frontier UL |
| humangear GoBites Uno / Duo | 0.5 / 0.8 oz | unverified | Duo snaps to 9.5" |
| GSI Halulite 1.8L Boiler | 11 oz | $39.95 | Best-value group pot candidate; folding handle |
| TOAKS Ti 1300 ml (POT-1300) | 4.8 oz | $50.95 | 1.3 L is tight for 3–4; Ti hot spots |
| Sea to Summit X-Pot 2.8L | 12.5 oz | $55–64.49 | Collapses to 40 mm |
| MSR Ceramic 2-Pot Set | 15.6 oz | $94.95 | Nonstick — but Ti utensils would wreck it |
| MSR Alpine 2 Pot Set | 1 lb 10 oz | $77.95 | Stainless; too heavy for teens |
| GSI Infinity Bowl | 2.3 oz | $4.95 | Budget bowl pick |
| Snow Peak Ti-Single 450 Cup | 2.4 oz | $29.95 | Single-wall = stove-safe |
| MSR PanHandler gripper | 1.9 oz | $19.95 | Rated 10 lb |
| Vargo Ti Pot Lifter | 0.8 oz | $26.95 | Less secure grip under load |
| MSR Universal Canister Stand | 1.2 oz | $25.95 | **Possibly discontinued** |
| UCO Stormproof Match Kit | 1.7 oz | $11.99 | Ignition backup |
| Sea to Summit Wilderness Wash 50 ml | 2.2 oz | $10.95 | **Price suspect** — same figure shown for 250 ml |
| S2S Ultra-Sil Kitchen Sink 10L | 55 g / 71 g conflict | unverified | Lets group wash away from the lake |

### Safety claim requiring verification

MSR's instruction manual reportedly states: *"DO NOT use any windscreen with the stove. Any
windscreen, including a standard MSR windscreen, may cause the canister to explode."*
If confirmed, this becomes a **hard warning** in the guide — with 12 teenagers, someone will
use a windscreen wrong. Mitigation: assign the Jetboil Flash (heat-exchanger) as the
designated wind stove.

---

## 4. Raw discovery — bags & organization

⚠️ All figures UNVERIFIED pending `bags-storage-verified.md`.

**Stale-spec warning already caught:** Sea to Summit dry bag weights circulating in search
results are previous-generation (8 L = 1.1 oz, 13 L = 1.4 oz). Current manufacturer figures
are heavier (8 L = 1.4 oz, 13 L = 1.7 oz, 20 L = 2.0 oz). Expect more of this.

| Product | Claimed weight | Claimed price | Note |
| --- | --- | --- | --- |
| **Nylofume pack liner** | 0.91 oz | $2.49–7.10 | **The high-value item.** Protects always; no deploy step |
| Trash compactor bag | ~1.4–2.2 oz | ~$11 / 5-ct | Sources conflict on weight |
| Zpacks DCF Pack Liner | 1.2 oz | $59.95 | $60 vs $2.49 for 0.3 oz |
| S2S Ultra-Sil Stuff Sack | 0.6–1.7 oz | $18.95 flat? | Flat pricing across sizes needs confirming |
| S2S Lightweight Stuff Sack | 1.0–3.4 oz | $17.95 flat? | 70D — better for teens than 30D |
| S2S Evac Compression Dry Bag | 13 L = 4.8 oz | $39.95+ | Only option that compresses *and* waterproofs |
| S2S Ultra-Sil Pack Cover | 4.0 oz (M) | $36.95 | **Inferior alone** — see below |
| Granite Gear Air ZippSack | 12L 1.4 oz | $31.95 | Zipper beats drawcord for a kid |
| Zpacks Color Bands 6-pk | 0.07 oz | $4.95 | Cheapest problem-solver found |
| Gossamer Gear Thinlight 1/8" | 3.3 oz folded | $22.00 | Sit pad + frame sheet + pad booster |
| Zpacks Pillow Dry Bag | 1.4 oz | $54.95 | Clothes bag + dry bag + pillow in one |

### Two findings that change recommendations

1. **Pack liner beats pack cover, decisively.** A cover only works if the wearer stops and
   deploys it. August Sawtooth storms are fast, convective, and often hit above treeline —
   teenagers hike faster rather than stopping to rig a cover. A liner protects unconditionally
   at 1/4 the weight and 1/15 the price.
2. **Skip compression sacks for sleeping bags.** Not the usual loft argument (daily compression
   over 4 days is harmless) — a compression sack makes a rigid cylinder that leaves dead air in
   the pack's corners. Stuffing loose into the liner packs better and saves 2–4 oz plus $35.
   *Separate and real:* down bags must be stored **uncompressed at home**. Tell the parents;
   that's how youth-group gear actually dies.

### Food storage roster

| Product | Claimed weight | Claimed price | Note |
| --- | --- | --- | --- |
| Ursack Major | 7.6 oz | **$124.95 vs ~$80 — unresolved** | Weak against rodents (<¼" holes pass IGBC) |
| Ursack AllMitey | **9.5 vs 13 oz conflict** | $189.95 | Kevlar; rodent-rated by maker, not by IGBC |
| BearVault BV450 | 2 lb 1 oz | $89.99 | 3–4 days, 1 person |
| BearVault BV500 | 2 lb 9 oz | $99.99 | ~7 person-days |
| BearVault BV475 | 2 lb 4 oz | **$94.99 vs $106.99 conflict** | One listing priced it above the BV500 |
| LOKSAK OPSak | ~1 oz vs ~2.5 oz conflict | from $10.99 | Odor barrier; 12×20 may be a stock gap |
| Zpacks Bear Bagging Kit | **3.2 vs 3.4 oz — page self-contradicts** | $64.95 | Component sum says 3.2 |
| HMG Roll-Top Food Bag Kit | 3.23 oz (10 L) | $75 direct / $80 GGG | Buy direct: cheaper + lighter line option |

**IGBC scope correction:** only two Ursack models are on the IGBC certified list (Major #3738,
AllMitey #5135). XL, 2XL, Grizzly, Kodiak are not separately listed. IGBC certifies against
**bears only** — there is no IGBC rodent certification, so the AllMitey's critter claim is the
manufacturer's own testing.

**Complete PCT-hang kit converges at 3.0–3.5 oz / $60–85** across two independent vendors,
which suggests the figure is real. DIY gets to ~2.2–2.7 oz; the biggest lever is the cord,
not the bag.

---

## 5. Raw discovery — sanitation

⚠️ All figures UNVERIFIED pending `sanitation-verified.md`.

### The honest headline

**Yes, it really is a trowel and toilet paper.** That is the entire standard method and it
works. The "more comfortable / more proper" market is almost entirely car-camping gear
mislabeled as backcountry gear.

| Product | Claimed weight | Claimed price | Verdict lead |
| --- | --- | --- | --- |
| TheTentLab Deuce #3 DirtSaw | 0.97 oz | $24.95 | Lead pick — real strength margin in rocky soil |
| QiWiz Big Dig (Ti) | ~0.6 oz | $36.00 | Ti springs back rather than taking a set |
| Suluk 46 Tark Large | 0.67 oz | $37.99 | Sharpest tip in one comparison test |
| Vargo Dig Dig | 1.25 oz | $24.95 | Most rigid; reportedly out of stock direct |
| PACT Shovel | 1.3 oz | $20.00 | Cylindrical section = stiff |
| GSI Cathole Trowel | ~3.1 oz (retailer) | $8.95 | **Plastic — do not buy** |
| Coghlan's trowel | 2 oz | $3.49 | **Plastic — broke in ~10 s in field test** |
| Cleanwaste WAG BAG | 2.5 oz | $2.60–3.25 | Contingency, not primary |
| RESTOP 2 | 85–90 oz measured | $4.33–5.95 | Best odor control (Mylar outer) |
| Biffy Bag | 60–72 g | **price unresolved** | Leg loops = no bucket; best privacy answer |

### Comfort products — the reality sort

**Backpack-realistic (two products total):**

- **Carry Anywhere Commode** — ~1.3–1.5 lb, **$42 vs $60 (maker's own site contradicts itself)**.
  Only purpose-built freestanding seat-height backcountry toilet under 2 lb sold in the US.
- **Silnylon tarp as privacy screen** — 8–16 oz, marginal weight ≈ 0 if already carried.

**Car-camp only — do not carry:** Luggable Loo (2.96 lb but a rigid 15" bucket), Cleanwaste GO
Anywhere toilet (7 lb), Total System (20 lb ≈ a whole 4-day base weight), every Thetford/Camco
porta-potti (8–12 lb), every pop-up privacy shelter (**lightest made is still 8 lb**).

**Reported not to exist** (each re-tested during verification): trekking-pole toilet seat;
titanium/carbon folding cathole seat; "PACTO" trail toilet; purpose-built backcountry
squat-assist. Also: **do not cut a hole in a Helinox Chair Zero** — the sling is structural and
the geometry is wrong over a cathole.

**TreeHugger Portable Toilet** (~10 oz / ~$50) is the least-substantiated claim in the entire
research set — sourced only from a competitor's blog. Flagged for kill-or-confirm.

### Group method (pending regulatory confirmation)

Catholes, dispersed, **not** a group latrine — NOLS calls latrines "the least desirable option"
and the group moves camp on a loop anyway. Run it as a supervised system: pre-trip briefing,
a designated toilet area per camp sited 200 ft from water/camp/kitchen, a trekking pole as the
open/closed signal, soap-and-water handwashing (CDC: sanitizer does not work well on norovirus),
no shared food bags or utensils.

---

## 6. Conflicts handed to the verification pass

| # | Conflict | Why it matters |
| --- | --- | --- |
| 1 | Ursack Major $124.95 direct vs ~$80 retail | 4× purchase; a ~$180 group swing |
| 2 | Ursack AllMitey 9.5 oz vs 13 oz | 3.5 oz × 4 bags across teen packs |
| 3 | BearVault BV475 listed above the larger BV500 | Suggests a wholesaler price, not street |
| 4 | Carry Anywhere Commode $42 vs $60, 1.3 vs 1.5 lb | Only viable comfort product; specs must be right |
| 5 | TreeHugger toilet — competitor-blog sourcing only | Kill or confirm |
| 6 | Wilderness Wash — same price shown for 50 ml and 250 ml | Obvious rendering artifact |
| 7 | GSI Halulite Dualist $99.99 vs Pinnacle Dualist II $59.99 | Are these even the same product? |
| 8 | MSR Universal Canister Stand possibly discontinued | Don't recommend an unbuyable item |
| 9 | Zpacks Bear Bagging Kit 3.2 vs 3.4 oz (self-contradiction) | Page error on the maker's own site |
| 10 | OPSak per-bag weight ~1 oz vs ~2.5 oz | Shipping weight vs true weight |
| 11 | Biffy Bag pricing entirely unresolved | Maker's site mid-refresh |
| 12 | PACT Pack Out Kit — kits per $38 box unknown | Per-kit math was self-contradictory |
| 13 | Ziplock/freezer bag weights never sourced | We recommend these *over* $20 pouches |
| 14 | "EPA approved for landfill disposal" | No EPA document found; likely marketing shorthand |
| 15 | All Sawtooth regulatory claims | Legal/safety consequences — agency sources only |

---

## 7. Provenance

Discovery run 2026-07-27 across parallel research agents covering sanitation, cookware, and
bags/organization, each of which spawned focused sub-agents for bear canisters, Ursack/OPSak,
WAG-bag pack-out systems, and hang kits/cordage.

**Known limits of the discovery pass:** several agents exhausted their WebSearch budget (200/200)
mid-run and fell back to direct fetches only; `rei.com` and Amazon blocked automated fetches
repeatedly; the IGBC certified-products PDF 404'd on first attempt; and the Sawtooth food-storage
order's "Exhibit A" — which holds the binding definition of "acceptably stored" — could not be
retrieved. Those gaps are exactly what the verification pass exists to close.

**Methodology reminder from the pillow audit:** two sources in that run were *fabricated outright*
by search-engine summarization and were caught only because an agent opened the actual page.
Search snippets are not evidence here.
