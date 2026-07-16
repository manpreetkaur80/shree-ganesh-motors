import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import styles from "./Admin.module.css"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
function fmt(p) { return p >= 100000 ? `₹${(p/100000).toFixed(2)}L` : `₹${Number(p).toLocaleString("en-IN")}` }
function ago(d) { const m = Math.floor((Date.now()-new Date(d))/60000); return m < 60 ? `${m}m ago` : m < 1440 ? `${Math.floor(m/60)}h ago` : `${Math.floor(m/1440)}d ago` }

function AdminDashboard() {
  const [cars, setCars]           = useState([])
  const [inquiries, setInquiries] = useState([])
  const [sellReqs, setSellReqs]   = useState([])
  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading]     = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [carsR, inqR, sellR, galR] = await Promise.all([
        api.get(`${API}/cars`),
        api.get(`${API}/inquiries`),
        api.get(`${API}/sell-requests`),
        api.get(`${API}/gallery`),
      ])
      setCars(carsR.data); setInquiries(inqR.data)
      setSellReqs(sellR.data); setGalleryPhotos(galR.data)
    } catch(e) { console.log(e) }
    setLoading(false)
  }

  const uploadGallery = async () => {
    if (!galleryImages.length) return
    setUploading(true)
    try {
      const fd = new FormData()
      galleryImages.forEach(img => fd.append("images", img))
      const uploadRes = await api.post(`${API}/upload`, fd)
      for (const url of uploadRes.data.imageUrls) {
        await api.post(`${API}/gallery`, { image: url })
      }
      setGalleryImages([]); fetchData()
    } catch(e) { console.log(e) }
    setUploading(false)
  }

  const deletePhoto = async id => {
    try {
      await api.delete(`${API}/gallery/${id}`)
      setGalleryPhotos(prev => prev.filter(p => p._id !== id))
    } catch(e) { console.log(e) }
  }

  const sold      = cars.filter(c => c.isSold).length
  const available = cars.filter(c => !c.isSold).length

  const STATS = [
    { label:"Total Cars",      value:cars.length,       icon:"🚗", color:"#F59E0B", link:"/admin/manage-cars" },
    { label:"Available",       value:available,         icon:"✅", color:"#22C55E", link:"/admin/manage-cars" },
    { label:"Sold",            value:sold,              icon:"🏷️", color:"#EF4444", link:"/admin/manage-cars" },
    { label:"Inquiries",       value:inquiries.length,  icon:"💬", color:"#3B82F6", link:"/admin/inquiries" },
    { label:"Sell Requests",   value:sellReqs.length,   icon:"💰", color:"#A855F7", link:"/admin/sell-requests" },
    { label:"Gallery Photos",  value:galleryPhotos.length, icon:"📸", color:"#06B6D4", link:"#gallery" },
  ]

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSub}>Welcome back! Here's what's happening.</p>
          </div>
          <Link to="/admin/add-car" className="btn btn-primary">➕ Add New Car</Link>
        </div>

        {loading ? (
          <div className="loading-box"><div className="spinner"/></div>
        ) : (
          <>
            {/* Stats */}
            <div className={styles.statsGrid}>
              {STATS.map(s => (
                <Link key={s.label} to={s.link} className={styles.statCard}>
                  <div className={styles.statIcon} style={{background:`${s.color}18`,border:`1px solid ${s.color}30`}}>
                    <span style={{fontSize:"20px"}}>{s.icon}</span>
                  </div>
                  <div className={styles.statNum} style={{color:s.color}}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </Link>
              ))}
            </div>

            <div className={styles.grid2}>
              {/* Recent Cars */}
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h3>Recent Listings</h3>
                  <Link to="/admin/manage-cars">View All →</Link>
                </div>
                <table className={styles.table}>
                  <thead><tr><th>Car</th><th>Price</th><th>Status</th></tr></thead>
                  <tbody>
                    {cars.slice(0,5).map(car => (
                      <tr key={car._id}>
                        <td>
                          <div className={styles.carCell}>
                            {car.images?.[0] ? <img src={car.images[0]} alt="" className={styles.carThumb}/> : <div className={styles.carThumb} style={{display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg3)"}}>🚗</div>}
                            <div>
                              <div className={styles.carName}>{car.title}</div>
                              <div className={styles.carYear}>{car.year} · {car.fuelType}</div>
                            </div>
                          </div>
                        </td>
                        <td className={styles.tdPrice}>{fmt(car.price)}</td>
                        <td><span className={car.isSold ? "badge badge-red" : "badge badge-green"}>{car.isSold?"Sold":"Available"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Inquiries */}
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h3>Recent Inquiries</h3>
                  <Link to="/admin/inquiries">View All →</Link>
                </div>
                <div className={styles.inqList}>
                  {inquiries.slice(0,5).map(inq => (
                    <div key={inq._id} className={styles.inqItem}>
                      <div className={styles.inqAvatar}>{inq.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div>
                      <div className={styles.inqInfo}>
                        <div className={styles.inqName}>{inq.name}</div>
                        <div className={styles.inqPhone}>{inq.phone}</div>
                      </div>
                      <div>
                        <span className={`badge ${inq.status==="Pending"?"badge-orange":inq.status==="Contacted"?"badge-blue":"badge-green"}`}>{inq.status}</span>
                        <div className={styles.inqTime}>{ago(inq.createdAt)}</div>
                      </div>
                    </div>
                  ))}
                  {inquiries.length===0 && <p className={styles.empty}>No inquiries yet</p>}
                </div>
              </div>
            </div>

            {/* Gallery Management */}
            <div id="gallery" className={styles.panel} style={{marginTop:"20px"}}>
              <div className={styles.panelHead}><h3>📸 Gallery Management</h3></div>
              <div className={styles.galleryUpload}>
                <label className={styles.fileLabel}>
                  <span>🖼️ Choose Photos</span>
                  <input type="file" multiple accept="image/*" style={{display:"none"}} onChange={e=>setGalleryImages([...e.target.files])}/>
                </label>
                {galleryImages.length > 0 && (
                  <span className="badge badge-orange">{galleryImages.length} file(s) selected</span>
                )}
                <button className="btn btn-primary btn-sm" onClick={uploadGallery} disabled={uploading || !galleryImages.length}>
                  {uploading ? "Uploading…" : "⬆️ Upload to Gallery"}
                </button>
              </div>
              {galleryPhotos.length > 0 ? (
                <div className={styles.galleryGrid}>
                  {galleryPhotos.map(photo => (
                    <div key={photo._id} className={styles.galleryItem}>
                      <img src={photo.image} alt="Gallery" className={styles.galleryImg}/>
                      <button className={styles.deletePhotoBtn} onClick={()=>deletePhoto(photo._id)}>✕</button>
                    </div>
                  ))}
                </div>
              ) : <p className={styles.empty} style={{padding:"24px"}}>No gallery photos yet. Upload some above.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default AdminDashboard
