import { Link } from 'react-router-dom'
import { PageHero, SectionHead, CtaBand, FaqList } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { LINKS } from '../config'
import { checkoutUrl, track } from '../lib/tracking'
import { HERO, TIERS, ANCHOR, SUPPORT, ADVISOR_NOTE, FAQ } from '../content/pricing'

export default function Pricing() {
  usePageMeta(
    'Pricing',
    '$97 one-time for the full CPA-backed kit — signed Opinion Letter, templates, audit support. Optional live CPA session for $247 total.'
  )

  const hrefFor = (tier) => (tier.ctaHref === 'checkout' ? checkoutUrl(LINKS.checkout) : LINKS.bookLive)
  const onCta = (tier) => {
    if (tier.ctaHref === 'checkout') track('InitiateCheckout', { value: tier.price, currency: 'USD' })
  }

  return (
    <>
      <PageHero eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      <section className="section">
        <div className="container">
          <div className="tiers">
            {TIERS.map((tier) => (
              <div className={`tier ${tier.highlight ? 'highlight' : ''}`} key={tier.id}>
                {tier.highlight && <span className="flag">Start here</span>}
                <h3>{tier.name}</h3>
                <p className="tagline">{tier.tagline}</p>
                <div className="price">
                  ${tier.price} <small>{tier.period}</small>
                </div>
                <ul>
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${tier.highlight ? 'btn-primary' : 'btn-primary'} btn-block`}
                  href={hrefFor(tier)}
                  onClick={() => onCta(tier)}
                >
                  {tier.cta}
                </a>
                <p className="micro" style={{ textAlign: 'center' }}>
                  {tier.micro}
                </p>
              </div>
            ))}
          </div>

          <div className="offer-anchor" style={{ maxWidth: 880, margin: '22px auto 0' }}>
            {ANCHOR}
          </div>

          <div className="guarantee" style={{ maxWidth: 880, margin: '16px auto 0' }}>
            <h4>🤝 {SUPPORT.title}</h4>
            <p>{SUPPORT.text}</p>
          </div>

          <div className="note-band" style={{ maxWidth: 880, margin: '16px auto 0' }}>
            {ADVISOR_NOTE.text}{' '}
            <Link to={ADVISOR_NOTE.link.to} style={{ fontWeight: 700 }}>
              {ADVISOR_NOTE.link.label} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead center kicker={FAQ.kicker} headline={FAQ.headline} />
          <FaqList items={FAQ.items} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
