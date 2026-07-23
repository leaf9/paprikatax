import { useEffect, useRef, useState } from 'react'
import TokenCoin from './components/TokenCoin'
import Estimator from './components/Estimator'
import {
  LINKS, PRICE, HERO, STORY, FAMILY_TAX, EXAMPLES, SLOPPY, OFFER, FOUNDER,
  TESTIMONIALS, FAQ, FINAL_CTA, FOOTER,
} from './config'
import { captureAttribution, checkoutUrl, track } from './lib/tracking'

export default function App() {
  const [leadEmail, setLeadEmail] = useState('')
  const [showSticky, setShowSticky] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    captureAttribution()
    track('ViewContent', { content_name: 'beard-tax-landing' })
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      threshold: 0.1,
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const scrollToEstimate = (e) => {
    e?.preventDefault()
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    track('EstimatorView', {})
  }

  const buyUrl = checkoutUrl(LINKS.checkout, leadEmail ? { email: leadEmail } : {})
  const onBuyClick = () => track('InitiateCheckout', { value: PRICE.kit, currency: 'USD' })

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

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="sub">
              Allowance. Phones. Clothes. Activities. All paid with dollars the IRS taxed first. Put
              your kids on real payroll for real work, and the first <strong>$16,100</strong> each of
              them earns can land in their <strong>0% federal bracket</strong> — with documentation
              that holds up.
            </p>
            <div className="hero-ctas">
              <a href="#estimate" className="btn btn-primary" onClick={scrollToEstimate}>
                {HERO.cta}{' '}→
              </a>
              <p className="micro">{HERO.ctaMicro}</p>
            </div>
            <div className="trust-chips">
              {HERO.trustChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <div className="hero-token">
            <TokenCoin />
          </div>
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="story">
        <div className="container">
          <div className="kicker" style={{ color: 'var(--gold)' }}>
            {STORY.kicker}
          </div>
          <div className="story-grid">
            {STORY.beats.map((b) => (
              <div className="story-card" key={b.year}>
                <div className="year">{b.year}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY TAX */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">The problem</span>
            <h2>{FAMILY_TAX.headline}</h2>
            <p className="sub">{FAMILY_TAX.sub}</p>
          </div>
          <div className="routes">
            <div className="route bad">
              <h3>😮‍💨 {FAMILY_TAX.allowance.title}</h3>
              <ol>
                {FAMILY_TAX.allowance.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="result">{FAMILY_TAX.allowance.result}</div>
            </div>
            <div className="route good">
              <h3>🌶️ {FAMILY_TAX.payroll.title}</h3>
              <ol>
                {FAMILY_TAX.payroll.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="result">{FAMILY_TAX.payroll.result}</div>
            </div>
          </div>
          <div className="example-line">
            <em>Example:</em> $12,000 in wages to one teenager ≈ <em>$3,840 kept per year</em> at a
            32% marginal rate. Every year you run it.
          </div>
          <p className="fineprint">{FAMILY_TAX.disclaimer}</p>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="section examples">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Real roles</span>
            <h2>{EXAMPLES.headline}</h2>
            <p className="sub">{EXAMPLES.sub}</p>
          </div>
          <div className="examples-grid">
            {EXAMPLES.items.map((ex) => (
              <div className="example-card" key={ex.role}>
                <img src={ex.image} alt={`${ex.age}: ${ex.role}`} loading="lazy" />
                <div className="body">
                  <span className="age">{ex.age}</span>
                  <h3>{ex.role}</h3>
                  <p>{ex.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fineprint">{EXAMPLES.footnote}</p>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="section estimator-section" id="estimator-anchor">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">Free · 60 seconds</span>
            <h2>See what your family could keep.</h2>
            <p className="sub">
              Three questions. Real wage data. The number the IRS would rather you never calculate.
            </p>
          </div>
          <Estimator onLeadCaptured={setLeadEmail} />
        </div>
      </section>

      {/* SLOPPY */}
      <section className="section sloppy">
        <div className="container">
          <div className="section-head">
            <span className="kicker" style={{ color: 'var(--gold)' }}>
              A warning
            </span>
            <h2>{SLOPPY.headline}</h2>
          </div>
          <div className="sloppy-grid">
            {SLOPPY.fails.map((f) => (
              <div className="sloppy-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <div className="verdict">{f.verdict}</div>
              </div>
            ))}
          </div>
          <div className="third-way">
            <h3>{SLOPPY.third.title}</h3>
            <p>{SLOPPY.third.text}</p>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="section" id="offer">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">{OFFER.kicker}</span>
            <h2>{OFFER.headline}</h2>
            <p className="sub">{OFFER.sub}</p>
          </div>

          <div className="offer-card">
            <div className="offer-lead">
              <TokenCoin />
              <div>
                <h3>{OFFER.leadItem.title}</h3>
                <p>{OFFER.leadItem.text}</p>
              </div>
            </div>
            <div className="offer-items">
              {OFFER.items.map((item) => (
                <div className="offer-item" key={item.title}>
                  <span className="check">✓</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="offer-anchor">{OFFER.anchor}</div>
            <div className="guarantee">
              <h4>🛡️ {OFFER.guarantee.title}</h4>
              <p>{OFFER.guarantee.text}</p>
            </div>
            <div className="offer-cta">
              <div className="price-tag">
                <span className="amount">${PRICE.kit}</span> <span className="period">one-time</span>
              </div>
              <a className="btn btn-primary btn-block" href={buyUrl} onClick={onBuyClick}>
                {OFFER.cta}
              </a>
              <p className="micro">{OFFER.ctaMicro}</p>
              <p className="upgrade">{OFFER.upgrade}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section founder">
        <div className="container founder-grid">
          <div className="founder-photos">
            <img className="dave" src={FOUNDER.photos.dave.src} alt={FOUNDER.photos.dave.alt} loading="lazy" />
            <img className="dad" src={FOUNDER.photos.dad.src} alt={FOUNDER.photos.dad.alt} loading="lazy" />
          </div>
          <div>
            <span className="kicker">{FOUNDER.kicker}</span>
            <h2 style={{ fontSize: 'clamp(26px, 4.2vw, 38px)', marginBottom: 18 }}>{FOUNDER.headline}</h2>
            {FOUNDER.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <div className="founder-creds">
              {FOUNDER.credentials.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Word of mouth</span>
            <h2>{TESTIMONIALS.headline}</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.items.map((t) => (
              <div className="testi-card" key={t.name}>
                <div className="stars" aria-label="5 stars">
                  ★★★★★
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <div className="who">
                  {t.name}
                  <small>{t.detail}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
            <span className="kicker">Before you ask</span>
            <h2>{FAQ.headline}</h2>
          </div>
          <div className="faq-list">
            {FAQ.items.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final">
        <div className="container">
          <div className="token-small">
            <TokenCoin />
          </div>
          <h2>{FINAL_CTA.headline}</h2>
          <p className="sub">{FINAL_CTA.sub}</p>
          <div className="final-ctas">
            <a href="#estimate" className="btn btn-primary" onClick={scrollToEstimate}>
              {FINAL_CTA.primary} →
            </a>
            <a href={buyUrl} className="btn btn-ghost" onClick={onBuyClick}>
              {FINAL_CTA.secondary}
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
      <div className={`sticky-bar ${showSticky ? 'show' : ''}`}>
        {leadEmail ? (
          <>
            <div className="label">
              The Paprika Kit
              <small>${PRICE.kit} once · money-back guarantee</small>
            </div>
            <a href={buyUrl} className="btn btn-primary" onClick={onBuyClick}>
              Get the kit →
            </a>
          </>
        ) : (
          <>
            <div className="label">
              What could your family keep?
              <small>Free estimate · 60 seconds</small>
            </div>
            <a href="#estimate" className="btn btn-primary" onClick={scrollToEstimate}>
              See my number →
            </a>
          </>
        )}
      </div>
    </>
  )
}
