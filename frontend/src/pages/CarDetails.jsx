import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { CarDetailSkeleton } from "../components/skeleton/skeleton"
import ShareButton from "../components/ShareButton/ShareButton"
import styles from "./CarDetails.module.css"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
const WA  = "919825086109"

function fmtPrice(p) {
  return p >= 100000 ? `₹${(p/100000).toFixed(2)} Lakh` : `₹${Number(p).toLocaleString("en-IN")}`
}

function CarDetails() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [car, setCar]           = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [form, setForm]   = useState({ name:"", phone:"", message:"" })
  const [sent, setSent]   = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setLoading(true); setNotFound(false); setActiveIdx(0)
    axios.get(`${API}/cars/${id}`)
      .then(r  => { setCar(r.data); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  const prev = () => setActiveIdx(i => (i - 1 + (car?.images?.length||1)) % (car?.images?.length||1))
  const next = () => setActiveIdx(i => (i + 1) % (car?.images?.length||1))

  const submitInquiry = async e => {
    e.preventDefault(); setSending(true)
    try { await axios.post(`${API}/inquiries`, { ...form, carId: car._id }); setSent(true) }
    catch { setSent(true) }
    setSending(false)
  }

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.crumb}><div className="container"><span style={{color:"var(--muted)"}}>← Back to Cars</span></div></div>
      <div className="container"><CarDetailSkeleton /></div>
    </div>
  )

  if (notFound || !car) return (
    <div className={styles.page}>
      <div className="empty-state" style={{minHeight:"60vh"}}>
        <span className="empty-icon">🚗</span>
        <h3>Car not found</h3>
        <p>This car may have been sold or removed.</p>
        <Link to="/cars" className="btn btn-primary" style={{marginTop:"8px"}}>Browse All Cars</Link>
      </div>
    </div>
  )

  const images = car.images?.length ? car.images : []
  const waMsg  = encodeURIComponent(`Hi! I'm interested in the ${car.title} (${car.year}). Please share more details.`)
  const specs  = [
    { label:"Brand",        value: car.brand },
    { label:"Model",        value: car.model },
    { label:"Year",         value: car.year },
    { label:"Fuel Type",    value: car.fuelType },
    { label:"Transmission", value: car.transmission },
    { label:"KM Driven",    value: `${Number(car.kmDriven).toLocaleString("en-IN")} km` },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.crumb}>
        <div className="container">
          <div className={styles.crumbInner}>
            <div className={styles.crumbLeft}>
              <button onClick={()=>navigate(-1)} className={styles.back}>← Back to Cars</button>
              <span className={styles.breadSep}>/</span>
              <span className={styles.breadCurrent}>{car.title}</span>
            </div>
            <ShareButton title={car.title} price={fmtPrice(car.price)} url={window.location.href}/>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <div className={styles.gallery}>
              {images.length > 0 ? (
                <>
                  <div className={styles.mainImgWrap}>
                    <img src={images[activeIdx]} alt={car.title} className={styles.mainImg}/>
                    {images.length > 1 && <>
                      <button className={`${styles.arrow} ${styles.arrowL}`} onClick={prev}>‹</button>
                      <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next}>›</button>
                    </>}
                    {car.isSold && <div className={styles.soldOverlay}>🚫 SOLD</div>}
                    <span className={styles.imgCounter}>{activeIdx+1} / {images.length}</span>
                  </div>
                  {images.length > 1 && (
                    <div className={styles.thumbs}>
                      {images.map((img,i) => (
                        <button key={i} className={`${styles.thumb} ${i===activeIdx?styles.thumbActive:""}`} onClick={()=>setActiveIdx(i)}>
                          <img src={img} alt={`View ${i+1}`}/>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.noImg}>🚗<span>No Photos Available</span></div>
              )}
            </div>
            {car.description && (
              <div className={styles.descCard}>
                <h4>About This Car</h4>
                <p>{car.description}</p>
              </div>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.infoCard}>
              {car.isSold && <div className={styles.soldBanner}>🚫 This car has been sold</div>}
              <span className={styles.infoBrand}>{car.brand}</span>
              <h1 className={styles.infoTitle}>{car.title}</h1>
              <div className={styles.infoPrice}>{fmtPrice(car.price)}<span> negotiable</span></div>
              <div className={styles.specs}>
                {specs.map(s => (
                  <div key={s.label} className={styles.spec}>
                    <span className={styles.specLabel}>{s.label}</span>
                    <span className={styles.specValue}>{s.value}</span>
                  </div>
                ))}
              </div>
              <div className={styles.verified}>
                <span>✅</span>
                <div>
                  <strong>Verified Vehicle</strong>
                  <span>Inspected · Clean title · No accidents</span>
                </div>
              </div>
              {!car.isSold && (
                <div className={styles.ctaBtns}>
                  <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-green btn-full">💬 WhatsApp Inquiry</a>
                  <a href="tel:+919998887669" className="btn btn-outline btn-full">📞 Call Now</a>
                </div>
              )}
              <div className={styles.shareRow}>
                <span className={styles.shareLabel}>Share this car:</span>
                <ShareButton title={car.title} price={fmtPrice(car.price)} url={window.location.href}/>
              </div>
            </div>

            {!car.isSold && (
              <div className={styles.formCard}>
                <h4>Send an Inquiry</h4>
                <p>We'll contact you within 2 hours.</p>
                {sent ? (
                  <div className="empty-state" style={{padding:"24px 0"}}>
                    <span style={{fontSize:"32px"}}>✅</span>
                    <strong>Inquiry Sent!</strong>
                    <span style={{fontSize:"13px",color:"var(--muted)"}}>We'll call you soon.</span>
                  </div>
                ) : (
                  <form onSubmit={submitInquiry} className={styles.form}>
                    <div className={styles.row2}>
                      <div className="field"><label>Name *</label><input className="input" placeholder="Your Name" value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} required/></div>
                      <div className="field"><label>Phone *</label><input className="input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm(v=>({...v,phone:e.target.value}))} required/></div>
                    </div>
                    <div className="field"><label>Message</label><textarea className="input" placeholder={`I'm interested in ${car.title}…`} value={form.message} onChange={e=>setForm(v=>({...v,message:e.target.value}))}/></div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={sending}>{sending?"Sending…":"Send Inquiry →"}</button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CarDetails
