# PaprikaTax — "Beard Tax" Landing Page

Dedicated Meta-ads landing page for PaprikaTax (client of Leaf9). Sells the $97
"Paprika Kit" (hire-your-kids tax strategy: CPA-calculated wage, signed CPA Opinion
Letter, templates, 1 audit hour, money-back guarantee) for Nagy & Associates, P.A.

**This page intentionally continues the "Peter the Great beard tax" video ad** —
story-congruent hero, token motif, estimator that delivers the ad's promise
("see what your family may be able to keep"). It runs SEPARATE from the WordPress
homepage at paprikatax.com (which stays untouched).

## Funnel

Ad → this page → 3-question savings estimator → **email gate** (lead) → results +
$97 offer → existing checkout at `app.paprikatax.com/pay-now` (UTMs + email passed
through). Docs: `docs/funnel-strategy.md` (diagnosis, KPIs, launch checklist) and
`docs/email-sequence.md` (5-email follow-up).

## Stack & layout

- Vite + React 18, plain CSS (design tokens in `src/styles.css`), Fraunces variable
  font self-hosted via @fontsource. No router, single page.
- **All copy lives in `src/config.js`** — edit copy there, not in components.
- `src/lib/estimator.js` — tax math (mirrors app.paprikatax.com estimator: role rate ×
  hours, kid taxed Single w/ $16,100 2026 standard deduction, savings = pay × parent
  marginal rate − kid tax). Update `STANDARD_DEDUCTION_2026` + brackets annually.
- `src/lib/tracking.js` — UTM/fbclid capture (sessionStorage), pixel + dataLayer
  events, Netlify Forms lead submit.
- `src/components/Estimator.jsx` — the interactive flow (role → hours → income →
  email gate → results). `TokenCoin.jsx` — the beard-token SVG medallion.

## Integrations (shared with the client's main site)

- Meta Pixel `1227262212899180` — PageView, ViewContent, Lead (value = est. savings),
  InitiateCheckout. Init in `index.html`.
- GTM `GTM-P58K4T2L` in `index.html`; custom events pushed as `pt_*`.
- Leads: Netlify form `savings-report-leads` (hidden static form in `index.html`
  must keep fields in sync with the fetch submit in `tracking.js`). Form POST 404s in
  local dev by design; UI never blocks on it.

## Commands

- `npm run dev` (respects `PORT` env; `.claude/launch.json` has autoPort)
- `npm run build` → `dist/` (Netlify: netlify.toml already configured)

## Conventions / cautions

- 99% of paid traffic is mobile — verify changes at 375–430px first.
- Keep claims compliant: savings always labeled "estimate"; don't fabricate scarcity,
  testimonials, or guarantees beyond what pricing page states (money-back guarantee
  and 1 audit hour are real — confirmed from paprikatax.com/pricing).
- Assets in `public/assets/` were pulled from the client's WP media library.
- GitHub repo not yet created (needs Ben's confirmation of name/visibility per
  global protocol).
