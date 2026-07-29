# Remaining gear-hub gaps

One category is still missing from `gemini-code-1784928132429.html`. They were identified
by diffing the 50-item packing list in `packcheck.html` against the 18 categories in the gear
hub, so each one is grounded in something the trip already tells families to bring.

**Status: 2 of 3 DONE.** First Aid & Blister Care shipped 2026-07-29 once the rate limiting eased; see `research/firstaid-verified.md`. Layers & Insulation shipped the same day. Only Sun & Bug Protection remains. Research was attempted 2026-07-28 and failed. Every product feed and
retailer returned `HTTP 429` from the egress proxy, and eleven research agents stalled or lost
their connection without writing output. No price, weight, or rating could be verified, and the
repo rule in `CLAUDE.md` forbids inventing those values to fill required fields. Retry when the
network is healthy.

## 1. First Aid & Blister Care — DONE (2026-07-29)

Highest priority of the three. `index.html` states blisters are "the #1 thing that ruins this
for a boy," and `packcheck.html` lists a "Group first-aid kit" and "Moleskin or Leukotape" with
no product guidance behind either.

Products to verify:

- Leukotape P, and how it differs from moleskin in practice
- Moleskin (Dr. Scholl's or equivalent)
- Compeed / Band-Aid Hydro Seal blister cushions
- Engo patches (applied to the shoe, not the foot)
- Tincture of benzoin (makes tape stick to sweaty feet)
- Pre-built group kits sized 8-12 people, multi-day: Adventure Medical Kits Mountain Series
  (Explorer / Guide / Hiker), Ultralight/Watertight series, MyMedic, Surviveware
- A whistle (packing-list item with no product named)

Also worth writing up: what a pre-built kit leaves out that this trip needs, given four days
with zero cell service. Prescription meds, an epinephrine plan, group-scale ibuprofen, elastic
wrap, trauma shears, irrigation for wound cleaning.

## 2. Layers & Insulation — DONE (2026-07-29)

Camps sit at 8,000-8,700 ft and nights reach the 30s even in August. The hub has Rain Shells
but nothing for insulation, base layers, or socks.

Products to verify:

- **Socks**, which belong here as blister-prevention gear: Darn Tough, Smartwool, Injinji,
  REI Co-op merino. Merino vs synthetic, cushion weight, youth sizing for 5'1"-5'5" boys,
  and why cotton is genuinely dangerous at these temperatures
- **Insulation**: synthetic vs down for teenagers who are hard on gear and outgrow it in a
  year. Patagonia Nano Puff / Micro Puff, REI Co-op 650 Down, Forclaz, 32 Degrees, grid fleece
- **Sleep layers**: thermal top and bottoms that stay in the pack liner and are worn only for
  sleeping
- Beanie, synthetic tees

## 3. Sun & Bug Protection

`index.html` says "UV at 9,000 ft burns fast" and calls for reapplication every 2-3 hours.
Granite and lingering snowfields add heavy reflected UV. Nothing in the hub covers it.

Products to verify:

- Sunscreen, with honest volume math for 12 people x 4 days x reapplication, plus the
  reef-safe angle for alpine lakes the boys will swim in
- SPF lip balm, the most-forgotten item on the list
- Sunglasses, including why UV protection matters more with snowfield reflection, and
  retention straps for teens who lose things
- Brimmed hat; sun hoodie as the reapplication-free alternative
- Insect repellent: DEET vs picaridin vs permethrin-treated clothing, and the safety note that
  DEET damages synthetics and plastics (pack fabric, watch faces, sunglasses lenses), which
  matters when teenagers apply it carelessly
- Head net for the worst mosquito conditions in the lake basins

## Method note for the retry

The verified categories in this archive were built by hitting each merchant's own
`/products.json?limit=250` feed for per-variant price and availability, then reading the
rendered spec block for weights, then a separate pass for ratings via a real browser because
REI and Amazon block plain HTTP clients. That approach works well when the network cooperates.
It produced eight corrected prices in the cookware pass alone.
