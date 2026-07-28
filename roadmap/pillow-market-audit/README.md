# Backpacking Pillow Market Audit — Sawtooth 2026

Complete research archive for the sleeping-pillow decision. 20 agents, ~3.1M tokens,
1,128 tool calls, 125 unique products, five adversarial lenses, **26 corrected errors.**

Same methodology as [`../pole-market-audit/`](../pole-market-audit/) — discovery sweeps →
conflict resolution → adversarial lenses → judge → synthesis. The conclusion is different in
kind, and that difference is the headline.

---

## ⚠️ THE HEADLINE: THIS CATEGORY CANNOT BE SHOPPED ON EVIDENCE

The pole audit rested on Alan Dixon's instrumented 37-pole deflection dataset. **There is no
equivalent here, and the gap is not incidental — it is precisely the three properties that
decide this purchase:**

| Property                             | Instrumented data                                                                                                                                                                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loft under load**                  | **NONE.** Sleep Foundation grades loft explicitly _"when the pillow is not compressed."_ OutdoorGearLab says they _"measured the compression when we placed our heads on them"_ and then publish **no values, no test weight, no protocol.** |
| **Slip / retention**                 | **NONE.** No coefficient of friction, no slide-angle test, no migration-per-night. Every claim is a human saying "it stayed put," and they contradict each other on five products.                                                           |
| **Support rating / max user weight** | **NONE.** Pads have R-values. Pillows have nothing comparable. No spec anywhere distinguishes a pillow built for a 140 lb sleeper from one built for a 300 lb sleeper.                                                                       |
| Tester body weight                   | **Not disclosed by a single reviewer in the entire corpus.**                                                                                                                                                                                 |

**Two sources encountered during this research were fabricated outright** by search-engine
summarization — a "Nomad Labs 5 lb compression test" (the article contains no compression
testing) and a Sea to Summit support article on temperature-driven pressure loss (the word
_temperature_ never appears in it). Both would have changed the conclusion. Both were caught
only because an agent opened the actual page.

**Assume any loft-under-load figure you are shown in future is fabricated until you have read
the source page yourself.**

---

## THE DECISION

**Buyer:** Jed, 5'10", 250–300 lb, broad shoulders, **side sleeper who flips sides all night.**
Sierra Designs Backcountry Bed 20 (zipperless comforter), Big Agnes pad. Plus a 5'1" son.
No weight ceiling and no budget ceiling — but both stated explicitly at every point.

| Who                 | Item                                  | Price  | Weight           | Where                                  |
| ------------------- | ------------------------------------- | ------ | ---------------- | -------------------------------------- |
| **Jed**             | Exped Mega Pillow **(2025 revision)** | $69.95 | 9.0 oz 🏷 / 9.2 ⚖ | REI or Backcountry — sold out at Exped |
| **Jed**             | Zpacks Pillow Attachment Cord         | $5.95  | 0.14 oz          | zpacks.com                             |
| **Jed** _(the A/B)_ | Therm-a-Rest Air Head Down, **Large** | $75.95 | 7.3 oz 🏷 / 7.4 ⚖ | REI, in stock                          |
| **Son**             | Sea to Summit Foam Core, **Regular**  | $29.95 | 5.6 oz 🏷         | REI or seatosummit.com                 |
| **Son**             | Trekology Aluft 2.0 _(+ trip spare)_  | $19.99 | 3.8 oz 🏷         | trekology.com                          |

🏷 brand-sourced only · ⚖ independently weighed by a third party

🗓️ **Order by Friday 31 July. Hard last call Monday 3 August.** The binding constraint is the
Pillow Strap in Large — direct-from-maker only (Garage Grown Gear stocks S/M) and up to nine
business days. **Buy the Mega today regardless:** one unit deep at Backcountry, single colorway
at REI.

**Buy the Air Head Down too and sleep on both.** No budget ceiling + an evidence vacuum +
REI's return policy makes a backyard A/B essentially free, and its retention mechanism is
_genuinely different_ (verified grabby micro-fleece base vs. a cord). Returning the loser is
more honest than inventing a winner between two unloaded loft numbers.

⚠️ **Do NOT put the Air Head Down inside a Pillow Strap.** It seals the grabby base — the one
feature you paid for — and at 18.0 in it lands in the dead zone between Medium's 15–18 in
ceiling and Large's 19 in floor.

---

## THE THREE FINDINGS

### 1. Plan area is the governing variable, not loft

For a sealed-air pillow, contact pressure ≈ internal gauge pressure, so the pillow does not
collapse under a heavy head — it **recruits contact area**: `A = W / P`.

Because that relation scales every pillow identically, **changing the assumed head load from 15
to 24 lb moves all the areas together and changes the ranking not at all.** Only the margin
depends on the assumption. This is the strongest claim in the audit.

The Exped Mega's **258 in² is the most of any air pillow made** — +15% over the Air Head Down
Large. For a man whose head is roughly double a reference head, that is the decision.

### 2. The frontier has a knee at ~9 oz — and past ~12 oz it inverts

```
1.5 oz  Zpacks bladder + cord           $39.95   ~4.0"  best retention architecture
5.6 oz  S2S Foam Core Regular           $29.95   ~5.0"  best feel, no retention
7.3 oz  T-a-R Air Head Down Large       $75.95    4.0"  only verified nonslip base
9.0 oz  Exped Mega 2025                 $69.95    4.7"  258 in² ← KNEE
16.0 oz T-a-R Compressible Cinch Large  $49.95    7.0"  330 in², and still wrong
```

Above 9 oz manufacturers stop adding envelope and start adding **fill** — and fill is precisely
what fails under a heavy head. The Compressible Cinch Large has **more plan area (330 vs 258),
more loft (7 vs 4.7), better feel, and is the quietest pillow ever measured** — and it still
loses, because OutdoorGearLab states its failure conditionally on the user:
_"it can compress and lose loft depending on your size and weight… doesn't have enough oomph,
and tends to flatten out during the night."_

**A product that beats the winner on every published metric and still loses is the proof the
curve turns down. Sixteen ounces buys him less sleep than nine.**

### 3. Capture beats friction — and the best capture is unpurchaseable for him

Two failure modes trade against each other: **migration** (the pillow leaves) and **collapse**
(the pillow flattens). Foam and down stay put better and are what collapses. Sealed air holds
height and is the slick crinkly object he wanted to avoid.

Migration is fixed by **capture** (a sleeve or cord that traps the pillow), not friction. But
the two best capture systems in the industry — **Zenbivy's clips and Big Agnes's Pillow Barn —
both solve it at the bag**, and he owns a zipperless comforter on purpose.

The winning compromise is a **through-run cord**: threaded _through_ the Mega's eyelets rather
than tied off each side, it acts as a slider, not a clamp — capturing the axis that loses the
pillow while freeing the axis a flipper needs. It costs **$5.95 and 0.14 oz.**

---

## ⚠️ A TRIP-CRITICAL FINDING THAT IS NOT ABOUT PILLOWS

**The Big Agnes pad may not fit inside the Backcountry Bed's pad sleeve.**

| Source                                   | Limit                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| SD product manager Michael Glavin (2015) | Regular fits 20" pads, Long fits 25"                                                                                      |
| Retailer Q&A                             | _"up to 22" wide"_, _**"up to 3" thick"**_                                                                                |
| SectionHiker, hands-on                   | NeoAir 20 × 2.5" = _"a snug fit"_; a thicker pad — _"couldn't make it fit"_; _"My guess is that a 4 inch pad won't work"_ |
| Owner Derek M.                           | _"would not fit a pad wider than 20" (with a 2–2.5" thickness)"_                                                          |

**Big Agnes Rapide SL is 3.5" nominal with 4.25" outer chambers.** Every published ceiling is
≤3". The only hands-on datapoint above 2.5" is a failure, and **no owner has ever published a
successful 3"+ fit.** Sierra Designs publishes no current sleeve spec at all.

The correct framing is **cross-sectional circumference**, since a sleeve is a fixed-perimeter
tube. Glavin's "20 inches" was measured on ~2.5"-thick pads ≈ 45" perimeter:

| Pad                 | 2 × (W + T) | vs ~45"  |
| ------------------- | ----------- | -------- |
| Rapide SL 20 × 4.25 | 48.5"       | +8%      |
| Rapide SL 25 × 4.25 | 58.5"       | +30%     |
| Rapide SL 40 × 3.5  | 87"         | hopeless |

**Measure before buying anything.** If it doesn't fit, the bag has no anchor to the pad — which
for a zipperless comforter under a man who flips is a bigger problem than any pillow. SD support
has already conceded the sleeve is _"entirely optional."_

**Related, and settled:** the Backcountry Bed hood is **not** a free pillow anchor. SD's own
product manager, on why: _"If we made it so it fit pillows and your head inside it is too floppy
in the cases that you don't want your head in the 'hook' (95% of the time)."_ Deliberate design
intent, not a defect. An owner confirms: _"The 'hood' lip was useless when I put my size large
Exped Air Pillow inside. It would no longer cover my head."_ Across all 11 of Sierra Designs'
current product images, **a pillow is never once depicted.**

---

## FILES

| File                                                                     | What it is                                                                                   |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [`synthesis.md`](synthesis.md)                                           | **Start here.** Full decision document (64 KB)                                               |
| [`judge-ruling.md`](judge-ruling.md)                                     | The frontier computation, the picks, what would change them, all 26 errors (44 KB)           |
| [`adversarial-findings.md`](adversarial-findings.md)                     | Five lenses — bag/stock, load mechanics, retention, evidence quality, system stacks (116 KB) |
| [`research/discovery-roster.md`](research/discovery-roster.md)           | The 125-product roster and the spec conflicts between lenses (38 KB)                         |
| [`research/price-stock-verified.md`](research/price-stock-verified.md)   | Street price and stock, read off rendered retailer pages (33 KB)                             |
| [`research/weight-reconciliation.md`](research/weight-reconciliation.md) | Every weight discrepancy chased to a primary source (24 KB)                                  |
| [`research/retention-specs.md`](research/retention-specs.md)             | Anti-slip claims resolved against brand primary sources (26 KB)                              |
| [`data/candidates-raw.json`](data/candidates-raw.json)                   | All 125 deduped candidates with per-lens corroboration (265 KB)                              |
| [`artifacts/pillow-audit.html`](artifacts/pillow-audit.html)             | Interactive visualization — the frontier and the loft chart                                  |

---

## ERRORS CORRECTED

Twenty-six total; the judge's ruling lists them all. The ones that would have changed the
purchase:

| Claim                                             | Correction                                                                                                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Big Agnes **pads** have a pillow barn             | **FALSE** — it is a _bag_ feature. The standalone accessory is unavailable, publishes no weight or dimensions, and has no independent test                            |
| Exped Mega weighs 6–7 oz                          | **FALSE** — silently revised to **9.0 oz** in 2025; polyester replaced nylon; URL slug changed with no public change note. Any 6 oz citation is a discontinued pillow |
| Zenbivy's component math is broken                | **FALSE** — the corpus mixed a Regular bladder with a Large case. $19 + $30 + $50 = $99.00 exactly, confirmed in cart                                                 |
| Trekology overstates its weight                   | **FALSE** — brand says 6.3 oz, CleverHiker measured 6.2. The inflated figure was an **Amazon shipping weight**                                                        |
| Air Head Down's bladder is "plagued by punctures" | **MISATTRIBUTED** — wrong outlet, wrong product (the synthetic Air Head), hearsay with no source or rate, filed under _"Tested & Dismissed"_                          |
| Adventure Alan: 3.7 oz gets 6.5" of loft          | **FALSE as stated** — his own footnote reads _"counts the additional loft of a puffy jacket, but not its weight."_ 3.7 oz gets 4.0"                                   |
| Exped Versaluxe is a cheap parallel bet           | **WITHDRAWN** — now slept on: ~4.5" not 6", **5.1 oz not 7**, no meaningful fill, ranked last on comfort. Exped is the one brand caught overstating, twice            |
| OGL scored the Mega 4.0/10 on comfort             | **WRONG GENERATION** — their unit weighed 7.2 oz with smaller dimensions. They refreshed the article text without re-weighing                                         |
| Pillow Strap fits pads to 30 × 5"                 | **LARGE ONLY** — S/M cap at 25 × 4", and his 4.25" outer chambers bust that limit. Flagged by nobody until this audit                                                 |
| S2S PillowLock works on most pads                 | **FALSE for him** — S2S's own page: _"only approved for Sea to Summit sleeping mats."_ Dead on Big Agnes                                                              |
| S2S Foam Core Large is 10.3 oz                    | Old generation. Current is 7.4 oz / 210 g — **on a single manufacturer source, no independent scale exists**                                                          |
| REI's Air Head Down spec block                    | **REI has the sizes reversed** in both the spec table and its JSON-LD. Weight-shopping from that page buys the wrong pillow                                           |
| NEMO Fillo has a pad strap                        | **FALSE** — reading NEMO's full current page, _"What's Included"_ is only _"Internal Stuff Sack"_                                                                     |
| The Backcountry Bed hood anchors a pillow         | **FALSE** — SD deliberately declined to size it for pillow + head                                                                                                     |

---

## HOME TESTS — these beat the entire published record

1. **The pad sleeve test (tonight).** Inflate the pad, try the sleeve. _Won't go_ → expected;
   nothing in the recommendation changes, every capture option belts the bare pad. _Goes in_ →
   leave it out anyway; belting over a loose slick sleeve reproduces the documented Pillow Barn
   failure.
2. **The tape measure (before ordering a strap).** `2 × (width + thickness)` at mid-torso.
   ≤70" → Pillow Strap Large fits. >70" → add the $9 extension. >82" → every strap in the field
   is dead; run a long cord.
3. **The $0 capture night — the branch point of the whole decision.** Bare pad, spare tee over
   the head end, pillow tucked under. _Held_ → buy the cord and strap; the Mega is the pick.
   _Slid_ → the capture thesis is in doubt and the pick flips to the Air Head Down alone.
   Caveat: a large tee on a 25" pad may just be too loose — retry snugger before flipping.
4. **The loft calibration.** Set pad inflation **first**, then measure ear-to-pad height with
   folded towels until the neck reads neutral. ≤4.5" → the 5–6" target is wrong and the Air Head
   Down at 4.0" is fine (cheapest outcome). 4.5–5.5" → the Mega is correct. ≥5.5" → no single
   pillow reaches it; run a stack.
5. **The overnight pressure check.** Expect some softening — but a comfort-inflated pillow loses
   only ~0.19" over a 60→35 °F drop. The term nobody discusses is **condensation**: these are
   inflated with saturated breath, and as the gas cools that water drops out permanently
   (~22% of total pressure loss) and does **not** come back at dawn.

---

## FIELD PROTOCOL

1. **Set pad inflation first, then tune the pillow to it.** [Hong 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9311775/):
   on a soft surface vs medium, head distance rose +30.5 mm and C5–C6 peak disc loading rose
   **49%** (316 vs 212 kPa). A thinner pillow should accompany a softer surface. Tuning the
   pillow against a differently-inflated pad is exactly why people "can't find a pillow that works."
2. **Pad bare, outside the bag's sleeve.** Belt the cord or strap around the bare pad.
3. **Run the cord _through_ the eyelets**, not tied off each side — slider, not clamp.
4. **Under-inflate slightly.** Treeline found a pillow stopped slipping _"especially after
   letting out a small bit of air"_ — a bigger contact patch and a lower centre of gravity.
5. **There is no night-one field fix for a punctured bladder.** Therm-a-Rest's _field_ kit
   covers sleeping pads only; only the _home_ kit lists air pillows, and it is a multi-hour
   cure. **This is why the son carries the valveless Foam Core and the spare Aluft.**

---

## METHOD

**Phase 1 — discovery.** 6 parallel lenses (traditional feel, anti-migration, ultralight/cottage,
quantitative data, YouTube field evidence via `yt-dlp`, failure modes) → 155 raw → 125 unique.
Plus an anchor agent on the sleep system.

**Phase 2 — conflict resolution.** 5 agents chasing price, weight, stock and anti-slip
contradictions to primary sources. **Retailer pages were read with the Playwright browser MCP,
not WebFetch** — REI, Amazon, Backcountry and Garage Grown Gear all 403 plain fetches, and the
prior sweep had wrongly concluded they were unreachable. One price was verified _by transaction_:
POSTing variant IDs to Zenbivy's cart and reading back the total.

**Phase 3 — adversarial + judge + synthesis.** 5 attack lenses instructed to disqualify rather
than rank, then a judge, then the decision document.

Three agents died mid-response to connection errors across the run and were re-run.
Prices and stock verified **2026-07-27** and will drift.
