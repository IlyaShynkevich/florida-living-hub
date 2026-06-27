import styles from './AboutPage.module.css'

const futureFeatures = [
  '🌐 Real-time weather API integration',
  '🌀 NOAA / National Weather Service alerts',
  '🗺️ Interactive Gulf Coast beach map',
  '🏄 Parking and crowd-level tips per beach',
  '📍 East Coast and South Florida regions',
  '⭐ Save favorite beaches',
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>About Florida Living Hub</h1>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>What Is This?</h2>
          <p>
            Florida Living Hub is a Gulf Coast beach-day planner. It answers one question:
            <strong> which beach should I go to today, and what should I watch out for?</strong>
          </p>
          <p style={{ marginTop: '0.6rem' }}>
            We are launching first on the Gulf Coast, helping locals and visitors choose the best beach
            based on weather, UV, red tide, rip-current risk, and practical local tips.
            More Florida regions are coming soon.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Current Features — Gulf Coast Beta</h2>
          <ul>
            <li>Beach conditions for 6 Gulf Coast beaches</li>
            <li>Dynamic Beach Score (1–10) based on safety factors</li>
            <li>Rip current and red tide status</li>
            <li>Monthly utility cost estimator for 5 Florida cities</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Coming Soon</h2>
          <ul className={styles.futureList}>
            {futureFeatures.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Data Notice</h2>
          <p>
            This MVP uses mock data for demonstration purposes. All beach conditions and utility
            estimates are illustrative and should not be used for safety decisions. Always check
            official sources before swimming.
          </p>
        </section>
      </div>
    </div>
  )
}
