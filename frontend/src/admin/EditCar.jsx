import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import AdminNavbar from "../components/AdminNavbar"
import BrandInput from "./BrandInput"
import styles from "./Admin.module.css"

const API = "http://localhost:5000/api"

function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileRef  = useRef(null)

  const [formData, setFormData] = useState({
    title:"", brand:"", model:"", year:"", fuelType:"",
    transmission:"", kmDriven:"", price:"", description:""
  })
  const [existingImages, setExistingImages] = useState([]) // already-uploaded URLs
  const [newFiles,       setNewFiles]       = useState([]) // new File objects
  const [newPreviews,    setNewPreviews]    = useState([]) // base64 previews of new files
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error,    setError]    = useState("")

  useEffect(() => {
    api.get(`${API}/cars/${id}`)
      .then(r => {
        const c = r.data
        setFormData({
          title: c.title||"", brand: c.brand||"", model: c.model||"",
          year: c.year||"", fuelType: c.fuelType||"", transmission: c.transmission||"",
          kmDriven: c.kmDriven||"", price: c.price||"", description: c.description||""
        })
        setExistingImages(c.images || [])
        setFetching(false)
      })
      .catch(() => { setError("Failed to load car data."); setFetching(false) })
  }, [id])

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleNewFiles = e => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const totalImages = existingImages.length + newFiles.length + files.length
    if (totalImages > 10) { setError("Maximum 10 images allowed in total"); return }
    setNewFiles(prev => [...prev, ...files])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setNewPreviews(prev => [...prev, ev.target.result])
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  const removeExisting = idx => setExistingImages(prev => prev.filter((_,i)=>i!==idx))
  const removeNew      = idx => {
    setNewFiles(prev => prev.filter((_,i)=>i!==idx))
    setNewPreviews(prev => prev.filter((_,i)=>i!==idx))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    if (!formData.title||!formData.brand||!formData.price) {
      setError("Please fill in all required fields"); return
    }
    setLoading(true)
    try {
      // Upload new images if any
      let uploadedUrls = []
      if (newFiles.length > 0) {
        const fd = new FormData()
        newFiles.forEach(img => fd.append("images", img))
        const uploadRes = await api.post(`${API}/upload`, fd)
        uploadedUrls = uploadRes.data.imageUrls
      }
      const allImages = [...existingImages, ...uploadedUrls]
      await api.put(`${API}/cars/${id}`, { ...formData, images: allImages })
      navigate("/admin/manage-cars")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update car. Please try again.")
    }
    setLoading(false)
  }

  if (fetching) return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className="loading-box" style={{minHeight:"60vh"}}><div className="spinner"/><span>Loading car…</span></div>
      </div>
    </div>
  )

  const totalImages = existingImages.length + newPreviews.length

  return (
    <div className={styles.layout}>
      <AdminNavbar/>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Edit Car</h1>
            <p className={styles.pageSub}>Update details for: {formData.title || "—"}</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={()=>navigate("/admin/manage-cars")}>← Back</button>
        </div>

        <div className={styles.formCard}>
          {error && (
            <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:"var(--red)",padding:"10px 14px",borderRadius:"var(--r)",marginBottom:"16px",fontSize:"13px"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Basic Info */}
            <div className={styles.sectionLabel}>Basic Information</div>
            <div className={styles.row2}>
              <div className="field">
                <label>Car Title *</label>
                <input className="input" name="title" placeholder="e.g. Hyundai Creta SX 2021" value={formData.title} onChange={handleChange} required/>
              </div>
              <div className="field">
                <label>Brand *</label>
                <BrandInput
                  value={formData.brand}
                  onChange={val => setFormData(v => ({ ...v, brand: val }))}
                  required
                />
              </div>
            </div>

            <div className={styles.row3}>
              <div className="field">
                <label>Model *</label>
                <input className="input" name="model" placeholder="e.g. Creta, Swift" value={formData.model} onChange={handleChange} required/>
              </div>
              <div className="field">
                <label>Year *</label>
                <select className="input" name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  {Array.from({length:20},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y}>{y}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Fuel Type *</label>
                <select className="input" name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                  <option value="">Select Fuel</option>
                  {["Petrol","Diesel","CNG","Electric","Hybrid"].map(f=><option key={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.row3}>
              <div className="field">
                <label>Transmission *</label>
                <select className="input" name="transmission" value={formData.transmission} onChange={handleChange} required>
                  <option value="">Select</option>
                  {["Manual","Automatic","AMT","CVT"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label>KM Driven *</label>
                <input className="input" name="kmDriven" type="number" placeholder="e.g. 45000" value={formData.kmDriven} onChange={handleChange} required min="0"/>
              </div>
              <div className="field">
                <label>Price (₹) *</label>
                <input className="input" name="price" type="number" placeholder="e.g. 850000" value={formData.price} onChange={handleChange} required min="0"/>
              </div>
            </div>

            <div className="field">
              <label>Description</label>
              <textarea className="input" name="description" placeholder="Describe condition, history, features…" value={formData.description} onChange={handleChange}/>
            </div>

            {/* Photos */}
            <div className={styles.sectionLabel}>
              Car Photos ({totalImages}/10)
            </div>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <>
                <p style={{fontSize:"12px",color:"var(--muted)"}}>Existing photos — click ✕ to remove</p>
                <div className={styles.previewGrid}>
                  {existingImages.map((url, i) => (
                    <div key={i} className={`${styles.previewItem} ${i===0&&newPreviews.length===0?styles.main:""}`}>
                      <img src={url} alt="" className={styles.previewImg}/>
                      {i===0 && newPreviews.length===0 && <span className={styles.mainBadge}>Main</span>}
                      <button type="button" className={styles.removeImgBtn} onClick={()=>removeExisting(i)}>✕</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* New image previews */}
            {newPreviews.length > 0 && (
              <>
                <p style={{fontSize:"12px",color:"var(--muted)",marginTop:"8px"}}>New photos to upload</p>
                <div className={styles.previewGrid}>
                  {newPreviews.map((src, i) => (
                    <div key={i} className={`${styles.previewItem} ${existingImages.length===0&&i===0?styles.main:""}`}>
                      <img src={src} alt="" className={styles.previewImg}/>
                      {existingImages.length===0 && i===0 && <span className={styles.mainBadge}>Main</span>}
                      <button type="button" className={styles.removeImgBtn} onClick={()=>removeNew(i)}>✕</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Drop zone */}
            {totalImages < 10 && (
              <div
                className={styles.dropZone}
                onClick={()=>fileRef.current?.click()}
                onDragOver={e=>e.preventDefault()}
                onDrop={e=>{e.preventDefault();handleNewFiles({target:{files:e.dataTransfer.files}})}}
              >
                <div style={{fontSize:"28px"}}>📸</div>
                <p>{totalImages === 0 ? "Click or drag photos here" : "Add more photos"}</p>
                <small>JPG, PNG, WEBP · Up to {10 - totalImages} more photo{10-totalImages!==1?"s":""}</small>
                <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleNewFiles} style={{display:"none"}}/>
              </div>
            )}

            <div style={{display:"flex",gap:"12px",marginTop:"8px"}}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{flex:1}}>
                {loading ? "Saving Changes…" : "✅ Update Car Listing"}
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={()=>navigate("/admin/manage-cars")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditCar
