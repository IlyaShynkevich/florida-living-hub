import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import BeachDetails from '../components/BeachDetails/BeachDetails'
import LoadingState from '../components/LoadingState/LoadingState'
import ErrorState from '../components/ErrorState/ErrorState'
import styles from './BeachDetailPage.module.css'

export default function BeachDetailPage() {
  const { id } = useParams()
  const { data: beach, loading, error } = useFetch(`/api/beaches/${id}`)

  return (
    <div className={styles.page}>
      {loading && <LoadingState message="Loading beach details..." />}
      {error && <ErrorState message={`Could not load beach: ${error}`} />}
      {beach && <BeachDetails beach={beach} />}
    </div>
  )
}
