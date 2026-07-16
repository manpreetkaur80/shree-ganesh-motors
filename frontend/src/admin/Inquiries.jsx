import { useEffect, useState } from "react"
import api from "../services/api"
import AdminNavbar from "../components/AdminNavbar"
import styles from "./Admin.module.css"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
function timeStr(d) {
  return new Date(d).toLocaleString("en-IN", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
}

function Inquiries() {
  const [inquiries, setInquiries] = useState([])
  const [filter,    setFilter]    = useState("all")
  const [search,    setSearch]    = useState("")
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    api.get(`${API}/inquiries`)
      .then(r => { setInquiries(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`${API}/inquiries/${id}/status`, { status })
      setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i))
    } catch { alert("Failed to update status") }
  }

  const filtered = inquiries
    .filter(i => {
      const matchFilter = filter === "all" ? true : i.status === filter
      const q = search.toLowerCase()
      const matchSearch = !search || i.name?.toLowerCase().includes(q) || i.phone?.includes(q)
      return matchFilter && matchSearch
    })
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  const counts = {
    all: inquiries.length,
    Pending:   inquiries.filter(i=>i.status==="Pending").length,
    Contacted: inquiries.filter(i=>i.status==="Contacted").length,
    Closed:    inquiries.filter(i=>i.status==="Closed").length,
  }

  const STATUS_BADGE = { Pending:"badge-orange", Contacted:"badge-blue", Closed:"badge-green" }

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Inquiries</h1>
            <p className={styles.pageSub}>{inquiries.length} total · {counts.Pending} pending</p>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input className={styles.searchInput} placeholder="Search by name or phone…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          {[["all","All",counts.all],["Pending","Pending",counts.Pending],["Contacted","Contacted",counts.Contacted],["Closed","Closed",counts.Closed]].map(([v,l,c])=>(
            <button key={v} className={`${styles.filterTab} ${filter===v?styles.filterTabActive:""}`} onClick={()=>setFilter(v)}>
              {l} {c > 0 && <span className="badge badge-orange" style={{padding:"1px 6px",fontSize:"9px",marginLeft:"4px"}}>{c}</span>}
            </button>
          ))}
          <span className={styles.resultCount}>{filtered.length} inquiry{filtered.length!==1?"s":""}</span>
        </div>

        {loading ? (
          <div className="loading-box"><div className="spinner"/></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{padding:"60px"}}>
            <span className="empty-icon">💬</span>
            <h3>No inquiries found</h3>
            <p>Customer inquiries from your website will appear here.</p>
          </div>
        ) : (
          <div className={styles.inqCards}>
            {filtered.map(inq => (
              <div key={inq._id} className={styles.inqCard}>
                {/* Avatar */}
                <div className={styles.inqAvatar} style={{flexShrink:0}}>
                  {inq.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                </div>

                {/* Body */}
                <div className={styles.inqCardBody}>
                  <div className={styles.inqCardName}>
                    <strong>{inq.name}</strong>
                    <span className={`badge ${STATUS_BADGE[inq.status]||"badge-orange"}`}>{inq.status}</span>
                  </div>
                  <div className={styles.inqCardPhone}>
                    <a href={`tel:${inq.phone}`} style={{color:"var(--muted)",transition:"color .2s"}} onMouseOver={e=>e.target.style.color="var(--orange)"} onMouseOut={e=>e.target.style.color="var(--muted)"}>
                      📞 {inq.phone}
                    </a>
                    <span style={{margin:"0 8px",color:"var(--border)"}}>·</span>
                    <a href={`https://wa.me/${inq.phone}?text=${encodeURIComponent(`Hi ${inq.name}, thank you for your inquiry. How can I help you?`)}`}
                       target="_blank" rel="noreferrer"
                       style={{color:"var(--green)",fontSize:"12px"}}>
                      💬 WhatsApp
                    </a>
                  </div>
                  {inq.message && <div className={styles.inqCardMsg}>"{inq.message}"</div>}
                  <div className={styles.inqCardTime}>{timeStr(inq.createdAt)}</div>

                  {/* Action buttons */}
                  {inq.status !== "Closed" && (
                    <div className={styles.inqCardBtns}>
                      {inq.status === "Pending" && (
                        <button className={styles.btnContacted} onClick={()=>updateStatus(inq._id,"Contacted")}>
                          ✅ Mark Contacted
                        </button>
                      )}
                      <button className={styles.btnClosed} onClick={()=>updateStatus(inq._id,"Closed")}>
                        🔒 Mark Closed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Inquiries
