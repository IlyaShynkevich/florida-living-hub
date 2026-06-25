import styles from './StatusBadge.module.css'

const statusMap = {
  'Good': styles.good,
  'Be Careful': styles.caution,
  'Not Recommended': styles.danger,
}

export default function StatusBadge({ status }) {
  if (!status) return null
  return (
    <span className={`${styles.badge} ${statusMap[status] || ''}`}>
      {status}
    </span>
  )
}
