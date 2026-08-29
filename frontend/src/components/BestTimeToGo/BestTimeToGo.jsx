import { calcBestTimeToGo } from '../../utils/bestTimeToGo'
import styles from './BestTimeToGo.module.css'

const ICON = { good: '🌅', 'mild-caution': '🕐', caution: '⚠️', avoid: '⛔' }

export default function BestTimeToGo({ uvIndex, heatRisk, weatherCondition }) {
  const result = calcBestTimeToGo({ uvIndex, heatRisk, weatherCondition })

  return (
    <section className={`${styles.card} ${styles[result.severity]}`} data-severity={result.severity}>
      <div className={styles.header}>
        <h2 className={styles.title}>Best Time To Go</h2>
        <span className={styles.demoTag}>Based on live UV &amp; temperature</span>
      </div>

      <div className={styles.windowRow}>
        <span className={styles.icon} aria-hidden="true">{ICON[result.severity]}</span>
        <span className={styles.window}>{result.window}</span>
      </div>

      <p className={styles.reason}>{result.reason}</p>

      <div className={styles.tip}>
        <span className={styles.tipLabel}>Tip</span>
        <span className={styles.tipText}>{result.tip}</span>
      </div>

      <p className={styles.footer}>
        Guidance derived from live Open-Meteo UV and temperature values — not an official advisory. Verify conditions before visiting.
      </p>
    </section>
  )
}
