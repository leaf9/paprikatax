import { useState } from 'react'
import { Link } from 'react-router-dom'
import Estimator from '../components/Estimator'
import { SectionHead, CtaBand, Steps, Testimonials, FaqList, VideoEmbed } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { LINKS, PRICE } from '../config'
import { checkoutUrl, track } from '../lib/tracking'
import {
  HERO, FAMILY_TAX, VIDEO, EXAMPLES, WHAT_YOU_GET, PROCESS, TESTIMONIALS, FAQ_TEASER,
} from '../content/home'

export default function Home() {
  usePageMeta(
    'Hire Your Kids. Lower Your Taxes. Do It Right.',
    'A CPA-backed system that helps business-owner parents maximize safe tax savings, stay protected in an IRS audit, and give their kids real-world work experience.'
  )
  const [leadEmail, setLeadEmail] = useState('')
  const buyUrl = checkoutUrl(LINKS.checkout, leadEmail ? { email: leadEmail } : {})
  const onBuy = () => track('InitiateCheckout', { value: PRICE.kit, currency: 'USD' })

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ padding: 'clamp(56px, 9vw, 110px) 0' }}>
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="sub">
              You already support your kids with dollars the IRS taxed first. Put them on real
              payroll for real work instead — many families keep{' '}
              <strong>thousands every year</strong>, with a CPA-signed strategy and documentation
              that holds up.
            </p>
            <div className="hero-ctas" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              <a href="#estimate" className="btn btn-primary">
                {HERO.primary}
              </a>
              <a href={buyUrl} className="btn btn-ghost" onClick={onBuy}>
                {HERO.secondary}
              </a>
            </div>
            <p className="micro">{HERO.micro}</p>
            <div className="trust-chips">
              {HERO.trustChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <div className="hero-photo">
            <img src={HERO.image.src} alt={HERO.image.alt} />
          </div>
        </div>
      </section>

      {/* FAMILY TAX */}
      <section className="section">
        <div className="container">
          <SectionHead kicker={FAMILY_TAX.kicker} headline={FAMILY_TAX.headline} sub={FAMILY_TAX.sub} />
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
          <p className="fineprint">{FAMILY_TAX.disclaimer}</p>
        </div>
      </section>

      {/* VIDEO */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead center kicker={VIDEO.kicker} headline={VIDEO.headline} sub={VIDEO.sub} />
          <VideoEmbed />
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="section examples" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <SectionHead kicker={EXAMPLES.kicker} headline={EXAMPLES.headline} sub={EXAMPLES.sub} />
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
          <div className="example-line" style={{ marginTop: 28 }}>
            <em>{EXAMPLES.teach.headline}</em>{' '}
            {EXAMPLES.teach.points.join(' · ')}
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="section estimator-section">
        <div className="container">
          <SectionHead
            center
            kicker="Free · 60 seconds"
            headline="See what your family could keep."
            sub="Three questions. Real wage data. The number the IRS would rather you never calculate."
          />
          <Estimator onLeadCaptured={setLeadEmail} />
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead center kicker={WHAT_YOU_GET.kicker} headline={WHAT_YOU_GET.headline} sub={WHAT_YOU_GET.sub} />
          <div className="offer-card">
            <div className="offer-lead">
              <div>
                <h3>{WHAT_YOU_GET.leadItem.title}</h3>
                <p>{WHAT_YOU_GET.leadItem.text}</p>
              </div>
            </div>
            <div className="offer-items">
              {WHAT_YOU_GET.items.map((item) => (
                <div className="offer-item" key={item.title}>
                  <span className="check">✓</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="guarantee" style={{ marginBottom: 0 }}>
              <h4>🤝 {WHAT_YOU_GET.support.title}</h4>
              <p>{WHAT_YOU_GET.support.text}</p>
            </div>
            <div className="offer-cta">
              <a className="btn btn-primary btn-block" href={buyUrl} onClick={onBuy}>
                {WHAT_YOU_GET.cta}
              </a>
              <p className="micro">{WHAT_YOU_GET.ctaMicro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHead kicker={PROCESS.kicker} headline={PROCESS.headline} />
          <Steps steps={PROCESS.steps} />
          <p style={{ marginTop: 18 }}>
            <Link to={PROCESS.link.to} style={{ fontWeight: 700 }}>
              {PROCESS.link.label} →
            </Link>
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={TESTIMONIALS.kicker} headline={TESTIMONIALS.headline} />
          <Testimonials items={TESTIMONIALS.items} />
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="section">
        <div className="container">
          <SectionHead center kicker={FAQ_TEASER.kicker} headline={FAQ_TEASER.headline} />
          <FaqList items={FAQ_TEASER.items} />
          <p style={{ textAlign: 'center', marginTop: 18 }}>
            <Link to={FAQ_TEASER.link.to} style={{ fontWeight: 700 }}>
              {FAQ_TEASER.link.label} →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
