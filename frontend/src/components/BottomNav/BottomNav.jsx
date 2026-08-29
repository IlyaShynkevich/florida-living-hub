import { Link, NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

/*
 * Custom line icons, drawn to the same rules as the brand wave mark and the
 * status flag: stroke only, no fill, round caps and joins, ~2/24 stroke weight.
 * They stroke in `currentColor`, so the existing tab colours (--text-light,
 * --blue-dark when active) keep driving them with no extra styling.
 *
 * Each shape is drawn from the site's own vocabulary rather than a generic set:
 * Beaches reuses the brand's wave curve, and Roadmap is the rail-and-nodes
 * structure of the actual roadmap timeline.
 */
function Icon({ children }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const HomeIcon = () => (
  <Icon>
    <path d="M3.5 10.75 L12 4 L20.5 10.75" />
    <path d="M5.75 9.5 V20 H18.25 V9.5" />
    <path d="M9.75 20 V14.75 H14.25 V20" />
  </Icon>
)

// Sun over the brand wave curve — same Q/T control points as the navbar mark,
// scaled from its 32px grid to 24px. The sun sits off-centre: centred above the
// waves it reads as a swimmer's head at 20px.
const BeachIcon = () => (
  <Icon>
    <circle cx="16.75" cy="6" r="2.9" />
    <path d="M3 14.5 Q6 11.5 9 14.5 T15 14.5 T21 14.5" />
    <path d="M3 19 Q6 16 9 19 T15 19 T21 19" />
  </Icon>
)

const UtilityIcon = () => (
  <Icon>
    <path d="M13 2.75 L6.5 13 H11 L10.5 21.25 L17.5 11 H13 Z" />
  </Icon>
)

const AboutIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11.25 V16.75" />
    <path d="M12 7.6 h0.01" />
  </Icon>
)

// The roadmap page is a rail with three phase nodes (Now / Next / Later).
const RoadmapIcon = () => (
  <Icon>
    <path d="M6.5 4.75 V19.25" />
    <path d="M11 6.5 H19.5" />
    <path d="M11 12 H19.5" />
    <path d="M11 17.5 H16.25" />
    <circle cx="6.5" cy="6.5" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="6.5" cy="12" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="6.5" cy="17.5" r="1.7" fill="currentColor" stroke="none" />
  </Icon>
)

const tabs = [
  { to: '/',             end: true,  Icon: HomeIcon,    label: 'Home'    },
  { to: '/beach-finder', end: false, Icon: BeachIcon,   label: 'Beaches' },
  { to: '/calculator',   end: false, Icon: UtilityIcon, label: 'Utility' },
  { to: '/about',        end: false, Icon: AboutIcon,   label: 'About'   },
]

export default function BottomNav() {
  return (
    <nav className={styles.bar} aria-label="Main navigation">
      {tabs.map(({ to, end, Icon: TabIcon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <TabIcon />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
      <Link to="/about#roadmap" className={styles.tab}>
        <RoadmapIcon />
        <span className={styles.label}>Roadmap</span>
      </Link>
    </nav>
  )
}
