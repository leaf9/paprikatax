import { PageHero, SectionHead, CtaBand, FaqList } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { HERO, GROUPS, CTA } from '../content/faqs'

export default function Faqs() {
  usePageMeta(
    'FAQs',
    'Straight answers about hiring your kids: legality, W-2s, workers’ comp, audits, entity types, and how PaprikaTax works.'
  )

  return (
    <>
      <PageHero bg={HERO.bg} eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      {GROUPS.map((group, i) => (
        <section className="section" style={i % 2 ? { background: 'var(--cream-2)' } : undefined} key={group.title}>
          <div className="container">
            <SectionHead center headline={group.title} />
            <FaqList items={group.items} />
          </div>
        </section>
      ))}

      <CtaBand headline={CTA.headline} sub={CTA.sub} primaryLabel={CTA.primary} />
    </>
  )
}
