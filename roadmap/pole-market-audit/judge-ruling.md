# JUDGE'S VERDICT — Where the Strength-per-Dollar Curve Flattens

**Method note:** I re-pulled Alan Dixon's primary spreadsheet directly (`docs.google.com/spreadsheets/d/1FQQJRsfqRk92z6XiWlIix6oFVK08sfy_LPJ1WFJ-Q9E`, tabs gid=0 Specs, gid=756885406 Deflection, gid=1247856815 Locks) and recomputed every number below from the raw CSVs rather than inheriting them. **LOWER COMPOSITE = STIFFER.** Two corrections to the brief's "established findings": the true field average composite is **141.4** (median 118.0), not 145, and field average strength×weight is **29,928** (median 27,864), not 30,807. No ranking changes; recorded for honesty.

---

## 1. THE PRICE-VS-STRENGTH CURVE

Two stiffness metrics matter and they say different things. **Mid-span** (16 kg hung at centre) is what everyone quotes. **Tip-clamped** (tip fixed, 2.25 kg at the handle) is the one that matters for your trip — it loads the *lower* shaft, which is the end that wedges in talus, and it is where every documented pole failure in this audit occurred.

| Price band | n | Best measured stiffness available | Best tip-clamped (talus end) | Best lock hardware available | What the marginal dollar buys vs. band below |
|---|---|---|---|---|---|
| **≤$60** | 2 | **TrailBuddy 76** ($55, 7075-T6 **aluminum**) | **CMT Folding Alum. 13.80** ($50) — 2nd best in all 37 | **None scores 1/1.** All plastic or unscored levers | — (baseline) |
| **$61–80** | 8 | **Freevane Kodiak 43** ($79) — **#1 of 37** | **Kodiak 11.75** — **#1 of 37** | **Kodiak 1/1** (metal external lever, tool-free knob) | **THE ONLY BAND WHERE MONEY BUYS STRENGTH.** $29 more than TrailBuddy buys 52 composite points AND the first 1/1 lock in the field. ≈$0.56 per composite point. |
| **$81–120** | 1 | Freevane Panther 101 ($90) | Panther 18.50 | Panther 1/1 | **NEGATIVE.** +$11 buys 58 points *worse*. Folding architecture, 14 mm centre. |
| **$121–170** | 4 | GrassSticks 62 ($119.95 base; sheet lists $144 configured) | GrassSticks 16.80 | BD Distance FLZ Alum. 1/1 (furniture 7/7, highest in field) — but composite 135 | **NEGATIVE on stiffness.** Best in band is still 19 points worse than the $79 pole. What you buy: zero-slip-by-design (GrassSticks) or best-in-field lock furniture (BD FLZ Alum). |
| **$171–200** | 7 | Durston Iceline 73 ($199) | Iceline 15.30 | MSR Ascent 1/1, Leki SkyTera 1/1 | **NEGATIVE.** $120 more than the Kodiak buys 30 points worse. Band spread 73→434. |
| **$201–240** | 6 | **BD Alpine Carbon Cork 44** ($230) | BD ACC 14.00 | **BD ACC 1/1** + ~25 owner-years of zero-slip evidence | **ZERO stiffness.** 44 vs 43 for +$151. What you actually buy: $15 replacement sections, in-stock availability, and the only long-term lock record in the market. |
| **$241–300** | 6 | Komperdell Ultra Zero 91 ($250) | Leki Black Series FX 18.00 ($250) | Komperdell UZ 1/1 (forged aluminium) | **STRONGLY NEGATIVE.** Best in band is 48 points worse than the $79 pole. Band spread 91→317 (Leki Hemp.one $280 = 2nd floppiest pole tested). |

### The knee, quantified

I computed the **Pareto frontier** — the set of poles that are the stiffest available at their price or below. It is four poles long and it **terminates at $79**:

```
$50  CMT Folding Aluminum   composite 95
$55  TrailBuddy (7075-T6)   composite 76
$65  CMT Carbon UL          composite 71
$79  Freevane Kodiak        composite 43   ← FRONTIER ENDS HERE
```

**Nothing priced $80–$300 is stiffer than a $79 pole.** On tip-clamped deflection the frontier is only *two* poles long — $50 CMT Folding Aluminum (13.80), then $79 Kodiak (11.75) — and it also terminates at $79.

**The knee is at $79.90.** Marginal stiffness per dollar:

- **$50 → $79:** −52 composite points for $29 = **$0.56 per point of improvement**
- **$79 → $230:** −(−1) points for $151 = **infinite cost, zero gain** (44 vs 43 is a tie, see below)
- **$79 → $300:** **+48 points *worse* for $220**

And the 44-vs-43 "tie" is real, not rhetorical. **I established the instrument's noise floor from Dixon's own data:** his well-used CMT pair measured **5.5 cm** at mid-span versus **6.0 cm** new. Wear cannot stiffen a shaft, so there is ≥0.5 cm of noise/sample variation in that rig — which is exactly the entire BD-over-Kodiak margin (3.5 vs 4.0). The top of the field (3.5 / 4.0 / 4.5 / 5.0) is **not separable**. The tip-clamped spread (11.75 / 14.00 / 16.80 / 20.00 / 22.00) **is**.

**Above $79.90, money buys lock hardware, parts channels, warranty service, and 1–4 oz. It does not buy shaft strength. That is the single most valuable finding in this audit.**

---

## 2. DOES THE TWO-FAILURE-MODE TRADEOFF DISSOLVE AT HIGHER PRICE?

**It dissolves at $79.90 — but only in the weaker sense. In the strict sense you asked for, it never dissolves at any price except by giving up adjustability.**

I ran the exact query. Poles in all 37 with **both** a top-quartile shaft (Dixon strength sub-score ≥8/9) **and** a full-marks lock (1/1):

```
Freevane Kodiak Telescoping    $79.00   composite 43   strength 9/9   lock 1/1
Black Diamond Alpine Carbon Cork  $230.00   composite 44   strength 9/9   lock 1/1
```

**Two poles. Out of thirty-seven. The cheaper one is stiffer.** So on the ordinary reading — "does enough money buy both a stiff shaft and a good lock" — **yes, and the price is $79.90, not $300.** The $230 BD is the same answer for $151 more.

**But you asked something sharper: a lock that holds BY DESIGN rather than BY MAINTENANCE.** Neither of those two qualifies. Both are friction clamps, and both are documented shipping **under-tensioned**:

- BD ACC, Patman (Trailspace): *"These were quite loose out of the box and I had to turn the adjustment screw a little more than a quarter turn to achieve sufficient tension. If you leave them too loose the poles will slip under pressure."*
- Kodiak: only n=1 evidence over two nights on tension retention. Nothing longer exists.

Three poles in the entire field hold **by design** — zero or non-friction joints:

| Pole | Joints | Shaft | Price | What it costs you |
|---|---|---|---|---|
| **GrassSticks Bamboo** | **ZERO friction joints.** One continuous culm. Slip is *structurally impossible* | **composite 62, rank 3/37, strength 9/9** | **$119.95** | Fixed length. 22.1 oz/pair (2nd heaviest of 37) |
| Komperdell Carbon FXP Team | Zero friction joints, mechanical latch | composite 103, rank 16/37 | $147.73 liq. | Fixed length, day-2 unprovoked snap on record, discontinued, Dixon penalised the latch twice |
| MSR DynaLock Ascent Carbon | **ONE** friction joint; lower 80% on a positive ball detent | composite 118, rank 19/37 | $189.95 | Below-median shaft; no sections or tips sold |

**The answer to your literal question: the only pole in 37 that delivers a top-quartile measured shaft AND a lock that cannot slip by design is the GrassSticks Bamboo Trekking Sticks at $119.95.** It is rank 3 of 37 on stiffness, has the **fattest centre shaft in the entire field (18 mm — nothing else reaches 18)** and the 2nd fattest tip zone (15 mm vs BD's 10.5), and it achieves that with a material 4–7× *less* stiff than carbon or aluminum — pure wall thickness winning over material.

**And it is disqualified for your trip anyway, on operations rather than strength.** Fixed length cannot serve adults plus 12–17-year-olds who share poles, shorten for climbs, lengthen for loaded descents, and are still growing. The "grow with your poles" re-cut program caps at 42 in / 107 cm — it serves a 10-year-old, not a 15-year-old, and re-cutting only shortens. Zero slip risk bought with zero adaptability is the wrong trade here.

**So: the tradeoff dissolves at $79.90 if you accept a maintenance protocol. It never dissolves in an adjustable pole at any price. That is a genuine gap in the market, not a budget problem.**

---

## 3. DOES ANYTHING BEAT THE INCUMBENT?

Incumbent: **CMT Carbon Fiber Quick Lock, $59.99–64.99, composite 87 (rank 9/37).**

| Tier | Beats it? | Pole | Evidence |
|---|---|---|---|
| **Under $60** | **NO — but closer than expected** | TrailBuddy $55 (76), CMT Folding Aluminum $50 (95) | TrailBuddy is measurably **stiffer** (76 vs 87) at $10 less, and CMT Folding Aluminum's tip-clamped 13.80 is **2nd best in all 37**, beating even the $230 BD's 14.00. Both score **Locks 0/1**, so neither fixes your #1 fear. Not a win overall. |
| **$60–100** | **YES, decisively** | **Freevane Kodiak, $79.90** | 50% stiffer at mid-span (4.0 vs 6.0), **30% stiffer at the talus end (11.75 vs 16.80)**, same 2 friction joints, **metal** lever vs CMT's plastic, **Locks 1/1** vs CMT's 0/1, tensioned by bare thumb vs a thumbscrew whose prescribed use cracks the ferrule, and a **published 1.0 mm wall** — the only wall figure in the audit, which I validated independently by mass balance (implied 0.94–1.13 mm). Fattest lower section of any stiff pole at 12.5 mm. |
| **$100–170** | **NO** | GrassSticks $119.95 (62) is stiffer and slip-proof, but fixed-length disqualifies it for a mixed-age group. Nothing else in band beats 87 except GrassSticks. | Best lock furniture in the field (BD Distance FLZ Aluminum, 7/7) comes attached to composite 135 — worse than the incumbent. |
| **$170–200** | **NO** | Iceline 73 is stiffer but its designer excludes your use case in writing: *"these are not the ideal poles for rugged conditions"*; 20+ broken poles across ~11 owners. MSR Ascent 118 and Leki SkyTera 128 are both **worse** than the $60 incumbent. | |
| **$200–240** | **YES, on lock evidence only** | **BD Alpine Carbon Cork, $229.95** | Stiffness is a tie with the Kodiak within noise. What it actually beats the incumbent on: ~**25 owner-years of documented zero lock slip** (Skurka 9 yr / ~450 days / 1,000+ mi of talus: *"do not slip, wiggle, or corrode"*; Dixie 8 yr PCT+CDT: *"I have never had to tighten the lever locks"*), forged-aluminium lever, and **$14.99 replacement lower sections** that are actually obtainable. |
| **$240–300** | **NO — the money makes it worse** | Komperdell Ultra Zero $299.95 (91) and Komperdell FXP Team $270 (103) are both **less stiff than the $60 incumbent**. Leki Hemp.one $280 is composite 317. | Ultra Zero also has **the worst stiffness asymmetry of all 37 poles** — tip/handle ratio 1.95 vs field median 1.27 — so it is top-decile at the end you hold and **below median (rank 21/37) at the end that hits rock**. Komperdell's own Summit Carbon uses *"Titanal aluminum lower sections"* because the lower carbon shaft is the known failure zone; this pole is 100% carbon to the tip. |

**Verdict on the incumbency: it loses, and it loses cheaply.** The CMT's shaft is genuinely good value (only 8 of 37 stiffer, beating 16 poles priced $190–280). But it fails on the axis you named first, and it fails with the manufacturer's own admission — CMT's top trekking-pole FAQ is literally *"The lock on my pole isn't holding, so my pole is slipping,"* conceding *"the sections may slip"* and instructing owners to *"Periodically, check your quick locks."* OutdoorGearLab (May 2026, 15–16th of 19) found it *"frequently collapsed when weighted, even with day packs"* and concluded it is *"better suited for casual hikes than a reliable option for rugged conditions."* Worse, the prescribed fix is self-defeating: maximum clamp force is exactly what cracked 3 of Skurka's 4 plastic ferrules.

**And it is measured degrading.** Dixon tested a new *and* a well-used pair — the only quantitative measurement of lock-system wear that exists anywhere. Tip-clamped grew **16.75 → 22.25 cm (+33%)**, handle-clamped only +12%, mid-span not at all. **The carbon is fine; the clamp system is what wears**, and worst at the joint furthest from the grip. A well-used CMT at the talus end (22.25) is floppier than the $300 Komperdell.

**$15–20 more buys you out of all of it.**

---

## 4. THE ALUMINUM VERDICT — SETTLED

**Your bending aversion should NOT transfer to a modern 7075-T6 pole at 18 mm — and the mechanism explains exactly why, and exactly which poles are still the pole you threw away.**

**The physics.** Young's modulus is essentially **constant** across every aluminum alloy: 6063 = 68.9 GPa, 6061 = 69 GPa, 7075-T6 = 71.7 GPa — a 4% spread. **So alloy and heat-treat do not make aluminum stiffer. Only diameter and wall do.** What alloy buys is **yield strength** — the load at which flex stops springing back and becomes the permanent set you hate: 7075-T6 yields at **430–480 MPa** vs 6061-T6 at 240–270 and commodity 6063-T5 at ~97. That is ~1.8× over 6061 and **~4.5–5× over the extrusion alloy most plausible in a 20-year-old sub-$20 pole** — before you multiply by fat geometry. A modern 7075-T6 18/16/14 shaft plausibly carries **4–10× the yield moment** of your Walmart pole.

**Your two complaints were two different products, and both are separately solved.** "Slides" was a plastic internal twist-expander — the worst lock mechanism ever sold. "Bends" was a low-yield, thin-wall, small-diameter shaft. Neither is a property of aluminum.

**The corollary that should change how you shop: "7075" ON A BOX IS NOT A STRENGTH CLAIM.** In Dixon's data 7075 appears at composite 76, 95, *and* 135 — a 1.8× spread inside one alloy designation. In aluminum, the honest proxy for wall thickness is **weight**, and I confirmed it quantitatively: TrailBuddy and Fizan share the same 16 mm centre and the same material class, TrailBuddy is **1.74× heavier** and measures **1.70× stiffer** — agreement to 2.3%. **At fixed diameter, aluminum stiffness scales linearly with mass. A light aluminum pole is a weak aluminum pole and no alloy fixes it.**

### Poles that would NOT bend on you

| Pole | Price | Measured | Why |
|---|---|---|---|
| **TrailBuddy Lightweight (7075-T6)** | **$55** | **composite 76 = 6th stiffest of 37**, strength 8/9 | 18/16/14, **16 mm centre**, **12.5 mm above the tip** (tied with the Kodiak, *fatter* than the $230 BD's 10.5). Out-measures **every single pole priced $190–$280**. This is the pole that settles the question. |
| **CMT Folding Aluminum (7075)** | $50 | composite 95, **tip-clamped 13.80 = 2nd best in all 37** | Beats the $230 BD at the talus end. 14 mm centre is the limit. |
| **MSR DynaLock Explore (7075-T6 lowers)** | $119.95 | *unmeasured* | Documented bend-and-recover on your exact scenario (below). Note the alloy claim is **partial** — MSR's bullet says *"7075 aluminum **lower** sections"*, leaving the upper (largest-diameter, highest-moment tube) as unspecified "aluminum alloy." |

### Poles that WOULD bend on you — these are your Walmart pole in modern packaging

| Pole | Price | Measured | Why |
|---|---|---|---|
| **Fizan Aluminum Ultralight** | $70 | **composite 216**, 3rd floppiest tested, **Locks −1/1** | 16 mm centre but implied wall ~0.40–0.50 mm vs TrailBuddy's ~0.86–0.96. Floppy *and* a penalised lock. This is literally your old pole. |
| **LEKI Legacy Lite (HTS 6.0)** | $109.95 | **not in the dataset at all** | 14 mm centre (fails the 16 mm pattern every stiff pole shares), **12 mm lower — thinnest load-bearing tube of any finalist**, wall unpublished. An REI owner **of your build** (175–200 lb, 6'2") got a **permanent 30° bend in the lower section on his FIRST OUTING** at *"very little torque when they got briefly stuck."* Two independent outlets converge: CleverHiker *"a significant amount of bend, even for an aluminum pole"*; OutdoorGearLab *"we noticed some bending in the aluminum during our lean tests."* And LEKI's own rep confirms HTS 6.0 shafts *"don't spend as much time in the oven"* — it is the **weaker** rung of their ladder. |
| **REI Trailmade (7065)** | — | composite 180 | 7000-series designation, floppy pole. |
| **Montem Ultra Strong (7075)** | $75 | composite 161 | Named "Ultra Strong," measures 27th of 37. |

### Two authorities agree with this conclusion, against your instinct

- **The tester you already trust scores bending as a FEATURE.** Dixon's Locks tab awards an explicit **+1 bonus captioned verbatim `"aluminum durability bend-not-break"`** — to every aluminum pole in the field and to **no** carbon pole. On BD's Distance FLZ Aluminum that bonus produces the **highest furniture score of all 37 poles (7/7)**.
- **LEKI's own warranty is the manufacturer's revealed preference:** *"our carbon shafts have a one year warranty for breakage; all of our aluminum shafts have a **lifetime** warranty for breakage."* The company that makes both prices carbon's breakage risk at 12 months and aluminum's at forever.

### The consequence argument, which matters more than probability with teenagers along

Every documented carbon failure in this entire audit is a **snap at the lower section triggered by a wedged tip plus lateral bodyweight** — your exact terrain and mechanism — and **none is field-repairable**. Carbon shards are a documented impalement hazard: two near-impalements on scree, one from the BD's own biggest advocate (*"I kind of did impal myself"*).

Contrast the best single datapoint in the audit, on the MSR DynaLock Explore, in Oregon, on camera: *"I got it kind of hung up and wedged in between a couple of rocks and when I did I kind of slipped and fell forward and it bent one of these... all I had to do was just kind of reform it back and I got it back into shape and it was super easy piece of cake and I was back in action. I really think... the carbon poles would have broke."*

**Ranked by trip-survivability, the order inverts the price list:** bamboo split (tapes, walks out) > aluminum bend (straightens by hand, walks out) > telescoping carbon snap (recoverable as a *shortened* pole — an AT thru-hiker did exactly this mid-trail) > folding carbon snap (scrap).

**One more thing carbon does not buy you.** I recovered the wall thicknesses everyone called unobtainable by inverting measured mass against measured OD and material density, then back-computed effective flexural modulus. Every carbon finalist lands at **47–81 GPa — at or below 7075-T6's 71.7 GPa**, except the Kodiak at ~81 (1.13×). The BD Alpine Carbon Cork, stiffest of 37, computes to **~73 GPa — statistically identical to aluminum.** It wins on having the **thickest wall in the set (~1.29–1.50 mm)**, not on material. (The CMT incumbent computes to ~47 GPa — a third *below* aluminum — with *more* wall than the Kodiak at identical 18/16/14 diameters. That is the quantitative substance behind the "it's actually fiberglass" allegation nobody could confirm; ~47 GPa is precisely where a glass or glass/carbon hybrid laminate sits. *Inference on assumed hardware mass, ±0.2 mm; rank ordering robust, absolutes are not.*)

Since carbon is 43% less dense, **its real advantage is stiffness per gram — and you have said you don't care about weight.** On your own stated axis, carbon buys you almost nothing while substituting a failure you cannot walk out on for one you can.

---

## 5. THE THREE POLES I WOULD PUT IN YOUR HANDS

### 1. Freevane Kodiak Telescoping Carbon (3K) — **$79.90/pair** — THE STRENGTH PICK

**Buy this, and buy a SECOND PAIR as your spare.**

- **#1 of 37 on composite (43) and #1 of 37 on strength-per-gram (8,883 vs 29,928 field avg).** #1 of 37 on tip-clamped (11.75) — the talus metric. Strength 9/9.
- **Fattest lower section of any stiff pole: 12.5 mm above the tip** vs BD 10.5, CMT 12.0, Gossamer LT5 10.5, Komperdell UZ 10.5. That is precisely the zone that snaps when a tip wedges, and it is the most under-reported fact in this market.
- **Metal external lever, Locks 1/1, only 2 friction joints, and tension adjustable with BARE FINGERS** — vendor on camera: *"just twist the tension knob clockwise to tighten it."* A 12-year-old can re-tension their own pole at a rest stop with no hex key to lose in scree. The $230 BD cannot do that.
- **The only pole in the audit that publishes wall thickness (~1.0 mm)** — and I validated it independently by mass balance (implied 0.94–1.13 mm). Best back-computed material of the set (~81 GPa).
- **63–135 cm fits a 12-year-old through a tall adult on one SKU.**

**What you are accepting, stated plainly:** ~**8 traceable owners**, all within months of a late-2025 launch, on a partly templated vendor review corpus. **Zero replacement parts of any kind** — I checked all 40 catalog SKUs. The advertised "Lifetime Warranty" names **"pole breakage"** as an explicit exclusion (freevane.com/pages/warranty), so it covers the pole *arriving* broken, not the pole breaking. **It currently reads "Sold out" on the vendor page**; Amazon has had ~20 units with delivery slipping into August. **Because no spares exist, buy a second pair rather than spare parts** — two pairs still undercut one BD pair, and carry a splint sleeve.

### 2. Black Diamond Alpine Carbon Cork — **$229.95/pair** — THE CONFIDENCE PICK

**Buy this instead if you want a track record rather than a measurement, and if $150 for a parts channel is worth it to you.**

- **Stiffest mid-span of all 37 (3.5 cm)**, composite 44, strength 9/9 — a statistical tie with the Kodiak, not a win over it.
- **The only pole where "the lock holds" is an empirical fact rather than an architectural argument:** ~25 owner-years across Skurka (9 yr, ~450 days, 1,000+ mi of talus and scree), Dixie (8 yr, PCT + CDT), and an owner who runs an actual Sharpie creep-check protocol and reports *"Never a failure."* Forged-aluminium lever, plastic cover deleted on the current generation.
- **$14.99 replacement lower sections**, plus four owners confirming BD supplies sections cheaply or free by phone even out of warranty. A snapped section on a telescoping pole is also **recoverable in the field as a shortened working pole**.
- **In stock at REI at $229.95** while BD direct is sold out.

**What you are accepting:** it **snaps, into sharp shards**, at the thinnest tip zone in the field (10.5 mm) — and the single most decision-relevant report in this entire audit is against it, on your exact terrain: *"descending a High Sierra peak, and hopping through a talus field, the tip of one pole got wedged between two boulders, and I tumbled forward a little bit, and snapped the bottom section."* Another broke at a **stream crossing after four days**. The warranty is **2 years, defects only** — one owner was refused on a snap at under six months. And the current generation needs a **small loose hex key** no multitool carries; BD solved that on its *cheaper* Pursuit with an integrated shaft tool.

**Pre-trip, non-negotiable if you buy these:** pre-tension all four clamps past easy closure, put blue Loctite on the four adjuster bolts (the factory threadlocker wears and the bolt backs off), and tape two hex keys to the shafts.

### 3. TrailBuddy Lightweight 7075-T6 Aluminum — **$55/pair** — THE BEND-NOT-BREAK PICK

**Buy two or three of these for the youth who are hardest on gear, and as the mode-tolerant spare for the group.**

- **Composite 76 = 6th stiffest of 37**, strength 8/9. **18/16/14 with a 16 mm centre and 12.5 mm above the tip.** It out-measures **every pole priced $190–$280 in the dataset**, including the $300 Komperdell, the $270 Komperdell, the $190 MSR and the $195 Gossamer.
- **It is the pole that proves your bend-aversion should not transfer** — modern 7075-T6 at fat geometry is not the object you threw away, and when it does exceed its limit it **bends and keeps walking** rather than shattering.
- $55/pair means a wrecked pole is a $27 problem, and you can afford spares outright.

**What you are accepting, and it is the real cost:** **Locks 0/1** and Handle 0/2 on Dixon's scorecard (furniture total 2/6). This pole has the shaft you want attached to a lock he failed. It is **not** a primary recommendation for a nervous buyer — it is a deliberate purchase of failure-mode tolerance at a price where redundancy is cheap, and **an adult must own the tensioning protocol for it.**

> **If you want the aluminum bend-recovery *with* a properly documented lock and will accept zero stiffness measurement, the named alternative is the MSR DynaLock Explore at $119.95** — anodized aluminium lever, **stainless steel cam** (MSR is the only manufacturer in this audit that specifies the cam material, which is the part that actually bites the tube), tool-free thumbwheel, and MSR **prints the anti-slip protocol in the box**: *"IF NEEDED, ADJUST CLAMPING FORCE TO PREVENT SLIPPAGE. TWIST WHEEL."* It also produced the audit's only positive wet-corrosion account and the bend-and-straighten story above. I do not lead with it because it has **no measured stiffness, no published diameters, no published wall, a partial alloy claim on the tube that matters most**, MSR sells **baskets only** as spares, and it is effectively end-of-life — out of stock at MSR, delisted at REI, one confirmed in-stock retailer. You cannot buy 4–6 pairs of it for August.

---

## WHAT THE MARKET DOES NOT KNOW — AND WHY THAT SHOULD TEMPER ALL OF THE ABOVE

Everything in this report rests on **one non-destructive elastic deflection test, n=1 per pole, by one tester**, whose own disclaimer is that it *"does not address sudden forces"* — which is the only load that has broken any pole in this entire evidence base. Specifically:

- **No instrumented ultimate-load, fatigue, or cold-temperature test exists for ANY pole here at ANY price.** The only true destructive test in existence (goHUNT 2018) covers two poles, neither a finalist, on a discontinued model — and the full transcript, which I re-pulled, shows the **rig failed mid-test** (zip tie broke at 85 lb, tape added to stop the poles sliding, an apparent specimen swap). HowNOT2, which publishes kN pull data and retails BD poles, has never tested a trekking pole.
- **Nobody has ever tested a lock wet or grit-fouled under load** — which is your #1 documented failure mode. The only measured joint-fouling datum in the whole dataset is Dixon's flaw note on two LEKI *folding* poles: *"Suction from mud opens 5mm gap in joints."* Mud and water attack folding joints, cords and buttons; **no source anywhere reports grit causing an external cam clamp to slip.** For an August trip with repeated stream crossings, the family to avoid is folding/cord/button.
- **Wall thickness is unpublished for eight of ten finalists.** Freevane publishes it. Black Diamond, Komperdell, MSR, LEKI and CMT do not.
- **There is a span confound I could not close:** deflection scales as L³ and Dixon does not publish per-pole test length. Fixed poles were tested at 125–130 cm while adjustables span 59–158 cm. If lengths were not normalised, composite gaps under ~30% are inside the noise — which is another reason to read 43-vs-44 as a tie, and means the GrassSticks, tested at the long end, is if anything *under*-credited.
- **Price buys the absence of evidence, not its presence.** The $300 Komperdell has zero failure reports, zero video and "No reviews" — because nobody owns it. The $65 CMT has ~16 named failure reports because it is the only pole in this set anyone has actually used hard. The cheap pole looks worse partly for that reason.

**The two tests that would settle this market** — and neither has ever been run — are (1) an eccentric tip-load-to-failure rig (tip wedged, lateral bodyweight applied), instrumented, n≥5, on the three candidate lower sections: BD's 10.5 mm carbon, the Kodiak's 12.5 mm carbon, and TrailBuddy's 12.5 mm 7075; and (2) a lock-creep protocol measuring section migration in millimetres under cycled bodyweight, wet and grit-fouled. Until (1) exists, **every "strength" score in this market — including Dixon's excellent ones — is a stiffness proxy wearing a strength label.**

---

## THE PROTOCOL, WHICHEVER YOU BUY

Every lever-lock pole in this audit, **including the $230 BD**, is documented shipping under-tensioned. So:

1. **At home, before the trip:** tension every clamp on every pole past the point of easy closure. Verify by leaning your full weight on each pole. Re-verify after 24 hours.
2. **Blue Loctite** on every adjuster bolt (the BD's factory threadlocker demonstrably wears and the bolt backs off).
3. **Sharpie the set position** on each shaft — this is a real owner's creep-detection protocol and it is free.
4. **Re-check at every break and after every stream crossing.** Wipe lower shafts before collapsing; grit travels up the tube.
5. **Teach the youth two rules:** never lever a planted pole sideways (that is the mechanism behind every documented snap in this audit), and never extend past the stop mark (that is how a metal shaft gets destroyed at the lock).
6. **Carry a splint sleeve and a spare pole.** The Kodiak has no spare parts at all; the BD's $15 lower section must be ordered before you leave.

**The only pole in this field that needs none of that is the one you cannot adjust.**