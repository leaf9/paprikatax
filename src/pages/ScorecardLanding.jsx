import { useEffect, useRef, useState } from 'react'
import { LINKS } from '../config'
import {
  HERO, FORM, SUCCESS, CONTRAST, WHATS_INSIDE, FINAL_CTA, FOOTER,
} from '../content/landingScorecard'
import { submitNetlifyForm, track, withAttribution } from '../lib/tracking'
import { usePageMeta } from '../lib/meta'

// Lead-capture landing page for the "Peter the Great" ad → free Risk Scorecard
// + 100 ideas. Chrome-free (rendered outside SiteLayout). The scorecard itself
// lives in the client's app; we capture the lead FIRST, then hand off with
// name/email in the URL so his app can skip its own capture step.
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
    'Paying your kids through the business? Find out in 2 minutes whether your paperwork would hold up — plus 100+ real jobs kids can legitimately do, by age.',
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

      {/* HERO + FORM */}
      <section className="hero sc-hero" ref={heroRef}>
        <div className="container sc-hero-grid">
          <div>
            <div className="eyebrow">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="sub">{HERO.sub}</p>
            {formCard}
            <p className="micro" style={{ marginTop: 12 }}>{FORM.privacy}</p>
          </div>
          <figure className="sc-panel sc-hero-panel">
            <img src={HERO.image.src} alt={HERO.image.alt} />
            <figcaption>{HERO.imageCaption}</figcaption>
          </figure>
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

      {/* WHAT'S INSIDE */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">{WHATS_INSIDE.kicker}</span>
            <h2>{WHATS_INSIDE.headline}</h2>
          </div>
          <div className="sc-inside">
            <div className="sc-inside-col">
              <h3>{WHATS_INSIDE.scorecard.title}</h3>
              <ul>
                {WHATS_INSIDE.scorecard.points.map((pt) => (
                  <li key={pt.slice(0, 24)}>{pt}</li>
                ))}
              </ul>
              <h3 style={{ marginTop: 22 }}>{WHATS_INSIDE.ideas.title}</h3>
              <ul>
                {WHATS_INSIDE.ideas.points.map((pt) => (
                  <li key={pt.slice(0, 24)}>{pt}</li>
                ))}
              </ul>
              <div className="trust-chips sc-chips">
                {WHATS_INSIDE.trustChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
            <figure className="sc-panel">
              <img src={WHATS_INSIDE.ideas.image.src} alt={WHATS_INSIDE.ideas.image.alt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final">
        <div className="container">
          <figure className="sc-panel sc-token">
            <img src={FINAL_CTA.image.src} alt={FINAL_CTA.image.alt} loading="lazy" />
          </figure>
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
          Would your paperwork hold up?
          <small>Free scorecard · 2 minutes</small>
        </div>
        <a href="#get" className="btn btn-primary" onClick={scrollToForm}>
          Find out →
        </a>
      </div>
    </>
  )
}
