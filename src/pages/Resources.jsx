import { PageHero, SectionHead, CtaBand } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { HERO, GROUPS, TOOL_CALLOUT } from '../content/resources'

export default function Resources() {
  usePageMeta(
    'Resources & Articles',
    'Guides, compliance answers, and short videos on hiring your kids — from the CPA firm behind PaprikaTax.'
  )

  return (
    <>
      <PageHero eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      <section className="section">
        <div className="container">
          {GROUPS.map((group) => (
            <div className="resource-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="resource-grid">
                {group.items.map((item) => (
                  <a className="resource-card" href={item.href} key={item.href}>
                    <span className="tag">{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.blurb}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        headline={TOOL_CALLOUT.headline}
        sub={TOOL_CALLOUT.text}
        primaryLabel={TOOL_CALLOUT.cta}
        secondaryLabel={null}
      />
    </>
  )
}
