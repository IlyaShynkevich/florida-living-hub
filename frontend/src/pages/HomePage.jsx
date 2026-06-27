import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import styles from './HomePage.module.css'

const features = [
  { icon: '🏖️', title: 'Gulf Coast Beach Conditions', description: "Today's conditions for top Gulf Coast beaches — water temp, wind speed, and UV index." },
  { icon: '🌤️', title: 'Weather & UV Index', description: 'Know the UV risk and weather forecast before you pack your sunscreen.' },
  { icon: '⚠️', title: 'Safety Alerts', description: 'Rip current warnings and red tide status at a glance so you can swim safely.' },
  { icon: '🏠', title: 'Utility Cost Calculator', description: 'Estimate monthly electricity, water, and internet costs for your Florida city.' },
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
    </div>
  )
}
