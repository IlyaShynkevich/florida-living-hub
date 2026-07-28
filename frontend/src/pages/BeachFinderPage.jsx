import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import BeachFlipCard from '../components/BeachFlipCard/BeachFlipCard'
import LoadingState from '../components/LoadingState/LoadingState'
import ErrorState from '../components/ErrorState/ErrorState'
import SafetyDisclaimer from '../components/SafetyDisclaimer/SafetyDisclaimer'
import styles from './BeachFinderPage.module.css'

const REGION_GROUPS = [
  { id: 'sarasota',  label: 'Sarasota Area' },
  { id: 'charlotte', label: 'Charlotte County Area' },
  { id: 'tampa',     label: 'Tampa Bay Area' },
  { id: 'southwest', label: 'Southwest Florida / Naples Area' },
]

function getGroup(beach) {
  const r = beach.region
  if (r.includes('Pinellas')) return 'tampa'
  if (r.includes('Lee') || r.includes('Collier')) return 'southwest'
  if (r.includes('Charlotte')) return 'charlotte'
  return 'sarasota'
}

export default function BeachFinderPage() {
  const { data: beaches, loading, error } = useFetch('/api/beaches')
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = beaches
    ? (activeFilter === 'all' ? beaches : beaches.filter(b => getGroup(b) === activeFilter))
    : []

  const grouped = REGION_GROUPS
    .map(group => ({ ...group, beaches: visible.filter(b => getGroup(b) === group.id) }))
    .filter(g => g.beaches.length > 0)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className="eyebrow">Gulf Coast Beta &middot; {beaches ? beaches.length : 17} beaches</span>
        <h1 className={styles.title}>Beach Finder</h1>
        <p className={styles.subtitle}>
          Browse Gulf Coast beaches by region and find the right fit for today&rsquo;s trip.
          Each beach flies a flag &mdash; green to go, yellow for caution, red to stay out.
          Tap any card to flip between the overview and today&rsquo;s conditions.
        </p>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter by region">
        <button
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Regions
        </button>
        {REGION_GROUPS.map(g => (
          <button
            key={g.id}
            className={`${styles.filterBtn} ${activeFilter === g.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <SafetyDisclaimer />

      {loading && <LoadingState message="Loading beaches..." />}
      {error && <ErrorState message={`Could not load beach data: ${error}`} />}

      {beaches && grouped.map(group => (
        <section key={group.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {group.label}
            <span className={styles.sectionCount}>{group.beaches.length} beach{group.beaches.length !== 1 ? 'es' : ''}</span>
          </h2>
          <div className={styles.grid}>
            {group.beaches.map(beach => (
              <BeachFlipCard key={beach.id} beach={beach} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
