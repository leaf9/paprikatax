# PaprikaTax — Website + Ad Landing Pages (one repo)

Full marketing site for PaprikaTax (client of Leaf9) PLUS campaign landing pages, all in
one Vite + React app deployed to the main domain. Sells the $97 "Paprika Kit"
(hire-your-kids tax strategy) for Nagy & Associates, P.A., a Delaware CPA firm.
Designed around the "beard token" framework (1698 Peter the Great beard tax = carry
proof, i.e. a signed CPA Opinion Letter).

## Structure

- **Site pages** (`src/pages/*.jsx`, rendered inside `SiteLayout` with header/footer):
  Home `/`, HowItWorks, TaxAdvisors, Pricing, Resources, Faqs, About, Connect.
  Route map in `src/App.jsx`.
- **Landing pages** (rendered with NO site chrome — single conversion path):
  `/beard-tax` → `src/pages/BeardTaxLanding.jsx`. Ad traffic points here with UTMs.
  Future campaign pages follow this pattern: page component + copy module + route
  outside `SiteLayout` + `noindex` via `usePageMeta`.
- **All copy is config-driven**: `src/content/<page>.js` (landing copy in
  `src/content/landingBeardTax.js`). Links/prices/Vimeo ID in `src/config.js`.
- Shared components: `SiteChrome.jsx` (header/footer), `Blocks.jsx` (PageHero,
  CtaBand, Steps, Features, Testimonials, FaqList, VideoEmbed), `TokenCoin.jsx`
  (brand medallion SVG), `Estimator.jsx` (email-gated savings estimator, used on
  Home + landing pages).
- Design tokens in `src/styles.css` (landing-era base) + `src/site.css` (site chrome).
  Fraunces variable font self-hosted.

## Funnel & tracking

Ad → `/beard-tax` → estimator CTA → **external estimator** at
`app.paprikatax.com/savings-estimator` (kept external per client regulations,
2026-07-24) → checkout at `app.paprikatax.com/pay-now`. UTMs/fbclid pass through
to both (captured in `main.jsx` BEFORE first render — don't move it back into an
effect; links are computed at render time).

**Dormant**: `src/components/Estimator.jsx` + `src/lib/estimator.js` are the fully
built embedded estimator with email gate (lead capture + Lead pixel event). Unused
but kept — regulations are "for now." The `savings-report-leads` Netlify form in
index.html stays for the same reason. If regulations ease, swap `EstimatorCta`
back to `Estimator` and on-page lead capture returns.

- Meta Pixel `1227262212899180`: PageView, ViewContent (per route), Lead (value =
  est. savings), InitiateCheckout, VideoPlay, Contact. GTM `GTM-P58K4T2L`; dataLayer
  events prefixed `pt_`.
- Leads → Netlify form `savings-report-leads`; contact form → `connect-messages`.
  Hidden static forms in `index.html` MUST stay in sync with the fetch submits
  (`src/lib/tracking.js` submitLead, Connect page onSubmit). POSTs 404 in local dev
  by design; UI never blocks on them.
- `checkoutUrl()` fallback UTMs for organic: `paprikatax-site/website/organic`;
  paid clicks keep captured UTMs (sessionStorage `pt_attribution`).
- Estimator math in `src/lib/estimator.js` — update `STANDARD_DEDUCTION_2026` and
  brackets annually.

## Commands

- `npm run dev` (PORT env respected; `.claude/launch.json` name: `paprikatax`)
- `npm run build` → `dist/` (Netlify config in netlify.toml, SPA fallback included)

## Launch cautions (as of 2026-07-24)

- **WP dependency**: Resources cards + Privacy link + the "Read the story" link point
  to `paprikatax.com/...` WordPress URLs. Before pointing DNS at this app, either
  migrate/redirect those posts or move WP to a subdomain (e.g. blog.paprikatax.com)
  with redirects — otherwise they 404.
- 99% of paid traffic is mobile — verify changes at 375–430px first.
- Compliance: savings always labeled "estimate"; money-back guarantee and 1 audit
  hour are real (per pricing page). Testimonials (Erica/Jared/Lisa) are from the
  client's site, unverified/first-name-only — replace with verified versions.
- Founder-story copy rule: honor Dave's dad as the hard worker; the gap is the
  system's, never his failure (client feedback, see memory).
- GitHub: https://github.com/leaf9/paprikatax (public, per Ben 2026-07-25). Repo is
  PUBLIC — keep client-sensitive material (ad performance beyond what's already in
  docs/, credentials, client communications) out of the repo.
- Vimeo explainer: `1157643090` (click-to-load facade, no third-party JS until play).

## Docs

- `docs/funnel-strategy.md` — diagnosis (ad data), funnel design, KPIs, launch checklist
- `docs/email-sequence.md` — 5-email lead follow-up for the ESP
