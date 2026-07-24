import { PageHero, SectionHead, CtaBand, Steps, Features, Testimonials, FaqList } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { LINKS } from '../config'
import { track } from '../lib/tracking'
import {
  HERO, OUTCOMES, CLIENT_DELIVERABLES, PROCESS, COMMUNICATION, TESTIMONIALS, FAQ, FINAL,
} from '../content/advisors'

export default function TaxAdvisors() {
  usePageMeta(
    'For Tax & Financial Advisors',
    'Audit-ready workpapers for hiring dependents: wage calculations, labor-law checks, and third-party CPA-signed documentation for your clients.'
  )
  const onSignup = () => track('AdvisorSignupClick', {})

  return (
    <>
      <PageHero eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub}>
        <div className="hero-actions">
          <a className="btn btn-primary" href={LINKS.advisorSignup} onClick={onSignup}>
            {HERO.primary}
          </a>
          <a className="btn btn-ghost" href={LINKS.advisorPdf}>
            {HERO.secondary}
          </a>
        </div>
        <p className="micro" style={{ marginTop: 10 }}>
          {HERO.primaryMicro}
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead kicker={OUTCOMES.kicker} headline={OUTCOMES.headline} />
          <Features items={OUTCOMES.items} cols3 />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={CLIENT_DELIVERABLES.kicker} headline={CLIENT_DELIVERABLES.headline} />
          <Features items={CLIENT_DELIVERABLES.items} cols3 />
          <div className="note-band">
            <strong>{COMMUNICATION.headline}:</strong> {COMMUNICATION.text}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker={PROCESS.kicker} headline={PROCESS.headline} />
          <Steps steps={PROCESS.steps} cols={4} />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={TESTIMONIALS.kicker} headline={TESTIMONIALS.headline} />
          <Testimonials items={TESTIMONIALS.items} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center kicker={FAQ.kicker} headline={FAQ.headline} />
          <FaqList items={FAQ.items} />
        </div>
      </section>

      <CtaBand
        headline={FINAL.headline}
        sub={FINAL.sub}
        primaryLabel={FINAL.primary}
        primaryHref={LINKS.advisorSignup}
        secondaryLabel={FINAL.secondary}
        secondaryHref={LINKS.advisorPdf}
      />
    </>
  )
}
