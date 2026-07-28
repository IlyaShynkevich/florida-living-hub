import styles from './AboutPage.module.css'

const beachSoon = [
  'Real-time weather and NOAA data replacing demo conditions',
  'Interactive Gulf Coast beach map with condition overlays',
  'East Coast and South Florida beach regions',
  'Crowd and parking condition indicators',
  'Save favorite beaches',
]

const platformLater = [
  { icon: '🍽️', title: 'Restaurants & Local Guides', note: 'Curated dining by area, not paid placement.' },
  { icon: '🏨', title: 'Hotels & Vacation Rentals', note: 'Accommodation guides for Gulf Coast communities.' },
  { icon: '📦', title: 'Moving to Florida Guides', note: 'Neighborhoods, cost of living, and what to expect.' },
  { icon: '🌀', title: 'Hurricane Preparation', note: 'Checklists, supply lists, and evacuation zone basics.' },
  { icon: '🏡', title: 'Flood Zone & Insurance Basics', note: 'Understanding flood maps and what to ask before buying.' },
  { icon: '✅', title: 'New Resident Checklist', note: 'License, registration, utilities, and Florida admin in one place.' },
  { icon: '🔧', title: 'Local Service Providers', note: 'Vetted contractor and service recommendations by region.' },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className="eyebrow">About</span>
        <h1 className={styles.title}>A calm, honest guide to the Gulf Coast</h1>
        <p className={styles.lede}>
          Florida Living Hub answers one question well before it tries to do anything else&mdash;
          which beach today, and what to watch out for.
        </p>
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
            The longer-term goal is a full Florida living resource — for visitors, new residents, and locals.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Current Features — Gulf Coast Beta</h2>
          <ul>
            <li>Beach conditions for 17 Gulf Coast beaches</li>
            <li>Beach Day Score based on UV, rip current, red tide, wind, and heat</li>
            <li>Best Time To Go guidance per beach</li>
            <li>Parking difficulty and access notes per beach</li>
            <li>Monthly utility cost estimator for Florida cities</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Beach Planner — Coming Soon</h2>
          <p style={{ marginBottom: '0.75rem' }}>Near-term improvements to the beach planning features:</p>
          <ul>
            {beachSoon.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className={styles.section} id="roadmap">
          <h2>Florida Living Platform — Planned</h2>
          <p style={{ marginBottom: '1rem' }}>
            After the beach planner is solid, Florida Living Hub will expand into a broader Florida resource.
            These sections are <strong>not built yet</strong> — they are planned for future phases.
          </p>
          <div className={styles.platformGrid}>
            {platformLater.map((item) => (
              <div key={item.title} className={styles.platformCard}>
                <span className={styles.platformIcon}>{item.icon}</span>
                <div className={styles.platformBody}>
                  <div className={styles.platformHeader}>
                    <div className={styles.platformTitle}>{item.title}</div>
                    <span className={styles.plannedTag}>Planned</span>
                  </div>
                  <div className={styles.platformNote}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Data Notice</h2>
          <p>
            This MVP uses demo data for illustration purposes. All beach conditions and utility
            estimates are not live and should not be used for safety decisions. Always check
            official local sources and posted beach flags before swimming.
          </p>
        </section>
      </div>
    </div>
  )
}
