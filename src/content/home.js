// Home (Business Owners) — carries the structure of the original homepage,
// rebuilt in the PaprikaTax design framework. (Campaign-story theming lives
// only in landing pages, e.g. src/content/landingBeardTax.js.)

export const HERO = {
  eyebrow: 'For business-owner parents',
  headline: 'Hire your kids. Lower your taxes. Do it right.',
  sub: 'You already support your kids with dollars the IRS taxed first. Put them on real payroll for real work instead — many families keep thousands every year, with a CPA-signed strategy and documentation that holds up.',
  primary: 'Estimate Savings',
  secondary: 'Buy Now — $97',
  micro: 'Free 60-second estimate · 15-minute setup · Real CPA support',
  trustChips: ['Built by a 25-year CPA firm', '15-minute intake', 'Free email + live CPA support'],
  image: { src: '/assets/family-hero.jpg', alt: 'A business-owner parent working with her child' },
}

export const FAMILY_TAX = {
  kicker: 'The problem',
  headline: 'The family tax, in one picture',
  sub: 'Same dollars, two routes. One gets taxed before your kids ever see it. One doesn’t.',
  allowance: {
    title: 'The allowance route',
    steps: [
      'Your business earns the money',
      'The IRS taxes it at your rate (22–37%)',
      'What’s left lands in your account',
      'You hand it to your kids anyway',
    ],
    result: 'Kids get the money. The IRS gets a cut first. Nobody learns anything.',
  },
  payroll: {
    title: 'The payroll route',
    steps: [
      'Your kids do real work in the business',
      'Their wages are a business deduction',
      'Their earnings start in the 0% federal bracket — and stay low far beyond it',
      'Money lands in their account — savings, Roth IRA, college',
    ],
    result: 'Same support for your family. Legitimately smaller tax bill. Kids who know what work is.',
  },
  disclaimer:
    'Exact savings depend on your entity type, state, and payroll taxes — that’s what your kit calculates.',
}

export const VIDEO = {
  kicker: 'Three minutes',
  headline: 'How the hire-your-kids strategy works',
  sub: 'Dave Nagy, CPA — the founder — walks through the strategy, the rules, and where people go wrong.',
}

export const EXAMPLES = {
  kicker: 'Real roles',
  headline: 'What this can look like in real life',
  sub: 'Keep more money in the family. Build skills. Save taxes — with roles matched to age and to your business.',
  items: [
    {
      image: '/assets/example-model.jpg',
      age: 'Age 9',
      role: 'Model for product photos',
      text: 'A one-time payment of about $3,500 for legitimate modeling or promotional work — a real deduction when documented correctly.',
    },
    {
      image: '/assets/example-social.jpg',
      age: 'Age 17',
      role: 'Social media manager',
      text: 'Real, ongoing work managing content and posting schedules. In this scenario the family kept $14,760.',
    },
    {
      image: '/assets/example-boardroom.jpg',
      age: 'Age 22',
      role: 'Operations manager',
      text: 'A college-aged dependent taking on complex work — $46,229 in total tax savings over time, funding college, food, and housing.',
    },
  ],
  footnote:
    'Illustrative scenarios. Your numbers depend on your business, state, and the work your kids actually do.',
  teach: {
    headline: 'When kids earn real pay for real work, something changes.',
    points: [
      'They learn responsibility and the value of a dollar',
      'They see how work connects to opportunity',
      'They start adult life with savings, skills, and a résumé',
    ],
  },
}

export const WHAT_YOU_GET = {
  kicker: 'What you get — and why it matters',
  headline: 'Everything you need to do this the right way',
  sub: 'For $97, once. Built by the CPA firm accountants themselves use for defensible compensation.',
  leadItem: {
    title: 'Your highest defensible wage — done for you in 15 minutes',
    text: 'Tell us about your business and your kids. A licensed CPA runs the numbers and sends back your complete strategy, typically by the next business day.',
  },
  items: [
    {
      title: 'A signed CPA Opinion Letter',
      text: 'If the IRS ever asks, you’re not explaining a theory — you’re handing over a letter from a licensed CPA firm.',
    },
    {
      title: 'Labor-law & workers’ comp checks',
      text: 'Age-based rules, restricted activities, and workers’ compensation requirements flagged before you start.',
    },
    {
      title: 'Age-appropriate work ideas',
      text: 'Practical roles your kids can legitimately do in your business, matched to their capability.',
    },
    {
      title: 'Time-tracking & documentation templates',
      text: 'Dependent-specific timesheets and proof-of-work logs that double as résumé-ready experience.',
    },
    {
      title: 'A personal video from Dave Nagy, CPA',
      text: 'A custom walkthrough of your strategy in plain English — share it with your spouse or tax preparer.',
    },
    {
      title: 'Implementation support',
      text: 'A “What To Do Next” letter, email Q&A, one audit-support hour, and optional live CPA consulting.',
    },
    {
      title: 'Bonus: family wealth playbooks',
      text: 'What to do with the wages — Roth IRAs for dependents, education funding, and strategies that stack.',
    },
  ],
  support: {
    title: 'Easy — and you’re never on your own',
    text: 'About 15 minutes of intake, then we do the heavy lifting. Free email support is included, and a live CPA session is available whenever you want a human ($97 credits toward it).',
  },
  cta: 'Get started — $97',
  ctaMicro: 'One-time payment · No subscription · Secured by Stripe',
}

export const PROCESS = {
  kicker: 'A simple process',
  headline: 'From intake to audit-ready in three steps',
  steps: [
    {
      n: '1',
      title: '15-minute guided intake',
      text: 'Tell us about your business, your kids, and the work they’ll do. Save and resume anytime — or share a secure link with your spouse or advisor.',
    },
    {
      n: '2',
      title: 'A real CPA reviews your numbers',
      text: 'Not a calculator. Human judgment weighs the tax rules, labor rules, and your family’s situation.',
    },
    {
      n: '3',
      title: 'Your strategy & signed workpapers arrive',
      text: 'Typically by the next business day: your defensible wage, signed CPA Opinion Letter, templates, and next steps.',
    },
  ],
  link: { label: 'See the full process', to: '/how-it-works' },
}

export const TESTIMONIALS = {
  kicker: 'Word of mouth',
  headline: 'What business-owner parents say',
  items: [
    {
      quote:
        'Best $100 I spent all year. I was nervous I’d mess it up, but this made it super simple. Now saving about $4,700 a year and putting it straight into my kids’ savings.',
      name: 'Erica',
      detail: 'saving ≈ $4,700/yr',
    },
    {
      quote:
        'Didn’t even know this was an option. The call explained everything and the audit protection sealed it for me. If you run a business and have kids, this is a no-brainer.',
      name: 'Jared',
      detail: 'business-owner parent',
    },
    {
      quote:
        'Honestly thought this sounded too good to be true. It’s not. Hired my twins and saved around $8,000 in taxes this year. Easy. Legal. Worth it.',
      name: 'Lisa',
      detail: 'saved ≈ $8,000 this year',
    },
  ],
}

export const FAQ_TEASER = {
  kicker: 'Fair questions',
  headline: 'Before you ask',
  items: [
    {
      q: 'Is this actually legal?',
      a: 'Yes — when done correctly. Hiring your children has long been permitted, but wages, roles, and labor rules must be handled properly. That’s exactly what we help you get right.',
    },
    {
      q: 'Does this replace my CPA?',
      a: 'No. Many clients use PaprikaTax alongside their CPA. We focus specifically on hiring your kids and maximizing the related tax savings — then hand your preparer a clean, defensible file.',
    },
    {
      q: 'What if I get audited?',
      a: 'You’ll have a signed CPA Opinion Letter, audit-ready documentation, and an hour of audit support from the firm included. You’re showing paperwork, not defending a theory.',
    },
    {
      q: 'What if this doesn’t save me money?',
      a: 'Honest answer: in some cases a compliant approach may not reduce your total tax — and we’ll tell you if that’s you, plus what other tax strategies might fit your family instead. That judgment call is exactly what you’re paying a real CPA firm for.',
    },
  ],
  link: { label: 'Read all FAQs', to: '/faqs' },
}
