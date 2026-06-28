import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <span className={styles.brandIcon}>🌊</span>
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
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
            Roadmap
          </NavLink>
        </li>
      </ul>

      <button className={styles.ctaBtn} onClick={() => navigate('/beach-finder')}>
        Find a Beach Today
      </button>
    </nav>
  )
}
