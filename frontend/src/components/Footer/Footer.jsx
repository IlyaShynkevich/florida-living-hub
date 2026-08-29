import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          <svg className={styles.brandIcon} viewBox="0 0 32 32" role="img" aria-label="Florida Living Hub logo — wave">
            <rect width="32" height="32" rx="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <path d="M4 13 Q8 9 12 13 T20 13 T28 13" fill="none" stroke="#17a2b8" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M4 19 Q8 15 12 19 T20 19 T28 19" fill="none" stroke="#e2593f" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M4 25 Q8 21 12 25 T20 25 T28 25" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
          </svg>
          Florida Living Hub
        </p>
        <p className={styles.beta}>Beach Day Planner — Gulf Coast Beta</p>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/beach-finder">Beach Finder</Link>
          <Link to="/calculator">Utility Calculator</Link>
          <Link to="/about">About</Link>
          <a href="/about#roadmap">Roadmap</a>
        </nav>
        <p className={styles.copy}>
          Weather, UV and water temperature are live from Open-Meteo. Rip current, red tide and utility data are demo only.
        </p>
        <p className={styles.copy}>© {new Date().getFullYear()} Florida Living Hub</p>
      </div>
    </footer>
  )
}
