import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>🌊 Florida Living Hub</p>
        <p className={styles.beta}>Beach Day Planner — Gulf Coast Beta</p>
        <p className={styles.copy}>Data is for demonstration purposes only.</p>
        <p className={styles.copy}>© {new Date().getFullYear()} Florida Living Hub</p>
      </div>
    </footer>
  )
}
