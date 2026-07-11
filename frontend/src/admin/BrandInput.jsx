import { useState, useRef, useEffect } from "react"
import styles from "./BrandInput.module.css"

const COMMON_BRANDS = [
  "Maruti Suzuki","Hyundai","Honda","Toyota","Tata","Mahindra",
  "Ford","Volkswagen","Kia","MG","Skoda","Renault","Nissan",
  "Isuzu","Mercedes-Benz","BMW","Audi","Jeep","Fiat","Mitsubishi",
  "Chevrolet","Datsun","Force","Bajaj","Citroen","BYD","Other"
]

export default function BrandInput({ value, onChange, required }) {
  const [query, setQuery]     = useState(value || "")
  const [open, setOpen]       = useState(false)
  const ref                   = useRef(null)

  // Sync if parent value changes (e.g. on edit load)
  useEffect(() => { setQuery(value || "") }, [value])

  // Close on outside click
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const filtered = COMMON_BRANDS.filter(b =>
    b.toLowerCase().includes(query.toLowerCase())
  )

  const select = (brand) => {
    setQuery(brand)
    onChange(brand)
    setOpen(false)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    onChange(e.target.value)
    setOpen(true)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <input
        className="input"
        type="text"
        placeholder="Type or select brand… e.g. Isuzu, BMW"
        value={query}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        required={required}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className={styles.dropdown}>
          {filtered.map(b => (
            <div
              key={b}
              className={`${styles.option} ${b === value ? styles.selected : ""}`}
              onMouseDown={() => select(b)}
            >
              {b}
            </div>
          ))}
          {/* If typed value not in list, show "use custom" */}
          {query && !COMMON_BRANDS.some(b => b.toLowerCase() === query.toLowerCase()) && (
            <div
              className={`${styles.option} ${styles.custom}`}
              onMouseDown={() => select(query)}
            >
              ✏️ Use "<strong>{query}</strong>"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
