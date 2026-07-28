import styles from './StatusBadge.module.css'

const statusMap = {
  'Go': styles.good,
  'Caution': styles.caution,
  'Avoid': styles.danger,
}

// The badge is a lifeguard beach-warning flag — the real Gulf Coast signal
// for "is it a good day to get in the water?" — so status reads as safety
// guidance, not a generic colored chip.
export default function StatusBadge({ status, showLabel = true }) {
  if (!status) return null
  return (
    <span
      className={`${styles.badge} ${statusMap[status] || ''}`}
      role="img"
      aria-label={`Beach flag status: ${status}`}
    >
      <svg className={styles.flag} viewBox="0 0 22 22" aria-hidden="true">
        <path className={styles.pole} d="M5 2.2 V 20" />
        <path className={styles.pennant} d="M5.9 3 L18.5 6.4 L5.9 9.8 Z" />
      </svg>
      {showLabel && <span>{status}</span>}
    </span>
  )
}
