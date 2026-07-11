import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import AdminNavbar from "../components/AdminNavbar"
import BrandInput from "./BrandInput"
import styles from "./Admin.module.css"

const API = "http://localhost:5000/api"

const EMPTY = { title:"", brand:"", model:"", year:"", fuelType:"", transmission:"", kmDriven:"", price:"", description:"" }

function AddCar() {
  const [formData, setFormData] = useState(EMPTY)
  const [images, setImages]     = useState([])   // File objects
  const [previews, setPreviews] = useState([])   // base64 preview URLs
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")
  const fileRef = useRef(null)
  const navigate = useNavigate()

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFiles = e => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (images.length + files.length > 10) { setError("Maximum 10 images allowed"); return }
    setImages(prev => [...prev, ...files])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setPreviews(prev => [...prev, ev.target.result])
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  const removeImage = idx => {
    setImages(prev => prev.filter((_,i)=>i!==idx))
    setPreviews(prev => prev.filter((_,i)=>i!==idx))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    if (!formData.title||!formData.brand||!formData.model||!formData.price) {
      setError("Please fill in all required fields"); return
    }
    setLoading(true)
    try {
      let imageUrls = []
      if (images.length > 0) {
        const fd = new FormData()
        images.forEach(img => fd.append("images", img))
        const uploadRes = await api.post(`${API}/upload`, fd)
        imageUrls = uploadRes.data.imageUrls
      }
      await api.post(`${API}/cars`, { ...formData, images: imageUrls })
      navigate("/admin/manage-cars")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add car. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Add New Car</h1>
            <p className={styles.pageSub}>Fill in the details below to list a new car</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={()=>navigate("/admin/manage-cars")}>← Back</button>
        </div>

        <div className={styles.formCard}>
          {error && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:"var(--red)",padding:"10px 14px",borderRadius:"var(--r)",marginBottom:"16px",fontSize:"13px"}}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Basic Info */}
            <div className={styles.sectionLabel}>Basic Information</div>
            <div className={styles.row2}>
              <div className="field"><label>Car Title *</label><input className="input" name="title" placeholder="e.g. Hyundai Creta SX 2021" value={formData.title} onChange={handleChange} required/></div>
              <div className="field"><label>Brand *</label>
                <BrandInput
                  value={formData.brand}
                  onChange={val => setFormData(v => ({ ...v, brand: val }))}
                  required
                />
              </div>
            </div>
            <div className={styles.row3}>
              <div className="field"><label>Model *</label><input className="input" name="model" placeholder="e.g. Creta, Swift" value={formData.model} onChange={handleChange} required/></div>
              <div className="field"><label>Year *</label>
                <select className="input" name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  {Array.from({length:20},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y}>{y}</option>)}
                </select>
              </div>
              <div className="field"><label>Fuel Type *</label>
                <select className="input" name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                  <option value="">Select Fuel</option>
                  {["Petrol","Diesel","CNG","Electric","Hybrid"].map(f=><option key={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.row3}>
              <div className="field"><label>Transmission *</label>
                <select className="input" name="transmission" value={formData.transmission} onChange={handleChange} required>
                  <option value="">Select</option>
                  {["Manual","Automatic","AMT","CVT"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field"><label>KM Driven *</label><input className="input" name="kmDriven" type="number" placeholder="e.g. 45000" value={formData.kmDriven} onChange={handleChange} required min="0"/></div>
              <div className="field"><label>Price (₹) *</label><input className="input" name="price" type="number" placeholder="e.g. 850000" value={formData.price} onChange={handleChange} required min="0"/></div>
            </div>
            <div className="field"><label>Description</label><textarea className="input" name="description" placeholder="Describe condition, history, features…" value={formData.description} onChange={handleChange}/></div>

            {/* Photos */}
            <div className={styles.sectionLabel}>Car Photos (max 10)</div>
            <div
              className={styles.dropZone}
              onClick={()=>fileRef.current?.click()}
              onDragOver={e=>e.preventDefault()}
              onDrop={e=>{e.preventDefault();handleFiles({target:{files:e.dataTransfer.files}})}}
            >
              <div style={{fontSize:"32px"}}>📸</div>
              <p>Click or drag photos here</p>
              <small>JPG, PNG, WEBP · Max 10 photos · 5MB each</small>
              <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFiles} style={{display:"none"}}/>
            </div>

            {previews.length > 0 && (
              <div className={styles.previewGrid}>
                {previews.map((src,i)=>(
                  <div key={i} className={`${styles.previewItem} ${i===0?styles.main:""}`}>
                    <img src={src} alt="" className={styles.previewImg}/>
                    {i===0 && <span className={styles.mainBadge}>Main</span>}
                    <button type="button" className={styles.removeImgBtn} onClick={()=>removeImage(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:"flex",gap:"12px",marginTop:"8px"}}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{flex:1}}>
                {loading ? "Uploading & Saving…" : "➕ Add Car Listing"}
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={()=>navigate("/admin/manage-cars")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddCar
