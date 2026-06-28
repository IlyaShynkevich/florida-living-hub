import UtilityCalculator from '../components/UtilityCalculator/UtilityCalculator'
import styles from './UtilityCalculatorPage.module.css'

export default function UtilityCalculatorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Florida Utility Cost Calculator</h1>
        <p className={styles.subtitle}>
          Rough estimates for monthly electricity, water, and internet costs in Florida cities.
        </p>
        <p className={styles.demoNotice}>
          Demo estimates only — based on representative averages, not live utility rates. Use as a starting reference when budgeting a move.
        </p>
      </div>
      <UtilityCalculator />
    </div>
  )
}
