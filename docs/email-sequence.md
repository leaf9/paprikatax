# Lead Follow-Up Sequence — "Beard Tax" (5 emails)

Audience: leads from the landing-page estimator (they saw their savings number).
Merge fields available from the lead record: `firstName`, `estimatedSavings`, `role`,
`marginalRate`. Send from "Dave Nagy, CPA — PaprikaTax". Exit on purchase.

---

## Email 1 — instantly: the report they asked for

**Subject:** Your savings estimate: ~{{estimatedSavings}}/year
**Preview:** Plus the one document that makes it real.

{{firstName}} —

Here's the number you calculated: **~{{estimatedSavings}} per year**, based on
{{role}} work at your income level.

That's what shifting wages you already effectively pay (allowance, phone, activities)
into your child's 0% bracket could keep in your family — this year and every year.

Two honest caveats:

1. It's an estimate. Your exact number depends on your state, county, entity type,
   and the actual work your kids do.
2. Without documentation, that number isn't a strategy — it's a liability.

In 1698, Russians who paid the beard tax carried a copper token as proof.
The IRS version of the token is a **signed CPA Opinion Letter** plus proof-of-work
records. That's exactly what the Paprika Kit gives you for $97:

→ [Get the Paprika Kit — $97](https://app.paprikatax.com/pay-now)

— Dave Nagy, CPA
Nagy & Associates, P.A. (yes, a real licensed CPA firm)

---

## Email 2 — day 1: the mistake that costs people the whole thing

**Subject:** The IRS agrees with you (with one catch)
**Preview:** Hiring your kids is legal. Here's where it goes wrong.

{{firstName}} —

Hiring your children has been allowed under the tax code for decades. Courts have
upheld it again and again — *when the work is real, the wage is reasonable, and the
records exist.*

Here's how it actually goes wrong. People hear "just pay your kid," so they:

- Pay $15,000 for "help around the office" — no job description
- Pay their 8-year-old $95/hour — no wage justification
- Transfer money from personal accounts — no payroll trail

Any one of those turns a legitimate strategy into an easy audit win… for the IRS.

The kit exists to make the boring parts automatic: a defensible wage calculated from
wage data for your state and county, job descriptions, time logs, and a CPA's
signature on the strategy.

$97. One time. Money-back guarantee.

→ [Do it the right way](https://app.paprikatax.com/pay-now)

— Dave

---

## Email 3 — day 3: why "Paprika"

**Subject:** My father worked too hard to keep so little
**Preview:** The reason this exists.

{{firstName}} —

My father legally immigrated from Hungary in 1957 as a political refugee. He built a
small construction business and worked harder than anyone I've ever known.

Nobody ever showed him the rules that would have let that effort go further. He paid
full freight on every dollar, then supported his family with what was left.

I became a CPA. I spent 25 years advising families and accountants, and built
ReasonableCompensation — the tool accountants use to set audit-defensible salaries.

PaprikaTax is named for home, and it's the thing I wish someone had handed my dad:
the family version of the strategies bigger businesses use as a matter of course.

Your estimate was ~{{estimatedSavings}}/year. That's not a loophole — it's the rule,
used properly.

→ [Put it to work — $97](https://app.paprikatax.com/pay-now)

— Dave

---

## Email 4 — day 5: objections, answered honestly

**Subject:** "Will my CPA hate this?" and 4 other fair questions
**Preview:** Short, honest answers.

{{firstName}} — quick answers to the questions I hear most:

**"Will my CPA hate this?"** No — we hand them a clean file: wage calc, opinion
letter, records. Most preparers don't have time to research a defensible wage for a
12-year-old's social media work. We do exactly that piece.

**"What if I get audited?"** You'll have the token: a signed CPA Opinion Letter and
proof-of-work records, plus an hour of audit support from the firm, included.

**"Is my kid too young?"** Courts have allowed wages for children as young as 7 for
age-appropriate work. Modeling for product photos is the classic example.

**"What if it doesn't save me money?"** Sometimes a compliant approach doesn't —
we'll tell you if that's you, and there's a money-back guarantee.

**"Is this a subscription?"** No. $97 once.

→ [Get the kit](https://app.paprikatax.com/pay-now)

— Dave

---

## Email 5 — day 7: the math of waiting

**Subject:** Every month you wait ≈ {{estimatedSavings}} ÷ 12
**Preview:** The strategy only counts for the year you run it.

{{firstName}} —

Last note from me on this.

Your estimate was **~{{estimatedSavings}} per year**. Wages only count for the year
they're actually paid — this isn't retroactive. Set it up now and the savings apply
to this tax year; wait until January and this year's slice is gone.

The kit takes minutes to start, you can loop in your spouse or advisor, and if it
turns out not to fit your situation, you get your $97 back.

Keep the beard. Carry the token.

→ [Start your Paprika strategy — $97](https://app.paprikatax.com/pay-now)

— Dave Nagy, CPA

---

### Implementation notes

- Append UTM params to every CTA link, e.g.
  `?utm_source=email&utm_medium=lifecycle&utm_campaign=beard-tax-seq&utm_content=e1`.
- Exit trigger: Stripe purchase (suppress remaining emails).
- Optional day-10 "last chance" only if the client approves adding a deadline or bonus
  (e.g., "$247 live-call upgrade credit expires") — do not fabricate scarcity.
- Compliance: keep "estimates, not tax advice" footer + firm identification + unsubscribe.
