import useFetch from '../hooks/useFetch'
import BeachCard from '../components/BeachCard/BeachCard'
import LoadingState from '../components/LoadingState/LoadingState'
import ErrorState from '../components/ErrorState/ErrorState'
import styles from './BeachConditionsPage.module.css'

export default function BeachConditionsPage() {
  const { data: beaches, loading, error } = useFetch('/api/beaches')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Florida Beach Conditions</h1>
        <p className={styles.subtitle}>
          Current conditions for {beaches ? beaches.length : 6} popular Florida beaches.
        </p>
      </div>

      {loading && <LoadingState message="Loading beach conditions..." />}
      {error && <ErrorState message={`Could not load beach data: ${error}`} />}

      {beaches && (
        <div className={styles.grid}>
          {beaches.map((beach) => (
            <BeachCard key={beach.id} beach={beach} />
          ))}
        </div>
      )}
    </div>
  )
}
