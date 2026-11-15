import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import HeroBeachSwitcher from '../components/HeroBeachSwitcher/HeroBeachSwitcher'
import styles from './HomePage.module.css'

const features = [
  { icon: '🏖️', title: 'Gulf Coast Beach Finder', description: '17 Gulf Coast beaches with conditions, scores, and local tips to help you pick the right one.', to: '/beach-finder' },
  { icon: '🌤️', title: 'Weather & UV Info', description: 'Live UV index, wind speed, air and water temperature per beach, refreshed from Open-Meteo.', to: '/beach-finder' },
  { icon: '⚠️', title: 'Safety Conditions', description: 'Rip current risk and red tide status per beach. Still demo data — always verify with official local sources before swimming.', to: '/beach-finder' },
  { icon: '🏠', title: 'Utility Cost Calculator', description: 'Estimate monthly electricity, water, and internet costs for Florida cities. Demo estimates only.', to: '/calculator' },
]

// A real, ordered roadmap — so it's shown as a timeline, not a card grid.
const timeline = [
  {
    phase: 'Now',
    state: 'live',
    heading: 'Gulf Coast beach planner',
    items: [
      'Live weather, UV and water temperature for 17 Gulf Coast beaches',
      'Best Time To Go guidance and parking difficulty per beach',
      'Monthly utility cost estimator for Florida cities',
    ],
  },
  {
    phase: 'Next',
    state: 'soon',
    heading: 'Deeper, live beach data',
    items: [
      'NOAA rip current & red tide feeds replacing the last demo fields',
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
      {/* ---------- Hero: live beach switcher ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <HeroBeachSwitcher />
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
