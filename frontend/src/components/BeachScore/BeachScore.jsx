import styles from './BeachScore.module.css'

// score is null when live weather was unavailable — the backend withholds the
// number rather than publishing an incomplete one. Render "—", not a fake 0.
export default function BeachScore({ score }) {
  const unscored = score == null
  const pct = unscored ? 0 : Math.max(0, Math.min(100, score))

  let colorClass = styles.high
  if (unscored) colorClass = styles.unscored
  else if (score < 40) colorClass = styles.low
  else if (score < 70) colorClass = styles.mid

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Beach Score</div>
      <div className={styles.scoreRow}>
        <span className={`${styles.number} ${colorClass}`}>{unscored ? '—' : score}</span>
        {!unscored && <span className={styles.outOf}>/100</span>}
      </div>
      <div className={styles.bar}>
        <div className={`${styles.fill} ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      {unscored && <div className={styles.unscoredNote}>Live weather unavailable</div>}
    </div>
  )
}
