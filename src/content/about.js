// About — the story, the firm, the team.

export const HERO = {
  eyebrow: 'About PaprikaTax',
  headline: 'Helping families make confident tax decisions.',
  sub: 'A licensed CPA firm, a family story, and a strategy named for home.',
}

export const STORY = {
  kicker: 'Why “Paprika”?',
  headline: 'Named for a father who earned every dollar the hard way.',
  paragraphs: [
    'Dave Nagy’s father legally immigrated from Hungary in 1957 as a political refugee. He built a construction business through night school, worked relentlessly, and put his son through college.',
    '“My father didn’t know about strategies like PAPRIKA. Despite his hard work, he never found ways to make that effort go further.”',
    'Paprika is the spice of Hungarian home cooking — warmth, love, and the effort to care for one another. The name connects those family dinner tables to financial security, and it carries an acronym: Parents Allocate Payroll Rationally, Increasing Kids’ Assets.',
  ],
  photos: {
    dave: { src: '/assets/dave-nagy.jpg', alt: 'David Nagy, CPA, founder of PaprikaTax' },
    dad: { src: '/assets/dad.png', alt: 'Dave’s father, who immigrated from Hungary in 1957' },
  },
}

export const FIRM = {
  kicker: 'The company',
  headline: 'A real CPA firm stands behind every letter',
  text: 'PaprikaTax is the tradename of Nagy & Associates, P.A., a Delaware-based CPA firm with 25+ years of experience. The platform makes the PAPRIKA strategy simple for family-owned businesses while holding every file to rigorous compliance standards.',
  credentials: [
    'Licensed U.S. CPA firm — AICPA Code of Professional Conduct',
    'FTC Safeguards Rule & IRS Publication 4557 data-security practices',
    'Creator of ReasonableCompensation, used by accountants nationwide',
  ],
}

export const TEAM = {
  kicker: 'The people',
  headline: 'Who’s behind Paprika',
  members: [
    {
      photo: '/assets/dave-nagy.jpg',
      name: 'David Nagy, CPA',
      title: 'Tax Expert & Data Analyst',
      bio: '25+ years as a nationally recognized tax strategist. Founder of Nagy & Associates, P.A., and creator of ReasonableCompensation, the tool accountants use to set IRS-compliant salaries. Has advised hundreds of businesses and families on compensation planning and tax efficiency.',
    },
    {
      photo: '/assets/team-jonathan.png',
      name: 'Jonathan Arena, CISSP, ITIL, CSM',
      title: 'Client Data Security Advisor',
      bio: '25+ years across MSP, SaaS, and enterprise IT. Leads White Clay Technology Advisors, published author, board member of the Technology Forum of Delaware, and a recognized “Innovator Under 40.”',
    },
    {
      photo: '/assets/team-sarah.png',
      name: 'Sarah Nagy',
      title: 'Operations Manager',
      bio: 'Oversees customer service, workflow, and quality control from onboarding through final deliverables, with an analytics background from the University of Tennessee.',
    },
  ],
  supportNote:
    'Behind the core team: a software developer, a marketing strategist, a seasoned entrepreneur — and the business-owner parents who beta-tested every step.',
}

export const CTA = {
  headline: 'Meet the strategy the firm built for families.',
  primary: 'Estimate Savings',
  secondary: 'How it works',
}
