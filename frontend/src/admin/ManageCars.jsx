import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import AdminNavbar from "../components/AdminNavbar"
import styles from "./Admin.module.css"

const API = "http://localhost:5000/api"
function fmt(p) { return p >= 100000 ? `₹${(p/100000).toFixed(2)}L` : `₹${Number(p).toLocaleString("en-IN")}` }

function ManageCars() {
  const [cars, setCars]       = useState([])
  const [search, setSearch]   = useState("")
  const [filter, setFilter]   = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`${API}/cars`).then(r => { setCars(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleDelete = async id => {
    if (!window.confirm("Delete this car? This cannot be undone.")) return
    try {
      await api.delete(`${API}/cars/${id}`)
      setCars(prev => prev.filter(c => c._id !== id))
    } catch { alert("Failed to delete car") }
  }

  // ── Toggle sold / unsold ──────────────────────────────────────────
  const handleToggleSold = async (car) => {
    const action = car.isSold ? "Mark as Available" : "Mark as Sold"
    if (!window.confirm(`${action} — "${car.title}"?`)) return
    try {
      if (car.isSold) {
        // Mark unsold: use PUT to update isSold = false
        await api.put(`${API}/cars/${car._id}`, { ...car, isSold: false })
      } else {
        // Mark sold: use the dedicated endpoint
        await api.put(`${API}/cars/${car._id}/sold`)
      }
      setCars(prev => prev.map(c => c._id === car._id ? { ...c, isSold: !c.isSold } : c))
    } catch { alert("Failed to update car status") }
  }

  const filtered = cars.filter(c => {
    const q = search.toLowerCase()
    const matchS = !search || c.title?.toLowerCase().includes(q) || c.brand?.toLowerCase().includes(q)
    const matchF = filter === "all" ? true : filter === "sold" ? c.isSold : !c.isSold
    return matchS && matchF
  })

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Manage Cars</h1>
            <p className={styles.pageSub}>{cars.length} total · {cars.filter(c=>!c.isSold).length} available · {cars.filter(c=>c.isSold).length} sold</p>
          </div>
          <Link to="/admin/add-car" className="btn btn-primary">➕ Add Car</Link>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input className={styles.searchInput} placeholder="Search cars…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          {["all","available","sold"].map(v => (
            <button key={v} className={`${styles.filterTab} ${filter===v?styles.filterTabActive:""}`} onClick={()=>setFilter(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
          <span className={styles.resultCount}>{filtered.length} car{filtered.length!==1?"s":""}</span>
        </div>

        {loading ? (
          <div className="loading-box"><div className="spinner"/></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{padding:"60px"}}>
            <span className="empty-icon">🚗</span>
            <h3>No cars found</h3>
          </div>
        ) : (
          <div style={{padding:"0 0 24px"}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Car</th><th>Year</th><th>Fuel</th><th>KM</th><th>Price</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(car => (
                  <tr key={car._id}>
                    <td>
                      <div className={styles.carCell}>
                        {car.images?.[0]
                          ? <img src={car.images[0]} alt="" className={styles.carThumb}/>
                          : <div className={styles.carThumb} style={{background:"var(--bg3)",display:"flex",alignItems:"center",justifyContent:"center"}}>🚗</div>}
                        <div>
                          <div className={styles.carName}>{car.title}</div>
                          <div className={styles.carYear}>{car.brand} · {car.transmission}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdMuted}>{car.year}</td>
                    <td className={styles.tdMuted}>{car.fuelType}</td>
                    <td className={styles.tdMuted}>{Number(car.kmDriven).toLocaleString("en-IN")}</td>
                    <td className={styles.tdPrice}>{fmt(car.price)}</td>
                    <td>
                      <span className={car.isSold ? "badge badge-red" : "badge badge-green"}>
                        {car.isSold ? "Sold" : "Available"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link to={`/admin/edit-car/${car._id}`} className={styles.editBtn}>✏️ Edit</Link>
                        <button
                          className={car.isSold ? styles.unsoldBtn : styles.soldBtn}
                          onClick={() => handleToggleSold(car)}
                        >
                          {car.isSold ? "↩ Unsold" : "✓ Mark Sold"}
                        </button>
                        <button className={styles.delBtn} onClick={()=>handleDelete(car._id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default ManageCars
