import UtilityCalculator from '../components/UtilityCalculator/UtilityCalculator'
import styles from './UtilityCalculatorPage.module.css'

export default function UtilityCalculatorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Florida Utility Cost Calculator</h1>
        <p className={styles.subtitle}>
          Florida Living Hub starts with Gulf Coast beach planning, but also includes early tools
          for people exploring life in Florida. This calculator gives a rough estimate of common
          monthly utility costs so visitors, renters, and future residents can plan more realistically.
        </p>
        <p className={styles.demoNotice}>
          These are rough planning estimates only. Actual utility costs vary by provider, season,
          home size, usage, and local rates.
        </p>
      </div>

      <UtilityCalculator />

      <div className={styles.context}>
        <h2 className={styles.contextTitle}>How this fits into Florida Living Hub</h2>
        <p className={styles.contextText}>
          The Beach Planner helps users make better day-to-day decisions around Florida beaches.
          The Utility Cost Calculator supports the broader Florida Living Hub goal: helping people
          understand practical Florida living costs, relocation basics, and local planning needs.
        </p>
      </div>
    </div>
  )
}
