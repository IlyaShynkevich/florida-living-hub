import { useNavigate } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import BeachScore from '../BeachScore/BeachScore'
import styles from './BeachCard.module.css'

const riskColor = {
  Low: styles.riskLow,
  Moderate: styles.riskMod,
  High: styles.riskHigh,
}

const tideColor = {
  None: styles.tideNone,
  Low: styles.tideLow,
  Medium: styles.tideMed,
  High: styles.tideHigh,
}

export default function BeachCard({ beach }) {
  const navigate = useNavigate()

  return (
    <div
      className={`${styles.card} ${styles[beach.status?.replace(' ', '')]}`}
      onClick={() => navigate(`/beaches/${beach.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/beaches/${beach.id}`)}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.name}>{beach.name}</h2>
          <p className={styles.city}>{beach.cityOrArea}</p>
        </div>
        <StatusBadge status={beach.status} />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🌡️</span>
          <span className={styles.statLabel}>Air</span>
          <span className={styles.statValue}>{beach.airTemperature ?? '—'}°F</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🌊</span>
          <span className={styles.statLabel}>Water</span>
          <span className={styles.statValue}>{beach.waterTemperature ?? '—'}°F</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>💨</span>
          <span className={styles.statLabel}>Wind</span>
          <span className={styles.statValue}>{beach.windSpeed ?? '—'} mph</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>☀️</span>
          <span className={styles.statLabel}>UV</span>
          <span className={styles.statValue}>{beach.uvIndex ?? '—'}</span>
        </div>
      </div>

      <div className={styles.risks}>
        <span className={`${styles.riskBadge} ${riskColor[beach.ripCurrentRisk] || ''}`}>
          Rip Current: {beach.ripCurrentRisk ?? '—'}
        </span>
        <span className={`${styles.riskBadge} ${tideColor[beach.redTideStatus] || ''}`}>
          Red Tide: {beach.redTideStatus ?? '—'}
        </span>
      </div>

      <BeachScore score={beach.beachScore} />

      <p className={styles.cta}>View Details →</p>
    </div>
  )
}
