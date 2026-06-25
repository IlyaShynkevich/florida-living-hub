import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import styles from './HomePage.module.css'

const features = [
  { icon: '🏖️', title: 'Live Beach Conditions', description: 'Up-to-date conditions for top Florida beaches including water temp, wind, and UV index.' },
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
          <h1 className={styles.heroTitle}>Florida Living Hub</h1>
          <p className={styles.heroSubtitle}>
            Check Florida beach conditions, safety alerts, and living cost estimates — all in one place.
          </p>
          <button className={styles.ctaBtn} onClick={() => navigate('/beaches')}>
            Check Beach Conditions
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
