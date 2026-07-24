// Pricing — the two tiers, guarantee, and pricing FAQs.

export const HERO = {
  eyebrow: 'Pricing',
  headline: 'One price. No subscription. Yours to keep.',
  sub: 'Start with the $97 kit. Add live CPA time only if you want it — and your $97 credits toward it.',
}

export const TIERS = [
  {
    id: 'diy',
    name: 'DIY + Email Support',
    price: 97,
    period: 'one-time',
    highlight: true,
    tagline: 'Everything you need to do this right',
    features: [
      'CPA-calculated highest defensible hourly wage',
      'Signed CPA Opinion Letter — your audit token',
      'Step-by-step playbooks and templates',
      'Email Q&A with the firm',
      '1 hour of audit support included',
      'Money-back guarantee if unsatisfied',
    ],
    cta: 'Buy Now — $97',
    ctaHref: 'checkout',
    micro: 'Secured by Stripe',
  },
  {
    id: 'live',
    name: 'Live Support',
    price: 247,
    period: 'total — your $97 credits toward it',
    highlight: false,
    tagline: 'Everything in DIY, plus a human',
    features: [
      'Everything in DIY + Email Support',
      '30-minute private Zoom with a CPA',
      'Real-time answers to your questions',
      'Help reviewing and completing your intake',
      'Tailored strategy guidance',
      'No double charge — $97 is credited',
    ],
    cta: 'Book your live session',
    ctaHref: 'bookLive',
    micro: 'Start with the $97 kit first · Different time? Email support@paprikatax.com',
  },
]

export const ANCHOR =
  'A bespoke reasonable-compensation opinion from a CPA typically runs $1,500+. Doing nothing costs the average business-owner family four figures a year. The kit is $97. Once.'

export const GUARANTEE = {
  title: 'Money-back guarantee',
  text: 'If the kit doesn’t work for your situation, email us and we’ll refund it. And if a compliant approach wouldn’t actually save you money, we’ll tell you that too — that’s the point of working with a real CPA firm.',
}

export const ADVISOR_NOTE = {
  text: 'Are you a tax or financial advisor? You qualify for perpetual advisor pricing.',
  link: { label: 'See advisor access', to: '/tax-advisors' },
}

export const FAQ = {
  kicker: 'Pricing questions',
  headline: 'Fair questions about the price',
  items: [
    {
      q: 'How much can I actually save?',
      a: 'Savings vary widely based on income, business type, number of children, and applicable rules. Some families save thousands; others see more modest benefits. Our goal is not to promise a number, but to design the most defensible strategy for your situation.',
    },
    {
      q: 'Is it really one-time?',
      a: 'Yes. $97, once — no subscription, no recurring fees. The strategy, letter, templates, and playbooks are yours to keep.',
    },
    {
      q: 'Why not just use AI or a calculator?',
      a: 'Tools and AI can generate numbers, but they can’t weigh conflicting rules, sign a CPA opinion letter, or stand behind a strategy. Small details often change the outcome.',
    },
    {
      q: 'What if my situation is unusual?',
      a: 'That’s common. Every submission is reviewed by a tax advisor, and live support is available if you want deeper guidance.',
    },
    {
      q: 'What if this doesn’t save me money?',
      a: 'In some cases, a compliant approach may not reduce total tax — or may even increase it. Our role is to help you understand the tradeoffs and identify additional strategies that, alongside dependent compensation, often lead to meaningful savings. And there’s a money-back guarantee.',
    },
    {
      q: 'Does this replace my CPA?',
      a: 'No. Many clients use PaprikaTax alongside their CPA. We focus specifically on hiring your kids — and hand your preparer a clean, defensible file.',
    },
  ],
}
