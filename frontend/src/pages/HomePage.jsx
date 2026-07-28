import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import StatusBadge from '../components/StatusBadge/StatusBadge'
import styles from './HomePage.module.css'

const features = [
  { icon: '🏖️', title: 'Gulf Coast Beach Finder', description: '17 Gulf Coast beaches with conditions, scores, and local tips to help you pick the right one.', to: '/beach-finder' },
  { icon: '🌤️', title: 'Weather & UV Info', description: 'UV index, wind speed, water temp, and weather conditions per beach — demo data, clearly labeled.', to: '/beach-finder' },
  { icon: '⚠️', title: 'Safety Conditions', description: 'Rip current risk and red tide status per beach. Demo data — always verify with official local sources before swimming.', to: '/beach-finder' },
  { icon: '🏠', title: 'Utility Cost Calculator', description: 'Estimate monthly electricity, water, and internet costs for Florida cities. Demo estimates only.', to: '/calculator' },
]

// A real, ordered roadmap — so it's shown as a timeline, not a card grid.
const timeline = [
  {
    phase: 'Now',
    state: 'live',
    heading: 'Gulf Coast beach planner',
    items: [
      'Conditions & Beach Day Score for 17 Gulf Coast beaches',
      'Best Time To Go guidance and parking difficulty per beach',
      'Monthly utility cost estimator for Florida cities',
    ],
  },
  {
    phase: 'Next',
    state: 'soon',
    heading: 'Deeper, live beach data',
    items: [
      'Real-time weather & NOAA data replacing demo conditions',
      'Interactive Gulf Coast beach map with condition overlays',
      'East Coast and South Florida beach regions',
    ],
  },
  {
    phase: 'Later',
    state: 'planned',
    heading: 'A full Florida living resource',
    items: [
      'Restaurants, hotels, and local guides by area',
      'Moving-to-Florida guides: cost of living and neighborhoods',
      'Hurricane prep, flood zones, and new-resident checklists',
    ],
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* ---------- Hero: the thesis is the product's one question ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className="eyebrow">Florida Gulf Coast · Beach-Day Planner</span>
            <h1 className={styles.heroTitle}>
              Which beach today&mdash;<span className={styles.heroTitleAccent}>and what to watch out for?</span>
            </h1>
            <p className={styles.heroLead}>
              Florida Living Hub helps locals and visitors pick the right Gulf Coast beach for
              today, weighing weather, UV, red tide, rip-current risk, parking, and the small
              local details that make or break a beach day.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/beach-finder')}>
                Find the best beach for today
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/calculator')}>
                Estimate living costs
              </button>
            </div>

            {/* Flag legend — teaches the site's signal instead of a vanity stat */}
            <div className={styles.legend}>
              <span className={styles.legendLabel}>Every beach flies a flag:</span>
              <StatusBadge status="Go" />
              <StatusBadge status="Caution" />
              <StatusBadge status="Avoid" />
            </div>
          </div>

          <div className={styles.heroMedia}>
            {/* Hero photo (Pexels, free commercial license). Falls back to the
                placeholder illustration if the file is ever missing. */}
            <img
              className={styles.heroImage}
              src="/images/hero.jpg"
              alt="Aerial view of turquoise Gulf of Mexico waves rolling onto a Florida shoreline"
              width="1200"
              height="900"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder-hero.svg' }}
            />
            <div className={styles.heroCaption}>
              <StatusBadge status="Go" />
              <span className={styles.heroCaptionText}>Siesta Key &middot; a good day to go</span>
            </div>
          </div>
        </div>

        <svg className={styles.heroWave} viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 240 110 480 110 720 70 C 960 30 1200 30 1440 62 L 1440 110 L 0 110 Z" fill="var(--sand)" />
        </svg>
      </section>

      {/* ---------- What you can do ---------- */}
      <section className={styles.features}>
        <header className={styles.sectionHead}>
          <span className="eyebrow">What you can do</span>
          <h2 className={styles.sectionTitle}>Plan the day, then head for the coast</h2>
        </header>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} onClick={() => navigate(f.to)} />
          ))}
        </div>
      </section>

      {/* ---------- Roadmap as a real timeline ---------- */}
      <section className={styles.roadmap}>
        <div className={styles.roadmapInner}>
          <header className={styles.sectionHead}>
            <span className="eyebrow">Where this is headed</span>
            <h2 className={styles.sectionTitle}>Starting at the beach, growing into Florida living</h2>
            <p className={styles.sectionIntro}>
              We&rsquo;re building in the open. Here&rsquo;s what works today and what comes next.
            </p>
          </header>

          <ol className={styles.timeline}>
            {timeline.map((node) => (
              <li key={node.phase} className={`${styles.node} ${styles[node.state]}`}>
                <div className={styles.nodeMarker} aria-hidden="true" />
                <div className={styles.nodeContent}>
                  <div className={styles.nodePhaseRow}>
                    <span className={styles.nodePhase}>{node.phase}</span>
                    <span className={styles.nodeState}>
                      {node.state === 'live' ? 'Available' : node.state === 'soon' ? 'In progress' : 'Planned'}
                    </span>
                  </div>
                  <h3 className={styles.nodeHeading}>{node.heading}</h3>
                  <ul className={styles.nodeList}>
                    {node.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
