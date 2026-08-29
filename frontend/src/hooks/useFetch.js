import { useState, useEffect } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  // `meta` carries the API's out-of-band info — notably meta.liveData, the
  // health of the Open-Meteo pipeline. It is surfaced so the UI can show when
  // live conditions are stale or unavailable instead of quietly rendering gaps.
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json.data)
          setMeta(json.meta ?? null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, meta, loading, error }
}
