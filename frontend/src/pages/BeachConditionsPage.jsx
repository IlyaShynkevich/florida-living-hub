import useFetch from '../hooks/useFetch'
import BeachCard from '../components/BeachCard/BeachCard'
import LoadingState from '../components/LoadingState/LoadingState'
import ErrorState from '../components/ErrorState/ErrorState'
import SafetyDisclaimer from '../components/SafetyDisclaimer/SafetyDisclaimer'
import styles from './BeachConditionsPage.module.css'

export default function BeachConditionsPage() {
  const { data: beaches, loading, error } = useFetch('/api/beaches')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gulf Coast Beach Conditions</h1>
        <p className={styles.subtitle}>
          Demo conditions for {beaches ? beaches.length : 17} Gulf Coast beaches. Not live data — always check official sources before visiting.
        </p>
      </div>

      <SafetyDisclaimer />

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
