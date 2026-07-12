import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { CarGridSkeleton } from "../components/skeleton/skeleton"
import styles from "./Cars.module.css"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

function fmtPrice(p) {
  return p >= 100000 ? `₹${(p/100000).toFixed(2)} L` : `₹${Number(p).toLocaleString("en-IN")}`
}

function Cars() {
  const [cars, setCars]       = useState([])
  const [search, setSearch]   = useState("")
  const [brand, setBrand]     = useState("")
  const [fuel, setFuel]       = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/cars`)
      .then(r => { setCars(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const brands   = [...new Set(cars.map(c => c.brand))].sort()
  const fuels    = [...new Set(cars.map(c => c.fuelType))].sort()
  const filtered = cars.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !search || c.title?.toLowerCase().includes(q) || c.brand?.toLowerCase().includes(q) || c.model?.toLowerCase().includes(q)
    const matchBrand  = !brand || c.brand === brand
    const matchFuel   = !fuel  || c.fuelType === fuel
    return matchSearch && matchBrand && matchFuel
  })

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <span className="tag">Our Inventory</span>
          <h1 className="section-title">Available Cars</h1>
          <p className="section-sub">All verified vehicles · Updated daily</p>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={`container ${styles.filters}`}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input className={styles.searchInput} placeholder="Search brand, model…" value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <select className={`input ${styles.select}`} value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
          <select className={`input ${styles.select}`} value={fuel} onChange={e => setFuel(e.target.value)}>
            <option value="">All Fuel Types</option>
            {fuels.map(f => <option key={f}>{f}</option>)}
          </select>
          {(search || brand || fuel) && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(""); setBrand(""); setFuel("") }}>✕ Clear</button>
          )}
          {!loading && <span className={styles.count}>{filtered.length} car{filtered.length !== 1 ? "s" : ""}</span>}
        </div>
      </div>

      <div className="container section-sm">
        {loading ? (
          <CarGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h3>No cars found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((car, i) => (
              <div key={car._id} className={`card ${styles.card}`} style={{"--delay":`${(i%3)*0.07}s`}}>
                <div className={styles.imgWrap}>
                  {car.images?.[0]
                    ? <img src={car.images[0]} alt={car.title} className={styles.img}/>
                    : <div className={styles.imgPlaceholder}>🚗</div>}
                  {car.isSold && <span className={`badge badge-red ${styles.soldBadge}`}>SOLD</span>}
                  <span className={`badge badge-orange ${styles.fuelBadge}`}>{car.fuelType}</span>
                </div>
                <div className={styles.body}>
                  <div className={styles.topRow}>
                    <span className={styles.brand}>{car.brand}</span>
                    <span className={styles.year}>{car.year}</span>
                  </div>
                  <h3 className={styles.title}>{car.title}</h3>
                  <div className={styles.meta}>
                    <span>⛽ {car.fuelType}</span>
                    <span>⚙️ {car.transmission}</span>
                    <span>📍 {Number(car.kmDriven).toLocaleString("en-IN")} km</span>
                  </div>
                  <div className={styles.footer}>
                    <span className={styles.price}>{fmtPrice(car.price)}</span>
                    <Link to={`/cars/${car._id}`} className="btn btn-primary btn-sm">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Cars
