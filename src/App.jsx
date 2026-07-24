import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { SiteHeader, SiteFooter } from './components/SiteChrome'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import TaxAdvisors from './pages/TaxAdvisors'
import Pricing from './pages/Pricing'
import Resources from './pages/Resources'
import Faqs from './pages/Faqs'
import About from './pages/About'
import Connect from './pages/Connect'
import BeardTaxLanding from './pages/BeardTaxLanding'
import { track } from './lib/tracking'

// Standard site chrome. Landing pages render OUTSIDE this layout so ad
// traffic gets a single conversion path with no nav exits.
function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

export default function App() {
  const location = useLocation()

  // Scroll to top on route change (respect #hash anchors), notify GTM of SPA views.
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
    track('ViewContent', { content_name: location.pathname })
  }, [location.pathname, location.hash])

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/tax-advisors" element={<TaxAdvisors />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
      </Route>

      {/* Ad landing pages — no site chrome. Add future campaign pages here. */}
      <Route path="/beard-tax" element={<BeardTaxLanding />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
