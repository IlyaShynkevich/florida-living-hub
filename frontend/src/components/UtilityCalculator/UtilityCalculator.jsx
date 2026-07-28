import { useState } from 'react'
import { apiUrl } from '../../config/api'
import styles from './UtilityCalculator.module.css'

const CITIES = ['Tampa', 'Miami', 'Orlando', 'Sarasota', 'Jacksonville']
const SIZES = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom']

export default function UtilityCalculator() {
  const [form, setForm] = useState({
    city: 'Tampa',
    apartmentSize: 'Studio',
    numberOfPeople: 1,
    internetNeeded: true,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(apiUrl('/api/utility-estimate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, numberOfPeople: Number(form.numberOfPeople) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Request failed')
      setResult(json.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label>Apartment Size</label>
          <select name="apartmentSize" value={form.apartmentSize} onChange={handleChange}>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label>Number of People</label>
          <input
            type="number"
            name="numberOfPeople"
            min={1}
            max={5}
            value={form.numberOfPeople}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxField}>
          <input
            type="checkbox"
            id="internet"
            name="internetNeeded"
            checked={form.internetNeeded}
            onChange={handleChange}
          />
          <label htmlFor="internet">Include Internet (~$65/mo)</label>
        </div>

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Estimate'}
        </button>
      </form>

      {error && <p className={styles.error}>⚠️ {error}</p>}

      {result && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>
            Estimated Monthly Utilities — {result.city}, {result.apartmentSize}
          </h3>
          <ul className={styles.breakdown}>
            <li><span>⚡ Electricity</span><strong>${result.estimates.electricity}</strong></li>
            <li><span>💧 Water</span><strong>${result.estimates.water}</strong></li>
            {result.estimates.internet > 0 && (
              <li><span>🌐 Internet</span><strong>${result.estimates.internet}</strong></li>
            )}
            <li className={styles.total}>
              <span>Total</span><strong>${result.estimates.total}/mo</strong>
            </li>
          </ul>
          <p className={styles.disclaimer}>⚠️ {result.disclaimer}</p>
        </div>
      )}
    </div>
  )
}
