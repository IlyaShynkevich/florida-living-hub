import styles from './SafetyDisclaimer.module.css'

export default function SafetyDisclaimer({ showDataStatus = true }) {
  return (
    <aside className={styles.wrapper} role="note" aria-label="Safety disclaimer">
      <div className={styles.disclaimer}>
        <span className={styles.icon} aria-hidden="true">⚠️</span>
        <p className={styles.text}>
          <strong>Florida Living Hub provides decision-support information only.</strong>{' '}
          Conditions can change quickly. Always follow official beach warnings, posted flags,
          lifeguard instructions, county alerts, and weather advisories.
        </p>
      </div>

      {showDataStatus && (
        <div className={styles.dataStatus}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.statusText}>Demo condition data — not live safety data.</span>
        </div>
      )}
    </aside>
  )
}
