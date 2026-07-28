import styles from './StatusBadge.module.css'

const statusMap = {
  'Go': styles.good,
  'Caution': styles.caution,
  'Avoid': styles.danger,
}

export default function StatusBadge({ status }) {
  if (!status) return null
  return (
    <span className={`${styles.badge} ${statusMap[status] || ''}`}>
      {status}
    </span>
  )
}
