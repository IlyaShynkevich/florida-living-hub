import UtilityCalculator from '../components/UtilityCalculator/UtilityCalculator'
import styles from './UtilityCalculatorPage.module.css'

export default function UtilityCalculatorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Florida Utility Cost Calculator</h1>
        <p className={styles.subtitle}>
          Estimate your monthly electricity, water, and internet costs when moving to Florida.
        </p>
      </div>
      <UtilityCalculator />
    </div>
  )
}
