# PaprikaTax "Beard Tax" Funnel — Strategy & Rationale

_Last updated: 2026-07-23_

## Diagnosis (from Meta ad account 1172372103931748, Mar 26 – Jul 23, 2026)

| Campaign | Spend | Clicks | CTR | CPC | Status |
|---|---|---|---|---|---|
| Peter the Great — Link Clicks (Business Owner Parents) | $94 | 982 | 7.52% | $0.10 | ACTIVE |
| Sales Campaign ("Payroll > Allowance" ad) | $447 | 2,937 | 11.22% | $0.15 | PAUSED |
| Paprika — Landing Page Views | $587 | 2,751 | 5.96% | $0.21 | PAUSED |
| Peter The Great — Sales | $108 | 45 | 4.75% | $2.40 | PAUSED |
| Tax Advisor Leads | $1,759 | 1,439 | 4.35% | $1.22 | ACTIVE |

~$3,000 spend, ~8,150 clicks, ≈1 purchase. **Traffic is 99% mobile.**

> ⚠️ **SUPERSEDED 2026-07-26 — read `docs/diagnosis-and-path.md` first.**
> The conclusion below ("the creative is excellent, the problem was the destination") was drawn
> from click-level metrics only and is **substantially wrong**. Deeper analysis of landing-page-view,
> age, placement, and pixel-event data showed:
> - Only **4,362 of the 8,825 "clicks" (49%) ever became a landing page view** — those CTRs were
>   heavily post-engagement clicks, not traffic. The 11% Sales-Campaign CTR was ~78% non-link clicks.
> - **54% of consumer traffic was aged 55+ (36% was 65+)** — people with no working-age dependents,
>   bought because `LINK_CLICKS` optimization favors the highest-CTR age brackets.
> - **The pixel has no `Purchase` event at all**, so the Sales-objective campaigns were optimizing
>   toward a conversion that does not exist, and no sale can be attributed.
> - Audience Network supplied 63% of one campaign's landing page views.
>
> The destination problems below are all real and worth fixing — but they were the *second* order
> issue, not the first. Corrected diagnosis and the 30-day plan: `docs/diagnosis-and-path.md`.

The destination problems (still valid, second-order):

1. **Story discontinuity** — the ad is a narrative (Peter the Great → beard token →
   documentation); the homepage opened with a generic question and never mentioned it.
2. **Zero lead capture** — the estimator said "No Signup Required" and let 8,000 visitors
   leave anonymously. No email list, no retargeting seed, no follow-up.
3. **Buried proof** — the $97 kit includes a **signed CPA Opinion Letter**, **1 audit-support
   hour**, and a **money-back guarantee**; none of this appeared on the homepage. Dave Nagy
   (25-yr CPA, built ReasonableCompensation) was invisible on the money pages.
4. **Cold traffic asked to buy in one session** on a page with 6 nav exits and a split
   audience (business owners + tax advisors).

## The new funnel

```
Meta ad (Peter the Great video)
  → /  landing page (story-congruent, no nav, single CTA)
      → 3-question savings estimator  (the ad's promise: "see what your family may keep")
          → email gate ("show my number + email the full report")   ← LEAD (pixel event)
              → instant results + offer bridge
                  → app.paprikatax.com/pay-now ($97, existing Stripe checkout)
                       ← InitiateCheckout (pixel event)
  Non-buyers → 5-email follow-up sequence (docs/email-sequence.md) + retargeting
```

Key conversion mechanics on the page:

- **Hero** carries the ad's central insight ("you're already paying your kids…") and the
  beard-token medallion for instant scent match.
- **Story strip** (1698 → the lesson → 2026) re-anchors visitors who skipped parts of the ad.
- **Allowance route vs. payroll route** makes the $16,100 / 0% bracket math visual.
- **Estimator = lead magnet.** Sunk-cost of 3 answers before the email ask; the gate promises
  (a) the number on screen and (b) a full report by email. Leads carry their estimate inputs
  into the CRM (role, hours, income band, estimated savings) for personalized follow-up.
- **"Where people get sloppy"** reframes the two failure modes from the ad and positions the
  signed CPA Opinion Letter as *the token*.
- **Offer section** merchandises everything that was hidden: opinion letter first, audit hour,
  guarantee, price anchor ($1,500+ bespoke vs. $97), $247 live-call upgrade.
- **Founder section** = Dave + his father's story (authentic reason the brand is "Paprika").
- **Sticky mobile CTA** switches from "See my number" → "Get the kit — $97" after lead capture.
- **UTM + fbclid passthrough** to checkout, so purchases stay attributable in Meta.

## Tracking

- Meta Pixel `1227262212899180` (same as main site): `PageView`, `ViewContent`, `Lead`
  (with estimated savings as value), `InitiateCheckout`.
- GTM `GTM-P58K4T2L` (same container as main site); events also pushed to `dataLayer` as
  `pt_lead`, `pt_initiatecheckout`, etc.
- Leads → **Netlify Forms** (`savings-report-leads`), fields include estimate inputs + UTMs.

## Launch checklist

_Updated 2026-07-24: the repo now contains the full site redesign; the landing page is the
`/beard-tax` route on the main domain (no subdomain)._

1. Deploy to Netlify (`npm run build`, publish `dist/`). Stage on a Netlify preview URL
   for client review; production launch = pointing paprikatax.com DNS at Netlify.
   **Before DNS cutover**: migrate or redirect the WP blog posts that Resources links to
   (or move WP to blog.paprikatax.com) and port the privacy policy.
2. In Netlify: enable form notifications for `savings-report-leads` and `connect-messages`
   (email to client) and/or wire a Make.com scenario (webhook → ESP list + Google Sheet).
3. Hook the email sequence (docs/email-sequence.md) to the lead list in the client's ESP.
4. Repoint the **Peter the Great** ad's destination URL to
   `https://paprikatax.com/beard-tax` with UTMs, e.g.
   `?utm_source=facebook&utm_medium=paid&utm_campaign=beard-tax&utm_content=peter-video`.
   (Until DNS cutover, the ad can point at the Netlify URL: `<site>.netlify.app/beard-tax`.)
5. **Change campaign objective**: duplicate the ad set into an OUTCOME_LEADS campaign
   optimizing for the pixel `Lead` event (link-click optimization attracts clickers, not
   buyers). Once ~50 purchases/mo exist, test a Purchase-optimized campaign.
6. Create retargeting audiences: pixel Lead (30/90d) minus Purchase; serve proof/ease
   creative to warm leads.
   **Note (2026-07-24, client Loom):** client does NOT want a money-back guarantee
   advertised, wants no standard-deduction dollar figure in marketing copy (anchors
   people low), and wants "easy + 15 minutes + free email/live support" messaging
   prominent. Their live pricing page still lists the guarantee — flag for consistency.
7. Swap testimonials for verified, full-name versions when available (FTC hygiene).

## KPI targets (cold Meta traffic, mobile)

| Step | Target |
|---|---|
| Landing → estimator start | 35–50% |
| Estimator start → lead (email) | 50–70% |
| Landing → lead | **20–30%** |
| Lead → purchase (7-day, page + emails) | 3–8% |
| Effective CPA at $0.15 CPC | $10–25 per lead-driven sale |

Even at the low end this beats the old funnel by two orders of magnitude
(old: ~0.01% click→purchase; new path needs ~0.5% click→purchase to profit at $97).
