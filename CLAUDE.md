---
scope: monorepo
audience: every-session
verified: 2026-07-28
verified-against:
  - index.html
  - packcheck.html
  - gemini-code-1784928132429.html
  - roadmap/gear-gap-audit/research/
review-cadence: never
---

# Sawtooth High Adventure, repo rules

A personal sandbox. Four hand-edited static files (`index.html`, `packcheck.html`,
`gemini-code-1784928132429.html`, `styles.css`) published to GitHub Pages for one church
youth group. No build step, no backend, no dependencies, no users to regress.

The rules below scope down the global `~/.claude/CLAUDE.md` for every path in this repo.

## No automated test suites

**Rule:** Do not add unit tests, e2e specs, Playwright suites, test runners, or ephemeral
test infrastructure anywhere in this repo. Verifying a change means opening the page and
looking at it.

**Why:** This repo accumulated 8 Playwright spec files under `tests/` and 44 agent scratch
directories under `.agents/` for a four-file static site with no build and no backend. The
global "Testing & Verification" rules were written for production services with real users.
Applied here they generate pure overhead and artifacts nobody reads.

**How to apply:** This explicitly overrides the global `~/.claude/CLAUDE.md` "Testing &
Verification" section, including its requirements for unit plus e2e tests, Docker test
infrastructure, and Playwright verification of UI changes. For a visual change, serving the
directory and taking one screenshot is the ceiling, not the floor, and it is optional for
copy edits. Do not write a spec file to prove a heading moved. Do not add a `package.json`
test script. A structural sanity check (balanced tags, a `node -e` parse of an inline data
array) is welcome because it costs seconds. A test suite is not.

**Enforced by:** advisory

## Facts that reach families must be verified

**Rule:** Every factual claim published in the trip guide, the pack check, or the gear hub,
meaning any price, weight, phone number, permit rule, group limit, or trail closure, must
trace to a primary source before it ships. Anything unverifiable must be labeled unverified
rather than estimated.

**Why:** The July 2026 audit found the guide telling leaders to call a ranger station that is
"closed to visitors," a 12 person cap stated without noting that leaders count toward it
(violation is a Class B misdemeanor), a food hang spec that understated the real rule, and
eight or more wrong prices including a $15 error on one pot and an "$80 Ursack" that exists
at no retailer. Parents read this to decide whether to send a 14 year old into wilderness
with no cell service.

**How to apply:** A manufacturer's own page or per variant store feed beats a search
snippet. An agency order PDF beats an agency summary page, because the public Sawtooth
regulations page contains at least two errors the signed orders do not. Never invent a
rating, review count, weight, or price to fill a required field; omit the product or mark it
unverified. Two sources encountered during the pillow audit were fabricated outright by
search summarization and were caught only by opening the actual page. Archive verification
under `roadmap/<topic>/research/` so a later session can re-check rather than re-research.

**Enforced by:** `roadmap/gear-gap-audit/research/` archive convention; advisory

## PRs are optional here

**Rule:** Do not treat a pull request as the required close out for a change. Commit to a
branch and push. Open a PR only when the change is worth review or the user asks for one.

**Why:** This repo carries four unmerged branches and two open PRs for a static site with a
single author, which is review ceremony with no reviewer. The global "Finish work with a PR"
rule assumes a team.

**How to apply:** This overrides the global `~/.claude/CLAUDE.md` "Finish work with a PR"
section for this repo. Still branch rather than committing straight to `main`, and still
report what landed with links. The PR step itself is what becomes optional.

**Enforced by:** advisory
