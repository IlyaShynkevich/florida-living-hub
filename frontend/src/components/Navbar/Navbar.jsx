import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <svg className={styles.brandIcon} viewBox="0 0 32 32" role="img" aria-label="Florida Living Hub logo — wave">
          <rect width="32" height="32" rx="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <path d="M4 13 Q8 9 12 13 T20 13 T28 13" fill="none" stroke="#17a2b8" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M4 19 Q8 15 12 19 T20 19 T28 19" fill="none" stroke="#e2593f" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M4 25 Q8 21 12 25 T20 25 T28 25" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
        </svg>
        Florida Living Hub
      </NavLink>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/beach-finder" className={({ isActive }) => isActive ? styles.active : ''}>
            Beach Finder
            <span className={styles.betaBadge}>Beta</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/calculator" className={({ isActive }) => isActive ? styles.active : ''}>
            Utility Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
            About
          </NavLink>
        </li>
        <li>
          <Link to="/about#roadmap" className={styles.plain}>
            Roadmap
          </Link>
        </li>
      </ul>

      <button className={styles.ctaBtn} onClick={() => navigate('/beach-finder')}>
        Find a Beach Today
      </button>
    </nav>
  )
}
