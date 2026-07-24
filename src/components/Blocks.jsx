import { useState } from 'react'
import { Link } from 'react-router-dom'
import TokenCoin from './TokenCoin'
import { LINKS, PRICE, VIMEO_EXPLAINER_ID } from '../config'
import { CTA_BAND } from '../content/global'
import { checkoutUrl, track } from '../lib/tracking'

// ----- interior page hero with token watermark -----
export function PageHero({ eyebrow, headline, sub, children }) {
  return (
    <section className="page-hero">
      <div className="watermark" aria-hidden="true">
        <TokenCoin />
      </div>
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{headline}</h1>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </section>
  )
}

// ----- section header -----
export function SectionHead({ kicker, headline, sub, center }) {
  return (
    <div className="section-head" style={center ? { textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' } : undefined}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{headline}</h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  )
}

// ----- reusable CTA band -----
export function CtaBand({ headline, sub, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  const onBuy = () => track('InitiateCheckout', { value: PRICE.kit, currency: 'USD' })
  const primary = primaryHref || '/#estimate'
  const secondary = secondaryHref ?? checkoutUrl(LINKS.checkout)
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{headline || CTA_BAND.headline}</h2>
        <p className="sub">{sub || CTA_BAND.sub}</p>
        <div className="actions">
          <PolyLink className="btn btn-primary" href={primary}>
            {primaryLabel || CTA_BAND.primary}
          </PolyLink>
          {secondaryLabel !== null && (
            <a className="btn btn-ghost" href={secondary} onClick={secondary.includes('pay-now') ? onBuy : undefined}>
              {secondaryLabel || CTA_BAND.secondary}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

// Renders a router Link for internal paths, <a> otherwise.
export function PolyLink({ href, className, children, ...rest }) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  )
}

// ----- numbered steps -----
export function Steps({ steps, cols }) {
  return (
    <div className="steps-grid" style={cols ? { '--step-cols': cols } : undefined}>
      {steps.map((s) => (
        <div className="step-card" key={s.n}>
          <div className="num">{s.n}</div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  )
}

// ----- checked feature cards -----
export function Features({ items, cols3 }) {
  return (
    <div className={`feature-grid ${cols3 ? 'cols-3' : ''}`}>
      {items.map((f) => (
        <div className="feature-card" key={f.title}>
          <span className="check">✓</span>
          <div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ----- testimonials -----
export function Testimonials({ items }) {
  return (
    <div className="testi-grid">
      {items.map((t) => (
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
  )
}

// ----- FAQ accordion -----
export function FaqList({ items }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details className="faq-item" key={f.q}>
          <summary>{f.q}</summary>
          <div className="a">{f.a}</div>
        </details>
      ))}
    </div>
  )
}

// ----- click-to-load Vimeo embed (no third-party JS until play) -----
export function VideoEmbed({ label = 'Watch the 3-minute explainer' }) {
  const [play, setPlay] = useState(false)
  return (
    <div className="video-embed">
      {play ? (
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_EXPLAINER_ID}?autoplay=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="How the hire-your-kids strategy works"
        />
      ) : (
        <button
          className="video-facade"
          onClick={() => {
            setPlay(true)
            track('VideoPlay', { content_name: 'explainer' })
          }}
          aria-label="Play video"
        >
          <span className="play">▶</span>
          <span className="vf-label">{label}</span>
        </button>
      )}
    </div>
  )
}
