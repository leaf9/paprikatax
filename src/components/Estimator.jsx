import { useMemo, useState } from 'react'
import { ROLES, PARENT_RATES, SCHOOL_WEEKS, SUMMER_WEEKS, annualHours, estimate, money, STANDARD_DEDUCTION_2026 } from '../lib/estimator'
import { LINKS, PRICE } from '../config'
import { checkoutUrl, getAttribution, submitLead, track } from '../lib/tracking'

const STEPS = { ROLE: 0, HOURS: 1, RATE: 2, GATE: 3, RESULT: 4 }

export default function Estimator({ onLeadCaptured }) {
  const [step, setStep] = useState(STEPS.ROLE)
  const [roleId, setRoleId] = useState(null)
  const [schoolHrs, setSchoolHrs] = useState(4)
  const [summerHrs, setSummerHrs] = useState(10)
  const [rateId, setRateId] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const hours = annualHours(schoolHrs, summerHrs)
  const result = useMemo(
    () => (roleId && rateId ? estimate({ roleId, schoolHrs, summerHrs, rateId }) : null),
    [roleId, schoolHrs, summerHrs, rateId]
  )

  function goto(next) {
    setError('')
    setStep(next)
  }

  async function handleGateSubmit(e) {
    e.preventDefault()
    if (honeypot) return // bot
    const cleanEmail = email.trim()
    if (!firstName.trim()) return setError('Add your first name so the report isn’t addressed to “Hey you.”')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return setError('That email doesn’t look right — mind checking it?')

    setSubmitting(true)
    const attr = getAttribution()
    await submitLead({
      firstName: firstName.trim(),
      email: cleanEmail,
      role: result.role.label,
      hoursPerYear: String(result.hours),
      estimatedPay: String(result.pay),
      marginalRate: result.parent.label,
      estimatedSavings: String(result.net),
      utm_source: attr.utm_source || '',
      utm_medium: attr.utm_medium || '',
      utm_campaign: attr.utm_campaign || '',
      utm_content: attr.utm_content || '',
      fbclid: attr.fbclid || '',
      landedAt: window.location.href,
    })
    track('Lead', { content_name: 'savings-report', value: result.net, currency: 'USD' })
    setSubmitting(false)
    onLeadCaptured?.(cleanEmail)
    goto(STEPS.RESULT)
  }

  function handleCheckoutClick() {
    track('InitiateCheckout', { value: PRICE.kit, currency: 'USD' })
  }

  const progress = step === STEPS.RESULT ? 4 : step + 1

  return (
    <div className="estimator" id="estimate">
      <div className="est-progress" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < progress ? 'on' : ''} />
        ))}
      </div>

      {step === STEPS.ROLE && (
        <div>
          <div className="est-q">1. What kind of work would your child do?</div>
          <p className="est-hint">
            Rough estimate using public wage data (CA sample) — the kit calculates rates for your state
            and county across 800+ roles.
          </p>
          <div className="role-grid" role="radiogroup" aria-label="Type of work">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={roleId === r.id}
                className={`role-card ${roleId === r.id ? 'on' : ''}`}
                onClick={() => setRoleId(r.id)}
              >
                <div className="rl">{r.label}</div>
                <div className="rr">${r.rate.toFixed(2)}/hr</div>
                <div className="rb">{r.blurb}</div>
              </button>
            ))}
          </div>
          <div className="est-nav">
            <button className="btn btn-primary" disabled={!roleId} onClick={() => goto(STEPS.HOURS)}>
              Next →
            </button>
          </div>
        </div>
      )}

      {step === STEPS.HOURS && (
        <div>
          <div className="est-q">2. How many hours per week?</div>
          <p className="est-hint">Be realistic — a defensible schedule beats an impressive one.</p>
          <div className="hours-row">
            <Stepper
              label="School year"
              weeks={`× ${SCHOOL_WEEKS} weeks`}
              value={schoolHrs}
              min={0}
              max={30}
              onChange={setSchoolHrs}
            />
            <Stepper
              label="Summer"
              weeks={`× ${SUMMER_WEEKS} weeks`}
              value={summerHrs}
              min={0}
              max={40}
              onChange={setSummerHrs}
            />
          </div>
          <div className="est-summary">
            <span>
              ≈ <strong>{hours.toLocaleString()} hours/year</strong>
            </span>
            <span>
              est. pay <strong>{roleId ? money(ROLES.find((r) => r.id === roleId).rate * hours) : '—'}</strong>
            </span>
          </div>
          <div className="est-nav">
            <button className="back" onClick={() => goto(STEPS.ROLE)}>
              ← Back
            </button>
            <button className="btn btn-primary" disabled={hours === 0} onClick={() => goto(STEPS.RATE)}>
              Next →
            </button>
          </div>
        </div>
      )}

      {step === STEPS.RATE && (
        <div>
          <div className="est-q">3. Your household income?</div>
          <p className="est-hint">This sets the marginal rate those wages currently get taxed at.</p>
          <div className="rate-grid" role="radiogroup" aria-label="Household income">
            {PARENT_RATES.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={rateId === r.id}
                className={`role-card ${rateId === r.id ? 'on' : ''}`}
                onClick={() => setRateId(r.id)}
              >
                <div className="rl">{r.label}</div>
                <div className="rb">
                  {r.sub} · ~{Math.round(r.rate * 100)}% bracket
                </div>
              </button>
            ))}
          </div>
          <div className="est-nav">
            <button className="back" onClick={() => goto(STEPS.HOURS)}>
              ← Back
            </button>
            <button className="btn btn-primary" disabled={!rateId} onClick={() => goto(STEPS.GATE)}>
              See my number →
            </button>
          </div>
        </div>
      )}

      {step === STEPS.GATE && result && (
        <div>
          <div className="gate-head">
            <div className="lock" aria-hidden="true">
              🪙
            </div>
            <h3>Your estimate is ready.</h3>
            <p>
              We’ll show it right here — and email you the full breakdown with the documentation
              checklist that makes it defensible.
            </p>
          </div>
          <form className="gate-form" onSubmit={handleGateSubmit} noValidate>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* honeypot */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
            {error && <div className="err">{error}</div>}
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'One moment…' : 'Show my savings →'}
            </button>
          </form>
          <p className="gate-privacy">
            No spam. Your report plus a few genuinely useful follow-ups. Unsubscribe anytime.
          </p>
          <div className="est-nav" style={{ justifyContent: 'center' }}>
            <button className="back" onClick={() => goto(STEPS.RATE)}>
              ← Back
            </button>
          </div>
        </div>
      )}

      {step === STEPS.RESULT && result && (
        <div className="result-wrap">
          <div className="result-label">Estimated family savings</div>
          <div className="result-big">
            {money(result.net)}
            <small> /year</small>
          </div>
          <p className="result-note">
            {firstName ? `${firstName}, that’s` : 'That’s'} roughly what shifting{' '}
            <strong>{money(result.pay)}</strong> of {result.role.label.toLowerCase()} wages into your
            child’s bracket could keep in your family this year — and every year you run it.
          </p>

          <div className="result-rows">
            <div>
              <span>Estimated wages ({result.hours.toLocaleString()} hrs)</span>
              <strong>{money(result.pay)}</strong>
            </div>
            <div>
              <span>Tax-free to your child (2026 std. deduction)</span>
              <strong>{money(result.taxFreePortion)}</strong>
            </div>
            <div>
              <span>Child’s est. federal tax</span>
              <strong>{money(result.kidTax)}</strong>
            </div>
            <div>
              <span>No longer taxed at your ~{Math.round(result.parent.rate * 100)}%</span>
              <strong>−{money(result.parentSavings)}</strong>
            </div>
          </div>

          {result.lotsOfHours && (
            <p className="result-note">
              ⚠️ That’s a heavy schedule for a dependent. The kit helps you pick hours an auditor
              would nod at.
            </p>
          )}

          <div className="result-bridge">
            This number is an <strong>estimate</strong>. Without a defensible wage calculation and
            proof-of-work records, it’s also a <strong>liability</strong> — a beard with no token.
            The Paprika Kit turns it into a documented, CPA-signed strategy.
          </div>

          <a
            className="btn btn-primary btn-block"
            href={checkoutUrl(LINKS.checkout, { email })}
            onClick={handleCheckoutClick}
          >
            Get the Paprika Kit — ${PRICE.kit}
          </a>
          <p className="micro">One-time · Money-back guarantee · Secured by Stripe</p>
          <p className="sent-note">
            📬 Your full report is on its way to <strong>{email}</strong>. Numbers are estimates, not
            tax advice; the kit calculates your exact, defensible figures.
          </p>
        </div>
      )}

      <p className="fineprint" style={{ marginTop: 18 }}>
        Estimate assumes wages for real work at market rates, child taxed as Single with the{' '}
        {money(STANDARD_DEDUCTION_2026)} standard deduction (2026), no other child income. State
        income tax and payroll taxes (which vary by entity type) not included.
      </p>
    </div>
  )
}

function Stepper({ label, weeks, value, min, max, onChange }) {
  return (
    <div className="hours-box">
      <label>{label}</label>
      <span className="weeks">{weeks}</span>
      <div className="stepper">
        <button type="button" aria-label={`Decrease ${label} hours`} onClick={() => onChange(Math.max(min, value - 1))}>
          −
        </button>
        <div className="val">
          {value}
          <span className="unit">hrs/wk</span>
        </div>
        <button type="button" aria-label={`Increase ${label} hours`} onClick={() => onChange(Math.min(max, value + 1))}>
          +
        </button>
      </div>
    </div>
  )
}
