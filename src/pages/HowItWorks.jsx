import { PageHero, SectionHead, CtaBand, Steps, Features, VideoEmbed } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { HERO, STEPS, SYSTEM, VIDEO, COLLAB, PHOTOS } from '../content/howItWorks'

export default function HowItWorks() {
  usePageMeta(
    'How It Works',
    'From a 15-minute intake to CPA-signed workpapers — how the Paprika hire-your-kids strategy works, step by step.'
  )

  return (
    <>
      <PageHero eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      <section className="section">
        <div className="container">
          <SectionHead kicker={STEPS.kicker} headline={STEPS.headline} />
          <Steps steps={STEPS.steps} />
          <div className="photo-band two" style={{ marginTop: 18 }}>
            {PHOTOS.map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead center kicker={VIDEO.kicker} headline={VIDEO.headline} sub={VIDEO.sub} />
          <VideoEmbed />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker={SYSTEM.kicker} headline={SYSTEM.headline} />
          <Features items={SYSTEM.items} cols3 />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={COLLAB.kicker} headline={COLLAB.headline} />
          <Features items={COLLAB.items} cols3 />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
