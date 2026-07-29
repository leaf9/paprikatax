import { useEffect, useRef, useState } from 'react'
import TokenCoin from '../components/TokenCoin'
import { LINKS, PRICE } from '../config'
import {
  HERO, FORM, MODAL, SUCCESS, CONTRAST, WHATS_INSIDE, KIT, FINAL_CTA, FOOTER,
} from '../content/landingScorecard'
import { checkoutUrl, submitNetlifyForm, track, withAttribution } from '../lib/tracking'
import { usePageMeta } from '../lib/meta'

// Lead-capture landing page for the "Peter the Great" ad → free Risk Scorecard
// + 100 ideas. Chrome-free (rendered outside SiteLayout). Every CTA opens the
// golden-ticket opt-in modal, so visitors convert wherever they are on the
// page. After capture, we hand off to the client's scorecard app with
// name/email in the URL so his app can skip its own capture step.
export default function ScorecardLanding() {
  const [showSticky, setShowSticky] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const heroRef = useRef(null)
  const modalRef = useRef(null)

  usePageMeta(
    'Free Family Payroll Risk Scorecard',
    'Hiring your kids can save thousands — if the paperwork holds up. Find out where you stand in 2 minutes, plus 100+ real jobs kids can legitimately do, by age.',
    { robots: 'noindex' }
  )

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      threshold: 0.1,
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  // Modal open/close: scroll lock, ESC to close, focus the first field.
  useEffect(() => {
    if (!modalOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setModalOpen(false)
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => {
      modalRef.current?.querySelector('input[name="firstName"], a.btn')?.focus()
    }, 60)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [modalOpen])

  const openModal = (e) => {
    e?.preventDefault()
    setModalOpen(true)
    track('OptinOpen', {})
  }
  const closeModal = () => setModalOpen(false)

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

      {/* HERO — Peter's knock visible on the right on desktop */}
      <section className="hero sc-hero" ref={heroRef}>
        <div className="hero-bg bg-reveal" aria-hidden="true">
          <img src={HERO.background.src} alt="" loading="eager" style={{ objectPosition: 'right center' }} />
        </div>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="eyebrow">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="sub">{HERO.sub}</p>
            <ul className="sc-bullets sc-bullets-dark">
              {FORM.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="hero-ctas" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn btn-primary" onClick={openModal}>
                {HERO.cta} →
              </button>
            </div>
            <p className="micro">{HERO.ctaMicro}</p>
          </div>
        </div>
      </section>

      {/* CONTRAST — same audit, two endings */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">{CONTRAST.kicker}</span>
            <h2>{CONTRAST.headline}</h2>
            <p style={{ marginTop: 18 }}>
              <button className="btn btn-primary" onClick={openModal}>
                {CONTRAST.headlineCta} →
              </button>
            </p>
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
            <button className="btn btn-primary" onClick={openModal}>
              {FINAL_CTA.cta} →
            </button>
          </p>
        </div>
      </section>

      {/* WHAT'S INSIDE — two columns, icons */}
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
            <button className="btn btn-primary" onClick={openModal}>
              {WHATS_INSIDE.cta} →
            </button>
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
              <a className="btn btn-buy btn-block" href={buyUrl} onClick={onBuyClick}>
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
          <img src={FINAL_CTA.background.src} alt="" loading="lazy" style={{ objectPosition: 'center 40%' }} />
        </div>
        <div className="container">
          <h2>{FINAL_CTA.headline}</h2>
          <p className="sub">{FINAL_CTA.sub}</p>
          <div className="final-ctas">
            <button className="btn btn-primary" onClick={openModal}>
              {FINAL_CTA.cta} →
            </button>
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
      <div className={`sticky-bar ${showSticky && !modalOpen ? 'show' : ''}`}>
        <div className="label">
          Get the free Risk Scorecard
          <small>2 minutes · plus 100+ job ideas</small>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          Find out →
        </button>
      </div>

      {/* GOLDEN-TICKET OPT-IN MODAL */}
      {modalOpen && (
        <div className="optin-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeModal()}>
          <div
            className="optin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="optin-title"
            ref={modalRef}
          >
            <button className="optin-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <div className="optin-coin" aria-hidden="true">
              <TokenCoin />
            </div>

            {status === 'done' ? (
              <>
                <h3 id="optin-title">
                  {SUCCESS.title.replace('.', '')}
                  {firstName ? `, ${firstName.trim()}.` : '.'}
                </h3>
                <p className="optin-sub">{SUCCESS.body}</p>
                <a className="btn btn-gold btn-block" href={scorecardUrl()} onClick={onHandoff}>
                  {SUCCESS.cta}
                </a>
                <p className="optin-micro">{SUCCESS.micro}</p>
              </>
            ) : (
              <>
                <div className="optin-eyebrow">{MODAL.eyebrow}</div>
                <h3 id="optin-title">{MODAL.title}</h3>
                <p className="optin-sub">{MODAL.sub}</p>
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
                  {error && <div className="optin-err">{error}</div>}
                  <button type="submit" className="btn btn-gold btn-block" disabled={status === 'sending'}>
                    {status === 'sending' ? 'One moment…' : MODAL.submit}
                  </button>
                </form>
                <p className="optin-micro">{MODAL.micro}</p>
                <p className="optin-privacy">{MODAL.privacy}</p>
              </>
            )}
          </div>
        </div>
      )}
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
