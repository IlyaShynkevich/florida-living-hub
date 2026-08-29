import styles from './SafetyDisclaimer.module.css'

/**
 * Data-provenance + safety banner.
 *
 * Condition data is deliberately mixed, and the wording says so:
 *   - LIVE: air/water temperature, wind, UV index, weather condition (Open-Meteo)
 *   - DEMO: rip current risk and red tide status
 *
 * `liveData` is the `meta.liveData` block from /api/beaches. When the live
 * pipeline is stale or down, this banner says that outright rather than letting
 * the page imply the numbers are current.
 */
export default function SafetyDisclaimer({ showDataStatus = true, liveData = null }) {
  const status = liveData?.status ?? null

  let statusText
  let broken = false

  if (status === 'live') {
    const age = liveData.ageMinutes
    const freshness =
      age === 0 ? 'updated just now' : age === 1 ? 'updated 1 min ago' : `updated ${age} min ago`
    statusText = `Live weather, UV and water temperature from Open-Meteo (${freshness}). Rip current and red tide are demo data — not live.`
  } else if (status === 'stale') {
    broken = true
    statusText = `Live weather feed is not refreshing — showing the last values received${
      liveData.lastSuccessAt ? ` (${new Date(liveData.lastSuccessAt).toLocaleString()})` : ''
    }. They may be out of date. Rip current and red tide are demo data.`
  } else if (status === 'unavailable') {
    broken = true
    statusText =
      'Live weather feed is unavailable — temperature, wind and UV are missing for this session. Rip current and red tide are demo data.'
  } else {
    // No meta from the API (e.g. still loading, or an older endpoint).
    statusText =
      'Weather, UV and water temperature are live from Open-Meteo. Rip current and red tide are demo data — not live.'
  }

  return (
    <aside className={styles.wrapper} role="note" aria-label="Safety disclaimer">
      <div className={styles.disclaimer}>
        <span className={styles.icon} aria-hidden="true">⚠️</span>
        <p className={styles.text}>
          <strong>Florida Living Hub provides decision-support information only.</strong>{' '}
          Conditions can change quickly. Always follow official beach warnings, posted flags,
          lifeguard instructions, county alerts, and weather advisories.
        </p>
      </div>

      {showDataStatus && (
        <div className={`${styles.dataStatus} ${broken ? styles.dataStatusBroken : ''}`}>
          <span className={`${styles.dot} ${broken ? styles.dotBroken : styles.dotLive}`} aria-hidden="true" />
          <span className={styles.statusText} role={broken ? 'alert' : undefined}>{statusText}</span>
        </div>
      )}
    </aside>
  )
}
