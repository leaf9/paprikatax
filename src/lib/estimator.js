// Estimator math — intentionally mirrors the logic of app.paprikatax.com's
// public estimator: role hourly rate × annual hours, kid taxed as Single with
// the 2026 standard deduction, savings = pay × parent marginal rate − kid tax.
// This is a directional estimate; the paid kit computes exact, defensible numbers.

export const ROLES = [
  { id: 'office', label: 'Office & admin help', rate: 24.6, blurb: 'Filing, data entry, scheduling' },
  { id: 'model', label: 'Model for photos & ads', rate: 38.83, blurb: 'Product photos, promo content' },
  { id: 'tech', label: 'Tech & computer support', rate: 39.28, blurb: 'Devices, software, troubleshooting' },
  { id: 'marketing', label: 'Social media & marketing', rate: 51.34, blurb: 'Posting, research, content' },
]

export const SCHOOL_WEEKS = 42
export const SUMMER_WEEKS = 10

export const STANDARD_DEDUCTION_2026 = 16100

// Approximate 2026 single-filer federal brackets (inflation-adjusted estimates).
const KID_BRACKETS = [
  { upTo: 12400, rate: 0.1 },
  { upTo: 50400, rate: 0.12 },
  { upTo: 105700, rate: 0.22 },
  { upTo: Infinity, rate: 0.24 },
]

export const PARENT_RATES = [
  { id: 'r22', label: 'Under $100k', sub: 'household income', rate: 0.22 },
  { id: 'r24', label: '$100k – $200k', sub: 'household income', rate: 0.24 },
  { id: 'r32', label: '$200k – $400k', sub: 'household income', rate: 0.32 },
  { id: 'r35', label: '$400k+', sub: 'household income', rate: 0.35 },
]

export function annualHours(schoolHrsPerWk, summerHrsPerWk) {
  const school = clamp(schoolHrsPerWk, 0, 30) * SCHOOL_WEEKS
  const summer = clamp(summerHrsPerWk, 0, 40) * SUMMER_WEEKS
  return Math.round(school + summer)
}

export function kidFederalTax(pay) {
  let taxable = Math.max(0, pay - STANDARD_DEDUCTION_2026)
  let tax = 0
  let last = 0
  for (const b of KID_BRACKETS) {
    if (taxable <= 0) break
    const slice = Math.min(taxable, b.upTo - last)
    tax += slice * b.rate
    taxable -= slice
    last = b.upTo
  }
  return tax
}

export function estimate({ roleId, schoolHrs, summerHrs, rateId }) {
  const role = ROLES.find((r) => r.id === roleId)
  const parent = PARENT_RATES.find((r) => r.id === rateId)
  if (!role || !parent) return null

  const hours = annualHours(schoolHrs, summerHrs)
  const pay = Math.round(role.rate * hours)
  const kidTax = Math.round(kidFederalTax(pay))
  const parentSavings = Math.round(pay * parent.rate)
  const net = Math.max(0, parentSavings - kidTax)

  return {
    role,
    parent,
    hours,
    pay,
    kidTax,
    parentSavings,
    net: roundTo(net, 10),
    taxFreePortion: Math.min(pay, STANDARD_DEDUCTION_2026),
    lotsOfHours: hours > 1200,
  }
}

export function money(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function clamp(n, min, max) {
  const x = Number(n)
  if (Number.isNaN(x)) return min
  return Math.min(max, Math.max(min, x))
}

function roundTo(n, step) {
  return Math.round(n / step) * step
}
