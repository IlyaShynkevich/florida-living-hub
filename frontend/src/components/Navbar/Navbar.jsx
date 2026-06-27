import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <span className={styles.brandIcon}>🌊</span>
        Florida Living Hub
      </NavLink>
      <ul className={styles.navLinks}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
        <li><NavLink to="/beach-finder" className={({ isActive }) => isActive ? styles.active : ''}>Beach Finder</NavLink></li>
        <li><NavLink to="/beaches" className={({ isActive }) => isActive ? styles.active : ''}>Conditions</NavLink></li>
        <li><NavLink to="/calculator" className={({ isActive }) => isActive ? styles.active : ''}>Utility Calculator</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink></li>
      </ul>
    </nav>
  )
}
