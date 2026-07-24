// Tracking + attribution helpers.
// - Persists UTM/fbclid params from the ad click across the session.
// - Fires Meta Pixel + GTM dataLayer events (no-ops safely if blocked).
// - Appends attribution to outbound checkout links.

const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']
const STORE_KEY = 'pt_attribution'

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search)
    const found = {}
    ATTR_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v) found[k] = v
    })
    if (Object.keys(found).length) {
      const existing = getAttribution()
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...existing, ...found }))
    }
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function checkoutUrl(base, extra = {}) {
  const url = new URL(base)
  const attr = getAttribution()
  Object.entries({ ...attr, ...extra }).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v)
  })
  // Fallback attribution for visitors who arrived without UTMs (organic/direct).
  // Paid traffic keeps its captured UTMs from the ad click.
  if (!url.searchParams.get('utm_source')) {
    url.searchParams.set('utm_source', 'paprikatax-site')
    url.searchParams.set('utm_medium', 'website')
    url.searchParams.set('utm_campaign', 'organic')
  }
  return url.toString()
}

export function track(event, data = {}) {
  try {
    if (typeof window.fbq === 'function') window.fbq('track', event, data)
  } catch {
    /* pixel blocked */
  }
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: `pt_${event.toLowerCase()}`, ...data })
  } catch {
    /* gtm blocked */
  }
}

// Submits the lead to Netlify Forms. Resolves true on success, false otherwise
// (the UI shows results either way — capture must never block the visitor).
export async function submitLead(fields) {
  const body = new URLSearchParams({ 'form-name': 'savings-report-leads', ...fields })
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    return res.ok
  } catch (err) {
    console.warn('Lead submit failed (expected in local dev):', err)
    return false
  }
}
