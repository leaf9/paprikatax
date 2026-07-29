import { useEffect, useRef, useState } from 'react'
import { LINKS, PRICE } from '../config'
import {
  HERO, FORM, SUCCESS, CONTRAST, WHATS_INSIDE, KIT, FINAL_CTA, FOOTER,
} from '../content/landingScorecard'
import { checkoutUrl, submitNetlifyForm, track, withAttribution } from '../lib/tracking'
import { usePageMeta } from '../lib/meta'

// Lead-capture landing page for the "Peter the Great" ad → free Risk Scorecard
// + 100 ideas. Chrome-free (rendered outside SiteLayout). The scorecard itself
// lives in the client's app; we capture the lead FIRST, then hand off with
// name/email in the URL so his app can skip its own capture step.
// Speaks to BOTH audiences: already paying their kids, and not yet started.
export default function ScorecardLanding() {
  const [showSticky, setShowSticky] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const heroRef = useRef(null)

  usePageMeta(
    'Free Family Payroll Risk Scorecard',
    'Hiring your kids can save thousands — if the paperwork holds up. Find out where you stand in 2 minutes, plus 100+ real jobs kids can legitimately do, by age.',
    { robots: 'noindex' }
  )

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && status !== 'done'), {
      threshold: 0.1,
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [status])

  const scrollToForm = (e) => {
    e?.preventDefault()
    document.getElementById('get')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    document.querySelector('#get input[name="firstName"]')?.focus({ preventScroll: true })
  }

  // Hand-off to the client's scorecard app, attribution + contact attached so
  // his app can prefill and skip re-asking for the email.
  const scorecardUrl = () =>
    withAttribution(LINKS.scorecardApp, { fname: firstName.trim(), email: email.trim() })

  const buyUrl = checkoutUrl(LINKS.checkout)
  const onBuyClick = () => track('InitiateCheckout', { value: PRICE.kit, currency: 'USD' })

  async function onSubmit(e) {
    e.preventDefault()
    if (honeypot) return // bot
    if (!firstName.trim()) return setError(FORM.errorName)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError(FORM.errorEmail)
    setError('')
    setStatus('sending')
    await submitNetlifyForm('scorecard-leads', {
      firstName: firstName.trim(),
      email: email.trim(),
    })
    track('Lead', { content_name: 'risk-scorecard' })
    setStatus('done')
  }

  const onHandoff = () => track('ScorecardAppClick', {})

  const formCard =
    status === 'done' ? (
      <div className="sc-card sc-success" id="get">
        <h3>
          {SUCCESS.title.replace('.', '')}
          {firstName ? `, ${firstName.trim()}.` : '.'}
        </h3>
        <p>{SUCCESS.body}</p>
        <a className="btn btn-primary btn-block" href={scorecardUrl()} onClick={onHandoff}>
          {SUCCESS.cta}
        </a>
        <p className="micro">{SUCCESS.micro}</p>
      </div>
    ) : (
      <div className="sc-card" id="get">
        <h3>{FORM.title}</h3>
        <ul className="sc-bullets">
          {FORM.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <form onSubmit={onSubmit} noValidate>
          <input
            type="text"
            name="firstName"
            placeholder={FORM.firstName}
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder={FORM.email}
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
          <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? 'One moment…' : FORM.submit}
          </button>
        </form>
        <p className="micro" style={{ textAlign: 'center' }}>{FORM.micro}</p>
      </div>
    )

  return (
    <>
      <header className="topbar">
        <div className="container">
          <img src="/assets/paprika-tax-logo.svg" alt="PaprikaTax" />
          <div className="firm-line">
            <span className="firm-name">A service of Nagy &amp; Associates, P.A.</span>
            <br />
            Licensed CPA Firm
          </div>
        </div>
      </header>

      {/* HERO + FORM — Peter at the door as a subtle faded background */}
      <section className="hero sc-hero" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <img src={HERO.background.src} alt="" loading="eager" style={{ objectPosition: '78% 20%' }} />
        </div>
        <div className="container">
          <div style={{ maxWidth: 620 }}>
            <div className="eyebrow">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="sub">{HERO.sub}</p>
            {formCard}
            <p className="micro" style={{ marginTop: 12 }}>{FORM.privacy}</p>
          </div>
        </div>
      </section>

      {/* CONTRAST — same audit, two endings */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">{CONTRAST.kicker}</span>
            <h2>{CONTRAST.headline}</h2>
          </div>
          <div className="sc-contrast">
            {CONTRAST.panels.map((p) => (
              <figure className="sc-panel" key={p.year}>
                <img src={p.image} alt={p.alt} loading="lazy" />
                <figcaption>
                  <span className="year">{p.year}</span>
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="sc-bridge">{CONTRAST.bridge}</p>
          <p style={{ textAlign: 'center', marginTop: 18 }}>
            <a className="btn btn-primary" href="#get" onClick={scrollToForm}>
              {FINAL_CTA.cta} →
            </a>
          </p>
        </div>
      </section>

      {/* WHAT'S INSIDE — two columns, icons, no photo */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">{WHATS_INSIDE.kicker}</span>
            <h2>{WHATS_INSIDE.headline}</h2>
          </div>
          <div className="sc-cols">
            {WHATS_INSIDE.columns.map((col) => (
              <div className="sc-col" key={col.title}>
                <SectionIcon name={col.icon} />
                <h3>{col.title}</h3>
                <ul>
                  {col.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="trust-chips sc-chips" style={{ justifyContent: 'center' }}>
            {WHATS_INSIDE.trustChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 22 }}>
            <a className="btn btn-primary" href="#get" onClick={scrollToForm}>
              {WHATS_INSIDE.cta} →
            </a>
          </p>
        </div>
      </section>

      {/* THE KIT — the core product, plainly presented */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
            <span className="kicker">{KIT.kicker}</span>
            <h2>{KIT.headline}</h2>
            <p className="sub">{KIT.sub}</p>
          </div>
          <div className="sc-kit">
            <ul>
              {KIT.items.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
            <div className="sc-kit-buy">
              <div className="price-tag">
                <span className="amount">{KIT.price}</span> <span className="period">{KIT.period}</span>
              </div>
              <a className="btn btn-primary btn-block" href={buyUrl} onClick={onBuyClick}>
                {KIT.cta}
              </a>
              <p className="micro">{KIT.micro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — token as a subtle faded background */}
      <section className="section final sc-final">
        <div className="hero-bg bg-soft" aria-hidden="true">
          <img src={FINAL_CTA.background.src} alt="" loading="lazy" />
        </div>
        <div className="container">
          <h2>{FINAL_CTA.headline}</h2>
          <p className="sub">{FINAL_CTA.sub}</p>
          <div className="final-ctas">
            <a href="#get" className="btn btn-primary" onClick={scrollToForm}>
              {FINAL_CTA.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          {FOOTER.legal.map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
          ))}
          <p>
            Questions? <a href={`mailto:${LINKS.supportEmail}`}>{LINKS.supportEmail}</a> ·{' '}
            <a href={LINKS.privacy}>Privacy Policy</a>
          </p>
          <p>{FOOTER.copyright}</p>
        </div>
      </footer>

      {/* STICKY BAR */}
      <div className={`sticky-bar ${showSticky && status !== 'done' ? 'show' : ''}`}>
        <div className="label">
          Get the free Risk Scorecard
          <small>2 minutes · plus 100+ job ideas</small>
        </div>
        <a href="#get" className="btn btn-primary" onClick={scrollToForm}>
          Find out →
        </a>
      </div>
    </>
  )
}

// Simple brand-colored line icons for the what's-inside columns.
function SectionIcon({ name }) {
  return (
    <span className="sc-icon" aria-hidden="true">
      {name === 'shield' ? (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 5 L40 11 v11 c0 10 -7 17 -16 21 C15 39 8 32 8 22 V11 Z" />
          <path d="M17 24 l5 5 l9 -11" />
        </svg>
      ) : (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6 a12 12 0 0 1 7 21.6 c-1.6 1.3 -2.4 2.6 -2.6 4.4 h-8.8 c-0.2 -1.8 -1 -3.1 -2.6 -4.4 A12 12 0 0 1 24 6 Z" />
          <path d="M19.6 37 h8.8 M21 41.5 h6" />
          <path d="M20 18.5 l3 3 l5.5 -6" />
        </svg>
      )}
    </span>
  )
}
