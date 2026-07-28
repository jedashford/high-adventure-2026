# Adversarial findings — 5 lenses


==============================================================================
# BAG-AND-STOCK
==============================================================================

## JOB 1 — THE HOOD CONFLICT: SETTLED

**Source of record:** `https://sierradesigns.com/backcountry-bed-20/` → resolves to `https://sierradesigns.com/products/backcountry-bed-20`, Playwright-rendered 2026-07-27, plus the Shopify product JSON at `/products/backcountry-bed-20.js`. Both sizes in stock: Regular $209.95, Long $219.95. 26 reviews, 4.7 avg.

### (a) Does the current bag have a hood, and does it cinch?

**Both agents quoted real text. Both were incomplete. Here is the whole picture.**

The word "hood" appears **exactly once on the entire page**, in the marketing paragraph — verbatim:

> "With plenty of options to control your temperature — like the self-sealing foot vent, insulated shoulder pockets and cinchable hood — taming your wild adventures is as easy as going to sleep."

The RETENTION AGENT was right that this string is live today. But the **FEATURES list — the engineering spec list — contains no hood bullet at all.** Here is the complete, verbatim FEATURES set:

- "Patented zipperless design provides an ultra-comfortable lightweight bag"
- "Oversized integrated comforter gives all the comforts of your bed at home"
- "Full-length, insulated hand/arm pockets help to seal out drafts and seal in warmth"
- "Patented self-sealing foot vent provides fast and easy ventilation"
- **"Stretch cord closure system helps to seal out drafts"**
- "Sleeping pad sleeve keeps pad under you for comfort and warmth, and replaces unnecessary bottom insulation"

The named mechanism is a **"Stretch cord closure system,"** not a hood drawcord. I pulled SD's own product photography and read it directly (files at `/private/tmp/claude-502/-Users-jed-jedstuff-high-adventure/aa7d2847-1b6b-41c2-ae03-7235f483b56e/scratchpad/bb20_1.jpg`, `bb20_4.jpg`, `bb20_5.jpg`, `bb20_7.jpg`): a single light-gray cord runs around the **entire opening perimeter** — over the head end, down both sides, terminating in a V at the sternum with two cordlock tabs. It snugs the whole aperture. It is not an independent hood drawcord that closes down to a mummy face-port. That is exactly why OGL wrote of the BB 700 that "the bag lacks a way to cinch the hood around your head" — both statements are true of the same hardware.

**Critical: the current bag is the same 2019 design.** Every product image filename on the live page is literally `SD2019_BackcountryBed_20_70603820_Print_1..7`. There is **no evidence of any hood redesign** between the Glavin-era criticism and today. The "current BB 20 may differ from the 2014-2019 BB 600/700" hypothesis is **not supported** — the shell and hood geometry SD is selling in 2026 is the 2019 asset set, which is itself the continuation of the patented "hook" architecture Glavin described.

### (b) THE DECISIVE QUESTION — pillow AND head in the hood simultaneously?

**NO. Every recommendation must assume external capture.** Five independent lines of evidence, none contradicted:

1. **SD product manager Michael Glavin, verbatim (Backpacking Light thread 94210, re-fetched and confirmed this session):** *"If we made it so it fit pillows and your head inside it is too floppy in the cases that you don't want your head in the 'hook' (95% of the time)."* And: *"it is tight with a thick pillow on the inside, especially for back sleepers."* This is a **statement of deliberate design intent**, not a defect report. It cannot be fixed by buying a different pillow.

2. **Glavin on why the hook exists:** *"It creates and stabilizes the 'hook' which is the key patented feature that allows tucking without the sides flopping open."* The tightness is load-bearing to the patent. SD will not loosen it.

3. **Owner Derek M., verbatim:** the *"'hood' lip was useless when I put my size large Exped Air Pillow inside. It would no longer cover my head."*

4. **Reviewer on the women's Backcountry Bed:** *"there wasn't quite enough room to fit a pillow and a head inside the hood"* and — this is the one that matters most — *"the pad sleeve does not allow for a pillow to be placed under the hood between the pad, so if it's so cold that you need to use the hood, your options in using a pillow are limited."* The pad sleeve and the hood **compete for the same volume**.

5. **SD's own current hero photography is the strongest evidence and nobody had looked at it.** In `Print_7` (the full-body in-use shot), the model lies in the Backcountry Bed 20 with **no pillow at all**, head resting directly on the pad, forearms folded under his head as a substitute. In `Print_5` (hood drawn around the face), the head again sits directly on the deck. **Across all 11 product images Sierra Designs never once depicts a pillow in this bag.** A brand that could show a pillow working would show it.

I searched Backpacking Light, Reddit, Trailspace, Rokslide and SD's own 26 on-site reviews for a **2019+ owner reporting a successful pillow-plus-head fit**. **None exists.** [UNVERIFIED — this is absence of evidence, not proof of impossibility. But the absence is total, and it runs the same direction as the designer's own statement.]

**Verdict: the hood is not a free capture device. Budget for an external capture mechanism on every candidate.**

### (c) Pad sleeve max width and max thickness

**Sierra Designs publishes NOTHING. This is a hard "cannot be known."** I read the complete current SPECS tab. The entire published spec set is:

> Regular — Temperature Rating 20F/-6.6C · ISO Limit 16F/-8.9C · ISO Comfort 28F/-2.2C · Fill Weight 20.6 oz/584 g · Weight 2 lb 6.4 oz/1.09 kg · Fits Up To 6'0"/183 cm · Length 80"/203 cm · Shoulder Circumference 61"/155 cm · Hip Circumference 60"/152.4 cm · Footbox Circumference 41"/104 cm · Stuff Sack 16" x 8.5"
> Long — … Fits Up To 6'6"/198 cm · Length 86"/218 cm · Shoulder Circumference 64"/163 cm · Hip Circumference 63"/160 cm · Footbox Circumference 43"/109 cm

**There is no pad sleeve width, no pad sleeve thickness, and no maximum-pad spec of any kind, for either size.** SD's FAQ page 404s. The only numbers that exist anywhere remain the two prior-work findings, both of which I re-confirmed at source: Glavin's *"The regular and women's bags fit 20" wide mattresses, and the long bag fits 25" mattresses,"* and Derek M.'s first-hand *"would not fit a pad wider than 20" (with a 2-2.5" thickness)."*

**I searched specifically for any report of a 3"+ thick pad in a Backcountry Bed sleeve and found ZERO primary reports.** The only adjacent datapoint in the BPL thread is a report that a thicker Exped prototype winter pad **would not fit**. [UNVERIFIED — no owner has ever published a successful 3"+ fit, and no owner has published a clean failure at exactly 3.25-4.25" either. This is genuinely unknown.]

**The geometry problem, stated as my inference and labeled as such:** a sleeve is a fixed-perimeter tube, so the real constraint is **cross-sectional circumference, not width**. Glavin's "20 inches" was measured on ~2-2.5"-thick pads of that era — roughly 2×(20+2.5) ≈ **45" of perimeter**. Jed's candidates:

| Pad | Width | Thickness | Approx. cross-section perimeter | vs. ~45" |
|---|---|---|---|---|
| Rapide SL Insulated 20" | 20" | 3.5" (outer chambers 4.25") | ~47" | +4% |
| Rapide SL Insulated 25" | 25" | 3.5" (outer 4.25") | ~57" | **+27%** |
| Zoom UL / Divide 20" | 20" | 3.25" | ~46.5" | +3% |
| Rapide SL 40" | 40" | 3.5" | ~87" | **+93%, hopeless** |

**Practical consequence — and this is trip-critical.** Jed must **measure before he buys anything**: inflate the pad to sleeping firmness, run a tape around the pad's cross-section at mid-torso, then run a tape around the BB 20's pad sleeve opening at its widest. If the pad will not enter the sleeve, **the bag's only anti-migration feature is gone**, and the pillow must then be captured **to the pad**, not to the bag — which makes The Pillow Strap (which straps pillow *and* pad together, rated to pads 30" wide × 5" thick) the structurally correct answer rather than a nice-to-have.

Second consequence: only the **Long** BB 20 was ever claimed to take a 25" pad, and even that claim is an unwitnessed 2015 forum statement about 2.5"-thick pads.

### (d) Does Therm-a-Rest's "nestles into the hood" claim work in a Backcountry Bed?

**No. It is generic mummy-bag copy and it does not transfer.** The claim is live — REI's current feature list for the Air Head Down repeats it verbatim: *"Precise shape nestles into the hood of your sleeping bag."* But:

- The claim's referent is a **mummy hood**: tapered, sewn dome, sized around a head, closed by a drawcord. The Backcountry Bed's head end is a shallow open arch on a comforter system with a perimeter stretch cord. Different object.
- SD's own product manager said they **deliberately declined** to size it for pillow+head.
- An owner tested this exact product class — a **large Exped Air Pillow** — in a Backcountry Bed and the hood then "would no longer cover my head." The Air Head Down **Large is 18 × 12.5 × 4 in**, a larger footprint than the pillow that already failed. [The large Exped Air Pillow's exact footprint is UNVERIFIED this session — treat the size comparison as directional.]
- Sea to Summit makes the same class of claim and is **explicit about the referent**, verbatim from its own storefront: *"Regular Size fits perfectly inside the hoods of technical sleeping bags."* Technical = mummy.

**Do not credit the Air Head Down with hood capture in this system.** Its genuine, independently-verified retention asset is the **nonslip micro-fleece base**, which works against the pad and bag fabric with no hood involved. That is the feature to buy it for. Note also its 4" loft is below Jed's 5-6" target, and Hong 2022 argues a thick soft inflatable pad *reduces* required loft — so 4" may be closer to right than the target suggests, but that must be tuned on the pad, not assumed.

---

## JOB 2 — LIVE STOCK AND LEAD TIME (checked 2026-07-27)

### The headline: the three "out of stock at brand" findings are now mostly STALE. Two of the three are back.

| Product | Brand direct | REI | Backcountry | Other |
|---|---|---|---|---|
| **TAR Air Head Down Reg** | ✅ **IN STOCK** $64.95 | ✅ InStock $64.95 | ✅ qty 19 or 12 | — |
| **TAR Air Head Down Large** | ✅ **IN STOCK** $75.95 | ✅ InStock $75.95 | ✅ qty 12 or 19 | — |
| **TAR Compressible Cinch S** | ✅ IN STOCK $34.95 | ✅ InStock $34.95 (Woodland/Desert; Outerspace preorder) | ✅ | — |
| **TAR Compressible Cinch Reg/M** | ✅ IN STOCK **$39.95** | ✅ InStock $39.95 | ✅ | — |
| **TAR Compressible Cinch Large** | ✅ IN STOCK **$49.95** | ✅ InStock $49.95 (all 3 colors) | ✅ stock levels 85/84/66/50/46/39/33/4/2 | — |
| **Exped Mega Pillow** | ❌ **STILL SOLD OUT** (Burgundy + Cypress, expedusa.com) | ✅ InStock $69.95 (Cypress only) | ⚠️ **qty 1** | Jenson USA, Bass Pro, Campman listed [UNVERIFIED] |
| **Exped Versaluxe** | ✅ IN STOCK $49.95 (all 3) | ✅ InStock $49.95 (all 3) | ✅ qty 2/3/4 | Used units $24.97 ×2 at Exped USA |
| **Zpacks Padded Pillowcase + bladder** | ✅ IN STOCK $59.95 all 4 colors (one variant shows **qty 108**) | — | — | Ships 1-3 business days |
| **Zenbivy SoftTop L + Overstuffed** | ✅ IN STOCK, **$99.00 exactly confirmed** | — | — | case L $19 + bladder L $30 + Overstuffed/L topper $50 |
| **S2S Foam Core Regular** | ✅ Aqua Sea, Bombay Brown $29.95 | ✅ InStock $29.95 (Starfish OOS) | ✅ | — |
| **S2S Foam Core Large** | ✅ Starfish, Bombay Brown $34.95 | ✅ **InStock all 3 colors** $34.95 | ✅ qty 2/8 | — |
| **S2S Aeros Premium Large** | ⚠️ Cabbage only $59.95 | ⚠️ Picante + Cabbage InStock $59.95 | ✅ **ON SALE $32.97-$38.97** (orig $59.95) | GGG: OOS in Large |
| **NEMO Fillo** | ❌ sold out (waitlist) | ✅ **InStock $49.95**, 3 of 4 colors | ✅ qty 58/66/72 | — |
| **NEMO Fillo Elite** | — | ✅ InStock $59.95 | ✅ | GGG ✅ $59.95 |
| **Trekology Aluft 2.0** | ✅ IN STOCK $19.99, all 5 colors | — | — | — |
| **Trekology Aluft Pro** | ✅ IN STOCK $23.99, Blue + Gray | — | — | — |
| **Feathered Friends Geoduck** | ✅ IN STOCK $45.00 | — | — | Ships Seattle, UPS Ground |
| **Pillow Strap Medium** | ✅ IN STOCK all colors, $42 solid / $45 pattern | — | — | GGG ✅ $42 (4 solids only) |
| **Pillow Strap Large** | ✅ IN STOCK $45 solid / $48 pattern (**Chroma Currents Large OOS**) | — | — | ❌ **not carried at GGG — direct only** |

### Corrections to the settled corpus (each one costs money or a trip if left uncorrected)

1. **Therm-a-Rest Air Head Down is NOT out of stock.** thermarest.com returns `available: true` for both Regular and Large right now. Three independent stockists confirm.
2. **Therm-a-Rest Compressible Cinch is NOT out of stock** — all 3 sizes × all 3 colors `available: true` at Cascade Designs.
3. **Compressible Cinch pricing was wrong in the corpus.** It is not "$34.95 MSRP." Brand-direct is tiered: **Small $34.95 / Regular $39.95 / Large $49.95.** The $34.95 figure is the *from* price on the smallest size. The one-pound Large costs $49.95. (Note the size naming trap: Therm-a-Rest calls the middle size **"Regular"**; REI relabels it **"M"**. Same pillow.)
4. **NEMO Fillo is buyable today** despite the NEMO waitlist — REI has it at $49.95, Backcountry has ~200 units. The "SOLD OUT" finding was brand-only and is not a disqualification.
5. **REI has a data error on the Air Head Down: the weights are swapped.** REI's spec block and JSON-LD both read *"Regular: 7.3 ounces – Large: 4.9 ounces."* The brand says Regular 4.9 / Large 7.3. Do not weigh-shop from REI's page.
6. **The Sea to Summit PillowLock finding in the corpus is WRONG, and the truth is worse.** The corpus said the "adheres to most camping mats" line *"could not be found on ANY S2S property — treat as unsourced."* It is on S2S's own US storefront **right now**, on at least two product pages. Verbatim from the Aeros Premium page: *"Keeps your pillow in place all night with included 3M™ PillowLock patches that adhere to most camping mats"* and *"PillowLock patches secure the pillow firmly in place on your mat."* Identical line on the Aeros Ultralight page. **Sea to Summit therefore contradicts itself across its own web properties** — the PillowLock product page says *"only approved for Sea to Summit sleeping mats and we do not recommend placing the stickers on other brands of sleeping mats,"* while the pillow pages say "most camping mats." For a buyer who distrusts marketing copy, this is the finding: S2S's retention claim is unreliable *because S2S cannot keep its own story straight*, not because the claim is unsourced. Treat PillowLock as dead on Big Agnes either way — the restrictive statement is the one with liability behind it.
7. **Zenbivy silently redesigned the SoftTop pillow system.** The current pillowcase now advertises a *"patent-pending catenary cut-out"*; the previous version is being liquidated on the same site as **"SoftTop™ Pillowcase (2025 Model)" $8.45**, bladder $12.35, topper $26.00. The **$99.00 total for Large + Overstuffed is confirmed exactly** ($19 + $30 + $50). But the corpus's component weights (1.1 oz case) and the two independent 9.1 oz / 9.45 oz scale readings were taken on the **superseded** case. [UNVERIFIED — the new catenary case's weight is not published; the ~20% overage finding may or may not carry forward.] Native clips still require a Zenbivy Sheet — confirmed verbatim: *"Built-in headboard clips attach to your Zenbivy Sheet."* Useless with a Backcountry Bed, as previously found.
8. **The Zpacks Padded Pillowcase has a built-in retention mechanism the corpus missed.** Zpacks verbatim: *"Elastic straps on the back allow you to boost the height of your pillow with your sit pad, or any stuff sack or dry bag, and a shock cord strap secures the pillow to your sleeping pad to help prevent it from sliding."* That is **both** a pad-attachment strap **and** a documented loft-boost path — directly relevant to a 5-6" loft target that no standalone pillow hits. ⚠️ **Needs one confirmation before relying on it:** Zpacks also sells a "Pillow Attachment Cord" separately at $5.95, so it is ambiguous whether the shock cord strap ships with the pillowcase or is that accessory. Call or email Zpacks before ordering. At $59.95 with the bladder, 3.8 oz, in stock, ships 1-3 business days, this is the strongest cost/weight/retention package in the entire field **if the cord is included**.
9. **Moosejaw no longer exists as an independent stockist.** moosejaw.com now 301-redirects to `publiclands.com?segment=mjtopl`. Remove it from the shopping list.
10. **CampSaver could not be checked.** [UNVERIFIED] — bot-blocked on every path attempted (11 KB stub response, and `/catalogsearch/result/` returns 404 under Playwright). No CampSaver stock statement should be made.
11. **Backcountry has a live Summer Sale on the S2S Aeros Premium: $32.97-$38.97, down from $59.95** (up to 40% off). Aeros Ultralight $32.47 (35% off). This is the only meaningful discount in the field and it is on the quietest air pillow ever measured. Note Backcountry's Aeros Premium stock is thin (variant levels 1 / 10 / 17 / 1).
12. **New lead worth chasing that nobody has looked at:** Backcountry carries a **Big Agnes "Rapide SL Pillow"** (qty 7). Jed's pad is a Big Agnes Rapide SL. A same-family pillow is the single most likely place to find a native retention interface with his actual pad. [UNVERIFIED — I did not investigate its specs, loft, weight, price, or whether it actually integrates.]

### Lead times — verbatim where obtained

- **The Pillow Strap** (pillowstrap.com/policies/shipping-policy), verbatim: *"Orders will typically ship within one business day of placing the order unless otherwise noted. Delivery is typically within 4-8 business days after shipping the order but is dependent on the carriers and outside our control."* → **worst case 9 business days.** USPS, $6 US shipping.
- **Zenbivy** (zenbivy.com/policies/shipping-policy), verbatim: *"US Ground orders are processed and shipped in 2-5 business days and typically arrive within 5-8 business days from the date of purchase. 2-Day Air orders arrive in 2-3 business days… We ship Monday through Friday."* → **worst case 8 business days ground.**
- **Zpacks**, verbatim on the product page: *"Lead Time: Ships in 1-3 Business Days."* Transit not stated. [Transit UNVERIFIED.]
- **Feathered Friends**: ships from Seattle, UPS Ground standard; *"Express Shipping — Two to three business days to reach most destinations in the continental United States."* The Geoduck is a stocked accessory, not made-to-order. [Processing time for accessories UNVERIFIED.]
- **REI / Backcountry / Exped USA / Therm-a-Rest / Sea to Summit / Trekology**: standard transit windows **[UNVERIFIED]** — I did not read their shipping policy pages this session and will not guess.

### ⭐ The lead-time fact that removes almost all risk

REI's site geolocated this session to the **Salt Lake City** store and offered **"Pick up at Salt Lake City"** on the Air Head Down. If Jed is anywhere near SLC — plausible for a Sawtooth trip — **REI in-store pickup eliminates shipping risk entirely** for: Air Head Down (both sizes), Compressible Cinch (all sizes), Exped Mega, Exped Versaluxe, S2S Foam Core (R/L/XL), S2S Aeros Premium, NEMO Fillo, NEMO Fillo Elite. ⚠️ Web inventory ≠ store inventory — he must select the store on the page to confirm per-SKU. [UNVERIFIED at store level.]

### ORDER-BY DATE

Today is **Monday, July 27, 2026**. Assuming a mid-August departure with **gear in hand by Friday, August 14** (15 business days available), and a recommended 3-business-day buffer for a shakedown night (in hand by **Tuesday, August 11**):

| Vendor | Worst-case | Order by for Aug 14 | Order by for Aug 11 (buffered) |
|---|---|---|---|
| **The Pillow Strap (Large — direct only)** | 9 business days | **Mon Aug 3** | **Wed Jul 29** |
| Zenbivy SoftTop | 8 business days ground | Tue Aug 4 | Thu Jul 30 |
| Zpacks | 1-3 bd + transit | ~Tue Aug 4 | ~Thu Jul 30 |
| REI / Backcountry ship-to-home | [UNVERIFIED] | assume Aug 4 | assume Jul 30 |
| REI in-store pickup | ~1 day | Aug 12 | Aug 10 |

## 🗓️ **ORDER BY FRIDAY, JULY 31, 2026 — hard last call Monday, August 3.**

The binding constraint is **The Pillow Strap in Large**, because **Large is direct-from-maker only** (Garage Grown Gear stocks Small and Medium only — re-confirmed today) and it is the slowest shipper in the field at up to 9 business days. Given that Job 1 concludes the hood provides **no capture**, and that the pad may not even fit the bag's sleeve, the Pillow Strap is not optional garnish — it is the retention system. **It is also the item most likely to miss the trip.** Order it first, order it this week, and order the **Large** ($45 solid / $48 pattern; Chroma Currents Large is out — pick another colorway). If his pad's circumference exceeds 70", add the Elastic Extension Strap ($9 / $10 / $11 for 12" / 24" / 36" — all in stock).

Nothing else in the field is disqualified on availability. **The only true availability casualty is the Exped Mega Pillow**, and only at the brand — it is one unit deep at Backcountry and single-colorway at REI, so it is one shopper away from being gone. If it is wanted, it must be bought today, not on July 31.

==============================================================================
# ADVERSARIAL-LOAD
==============================================================================

I have what I need. Final calculations and verification are complete.

---

# ADVERSARIAL LENS 1: LOAD MECHANICS — KILL REPORT

## 0. Three corpus corrections I owe you before the verdicts

**(a) The corpus's core mechanism claim is wrong as written.** The corpus says: *"head weight nearly irrelevant, inflation is the variable."* Half right. For a limp membrane, contact pressure ≈ internal gauge pressure, so the pillow does not *collapse* — it **recruits contact area**: `A = W / P_gauge`. Head weight is therefore not irrelevant; it sets the **area demand**. It is irrelevant only for a pillow of unlimited plan area. Every finalist is 170–261 in². On a pillow that small, head weight is the governing variable. This reframes the entire ranking (§1).

**(b) A defect claim in the corpus does not survive checking.** The corpus attributes to CleverHiker that the Air Head Down's bladder *"is on the thinner end and has been plagued by reports of punctures and premature leaks."* I read CleverHiker's dedicated Air Head Down review and their camping-pillow roundup. **Neither contains it.** Their only stated criticism is: *"Our only nitpick was its twist valve."* **[UNVERIFIED — could not reproduce at source. Do not publish this as a finding.]**

**(c) Search-engine summaries fabricated two sources I checked.** Both would have changed conclusions had I trusted them:
- Search claimed Sea to Summit's *"My sleeping mat seems to lose air overnight"* support article explains temperature-driven pressure loss. **It does not.** I read the full article in a browser. It is 100% punctures and valve leaks — submersion test, soap test, 3M patches, petroleum jelly on the valve. The word *temperature* never appears. 
- Search claimed Nomad Labs ran a **5 lb compression test** with *"3.2" sustained loft for 8+ hours."* That article **contains no compression testing at all.** 

→ **The corpus's claim that no published loft-under-load measurement exists for any camping pillow is CONFIRMED by direct check.** Every "loft" number in this entire market is unloaded loft.

**(d) Two OGL scores in the corpus are attached to the wrong size.** OGL's Compressible Cinch test unit measured **15.5 × 9.5 × 6.75 in / 8.6 oz** — that is the **Small**, not the Regular. OGL's Aeros Premium test unit measured **14 × 8 in / 3.1 oz** — that is the **Regular**, not the Large. Their Support 6.0 and "slips out from under us" findings are small-size findings.

---

## 1. THE GOVERNING MECHANIC: plan area, not loft

Required contact patch `A = W / P_gauge`. Using 15 lbf as the head fraction actually bearing on the pillow **[INFERENCE — see §6]**:

| Pillow | Plan area (in²) | Claimed loft | Patch @0.25 psi as % of plan |
|---|---|---|---|
| **Exped Mega 2025** | **261** | 4.7" | 23% |
| Compressible Cinch Reg *(foam)* | 234 | 6.0" | 26% |
| Air Head Down **Large** | 225 | 4.0" | 27% |
| Exped Versaluxe | 209 | 6.0" | 29% |
| Trekology Aluft Pro | 209 | 4.3" | 29% |
| S2S Foam Core Large *(foam)* | 204 | 5.0" | 29% |
| Trekology Aluft 2.0 | 204 | 4.0" | 29% |
| Zenbivy SoftTop Large | 189 | 7.0" "max" | 32% |
| NEMO Fillo | 187 | 4.0" | 32% |
| S2S Aeros Premium Large | 182 | 5.1" | 33% |
| Air Head Down **Regular** | 170 | 4.0" | 35% |

**This ranking is robust to the head-weight assumption.** `A = W/P` scales every pillow identically, so changing W from 15 to 24 lbf moves all absolute areas by ×1.6 and changes the order **not at all**. Only the margin depends on W, never the ranking. That is the strongest statement in this report.

---

## 2. Q1 — 4" of air vs 5" of foam. Which is taller at 3 a.m.?

**Air wins the head-to-head. The Air Head Down still dies — on area, not on loft.**

Mechanics: a sealed gas cannot be compressed to zero at these loads. As the head sinks, volume falls, pressure rises, and the system finds equilibrium. There is always residual height. Foam has no such restoring term — it has a **densification floor**. Flexible open-cell PU turns near-vertical on its stress-strain curve at ~70–80% strain, so 5" of foam bottoms to ~1.0–1.5" residual **[INFERENCE from general flexible-PU behavior; neither maker publishes a curve]**.

But chopped foam never even reaches densification — it fails earlier by **granular rearrangement**. OGL, verbatim: *"The foam fragments tend to displace and separate inside the pillow while in use, and compress under weight."* The fill packs and migrates before it densifies.

So: **4" of topped-up air beats 5" of foam at 3 a.m.** That is an argument for a *bigger air pillow*, not for this one. The Exped Mega beats the Air Head Down Large on **both** axes at once — 261 vs 225 in² and 4.7 vs 4.0".

**Kill on the Air Head Down's 4":** CleverHiker, verbatim — *"This pillow is 4 inches thick, which we've found to be the minimum thickness needed for side sleepers to keep their heads and necks aligned."* Four inches is the published **floor for a median side sleeper**, against his stated 5–6" target. He is at the extreme of the size distribution, not the median. Minimum-spec for the median is under-spec for him. Corroborated by OGL **Support 7.0/10**.

Partial defense, stated honestly: Hong 2022 says a softer surface *reduces* the pillow loft required, and his pad is a soft 3.25–4.25" inflatable. That legitimately pulls his 5–6" target down — **by an unquantified amount**. No study quantifies the offset. It does not rescue 4.0" to a defensible number; it only makes the failure less certain.

---

## 3. Q2 — Down migration

**Feathered Friends Geoduck — DISQUALIFIED. Unbaffled *is* disqualifying here.**

Two independent Trailspace owner reviews, retrieved verbatim:

> **David Link** (TOP 25 REVIEWER, 2016-03-12), Cons: *"No real head support"* — *"because it is so packable, the down fill compresses down as soon as you lay your head on it. So there is really no head support. I end up piling stuff underneath it at night, just so I don't have a sore neck in the morning."*

> **Glen Nordt** (2020-04-11): *"the inner part protrudes almost immediately like toothpaste coming out of the tube, which flattens the pillow. Moreover, the fabric was so slippery the pillow kept sliding out from under my head on my sleeping pad."* His fix was to encase it in a compression sack so the bag *"acted as 'borders' the pillow could not expand beyond."* — *"Five stars if using the 'fix' or something similar, 3 stars without."*

Two reviewers is a small n **[flagged]** — but they independently report the *same* failure, and it is exactly the failure predicted by unbaffled construction: down is load-bearing with no lateral restraint, so it extrudes out from under the load. Nordt's fix is a confession — he had to supply external hoop restraint that the product should have had as baffles. **Under a 20–24 lb head this is worse, not better. Dead.**

**Therm-a-Rest Air Head Down — SURVIVES this attack.** Therm-a-Rest's own page, verbatim: *"an inflatable, baffled core, providing a stable, compressible foundation"* and *"Four-inch (10 cm) thick, baffled air chamber for stability, loft and custom support."* **The air chamber is baffled and it is the load-bearing element.** The down sits in a cover *above* the load path. Down migration here costs face-feel, not support. Therm-a-Rest does **not** state whether the down cover itself is baffled or sewn-through **[UNVERIFIED]** — but it doesn't matter mechanically. It dies on §2, not here.

**Zenbivy — SURVIVES this attack, same reason.** The bladder carries load; the down topper is above it. Zenbivy states 650+ FP duck down in 15D nylon taffeta but publishes **no baffle or sewn-through detail** **[UNVERIFIED]**. Dies on §5.

---

## 4. Q3 — The cold-air problem. **The premise is half right, and I am killing the alarmist version.**

I computed both physical bounds (Sawtooth camp elevation ~8,000 ft, P_atm 75.3 kPa; 60°F→35°F; starting gauge 5 kPa ≈ 0.72 psi):

| Branch | Physical condition | Result |
|---|---|---|
| **A — constant volume** (taut, volume-limited envelope) | fabric fully tensioned | gauge **5.00 → 0.14 kPa — 97% of inflation pressure gone** |
| **B — constant pressure** (slack, compliant envelope) | fabric not tensioned | volume −4.8%; if *all* of it comes out of thickness, **4.00" → 3.81"** (lose 0.19") |

Reality sits between, set by envelope compliance. **A camping pillow inflated to comfort is nowhere near taut** — you can squish it, so it has large `dV/dP` and sits much closer to Branch B. The catastrophic number is the one you get by naively applying Gay-Lussac to a compliant membrane, and it is wrong.

**The genuinely new finding — nobody in the corpus or in any source I read discusses this: condensation.** These pillows are inflated with **saturated exhaled breath**. As the gas cools, water vapor condenses out and its partial pressure is permanently removed. On the 60→35°F drop that is **1.08 kPa, contributing 22% of the total constant-volume pressure loss** (Gay-Lussac supplies the other 78%). In the pathological case of inflating with 95°F breath and cooling to 35°F, condensation supplies **38%** of a 13.0 kPa loss. Unlike thermal contraction, **condensation is not recovered when the tent warms at dawn** — the water is liquid in the bladder.

**Field reports:** I found practitioner consensus on **pads**, not pillows. Backpacking Light, verbatim — *James Marco*: *"You can avoid that by inflating twice. Once when you set up camp. After it cools down blow it up again with a couple breaths of air."* *Max Dilthey*: *"Cold air compresses, warm air expands. Very basic physics. Don't worry about it."* Therm-a-Rest's own guidance is the same: inflate firmly the first time because it will lose pressure as it cools.

**I found zero field reports attributing overnight *pillow* pressure loss to temperature.** That asymmetry is mechanically expected: a pillow holds ~1/20 the gas mass of a pad with a far higher surface-to-volume ratio, so it equilibrates to tent air within minutes of inflation. By the time he lies down at 10 p.m. the gas is already at tent temperature, so the operative drop is 10 p.m.→dawn, not inflation→dawn.

**VERDICT: No. Gay-Lussac alone does not defeat the "air holds its loft" thesis.** It defeats *"set it and forget it."* It is real, it is second-order, it is worth roughly 0.2" of loft plus a noticeable softening, and it is corrected by two breaths — which requires waking up. **It does not disqualify any air pillow.** It does hand the S2S Foam Core its one genuine structural advantage: **no valve, no gas, no thermal term, zero pressure loss by any mechanism.**

---

## 5. Q4 — Foam ILD/IFD: **UNKNOWABLE, and the S2S provenance is worse than unknown**

**Neither maker publishes ILD, IFD, density, or a stress-strain curve. Say so plainly — this cannot be known from published sources.**

But S2S's own product page volunteers something more damaging than a missing number, verbatim: **"Foam fill upcycled from our self-inflating sleeping mat production reduces waste."** Self-inflating-mat foam is specified for **self-expansion, packability and R-value** — deliberately low-density, high-void, low-ILD. It is not a support foam. It is production scrap, so density and ILD are **uncontrolled batch to batch** **[INFERENCE from the stated provenance — S2S publishes no numbers]**. Full materials listing: *"Pillowcase top: 100% Polyester; Pillowcase base: 100% Nylon; Filling: Polyurethane Foam"*, plus *"a layer of recycled Revive Loft insulation."*

**The single most important unknown in this product:** whether that foam is a **continuous slab** or **shredded offcuts**. Continuous → it has a real ILD and cannot migrate. Shredded → it behaves exactly like the Compressible Cinch. **S2S does not say.** The product name ("Foam **Core**") and the total absence of lumping complaints across 43 REI reviews at 4.8 stars imply continuous **[INFERENCE]** — but that is inference, not disclosure.

**Chopped foam has no ILD at all.** ILD is defined (ASTM D3574) for a continuous slab under a 50 in² indentor at 25% deflection. A bag of loose fragments is a **granular medium**, not a foam slab — it shear-packs and migrates. **The Compressible Cinch's cinch cord is an engineering admission that the fill cannot support itself**; the cord supplies confining pressure the fill lacks.

---

## 6. Q5 — The stacked system: does the topper slide off the dome?

**No — and the attack as posed fails.** Zenbivy's own owner's manual settles the architecture, verbatim:

> *"Insert the pillow topper (or your folded down jacket) into the empty pillowcase through the opening at the back."*
> *"Layer the deflated bladder in the pillowcase on top of the pillow topper, with the valve near the opening of the pillowcase."*
> *"Once you've found the sweet spot of height & support, snap the valve back in and flip the pillow stack over—the soft pillow topper is what you'll be sleeping on!"*

All three components live **inside one pillowcase**. The topper cannot slide off a dome because it is never on an exposed dome.

**Three real defects survive:**

1. **Nothing bonds topper to bladder inside the case.** Under a flipping side sleeper the down layer can shear laterally and bunch at one end, leaving bare bladder under the ear. **[INFERENCE — no source measures this; Zenbivy's manual is silent.]**

2. **Stacking a compressible layer over a pressurized bladder does not add its free thickness.** The topper is the softest element in the stack, so it compresses **first and nearly completely**. Zenbivy's **7" is uncompressed stack height**; under 15 lbf the down contributes near-zero. Functional loft = the bladder's loft. **Zenbivy's 7" is the least trustworthy loft number in the finalist set.** The stack buys face-feel and warmth, not height.

3. Zenbivy's inflation guidance is *"a few breaths—nothing crazy"* — i.e. a **low-pressure** bladder, which per §1 means a **large** contact patch. Combined with the narrowest footprint in the set, that is the wrong pairing.

**Zenbivy is also 10.5" wide — the narrowest finalist.** For a man who flips sides all night, lateral room to land on is the whole game. And its headboard clips require a **Zenbivy sheet**; with a Backcountry Bed they are dead weight.

---

## 7. KILL LIST

**DISQUALIFIED ON LOAD MECHANICS**
1. **Feathered Friends Geoduck** — unbaffled load-bearing down; two independent owner reports of total collapse under a *normal* head. Dead.
2. **Therm-a-Rest Compressible Cinch** — OGL verbatim: *"it can compress and lose loft depending on your size and weight."* That is OGL conditioning failure explicitly on user mass. Also *"doesn't have enough oomph, and tends to flatten out during the night"*; *"sits a little flat, so side-sleepers may need to improvise ways to elevate their heads."* Granular fill, no ILD, cinch cord as confession. **Self-executing disqualification for a 250–300 lb buyer.**
3. **S2S Aeros Premium Large** — 182 in², second-smallest. OGL: *"prone to slipping out from under our heads due to its size and lack of weight"* and *"doesn't provide a dynamic support that ebbs and flows as you move about during the night"* — precisely wrong for a flipper.
4. **NEMO Fillo** — 187 in², 4.0", zero attachment, sold out. Nothing to defend.
5. **Air Head Down Regular** — 170 in². Smallest plan area in the set. Dead on area alone.
6. **Trekology Aluft 2.0** — 4.0" loft, 204 in². Its strap is a *retention* virtue, not a load one.

**SURVIVES, DAMAGED**
7. **Air Head Down Large** — survives the down attack (baffled air core carries load), fails the loft target: 4.0" is the published *minimum* for a *median* side sleeper.
8. **Zenbivy SoftTop Large Overstuffed** — 10.5" wide is the worst geometry here; 7" is an uncompressed stack number; clips useless without a Zenbivy sheet.
9. **S2S Foam Core Large** — foam is SI-mat production scrap with undisclosed ILD and undisclosed slab-vs-shredded construction. **But it is the only finalist with zero pressure-loss mechanism of any kind** — no valve, no gas, no thermal term, no leak path.

**CANNOT ASSESS — I abstain rather than guess**
10. **Exped Versaluxe** — 19 × 11 × 6" (209 in²), cord included. Exped will not disclose the fill between the 75D cover and the TPU core, and **zero reviews exist anywhere**. Unassessable, not killed.
11. **Zpacks Padded Pillowcase + Inflatable** — product page 404'd; **could not retrieve dimensions, so plan area is unknown**. Unassessable.
12. **Trekology Aluft Pro** — 209 in², weight verified. Survives on area; nothing distinguishes it.

**I COULD NOT KILL THIS ONE**
13. **Exped Mega 2025** — **largest plan area of any finalist (261 in², +16% over Air Head Down Large)** and tallest true air loft (4.7"). CleverHiker, verbatim: *"Fully inflated, it provides a ton of support, and its steep sidewalls cradled our heads and necks in ergonomic positions"* and *"The Mega pillow agreed with our side-sleeping gear analyst, who needs extra support."* Steep sidewalls are the right geometry for a flipper — they resist the roll-off that killed the Aeros. **Its real sins — 9.0 oz, ships no cord despite having tether eyelets, out of stock — are procurement and retention sins, not load sins.** On load mechanics alone it is the last one standing.

---

## 8. The Sierra Designs conflict — SETTLED (outside my lens; one line as instructed)

**The RETENTION AGENT is right about the current bag; the ANCHOR AGENT is right about a different bag.** Sierra Designs' current Backcountry Bed 20 feature bullet reads *"The cinchable hood & stretch cord closure helps trap warmth on colder nights."* Glavin's 2015 Backpacking Light quote, owner Derek M., and OGL's BB700 note all describe the **2014–2019 BB 600/700**, a different generation. Both agents were correct about different products.

**But this does not change the retention conclusion.** *Cinchable* ≠ *will retain a pillow*. SD makes **no pillow-retention claim anywhere**, and no source shows a pillow held by that hood. The hood cinches around a **head**, not around a pillow.

---

## 9. Standing unknowns — say "cannot be known," don't guess

- **No loft-under-load measurement exists for any camping pillow, from any outlet.** Verified directly; two purported counterexamples were fabricated by search summarization. Every loft figure in this market is unloaded.
- **No maker publishes ILD/IFD/density** for any foam here.
- **S2S Foam Core: slab or shredded — undisclosed.** Highest-value single unknown in the set.
- **Zenbivy topper: baffled or sewn-through — undisclosed.**
- **Air Head Down: down-cover baffling — undisclosed** (mechanically moot; the air core is baffled and carries load).
- **Exped Versaluxe fill — undisclosed, zero reviews.**
- **Zpacks padded pillowcase dimensions — could not retrieve (404).**
- **Internal gauge pressure of an inflated camp pillow is unpublished by anyone.** My 2–5 kPa working range is **[INFERENCE]**. Everything in §1 and §4 is bracketed accordingly — but note again that the §1 *ranking* is invariant to it.
- **Head load actually borne by the pillow: 15 lbf is [INFERENCE].** Head-alone mass is ~6.8–8.2% of body mass (Clauser/Dempster), giving 17–24.6 lb for 250–300 lb — but in side-lying an unquantified fraction is carried by the cervical spine and shoulder, not the pillow. I found no published head-pillow interface force measurement. **The corpus's "20-24 lb head" is the upper bound on head mass, not on pillow load.**

**Calculation script:** `/private/tmp/claude-502/-Users-jed-jedstuff-high-adventure/aa7d2847-1b6b-41c2-ae03-7235f483b56e/scratchpad/calc.py`

==============================================================================
# ADVERSARIAL-RETENTION
==============================================================================

## ADVERSARIAL LENS 2 — RETENTION. FINDINGS.

---

# 0. THE UNRESOLVED CONFLICT: SETTLED

**Verdict: the ANCHOR agent is right on mechanism. The RETENTION agent quoted marketing prose. Both missed the operative fact.**

**There is no head-cinching hood.**
- Current SD Backcountry Bed 20 page: the phrase **"cinchable hood" appears exactly once, in marketing prose** ("With plenty of options to control your temperature — like the self-sealing foot vent, insulated shoulder pockets and cinchable hood…"). The **enumerated Features list has six bullets and none is a hood.** The only cord in the feature list is *"Stretch cord closure system helps to seal out drafts."* The Specs table has no hood entry. (https://sierradesigns.com/backcountry-bed-20/)
- OGL, BB700, pub. 2019-05-07: *"the bag lacks a way to cinch the hood around your head."* And on that same stretch cord: it *"help[s] keep the bag's comforter flap in place"* but is *"too long to let you pull the thicker insulation on the sides of the bag together."* **The "cinch" is a comforter closure, not a hood drawcord.**
- SectionHiker (Philip Werner), verbatim: *"The Backcountry Bed does not have a full mummy hood although it is possible to tuck your head inside for warmth."* And: *"Side drafts are blocked by down-filled tubes that extend up the sides of the bag and **form a small hood area above your head**."*
- SD's own PM Michael Glavin (BPL 94210, 2015-01-06): *"If we made it so it fit pillows and your head inside it is too floppy in the cases that you don't want your head"* — and, decisively for this buyer: ***"I am a pillow guy too, but also a stomach sleeper mostly, so it is not an issue. But for back/side sleepers, it can be."*** Sierra Designs' own product manager says the hood/pillow problem **is** an issue for side sleepers. Jed is a side sleeper.
- Derek M. (BPL 94210, 2014-10-25): *"the 'hood' lip was useless when I put my size large Exped Air Pillow inside. It would no longer cover my head."*

**But here is what both agents missed — and it is the single best retention fact in this entire corpus.** SectionHiker, first-hand, verbatim:

> *"I've found it more convenient to simply wear a fleece hat at night or a balaclava in colder weather and **use the hood area to hold a pillow in place, which works rather nicely**."*

The hood area is a three-sided down-tube bolster. It cannot hold a head **and** a pillow — that is Derek M.'s complaint and Glavin's design explanation. **So give it the pillow and wear a hat.** That is a $0, zero-weight capture corral Jed already owns.

**Two misattributions to strike:** the sentence *"keeps your bed in place all night, no matter how much you move"* **does not appear on sierradesigns.com's Backcountry Bed 20 page.** The actual bullet is *"Sleeping pad sleeve keeps pad under you for comfort and warmth, and replaces unnecessary bottom insulation."* The "no matter how much you move" phrasing is third-party retailer copy. Do not attribute it to SD.

[UNVERIFIED] Werner reviewed the Backcountry Bed 800 (~2014). The current BB 20's six feature bullets are architecturally identical, but I could not verify the hood-area geometry is unchanged.

---

# 1. THE CENTRAL ATTACK ON THE FRONT-RUNNER (Air Head Down)

### 1a. The substrate is nylon, not polyester — and Big Agnes publishes no denier
Verified verbatim at both Big Agnes and REI: Rapide SL top is **"Durable, superlight double ripstop nylon"** with **"aviation-grade TPU lamination"**, and **"Quilted top provides a cushioned, pillowy sleeping surface."** Zoom UL: *"postconsumer recycled ripstop nylon."* Confirmed rectangular; thickness 4.25 in; widths 20/25/40.

Two consequences: (i) micro-fleece is gripping a **TPU-laminated** ripstop — a laminated film offers almost nothing for a fleece nap to engage; (ii) the top is **quilted/I-beam**, so real contact is only the **crowns of the chambers**, not the pillow's full footprint. **[UNVERIFIED — no coefficient of friction has ever been published for any pillow base against any pad face fabric, by any outlet. This cannot be known from the record.]**

### 1b. OGL published no test surface and no tester weight — I checked directly
I put the question to OGL's Air Head Down review. Answer: **"No specific sleeping pad or sleeping bag model is mentioned in the review"** and **"No tester body size or weight information is provided."** The single verified nonslip endorsement in the entire corpus is untethered from any named substrate and any body mass.

### 1c. The REI reviews are not independent
All 8 REI reviews of the Air Head Down are stamped **"Review originally posted on a Cascade Designs brand site"** — syndicated brand-hosted reviews. **Zero of the 8 mention slipping, sliding, or staying in place.** REI's 4.6★ is not independent corroboration of anything, least of all retention.

### 1d. Therm-a-Rest's *second* retention mechanism is void for him
REI feature list, verbatim: **"Precise shape nestles into the hood of your sleeping bag."** He has no mummy hood. Dead.

### 1e. Does friction scale with head weight? **Neither. It cancels.** Reason it through:

**Mode (a) — LOADED SLIP** (head on pillow, pillow creeps out). The pillow slides when μ_top·N > μ_bottom·N. **N — head weight — cancels.** Head mass is *irrelevant* to this mode; only the **ratio** μ_top/μ_bottom matters. The Air Head Down is engineered exactly right: silky brushed-polyester/down top (low μ vs hair/face) over grabby micro-fleece bottom (high μ vs pad). **I concede this. It is real and it is weight-independent.** OGL's tester being light does not invalidate it.

> Corollary that kills a competitor: the **Zpacks Padded Pillowcase** is 2.35 oz/sqyd **Octa fleece on top** and **0.51 oz/sqyd Ventum ripstop nylon on the bottom** — the ratio is *inverted*, the worst possible configuration (grips your face, slides on the pad). Zpacks knows it: the case ships with a shock cord strap.

**Mode (b) — UNLOADED DISPLACEMENT** (the flip). The head lifts off. **N → 0, so friction → 0 regardless of μ.** In that window the pillow is moved by whatever touches it — shoulder, forearm, the comforter dragging across it. **Friction has literally zero authority here.** A 250–300 lb man rolling shoulder-over presents larger limb masses and a longer unloaded window than a 150 lb tester. **Friction cannot address mode (b). Only capture can.** Jed's stated failure mode *is* the flip.

**Mode (c) — THE SUBSTRATE PROBLEM (original, and the strongest attack).** Friction retention requires the gripped surface to be **anchored**. In a Backcountry Bed the pillow does not rest on the pad — it rests on the bag's **20d polyester taffeta liner / 20d polyester ripstop shell**, which floats over the pad. A perfect grip on a floating layer buys nothing. And the only thing anchoring bag to pad — the pad sleeve — sits under the **shoulders**, not the head (retailer Q&A: *"the pad sleeve only holds the upper half of the pad"*), is **optional**, and probably **doesn't fit his pad at all** (§2).

**Air Head Down verdict: survives on physics, disqualified as a standalone.** No attachment point of any kind. 4" loft — CleverHiker: *"4 inches thick, which we've found to be the minimum thickness needed for side sleepers"* — a floor, below his 5–6" target. **Must be paired with capture.**

**STOCK RESOLVED:** **IN STOCK at REI right now**, both sizes, $64.95 Regular / $75.95 Large, *"11 people purchased this week."*
**REI DATA ERROR:** REI's spec table has the weights **swapped** (Regular 7.3 oz / Large 4.9 oz). Trust the brand: Regular 4.9, Large 7.3.

---

# 2. THE PILLOW STRAP + PAD SLEEVE COLLISION — computed, and it is **not** a circumference problem

### The maker's own arithmetic convention (verified from the FAQ)
> Small & Medium: *"pads up to 25" wide and 4" thick (**58" total circumference**)"*
> Large: *"pads up to 30" wide and 5" thick (**70" total circumference**)"*

2×(25+4)=58 ✓ and 2×(30+5)=70 ✓ — **circumference = 2 × (width + thickness).**

**⚠ CORRECTION TO THE FACTS BLOCK: "Pads up to 30" wide x 5" thick" is the LARGE-only spec, wrongly generalized. Small/Medium cap at 25" × 4" / 58".**

### The computation

| Pad | Circumference | S/M (58") | Large (70") |
|---|---|---|---|
| Rapide SL **20" × 4.25"** | **48.50"** | ✅ 9.5" margin | ✅ |
| Rapide SL **25" × 4.25"** | **58.50"** | ❌ **fails by 0.50"** | ✅ |
| Rapide SL **40" × 4.25"** | **88.50"** | ❌ | ❌ (also busts the 12" extension's 82") |

**Adding the sleeve fabric changes nothing.** Two layers of 20d polyester add <0.02" of true perimeter; gathered slack adds maybe +1 to +3" [UNVERIFIED, estimated]. Even at +3", the 20" pad is ~51.5" (inside 58") and the 25" pad is ~61.5" (still outside 58", still inside 70"). **The Extension Strap is NOT mandatory on geometry alone for a 20" pad.**

### The real collision is a **size-class conflict**, not a circumference conflict
For a **25" Rapide SL**: Medium fails by half an inch. Large clears the pad — **but Large fits pillows 19–24" wide, and the Air Head Down Large is 18" wide.** Too narrow for the Large case. **Resolution: Medium case + the 12" Extension Strap** (adds up to 24" stretched, *"total maximum diameter of 82 inches"*). $42 + $9 + $6 shipping = **$57**.
For a **20" Rapide SL**: **Medium alone**, no extension. $42 direct (or **$39 at kulacloth.com**) + shipping.

### ⚠ THE ACTUAL FATAL PROBLEM IS THE SLEEVE, NOT THE STRAP
- SectionHiker, measured: **"Sleeping Pad Sleeve Width: 20 in. / 51 cm"**
- SD's own PM Glavin (BPL, 2015-01-06): *"The regular and women's bags fit 20" wide mattresses, and the long bag fits 25" mattresses."*
- Retailer Q&A: *"up to 22" wide"*, ***"up to 3" thick"***, *"the pad sleeve only holds the upper half of the pad, so any length can be used."*
- SectionHiker hands-on: *"I've used it with the Therm-a-Rest NeoAir Xlite and NeoAir XTherm, both of which are 20 inches wide and 2.5 inches thick and **it was a snug fit** to get them into the sleeping pad pocket. I've also used it with an prototype winter pad from Exped which is a bit thicker and **couldn't make it fit**. **My guess is tha a 4 inch pad won't work**"*

**The Rapide SL is 4.25" thick.** Every published ceiling is ≤3". The only hands-on datapoint above 2.5" is a failure. **The working premise "Big Agnes pad inside the bag's PARTIAL PAD SLEEVE" is probably FALSE and must be tested at home before the trip.**

**And the escape hatch is already documented.** SD support, relayed by a SectionHiker reader: ***"They did say that the sleeve for the pad is entirely optional and just an added feature."***

**→ RECOMMENDATION: do not put the pad in the sleeve. Belt the Pillow Strap around the BARE pad.** The elastic then bears on grippy nylon ripstop, not slick 20d taffeta, and the collision dissolves entirely. The cost is that nothing anchors bag-to-pad — which the sleeve was barely doing anyway (upper torso only, and probably not fitting).

**Elastic on slick 20d polyester — would it migrate?** [UNVERIFIED — no test exists.] But see §5: the one sourced report of a wrap-the-pad capture device failing is *exactly* this — an intervening slick fabric layer. Do not belt over the sleeve.

**FAQ caveat:** their bag/quilt answer — *"Pillow Strap works for both. The strap goes around your sleeping pad, so there's nothing to worry about on that front"* — answers **quilt-vs-bag**, not **pad-inside-a-pad-sleeve**. The FAQ is silent on pad sleeves.

**Other corrections:** kulacloth.com sells it (Small **and** Medium, both **$39.00** — Medium is $3 under direct), so Garage Grown Gear is not the only third party; **Large remains direct-from-maker only.** Extension Strap comes in three lengths — 12" (82" max diameter), 24" (106"), 36" (130"); he would only ever need the 12".

---

# 3. ZENBIVY — KILLED ON RETENTION

Zenbivy's own SoftTop owner's manual, verbatim:
> *"Slide your SoftTop™ Pillow into the hood of the sheet and locate the 2 yellow loops. Clip your pillow to those loops to keep it from sliding off your mattress."*
> *"Don't have a Zenbivy sheet? No problem! The clips on the pillow can be hooked onto a **2mm bungee cord** to secure it to your mattress."*

**What the DIY actually requires:** ~50" of 2mm shock cord for a 20" pad (48.5" circumference) or ~60" for a 25" pad, cut and sealed, tied in a loop around the pad at head level, with both clips hooked to it. ~0.2–0.3 oz, ~$3. Zenbivy publishes **no instructions beyond the cord diameter**.

**Why it still fails for him.** Adventure Alan, independent, verbatim: adding your own cord requires *"adding your own shock cord onto **tie off points that aren't centered**, which ultimately leads to an **inferior hold**."* The clips are positioned for a Zenbivy sheet hood, not for a transverse pad belt — off-center tension lets the pillow cock and rotate under a flip. Add: the belt must go around the pad (or, worse, sleeve+pad); and a bare 2mm bungee under tension across laminated nylon is the lowest-friction interface in the system with nothing to stop it walking lengthwise.

**$99 for a pillow that needs a home-made retrofit to do what a $39 competitor does out of the box, at a measured 9.1–9.45 oz. DISQUALIFIED.** (Note: Zenbivy is Michael Glavin — the same ex-Sierra Designs GM quoted in §0.)

---

# 4. EXPED MEGA — KILLED

Exped USA's own page, verbatim: **"Fabric eyelets: Fabric eyelets allow for attachment to a sleeping pad."** Scope of delivery, verbatim: **"Pillow, stuff sack."** **No cord.** 9 oz. 4.7" loft.

Contrast Exped's **own Versaluxe** page: **"Fabric eyelets & included pillow cord secure your pillow to your sleeping mat."** ($49.95 / 7 oz / 19 × 11 × 6 in.) ⚠ Even there, Versaluxe's scope-of-delivery field *also* reads *"Pillow, stuff sack"* — **Exped's own two fields contradict each other.** Do not assume the Versaluxe cord is in the box without confirming at purchase.

**What he'd have to buy and rig for the Mega:** TrailGroove's spec, verbatim — *"start with about a **70" length**, which is sufficient for pads up to 25" wide, then cut down from there sealing the ends carefully with a lighter"* — 1/8" medium-duty shock cord plus a cord lock, ~$3–5, ~0.3–0.5 oz. Or **Zpacks Pillow Attachment Cord, $5.95 / 0.14 oz / 4 g**, which *"includes a spring-hook so that you can adjust it tight."*

**Does a cord around a Big Agnes pad in a sleeve work?** If the pad is **not** in the sleeve (likely — see §2), yes: 48.5" for a 20" pad, comfortably inside a 70" cord. If it **is** in the sleeve, the cord belts 20d polyester and the whole belt can walk. **Either way the Mega is 9.0 oz, ships nothing, and grips nothing. Worst retention-per-ounce in the set. DISQUALIFIED.**

---

# 5. "CAPTURE BEATS FRICTION" — CONFIRMED, but for a different reason than claimed

**(a) Evidence that friction alone suffices for a heavy flipper: NONE EXISTS.** Not one source measures retention for a 250–300 lb sleeper. The **only** heavyweight retention datapoint anywhere in this corpus is negative, and it is on a *capture* device: REI reviewer **"Mark," 6'0", 325–350 lbs, rated the Big Agnes Pillow Barn 3.0/5 with "No, I do not recommend this product"** (no review text). That is the closest body-mass analog to Jed in existence and it is a thumbs-down.

**(b) The Trekology "pretty limiting" quote: UNSOURCEABLE. DISCARD IT.** I searched OGL's Aluft 2.0 review directly (their text is only: the strap *"will attach the pillow to any single-sized pad, keeping centered all night"* and the dots *"do a fairly good job of keeping the pillow from sliding around"* — **no statement about the strap being limiting or removed by a tester**), plus Packstack, Trailspace (403), and open web on the phrase. **It does not exist in any accessible source. Do not publish it.** Note also *"any **single-sized** pad"* — the Aluft strap likely does not reach a 25" pad.

**Real, sourced capture failures — and they cluster:**
- BPL 92015: Stephen Barber — *"the cords of the Monkey Pillow Case that pulled off the cap of my Exped pad"*; Casey Bowden — *"cord tore through the tape"*, *"tape peeled off."* Both are **anchor-point** failures (glue/tape/valve-cap), not belt failures.
- REI, Big Agnes Pillow Barn, 1★: ***"I tried using mine with sheets on a mattress, but it still slid off. I suppose it's only meant to work with a mattress or a cot. I'll give the buff trick a try instead."*** ← **A wrap-the-pad capture device failing because of an intervening slick fabric layer.** This is the single most transferable finding for a man whose pad would sit inside a 20d polyester sleeve.

**→ The rule that falls out: a belt around the PAD works. An anchor to a POINT fails. And ANY capture fails if it belts a slick loose fabric layer instead of the pad itself.**

**(c) The "capture is limiting for a mover" objection is answered by design, not argument.** TrailGroove, verbatim:
> *"the real trick is to **run the shock cord through the loops** of your pillow, instead of tying a fixed length to each side. With the through technique… **the pillow is free to move side to side on the shock cord runner as you toss and turn** during the night, allowing you to keep your head centered on the pillow and allowing you to take it with you freely as you move, instead of you having to adjust to the position of the pillow. **The shock cord still keeps the pillow from sliding off your pad on the lengthwise axis**, however."*

A through-run cord is a **slider, not a clamp**: it captures the lengthwise axis (the one that loses the pillow) and frees the lateral axis (the one a side-flipper needs). **That is precisely correct for a man who flips sides but keeps his head roughly in one place.** Best retention architecture in the corpus, ~$4.

**Independent authority for capture > friction** — Adventure Alan, verbatim: grip dots *"reduce, but definitely don't eliminate, slippage"*, and shock cord eyelets are ***"a much better and more reliable pillow security system."***

---

# 6. THE FREE OPTIONS — one of them is the answer

### The Buff method: VERIFIED — four distinct users, one thread, one day
BPL 72101, 2013-01-10:
- **Randy Martin:** *"The other option I have found both effective and comfortable is pulling my buff over my Exped pillow."*
- **Kenneth Jacobs:** *"+1 on Randy's suggestion. I also do the same."*
- **Ken Thompson:** *"+2 I use the Montbell pillow though."*
- **Richard Cullip:** *"Like Ken, a buff pulled over my Montbell pillow works for me."*

Corroborated commercially — **Zpacks** sells a cord specifically so you can *"hook and unhook it to **slide a shirt or neck gaiter over your inflatable pillow**."* And the REI Pillow Barn 1★ reviewer, having failed with a $39.95 capture device, said *"I'll give the buff trick a try instead."*

**Caveats, honestly:** three of the four are "+1" endorsements, not independent trials; none is a 250–300 lb sleeper; and **the Buff is FRICTION.** It raises μ_bottom (and μ_top). By §1e it improves mode (a) and does **nothing** in the unloaded flip window. **Real, free, worth doing — and insufficient alone for a flipper. Use it *with* capture, not instead of it.**

### T-shirt over the pad's head end: VERIFIED, and it is the strongest free option — because it is CAPTURE, not friction
- **Duane Hall** (BPL 92015): *"Slide a spare T-shirt over the end of your sleeping pad; slip your pillow under the shirt"*
- **Brian Barnes** (BPL 72101, 2013-01-11): *"I simply place an extra torso layer (e.g. windshirt, etc) over the head of the air mattress and stuff the pillow in between."*
- **Brian Mix** (BPL 92015): pillow inside a tee laid flat, held by body weight.

**A shirt pulled over the pad's head end is a closed loop around the pad — the exact geometry of the Big Agnes Sleeping Pad Pillow Barn.** The commercial product is a $39.95, 5 oz, insulated, 50D-polyester version of a free cotton tee. A cotton or merino tee has a **higher** coefficient of friction against nylon than 50D polyester does, weighs what he is already carrying, and costs **$0**. It also solves the substrate problem, because the loop closes around the **pad**, not the bag.

**Condition: the pad's head end must be BARE.** If the pad is in the SD sleeve, the shirt goes over sleeve+pad and you get the Pillow Barn 1★ failure.

### **YES — A $0 FIX WORKS. Say it plainly.**
**Stack three free things he already owns and the retention problem is solved without buying anything:** (1) pad out of the sleeve, bare; (2) spare t-shirt over the pad's head end, pillow tucked under it — capture; (3) Buff over the pillow — friction; and (4) pillow parked in the bag's hood-area down-tube corral with a fleece hat on his head instead — SectionHiker's *"works rather nicely."* Total cost $0, total added weight 0 oz. **Test it in the backyard. If it holds, he does not need the Pillow Strap.** The Pillow Strap ($42–57) buys tidiness, a buckle, and a soft face fabric — not a capability the free stack lacks.

---

# 7. THE OPTION NOBODY IN THE CORPUS FOUND — and why it still fails

**Big Agnes Sleeping Pad Pillow Barn**, SKU ASPPB26. First-party capture from his own pad brand. **$39.95 / €35. 5 oz. Packed 8 × 5 × 2.5 in.** *"Fits most sleeping pads up to 30 in. wide and **4.5 in. thick**"* — the **only** published capture device whose thickness ceiling clears the Rapide SL's 4.25".

**Kill it anyway:**
- **"This product is not available"** at REI; **"Not Available"** at bigagnes.com US. Available only at eu.bigagnes.com (€35).
- **3.0/5 from 4 reviews** — 2×4★, 1×3★, 1×1★.
- The **only 325–350 lb reviewer in this entire corpus does not recommend it.**
- The only textual failure report is **exactly Jed's failure mode**: *"I tried using mine with sheets on a mattress, but it still slid off."*
- Both 4★ reviews are **cot** users, not air-pad users.
- **Big Agnes publishes no attachment mechanism, anywhere** — not US site, not EU site, not REI. [UNVERIFIED how it attaches.]
- Spec conflict: REI says *"Fireline **Pro** Eco insulation"*; Big Agnes says *"Fireline **Core** Eco Insulation."*

---

# 8. RETENTION-ONLY RANKING

1. **$0 free stack** (pad out of sleeve + tee over pad head end + Buff over pillow + pillow in the hood corral, hat on head). Capture + friction + corral, 0 oz, 0 dollars. **Test first.**
2. **Pillow Strap Medium around the BARE pad** — $42 direct / **$39 at kulacloth.com** / 2.3 oz. 48.5" of 58" used on a 20" pad. On a 25" pad: **Medium + 12" Extension**, $42+$9+$6 = $57. Order by **~Aug 5** (ships 1 business day + 4–8 transit).
3. **~$4 through-run shock cord** — 70" of 1/8" + cord lock, run *through* the pillow's loops. Only capture that preserves lateral freedom. Requires a pillow with loops (Exped Mega/Versaluxe, Zenbivy clips) — **the Air Head Down has none.**
4. **Buff over pillow** — free, friction only, additive, never sufficient alone.

**KILLED:** Zenbivy SoftTop (off-center clips → *"inferior hold"*), Exped Mega (no cord, 9 oz), Big Agnes Pillow Barn (OOS US, 3.0/5, heavyweight non-recommend, slick-layer failure), S2S PillowLock (already dead), **and any friction-only pillow as a standalone answer.**

**Front-runner status:** the **Air Head Down survives the physics attack** (correct μ asymmetry, weight-independent in the loaded mode) but is **disqualified as a standalone** — no attachment point, hood-nestling mechanism void in a hoodless bag, one substrate-less nonslip citation, 4" loft below target. **In stock at REI, $64.95/$75.95. Only viable paired with capture.**

---

### Things that cannot be known from the published record
- Coefficient of friction of any pillow base against any pad face fabric. No outlet has ever measured it.
- Whether a 4.25"-thick Rapide SL physically enters a 20"-wide Backcountry Bed sleeve. Only hands-on datapoint above 2.5" is a failure; SectionHiker's "4 inch pad won't work" is explicitly a **guess**.
- How the Big Agnes Pillow Barn attaches.
- Whether the Pillow Strap's elastic walks lengthwise on 20d polyester. Untested by anyone.
- Big Agnes pad face-fabric denier. Unpublished for all three pads.
- Whether the Zpacks Padded Pillowcase's shock cord strap is included in the box (the copy implies yes; Zpacks does not state it). **VERIFY.**

**Sources:** [SD BB20](https://sierradesigns.com/backcountry-bed-20/) · [SectionHiker BB review](https://sectionhiker.com/sierra-designs-backcountry-bed-800-fill-power-3-season-sleeping-bag/) · [BPL 94210 (Glavin/Derek M.)](https://backpackinglight.com/forums/topic/94210/) · [BPL 72101 (Buff method)](https://backpackinglight.com/forums/topic/72101/) · [BPL 92015 (pillow slipping)](https://backpackinglight.com/forums/topic/92015/) · [OGL BB700](https://www.outdoorgearlab.com/reviews/camping-and-hiking/backpacking-sleeping-bag/sierra-designs-backcountry-bed-700) · [OGL Air Head Down](https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-pillow/therm-a-rest-air-head-down-pillow) · [OGL Aluft 2.0](https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-pillow/trekology-aluft-2-0) · [Big Agnes Rapide SL](https://www.bigagnes.com/products/rapide-sl-insulated) · [REI Rapide SL](https://www.rei.com/product/229190/big-agnes-rapide-sl-insulated-sleeping-pad) · [REI Air Head Down](https://www.rei.com/product/246294/therm-a-rest-air-head-down-pillow) · [REI Pillow Barn](https://www.rei.com/product/C03551/big-agnes-sleeping-pad-pillow-barn) · [Big Agnes Pillow Barn](https://www.bigagnes.com/collections/accessories/products/sleeping-pad-pillow-barn) · [Pillow Strap FAQ](https://www.pillowstrap.com/pages/faq) · [Pillow Strap Fit & Sizing](https://www.pillowstrap.com/pages/fit-sizing) · [Pillow Strap Extension](https://www.pillowstrap.com/products/extension-strap) · [Kula Cloth Pillow Strap](https://kulacloth.com/products/pillow-strap) · [Zenbivy SoftTop manual](https://zenbivy.com/pages/owners-manual-softtop-pillows) · [Exped Mega Pillow](https://www.expedusa.com/products/mega-pillow-2025) · [Exped Versaluxe Pillow](https://www.expedusa.com/products/versaluxe-pillow) · [Zpacks Padded Pillowcase](https://zpacks.com/products/padded-pillowcase-for-inflatable-pillow) · [Zpacks Attachment Cord](https://zpacks.com/products/pillow-attachment-cord) · [TrailGroove shock-cord method](https://www.trailgroove.com/blogs/entry/320-how-to-keep-your-pillow-on-your-backpacking-sleeping-pad/) · [Adventure Alan](https://www.adventurealan.com/best-backpacking-pillow-ultralight/) · [Enwild pad-size Q&A](https://enwild.answerbase.com/5176712/What-size-pad-can-it-use) · [CleverHiker Air Head Down](https://www.cleverhiker.com/backpacking/therm-a-rest-air-head-down-pillow-review/) · [Packstack Aluft 2.0](https://www.packstack.io/reviews/sleep-system/trekology-aluft-2-0-inflatable-pillow)

==============================================================================
# ADVERSARIAL-EVIDENCE
==============================================================================

## ADVERSARIAL LENS 3: EVIDENCE QUALITY & DURABILITY — FINDINGS

Two corpus claims broke under audit. One finalist's core spec is now refuted by hands-on measurement. The front-runner's warranty excludes its own alleged failure mode.

---

### 1. THE FRONT-RUNNER: the leak claim is misattributed, unsourced, and about a different product

**The corpus attributed the quote to CleverHiker. It is Switchback Travel.** CleverHiker's Air Head Down review contains *no* durability, bladder, puncture, or leak discussion at all. The actual source is [Switchback Travel, "Best Camping Pillows of 2026"](https://www.switchbacktravel.com/camping/best-camping-pillows) (Nate Lemin | Sarah Nelson, last updated June 30, 2026), verbatim:

> "Despite its well-rounded build, the Therm-a-Rest **Air Head** has a few drawbacks. Our biggest complaints relate to the internal air bladder, which is on the thinner end and **has been plagued by reports of punctures and premature leaks**. The bladder's plastic construction is also crinkly and noisy, meaning finicky sleepers and those prone to moving around throughout the night should steer clear. Finally, the inflate/deflate valve is an old-fashioned design that protrudes from the side of the pillow."

Three defects in this evidence:
- **It is hearsay, not observation.** "Reports of" — Switchback did not experience a failure. No source, no rate, no sample size, no date.
- **It is about the Air Head, not the Air Head Down** — a different SKU (Switchback lists it at 5.6 oz, no down cover).
- **It appears under Switchback's section header "Tested & Dismissed Camping Pillows."** The Air Head is not one of their picks. The corpus's front-runner was tested and rejected by the outlet the corpus was quoting.

**Failure-rate signal at scale: there is no base to measure.**

| Source | Air Head Down | Air Head |
|---|---|---|
| REI | 8 (4.6★) | 2 (4.5★) |
| Backcountry | 5 | 2 |
| Cascade Designs (brand's own) | 57 (4.596★) | — |

**All 8 REI reviews carry the tagline "Review originally posted on a Cascade Designs brand site."** They are the brand's own reviews syndicated into REI — not independent REI purchasers. REI's own "recommend" metric reads `0 of 0 reviewers recommended`. Star distribution: 5×5-star, 3×4-star, **zero reviews below 4 stars**. Zero mentions of leaks, punctures, or deflation. One review affirmatively says "**Didn't lose air** and great height for me who loves to side sleep."

For calibration, at REI: Nemo Fillo has 341 reviews, Fillo Elite 221, Aeros Down 114, Compressible Cinch 50. The front-runner has ~5 genuinely independent reviews in existence. **Neither "plagued by leaks" nor "reliable" is supportable. The correct statement is: this product has no consumer evidence base.**

**Corroborated defect (2 independent outlets, mechanism-level):** the twist valve loses air on closure. CleverHiker: "Once the pillow's fully inflated, **it loses air as you twist the valve shut**." Switchback: "the valve works inefficiently because it's completely open while inflating, which allows some air to escape in between breaths… they are slow to deflate." This matters specifically for Jed — the sealed-air mechanism means *inflation pressure is the only variable he controls*, and this valve won't hold the setting he tunes.

**⚠️ REI's spec table has the sizes' weights REVERSED.** REI lists "Regular: 7.3 ounces / Large: 4.9 ounces." Cascade Designs lists Regular 4.9 oz / Large 7.3 oz. Anyone sizing by weight at REI buys the wrong pillow.

**THE WARRANTY EXCLUDES THE FAILURE MODE.** [Therm-a-Rest warranty](https://cascadedesigns.com/pages/thermarest-warranty), verbatim:

> "Limited Lifetime Warranty on all products… **Normal wear, puncture, abrasion, misuse, alteration and abuse are not covered.**"
> "Warranty coverage is extended only to original purchasers and purchases from authorized dealers."
> "Therm-a-Rest's maximum liability is limited to incidental damages not to exceed the original purchase price."

**This is the trekking-pole pattern exactly.** The "limited LIFETIME warranty" covers defects in material and workmanship — and explicitly excludes *puncture*, which is the precise failure Switchback alleges. A bladder that punctures on night one in the Sawtooths is not a warranty event. Manufacturing seam/weld failure would be covered; a hole would not, and Therm-a-Rest decides which it was.

---

### 2. EXPED VERSALUXE: someone HAS touched one — and the 6" loft claim is FALSE

The one thing the corpus said couldn't be found, exists. [Outdoor Empire, "We Tested 6 Backpacking Pillows So You Don't Have To"](https://www.youtube.com/watch?v=8z8EzxGUDqg) (uploaded 2026-06-18, 25:33, ~20.4k views) put six pillows through six testers over multiple nights. The Versaluxe was one of them.

**The loft claim is refuted.** Verbatim:
> "Now, the Exped Versa Lux **promises 6 in and it is not that**. That looks like 4 on this side and as Jack pointed out the other side is a little thicker where there's the curve, but even still **we're at about 5 in**."

This is an on-camera ruler comparison, uncompressed and eyeballed — not instrumented — so treat "4–5 in" as approximate. But the direction is unambiguous, and it is the **only product in that lineup that under-delivered on loft.** Everything else met or beat its claim (Fillo claims 4" → "at least 4 and 1/2"; Zenbivy claims 4.5" → "closer to 6"; Aeros claims 4.3" → "almost 5"; Compressible claims 5" → "I see 5 and 1/2"). Your suspicion was correct and is now evidenced: **Exped is the one brand in this corpus that overstates.** That is now two independent Exped honesty findings (silent Mega weight revision + Versaluxe loft).

**THE FILL QUESTION IS ANSWERED — there is essentially none.** A tester who slept on it, verbatim:
> "The soft feel of the case is nice, although **there's not like a real sincere layer of insulation in there to really like provide cushion. So, it's pretty much an air pillow just with a soft feel**, but the kind of plastic they use is like I think it's called TPU, I'm not sure, but it's actually kind of stretchy."

Exped's German page confirms by omission — it lists only "TPU-Luftkern" and "rezykliertes 75 D Polyester" with **no fill layer named**. Retailer spec fields showing "isolierend / 100% Polyester" ([Bergfreunde](https://www.bergfreunde.de/exped-versaluxe-pillow-kissen/)) are retailer taxonomy, not Exped disclosure. **Conclusion: the Versaluxe is a bare TPU bladder in a soft washable cover. There is no foam or down topper.** For a 250–300 lb side sleeper this is actually mechanically fine (sealed air doesn't bottom out), but it will feel balloon-like, and it kills any "6 inches of cushion" premise.

**Comfort was poor — it ranked LAST.** Scores from testers: 2/5, 3/5, 3/5. The recurring complaint is an asymmetric baffle:
> "there's a huge baffle on this side and smaller ones on this side… **I was kind of wrestling with it all night. I even deflated it at quite a bit.**"
> Final ranking round: "**I don't like the Exped.**" / "Oh, man, I could not like figure it out."

**The cord is confirmed included and confirmed to work:**
> "Fortunately, this Exped Versa Lux, and I think most Exped pillows actually, **come with a tether built in.** They also put a loop on both sides of the pillow, so it works out of the box."
> "**I did use the drawstring** too to wrap around my sleeping pad and **that did keep it on. It kept it from falling off**, but I was still able to stick my arm under."

Caveat: one tester never figured out what the cord was for and the pillow slid all night — "I was kind of wondering what the cord was about."

**⚠️ Third conflicting Versaluxe weight.** Exped 0.44 lb (200 g / 7 oz) · Bergfreunde 125 g (4.4 oz) · **Outdoor Empire scale-measured 5.1 oz (145 g)**. Unlike the Mega, here the brand *over*states. [UNVERIFIED] whether the 5.1 oz measurement included the removable cover.

**Review count: still effectively zero.** Backcountry lists it with no review count. REI's page has none. An Amazon listing exists (B0GLXLSMSY) but rendered no review data. The Enwild "TrailSense" page is a promotional gear-guide entry, not a hands-on review.

---

### 3. THE DECIBEL DATASET: the tester himself calls it "very unscientific" — and one row is unattributable

Protocol, verbatim and in full — this is the entire methodology:

> "So, I'm going to test the noise of each pillows using **a simple decibel meter app on my phone. Very unscientific**, but I am doing it in the quietest room I can find."

**Mic distance: not stated. Sample size: not stated. Calibration: none. Repetitions: not stated. Reference standard: none. Weighting (A/C): none.**

**The numbers are physically impossible as SPL.** A reported *average of 5.8 dB* is below the noise floor of any phone MEMS microphone (typically ~30 dBA) and near the human threshold of hearing (0 dB). A "quietest room I can find" is itself ~30 dB. These are uncalibrated app-scale artifacts. They are **ordinal, not absolute** — usable only to rank pillows against each other within this single session, and worthless as physical measurements. The tester's own reality check: "just for a reality check, 20 decibels is not loud at all."

**The corpus's table is incomplete and one row is misassigned.** The six values published are: Therm-a-Rest 21.9/17.2 · Sea to Summit 14.4/11 · Exped 20.8/14.4 · Nemo Fillo 19.6/16.5 · Zenbivy 20.6/15.9 · Therm-a-Rest Compressible 8.6/5.8. But the six *slept-on* pillows were Zenbivy, Fillo, Aeros Premium, Versaluxe, **Klymit**, and Compressible. The noise list contains **two Therm-a-Rests and no Klymit.** The corpus dropped the 21.9/17.2 row entirely.

That orphan row matters: if it is an Air Head variant (he handles both Air Head and Air Head Down on camera), **the front-runner is the loudest pillow in the only noise dataset that exists** — which would corroborate Switchback's independent "crinkly and noisy" verdict. [UNVERIFIED] — the video never names it, and it could equally be a mislabeled Klymit. Do not publish an attribution either way.

**Verdict: usable as a rough ranking, not as data.** The one defensible statement is that the Compressible Cinch was quietest and the Aeros Premium was the quietest air pillow, which matches independent qualitative reports.

---

### 4. OUTDOORGEARLAB: the corpus's criticism is half wrong — and the Mega conflict resolves

**Corrected: OGL DOES score by sleep position.** [Their how-we-test page](https://www.outdoorgearlab.com/topics/camping-and-hiking/best-camping-pillow/how-we-test), verbatim:
> "we divvied up them up and scored them according to **how they performed for side-sleepers, back-sleepers, and stomach-sleepers.**"

They collect the signal — they just **publish only the aggregate number**, with per-position commentary appearing in prose (the Air Head Down review says it "works especially well for side-sleepers"). So the corpus's charge that OGL "averages away" the signal is right about the *published output* and wrong about the *method*. No per-position numeric breakdown is published anywhere.

**Confirmed:** no tester count, no sample size, no weighting percentages disclosed (the page says only "we scored each pillow in five areas"). I could not verify the corpus's "~60% subjective by their own weighting" claim — **[UNVERIFIED]**, no weighting table is published.

**Confirmed and damning on loft-under-load:**
> "we deployed each pillow and **measured the compression when we placed our heads on them**" — with **no values, no test weight, no protocol** published. The corpus is right: no loft-under-load number exists anywhere in this market.

**THE MEGA CONFLICT RESOLVES — they tested different generations.**

| | OGL | CleverHiker | Current Exped spec |
|---|---|---|---|
| Weight | **7.2 oz** | **9.2 oz** | 9.0 oz |
| Dimensions | 20 × 12 × 4.5 in | — | 20.5 × 12.6 × 4.7 in |
| Verdict | Comfort **4.0/10**, 14th of 15, overall 67 | **4.4/5.0**, "coziest air pillow in our testing lineup" | — |

CleverHiker's measured 9.2 oz matches the current 2025 revision. OGL's 7.2 oz undershoots it by 22%, and **all three of OGL's dimensions are smaller than current spec** — consistent with OGL having tested an earlier unit and refreshed the article text (updated Oct 23, 2025) without re-weighing. **CleverHiker's praise applies to the pillow you can buy; OGL's 4.0/10 does not.**

Residual anomaly: OGL lists the shell as "Polyester fleece," where the corpus holds the old generation was nylon. Either the corpus's nylon attribution is wrong or OGL refreshed its spec table from the brand site without re-testing — itself an evidence-quality failure. **[UNVERIFIED] — do not assert which.** Also note OGL's Air Head Down measured weight of 7.4 oz means **OGL tested the Large**, while CleverHiker's 5.3 oz means they tested the Regular. The two outlets never tested the same pillow in either case.

---

### 5. FIELD-FATAL FAILURE MODES FOR AUGUST IN THE SAWTOOTHS

**The single most decision-relevant finding here:** Therm-a-Rest's **Instant Field Repair Kit** ($12.95, 2 oz) says verbatim it "Works on all current Therm-a-Rest **sleeping pads**, except pads with knit fabric" — **pillows are not mentioned.** The kit that *is* rated for pillows is the **Permanent Home Repair Kit**: "repairs all Therm-a-Rest inflatable sleeping pads, **air pillows** and more" — wet adhesive, multi-hour cure, not a night-one field fix. Reviewer-reported limitations on the field kit: "Patches may fail in cold/wet conditions."

| Finalist | Night-one failure mode | Field-repairable? |
|---|---|---|
| **T-a-R Air Head Down** | Bladder puncture; valve bleeding air on close | **Partially.** Pillow-rated kit is the *home* kit. Field kit not rated for pillows. Down cover survives; you lose all loft. |
| **Exped Versaluxe** | TPU weld/seam failure; bladder puncture | **Yes** — TPU takes standard patches, and cover/core separate by design (mono-material). Best repair story of the air finalists. |
| **Exped Mega** | Same as above | Yes, same. |
| **Zenbivy SoftTop** | Bladder failure → **down topper + case still function** as a (thin) pillow | **Best-degraded failure.** Graceful, not catastrophic. |
| **S2S Foam Core** | **No valve, no bladder, no seams, no leak path.** Only foam compression set (gradual, over seasons) | **Cannot fail in the field.** |
| **T-a-R Compressible Cinch** | None mechanical | Cannot fail in the field. |

**Delamination / storage:** TPU delamination is caused by heat and adhesive degradation — "usually caused by heat (e.g. hot sunny day in vehicle) or simply adhesive failure over time," plus moisture, body oils, sunscreen, and bug spray degrading the adhesive. **Practical rule: never leave any inflatable in a hot car**, which is the exact risk profile of an August trailhead in Idaho. Store dry, unrolled, valve open.

**The $0 backup that beats a $45 purchase.** Outdoor Empire, verbatim:
> "you always have the option with **any** pillow just about to tie a tether around the pad. **Just a little piece of paracord or fishing line would do the trick.** … So, if you've got a pillow you really like, even if it's prone to slippage, there's probably an easy DIY solution."

**Recommendation for this trip regardless of finalist: carry a non-inflatable backup or a patch kit.** A heavy side sleeper who flips all night on a sealed-air pillow has one component between him and five nights of no pillow. The only finalists with zero leak path are the S2S Foam Core (7.4 oz) and the Compressible Cinch.

---

### 6. YOUTH EVIDENCE: the gap is real — confirming it plainly

**I found no youth-specific camping-pillow research, no youth-specific product line, and no youth-sized SKU from any finalist brand.** Searches across pediatric pillow-height literature, camping-pillow roundups, and brand catalogs returned nothing testable. Ren 2016 (PMC5012320) already establishes that optimal pillow height **does not correlate with anthropometric dimensions** — which means you cannot scale an adult recommendation down by height, and the retail "measure the child" rules are as unfounded for the son as for Jed.

What exists is general-bedding guidance, not camping evidence, and not peer-reviewed: junior pillows ~2–3 inches; pre-teens 8–12 "do well… with a loft of 4–6 inches."

**Assessment: at 5'1", the son is at the low end of adult, not a child.** The corpus's ~3–4" compressed target sits below the only quantitative side-sleeper trial you have (Tian 2025: 3.83–4.63 in optimal), and Tian was conducted on adults. **The honest position is that the son's target is inference, not evidence** — and the practical answer is *adjustability*, not a youth product: an air pillow he can bleed down, or the Compressible Cinch whose cinch demonstrably tunes loft ("I also did figure out the little cinching thing, and I think that kind of helped with the loft"). **Do not present any son recommendation as evidence-based.**

---

### BONUS: THE SIERRA DESIGNS HOOD CONFLICT — SETTLED, BOTH AGENTS PARTLY RIGHT

**The Retention Agent is correct about the current product.** Current BB 20 retail copy, corroborated across multiple independent retailers: "**The cinchable hood and stretch cord closure** helps trap warmth on colder nights," alongside "self-sealing foot vent, insulated shoulder pockets and cinchable hood."

**The Anchor Agent's sources are all 2014–2019 and describe the discontinued BB 600/700** — Glavin's 2015 Backpacking Light comment, owner Derek M., and OGL's BB700 review. The product changed. That resolution is correct.

**But the Anchor Agent's conclusion survives anyway.** A hood that cinches *for warmth* is not pillow retention. Glavin's objection was about **sizing** — that SD deliberately declined to size the hood for pillow-plus-head — and cinchability does not fix sizing. Nothing in the current copy claims pillow capture. Note also that the much-quoted "keeps your bed in place all night, no matter how much you move" refers to the **sleeping pad sleeve holding the bag to the pad** — it is not about the pillow at all, and the corpus already establishes that sleeve is partial/upper-torso.

**Net: the current BB 20 has a cinchable hood; it still provides NO pillow retention.** Report the correction and keep the conclusion.

---

### WHAT CHANGED, IN ONE LIST

1. The leak quote is **Switchback Travel**, not CleverHiker — and it is about the **Air Head**, not the Air Head Down. It is unsourced hearsay ("reports of"), published under **"Tested & Dismissed."**
2. Therm-a-Rest's lifetime warranty **explicitly excludes puncture** — the alleged failure mode is uncovered.
3. The front-runner has **~5 independent reviews on Earth**; REI's 8 are brand-syndicated. No failure-rate signal is computable in either direction.
4. **REI has the Air Head Down's size weights reversed.**
5. **The Versaluxe has been tested.** Its 6" loft claim is false (~4–5"), it has **no meaningful fill**, it measured 5.1 oz not 7, its cord works, and it **ranked last on comfort** in the only hands-on test.
6. The decibel data is a **phone app the tester calls "very unscientific,"** with impossible sub-noise-floor values, and the corpus dropped a sixth row that may be the front-runner as the loudest in the set.
7. **OGL does score by sleep position** — it just doesn't publish it. The Mega conflict resolves as a **generation mismatch**, with CleverHiker on the current pillow.
8. Therm-a-Rest's **field** repair kit is not rated for pillows; only the **home** kit is.
9. Independent corroboration that **4" is too thin for a side sleeper who tosses** — Switchback says so three separate times. The Air Head Down is 4".

**Artifacts:** transcript at `/private/tmp/claude-502/-Users-jed-jedstuff-high-adventure/aa7d2847-1b6b-41c2-ae03-7235f483b56e/scratchpad/transcript.txt`; raw VTTs alongside it.

Sources: [Switchback Travel](https://www.switchbacktravel.com/camping/best-camping-pillows) · [Outdoor Empire video](https://www.youtube.com/watch?v=8z8EzxGUDqg) · [Therm-a-Rest warranty](https://cascadedesigns.com/pages/thermarest-warranty) · [Air Head Down (brand)](https://cascadedesigns.com/products/air-head-down-pillow) · [REI Air Head Down](https://www.rei.com/product/246294/therm-a-rest-air-head-down-pillow) · [OGL how-we-test](https://www.outdoorgearlab.com/topics/camping-and-hiking/best-camping-pillow/how-we-test) · [OGL Air Head Down](https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-pillow/therm-a-rest-air-head-down-pillow) · [OGL Exped Mega](https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-pillow/exped-mega-pillow) · [CleverHiker roundup](https://www.cleverhiker.com/backpacking/best-backpacking-hiking-camping-pillows/) · [Exped Versaluxe DE](https://www.exped.com/de/produkte/kissen/versaluxe-pillow) · [Bergfreunde Versaluxe](https://www.bergfreunde.de/exped-versaluxe-pillow-kissen/) · [Instant Field Repair Kit](https://cascadedesigns.com/products/instant-field-repair-kit)

==============================================================================
# SYSTEM-STACKS
==============================================================================

# SYSTEM-STACK REPORT

## 0. THREE CORRECTIONS TO MY OWN BRIEF, FOUND BEFORE ANYTHING ELSE

**(i) Adventure Alan's loft numbers are puffy-inflated, and his own footnote admits it.** His comparison table carries this asterisk verbatim:

> `*counts the additional loft of a puffy jacket, but not its weight`

Every "hybrid" row is a **range**, not a number. The high end exists only with a puffy stuffed in; the low end is the bare hardware:

| Alan's row (verbatim) | $ | oz | Measured Height Range |
|---|---|---|---|
| `Pillow Strap S + Sts Aeros UL, R*` | 92 | 3.7 | **4.0–6.5** |
| `Zpacks Pillowcase + Inflatable*` | 60 | 3.8 | **4.5–7.0** |
| `Zenbivy Pillowcase + Inflatable*` | 60 | 2.3 | 4.0–6.5 |
| `Zpacks Comfy Camp + Zpacks Inflatable` | 70 | 4.2 | 4.0–6.0 |

So "3.7 oz gets 6.5 inches" is **not a thing that exists**. 3.7 oz gets **4.0 inches**. The other 2.5 inches is a jacket whose weight was excluded from the total. This single footnote is the load-bearing fact of this entire report.

**(ii) My brief's numbers were slightly off.** Brief said (a) = "3.7 oz, measured 6.5"" — the 3.7 oz is right, the 6.5" is the puffy-assisted ceiling. Alan's separate "3.2 oz minimum system weight" is a *different* pairing (Pillow Strap S + Zpacks Inflatable 1.4 oz), not the Aeros build. Alan's `$92` for a `$39 + $50` pairing is unexplained by $3 — likely a patterned Small ($42). **[UNVERIFIED — arithmetic discrepancy in Alan's own table]**

**(iii) I caught and discarded fabricated climate data mid-research.** My first SNOTEL pull returned a tidy per-August table. A raw-row cross-check contradicted it outright (claimed Aug 2023 min 34.7 °F / 20 nights <40 °F; raw rows showed 38.3 °F lowest in the first 14 days), and the file's true minimum was −13.4 °F on 2025-02-12 — proving the date filter never applied and the "table" was interpolated from unfiltered data. **I threw both summarized station tables away and recomputed everything myself from the raw NRCS CSVs.** All climate numbers in §3 are mine, from raw data, and reproducible.

---

## 1. THE STACKS, FULLY COSTED AT VERIFIED 2026 PRICES

Pillow Strap pricing **confirmed live** from the store's own product feed (solid Small $39 / Medium $42 / Large $45; patterns +$3). Sizing confirmed verbatim from `pillowstrap.com/pages/fit-sizing`: Small `Fits pillows 10"–15"`, Medium `15"–18"`, Large `19"–24"`.

| # | Stack | Total $ | Total oz | Bare loft | Loft w/ puffy | Retention |
|---|---|---|---|---|---|---|
| a | Pillow Strap S + Aeros UL R + puffy | **$94.95** | **3.7** | 4.0" | 6.5" | Elastic pad band |
| a-alt | Pillow Strap S + Zpacks Inflatable + puffy | **$79.95** | **3.2** | 4.0–4.25" | ~6" | Elastic pad band |
| b | Zpacks bundle + attachment cord | **$65.90** | **4.0** | 4.5" | 7.0" | 2-point cord |
| c | Cinch **Large** topper + bladder + Strap L | **$120.90** | **20.7** | ~7" | n/a | Strap (bottom only) |
| c-alt | Cinch **Small** topper + bladder + Strap S | **$114.90** | **11.2** | ~5" | n/a | Strap (bottom only) |
| d | Buff + Aeros UL R + puffy | **$74.95** | **3.2** | 4.0" | ~6" | **None** |
| e | Air Head Down L in Pillow Strap M | **$123.95** | **9.6** | 4.0" | — | Band (**but see below**) |
| f | Geoduck topper + bladder + Strap M | **$127.95** | **9.7** | ~5–6" | n/a | Strap (bottom only) |

All Pillow Strap totals include the maker's **$6 US shipping**. Component sources: Aeros UL Regular **$49.95 / 1.9 oz / 13×10×4 in, "in stock"** (seatosummit.com, fetched directly — note Amazon's 2.1 oz and 2.5 oz figures are third-party and disagree with the brand).

### (a) Editor's Choice — re-costed
$94.95 / 3.7 oz. **Fit is clean**: Aeros UL Regular is 13" wide, mid-range for Small. This is the only stack here with no fit compromise.

⚠️ **New pad-limit finding that supersedes my brief.** The brief said Pillow Strap handles "pads up to 30" wide x 5" thick." The live sizing page splits this by size: **Small and Medium fit `pads up to 25" (63cm) wide × 4" (10cm) thick`**; only Large gets `30" × 5"`. Jed's Rapide SL has **4.25" outer chambers** — that **exceeds the 4" limit for Small and Medium**. His 20"-wide pad is fine on width; a 25"-wide Rapide SL is at the exact width limit *and* over on thickness. **This is a real risk on the Editor's Choice pick specifically and nobody has flagged it.** Circumference is fine either way (58.5" and 48.5", both under the 70" extension-strap threshold).

### (b) Zpacks $59.95 bundle — height claim VERIFIED, and it fails
The ~7" claim is real *as published* — and it is the top of `4.5-7.0` with the puffy asterisk. Do the subtraction: Alan measures the Zpacks Inflatable **alone** at `4.0-4.25`. The padded pillowcase therefore contributes **~0.25–0.5"**. The remaining ~2.5" is jacket. **You are paying $25 (case) + 2.4 oz for a quarter-inch of loft and a soft face.** Ships 1–3 business days. Retention is zero natively; the Pillow Attachment Cord is **$5.95 extra**.

### (c) Compressible Cinch as a topper — HAS ANYONE DONE IT? **No.**
I searched hard and found **no field report of this exact configuration.** Report it as untested. The nearest hits actively undercut it:

- **Josiah M (Backpacking Light), verbatim:** *"I've spent too much time trying to figure this out. I've tried making my own pillows, stacking 2 pillows on top of each other, etc. But I do have an answer! Here is the best thing I've found so far: Thermarest Compressible pillow on top and here's the secret, stick something(clothing, pack, air pillow) underneath your pad."* — The air pillow goes under **the pad**, not under the Compressible. Different technique. And he tried stacking two pillows and **rejected it**.
- **Paul McLaughlin, verbatim:** *"I use two Sea to Summit pillows stacked, along with any clothing I am not wearing, inside my clothing stuffsack, for which I have created velcro attachments to my pad."* — stacking works, but *inside one enclosure*.

**The mechanical objection is fatal as specified.** A Pillow Strap enclosure holds the bladder; the Cinch would lie **loose on top**, unsecured — reintroducing sliding on the exact layer his face touches. And the Large is **16 oz**, so the rescue costs 20.7 oz total, 5–6× every other stack, to salvage a product OGL scored **Support 6.0/10** with two testers blaming head weight. If he insists, use the **Small** (8 oz, 11.2 oz total). I do not recommend it.

### (d) Buff and puffy
Honest accounting: a Buff Original is **~1.3 oz, ~$25 [UNVERIFIED — I did not confirm current Buff pricing]**. Buff + Aeros UL R = **3.2 oz / $74.95**, ~4" bare and ~6" stuffed. The brief's "~6-7" at ~4 oz" is only reachable with the puffy, weight again excluded. **The Buff adds friction, not retention — it does not attach to the pad.** For a man who flips all night, that is the wrong tool.

### (e) Air Head Down Large in Pillow Strap Medium — **two independent problems**

**Problem 1: there is a literal dead zone at 18".** Medium fits 15–18". Large fits **19**–24". An 18.0" pillow sits at the exact top edge of Medium with **zero margin**, and the next size up doesn't start until 19". My fit check confirms no size has margin for it. Worse, the maker's own rule cuts against Medium, verbatim: *"if you're using a loose-fill foam pillow near the upper end of a size range, size up one for the best fit."* The Air Head Down is **down over a bladder** — down is loose fill and migrates laterally. And the FAQ: *"Go with the smaller size if you want the most lightweight, compact kit and aren't planning to add a layer. If you want room to stuff a puffy on top, size up."* So if he wants loft, he must size up — into a case built for a pillow an inch wider. **Yes, the Medium fit is a problem, and it is worse than my brief assumed.**

**Problem 2, and this is the one that kills it: the Pillow Strap covers the nonslip base.** The Air Head Down's entire retention value is the grabby underside — Therm-a-Rest: *"nonslip fabric keeps pillow in place"*; OGL hands-on: *"The underneath is covered in a micro-fleece type material that is soft but grabby... it keeps the pillow in place while tossing and turning... you can call off the midnight pillow search party."* **Sealing that surface inside a polyester case disables the feature he paid for and replaces it with a redundant one.** He would be spending **$42 and 2.3 oz to turn off a working mechanism.** Buy the pillow alone ($75.95 / 7.3 oz) and test the base first. Listed at REI $64.95–$75.95, both sizes (REI 246294) — **[UNVERIFIED live stock; REI page would not load for me on two attempts]**.

### (f) Geoduck stacks — the insert is disqualified on physics
Geoduck is ~$45 / 6 oz / ~5" loft / 750-fill down / **no bladder, no valve, no attachment**. Owner reports describe exactly the failure mode Jed's head mass guarantees: *"because it is so packable, the down fill compresses down as soon as you lay your head on it, leaving really no head support."* littlegrunts adds it *"doesn't stay super fluffy all the time"* and *"if you love big pillows, this might not be for you."*

Per the physiology in my brief, compressible fill has an ILD curve, bottoms out, and **down migrates laterally out from under load**. A pure-down, bladderless pillow under a ~20–24 lb head — roughly double a reference head — is the single worst material match in the corpus. The only defensible build is Geoduck as a **face layer over a load-bearing bladder** ($127.95 / 9.7 oz) — which is the same untested topper bet as (c), just lighter and nicer-feeling. Geoduck width is **[UNVERIFIED]**, so I cannot confirm a Pillow Strap size.

---

## 2. THE FREE PROTOTYPE — run this before spending a dollar

**Field reports found (verbatim):**

- **Duane Hall (BPL):** *"Slide a spare T-shirt over the end of your sleeping pad; slip your pillow under the shirt."*
- **Brian Mix (BPL):** *"I slip my pillow into a tee shirt and lay the tee down flat before laying down my bag. With the pillow up near the neck line and sleeve areas- when I lay down my body rests on the remainder of the tee, holding the pillow right where it needs to be."* ← **the strongest free variant — bodyweight anchors the shirt, no elastic needed.**
- **omakas.es** (Therm-a-Rest XTherm + S2S Aeros): *"By putting one of your spare t-shirt over the top of your mattress/sleeping pad and slide your pillow under it, it is fixed and won't move during the night."* Assessed as *"super convenient and fool-proof."* No failures reported.
- A long-distance hiker reports a merino tee over the pad end *"has served them well for years and thousands of miles."*

**Assessment for a restless flipper — honest, including the failure modes:**

1. **Mechanically identical to the Pillow Strap**: fabric sleeve around the pad head, pillow trapped between fabric and pad. Testing it tests the *capture concept* itself, which is what he's actually deciding.
2. **It has no elastic.** The Pillow Strap actively tensions; a tee only grips if it's snug on the pad. **Jed is broad-shouldered, so his shirts are large — a large tee on a 20"-wide pad grips; on a 25" pad it may be too loose.** This is a specific risk for *him*.
3. **It costs a spare shirt.** In the BPL thread whose OP had *exactly* Jed's problem — DGoggins: *"everytime I move, or flip my body over to the other side, the pillow normally falls off and I have to grab it and reposition it"* — the t-shirt fix was proposed and rejected because he didn't carry a spare shirt.
4. **Publication bias caveat:** I found no report of the method failing, but people post solutions, not non-events. Absence of failure reports is weak evidence.

**And a second free prototype he already owns — see §4.**

**Decision rule:** if capture works in the backyard → buy the Pillow Strap (purpose-built tension). If capture fails for him → the entire Pillow Strap thesis is in doubt and he should buy the Air Head Down instead, which retains by a *different* mechanism (friction, not capture). **This one $0 night resolves which branch of the whole decision tree he's on.**

**Timing is tight.** Pillow Strap ships in 1 business day + 4–8 business days transit. Today is **July 27**. To backyard-test and still order, he must test **this week** and order by **~Aug 5**.

---

## 3. TRYING TO BREAK THE SYSTEM THESIS

### 3a. Three pieces to lose in the dark — **weak objection, but it conceals a strong one**
In a *captured* system the components are held together in one enclosure strapped to the pad; at 2 a.m. it is one object, not three. Multi-piece risk is at packing time, not at night.

**The real 2 a.m. failure is different and nobody names it:** the puffy is *inside* the pillow. If he gets cold at 2 a.m., **he has to dismantle his pillow in the dark to get dressed** — and then sleeps on a 4" pillow for the rest of the night. That is the puffy problem wearing a disguise, and it is a genuine objection.

### 3b. Do stacked layers shear? — **yes, and this yields a hard design rule**
Each interface is a slip plane: a single pillow has one (pillow/pad); a bladder + topper has two. **But an enclosure converts a stack into a single body.** That is precisely why Alan's system is *a case plus contents*, not loose layers.

**Rule: every layer must live inside one enclosure. Any layer outside it is a liability.** This is exactly what condemns (c) and (f) as specified — the topper sits loose on top, unconstrained, and it is the layer his face touches. Honest counterweight from a strap user, **Megan W (BPL), verbatim:** *"I use a quilt and sewed 2 elastic straps on to the Airhead pillow case – they go around my mat and keep the pillow in place **(mostly)**."* Note her parenthetical. Capture is very good, not perfect.

### 3c. THE PUFFY PROBLEM — resolved with real data

Computed by me from raw NRCS SNOTEL daily-minimum CSVs, **37 complete Augusts per station** (Aug days with ≥25 valid records):

| | **Banner Summit #312 — 7,040 ft** | **Vienna Mine #845 — 8,930 ft** |
|---|---|---|
| Mean / median August low | **39.6 / 39.9 °F** | 45.6 / 46.2 °F |
| 5th / 10th percentile night | **30.0 / 32.2 °F** | 32.4 / 36.0 °F |
| Nights < 45 °F | **83%** | 42% |
| Nights < 40 °F | **51%** | 20% |
| Nights ≤ 32 °F | **10%** | 5% |
| Coldest August night on record | **25.2 °F** | 19.9 °F |
| Recent August minima (2020→2025) | 28.8 / 28.8 / 32.5 / 29.8 / 28.8 / 33.4 | 29.8 / 31.5 / 40.8 / 34.7 / 30.2 / 33.3 |

**The non-obvious finding: the LOWER station is ~6 °F COLDER than the one 1,900 ft above it.** That is textbook cold-air drainage — the Stanley basin floor and valley meadows pool cold air while the slopes above stay warmer. **Actionable: camping in a lakeside meadow or basin is colder than camping 500–1,000 ft higher on a bench.** Jed's stated 35–50 °F is well calibrated for benches and **slightly optimistic for basin sites**, where half of August nights drop below 40 °F and one night in ten hits freezing.

*Caveat, stated because NRCS states it:* the file header warns *"SNOTEL air temperature data contains a known bias. This bias is rooted in the sensor conversion equation and varies through the output range."*

**So is he wearing the puffy?** Consensus is that you consider wearing a puffy inside the bag **below ~20 °F**, not at 35–40 °F. In a 20 °F bag at 30–40 °F he has 10–20 °F of margin, so **on a typical night: no — the jacket is free to be a pillow.** Three qualifiers push the other way: (i) reviewers call the BB20's 20 °F rating *"slightly ambitious"* and were reluctant below freezing; (ii) the zipperless comforter is draft-prone for someone who flips all night; (iii) ~10% of basin nights are at or below freezing.

**Verdict: the puffy problem is REAL but PROBABILISTIC, not categorical.** Expect **1–2 nights of a week-long basin trip** where he wants that jacket on. On exactly those nights, every puffy-dependent stack silently drops from 6.5–7.0" to **4.0–4.5" — losing ~40% of its loft on the coldest, most sleep-critical nights.** This is invisible in Alan's table because the asterisk counts the jacket's loft while excluding its weight. **This is the strongest single finding against the ultralight stacks.**

*Mitigation:* stuff with something he will **never** wear to bed (a dedicated fleece), or accept the 4.5" floor, or pick a stack whose loft doesn't depend on clothing.

### 3d. Does any SINGLE pillow defeat the thesis? — **the thesis survives, but it is weaker than discovery claimed**

- **Exped Versaluxe — the real threat.** $49.95, 7 oz, claimed 6" loft, **cord included** (Exped: *"Fabric eyelets on the sides and an included cord allow the pillow to be easily attached to the sleeping mat"*), removable washable cover, in stock. A retailer now discloses **"synthetic fill"** and 19×11×6 in — Exped itself still won't say what sits between the 75D cover and the TPU core. **On paper it meets all three requirements at half the weight-adjusted cost of any stack.** Against it: **zero reviews anywhere**, 6" is an *uncompressed* dimension, and a 2-point tether resists translation but permits rotation — weaker than a pad-encircling band. It is an **unvalidated bet**, but with no budget ceiling it is a cheap experiment.
- **Air Head Down Large.** Defeats the **retention** requirement outright, on the best independent evidence in the corpus (OGL hands-on, above). **Fails loft** at 4" vs a 5–6" target, OGL Support 7.0/10, and CleverHiker warns the bladder *"is on the thinner end and has been plagued by reports of punctures and premature leaks."*
- **The deepest challenge to the thesis is physiological, not commercial.** Hong 2022 (PMC9311775): on a soft surface vs medium, head distance rose **+30.5 mm** and C5-C6 peak disc loading rose **49%** (316 vs 212 kPa), concluding a **thinner** pillow should accompany a softer surface. Jed sleeps on a 3.5–4.25" inflatable. **His true compressed target is therefore probably BELOW the 5–6" he assumes** — plausibly inside Tian 2025's "most comfortable" band of 4.63–5.43". If his real requirement is ~4.5–5", a single Versaluxe or a firmly-inflated Air Head Down may suffice **and the system thesis largely dissolves.** Set pad pressure first, then tune the pillow to it.

**Bottom line: no single pillow is *proven* to deliver loft + retention + traditional feel under a heavy head — so the thesis stands. But it stands on absence of evidence, not evidence of absence.** No published loft-under-load measurement exists for any camping pillow from any outlet; OGL says they *"measured the compression when we placed our heads on them"* but **publish no values and no test weight.** The thesis is a reasonable default, not a demonstrated truth.

---

## 4. SETTLING THE BACKCOUNTRY BED 20 HOOD CONFLICT

**Both agents are right. They are describing two different USE MODES of the same hood, not two different products.**

- **The retention agent is right that it cinches.** I fetched sierradesigns.com directly: the current BB 20 lists **`"cinchable hood"`**, `"Sleeping pad sleeve keeps pad under you"`, `"Patented zipperless design"`, 20 °F, Regular 2 lb 6.4 oz / $209.95.
- **The anchor agent is right that it will not hold a pillow AND a head.** Glavin's 2015 statement was about *deliberately declining to size it for both*, and owners confirm: the women's-model tester found *"not quite enough room to fit a pillow AND her head inside the hood"*; Derek M. found the lip *"useless"* with a large Exped inside.

**The resolution — and it is good news.** Used as a **pillow corral with his head outside it**, owners report it works. Verbatim from owner reviews: *"awesome cuz it keeps my pillow right where I want it all night"*; another found the hood holds a pillow in place and *"it works rather nicely"*; a third notes that in warmer conditions, when they didn't need to bury their head, *"the hood served to keep their pillow in just the right place."*

**At 35–50 °F in August, Jed does not need his head in the hood. He therefore already owns a pillow-retention device, for $0.** The upper-torso pad sleeve anchors the bag to the pad, limiting bag-to-pad rotation, so the corral doesn't wander with him.

**The one hard limitation, from an owner, applies precisely to the cold nights in §3c:** *"The pad sleeve does not allow for a pillow to be placed under the hood between the pad, so if it's cold enough to need the hood, pillow options are limited."* **On the ~10% of nights when he wants his head in the hood, the hood stops being a pillow corral.** That is the same 1-in-10 cold night that kills the puffy stacks — the two failure modes are correlated, and they compound.

**Test this the same backyard night as the t-shirt.** Two free retention mechanisms, one night, zero dollars.

---

## 5. THE SON (5'1" youth, ~3–4" target) — AND HOW MUCH IS INFERENCE

**Inference level: HIGH. I want to be blunt about this.**

- **The 3–4" target is an assumption inherited from the brief, not a finding.** There is **no pediatric or youth camping-pillow loft literature at all.** Tian 2025 is the only side-sleeper-specific trial and its subjects were adults.
- **Worse, the one relevant study forbids the obvious shortcut.** Ren 2016 (PMC5012320) found optimal pillow height does **not** correlate with individual anthropometric dimensions — so I **cannot** derive the son's pillow height from his height or shoulder width. Anyone who scales Jed's number down by body size is guessing.
- **Unknown and material: nobody has told me whether the son flips.** Jed's flipping is the entire reason this problem exists; the son's sleep style is unstated. **[UNVERIFIED]**

**What IS defensible, and it flips the recommendation:** a lighter head applies less load, so compressible fill bottoms out far less. **The exact failure mode that disqualifies foam and down for Jed does not apply to his son.** So for the son, a **single pillow is likely sufficient and the system thesis probably does not apply at all.**

**Candidates, best first:**

1. **Sea to Summit Foam Core, Regular — 160 g / 5.6 oz.** No valve, no bladder, no crinkle, **no leak path**; brushed recycled stretch-knit over upcycled PU foam. **REI 4.8 stars / 43 reviews — highest-rated pillow in REI's entire pillow category.** Most traditional feel, fewest failure modes, nothing to puncture on a kid's trip. **Price [UNVERIFIED — my source gives weights, not price.]**
2. **S2S Aeros UL Regular — $49.95 / 1.9 oz / 13×10×4 in.** 4" sits right at a youth target; nearly weightless; verified in stock.
3. **Trekology Aluft 2.0 — $19.99 / 3.8 oz / 17" wide / 4" loft.** The retention insurance buy. It has **both** a detachable pad strap **and** silicone grip dots, and OGL endorsed both hands-on — but with a clear ranking: the dots do only *"a fairly good job"* while the strap *"locks the pillow firmly in place."* OGL Comfort 4.0/10 (worst tied), so it feels cheap — but at a youth's comfort tolerance and $20, **it is the best retention-per-dollar in the entire corpus.** If the son turns out to be a flipper, this is the answer.

**My honest recommendation for the son: Foam Core Regular for feel and reliability; add the Aluft 2.0 only if he's confirmed to be a mover.** And note the son can run the same free t-shirt test on the same night.

---

## 6. WHAT I COULD NOT ESTABLISH

- **No loft-under-load figure exists for any pillow, from any outlet, at any test weight.** Every "loft" number in this report — mine included — is uncompressed or puffy-assisted. The single datapoint anywhere is one reviewer's Zenbivy 128 → 97 mm (24% loss) at undisclosed body weight. **For a 250–300 lb buyer whose whole question is behavior under load, the industry has published nothing.**
- **Nobody has tested the Compressible-Cinch-as-topper configuration.** Not "it's bad" — **untested**.
- **Live stock for Air Head Down at REI** — page failed to load twice. Listed at $64.95–$75.95.
- **Geoduck dimensions**, so no Pillow Strap size can be confirmed for stack (f).
- **Buff Original current price** (~$25 used as an estimate).
- **Exped Versaluxe fill material** — a retailer says "synthetic"; Exped still won't disclose what sits between cover and core, and the product has **zero reviews anywhere.**

---

## 7. WHAT I'D ACTUALLY TELL HIM

1. **Tonight, $0:** t-shirt over the pad head + pillow underneath (Brian Mix's bodyweight-anchored variant), and separately the BB20 hood as a corral. Both are free, he owns both, and together they tell him whether *capture* works for his body before he spends anything.
2. **If capture works → (a) Pillow Strap Small + Aeros UL Regular, $94.95 / 3.7 oz** — the only stack with a clean fit. **But verify his Rapide SL width first: Small/Medium are rated to 25"×4" and his outer chambers are 4.25".**
3. **If capture fails → Air Head Down Large alone, $75.95 / 7.3 oz.** Different mechanism, best independent retention evidence in the corpus. **Do not put it in a Pillow Strap — that disables the nonslip base and lands in the 18–19" dead zone.**
4. **Cheap parallel bet: Exped Versaluxe, $49.95 / 7 oz, cord included.** The only single product that on paper meets all three requirements. Zero reviews, so it's a bet — but a $50 one with no budget ceiling.
5. **Whatever he picks, don't let the pillow depend on the puffy.** Half his August nights will be under 40 °F in a basin, one in ten at freezing, and those are the nights the puffy-stuffed stacks quietly lose 40% of their loft.
6. **Order by ~Aug 5.**