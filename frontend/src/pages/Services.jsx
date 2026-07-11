import { useEffect, useState, useRef } from "react"
import axios from "axios"
import styles from "./Services.module.css"

const API = "http://localhost:5000/api"

const SERVICES = [
  { icon:"🚗", title:"Buy Pre-Owned Cars",      desc:"Browse our verified inventory of quality inspected used vehicles at fair market prices. Every car comes with full history." },
  { icon:"💰", title:"Sell Your Car",            desc:"Get the best market value for your vehicle. We offer instant evaluation, fast payment, and complete paperwork handling." },
  { icon:"🔄", title:"Car Exchange",             desc:"Exchange your old car for another vehicle in our inventory. Simple, fast, and hassle-free process." },
  { icon:"📋", title:"RC Transfer Assistance",   desc:"Complete vehicle ownership transfer support. We handle all RTO paperwork so you don't have to." },
  { icon:"🏦", title:"Finance Assistance",       desc:"Expert guidance for vehicle loan approvals. We work with leading banks and NBFCs to get you the best rates." },
  { icon:"🛡️", title:"Insurance Assistance",    desc:"Insurance renewal and transfer made easy. Get the best coverage at competitive prices through our partners." },
]

/* ── Carousel Component ── */
function GalleryCarousel({ photos }) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const total = photos.length

  const go = (dir) => {
    if (animating || total <= 1) return
    setAnimating(true)
    setActive(i => (i + dir + total) % total)
    setTimeout(() => setAnimating(false), 400)
  }

  useEffect(() => {
    const handleKey = e => {
      if (e.key === "ArrowLeft")  go(-1)
      if (e.key === "ArrowRight") go(1)
      if (e.key === "Escape")     setLightbox(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [total, animating])

  if (total === 0) return (
    <div className="empty-state">
      <span className="empty-icon">📸</span>
      <h3>No photos yet</h3>
      <p>Gallery photos will appear here once uploaded by the admin.</p>
    </div>
  )

  if (total === 1) return (
    <>
      <div className={styles.singleWrap}>
        <div className={styles.singleCard} onClick={() => setLightbox(photos[0].image)}>
          <img src={photos[0].image} alt="Customer delivery" className={styles.singleImg} />
          <div className={styles.galleryOverlay}><span>🔍</span></div>
        </div>
      </div>
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="" className={styles.lightboxImg} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )

  // Multi-photo carousel — center + side cards
  const getIdx = (offset) => (active + offset + total) % total
  const prev   = getIdx(-1)
  const next   = getIdx(1)

  return (
    <>
      <div className={styles.carousel}>
        {/* Prev card (behind left) */}
        <div
          className={`${styles.carouselCard} ${styles.carouselLeft}`}
          onClick={() => go(-1)}
        >
          <img src={photos[prev].image} alt="" className={styles.carouselImg} />
          <div className={styles.cardDim} />
        </div>

        {/* Center card (main) */}
        <div
          className={`${styles.carouselCard} ${styles.carouselCenter} ${animating ? styles.carouselAnim : ""}`}
          onClick={() => setLightbox(photos[active].image)}
        >
          <img src={photos[active].image} alt="Customer delivery" className={styles.carouselImg} />
          <div className={styles.galleryOverlay}><span>🔍</span></div>
          <div className={styles.carouselGold} />
        </div>

        {/* Next card (behind right) */}
        <div
          className={`${styles.carouselCard} ${styles.carouselRight}`}
          onClick={() => go(1)}
        >
          <img src={photos[next].image} alt="" className={styles.carouselImg} />
          <div className={styles.cardDim} />
        </div>
      </div>

      {/* Controls */}
      <div className={styles.carouselControls}>
        <button className={styles.arrowBtn} onClick={() => go(-1)} aria-label="Previous">‹</button>
        <div className={styles.dots}>
          {photos.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => { if (!animating) { setAnimating(true); setActive(i); setTimeout(()=>setAnimating(false),400) } }}
            />
          ))}
        </div>
        <button className={styles.arrowBtn} onClick={() => go(1)} aria-label="Next">›</button>
      </div>

      <p className={styles.carouselCount}>{active + 1} / {total}</p>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="" className={styles.lightboxImg} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}

function Services() {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/gallery`)
      .then(r => { setPhotos(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <span className="tag">What We Offer</span>
          <h1 className="section-title">Our <em>Services</em></h1>
          <p className="section-sub">Complete automobile solutions under one roof — from buying and selling to RTO work and insurance assistance.</p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className={styles.serviceCard} style={{"--i":i}}>
                <div className={styles.serviceIconWrap}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className={styles.strip}>
        <div className="container">
          <div className={styles.stripGrid}>
            {[{num:"500+",label:"Cars Sold"},{num:"10+",label:"Years Experience"},{num:"1000+",label:"RTO Works Done"},{num:"95%",label:"Happy Customers"}].map(s=>(
              <div key={s.label} className={styles.stripItem}>
                <span className={styles.stripNum}>{s.num}</span>
                <span className={styles.stripLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <span className="tag">How It Works</span>
            <h2 className="section-title">Simple &amp; Transparent Process</h2>
          </div>
          <div className={styles.processGrid}>
            {[
              {step:"01",title:"Contact Us",       desc:"Call, WhatsApp, or fill the inquiry form on our website."},
              {step:"02",title:"Vehicle Inspection",desc:"Our expert inspects the vehicle and provides a fair valuation."},
              {step:"03",title:"Documentation",    desc:"We handle all paperwork — RC transfer, insurance, RTO work."},
              {step:"04",title:"Deal Done!",        desc:"Complete the transaction and drive away happy."},
            ].map(p=>(
              <div key={p.step} className={styles.processCard}>
                <span className={styles.processNum}>{p.step}</span>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <span className="tag">Happy Customers</span>
            <h2 className="section-title">Customer Delivery Gallery</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Moments of joy — our customers driving home their dream cars.</p>
          </div>

          {loading ? (
            <div className="loading-box"><div className="spinner"/><span>Loading gallery…</span></div>
          ) : (
            <GalleryCarousel photos={photos} />
          )}
        </div>
      </section>
    </div>
  )
}
export default Services
