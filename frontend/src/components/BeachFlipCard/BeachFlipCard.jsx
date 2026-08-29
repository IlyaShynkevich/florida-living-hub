import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import BeachScore from '../BeachScore/BeachScore'
import styles from './BeachFlipCard.module.css'

const riskColor = { Low: styles.riskLow, Moderate: styles.riskMod, High: styles.riskHigh }
const tideColor = { None: styles.tideNone, Low: styles.tideLow, Medium: styles.tideMed, High: styles.tideHigh }

// Weather/UV/temps come from Open-Meteo; rip current and red tide are still demo.
// A degraded or unavailable feed is called out on the card rather than hidden.
const DATA_BADGE = {
  'live-weather': { text: 'Live Weather', broken: false },
  degraded: { text: 'Weather Data Incomplete', broken: true },
  unavailable: { text: 'Weather Unavailable', broken: true },
}

// One card, two sides:
//   front = overview (photo, description, family-friendly, parking)
//   back  = today's conditions (stats grid + Beach Day Score)
// Tapping/clicking the card flips it; "View Details" links out to the full page.
export default function BeachFlipCard({ beach }) {
  const [flipped, setFlipped] = useState(false)
  const dataBadge = DATA_BADGE[beach.dataStatus] || null

  const toggle = () => setFlipped((f) => !f)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }
  // keep the details link from also triggering a flip
  const stop = (e) => e.stopPropagation()

  return (
    <div className={`${styles.card} ${styles[beach.status?.replace(' ', '')] || ''}`}>
      <div
        className={`${styles.inner} ${flipped ? styles.flipped : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${beach.name}: showing today's conditions and Beach Day Score. Activate to flip back to the overview.`
            : `${beach.name}: showing the overview. Activate to flip to today's conditions and Beach Day Score.`
        }
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        {/* ---------- FRONT: overview ---------- */}
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.media}>
            <img
              className={styles.image}
              src={beach.imageUrl}
              alt={`${beach.name} shoreline`}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder-beach.svg' }}
            />
            <div className={styles.mediaBadges}>
              <StatusBadge status={beach.status} />
              {dataBadge && (
                <span
                  className={`${styles.demoBadge} ${dataBadge.broken ? styles.brokenBadge : styles.liveBadge}`}
                  title={beach.liveDataError || 'Weather, UV and water temperature are live from Open-Meteo. Rip current and red tide are demo data.'}
                >
                  {dataBadge.text}
                </span>
              )}
            </div>
          </div>

          <div className={styles.body}>
            <div>
              <h3 className={styles.name}>{beach.name}</h3>
              <p className={styles.location}>{beach.cityOrArea} &middot; {beach.region}</p>
            </div>

            <p className={styles.description}>{beach.shortDescription}</p>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>{beach.familyFriendly ? '✅' : '⚠️'}</span>
                {beach.familyFriendly ? 'Family-friendly' : 'Check suitability'}
              </span>
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>🅿️</span>
                <span className={styles.parkingText}>{beach.parkingNotes}</span>
              </span>
            </div>

            <div className={styles.footer}>
              <Link className={styles.detailsLink} to={`/beaches/${beach.id}`} onClick={stop} onKeyDown={stop}>
                View Details →
              </Link>
              <span className={styles.flipHint}>
                <span className={styles.flipIcon} aria-hidden="true">⟳</span>
                Tap for conditions
              </span>
            </div>
          </div>
        </div>

        {/* ---------- BACK: today's conditions ---------- */}
        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.backBody}>
            <div className={styles.backHead}>
              <div>
                <span className={styles.backKicker}>Today&rsquo;s conditions</span>
                <h3 className={styles.name}>{beach.name}</h3>
              </div>
              <StatusBadge status={beach.status} showLabel={false} />
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statIcon}>🌡️</span>
                <span className={styles.statLabel}>Air</span>
                <span className={`${styles.statValue} tnum`}>{beach.airTemperature ?? '—'}°F</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statIcon}>🌊</span>
                <span className={styles.statLabel}>Water</span>
                <span className={`${styles.statValue} tnum`}>{beach.waterTemperature ?? '—'}°F</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statIcon}>💨</span>
                <span className={styles.statLabel}>Wind</span>
                <span className={`${styles.statValue} tnum`}>{beach.windSpeed ?? '—'} mph</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statIcon}>☀️</span>
                <span className={styles.statLabel}>UV</span>
                <span className={`${styles.statValue} tnum`}>{beach.uvIndex ?? '—'}</span>
              </div>
            </div>

            {beach.liveDataError && (
              <p className={styles.liveError} role="alert">⚠ {beach.liveDataError}</p>
            )}

            <div className={styles.risks}>
              <span className={`${styles.riskBadge} ${riskColor[beach.ripCurrentRisk] || ''}`}>
                Rip Current: {beach.ripCurrentRisk ?? '—'}
              </span>
              <span className={`${styles.riskBadge} ${tideColor[beach.redTideStatus] || ''}`}>
                Red Tide: {beach.redTideStatus ?? '—'}
              </span>
            </div>
            <p className={styles.demoNote}>Rip current &amp; red tide are demo data — not live.</p>

            <BeachScore score={beach.beachScore} />

            <div className={styles.footer}>
              <Link className={styles.detailsLink} to={`/beaches/${beach.id}`} onClick={stop} onKeyDown={stop}>
                View Details →
              </Link>
              <span className={styles.flipHint}>
                <span className={styles.flipIcon} aria-hidden="true">⟳</span>
                Tap for overview
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
