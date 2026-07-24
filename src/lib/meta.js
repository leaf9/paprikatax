import { useEffect } from 'react'

// Sets document title + meta description per route (SPA-friendly).
// options.robots: set e.g. 'noindex' for landing pages; cleared on routes
// that don't pass it, so it never leaks between client-side navigations.
export function usePageMeta(title, description, options = {}) {
  useEffect(() => {
    document.title = title ? `${title} | PaprikaTax` : 'PaprikaTax'
    if (description) setMeta('description', description)
    if (options.robots) {
      setMeta('robots', options.robots)
    } else {
      document.querySelector('meta[name="robots"]')?.remove()
    }
  }, [title, description, options.robots])
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
