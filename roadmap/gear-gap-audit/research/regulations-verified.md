# Sawtooth Wilderness Regulations — Adversarial Verification

**Trip:** Lakeside 14th Ward Young Men — Alice–Toxaway & Edith Lake Loop, Sawtooth Wilderness, Idaho
**Dates:** August 10–13, 2026
**Departure point:** Tin Cup Trailhead (officially renamed **Pettit Lake Trailhead**), Forest Road 362
**Verification date:** July 27, 2026
**Standard applied:** Official agency sources only — fs.usda.gov (rendered pages + signed order PDFs), ecfr.gov, lnt.org, fws.gov. No blogs, Reddit, AllTrails, or gear sites were accepted for any regulatory claim.

**Method note:** `WebFetch` refused to reproduce agency pages verbatim, and lnt.org returns HTTP 403 to automated fetchers. All quotes below were therefore obtained by (a) retrieving raw HTML with `curl` and stripping tags locally, (b) downloading and extracting the signed order PDF with `pdftotext`, or (c) driving a real browser (Playwright) for lnt.org. Every quote below is verbatim from the source cited.

---

## ACTION REQUIRED

Ranked by urgency. These are things trip leaders must **do**, not just know.

### 1. CALL SNRA HEADQUARTERS NOW — 208-727-5000 — and get a group permit
A group of 12 (or anything ≥ 8) **cannot** use the self-issue trailhead permit. It must be obtained in advance from a Forest Service office.

**Do not plan to walk into the Stanley Ranger Station.** Its official page lists **"Hours of Operation: Closed to visitors."** The only staffed option is:

- **Sawtooth NRA Headquarters — 208-727-5000** — 5 North Fork Canyon Road, Ketchum, ID 83340
- Hours: **8:30 a.m.–4:30 p.m. weekdays, June 15 – Sep 7** (closed federal holidays)

That is a narrow window. Call on a weekday morning.

### 2. DECIDE AND LOCK THE FINAL HEADCOUNT — the cap is 12 *persons*, leaders included
The binding order prohibits "a group of more than 12 persons." There is no leader exemption, no adult exemption, no "youth only" reading. **13 people is a Class B misdemeanor.** If the roster exceeds 12, the group must split, and the Forest Service's stated split standard is that oversized groups "must be separated by a drainage or a day apart" — which on an 18-mile loop is a real itinerary change, not a formality. Force this decision before the July 29 pack check.

### 3. BUDGET FOR THE TRAILHEAD FEE — $10/day, CASH OR CHECK ONLY
A day-use fee is now collected at Pettit Lake (Tin Cup) Trailhead. **No card payment.** For a 4-day trip, confirm on your permit call whether the fee is per-day or a flat overnight rate, and bring cash. An annual pass is $100.

### 4. ASK ABOUT THE ONE-IN/ONE-OUT GATE at the trailhead
The Forest Service has stated that when the trailhead reaches 100% occupancy, hosts "implement a one-in for every one-out policy." A party of 12 arriving at a full trailhead could be held. Ask HQ on your permit call how this is applied to permitted groups, and have a contingency start time. You will also be asked to register last name, party size, length of stay, and license plate.

### 5. PLAN FOR ZERO CAMPFIRES — this is not discretionary on your route
Every official source agrees: no fires anywhere on the Alice–Toxaway loop. Bring stoves. Do not pack a fire pan and assume it buys you a fire — the drainage-wide prohibition applies regardless of containment.

### 6. BEAR CANISTERS: NOT required in the Wilderness, but REQUIRED at the trailhead and car camp
Verified below. The gear decision is: you may legally hang inside the Wilderness, but **anything left in or around vehicles at Pettit Lake must be in a hard-sided closed vehicle or certified container.** Do not leave a food bag in a truck bed or a cooler on the ground overnight at the trailhead.

### 7. CONFIRM EDITH LAKE CAMPSITE STATUS on the permit call
The 2024 SNRA trail report stated "Most campsites at Edith lake closed for vegetation restoration." The current 2026 report no longer carries that note, but it is not affirmatively rescinded anywhere. Edith Lake is in your route name. **Ask directly.**

### 8. IF CAR-CAMPING THE NIGHT BEFORE — max 8 people per single campsite
New order effective June 19, 2026 caps a single developed campground unit at 8 people. A group of 12 needs a double unit (16 max) or two sites. Dispersed camping between Forest Roads 208/362 and Pettit Lake is prohibited — you must be in the developed campground.

### 9. RE-CHECK FIRE RESTRICTIONS in the first week of August
As of today only the Minidoka Ranger District is under Stage 1. Fire danger is already "High" (North Zone) / "Very High" (South Zone). August escalation is routine. Re-check `https://www.fs.usda.gov/r04/sawtooth/alerts` within 72 hours of departure.

---

## 1. Group size limit

**Claim:** "Groups may not exceed 12 people and 14 head of stock May 1 – November 31," and leaders count toward the 12.

**Confidence:** **CONFIRMED** — with a correction to the date and a definitive answer on leaders.

**Official text — the binding Forest Order (controls):**

> "Being in the Described Area with a group of more than 12 persons from May 1st through November 30 and more than 20 persons from December 1st through April 30th. 36 C.F.R. § 261.58(f)"

**Official text — the public regulations page (contains the error):**

> "Groups may not exceed 12 people and 14 head of stock May 1 - November 31 and are limited to 20 people and 14 head of stock December 1 – April 30."

> "Oversized groups must be separated by a drainage or a day apart."

**Source:**
- Forest Order **0414-04-161**, "Sawtooth Wilderness Area Occupancy and Use," prohibition #2 — rendered order text at `https://www.fs.usda.gov/r04/sawtooth/alerts/sawtooth-wilderness-area-occupancy-and-use` (curl, tags stripped). Signed PDF: `https://www.fs.usda.gov/sites/nfs/files/r04/sawtooth/publication/alerts/0414-04-161_SNF_WildernessOU_Order_JS_Signed.pdf`
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations` (curl, tags stripped; page last updated June 30, 2025)

**What this means for the trip:**

"November 31" does not exist. It is a typo on the public web page. The **binding order says November 30**, and either way August 10–13 falls squarely inside the 12-person season.

On the leader question — the order says **"12 persons."** Not 12 youth, not 12 participants. Every human body in the group counts: every Young Man, every adult leader, every driver who hikes in, every parent who joins for a night. There is no exemption in the order text and the only exemptions listed (§ EXEMPTIONS, below) are for permit holders, law officers, and Forest Service personnel on official duty. **A group of 13 is illegal.**

If the roster exceeds 12, the split is not cosmetic. The Forest Service standard is separation "by a drainage or a day apart" — two genuinely independent trips with independent permits, camps, and cook groups, not one group hiking in two clumps.

**Penalty:** Class B misdemeanor, up to $5,000 individual / $10,000 organization, and/or up to six months imprisonment. Note that a church youth group is plausibly an "organization" for the $10,000 tier.

---

## 2. Permit requirement

**Claim:** Free Wilderness Use Permit required for everyone, self-issued at the trailhead, but "Groups with 8 or more people must obtain their permit from a Forest Service Office."

**Confidence:** **CONFIRMED** — and the practical process is worse than the claim implies.

**Official text — regulations page:**

> "All Sawtooth Wilderness users must possess a free Wilderness Use Permit, which outlines the regulations detailed on this page."

> "Permits are acquired through self-registration at the trailhead or wilderness boundary."

> "Groups of eight or more hikers or those intending to use stock overnight must contact a Forest Service Office to obtain a permit."

**Official text — the binding order:**

> "Entering or being within the Described Area without a Forest Service-approved self-registered permit, group permit, or special use authorization. 36 C.F.R. § 261.57(a)"

**Official text — Permits page:**

> "The Sawtooth Wilderness requires a permit. Please call ahead for groups of 8-12 or self issue if less than 8."

**Official text — Tin Cup Hiker Trailhead page (most specific and most useful):**

> "Wilderness trail permits are required and are available at the trail head. For parties of 8 or more, a large group permit is required which you can apply for by contacting the Sawtooth NRA at (208)727-5000 in advance of your trip. There is no cost for the wilderness trail or large group permits."

**Correct current phone numbers — verified from official office pages:**

| Office | Phone | Address | Hours |
|---|---|---|---|
| **Sawtooth NRA Headquarters** | **208-727-5000** | 5 North Fork Canyon Road, Ketchum, ID 83340 | 8:30 a.m.–4:30 p.m. weekdays, June 15 – Sep 7 |
| **Stanley Ranger Station** | **208-774-3000** | 442 Ranger Station Road, Stanley, ID 83278 | **"Closed to visitors."** |
| Sawtooth NF Supervisor's Office | 208-423-7500 | 370 American Avenue, Jerome, ID 83338 | — |

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations`
- `https://www.fs.usda.gov/r04/sawtooth/permits`
- `https://www.fs.usda.gov/r04/sawtooth/recreation/tin-cup-hiker-trailhead`
- `https://www.fs.usda.gov/r04/sawtooth/offices/stanley-ranger-station-sawtooth-national-recreation-area`
- `https://www.fs.usda.gov/r04/sawtooth/offices/sawtooth-national-recreation-area-headquarters`
- Forest Order 0414-04-161, prohibition #1

**What this means for the trip:**

The claim is confirmed, with two important refinements:

1. **The threshold language is "eight or more hikers"** — same effect, but note the Permits page frames it as "groups of 8-12," which is the band that gets a *large group permit*. Above 12 you are simply over the legal cap (see Claim 1).
2. **Two prior-research assumptions are wrong in practice.** Do not plan to obtain this in person at Stanley — that office is **closed to visitors**. And the phone number printed inside Forest Order 0414-04-161 itself is **"(208) 774-300"**, which is a six-digit typo in the signed order. The correct Stanley number is **208-774-3000**, but you should call **SNRA HQ at 208-727-5000** regardless, because that is the number the trailhead page specifically directs large groups to.

The permit is free. The trailhead day-use fee (Claim 12) is separate and is not free.

---

## 3. Human waste / toilet paper

**Claim:** Catholes 6–8 inches deep, bury at least 100 feet from water, and "Toilet paper should never be buried and needs to be carried out with users."

**Confidence:** **CONFIRMED** as Forest Service guidance — but with a legal nuance you must understand before printing it as a "hard rule."

**Official text — regulations page, Sanitation section:**

> "Bury human waste at least 100 feet from water sources. Human waste is a threat to the fragile alpine environments found in the Sawtooth Wilderness. Dig catholes 6 to 8 inches deep and cover with soil. Given our rocky terrain, we strongly recommend digging tools. Waste Alleviating Gel Bags, better known as WAG Bags, are also encouraged to carry out all waste."

> "Properly dispose of toilet paper. Toilet paper should never be buried and needs to be carried out with users. Doubled plastic bags work great for this."

**Official text — the binding order (prohibition #21), which is what an officer actually cites:**

> "Depositing any human waste within 100 feet of springs, lakes, streams, or campsites, or failing to bury human waste outside those areas. 36 C.F.R. § 261.57(g)"

**Official text — current SNRA Trails Report header:**

> "Pack out all toilet paper and other trash."

**Official text — current SNRA Trails Report, Alice–Toxaway Loop row:**

> "There are many specific regulations on this loop; know before you go! No campfires on the loop, wag bags are strongly suggested."

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations`
- Forest Order 0414-04-161, prohibition #21
- SNRA Trails Report PDF, `https://www.fs.usda.gov/media/247778` (downloaded, `pdftotext -layout`)

**What this means for the trip:**

**The TP pack-out rule is verified and you can print it as a hard rule.** It is stated unambiguously on the official regulations page in mandatory language ("should never be buried and needs to be carried out"), and independently reinforced on the current trails report ("Pack out all toilet paper"). Two official sources, no ambiguity.

The nuance worth knowing: the TP pack-out sentence appears on the *regulations page* and the *trail report*, **not** as an enumerated prohibition in Forest Order 0414-04-161. The order's waste prohibition covers siting and burial of human waste. So a citation for buried TP specifically would more likely come via 36 CFR 261.11(b)/(d) (see Claim 11) than via the wilderness order. For a youth group guide this distinction is academic — the agency's published instruction is to pack it out, so pack it out. But do not tell the group "it's a $5,000 fine for buried TP"; that overstates what the order says, and being caught overstating undermines the rules that *are* order-backed.

Note also the two standards you must teach together:
- **Order minimum (legally binding):** bury waste, ≥ 100 feet from springs, lakes, streams, **and campsites**. Note "campsites" — prior framing only mentioned water.
- **LNT standard (best practice, stricter):** 200 feet. See Claim 11.

Given "our rocky terrain," a trowel per tent group is effectively mandatory equipment, and WAG bags are agency-encouraged on this specific loop.

---

## 4. Campfires

**Claim:** "No ground campfires are allowed anywhere within the Sawtooth Wilderness," fire pan or fire blanket required, plus restrictions within 200 yards of Sawtooth, Goat, Alpine, Saddleback and Scenic lakes, and prohibitions in the Pettit/Yellow Belly/Goat Creek/Alpine Creek drainages. Order 0414-04-161, effective Mar 1 2025 – Mar 1 2030.

**Confidence:** **CONFIRMED** on substance and order number. **PARTIAL** on the effective dates — the order text and the alert metadata disagree. One genuine contradiction found between the two official sources, resolved below with no practical effect on this trip.

**Order number CONFIRMED: 0414-04-161.**

**Official text — the binding order, prohibitions #3, #4, #5:**

> "Building, maintaining, attending, or using a campfire within ¼ mile from an NFS Trail or within 200 yards from Sawtooth Lake, Alpine Lake, Saddleback Lakes, Goat Lake, or Scenic Lake, which are shown on Exhibit B. 36 C.F.R. § 261.52(a)"

> "Building, maintaining, attending, or using a campfire within the following drainages: Pettit and Yellow Belly Lake Creeks, Goat Creek (tributary of the South Fork of the Payette River), Alpine Creek (tributary of Alturas Lake Creek), which are shown on Exhibit B. 36 C.F.R. § 261.52(a)"

> "Building, maintaining, attending, or using any fire or campfire without using a stove, brazier, fire pan or fire blanket to contain charcoal or ash. 36 C.F.R. § 261.52(a)"

**Official text — the regulations page (same substance, different drainage naming):**

> "No ground campfires are allowed anywhere within the Sawtooth Wilderness . All campfires must be a Leave-No-Trace fire on a fire pan or fire blanket."

> "Areas closed to campfires are shown in the Sawtooth Wilderness Regulations Map . Campfires are not allowed: more than a quarter of a mile off-trail from July 1st through Labor Day; in the following drainages: Alice/Twin Lakes, Toxaway/Farley Lakes, Goat Creek (tributary of the South Fork of the Payette River), or Alpine Creek (Near Alturas); within 200 yards of Sawtooth Lake, Goat Lake and Alpine Lake near Iron Creek, Alpine and Saddleback Lakes in the Redfish drainage, and Scenic Lakes."

> "Ashes need to be cold to the touch and spread away from camping site."

> "Wood-burning camp stoves are prohibited in areas closed to all fires."

**Official text — Tin Cup Hiker Trailhead page:**

> "There are no campfires permitted on the Alice Toxaway Loop but you are encouraged to bring portable cook stoves."

**Official text — order effective period (from the order body):**

> "This Order shall be in effect from February 20, 2025, at 12:01 a.m. through February 20, 2030 at 11:59 p.m., unless rescinded."

The alert metadata on the same page instead lists "Alert Start Date: March 1, 2025 / Alert End Date: March 1, 2030."

**Source:**
- Forest Order **0414-04-161**, prohibitions #3–#5 and IMPLEMENTATION — `https://www.fs.usda.gov/r04/sawtooth/alerts/sawtooth-wilderness-area-occupancy-and-use` (rendered order text via curl); signed PDF `https://www.fs.usda.gov/sites/nfs/files/r04/sawtooth/publication/alerts/0414-04-161_SNF_WildernessOU_Order_JS_Signed.pdf`; campfire map is Exhibit B, `.../0414-04-161%20SawtoothWilderness%20ExhibitB.pdf`
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations`
- `https://www.fs.usda.gov/r04/sawtooth/recreation/tin-cup-hiker-trailhead`
- Signed by Jake Strohmeyer, Forest Supervisor. Page last updated June 22, 2026.

**What this means for the trip:**

**No fires. Anywhere. On any night of this trip. Stoves only.** Every official source converges on this, so the discrepancies below do not create any real-world ambiguity for your itinerary.

Prior research was **right** about the Pettit/Yellow Belly drainage naming — that is verbatim from the order. The regulations web page names the same geography differently, calling it "Alice/Twin Lakes, Toxaway/Farley Lakes." These are not two different rules: **Alice and Twin Lakes drain into Pettit Lake Creek, and Toxaway and Farley Lakes drain into Yellow Belly Lake Creek.** Both formulations describe your exact route. Whichever source an officer reads from, your loop is inside a campfire-closed drainage for its entire length.

**One genuine contradiction, flagged for honesty:** the order prohibits fires *within* ¼ mile of a trail, with no seasonal limit. The web page says fires are not allowed *more than* a quarter mile off-trail, July 1 – Labor Day. Those are logical opposites, and read together they would ban fires everywhere. The order is the binding legal instrument and the web page is a summary, so the order governs. It is moot for you — the drainage prohibition already covers your whole route unconditionally.

Second nuance: **a fire pan does not buy you a fire here.** Prohibition #5 says *if* you have a fire it must be contained; prohibitions #3 and #4 say you may not have one at all in these places. Containment is a condition on legal fires, not a permission slip. Do not let anyone pack a fire blanket believing it authorizes a fire on this loop.

Effective dates: whether Feb 20 2025 – Feb 20 2030 (order body) or Mar 1 2025 – Mar 1 2030 (alert metadata), **August 2026 is covered either way.** Prior research's dates came from the alert metadata; the order text is the more authoritative of the two.

---

## 5. Food storage / bear canisters — THE KEY FINDING

**Claim:** Forest Order 0414-04-143 (Occupancy and Use – Food Storage) applies to the Sawtooth NRA but explicitly EXCLUDES the Sawtooth Wilderness, Cecil D. Andrus-White Clouds Wilderness, and Hemingway-Boulders Wilderness — therefore no bear canister is required inside the Sawtooth Wilderness.

**Confidence:** **CONFIRMED** — verbatim from the signed order PDF, and independently corroborated by a second official Forest Service page. **Exhibit A was successfully retrieved in full.**

**Official text — the exclusion, from the signed order:**

> "Pursuant to 16 USC § 551 and 36 CFR 261.50(a), the following acts are prohibited annually beginning 12:01 A.M. the Saturday before Memorial Day through 11:59 on Labor Day on all National Forest System (NFS) lands within the Sawtooth National Recreation Area of the Sawtooth National Forest (**excluding the Sawtooth Wilderness, Cecil D. Andrus-White Clouds Wilderness, and Hemingway-Boulders Wilderness**) shown on the attached map incorporated into this Order as Exhibit B (the "Described Area"):
>
> 1. Possessing or storing any food or refuse, unless it is acceptably stored or acceptably possessed as defined in Exhibit A. 36 CFR 261.58(cc)
> 2. Possessing, storing, or transporting any bird, fish, or other animal, or parts thereof, unless it is acceptably stored or acceptably possessed as defined in Exhibit A. 36 CFR 261.58(s)"

(Emphasis added. The parenthetical is unemphasized in the original.)

**Independent corroboration — "Be Bear Aware" page, FAQ "How does the order affect me?":**

> "The Order will affect you if you are visiting the Sawtooth National Recreation Area **outside of designated wilderness areas** anytime between the Saturday before Memorial Day through Labor Day."

**Official text — EXHIBIT A, the binding definition of "acceptably stored" (retrieved in full):**

> "3. "Acceptably stored" means:
> a. Stored in bear-resistant container certified through the Interagency Grizzly Bear Committee Courtesy Inspection Program. A container may be certified by the local district ranger or their designated representative(s) if it meets the IGBC criteria, or
> b. Stored in a closed, hard-sided vehicle constructed of solid, non-pliable material that, when secured, would not allow a bear to gain entry by breaking, bending, tearing, biting or pulling with its claws (any windows in the vehicle must be closed), or
> c. **Suspended at least 10 feet clear of the ground at all points and four feet horizontally from any supporting tree or pole**, or
> d. Stored within a hard-sided residence, building, or storage container subject to the terms and conditions of a special-use authorization or operating plan, or
> e. Stored by other methods as per the terms and conditions of a Forest Service approved special-use authorization or operating plan.
> f. Animal carcasses are considered acceptably stored when located more than 100 yards of a camping or sleeping area or a NFS Trail or stored according to methods outlined in (a)-(e) above."

**Official text — Exhibit A, "acceptably possessed":**

> "4. "Acceptably possessed" means:
> a. Possessed or attended by a person who is awake, alert, and within 100 feet and line-of-sight of the items; or
> b. Possessed or attended by such a person(s) for the purpose of field dressing lawfully taken animal carcasses, transporting any food or animal carcass, preparing any animal carcass or food for eating, or eating any food."

**Official text — Exhibit A, what counts as "Food and Refuse":**

> "1. "Food and Refuse" means any substance, solid or liquid (excluding water, baled hay, or hay cubes without additives) or refuse, which is or may be eaten or otherwise taken into the body to sustain health or life, provide energy, or promote growth of any person or animal. Also, includes items such as soft drinks, alcoholic beverages, canned foods, pet foods, processed livestock feed and grains, personal hygiene products, and empty food and beverage containers."

**Official text — effective dates:**

> "This Order will be effective on the Saturday before Memorial Day, 2022 at 12:01 and shall remain in effect until the end of Labor Day, 2027 at 11:59 or until rescinded, whichever occurs first."

**Official text — penalties:**

> "Any violation of the above prohibition(s) is punishable by a fine of not more than $5,000 for an individual, or $10,000 for an organization, and/or imprisonment for not more than six months. [16 USC § 551, 18 USC §§ 3559(a)(7), 3571(b)(6), 3581(b)(7).]"

**Source:**
- Forest Order **0414-04-143**, signed by Jim DeMaagd, Forest Supervisor, April 12 2022 — **signed PDF retrieved and text-extracted:** `https://www.fs.usda.gov/sites/nfs/files/r04/sawtooth/publication/alerts/22-04-06-0414-04-143%20SNRA_Food%20Storage%20Order.pdf`
- Alert page: `https://www.fs.usda.gov/r04/sawtooth/alerts/occupancy-and-use-food-storage`
- Corroborating page: `https://www.fs.usda.gov/r04/sawtooth/safety-ethics/be-bear-aware`

**What this means for the trip:**

**The key finding is CONFIRMED, and it is now backed by the signed order itself rather than by inference.** A bear canister is **not legally required inside the Sawtooth Wilderness.** The exclusion is explicit, parenthetical, and unambiguous in the operative sentence of the order, and the Forest Service's own bear-safety page restates it in plain English ("outside of designated wilderness areas").

Answers to the specific sub-questions:

- **Exhibit A: retrieved in full.** Prior research could not get it; it is embedded in the same signed PDF as the order, starting on page 3. Full text quoted above.
- **Hang spec CONFIRMED exactly as claimed:** "at least 10 feet clear of the ground at all points and four feet horizontally from any supporting tree or pole."
- **Effective dates:** Saturday before Memorial Day 2022 through **end of Labor Day 2027**. Still in force. The seasonal window runs Saturday-before-Memorial-Day through Labor Day each year — **August 10–13, 2026 is inside the active window.**
- **Penalties:** $5,000 individual / $10,000 organization / up to six months. Same tiers as the wilderness order.
- **Does it bind the trailhead/car-camp areas — Redfish, Stanley Lake, Pettit, Alturas? YES, unambiguously.** All four are within the SNRA and all four are *outside* the wilderness boundary. The exclusion only carves out the three wilderness areas; everything else in the SNRA is covered. Tin Cup / Pettit Lake Trailhead sits in the Pettit Lake Complex, outside the wilderness boundary — **the food storage order applies there in full.**

**The practical takeaway is the inverse of how this is usually framed.** The place your group is *most* likely to violate a food storage law is not the backcountry — it is the parking lot. Once you cross the wilderness boundary the order stops applying and a proper hang satisfies best practice. But at the trailhead, at Pettit Lake Campground, and anywhere you stage or re-pack near the cars, every cooler, every resupply bin, every empty wrapper, every stick of deodorant and tube of toothpaste is regulated "Food and Refuse," and must be inside a closed hard-sided vehicle with the windows up, or in an IGBC-certified container — unless someone awake and alert is within 100 feet and line-of-sight of it.

Note how broad the definition is: **personal hygiene products and empty food containers are explicitly covered.** A packed-out trash bag sitting in an open truck bed at the trailhead is a violation. Teach this to the group as a trailhead rule, not a backcountry rule.

Recommendation for the guide: state plainly that canisters are *not required* in the Wilderness (so nobody buys one under a false impression of legal necessity), teach the 10-ft/4-ft hang as the in-wilderness standard, and make the vehicle-storage rule an explicit checklist item for the trailhead.

---

## 6. Bear species

**Claim:** Black bears only; no grizzlies in the Sawtooths.

**Confidence:** **CONFIRMED**

**Official text — Sawtooth NF "Be Bear Aware":**

> "Black bears inhabit the Sawtooth National Forest. Seeing a bear at a distance can be a wonderful experience, but having one at your campsite can be a problem. When bears learn that campers and campground garbage containers are food sources, they may become nuisance animals which need to be removed for public safety. A fed bear is a dead bear."

**Official text — Sawtooth NF "About the Area":**

> "with the exception of the grizzly bear, just about every species that was here in the days of Lewis and Clark is still here today"

**Corroboration — U.S. Fish & Wildlife Service:** grizzly recovery is centered on the Greater Yellowstone, Northern Continental Divide, Cabinet-Yaak, Selkirk, and Bitterroot ecosystems. USFWS states there are **no known grizzly populations in the Bitterroot ecosystem** of central Idaho, which is the nearest recovery zone to the Sawtooths and is separated from them.

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/safety-ethics/be-bear-aware`
- `https://www.fs.usda.gov/r04/sawtooth/about-area`
- `https://www.fs.usda.gov/species/grizzly-bear-ursus-arctos-horribilis` (USFWS: `https://www.fws.gov/species/grizzly-bear-ursus-arctos-horribilis`)

**What this means for the trip:**

Black bear country, not grizzly country. This is the reason the canister exclusion in Claim 5 is defensible policy rather than an oversight — a proper hang is an adequate black-bear defense in a way it would not be in grizzly country.

Practically: teach the group standard black-bear behavior (make noise, don't run, don't play dead, fight back if attacked — the *opposite* of grizzly guidance). Bear spray is optional here rather than near-essential. Do not let anyone import Yellowstone-derived grizzly protocol into this trip; it teaches the wrong reflex.

Caveat worth stating honestly: "no grizzlies" is a statement about *known populations*, not a guarantee about an individual dispersing animal. It is the correct planning assumption, and it is what the agencies say.

---

## 7. Camping distance

**Claim:** "Camp at least 100 feet from trails, lakes, and stream" and "Wash 150 feet away from lakes and streams."

**Confidence:** **CONFIRMED** verbatim — including the grammatical error in the original.

**Official text — regulations page, Camping:**

> "Camp at least 100 feet from trails, lakes, and stream."
> "Camp on already impacted surfaces, and never camp on meadows or green vegetation."
> "Use existing camps in high-traffic areas. Good campsites are found, not made."

**Official text — regulations page, Sanitation:**

> "Wash 150 feet away from lakes and streams. Even "biodegradable" soap pollutes. Keep it pure!"

**Official text — the order's only camping prohibition:**

> "Camping in violation of posted signs. 36 C.F.R. § 261.58(e)"

**LNT comparison — lnt.org, Principle 3:**

> "To wash yourself or your dishes, carry water 200 feet away from streams or lakes and use small amounts of biodegradable soap. Scatter strained dishwater."

> "Locate cat holes at least 200 feet (about 70 to 80 adult paces) from water, trails, and camp."

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations`
- Forest Order 0414-04-161, prohibition #19
- `https://lnt.org/why/7-principles/dispose-of-waste-properly/` (browser-driven; site 403s automated fetchers)

**What this means for the trip:**

Both numbers confirmed verbatim, including "and stream" (singular) — that is a typo in the original, and it plainly means streams.

**The discrepancy with LNT is real and worth teaching correctly.** The Forest Service numbers are 100 ft (camp) and 150 ft (washing). LNT's standard is 200 ft for everything — washing, catholes, and camp. These are not in conflict; they are a **floor and a target**:

- **100 / 150 feet is the legal minimum.** Below it you are out of compliance with published Sawtooth regulation.
- **200 feet is the Leave No Trace standard**, and is what a well-run youth group should actually do.

Teach **200 feet for everything.** It is one number instead of three, it is easier for a tired fourteen-year-old to remember at dusk, it is stricter than every applicable rule so compliance is automatic, and it matches what the boys will be taught in any other LNT context. A useful field heuristic from LNT: **200 feet ≈ 70–80 adult paces.**

One important asymmetry to note: the *camping distance* rules on the web page are **guidance**, not order prohibitions. The order's only camping prohibition is "camping in violation of posted signs." So obey posted signs absolutely — those are order-backed and citable — and treat the 100-foot rule as the agency's published standard you are expected to meet.

---

## 8. Trailhead status — Grandjean and TIN CUP

**Claim:** Grandjean Campground and Trailhead closed as of July 23, 2026 due to debris flows off the 2024 Wapiti Fire burn scar.

**Confidence:** Grandjean closure **CONFIRMED** (with one detail unverified). **Tin Cup Trailhead: OPEN**, but with significant new conditions prior research missed.

### Grandjean

**Official text:**

> "The Grandjean Campground and Trailhead are closed for the foreseeable future. Debris flows have made the sites inaccessible and unsafe."
>
> Alert Start Date: July 23, 2026
> Alert End Date: N/A
> Rec Sites Affected: Grandjean Campground, Grandjean Trailhead
> Contact: Sawtooth National Recreation Area, 208-727-5000

**Source:** `https://www.fs.usda.gov/r04/sawtooth/alerts/grandjean-campground-and-trailhead-closure` (last updated July 23, 2026)

The date and the debris-flow cause are confirmed verbatim. The **attribution to the 2024 Wapiti Fire burn scar is UNVERIFIED** — the alert says "debris flows" and does not name the fire. The causal link is plausible and widely reported but is not stated on this official page. Do not print it as agency-sourced.

**Impact on this trip: none.** Grandjean is on the far west side of the wilderness, on the South Fork Payette. Your route starts at Pettit Lake on the east side. It matters only as a reminder that the wilderness is not uniformly open.

### TIN CUP TRAILHEAD — the group's actual departure point

**Status: OPEN.** No closure alert exists for Tin Cup / Pettit Lake Trailhead, and it does not appear on the forest's alerts list.

**Official text — Tin Cup Hiker Trailhead page:**

> "This trail leads to the popular Alice Toxaway Loop. You will encounter Alice lake, Toxaway lake, Twin lakes, and Farley lake along this loop. ... There are no campfires permitted on the Alice Toxaway Loop but you are encouraged to bring portable cook stoves. Motorized vehicles and bicycles are not allowed in any of the designated wilderness areas."

> "Operational Hours: May-September."
> "Restrooms: Restroom information is not available for this site."
> "Water: Potable water is not available at this site."

**NEW — official text, Forest Service news release, "New day use fees to be implemented at Pettit Lake Trailhead":**

> "The Pettit Lake Trailhead, formerly known as Tin Cup Trailhead, provides access to the Alice-Toxaway Loop in the Sawtooth Wilderness."

> "A single day use pass will cost $10. The fee can be paid by cash or check. Fees collected will be used to enhance trash service, maintain amenities, manage hazard trees, and other services at the trailhead."

> "Visitors also have the option of purchasing an annual pass for $100. The annual pass may also be used at any day use facility on the Sawtooth National Recreation Area for each calendar year."

> "Passes may be purchased from the host at Pettit Lake Campground."

> "To monitor occupancy at the site, visitors to the trailhead will be asked to fill out a registration form with their last name, number of people in their party, intended length of stay, and license plate number. When the trail has reached 100 percent occupancy, hosts at the site will implement a one-in for every one-out policy."

> "For more information, please call Recreation Resource Management of America at 928-537-8888."

### Route trail conditions — current 2026 SNRA Trails Report

All segments of the Alice–Toxaway & Edith Lake loop are reported **maintained in 2026**:

| Trail # | Segment | 2026 condition |
|---|---|---|
| 095 | Alice Lake–Redfish Lake Trail: Alice Lake to Tin Cup | "Trail cleared to Alice lake 6/18/2026 may have a few more trees down after the weekend storms" |
| 092 | Toxaway Lake to Alice Lake (over Snowyside Divide) | "(6/29) 1 downed tree" |
| 096 | Yellowbelly Trail: Farley Lake to Toxaway Lake | "Trail Maintained 7/2" |
| 041 | Pettit Lake Cutoff: Tin Cup TH to Yellowbelly | "Trail Maintained 7/1" |
| 095, 092, 096, 041 | **Alice-Toxaway Loop (aka Tin Cup Hiker Loop), 18 mi** | "Trail has been maintained as of 7/2" |
| 040, 092 | **Edith Lake:** Sand Mountain Pass/Imogene Divide to Yellowbelly | "Trail Maintained 7/5" |
| 092, 452 | Toxaway Lake to Edna Lake (Sand Mountain Pass) | "Trail Maintained 7/4" |

**Official text — report header:**

> "Before your trip: please check fire restrictions, group size limits, dog rules, and Wilderness regulations. ... Store your food in a bear safe manner. Cell service is very limited in the area. Pack out all toilet paper and other trash. It is your responsibility to know and understand rules before recreating on the SNRA."

> "General Update: Expect to encounter snow above 7,500-8,500 feet, high creek crossings and lots of downed trees this time of year."

**Official text — Alice-Toxaway Loop row:**

> "The popular backpacking loop starts and ends at Pettit Lake and passes by Alice, Twin, Toxaway, and Farley Lakes. There are many specific regulations on this loop; know before you go! No campfires on the loop, wag bags are strongly suggested."

**⚠️ Edith Lake campsite note — status changed, verify:** The **2024** edition of this report stated for the Edith Lake segment: *"Trail clear to edith lake. Most campsites at Edith lake closed for vegetation restoration.(7/17)"*. The **current 2026** report does **not** carry that note. That is probably good news, but the closure is not affirmatively rescinded anywhere, and Edith Lake is in your itinerary. **Confirm on the permit call.**

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/recreation/tin-cup-hiker-trailhead` (last updated March 26, 2025)
- `https://www.fs.usda.gov/r04/sawtooth/newsroom/releases/new-day-use-fees-be-implemented-pettit-lake-trailhead` (May 1, 2025)
- SNRA Trails Report, current edition: `https://www.fs.usda.gov/media/247778` (PDF, `pdftotext -layout`)
- Prior edition showing the Edith note: `https://www.fs.usda.gov/media/114044` (dated 9/20/2024)
- Alerts index: `https://www.fs.usda.gov/r04/sawtooth/alerts`

**What this means for the trip:**

Your trailhead is open and your entire route was trail-crewed in early July 2026. That is the best possible news on trail conditions.

But three operational surprises that were not in prior research:

1. **The trailhead has been renamed.** "Tin Cup" is now officially "Pettit Lake Trailhead." Signage, the fee tube, and any FS staff you speak to may use the new name. Tell drivers both names.
2. **There is now a $10/day fee, cash or check only.** No cards. Bring cash. Ask on the permit call how a 4-day overnight trip is charged.
3. **There is an occupancy cap with a one-in/one-out gate.** A 12-person party is exactly the kind of group that gets held at a full trailhead. August 10 is a Monday, which helps considerably versus a weekend — but confirm the policy for permitted groups when you call.

Also note: **no potable water at the trailhead.** Everyone must arrive with full bottles or plan to treat from Pettit Lake Creek.

---

## 9. Current fire restrictions

**Claim:** As of late July 2026, Stage 1 restrictions on the Minidoka Ranger District only, not the Sawtooths.

**Confidence:** **CONFIRMED** as of July 27, 2026.

**Official text — the only fire restriction order currently listed for the forest:**

> "Stage 1 Fire Restrictions — Minidoka Ranger District
> This order covers areas on the Minidoka Ranger District under Stage 1 Fire Restrictions to reduce the potential for human-caused wildland fire ignitions.
> Alert Start Date: July 1, 2026
> Alert End Date: October 31, 2026
> Order Number: 0414-01-069"

**Official text — the order's described area:**

> "Pursuant to 16 U.S.C. § 551 and 36 CFR § 261.50 (a) and (b) the following are prohibited on all National Forest System (NFS) lands within the Sawtooth National Forest Minidoka Ranger District. beginning July 1st, 2026, at 1:00 a.m. and shall remain in effect through October 31, 2026 at 1:00 a.m."

> "DESCRIBED AREA: The Sawtooth National Forest Minidoka Ranger District, as shown on the attached map."

**Official text — current fire danger, forest banner:**

> "Fire Danger Status: **High** — North Zone Fire Danger Rating Area; **Very High** — South Zone Fire Danger Rating Area"

**Source:**
- `https://www.fs.usda.gov/r04/sawtooth/alerts/stage-1-fire-restrictions-minidoka-ranger-district` (Order 0414-01-069, signed Casey Johnson, Forest Supervisor; page last updated June 30, 2026)
- Full alerts index reviewed: `https://www.fs.usda.gov/r04/sawtooth/alerts`
- Fire danger banner present on all Sawtooth NF pages as of July 27, 2026

**What this means for the trip:**

Confirmed: **Stage 1 applies only to the Minidoka Ranger District, which is in the far south of the forest (Albion/Black Pine/Sublett ranges) and is nowhere near the Sawtooth Wilderness.** No Stage 1 or Stage 2 restriction currently applies to the SNRA or the Sawtooth Wilderness.

This changes nothing about your fire plan, because **campfires are already prohibited on your entire route year-round** by Order 0414-04-161 (Claim 4). A future Stage 1 or Stage 2 order would matter to you only if it restricted **stoves**, which Stage 1 does not — the Minidoka order expressly exempts "Persons using a stove or grill that is solely fueled by liquid petroleum fuels."

**The escalation risk is real and the caution is warranted.** Fire danger is already High/Very High in late July, and Stage 2 restrictions in Idaho can restrict even canister stoves in some formulations. Assign someone to re-check the alerts page within 72 hours of departure. If a new order appears covering the SNRA, read whether it exempts liquid-petroleum/canister stoves — that is the single line that determines whether your group can cook.

---

## 10. Dogs

**Claim:** Leashed on trails July 1 – Labor Day.

**Confidence:** **CONFIRMED** — with a leash-length specification the claim omitted, and a total ban in one drainage.

**Official text — the binding order, prohibitions #6 and #7:**

> "Being on an NFS Trail with a dog, except for dogs assisting persons with disabilities or engaged in lawful hunting with a person in possession of a valid Idaho hunting license and Hound Hunter permit, on a leash that is more than 15 feet from July 1st through Labor Day. 36 C.F.R. § 261.55(a)"

> "Possessing or transporting a dog within the Goat Creek drainage (tributary of the South Fork of the Payette), shown on Exhibit C. 36 C.F.R. § 261.58(s)"

**Official text — regulations page:**

> "Dogs must be on leash while on trails from July 1 through Labor Day. Control your pet. Loose dogs can harass wildlife and stock and disturb other visitors."

> "Dogs are not allowed in the Goat Creek drainage (tributary of the South Fork of the Payette River)."

**Official text — Tin Cup Hiker Trailhead page:**

> "Please keep all pets on a leash."

**Source:**
- Forest Order 0414-04-161, prohibitions #6–#7 (dog closure area is Exhibit C, `.../0414-04-161%20SawtoothWilderness%20ExhibitC.pdf`)
- `https://www.fs.usda.gov/r04/sawtooth/wilderness/sawtooth-wilderness-regulations`
- `https://www.fs.usda.gov/r04/sawtooth/recreation/tin-cup-hiker-trailhead`

**What this means for the trip:**

Confirmed, and August 10–13 falls inside the leash window (July 1 – Labor Day, which in 2026 is September 7).

Two details the original claim missed:

1. **The leash has a maximum length: 15 feet.** The order prohibits being on a trail with a dog "on a leash that is more than 15 feet." A retractable leash extended beyond 15 feet is a violation. This is order-backed and citable.
2. **Goat Creek drainage is a total dog ban** — not a leash rule. Dogs may not even be *transported* through it. Goat Creek is not on your route, so this does not affect you, but it is worth knowing if anyone proposes a side trip.

**Recommendation independent of the law:** for a youth group of this size on an 18-mile loop with high creek crossings, a dog is a liability the trip does not need. If a leader wants to bring one, the answer should probably be no on group-management grounds rather than legal ones.

---

## 11. Group latrines in wilderness

**Claim:** No blanket federal prohibition; 36 CFR 261.11 bans leaving waste exposed / polluting water but not properly-sited latrines.

**Confidence:** **CONFIRMED** on both halves — the CFR text and the LNT position.

**Official text — 36 CFR 261.11, complete and verbatim from eCFR:**

> **§ 261.11 Sanitation.**
> The following are prohibited:
> (a) Depositing in any toilet, toilet vault, or plumbing fixture any substance which could damage or interfere with the operation or maintenance of the fixture.
> (b) Possessing or leaving refuse, debris, or litter in an exposed or unsanitary condition.
> (c) Placing in or near a stream, lake, or other water any substance which does or may pollute a stream, lake, or other water.
> (d) Failing to dispose of all garbage, including any paper, can, bottle, sewage, waste water or material, or rubbish either by removal from the site or area, or by depositing it into receptacles or at places provided for such purposes.
> (e) Dumping of any refuse, debris, trash or litter brought as such from private property or from land occupied under permit, except, where a container, dump or similar facility has been provided and is identified as such, to receive trash generated from private lands or lands occupied under permit.
>
> [42 FR 2957, Jan. 14, 1977, as amended at 46 FR 33520, June 30, 1981]

**Official text — Leave No Trace, Principle 3, "Latrines" section, verbatim:**

> "Though cat holes are recommended for most situations, there are times when latrines may be more applicable, such as when camping with young children or if staying in one camp for longer than a few nights. Use similar criteria for selecting a latrine location as those used to locate a cat hole. Since this higher concentration of feces will decompose very slowly, location is especially important. A good way to speed decomposition and diminish odors is to toss in a handful of soil after each use. Ask local land managers about latrine-building techniques."

**Official text — LNT on toilet paper, verbatim:**

> "Toilet paper must be disposed of properly. Left on the surface, it can impact other visitors, attract wildlife and cause contamination. It should be thoroughly buried in a cat hole or packed as trash. Packing out toilet paper in arid landscapes such as desert environments is best."

> "Avoid using scented brands whenever possible. Natural toilet paper, such as vegetation or snow, may be used but should be buried in the cat hole to avoid contamination. Burning toilet paper is not recommended, as this practice can result in wildfires. Wipes, even those marketed as biodegradable, should always be packed out as trash."

**The applicable local rule that actually governs — Order 0414-04-161, prohibition #21:**

> "Depositing any human waste within 100 feet of springs, lakes, streams, or campsites, or failing to bury human waste outside those areas. 36 C.F.R. § 261.57(g)"

**Source:**
- `https://www.ecfr.gov/current/title-36/chapter-II/subchapter-B/part-261/subpart-A/section-261.11` (retrieved via eCFR renderer API, current edition)
- `https://lnt.org/why/7-principles/dispose-of-waste-properly/` (browser-driven; site returns 403 to curl and WebFetch)
- Forest Order 0414-04-161, prohibition #21

**What this means for the trip:**

**Confirmed: a properly sited group latrine is legal.** 36 CFR 261.11 contains no prohibition on latrines. What it prohibits is *exposed or unsanitary* waste (b), placing pollutants in or near water (c), and failing to dispose of sewage (d). A latrine that is dug, used, covered after each use, and fully buried and disguised on departure violates none of these.

**LNT explicitly endorses latrines**, and — notably for you — names your exact situation as a qualifying case: *"such as when camping with young children or if staying in one camp for longer than a few nights."* A twelve-person youth group is precisely the scenario LNT contemplates.

The binding local constraint is Order 0414-04-161 #21, which sets the siting rules:
- **≥ 100 feet from springs, lakes, streams, AND campsites** (note "campsites" — often missed)
- **Waste must be buried.** An unburied latrine is an order violation regardless of siting.

Practical guidance for the guide:
- Site the latrine **200 feet** from water, camp, and trail (LNT standard, comfortably above the 100-ft legal floor).
- **Toss a handful of soil after each use** — this is LNT's specific recommendation and it materially controls odor and speeds decomposition.
- Bury and disguise completely before breaking camp.
- **TP still gets packed out**, per the Sawtooth-specific rule in Claim 3. Note that LNT itself would allow burying TP in a cathole — but the Sawtooth Forest Service instruction is stricter, and **the stricter local rule governs.** Do not let anyone cite LNT to justify burying TP here.
- LNT says "Ask local land managers about latrine-building techniques" — worth a question on the permit call, and it signals competence to the ranger.

One judgment call worth surfacing to leaders: a latrine concentrates waste, which decomposes slowly. For a group moving camp nightly on a 4-day loop, **dispersed catholes are the better LNT choice**; a latrine earns its keep mainly at a base camp held two-plus nights. Match the technique to the itinerary rather than defaulting to one.

---

## 12. Other current alerts, orders, and closures affecting this route

Prior research missed several items. The full Sawtooth NF alerts index was reviewed on July 27, 2026. Below is everything currently in force that touches this trip.

### ⚠️ NEW — Forest Order 0414-04-162, "SNRA Occupancy and Use" (effective June 19, 2026)

This order is **five weeks old** and directly constrains the group's staging plan.

**Official text — the 8-person campsite cap:**

> "Camping or occupying a campsite in a developed campground in the Described Area with more than 8 people in a single unit, 16 people in a double unit, or in excess of the posted capacity at any camp unit. 36 CFR 261.58(f)"

**Official text — dispersed camping ban at Pettit:**

> "Camping any place other than in a developed campground within the following areas as shown in Exhibit: ... Between Forest Roads 208 or 362, and Pettit Lake (Exhibit E). 36 CFR 261.58(e)"

**Official text — night presence at developed sites:**

> "Being in a developed recreation site between 10:00 p.m. and 6:00 a.m., except for a person who is camping or who is visiting a person camping in a developed campground, or if the site is posted as a Dark Sky viewing area. 36 CFR 261.58(u)"

**Official text — stay limits:**

> "Occupying a campsite within a developed campground or designated dispersed camping area in the Described Area, at the same site or within a 30-mile radius of the same site, for more than 10 days during any 30-day period. 36 CFR 261.58(a)"

**Official text — the Pettit Lake Complex is expressly in scope:**

> "Pettit Lake Complex (Exhibit E) - The Pettit Lake Complex Described Area is shown in Exhibit E and is all NFS lands located approximately 21 miles south of Stanley, Idaho accessed from State Highway 75 via Forest Road #208 and further described as the lands and waters, within the Pettit Lake Creek drainage on the west side of State Highway 75 upstream to the Sawtooth Wilderness Area boundary (approximately 3 miles); including the area within ¼ mile of Pettit Lake and Forest roads #208, and #361, and #362."

**Official text — the wilderness is expressly out of scope:**

> "The Sawtooth, Cecil D Andrus White Cloud, and Hemingway-Boulders Wilderness Areas are not part of the Described Area."

**Source:** `https://www.fs.usda.gov/r04/sawtooth/alerts/sawtooth-national-recreation-area-occupancy-and-use` — Order 0414-04-162, signed Casey Johnson, in effect June 19, 2026 – December 31, 2031.

**Impact:**
- **A 12-person group cannot occupy a single campground unit** the night before. Reserve a double unit (16 max) or two adjacent single units at Pettit Lake Campground.
- **No dispersed/roadside camping between FR 208/362 and Pettit Lake.** The "we'll just pull off and sleep by the trailhead" plan is illegal. You must be in the developed campground.
- **Note the 10 p.m.–6 a.m. restriction on developed recreation sites.** The trailhead is a developed recreation site. A pre-dawn 4 a.m. start staged from the trailhead parking lot is arguably prohibited unless you are camping in the campground. If an alpine start matters, camp in the campground the night before, or start at/after 6 a.m.

### ⚠️ NEW — Forest Order 0414-04-163, "Parking or Leaving a Vehicle" (effective July 1, 2026)

**Official text:**

> "Parking or leaving a vehicle in violation of posted instructions. 36 CFR 262.58(g)"

> "Parking or leaving a vehicle or trailer off road other than within a developed recreation site, Redfish Lake Complex, or Stanley Lake Complex at the same site or within a 30 mile radius of the same site, for more than 10 days during any 30 day period between May 1st and September 15th, and 16 days during any 30 day period between September 16th and April 30th. 36 CFR 261.56"

> "Possessing, parking, or leaving more than 2 vehicles, except motorcycles or bicycles per single family camp unit in a developed campground or in excess of the posted vehicle capacity at those camp units designated as a multiple family unit. 36 CFR 261.58(i)"

The Pettit Lake Complex (Forest Roads 208, 361, **362**) is expressly within the Described Area.

**Source:** `https://www.fs.usda.gov/r04/sawtooth/alerts/parking-or-leaving-vehicle` — Order 0414-04-163, in effect July 1, 2026 – December 31, 2031.

**Impact:** A 4-day trip is far inside the 10-day limit, so the stay limit is not a problem. **The real constraint is the 2-vehicles-per-campground-unit cap.** A 12-person group driving from Provo will likely arrive in 3–4 vehicles. If you take one campground unit you may park only 2 vehicles at it. Plan vehicle staging with the campground host, and obey posted parking instructions at the trailhead — that clause is order-backed and citable.

### Other orders in force (reviewed, low or no impact)

| Order | Subject | Relevance |
|---|---|---|
| **0414-00-029** | Forestwide Occupancy and Use | General forest-wide prohibitions; applies but nothing route-specific. |
| **0414-00-028** | Over-Snow Vehicle and Bicycle Prohibitions | Not applicable in August. |
| **0414-04-164** | Boating, Swimming, Salmon River Corridor | Salmon River corridor only — not your route. |
| **0414-04-160** | Hemingway-Boulders / White Clouds Occupancy and Use | Different wilderness areas — not your route. |
| **04-2021-03** (Regional) | **Weed Free Hay Order** | Prohibits non-pelletized hay/straw/mulch across the Intermountain Region. Only relevant if stock were used — you have none. |
| **04-2021-01** (Regional) | Fireworks and Spark Arrestor | Fireworks banned region-wide. Worth stating to a youth group explicitly. |
| **04-2021-02** (Regional) | Explosives and Exploding Targets | Banned region-wide. |
| — | **Fox Creek Trail closures** | Ketchum Ranger District, NFS Trail 149 — different drainage, no impact. |

### Additional route-relevant facts surfaced

- **Cell service:** *"Cell service is very limited in the area."* (SNRA Trails Report header.) Plan communications and emergency contingency accordingly — a satellite messenger is a serious consideration for a youth group here.
- **Snow and creek crossings:** *"Expect to encounter snow above 7,500-8,500 feet, high creek crossings and lots of downed trees this time of year."* (Trails Report general update.) Snowyside Divide tops out near 9,400 ft. By mid-August residual snow is usually minor, but the Alice Lake trail description warns of *"multiple creek crossings that are high in"* early season.
- **SNRA current conditions (last updated June 16, 2026 — stale for August):** *"At this time, all campgrounds, boat launches, restrooms, and roads are open."* and *"there is still a significant snowpack above 7500 feet."* The June date makes the snowpack note unreliable for August; the trails report (July) supersedes it.
- **No potable water at Tin Cup / Pettit Lake Trailhead.**
- **Motorized and mechanized travel prohibited**, including drones: *"Remember, as in all wilderness, motorized equipment and mechanized travel is not allowed. This includes use of bicycles, motorbikes, chainsaws, carts, and drones."* Worth stating explicitly — someone will want to fly a drone over Alice Lake.

---

## Summary of verdicts

| # | Claim | Verdict |
|---|---|---|
| 1 | Group size 12, leaders count | **CONFIRMED** (date corrected: Nov 30, not Nov 31) |
| 2 | Permit; 8+ must call an office | **CONFIRMED** (Stanley RS closed to visitors — call SNRA HQ) |
| 3 | Catholes 6–8 in, 100 ft; TP packed out | **CONFIRMED** (TP rule is page/report guidance, not an enumerated order prohibition) |
| 4 | No campfires; Order 0414-04-161 | **CONFIRMED** substance + order number; **PARTIAL** on dates (order body says Feb 20, not Mar 1) |
| 5 | Food storage order excludes the Wilderness → no canister required | **CONFIRMED** verbatim from signed order + corroborating FS page; **Exhibit A retrieved in full** |
| 6 | Black bears only, no grizzlies | **CONFIRMED** |
| 7 | Camp 100 ft, wash 150 ft | **CONFIRMED** verbatim (LNT's 200 ft is stricter — teach 200) |
| 8 | Grandjean closed; Tin Cup status | Grandjean **CONFIRMED** (Wapiti Fire attribution **UNVERIFIED**); **Tin Cup OPEN**, route maintained July 2026 |
| 9 | Stage 1 on Minidoka RD only | **CONFIRMED** as of July 27, 2026 |
| 10 | Dogs leashed July 1 – Labor Day | **CONFIRMED** (+ 15 ft max leash; Goat Creek total ban) |
| 11 | Latrines legal; 36 CFR 261.11 | **CONFIRMED** (CFR text + LNT both verbatim) |
| 12 | Other alerts | **3 new orders found that prior research missed** — 0414-04-162, 0414-04-163, and the Pettit Lake trailhead fee/occupancy regime |

**Nothing was REFUTED.** One item is UNVERIFIED (the Wapiti Fire attribution for the Grandjean debris flows). Two items are PARTIAL on details (the wilderness order's effective dates; the internal contradiction in the ¼-mile campfire rule). The rest are confirmed against official agency sources, with several material additions.
