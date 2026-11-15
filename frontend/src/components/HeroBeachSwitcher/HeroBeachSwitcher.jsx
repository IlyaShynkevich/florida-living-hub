import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import { apiUrl } from '../../config/api'
import styles from './HeroBeachSwitcher.module.css'

// Hero copy lives here so it can be changed in one place.
export const HERO_HEADLINE = 'Is your beach good today?'
export const HERO_LEAD =
  'Every beach gets a green, yellow or red flag from live weather, wind and UV, plus rip current and red tide.'

// The home page shows only these four beaches. `apiName` must match the
// beach's `name` in GET /api/beaches exactly. A name that is not in the
// response is reported as an error, never skipped.
const HERO_BEACHES = [
  { label: 'Siesta Key', apiName: 'Siesta Key Beach' },
  { label: 'Clearwater Beach', apiName: 'Clearwater Beach' },
  { label: 'Anna Maria', apiName: 'Anna Maria Island Beach' },
  { label: 'St. Pete Beach', apiName: 'St. Pete Beach' },
]

// Same pennant colors as StatusBadge.module.css (.good/.caution/.danger --flag).
const FLAG_COLORS = { Go: '#2e9e46', Caution: '#f2a007', Avoid: '#d83a3a' }

// Formats one live weather value. null/undefined means the backend could not
// get it, so the tile says so in words instead of showing 0 or a dash.
function formatStat(value, unit) {
  if (value === null || value === undefined) return null
  return `${value}${unit}`
}

export default function HeroBeachSwitcher() {
  const [selected, setSelected] = useState(HERO_BEACHES[0].apiName)
  const [beaches, setBeaches] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [failedImages, setFailedImages] = useState({})
  const [attempt, setAttempt] = useState(0)
  const chipRefs = useRef([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const url = apiUrl('/api/beaches')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((json) => {
        if (!Array.isArray(json.data)) {
          throw new Error(`GET ${url} returned no data array`)
        }
        if (cancelled) return
        const missing = HERO_BEACHES.filter((b) => !json.data.some((d) => d.name === b.apiName))
        for (const b of missing) {
          console.error(`[HeroBeachSwitcher] "${b.apiName}" is not in the GET /api/beaches response`)
        }
        setBeaches(json.data)
        setLoading(false)
      })
      .catch((err) => {
        // The technical detail (URL, status code) goes to the console only;
        // the card shows a plain message and a retry button.
        console.error('[HeroBeachSwitcher] Could not load beaches:', err)
        if (cancelled) return
        setError(err)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  const handleImageError = (beach) => {
    console.error(`[HeroBeachSwitcher] Photo failed to load for "${beach.name}": ${beach.imageUrl}`)
    setFailedImages((prev) => ({ ...prev, [beach.id]: true }))
  }

  // Arrow keys move focus between chips. Tab still visits each chip.
  const handleChipKeyDown = (e, index) => {
    const last = HERO_BEACHES.length - 1
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    chipRefs.current[next].focus()
  }

  // Flag color for a chip's beach, or null while data is loading, failed, or
  // the beach has no flag. The dot is only drawn when a real flag exists.
  const flagColorFor = (apiName) => {
    if (!beaches) return null
    const match = beaches.find((b) => b.name === apiName)
    if (!match || !match.status) return null
    const color = FLAG_COLORS[match.status]
    if (!color) {
      console.error(`[HeroBeachSwitcher] Unknown flag status "${match.status}" for "${apiName}"`)
      return null
    }
    return color
  }

  const selectedChip = HERO_BEACHES.find((b) => b.apiName === selected)
  const beach = beaches ? beaches.find((b) => b.name === selected) : null

  let card
  if (loading) {
    card = (
      <div className={styles.state} role="status">
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.stateText}>Waking up the live data&hellip;</p>
        <p className={styles.stateHint}>The server can take up to a minute to start.</p>
      </div>
    )
  } else if (error) {
    card = (
      <div className={styles.state} role="alert">
        <p className={styles.stateText}>Live data is unavailable right now. Try again in a moment.</p>
        <button type="button" className={styles.retry} onClick={retry}>Try again</button>
      </div>
    )
  } else if (!beach) {
    card = (
      <div className={styles.state} role="alert">
        <p className={styles.stateText}>{selectedChip.label} is missing from the live data</p>
        <p className={styles.stateHint}>The server did not return a beach named &ldquo;{selected}&rdquo;.</p>
      </div>
    )
  } else {
    const stats = [
      { label: 'Water temp', value: formatStat(beach.waterTemperature, '°F') },
      { label: 'Wind', value: formatStat(beach.windSpeed, ' mph') },
      { label: 'UV', value: formatStat(beach.uvIndex, '') },
    ]
    card = (
      // key restarts the fade each time the beach changes.
      <div key={beach.id} className={styles.beachView}>
        {failedImages[beach.id] ? (
          <div className={styles.photoFallback}>
            <span className={styles.photoFallbackName}>{beach.name}</span>
            <span className={styles.photoFallbackNote}>Photo unavailable</span>
          </div>
        ) : (
          <img
            className={styles.photo}
            src={beach.imageUrl}
            alt={`${beach.name}, ${beach.cityOrArea}`}
            onError={() => handleImageError(beach)}
          />
        )}

        <div className={styles.overlay} aria-live="polite" aria-atomic="true">
          <div className={styles.pill}>
            {beach.status ? (
              <StatusBadge status={beach.status} />
            ) : (
              <span className={styles.noFlag}>No flag yet</span>
            )}
            <span className={styles.pillName}>{beach.name}</span>
          </div>

          <ul className={styles.stats}>
            {stats.map((s) => (
              <li key={s.label} className={styles.stat}>
                <span className={styles.statLabel}>{s.label}</span>
                {s.value === null ? (
                  <span className={styles.statMissing}>Weather unavailable</span>
                ) : (
                  <span className={`${styles.statValue} tnum`}>{s.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>{HERO_HEADLINE}</h1>
        <p className={styles.lead}>{HERO_LEAD}</p>

        <div className={styles.picker}>
          <span className={styles.pickerLabel} id="hero-beach-label">Choose a beach</span>
          <div className={styles.chips} role="group" aria-labelledby="hero-beach-label">
            {HERO_BEACHES.map((b, i) => (
              <button
                key={b.apiName}
                ref={(el) => { chipRefs.current[i] = el }}
                type="button"
                className={styles.chip}
                aria-pressed={selected === b.apiName}
                onClick={() => setSelected(b.apiName)}
                onKeyDown={(e) => handleChipKeyDown(e, i)}
              >
                {selected === b.apiName && flagColorFor(b.apiName) && (
                  <span
                    className={styles.chipDot}
                    style={{ background: flagColorFor(b.apiName) }}
                    aria-hidden="true"
                  />
                )}
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <Link to="/beach-finder" className={styles.cta}>See all 17 beaches</Link>
      </div>

      <div className={styles.card}>{card}</div>
    </>
  )
}
