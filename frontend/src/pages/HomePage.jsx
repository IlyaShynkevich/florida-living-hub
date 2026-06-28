import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import styles from './HomePage.module.css'

const features = [
  { icon: '🏖️', title: 'Gulf Coast Beach Conditions', description: "Today's conditions for top Gulf Coast beaches — water temp, wind speed, and UV index." },
  { icon: '🌤️', title: 'Weather & UV Index', description: 'Know the UV risk and weather forecast before you pack your sunscreen.' },
  { icon: '⚠️', title: 'Safety Alerts', description: 'Rip current warnings and red tide status at a glance so you can swim safely.' },
  { icon: '🏠', title: 'Utility Cost Calculator', description: 'Estimate monthly electricity, water, and internet costs for your Florida city.' },
]

const roadmapSoon = [
  { icon: '🗺️', title: 'More Florida Beaches', description: 'East Coast and South Florida regions, plus more Gulf Coast coverage.' },
  { icon: '📡', title: 'Live Weather & NOAA Data', description: 'Real-time conditions from public weather APIs replacing demo data.' },
  { icon: '📍', title: 'Interactive Beach Map', description: 'Browse Gulf Coast beaches on a map with condition overlays.' },
]

const roadmapLater = [
  { icon: '🍽️', title: 'Restaurants & Local Guides', description: 'Curated food spots, hidden gems, and local dining guides by area.' },
  { icon: '🏨', title: 'Hotels & Vacation Rentals', description: 'Accommodation guides for Gulf Coast towns and beach communities.' },
  { icon: '📦', title: 'Moving to Florida Guides', description: 'Practical resources for new residents — cost of living, neighborhoods, and more.' },
  { icon: '🌀', title: 'Hurricane Prep Checklist', description: 'Season-ready checklists, supply lists, and evacuation zone basics.' },
  { icon: '🏡', title: 'Flood Zone & Insurance', description: 'Understanding flood maps, homeowners insurance, and what to ask before you buy.' },
  { icon: '✅', title: 'New Resident Checklist', description: 'Driver license, vehicle registration, voter registration — all the Florida admin in one place.' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.betaBadge}>Beach Day Planner — Gulf Coast Beta</span>
          <h1 className={styles.heroTitle}>Florida Living Hub</h1>
          <p className={styles.heroSubtitle}>
            Which Florida Gulf Coast beach should I go to today, and what should I watch out for?
          </p>
          <p className={styles.heroDescription}>
            Florida Living Hub is launching first on the Gulf Coast, helping locals and visitors choose the best beach for today based on weather, UV, red tide, rip-current risk, parking, and practical local tips. More Florida regions coming soon.
          </p>
          <button className={styles.ctaBtn} onClick={() => navigate('/beaches')}>
            Check Today's Beaches
          </button>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">🌊</div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What You Can Do</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </section>

      <section className={styles.roadmap}>
        <div className={styles.roadmapInner}>
          <div className={styles.roadmapHeader}>
            <h2 className={styles.roadmapTitle}>What's Coming</h2>
            <p className={styles.roadmapSubtitle}>
              Florida Living Hub is starting with Gulf Coast beaches. The plan is to grow into a full Florida living resource — for visitors, new residents, and locals alike.
            </p>
          </div>

          <div className={styles.roadmapGroup}>
            <span className={styles.groupLabel}>Beach Planner — Coming Soon</span>
            <div className={styles.roadmapGrid}>
              {roadmapSoon.map((item) => (
                <div key={item.title} className={styles.roadmapCard}>
                  <span className={styles.roadmapIcon}>{item.icon}</span>
                  <div className={styles.roadmapCardBody}>
                    <div className={styles.roadmapCardHeader}>
                      <div className={styles.roadmapCardTitle}>{item.title}</div>
                      <span className={styles.comingSoonBadge}>Soon</span>
                    </div>
                    <div className={styles.roadmapCardDesc}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.roadmapGroup}>
            <span className={styles.groupLabel}>Florida Living Platform — Planned</span>
            <div className={styles.roadmapGrid}>
              {roadmapLater.map((item) => (
                <div key={item.title} className={styles.roadmapCard}>
                  <span className={styles.roadmapIcon}>{item.icon}</span>
                  <div className={styles.roadmapCardBody}>
                    <div className={styles.roadmapCardHeader}>
                      <div className={styles.roadmapCardTitle}>{item.title}</div>
                      <span className={`${styles.comingSoonBadge} ${styles.plannedBadge}`}>Planned</span>
                    </div>
                    <div className={styles.roadmapCardDesc}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
