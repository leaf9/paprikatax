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
  headline: 'You’re already paying your kids. Could you prove it?',
  sub: 'Somewhere between allowance and payroll, most families skip the paperwork. When the taxman knocks — around here we call him Peter — the difference between keeping your savings and handing them back is a folder of records. Find out in 2 minutes whether yours would hold up.',
  image: {
    src: '/assets/story-knock.jpg',
    alt: 'Peter the Great, in full imperial dress, knocking on the door of a modern American farmhouse',
  },
  imageCaption: 'He still makes house calls.',
}

export const FORM = {
  title: 'Get your free Risk Scorecard',
  bullets: ['Your family-payroll exposure score', 'Bonus: 100+ real jobs kids can legitimately do, by age'],
  firstName: 'First name',
  email: 'Email address',
  submit: 'Send me the scorecard →',
  micro: 'Free · takes about 2 minutes · from a licensed CPA firm',
  privacy: 'No spam — your scorecard, your ideas list, and a few genuinely useful follow-ups. Unsubscribe anytime.',
  errorName: 'Add your first name so we know who’s asking.',
  errorEmail: 'That email doesn’t look right — mind checking it?',
}

export const SUCCESS = {
  title: 'You’re in.',
  body: 'Your 100+ ideas list is on its way to your inbox. Your scorecard takes about 2 minutes — take it now while you’re here:',
  cta: 'Take the 2-minute scorecard →',
  micro: 'Opens the PaprikaTax scorecard — your results will be sent to the same email.',
}

export const CONTRAST = {
  kicker: 'Same audit. Two endings.',
  headline: 'The knock is not the problem. The folder is.',
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
  bridge: 'The scorecard tells you which Boris you are right now — and exactly what would change the ending.',
}

export const WHATS_INSIDE = {
  kicker: 'What you get',
  headline: 'Two tools, one email.',
  scorecard: {
    title: 'The Family Payroll Risk Scorecard',
    points: [
      'The 7 checks an auditor actually makes — job description, time records, payroll trail, W-2, wage basis, labor rules, workers’ comp',
      'Your exposure score, in plain English',
      'What closes each gap — so you know exactly where you stand',
    ],
  },
  ideas: {
    title: 'Bonus: 100+ Tax-Savings Job Ideas',
    points: [
      'Real work kids 7–22 can legitimately do in a business like yours',
      'Grouped by age, so you can start where your kids are',
      'The roles that justify meaningful wages — not just chores with a paycheck',
    ],
    image: {
      src: '/assets/story-kids-working.jpg',
      alt: 'Boris painting Russian nesting dolls at a workbench with his two children, all working together',
    },
  },
  trustChips: ['Built by a 25-year CPA firm', '2-minute scorecard', 'Free email support if you have questions'],
}

export const FINAL_CTA = {
  headline: 'Keep the beard. Carry the token.',
  sub: 'Two minutes now beats an awkward conversation later.',
  cta: 'Get my free scorecard',
  image: {
    src: '/assets/story-token.jpg',
    alt: 'Peter the Great handing Boris a token on a chain in his workshop',
  },
}

export const FOOTER = {
  legal: [
    'PaprikaTax is a tradename of Nagy & Associates, P.A., a Licensed Certified Public Accounting Firm.',
    'This page is educational information, not individualized tax, legal, or financial advice. Results vary based on individual circumstances.',
  ],
  copyright: `© ${new Date().getFullYear()} PaprikaTax. All rights reserved.`,
}
