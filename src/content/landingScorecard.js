// ---------------------------------------------------------------------------
// "Risk Scorecard" landing page copy (route: /scorecard).
// Lead-capture page for Peter the Great ad traffic → free Family Payroll Risk
// Scorecard + 100+ job ideas. Hand-off to the client's scorecard app AFTER
// the email is captured here. Links live in src/config.js; edit copy here.
//
// Copy rules (client): risk-led not savings-led, no guarantee claims, no
// standard-deduction figures, easy + support messaging present. Most ad
// viewers watched ≤12s of the video, so the page can lean on Peter as a
// character but must stand alone without the full story.
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: 'Free · for business-owner parents',
  headline: 'Hiring your kids can save thousands — if the paperwork holds up.',
  sub: 'Plenty of business owners pay their kids through the business; few keep the records that make it stick. When the taxman knocks — around here we call him Peter — the difference between keeping the savings and handing them back is a folder of paperwork. Already doing it or just considering it, you’ll know where you stand in 2 minutes.',
  cta: 'Get my free scorecard',
  ctaMicro: 'Free · takes about 2 minutes · from a licensed CPA firm',
  // Rendered as a faded background; wide crop keeps Peter's knock visible
  // on the right side of the hero on desktop.
  background: {
    src: '/assets/story-knock-wide.jpg',
    alt: '',
  },
}

export const FORM = {
  bullets: ['Your family-payroll exposure score', 'Bonus: 100+ real jobs kids can legitimately do, by age'],
  firstName: 'First name',
  email: 'Email address',
  errorName: 'Add your first name so we know who’s asking.',
  errorEmail: 'That email doesn’t look right — mind checking it?',
}

// The opt-in modal — every CTA on the page opens this. Golden-ticket feel:
// the token coin, gold framing, one gift to claim.
export const MODAL = {
  eyebrow: 'Free · takes 2 minutes',
  title: 'Claim your Risk Scorecard',
  sub: 'Plus the 100+ Job Ideas list — both free, delivered to your inbox.',
  submit: 'Claim my free scorecard →',
  micro: 'From a licensed CPA firm · no cost, no catch',
  privacy: 'No spam — your scorecard, your ideas list, and a few genuinely useful follow-ups. Unsubscribe anytime.',
}

export const SUCCESS = {
  title: 'You’re in.',
  body: 'Your 100+ ideas list is on its way to your inbox. Your scorecard takes about 2 minutes — take it now while you’re here:',
  cta: 'Take the 2-minute scorecard →',
  micro: 'Opens the PaprikaTax scorecard — your results will be sent to the same email.',
}

export const CONTRAST = {
  kicker: 'Free 2-minute check',
  headline: 'Know where your family payroll stands — before anyone asks.',
  headlineCta: 'Check my score — free',
  panels: [
    {
      image: '/assets/story-audit-1698.jpg',
      alt: 'In a 1698 workshop, Peter the Great watches a saddened Boris pour out a pile of coins',
      year: '1698',
      caption: 'No records. Boris empties the coin box and hopes it’s enough.',
    },
    {
      image: '/assets/story-audit-today.jpg',
      alt: 'In a modern living room, Boris stands confidently beside neat stacks of financial records while Peter sits deflated on the couch',
      year: 'Today',
      caption: 'Records ready. Peter checks the stack, finds everything, and leaves with nothing.',
    },
  ],
  bridge: 'Your scorecard shows exactly what’s solid, what’s missing, and what to fix first.',
}

export const WHATS_INSIDE = {
  kicker: 'Yours free',
  headline: 'Here are the two free tools we’ll send you.',
  columns: [
    {
      icon: 'shield',
      title: 'The Family Payroll Risk Scorecard',
      points: [
        'The 7 checks an auditor actually makes — job description, time records, payroll trail, W-2, wage basis, labor rules, workers’ comp',
        'Your exposure score, in plain English',
        'What closes each gap — whether you’re fixing a setup or starting one from scratch',
      ],
    },
    {
      icon: 'spark',
      title: 'Bonus: 100+ Tax-Savings Job Ideas',
      points: [
        'Real work kids 7–22 can legitimately do in a business like yours',
        'Grouped by age, so you can start where your kids are',
        'The roles that justify meaningful wages — not just chores with a paycheck',
      ],
    },
  ],
  cta: 'Get both free',
  trustChips: ['Built by a 25-year CPA firm', '2-minute scorecard', 'Free email support if you have questions'],
}

// The core product, presented plainly as the next step. Keep it factual —
// no funnel talk, no urgency mechanics.
export const KIT = {
  kicker: 'Your next step',
  headline: 'Ready to do it right? That’s the Paprika Kit.',
  sub: 'When you want more than a score: tell us about your business and your kids, and a licensed CPA runs the numbers and sends back your complete strategy — typically by the next business day.',
  items: [
    'Your highest defensible wage, calculated for your child’s actual role, state, and county',
    'A signed CPA Opinion Letter',
    'Step-by-step implementation — job descriptions, timesheets, payroll setup',
    'Labor-law and workers’-comp checks for your state',
    'A personal video from Dave Nagy, CPA, explaining your strategy',
    'Free email support, plus one audit-support hour included',
  ],
  price: '$97',
  period: 'one-time',
  cta: 'Get the Paprika Kit — $97',
  micro: 'One-time payment · No subscription · Secured by Stripe',
}

export const FINAL_CTA = {
  headline: 'Keep more in the family — with proof in the folder.',
  sub: 'Two minutes now, and you’ll know exactly where you stand. Peter can knock all he likes.',
  cta: 'Get my free scorecard',
  // Rendered as a subtle faded background behind the closing section.
  background: {
    src: '/assets/story-token-wide.jpg',
  },
}

export const FOOTER = {
  legal: [
    'PaprikaTax is a tradename of Nagy & Associates, P.A., a Licensed Certified Public Accounting Firm.',
    'This page is educational information, not individualized tax, legal, or financial advice. Results vary based on individual circumstances.',
  ],
  copyright: `© ${new Date().getFullYear()} PaprikaTax. All rights reserved.`,
}
