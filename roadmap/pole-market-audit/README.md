# Trekking Pole Market Audit — Sawtooth 2026

Complete research archive for the trekking pole decision. Two audits, 42 agents,
~7.3M tokens, 2,270 tool calls, zero agent errors.

**Everything here was previously in `notes/`, which is gitignored — it would have been lost.
That is why this directory exists.**

---

## THE DECISION (what was actually bought, 2026-07-26)

| Who | Pole | Price | Link |
|---|---|---|---|
| **Jed** | Freevane Kodiak 3K Carbon, telescoping | **$79.90** | [amazon.com/dp/B0GDG93MFC](https://www.amazon.com/dp/B0GDG93MFC) |
| **Son (5'1")** | TrailBuddy 7075 Aluminum | **$39.90** | [amazon.com/dp/B072285D5L](https://www.amazon.com/dp/B072285D5L) |

⚠️ **Do not reorder the wrong TrailBuddy.** [B0FCXXMZYQ](https://www.amazon.com/dp/B0FCXXMZYQ)
is the *3K Carbon* version at $59.91 — buying it discards the bend-not-break rationale that
justified the aluminum choice. Confirm the title reads **"7075 Aluminum."**

**Sizing used:** Jed 5'10", 250–300 lb body + loaded pack → 120–125 cm working length.
Son 5'1" → ~110 cm working length; TrailBuddy's 62–137 cm range covers him past 6 ft as he grows.

---

## THE THREE FINDINGS THAT DROVE IT

### 1. The strength-per-dollar curve terminates at $79.90

The Pareto frontier — stiffest pole available at each price or below — is four poles long and ends there:

```
$50  CMT Folding Aluminum   composite 95
$55  TrailBuddy 7075-T6     composite 76
$65  CMT Carbon Ultralight  composite 71
$79  Freevane Kodiak        composite 43   ← FRONTIER ENDS
```

**Nothing priced $80–$300 in a 37-pole instrumented dataset is stiffer than a $79 pole.**
Price vs stiffness correlates at **r = +0.218** — *positive*, i.e. dearer poles were on average
slightly floppier. What predicts stiffness is **upper-shaft diameter (r = −0.702)**; 12 mm → 18 mm
improves median stiffness ~4.7×.

### 2. Wall thickness governs, not material

Every carbon finalist back-computes to **47–81 GPa effective modulus — at or below 7075-T6
aluminum's 71.7 GPa**. The stiffest pole of 37 computes to ~73 GPa, statistically identical to
aluminum; it wins on having the thickest wall in the set. Aluminum's Young's modulus is essentially
constant across alloys (68.9–71.7 GPa, a 4% spread) — alloy buys **yield strength**
(7075-T6 at 430–480 MPa vs ~97 MPa for commodity extrusion alloy), not stiffness.

Corollary: **"7075" on a box is not a strength claim.** It appears in the data at composite
76, 95, 135, 147, 161 *and* 216. In aluminum, weight is the honest proxy for wall thickness.

### 3. Only 2 of 37 poles have both a stiff shaft and a full-marks lock

```
Freevane Kodiak            $79.00   composite 43   strength 9/9   lock 1/1
BD Alpine Carbon Cork     $229.95   composite 44   strength 9/9   lock 1/1
```

The cheaper one is stiffer, and the 43-vs-44 gap sits inside the instrument's noise floor.
No pole in the field is simultaneously stiff, good-locking, **and** bend-not-break — that
three-way gap is why the household split carbon (Jed) / aluminum (son).

---

## ⚠️ THE CAVEAT THAT BOUNDS ALL OF IT

**No instrumented ultimate-load, fatigue, or cold-temperature test exists for any pole in this
shortlist at any price.** The entire quantitative backbone is one non-destructive *elastic
deflection* dataset (n = 1 pair per pole, one tester) whose own disclaimer states it
*"does not address sudden forces"* — the only load that has broken any pole in this evidence base.

**Every "strength" score in this market, including the ones this audit rests on, is a stiffness
proxy wearing a strength label.** Nobody has ever tested a lock wet or grit-fouled under load
either, which is the #1 documented real-world failure mode.

---

## FILES

| File | What it is |
|---|---|
| [`synthesis.md`](synthesis.md) | **Start here.** Full decision document — price curve, ranked lineup, aluminum verdict, video evidence, confidence and gaps (82 KB) |
| [`judge-ruling.md`](judge-ruling.md) | Pareto frontier computation, correlations, noise-floor derivation, wall-thickness inversions (29 KB) |
| [`adversarial-findings.md`](adversarial-findings.md) | Three adversarial lenses — load mechanics, materials, evidence quality — attempting to disqualify each finalist (179 KB) |
| [`dossiers.json`](dossiers.json) | Raw per-pole research dossiers, 13 poles (716 KB) |
| [`video-evidence.md`](video-evidence.md) | goHUNT destructive-test analysis, and the verified `yt-dlp` transcript retrieval method |
| [`data/`](data/) | **Alan Dixon's raw 37-pole dataset** — the quantitative backbone. See its README for the metric-direction trap |
| [`artifacts/market-audit.html`](artifacts/market-audit.html) | Whole-market visualization (83 poles) |
| [`artifacts/budget-audit.html`](artifacts/budget-audit.html) | Earlier $40–70 budget visualization (57 poles) |
| [`prior-budget-audit/`](prior-budget-audit/) | First audit, superseded but retained — it established the two-failure-mode framework |

**Published visualizations** (private artifacts):
- Whole market: https://claude.ai/code/artifact/06542c32-c33d-480d-970b-89da83748580
- Budget band: https://claude.ai/code/artifact/15dfcbeb-dc8f-4a1f-94b2-d4590d5740a7

---

## KNOWN ERRORS CORRECTED DURING THIS WORK

Recorded so they are not silently reintroduced.

| Error | Correction |
|---|---|
| "YouTube transcripts are gated / unavailable" | **Wrong.** Three failed methods were over-generalized to the platform. `yt-dlp` works and was already installed; 23 transcripts were retrieved and spot-verified against raw VTT |
| goHUNT load test called "best evidence in the audit" | Its **rig failed mid-test** — *"our zip tie broke that was holding the weight onto the pole"* — so absolute load figures are untrustworthy |
| Field-average composite of **145** | Actually **141.4** (median 118.0); str×weight is 29,928 not 30,807. *Nine of ten research passes propagated the wrong figure* |
| "Adventure Alan has NOT tested the Paria Tri-Fold" (scored 7/10 on that premise) | He did. It measures **4/9** — the weakest carbon on that shortlist |
| Cascade Carbon Quick Lock recommended partly for repairability | Its $12.99 lower section is **sold out with a ~3-month wait** |
| CMT Folding Aluminum floated as a strong talus-end performer | Withdrawn: flaw note reads *"Very loose upper joint"*, and its 114 cm floor is above the son's working length |

---

## PROTOCOL FOR THE POLES WE OWN

Every lever-lock pole in this audit, including the $230 Black Diamond, is documented shipping
**under-tensioned**. The Kodiak in particular has **zero replacement parts available** and its
"Lifetime Warranty" explicitly excludes *pole breakage*.

1. Before the trip, tension every clamp past the point of easy closure. Verify by leaning full
   body weight on each pole. **Re-verify after 24 hours.**
2. **Blue Loctite** on every adjuster bolt — factory threadlocker wears and the bolt backs off.
3. **Sharpie the set position** on each shaft as a free creep-detection check.
4. Re-check at every break **and after every stream crossing** — wet grit kills clamp friction,
   and nobody has ever tested for it. Wipe lower shafts before collapsing.
5. Two rules for the kids: **never lever a planted pole sideways** (the mechanism behind every
   documented snap in this corpus), and never extend past the stop mark.
6. Carry a splint sleeve and a spare pole.

---

## METHOD

**Audit 1 — budget band ($40–70).** 5 discovery sweeps → 57 poles → 9 dossiers → 2 adversarial
lenses → synthesis. 17 agents, 1,104 tool calls.

**Audit 2 — whole market, unbounded price.** 6 discovery sweeps (flagship carbon, cottage/
ultralight, mountaineering and heavy-duty aluminum, YouTube rankings, YouTube destructive tests,
quantitative datasets) → 83 poles → 13 dossiers → 3 adversarial lenses → judge → synthesis.
25 agents, 1,166 tool calls, 25 video sources, 23 transcripts.

Prices and stock verified **2026-07-26** and will drift.
