# Alan Dixon's 37-pole deflection dataset

Raw CSV export, pulled 2026-07-26 from
`docs.google.com/spreadsheets/d/1FQQJRsfqRk92z6XiWlIix6oFVK08sfy_LPJ1WFJ-Q9E`

This is **the entire quantitative backbone of the trekking pole market.** No other instrumented
dataset was found at any price point. Archived here because a third-party Google Sheet can vanish.

| File | Tab (gid) | Contents |
|---|---|---|
| `dixon-specs.csv` | 0 | Price, height range, collapsed length, weight, segments, **shaft diameters**, configuration, materials |
| `dixon-deflection.csv` | 756885406 | The load-test measurements and composite scores |
| `dixon-locks.csv` | 1247856815 | Handle / strap / grip-extender / **lock** sub-scores, plus flaw notes |

---

## ⚠️ READ THIS BEFORE USING THE NUMBERS

### Lower is stiffer. The column named "Strength score" is better when SMALLER.

The composite is not an abstract rating — it is **two bend measurements in centimetres,
multiplied together**:

```
composite = (cm of sag, weighted in the middle)
          × (cm of sag, weighted at either end)
```

Verified against all 37 rows:
- Kodiak: `4.00 cm × 10.625 cm = 42.5` → **43**
- Panther: `6.00 cm × 16.800 cm = 100.8` → **101**
- Ruta Locura Yana: `13.00 cm × 33.400 cm = 434.2` → **434**

Fewer centimetres of bend = stiffer. **Lower wins.**

### The sheet carries TWO scores pointing in OPPOSITE directions

| Column | Range | Direction |
|---|---|---|
| `Point Score` | 0–9 | **higher is better** |
| `Strength score` (composite) | 43–434 | **LOWER is better** |

They correlate at **r = −0.910** across all 37 poles, which is the sanity check: a low composite
should always pair with a high point score. **If you ever see a pole quoted as "9/9 with composite
300," something is wrong.** This naming trap is the most likely source of error in any downstream
analysis, and it already produced two documented mistakes in this project's research.

### Columns 12–16 are scratch space, NOT pole attributes

One row (`GrassSticks`) has the literal strings `tele` / `z` / `alum` / `carb` sitting in columns
13–16. Those are Dixon's working columns for computing per-category averages, with values pasted in
**without regard to which row they land on**.

**The numbers beside a pole in columns 12–16 are not measurements of that pole.** Ignore them.

### Two field-average corrections

Recomputed from these raw rows — the commonly-circulated figures are wrong:

- Field average composite is **141.4** (median 118.0), *not 145*
- Field average strength × weight is **29,928** (median 27,864), *not 30,807*

### Methodology limits, in the tester's own words

- Method: 16 kg / 35 lb hung mid-span, pole corded 10 cm from each end; 2.25 kg / 5 lb cantilever
  at each end, run twice and averaged.
- **n = 1 pair per pole, one tester, non-destructive elastic deflection only.**
- His disclaimer: the test *"does not address sudden forces"* — which is the only load that has
  broken any pole in the entire evidence base.
- **Unclosed span confound:** deflection scales with the cube of length, and per-pole test lengths
  are not published. Fixed-length poles were tested at 125–130 cm while adjustables span
  59–158 cm. **Composite gaps under ~30% may be inside the noise.**
- Instrument noise floor ≥ 0.5 cm, derived from the fact that a *well-used* pair measured stiffer
  than a new one of the same model — physically impossible, therefore measurement scatter.
  (Note: the summary tab and raw tab disagree on which pair was which; the noise conclusion holds
  either way, which is why it is stated as noise rather than as a wear measurement.)

**Bottom line: this measures how much a pole flexes and springs back. It does not measure the load
at which a pole breaks.** Treat every "strength" ranking derived from it as a stiffness proxy.
