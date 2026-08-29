import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          <svg className={styles.brandIcon} viewBox="0 0 32 32" role="img" aria-label="Florida Living Hub logo — a breaking wave over a setting sun">
            <rect width="32" height="32" rx="7" fill="#f6f1e9" />
            {/* sun: a dome, not a full circle — it sets behind the wave */}
            <path d="M18.33 21.46A4.57 4.57 0 1 1 26.47 21.46Z" fill="#e2593f" />
            <path d="M13.87 7.33C14.68 7.33 15.9 7.44 16.75 7.69C17.6 7.94 18.33 8.33 18.99 8.85C19.64 9.37 20.31 10.15 20.68 10.79C21.05 11.43 21.15 12.33 21.18 12.7C21.21 13.07 21.08 13.18 20.85 13.01C20.62 12.84 20.25 11.99 19.8 11.65C19.35 11.31 18.67 11.09 18.13 10.99C17.59 10.89 17.11 10.91 16.53 11.07C15.95 11.23 15.17 11.56 14.64 11.93C14.11 12.3 13.69 12.78 13.37 13.31C13.05 13.84 12.79 14.5 12.7 15.09C12.61 15.68 12.64 16.3 12.81 16.86C12.98 17.42 13.25 17.95 13.7 18.44C14.15 18.93 14.86 19.47 15.5 19.8C16.14 20.13 16.99 20.31 17.52 20.41C18.05 20.51 17.84 20.54 18.66 20.38C19.48 20.22 21.34 19.57 22.43 19.44C23.52 19.31 24.49 19.49 25.17 19.6C25.85 19.71 26.13 19.93 26.53 20.13C26.93 20.33 27.24 20.55 27.55 20.82C27.86 21.09 28.21 21.46 28.41 21.76C28.61 22.06 29.12 22.62 28.77 22.62C28.42 22.63 27.14 21.94 26.33 21.79C25.52 21.64 24.72 21.65 23.92 21.74C23.12 21.83 22.65 21.93 21.51 22.34C20.37 22.75 18.16 23.85 17.08 24.23C16 24.61 15.75 24.55 15.03 24.62C14.31 24.69 13.56 24.71 12.76 24.64C11.96 24.57 11.07 24.42 10.24 24.2C9.41 23.98 8.58 23.67 7.77 23.31C6.96 22.95 6.11 22.49 5.36 22.01C4.61 21.53 3.59 21 3.26 20.41C2.93 19.82 3.23 19.27 3.37 18.49C3.51 17.71 3.78 16.62 4.09 15.75C4.4 14.88 4.82 14 5.22 13.28C5.62 12.56 6.03 12 6.5 11.43C6.97 10.86 7.47 10.32 8.02 9.85C8.57 9.38 9.14 8.96 9.79 8.6C10.44 8.24 11.22 7.9 11.9 7.69C12.58 7.48 13.06 7.33 13.87 7.33Z" fill="#0b3057" />
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
