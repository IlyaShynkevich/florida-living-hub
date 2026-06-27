import { useNavigate } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import styles from './BeachFinderCard.module.css'

export default function BeachFinderCard({ beach }) {
  const navigate = useNavigate()

  return (
    <div className={`${styles.card} ${styles[beach.status?.replace(' ', '')] || ''}`}>
      <div className={styles.header}>
        <div className={styles.nameArea}>
          <h3 className={styles.name}>{beach.name}</h3>
          <p className={styles.location}>{beach.cityOrArea} &middot; {beach.region}</p>
        </div>
        <div className={styles.badgeStack}>
          <StatusBadge status={beach.status} />
          {beach.dataStatus === 'demo' && (
            <span className={styles.demoBadge}>Demo Data</span>
          )}
        </div>
      </div>

      <p className={styles.description}>{beach.shortDescription}</p>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>{beach.familyFriendly ? '✅' : '⚠️'}</span>
          {beach.familyFriendly ? 'Family-friendly' : 'Check suitability'}
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>🅿️</span>
          <span className={styles.parkingText}>{beach.parkingNotes}</span>
        </span>
      </div>

      <button
        className={styles.cta}
        onClick={() => navigate(`/beaches/${beach.id}`)}
        aria-label={`View details for ${beach.name}`}
      >
        View Beach →
      </button>
    </div>
  )
}
