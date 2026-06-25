import styles from './AboutPage.module.css'

const futureFeatures = [
  '🌐 Real-time weather API integration',
  '🌀 NOAA / National Weather Service alerts',
  '🌪️ Hurricane preparation tracker',
  '🗺️ Interactive beach map',
  '📖 Local guides and dining recommendations',
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
            Florida Living Hub is an MVP dashboard that combines useful public-style data into one
            simple interface for people living in or visiting Florida. It gives you beach conditions,
            safety alerts, and utility cost estimates — without digging through multiple websites.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Current Features</h2>
          <ul>
            <li>Beach conditions for 6 popular Florida beaches</li>
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
