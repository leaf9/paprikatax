import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, FOOTER } from '../content/global'
import { LINKS } from '../config'
import { checkoutUrl, track } from '../lib/tracking'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  // Collapse the full-width bar into a floating pill once the page scrolls.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const onBuy = () => track('InitiateCheckout', { value: 97, currency: 'USD' })

  return (
    <header className={`site-header ${scrolled && !open ? 'pilled' : ''}`}>
      <div className="container">
        <div className="bar">
          <Link to="/" className="logo" aria-label="PaprikaTax home">
            <img src="/assets/paprika-tax-logo.svg" alt="PaprikaTax" />
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {NAV.links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-ctas">
            <a className="est-link" href={estimateHref(location.pathname)}>
              {NAV.estimateCta}
            </a>
            <a className="btn btn-primary" href={checkoutUrl(LINKS.checkout)} onClick={onBuy}>
              {NAV.buyCta}
            </a>
          </div>

          <button
            className={`hamburger ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          {NAV.links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/about">About</Link>
          <Link to="/connect">Connect</Link>
          <div className="menu-ctas">
            <a className="btn btn-ghost" href={estimateHref(location.pathname)}>
              {NAV.estimateCta}
            </a>
            <a className="btn btn-primary" href={checkoutUrl(LINKS.checkout)} onClick={onBuy}>
              {NAV.buyCta}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

// On the homepage the estimator is embedded; elsewhere link back to it.
function estimateHref(pathname) {
  return pathname === '/' ? '#estimate' : '/#estimate'
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <img src="/assets/paprika-tax-logo.svg" alt="PaprikaTax" />
            <p style={{ maxWidth: 300 }}>{FOOTER.tagline}</p>
            <p style={{ marginTop: 10 }}>
              <a href={`mailto:${LINKS.supportEmail}`}>{LINKS.supportEmail}</a>
              <br />
              <a href={`tel:+1${LINKS.phone.replace(/-/g, '')}`}>{LINKS.phone}</a>
            </p>
          </div>
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              <div className="fl">
                {col.links.map((l) => (
                  <Link key={l.to} to={l.to}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="legal">
          {FOOTER.legal.map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
          ))}
          <p>
            <a href={LINKS.privacy}>Privacy Policy</a> · {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
