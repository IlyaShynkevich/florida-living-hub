import styles from './BeachScore.module.css'

export default function BeachScore({ score }) {
  const pct = (score / 10) * 100

  let colorClass = styles.high
  if (score < 4) colorClass = styles.low
  else if (score < 7) colorClass = styles.mid

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Beach Score</div>
      <div className={styles.scoreRow}>
        <span className={`${styles.number} ${colorClass}`}>{score}</span>
        <span className={styles.outOf}>/10</span>
      </div>
      <div className={styles.bar}>
        <div className={`${styles.fill} ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
