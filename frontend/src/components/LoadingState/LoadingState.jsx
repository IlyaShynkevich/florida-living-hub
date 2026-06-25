import styles from './LoadingState.module.css'

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  )
}
