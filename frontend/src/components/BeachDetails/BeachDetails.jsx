import { useNavigate } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import BeachScore from '../BeachScore/BeachScore'
import styles from './BeachDetails.module.css'

function getRecommendedAction(beach) {
  if (beach.status === 'Not Recommended') {
    if (beach.ripCurrentRisk === 'High') return 'Avoid swimming due to rip current risk.'
    if (beach.redTideStatus === 'High') return 'Avoid the beach due to red tide conditions.'
    return 'Check local warnings before going.'
  }
  if (beach.status === 'Be Careful') {
    return 'Use sunscreen, stay hydrated, and watch for warning flags.'
  }
  return 'Great beach day! Enjoy responsibly.'
}

export default function BeachDetails({ beach }) {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate('/beaches')}>
        ← Back to Beach List
      </button>

      <div className={styles.hero}>
        <div>
          <h1 className={styles.name}>{beach.name}</h1>
          <p className={styles.city}>{beach.city}</p>
          <p className={styles.description}>{beach.description}</p>
        </div>
        <div className={styles.heroRight}>
          <StatusBadge status={beach.status} />
          <BeachScore score={beach.beachScore} />
        </div>
      </div>

      <div className={styles.recommendation}>
        <span className={styles.recIcon}>💡</span>
        {getRecommendedAction(beach)}
      </div>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Weather Conditions</h2>
          <ul className={styles.detailList}>
            <li><span>Condition</span><strong>{beach.weatherCondition ?? '—'}</strong></li>
            <li><span>Air Temperature</span><strong>{beach.airTemperature ?? '—'}°F</strong></li>
            <li><span>Water Temperature</span><strong>{beach.waterTemperature ?? '—'}°F</strong></li>
            <li><span>Wind Speed</span><strong>{beach.windSpeed ?? '—'} mph</strong></li>
            <li><span>UV Index</span><strong>{beach.uvIndex ?? '—'}</strong></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Safety Information</h2>
          <ul className={styles.detailList}>
            <li>
              <span>Rip Current Risk</span>
              <strong className={styles[`risk${beach.ripCurrentRisk}`]}>{beach.ripCurrentRisk ?? '—'}</strong>
            </li>
            <li>
              <span>Red Tide Status</span>
              <strong className={styles[`tide${beach.redTideStatus}`]}>{beach.redTideStatus ?? '—'}</strong>
            </li>
          </ul>
        </section>
      </div>

      {beach.tips && beach.tips.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Local Tips</h2>
          <ul className={styles.tipsList}>
            {beach.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={`${styles.section} ${styles.placeholder}`}>
        <h2 className={styles.sectionTitle}>Map</h2>
        <div className={styles.placeholderBox}>
          🗺️ Interactive map coming in a future update.
        </div>
      </section>
    </div>
  )
}
