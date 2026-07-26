# PaprikaTax: Why Nothing Is Selling, and What To Do About It

**Analysis date:** 2026-07-26
**Data source:** Meta ad account `1172372103931748` + pixel dataset `1227262212899180`, full history (Mar 26 – Jul 26, 2026)
**Question asked:** Is this an offer problem we can't solve, or an execution problem we can?

---

## Executive verdict

**The offer has never actually been tested.** Roughly 80% of the failure is execution — measurement,
audience, placement, objective, and page — all of which are inside our control and fixable in
2–4 weeks. The remaining 20% is a real strategic problem with the *business model* around the $97
product, which needs a repositioning decision from Dave, not better ads.

The single most important finding: **the Meta pixel has no Purchase event. It has never fired, once,
in the account's history.** Two campaigns were set to a Sales objective and asked to optimize toward
a conversion that does not exist. That is not a tuning problem; it is a wiring problem, and it makes
every sales number in this account unmeasurable and every optimization decision blind.

What the client believes happened: *"8,000+ visitors, 1 sale — nobody wants this."*
What actually happened: *"~650 genuinely qualified people saw a page that didn't make the argument,
with no follow-up and no measurement, and 1 of them bought."* That is the **expected** result of that
setup, not an anomaly. There is no mystery here to explain away.

---

## The real funnel (all campaigns, full history)

| Stage | Count | Notes |
|---|---|---|
| Spend | **$3,145.86** | |
| Impressions | 131,637 | |
| "Clicks" (headline metric) | 8,825 | What everyone has been quoting |
| Outbound clicks | 5,607 | 36% of "clicks" were never link clicks |
| **Landing page views** | **4,362** | Only **49%** of "clicks" actually arrived |
| ViewContent | 4 | Effectively not implemented |
| InitiateCheckout | 10 | 0.23% of landing page views |
| **Purchase** | **0 recorded** | **Event does not exist on the pixel** |
| Actual sales (per Stripe) | 1 | Invisible to Meta; unattributable to any ad |

The "thousands of visitors" figure is roughly **half** what it appeared to be. And of the traffic that
did arrive, most of it could never have bought — see below.

### Spend allocation

| Campaign | Spend | Share |
|---|---|---|
| Tax Advisor Leads (B2B) | $1,843.56 | **58.6%** |
| Paprika – Landing Page Views | $586.56 | 18.6% |
| Sales Campaign | $447.22 | 14.2% |
| Peter the Great – Link Clicks | $158.74 | 5.0% |
| Peter The Great – Sales | $107.83 | 3.4% |
| Misc boosted post | $1.95 | 0.1% |

**59% of the budget went to the B2B advisor audience** — a different audience buying a different thing.
The primary consumer audience (business-owner parents) received **$1,302** total across four months,
and the best-performing consumer creative (Peter the Great) received **$159**.

---

## The four structural failures

### 1. No Purchase event → sales campaigns optimized toward nothing

The pixel's registered web events are exactly: `PageView`, `ViewContent`, `InitiateCheckout`, `Lead`.
There is **no `Purchase` event**. Confirmed via dataset quality and 28-day event stats.

Consequences, in order of severity:

- **"Sales Campaign" and "Peter The Great – Sales" (OUTCOME_SALES) had no conversion signal to learn
  from.** When Meta cannot find the optimization event, delivery degrades to whatever is cheapest.
  That is precisely what the placement data shows (failure #3).
- **We cannot count sales, attribute them, or compute CAC.** The "1 purchase" figure comes from Stripe.
  Meta has no idea it happened. No ad, audience, or creative can be credited or cut on evidence.
- **No purchase-based audiences are possible** — no value-based lookalikes, no buyer exclusions,
  no ROAS optimization, ever, until this is installed.

Secondary defect: `InitiateCheckout` is firing with a **value equal to the estimated tax savings**
(10 events carrying $44,222 in total "value" — ~$4,400 each). Any value-based optimization would chase
a number 45× the actual $97 price. This must be corrected to `value: 97`.

Also: Event Match Quality is **6.1/10**, with only IP, user-agent, and `fbp` cookie being passed. No
hashed email, name, or phone. Even the events that do fire match poorly to real Meta users, degrading
both optimization and attribution.

> **Ownership note:** the checkout lives on `app.paprikatax.com`, which is Dave's application. The
> missing Purchase event is a client-side implementation gap. We can specify it precisely; his dev
> (or Replit build) has to install it.

### 2. The majority of the budget reached people who cannot use the product

The product requires dependent children of working age (~7–22). The parent of such a child is
typically **30–54 years old**. Age breakdown of the two main consumer campaigns ($745 combined spend,
3,186 landing page views):

| Age | Landing page views | Share of traffic | Share of spend |
|---|---|---|---|
| 18–24 | 200 | 6.3% | |
| 25–34 | 425 | 13.3% | |
| 35–44 | 423 | 13.3% | |
| 45–54 | 420 | 13.2% | |
| 55–64 | 563 | 17.7% | |
| **65+** | **1,155** | **36.3%** | **39.3%** |
| **55+ combined** | **1,718** | **53.9%** | **56.7%** |

**Over half the consumer budget and traffic went to people 55 and older — and 36% of all traffic was
65+.** A 65-year-old business owner's children are adults with their own careers. They are structurally
incapable of buying this product.

**Why it happened:** the campaigns were optimized for `LINK_CLICKS`, and click-through rate rises
monotonically with age on Meta:

| Age | CTR (Peter the Great) |
|---|---|
| 25–34 | 5.28% |
| 35–44 | 5.46% |
| 45–54 | 5.77% |
| 55–64 | 7.11% |
| **65+** | **9.02%** |

Told to buy cheap clicks, the algorithm correctly bought the cheapest clickers: retirees. **The
celebrated "low CPC and great traffic" is largely an artifact of buying retiree clicks.** The
algorithm did its job flawlessly — it was given the wrong job.

### 3. Placement quality was severely degraded

- **Audience Network** produced **274 of the Sales Campaign's 434 landing page views (63%)** at a
  25.4% "CTR" — the classic signature of accidental taps in third-party apps.
- The Sales Campaign's Facebook **feed** delivery: 2,526 clicks → **126 landing page views**. About
  **95% of feed clicks never became a page view.** Those were post-engagement clicks (expands,
  reactions), not traffic.
- Overall, only **632 of that campaign's 2,937 "clicks" (22%) were outbound clicks at all.**

The headline 11–17% CTRs that looked "elite" were mostly people engaging with a post, not visiting a
site. This is the second illusion in the top-line numbers.

By contrast, **Peter the Great's feed delivery is genuinely healthy**: 1,323 clicks → 872 landing page
views (66% arrival). That creative and placement mix is a real asset worth scaling.

### 4. The ad never delivers the pitch, and the page never picked it up

The Peter the Great video is **127 seconds**. Engagement:

| Milestone | Count | % of impressions |
|---|---|---|
| 3-second plays | 5,108 | 21.6% |
| 25% watched | 1,390 | 5.9% |
| 50% watched | 548 | 2.3% |
| 75% watched | 257 | 1.1% |
| **100% watched** | **138** | **0.58%** |
| Average watch time | **12s of 127s** | 9.4% |

**1,049 people clicked through, but only 548 watched half the video.** More people clicked than
absorbed the argument. The beard-tax hook is an outstanding curiosity magnet — and curiosity is all it
delivers. The "hire your kids" mechanism and the $97 offer appear late and are seen by almost nobody.

That means the landing page had to carry the *entire* argument for essentially cold traffic. The
current homepage does the opposite: it opens with a generic question, routes the primary CTA to an
external estimator (a detour, not a conversion), buries the actual differentiators (CPA-signed opinion
letter, audit-support hour), never introduces Dave, and captures **no email**, so 100% of non-buyers
were lost permanently. No retargeting layer exists.

---

## What was actually tested

Filtering $3,145.86 of spend down to prospects who could plausibly buy:

| Filter | Remaining |
|---|---|
| Total landing page views | 4,362 |
| − B2B advisor campaign (different offer) | 3,638 |
| − age 55+ (no working-age dependents) | ~1,682 |
| − age 18–24 (unlikely business owners w/ kids) | ~1,437 |
| − Audience Network accidental traffic | ~1,300 |
| × realistic share who own a business *and* have kids 7–22 *and* earn enough for the strategy to pay (interest-based targeting, 40–60% precision) | **~520–780** |

**~650 genuinely qualified prospects over four months.** One purchase = **~0.15%**.

For cold interruption traffic → a generic page → an external-estimator detour → no email capture →
no nurture → no retargeting, the expected range is **0.1–0.5%**.

**The result is exactly what the setup predicts.** Nothing about this data supports the conclusion
that the market doesn't want the product. The offer was shown properly to almost no one.

---

## What *is* genuinely an offer/model problem

Being honest about the part that better execution will not fix:

1. **$97 one-time is a hard cold-traffic sale.** It is a considered purchase requiring trust in an
   unknown CPA firm, and it demands *work* after buying (15-minute intake, then actually running
   payroll). Deferred, uncertain benefit ("estimates"; "may not save you money"). It is not an
   impulse buy.
2. **The front-end economics are thin even when they work.** At a realistic post-fix 0.5–1.0% cold
   conversion and $0.40 per qualified landing page view, CAC lands around $40–80 against $97 of
   revenue — positive but fragile, before fees and before Meta needs ~50 conversions/week to
   optimize well (which this volume cannot supply for months).
3. **The audience is genuinely narrow.** Owns a business **and** has working-age kids **and** earns
   enough for the strategy to pay. Interest targeting reaches it loosely at best.

**But this reframes rather than condemns the business.** Dave runs a CPA firm. A business-owner parent
who adopts this strategy is a candidate for annual re-runs, the $247 consult, tax prep, and ongoing
advisory — plausibly **$500–2,000+ of lifetime value**, not $97 once. If the $97 kit is treated as the
*front door to a CPA practice* rather than as the product, then a $50–80 CAC is a good trade instead
of a marginal one, and the entire funnel design changes accordingly.

**That is the one decision only Dave can make**, and it determines whether this is a viable paid-
acquisition business at all.

---

## The path

### Phase 0 — Instrument (week 1, blocking, ~zero media cost)

Nothing else can be evaluated until this is done. **Do not spend another dollar on Sales objectives
until step 1 is live.**

1. **Install the `Purchase` event** on the Stripe confirmation: `value: 97`, `currency: 'USD'`.
   *(Client-side task on `app.paprikatax.com`.)*
2. **Fix `InitiateCheckout`** to pass `value: 97` — not estimated savings.
3. **Add Advanced Matching** (hashed email + name) to lift EMQ from 6.1.
4. **Add a `Lead` event** at whatever email capture we land on (see Phase 2).
5. **Deploy the new site + `/beard-tax` landing page** and repoint the Peter the Great ad to it.
6. Verify all four events in Events Manager Test Events before relying on them.

### Phase 1 — Stop the bleeding (week 1, immediate recovery)

1. **Restrict age to 30–54** on all consumer campaigns. Recovers ~55% of currently wasted reach.
2. **Turn off Audience Network** (and Audience Network Rewarded). Restrict to Facebook Feed,
   Instagram Feed, Stories, Reels.
3. **Abandon `LINK_CLICKS`.** Interim objective: optimize for the `Lead` event (enough volume to
   learn); move to Purchase optimization once it clears ~30–50/week.
4. **Re-scope the advisor campaign.** 66 leads at $27.93 consumed 59% of the budget. Ask Dave the one
   question that settles it: *how many of those 66 became paying advisor partners or referred a
   client?* If the answer is unknown or near zero, cut it to ≤25% of budget until it can be measured.

### Phase 2 — Build the missing middle (weeks 2–4)

1. **Email capture.** This is the structural gap: today 100% of non-buyers vanish. Because the
   estimator must stay external for regulatory reasons, either (a) Dave adds email capture to his
   estimator, or (b) we gate a "what your family could keep" report on our own site. One of these has
   to happen — otherwise there is no list, no nurture, and no second chance.
2. **Turn on the 5-email nurture sequence** (already written — `docs/email-sequence.md`).
3. **Build the retargeting layer**: 50%+ video viewers, 30-day landing page visitors, estimator
   clickers, checkout abandoners → proof-and-ease creative. **A $97 considered purchase converts on
   touch 3–5, not touch 1.** Its absence alone could account for most of the missing revenue.
4. **Re-cut the creative.** Produce a 30–45s version that delivers hook → mechanism → offer, plus a
   variant that states the offer in the first 15 seconds. Reserve the 127s film for warm/retargeting
   audiences where completion rates justify it. Revive "Payroll > Allowance," which was paused despite
   being the strongest consumer angle.

### Phase 3 — Fix the economics (month 2+)

1. **Reposition around outcome and human**, not documents. Test packaging: $97 kit vs. $297
   done-with-you vs. free-estimate-then-consult.
2. **Define real LTV** (renewals + $247 consults + tax prep + advisory) so we know what CAC is
   affordable. This is the number that makes or breaks paid acquisition.
3. **Test high-intent search.** Google queries like "hire my kids taxes," "put kids on payroll,"
   "hiring children tax strategy" reach people already solving this problem. For a considered
   purchase, intent traffic typically outperforms interruption traffic by an order of magnitude.
4. **Evaluate the advisor channel as the real business.** One advisor can deliver many clients.
   If the B2B motion works, it may be a better use of budget than consumer acquisition — but it needs
   the measurement from Phase 0/1 to prove it either way.

---

## Expected economics after Phases 0–2

Scenarios, not promises — stated so they can be checked against reality:

| Metric | Target range |
|---|---|
| Cost per qualified landing page view | $0.35–0.60 (already demonstrated once age/placement corrected) |
| Landing page view → email lead | 15–25% |
| Cost per lead | $2–4 |
| Lead → purchase within 30 days (page + nurture + retargeting) | 3–8% |
| Blended CAC | $30–120 |
| Verdict on $97 alone | Marginal |
| Verdict with $247 consult attach + renewals | Healthy |

**Decision gate:** run Phases 0–2 with a defined budget (suggest $1,500–2,500 over 30 days, i.e. less
than what was spent on the advisor campaign alone). If, with Purchase tracking live, a corrected
audience, a story-congruent page, email capture, and a retargeting layer, the funnel still cannot
produce a lead at under ~$8 and a sale at under ~$150, then the offer itself is the constraint and we
say so plainly and recommend repositioning or stopping.

**That is the honest test. It has not been run yet.**

---

## What to tell the client

1. **We found the cause, and it is specific, evidenced, and mostly mechanical** — not "ads don't work."
2. **The largest single cause sits in his own checkout**: no Purchase event, so his Sales campaigns
   were optimizing toward a conversion that doesn't exist and no sale could ever be attributed.
3. **The second largest is ours to own**: click-optimized campaigns bought a 55+ audience that cannot
   use the product, on placements that generate accidental taps, pointed at a page that didn't make
   the argument and captured no emails. We have already rebuilt the page and the tracking layer.
4. **The strategic question is his**: is $97 the product, or the front door to the firm? Answer
   determines whether paid acquisition can ever pay.
5. **The ask**: 30 days, one properly instrumented test, defined kill criteria.

---

## Appendix: data-quality caveats

- **Our own testing polluted the pixel.** Local development on 2026-07-24 fired ~170 `ViewContent`
  and several hundred `PageView` events into the production dataset from `localhost`. Recent
  `ViewContent` counts are therefore not trustworthy. Fixed at source: the pixel now refuses to
  initialize on localhost/preview hostnames (`PT_TRACKING_ENABLED` guard in `index.html`).
- `ViewContent` was effectively never implemented on the live WordPress site (4 events across four
  months of real traffic), so no content-engagement analysis is possible for the historical period.
- Sales are known only from Stripe. All Meta-side purchase data is absent by definition until the
  Purchase event ships.
- Age/placement data is unavailable for the two smaller paused campaigns; their skew is assumed
  similar to the campaigns that do report it.
