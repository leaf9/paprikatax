// Site-wide chrome: navigation, footer, shared CTA band copy.

export const NAV = {
  // Mirrors the current paprikatax.com primary nav
  links: [
    { to: '/', label: 'Business Owners', end: true },
    { to: '/tax-advisors', label: 'Tax Advisors' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/resources', label: 'Resources' },
    { to: '/faqs', label: 'FAQs' },
  ],
  estimateCta: 'Estimate Savings',
  buyCta: 'Buy Now',
}

export const FOOTER = {
  tagline: 'The smarter way to hire your kids.',
  columns: [
    {
      title: 'Explore',
      links: [
        { to: '/', label: 'Business Owners' },
        { to: '/tax-advisors', label: 'Tax Advisors' },
        { to: '/how-it-works', label: 'How It Works' },
        { to: '/pricing', label: 'Pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About' },
        { to: '/connect', label: 'Connect' },
        { to: '/resources', label: 'Resources' },
        { to: '/faqs', label: 'FAQs' },
      ],
    },
  ],
  legal: [
    'PaprikaTax is a tradename of Nagy & Associates, P.A., a Licensed Certified Public Accounting Firm.',
    'This site is educational information, not individualized tax, legal, or financial advice. Results vary based on individual circumstances. Savings figures are estimates or reported customer outcomes, not guarantees.',
  ],
  copyright: `© ${new Date().getFullYear()} PaprikaTax. All rights reserved.`,
}

export const CTA_BAND = {
  headline: 'See what your family could keep.',
  sub: 'Free 60-second estimate — then get your CPA-signed strategy for $97.',
  primary: 'Estimate Savings',
  secondary: 'Buy Now — $97',
}
