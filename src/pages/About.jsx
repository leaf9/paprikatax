import { Link } from 'react-router-dom'
import { PageHero, SectionHead, CtaBand } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { HERO, STORY, FIRM, TEAM, CTA } from '../content/about'

export default function About() {
  usePageMeta(
    'About',
    'PaprikaTax is the tradename of Nagy & Associates, P.A. — a Delaware CPA firm helping families make confident tax decisions.'
  )

  return (
    <>
      <PageHero bg={HERO.bg} eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      {/* STORY */}
      <section className="section founder" style={{ background: 'var(--cream)' }}>
        <div className="container founder-grid">
          <div className="founder-photos">
            <img className="dave" src={STORY.photos.dave.src} alt={STORY.photos.dave.alt} loading="lazy" />
            <img className="dad" src={STORY.photos.dad.src} alt={STORY.photos.dad.alt} loading="lazy" />
          </div>
          <div>
            <span className="kicker">{STORY.kicker}</span>
            <h2 style={{ fontSize: 'clamp(26px, 4.2vw, 38px)', marginBottom: 18 }}>{STORY.headline}</h2>
            {STORY.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} style={{ color: 'var(--ink-2)', marginBottom: 14 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FIRM */}
      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={FIRM.kicker} headline={FIRM.headline} sub={FIRM.text} />
          <div className="founder-creds">
            {FIRM.credentials.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <SectionHead kicker={TEAM.kicker} headline={TEAM.headline} />
          <div className="team-grid">
            {TEAM.members.map((m) => (
              <div className="team-card" key={m.name}>
                <img src={m.photo} alt={m.name} loading="lazy" />
                <div className="body">
                  <h3>{m.name}</h3>
                  <div className="title">{m.title}</div>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fineprint" style={{ marginTop: 16 }}>
            {TEAM.supportNote}
          </p>
        </div>
      </section>

      <CtaBand headline={CTA.headline} primaryLabel={CTA.primary} secondaryLabel={CTA.secondary} secondaryHref="/how-it-works" />
    </>
  )
}
