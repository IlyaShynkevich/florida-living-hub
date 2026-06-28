import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>🌊 Florida Living Hub</p>
        <p className={styles.beta}>Beach Day Planner — Gulf Coast Beta</p>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/beach-finder">Beach Finder</Link>
          <Link to="/calculator">Utility Calculator</Link>
          <Link to="/about">About</Link>
          <a href="/about#roadmap">Roadmap</a>
        </nav>
        <p className={styles.copy}>All condition and utility data is demo only — not live.</p>
        <p className={styles.copy}>© {new Date().getFullYear()} Florida Living Hub</p>
      </div>
    </footer>
  )
}
