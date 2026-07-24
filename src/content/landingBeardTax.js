// ---------------------------------------------------------------------------
// "Beard tax" landing page copy (route: /beard-tax).
// This page intentionally continues the Peter the Great video ad.
// Links & pricing live in src/config.js; edit copy here.
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: 'For business-owner parents',
  headline: 'You’re already paying your kids. You’re just doing it the expensive way.',
  sub: 'Allowance. Phones. Clothes. Activities. All paid with dollars the IRS taxed first. Put your kids on real payroll for real work, and the first $16,100 each of them earns can land in their 0% federal bracket — with documentation that holds up.',
  cta: 'See what your family could keep',
  ctaMicro: 'Free estimate · about 60 seconds · from a licensed CPA firm',
  trustChips: ['Built by a 25-year CPA', 'Signed CPA Opinion Letter', 'Money-back guarantee'],
}

export const STORY = {
  kicker: 'The beard tax, continued',
  beats: [
    {
      year: '1698',
      title: 'Peter the Great taxed beards.',
      text: 'Keep the beard? Pay the tax — and carry a copper token proving you did. No token, no beard.',
    },
    {
      year: 'The lesson',
      title: 'Proof is the whole game.',
      text: 'When taxes tighten, the people who understand the rules — and can prove they followed them — keep what’s theirs.',
    },
    {
      year: '2026',
      title: 'Same game, new beard.',
      text: 'Business-owner parents are quietly paying a “family tax” every year. Most never notice. Here’s how it works — and how to stop.',
    },
  ],
}

export const FAMILY_TAX = {
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
      'The first $16,100 each is federal-tax-free (2026 standard deduction)',
      'Money lands in their account — savings, Roth IRA, college',
    ],
    result: 'Same support for your family. Legitimately smaller tax bill. Kids who know what work is.',
  },
  exampleLine:
    'Example: $12,000 in wages to one teenager ≈ $3,840 kept per year at a 32% marginal rate. Every year you run it.',
  disclaimer:
    'Exact savings depend on your entity type, state, and payroll taxes — that’s what the kit calculates for you.',
}

export const EXAMPLES = {
  headline: 'What real work looks like',
  sub: 'From the Paprika playbook — 800+ real roles, matched to age and to your business.',
  items: [
    {
      image: '/assets/example-model.jpg',
      age: 'Age 9',
      role: 'Model for product photos',
      text: 'A one-time payment of about $3,500 for legitimate promotional work — a real deduction when documented correctly.',
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
  footnote: 'Illustrative scenarios. Your numbers depend on your business, state, and the work your kids actually do.',
}

export const SLOPPY = {
  headline: 'This is where people get sloppy.',
  fails: [
    {
      title: 'The “just pay your kid” crowd',
      text: 'They hear the idea and start moving money. No job description. No proof of work. No records to defend in an audit.',
      verdict: 'That’s not strategy. That’s a beard with no token.',
    },
    {
      title: 'The “looked it up and quit” crowd',
      text: 'They read the rules, feel the audit risk, and walk away from four figures a year.',
      verdict: 'That’s shaving the beard. The IRS keeps the difference.',
    },
  ],
  third: {
    title: 'There’s a third option.',
    text: 'Do exactly what you’re already doing — support your family — structured properly, at a defensible wage, with a licensed CPA’s signature behind it.',
  },
}

export const OFFER = {
  kicker: 'The Paprika Kit — $97, once',
  headline: 'Keep the beard. Carry the token.',
  sub: 'Everything you need to hire your kids the right way — built by the CPA firm accountants themselves use for defensible compensation.',
  leadItem: {
    title: 'A signed CPA Opinion Letter — your token',
    text: 'A licensed CPA runs your numbers and signs off on your wage strategy. If the IRS ever knocks, you’re not explaining a theory. You’re handing over a letter.',
  },
  items: [
    {
      title: 'Your defensible wage, calculated',
      text: 'CPA-calculated hourly rate for your child’s actual role, using wage data for your state and county — from 800+ real roles.',
    },
    {
      title: 'Step-by-step implementation',
      text: 'Payroll setup, job descriptions, and the exact order of operations — written for busy owners, not accountants.',
    },
    {
      title: 'Audit-ready recordkeeping templates',
      text: 'Proof-of-work logs, timesheets, and payment records — the paper trail that makes the strategy stick.',
    },
    {
      title: 'Labor-law & workers’ comp checks',
      text: 'Proactive checks so age-appropriate work stays compliant in your state.',
    },
    {
      title: 'A personal video from Dave Nagy, CPA',
      text: 'A custom walkthrough explaining your strategy in plain English — share it with your spouse or your tax preparer.',
    },
    {
      title: 'Email support + one audit-support hour',
      text: 'Real help from the firm if you get stuck — including an hour of audit support if you ever need it.',
    },
    {
      title: 'Bonus: family wealth playbooks',
      text: 'What to do with the wages — Roth IRAs for kids, education funding, and other strategies that stack on top.',
    },
  ],
  anchor:
    'A bespoke reasonable-compensation opinion from a CPA typically runs $1,500+. Doing nothing costs the average business-owner family four figures a year. The kit is $97. Once.',
  guarantee: {
    title: 'Money-back guarantee',
    text: 'If the kit doesn’t work for your situation, email us and we’ll refund it. And if a compliant approach wouldn’t actually save you money, we’ll tell you that too — that’s the point of working with a real CPA firm.',
  },
  upgrade: 'Want a human? Add a private 30-minute CPA call for $247 total — your $97 credits toward it.',
  cta: 'Get the Paprika Kit — $97',
  ctaMicro: 'One-time payment · No subscription · Secured by Stripe',
}

export const FOUNDER = {
  kicker: 'Why “Paprika”?',
  headline: 'Built by a CPA whose father earned every dollar the hard way.',
  paragraphs: [
    'Dave Nagy’s father legally immigrated from Hungary in 1957 as a political refugee. He built a small construction business and worked relentlessly — but nobody ever showed him the rules that would have let that effort go further.',
    'Dave became a CPA and spent 25+ years as a tax strategist, advising hundreds of families and accountants. He built ReasonableCompensation, the tool accountants use to set defensible, IRS-compliant salaries.',
    'PaprikaTax — named for home — points that same rigor at your family: Parents Allocate Payroll Rationally, Increasing Kids’ Assets.',
  ],
  credentials: [
    'David Nagy, CPA — 25+ years in tax strategy',
    'Nagy & Associates, P.A. — a licensed CPA firm',
    'Creator of ReasonableCompensation, used by accountants nationwide',
  ],
  photos: {
    dave: { src: '/assets/dave-nagy.jpg', alt: 'David Nagy, CPA, founder of PaprikaTax' },
    dad: { src: '/assets/dad.png', alt: 'Dave’s father, who immigrated from Hungary in 1957' },
  },
}

export const TESTIMONIALS = {
  headline: 'Parents who carry the token',
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

export const FAQ = {
  headline: 'Fair questions',
  items: [
    {
      q: 'Is this actually legal?',
      a: 'Yes — hiring your children has long been permitted under the tax code, when done correctly. Wages must be for real work at a reasonable rate, with proper records. That “done correctly” part is exactly what the kit handles.',
    },
    {
      q: 'What if I get audited?',
      a: 'That’s the reason PaprikaTax exists. You get a signed CPA Opinion Letter, audit-ready documentation templates, and an hour of audit support from the firm included. You’re not defending an idea you read online — you’re showing paperwork prepared under a licensed CPA firm’s standards.',
    },
    {
      q: 'Does this replace my CPA?',
      a: 'No — it hands your CPA a clean, defensible file. Most tax preparers don’t have time to research reasonable wages for a 12-year-old social media assistant. The kit does that piece; your CPA keeps doing the rest. Many customers loop their advisor in directly.',
    },
    {
      q: 'How fast can I set this up?',
      a: 'The intake takes minutes, and you can start and come back later. Most families have their wage strategy, opinion letter, and templates ready to implement within days — and the savings apply for the current tax year.',
    },
    {
      q: 'What if it doesn’t save me money?',
      a: 'Honest answer: in some situations, a compliant approach may not reduce your total tax — and we’ll tell you if that’s you, plus what other strategies might fit. And there’s a money-back guarantee if the kit isn’t useful for your situation.',
    },
    {
      q: 'Is it a subscription?',
      a: 'No. $97, one time, yours to keep. If you want live help, a private 30-minute CPA call is $247 total and your $97 credits toward it.',
    },
  ],
}

export const FINAL_CTA = {
  headline: 'The smarter way to hire your kids.',
  sub: 'See your number first — then decide if the kit is worth $97. (It usually takes one look.)',
  primary: 'See what your family could keep',
  secondary: 'Skip ahead — get the kit for $97',
}

export const FOOTER = {
  legal: [
    'PaprikaTax is a tradename of Nagy & Associates, P.A., a Licensed Certified Public Accounting Firm.',
    'This page is educational information, not individualized tax, legal, or financial advice. Results vary based on individual circumstances. Estimates use public wage data and 2026 federal tax parameters; state taxes and payroll taxes vary by entity type and location.',
  ],
  copyright: `© ${new Date().getFullYear()} PaprikaTax. All rights reserved.`,
}
