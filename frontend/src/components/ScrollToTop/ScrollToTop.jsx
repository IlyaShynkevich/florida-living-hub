import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Fixed navbar overlaps the top of the viewport (64px desktop, 56px mobile).
        // Offset the smooth scroll so the target isn't hidden underneath it.
        const navHeight = window.matchMedia('(max-width: 760px)').matches ? 56 : 64
        const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 12
        window.scrollTo({ top: y, behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
