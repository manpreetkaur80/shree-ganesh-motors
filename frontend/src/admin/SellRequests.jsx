import { useEffect, useState } from "react"
import api from "../services/api"
import AdminNavbar from "../components/AdminNavbar"
import styles from "./Admin.module.css"

const API = "http://localhost:5000/api"
function timeStr(d) {
  return new Date(d).toLocaleString("en-IN", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
}
function fmtPrice(p) {
  const n = Number(p)
  return n >= 100000 ? `₹${(n/100000).toFixed(2)} Lakh` : `₹${n.toLocaleString("en-IN")}`
}

function SellRequests() {
  const [requests, setRequests] = useState([])
  const [search,   setSearch]   = useState("")
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    api.get(`${API}/sell-requests`)
      .then(r => { setRequests(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = requests
    .filter(r => {
      const q = search.toLowerCase()
      return !search || r.name?.toLowerCase().includes(q) || r.phone?.includes(q) || r.brand?.toLowerCase().includes(q) || r.model?.toLowerCase().includes(q)
    })
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Sell Car Requests</h1>
            <p className={styles.pageSub}>{requests.length} total request{requests.length!==1?"s":""}</p>
          </div>
        </div>

        {/* Search */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input className={styles.searchInput} placeholder="Search by name, phone, brand…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <span className={styles.resultCount}>{filtered.length} request{filtered.length!==1?"s":""}</span>
        </div>

        {loading ? (
          <div className="loading-box"><div className="spinner"/></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{padding:"60px"}}>
            <span className="empty-icon">💰</span>
            <h3>No sell requests yet</h3>
            <p>When customers fill the "Sell Your Car" form, their requests will appear here.</p>
          </div>
        ) : (
          <div className={styles.sellCards}>
            {filtered.map(req => (
              <div key={req._id} className={styles.sellCard}>
                {/* Header */}
                <div className={styles.sellCardHead}>
                  <div className={styles.sellAvatar}>
                    {req.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div className={styles.sellName}>{req.name}</div>
                    <div className={styles.sellPhone}>
                      <a href={`tel:${req.phone}`} style={{color:"var(--muted)"}}>📞 {req.phone}</a>
                      <span style={{margin:"0 8px",color:"var(--border)"}}>·</span>
                      <a
                        href={`https://wa.me/91${req.phone}?text=${encodeURIComponent(`Hi ${req.name}, we received your request to sell your ${req.brand} ${req.model} (${req.year}). We'd like to schedule a free evaluation. When are you available?`)}`}
                        target="_blank" rel="noreferrer"
                        style={{color:"var(--green)",fontSize:"12px"}}
                      >💬 WhatsApp</a>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:"11px",color:"var(--muted)"}}>{timeStr(req.createdAt)}</div>
                    <span className="badge badge-orange" style={{marginTop:"6px",display:"inline-block"}}>New Request</span>
                  </div>
                </div>

                {/* Car Details */}
                <div className={styles.sellChips}>
                  <span className={styles.chip}>🚗 {req.brand} {req.model}</span>
                  <span className={styles.chip}>📅 Year: {req.year}</span>
                  {req.description && <span className={styles.chip}>📝 {req.description.slice(0,40)}{req.description.length>40?"…":""}</span>}
                  <span className={`${styles.chip} ${styles.chipPrice}`}>
                    💰 Expected: {fmtPrice(req.expectedPrice)}
                  </span>
                </div>

                {/* Contact Actions */}
                <div style={{display:"flex",gap:"10px",marginTop:"14px",flexWrap:"wrap"}}>
                  <a href={`tel:${req.phone}`} className="btn btn-outline btn-sm">📞 Call Now</a>
                  <a
                    href={`https://wa.me/91${req.phone}?text=${encodeURIComponent(`Hi ${req.name}, we received your request to sell your ${req.brand} ${req.model} (${req.year}). We'd like to schedule a free evaluation. When are you available?`)}`}
                    target="_blank" rel="noreferrer"
                    className="btn btn-green btn-sm"
                  >💬 WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default SellRequests
