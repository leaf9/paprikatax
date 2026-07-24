import { useState } from 'react'
import { PageHero, SectionHead } from '../components/Blocks'
import { usePageMeta } from '../lib/meta'
import { LINKS } from '../config'
import { track } from '../lib/tracking'
import { HERO, CHANNELS, FORM, SECURITY } from '../content/connect'

export default function Connect() {
  usePageMeta(
    'Connect',
    'Questions about hiring your kids or the Paprika Kit? Email, call, book a live CPA session, or send us a message.'
  )
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    if (data.get('company')) return // honeypot
    if (!data.get('name') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email') || '')) {
      setError('Add your name and a valid email so we can reply.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'connect-messages', ...Object.fromEntries(data) }).toString(),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      track('Contact', {})
      setStatus('sent')
    } catch (err) {
      console.warn('Connect form submit failed (expected in local dev):', err)
      setStatus('idle')
      setError(`Something hiccuped. Email us directly at ${LINKS.supportEmail} and we’ll reply within one business day.`)
    }
  }

  return (
    <>
      <PageHero eyebrow={HERO.eyebrow} headline={HERO.headline} sub={HERO.sub} />

      <section className="section">
        <div className="container">
          <div className="channel-grid">
            {CHANNELS.map((c) => {
              const href = c.href === 'bookLive' ? LINKS.bookLive : c.href
              const Tag = href ? 'a' : 'div'
              return (
                <Tag className="channel-card" href={href} key={c.title}>
                  <span className="icon" aria-hidden="true">
                    {c.icon}
                  </span>
                  <div>
                    <h4>{c.title}</h4>
                    <div className="l1">{c.line1}</div>
                    <div className="l2">{c.line2}</div>
                  </div>
                </Tag>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <SectionHead kicker={FORM.kicker} headline={FORM.headline} sub={FORM.sub} />
          {status === 'sent' ? (
            <div className="form-success">{FORM.success}</div>
          ) : (
            <form className="connect-form" onSubmit={onSubmit} noValidate>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" />
              <input type="email" name="email" placeholder="Email address" autoComplete="email" inputMode="email" />
              <textarea name="message" rows="5" placeholder="What are you working on?" />
              <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              {error && <div className="err" style={{ color: 'var(--paprika-deep)', fontWeight: 600, fontSize: 14 }}>{error}</div>}
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : FORM.submit}
              </button>
              <p className="micro">{FORM.privacy}</p>
            </form>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker={SECURITY.kicker} headline={SECURITY.headline} sub={SECURITY.text} />
        </div>
      </section>
    </>
  )
}
