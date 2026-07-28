import { useNavigate } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import BeachScore from '../BeachScore/BeachScore'
import BestTimeToGo from '../BestTimeToGo/BestTimeToGo'
import NearbySection from '../NearbySection/NearbySection'
import styles from './BeachDetails.module.css'

export default function BeachDetails({ beach }) {
  const navigate = useNavigate()

  const parkingDifficulty = beach.parkingDifficulty

  const arrivalTip =
    parkingDifficulty === 'Difficult'
      ? 'Parking fills early, especially on weekends and holidays. Arriving before mid-morning is strongly recommended. Consider rideshare or local transit if available.'
      : parkingDifficulty === 'Moderate'
      ? 'Parking can fill on busy weekends and holidays. Arriving before mid-morning is a good idea.'
      : 'Parking is generally easier here than at busier beaches, though arriving earlier always gives more options.'

  const difficultyStyle =
    parkingDifficulty === 'Difficult' ? 'riskHigh'
    : parkingDifficulty === 'Moderate' ? 'riskModerate'
    : 'riskLow'

  const rec = beach.recommendation

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.hero}>
        <div>
          <span className="eyebrow">{beach.cityOrArea} &middot; {beach.region}</span>
          <h1 className={styles.name}>{beach.name}</h1>
          <p className={styles.description}>{beach.shortDescription}</p>
        </div>
        <div className={styles.heroRight}>
          <StatusBadge status={beach.status} />
          <BeachScore score={beach.beachScore} />
        </div>
      </div>

      <section className={`${styles.section} ${styles.recSection}`}>
        <div className={styles.recHeader}>
          <h2 className={styles.sectionTitle}>Beach Day Recommendation</h2>
          <span className={styles.demoTag}>Demo Data</span>
        </div>

        <div className={styles.recTop}>
          <div className={styles.recScoreBlock}>
            <span className={`${styles.recScoreNum} ${styles[`score${rec.label}`]}`}>{rec.score}</span>
            <span className={styles.recScoreOf}>/100</span>
          </div>
          <div className={styles.recMain}>
            <span className={`${styles.recLabelBadge} ${styles[`badge${rec.label}`]}`}>{rec.label}</span>
            <p className={styles.recExplanation}>{rec.explanation}</p>
          </div>
        </div>

        {rec.warnings.length > 0 && (
          <ul className={styles.recWarnings}>
            {rec.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}

        {rec.positives.length > 0 && (
          <ul className={styles.recPositives}>
            {rec.positives.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        )}

        <p className={styles.recFooter}>
          This is decision-support information based on demo data — not a safety guarantee. Always check official local warnings before swimming and follow posted beach flags.
        </p>
      </section>

      <BestTimeToGo
        uvIndex={beach.uvIndex}
        heatRisk={beach.heatRisk}
        weatherCondition={beach.weatherCondition}
      />

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Weather Conditions</h2>
          <ul className={styles.detailList}>
            <li><span>Condition</span><strong>{beach.weatherCondition ?? '—'}</strong></li>
            <li><span>Air Temperature</span><strong>{beach.airTemperature ?? '—'}°F</strong></li>
            <li><span>Water Temperature</span><strong>{beach.waterTemperature ?? '—'}°F</strong></li>
            <li><span>Wind Speed</span><strong>{beach.windSpeed ?? '—'} mph</strong></li>
            <li><span>UV Index</span><strong>{beach.uvIndex ?? '—'}</strong></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Safety Information</h2>
          <ul className={styles.detailList}>
            <li>
              <span>Rip Current Risk</span>
              <strong className={styles[`risk${beach.ripCurrentRisk}`]}>{beach.ripCurrentRisk ?? '—'}</strong>
            </li>
            <li>
              <span>Red Tide Status</span>
              <strong className={styles[`tide${beach.redTideStatus}`]}>{beach.redTideStatus ?? '—'}</strong>
            </li>
          </ul>
          <ul className={styles.noteList}>
            <li className={styles.noteItem}>
              <div className={styles.noteLabel}>Lifeguard Info</div>
              <div className={styles.noteValue}>{beach.lifeguardInfo ?? '—'}</div>
            </li>
          </ul>
          {beach.cautionNotes && (
            <div className={styles.cautionBox}>
              ⚠️ {beach.cautionNotes}
            </div>
          )}
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Beach Facilities</h2>
          <ul className={styles.detailList}>
            <li><span>Family Friendly</span><strong>{beach.familyFriendly ? '✅ Yes' : '❌ No'}</strong></li>
            <li><span>Restrooms</span><strong>{beach.restroomAvailability ? '✅ Available' : '❌ Not available'}</strong></li>
            <li><span>Showers</span><strong>{beach.showersAvailability ? '✅ Available' : '❌ Not available'}</strong></li>
          </ul>
          {beach.dogRules && (
            <ul className={styles.noteList} style={{ marginTop: '0.75rem' }}>
              <li className={styles.noteItem}>
                <div className={styles.noteLabel}>Dog Rules</div>
                <div className={styles.noteValue}>{beach.dogRules}</div>
              </li>
            </ul>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Parking & Access</h2>
          <ul className={styles.detailList}>
            <li>
              <span>Parking difficulty</span>
              <strong className={styles[difficultyStyle]}>{parkingDifficulty}</strong>
            </li>
          </ul>
          <ul className={styles.noteList} style={{ marginTop: '0.5rem' }}>
            <li className={styles.noteItem}>
              <div className={styles.noteLabel}>Parking notes</div>
              <div className={styles.noteValue}>{beach.parkingNotes ?? '—'}</div>
            </li>
            <li className={styles.noteItem}>
              <div className={styles.noteLabel}>Arrival tip</div>
              <div className={styles.noteValue}>{arrivalTip}</div>
            </li>
            {beach.accessNotes && (
              <li className={styles.noteItem}>
                <div className={styles.noteLabel}>Getting there</div>
                <div className={styles.noteValue}>{beach.accessNotes}</div>
              </li>
            )}
          </ul>
        </section>
      </div>

      {beach.bestFor && beach.bestFor.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Best For</h2>
          <div className={styles.tagList}>
            {beach.bestFor.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </section>
      )}

      <NearbySection
        foodIdeas={beach.nearbyFoodIdeas}
        activityIdeas={beach.nearbyActivityIdeas}
      />

      {beach.tips && beach.tips.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Local Tips</h2>
          <ul className={styles.tipsList}>
            {beach.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={`${styles.section} ${styles.disclaimerSection}`}>
        <h2 className={`${styles.sectionTitle} ${styles.disclaimerTitle}`}>⚠️ Safety Disclaimer</h2>
        <p className={styles.disclaimerText}>
          All beach condition data on this page is <strong>demo / illustrative data</strong> and is not connected to any live feed. It does not reflect current real-world conditions.
        </p>
        <ul className={styles.disclaimerList}>
          <li>Always check official local sources before swimming or visiting.</li>
          <li>Observe posted beach safety flags and follow lifeguard instructions.</li>
          <li>Rip current and red tide data shown here may not be accurate for today.</li>
          <li>This page does not guarantee beach safety. Use your own judgment.</li>
        </ul>
      </section>
    </div>
  )
}
