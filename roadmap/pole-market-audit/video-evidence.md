# Video evidence — goHUNT trekking pole load-to-failure test

**Source:** GOHUNT (145K subs) — "Trekking Pole Break Point — goHUNT Gear Stress Test"
https://www.youtube.com/watch?v=qpGqNsdBXuY · 10 Jan 2018 · 26,102 views · 158 likes
**Access method:** chapter markers ("key moments") + description + comments, retrieved via
Playwright browser automation. **Verbatim transcript NOT retrievable** (see method note below).

## The data — load to failure

From the video's own chapter markers, which for a break test encode the results directly:

| Pole | Material | Chapter markers |
|---|---|---|
| **Leki Legacy** | Aluminum | `55LBS` → `100LBS` → `STRESS LIMIT: 125LBS` → `STRESS FRACTURE AT [?]0LBS` |
| **Black Diamond Distance Z** | Carbon (folding) | `STRESS FRACTURE AT 70LBS` |

A commenter (@fradee2830) summarizes it as **"Leki 125 BD 100"**, which conflicts with the 70 lb
chapter marker for the BD. One chapter title also reads `STRESS FRACTURE AT GOLBS` — garbled, could
be 60 or 90. **[UNVERIFIED] The exact fracture loads are ambiguous; only the ordering (aluminum Leki
sustained more than carbon BD) is safe to assert.**

## Four caveats that change how this should be read

These came from the comments and materially limit the finding. Without them the data would be
actively misleading.

1. **This is a BENDING/LATERAL test, not a lock test.** @jimc7991: *"you should do a test on those
   poles with vertical weight to see of the locks hold up. It might take several hundred pounds."*
   → So these numbers speak to **shaft break risk only**. They say nothing about lock slip, which is
   the buyer's other failure mode. Do not conflate.

2. **The failure mode is WALL BUCKLING, not material strength.** @HikingNerd: *"If you watch the Leki
   one in slow motion, you'll see that the failure mode is buckling because of the load applied over
   a small surface area. The walls of the poles collapse first and then the entire pole shears in
   half. Depending on how the load is applied, the poles could perhaps handle even more."*
   → Independent observational confirmation of the audit's central engineering finding: **wall
   thickness governs, not outer diameter.** Also means the absolute numbers are load-application
   dependent and are a floor, not a ceiling.

3. **The BD Distance Z is the wrong pole to generalize from.** @delanuez: *"Why wasn't the Black
   Diamond Alpine Series tested? the Distance ones are for running not backpacking...."*
   → The Distance Z is an ultralight folding trail-running pole. Its 70 lb fracture must NOT be read
   as "carbon breaks at 70 lb." BD's backpacking carbon (Alpine Carbon Cork, composite 44 in Dixon's
   data — tied strongest tested) is a different product class entirely.

4. **Weight class is not controlled.** @AbsoluteTU: *"The Leki is about 40% heavier... Seems like the
   black diamonds are punching out of their weight class."*
   → n=1 per pole, no weight normalization, no repeat trials, 2018 vintage. Directional only.

## Net contribution to the audit

- First and only **absolute load-to-failure figures** found in either audit. Everything else
  (Dixon's composite) is *relative* stiffness under a fixed 16 kg load.
- Corroborates wall-buckling as the governing failure mechanism — observed, not theorized.
- Confirms aluminum outlasted carbon **in a lateral load test on these two specific poles**, which
  is the buyer's exact fear case (tip wedged, hiker slips, side load).
- Establishes that a mid-tier aluminum pole tolerates >100 lb of lateral load, which is useful
  reassurance against the buyer's "breaking under load" worry regardless of which pole he buys.

## Method note — YouTube transcript retrieval

> ### ⚠️ CORRECTION (2026-07-26, later same day)
> **My original conclusion in this file — "verbatim transcripts are gated in this environment" — was
> WRONG.** I tested three retrieval paths, all failed, and I over-generalized from that to a claim
> about the environment. The actual answer is that I reached for the wrong tool.
>
> **`yt-dlp` works, and it is already installed** (`/opt/homebrew/bin/yt-dlp`, v2026.03.17):
> ```
> yt-dlp --skip-download --write-auto-subs --sub-langs "en.*" --sub-format vtt -o "%(id)s" <url>
> ```
> This returned a complete 3,344-character transcript for this very video on the first try. The audit
> fleet obtained **23 full transcripts across 25 video sources** this way, and I independently
> reproduced and verified their quotes against the raw VTT (see Verification below).
>
> Lesson recorded deliberately: three failures of *my* chosen methods was evidence about my methods,
> not about the platform. **Use `yt-dlp` first for any YouTube text extraction.**

| Path | Result |
|---|---|
| **`yt-dlp --write-auto-subs`** | ✅ **WORKS — the correct tool.** Full VTT, first attempt, no auth |
| `yt-dlp --write-comments` | ✅ **Works** — full comment threads as JSON |
| `curl` the `timedtext` baseUrl (default, `fmt=json3`, `fmt=srv3`) | ❌ HTTP 200, 0 bytes |
| Same fetch from *in-page* context with `credentials: include` | ❌ HTTP 200, 0 bytes |
| InnerTube transcript endpoint (per audit agents) | ❌ HTTP 400 |
| UI: click "Show transcript", read `ytd-transcript-segment-renderer` | ❌ Panel present, 0 segments |
| Chapter markers (`engagement-panel-macro-markers-auto-chapters`) | ✅ Works |
| Structured description (`engagement-panel-structured-description`) | ✅ Works |
| Comments via DOM (`ytd-comment-thread-renderer`, after scroll) | ✅ Works — 14 threads |
| Video discovery by scraping `/results?search_query=` for `videoId` + title | ✅ Works |

**Standing rule:** a claim sourced to a "transcript" is credible only when the agent names its
retrieval method. `yt-dlp` is verifiable and reproducible; a DOM scrape of the transcript panel is
not, because that panel does not populate.

## Verification of the fleet's quotes against raw VTT

Independently re-pulled `qpGqNsdBXuY.en.vtt` and grepped for the agents' claimed verbatim lines.
**All confirmed present, exactly as quoted:**

- Protocol: *"we're gonna take this scale and we're gonna slowly hang weight from it starting with ten
  and hopefully working all the way up to sixty to see at what point that these things break"*
- Rig failure: *"we've gone up to 85 pounds we were gonna do 80 we accidentally went all the way up to
  85 and our zip tie broke that was holding the weight onto the pole"* → they then improvised a tape
  fix. **This is why the absolute load numbers are not trustworthy.**
- Leki figure: *"that's hundred ten we're gonna make it a hundred and twenty five finally yes 25 there
  it is 125 pounds and it just popped it right out"* — note *"popped it right out"* is ambiguous
  between a shaft fracture and the weight attachment releasing. **[UNVERIFIED] which occurred.**
- ASR mangles "Leki Legacy" as *"lucky legacy"* and "Distance Z" as *"distance C"*, which is why
  keyword searches for brand names miss this video.

## Other high-value videos located (not yet mined)

| ID | Title |
|---|---|
| `f5zVOgazgDU` | Cheap vs Expensive Trekking Poles: Are They Worth It? — bears directly on the price/strength knee |
| `q0SfswKYOTE` | Why I'm DONE using CARBON FIBER trekking poles |
| `DInJlWpNjYc` | Best Trekking Poles of 2026 – 30 Tested (likely Dixon's video companion) |
| `sqyZfMrBc88` | Carbon or Aluminum trekking poles / How to fix a broken pole |
| `U4lkELazElw` | Ultralight vs Durable: Gossamer Gear vs Black Diamond |
| `yN_NEFrwUCc` | Durston Iceline VS Zpacks Carbon Fiber |
| `c25czrBoxik` | Before YOU Buy: Black Diamond Alpine Carbon Cork |
| `R3iZnz4FyJs` | Costco Cascade Mountain Tech review (the incumbent pick) |
