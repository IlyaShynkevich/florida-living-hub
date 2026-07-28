import { Link, NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const tabs = [
  { to: '/',             end: true,  icon: '🏠', label: 'Home'     },
  { to: '/beach-finder', end: false, icon: '🏖️', label: 'Beaches'  },
  { to: '/calculator',   end: false, icon: '⚡', label: 'Utility'  },
  { to: '/about',        end: false, icon: 'ℹ️',  label: 'About'    },
]

export default function BottomNav() {
  return (
    <nav className={styles.bar} aria-label="Main navigation">
      {tabs.map(({ to, end, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
      <Link to="/about#roadmap" className={styles.tab}>
        <span className={styles.icon}>🗺️</span>
        <span className={styles.label}>Roadmap</span>
      </Link>
    </nav>
  )
}
