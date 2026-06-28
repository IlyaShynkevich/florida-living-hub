import styles from './NearbySection.module.css'

function foodIcon(item) {
  const s = item.toLowerCase()
  if (s.includes('ice cream') || s.includes('coffee') || s.includes('cafe') || s.includes('bakery')) return '☕'
  if (s.includes('bar') || s.includes('pub') || s.includes('tavern')) return '🍺'
  if (s.includes('snack') || s.includes('shack') || s.includes('concession')) return '🍿'
  if (s.includes('seafood') || s.includes('fish') || s.includes('crab') || s.includes('oyster')) return '🦞'
  if (s.includes('taco') || s.includes('mexican') || s.includes('latin')) return '🌮'
  return '🍽️'
}

function activityIcon(item) {
  const s = item.toLowerCase()
  if (s.includes('kayak') || s.includes('paddleboard') || s.includes('canoe')) return '🛶'
  if (s.includes('fishing') || s.includes('pier')) return '🎣'
  if (s.includes('sunset') || s.includes('sunrise')) return '🌅'
  if (s.includes('shop') || s.includes('market') || s.includes('village') || s.includes('avenue')) return '🛍️'
  if (s.includes('boat') || s.includes('cruise') || s.includes('sail') || s.includes('charter')) return '⛵'
  if (s.includes('bike') || s.includes('cycle')) return '🚲'
  if (s.includes('fort') || s.includes('museum') || s.includes('historic') || s.includes('lighthouse')) return '🏛️'
  if (s.includes('volleyball')) return '🏐'
  if (s.includes('camp')) return '⛺'
  if (s.includes('trail') || s.includes('nature') || s.includes('bird') || s.includes('wildlife')) return '🌿'
  if (s.includes('parasail') || s.includes('surf') || s.includes('jet ski')) return '🏄'
  if (s.includes('snorkel') || s.includes('swim') || s.includes('dive')) return '🤿'
  if (s.includes('golf')) return '⛳'
  if (s.includes('dog')) return '🐕'
  return '🎯'
}

function ItemList({ items, iconFn, label }) {
  if (!items || items.length === 0) return null
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{label}</h3>
      <ul className={styles.itemList}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.itemIcon} aria-hidden="true">{iconFn(item)}</span>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function NearbySection({ foodIdeas, activityIdeas }) {
  if (!foodIdeas?.length && !activityIdeas?.length) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nearby Food & Activities</h2>

      <div className={styles.grid}>
        <ItemList items={foodIdeas}     iconFn={foodIcon}     label="Food & Dining" />
        <ItemList items={activityIdeas} iconFn={activityIcon} label="Things To Do"  />
      </div>

      <div className={styles.partnerNote}>
        <span className={styles.partnerIcon} aria-hidden="true">📌</span>
        <p className={styles.partnerText}>
          These are general area suggestions, not sponsored placements.
          Local recommendations and partner listings may be added in a future update.
        </p>
      </div>
    </section>
  )
}
