import styles from './ErrorState.module.css'

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>Try Again</button>
      )}
    </div>
  )
}
