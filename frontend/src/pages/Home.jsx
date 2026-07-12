import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { CarGridSkeleton } from "../components/skeleton/skeleton"
import styles from "./Home.module.css"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
const WA  = "919825086109"
const WA_MSG = encodeURIComponent("Hello! I visited your website and I'm interested. Please help me.")

function fmtPrice(p) {
  return p >= 100000 ? `₹${(p/100000).toFixed(2)} L` : `₹${Number(p).toLocaleString("en-IN")}`
}

function Counter({ target, suffix="" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(target / 60)
      const id = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(id) }
        else setCount(start)
      }, 24)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>
}

function Home() {
  const [cars, setCars]       = useState([])
  const [carsLoading, setCarsLoading] = useState(true)
  const [inquiry, setInquiry] = useState({ name:"", phone:"", interest:"buying" })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${API}/cars`)
      .then(r => { setCars(r.data.slice(0, 6)); setCarsLoading(false) })
      .catch(() => setCarsLoading(false))
  }, [])

  const submitInquiry = async e => {
    e.preventDefault()
    if (!inquiry.name || !inquiry.phone) return
    setLoading(true)
    try {
      await axios.post(`${API}/inquiries`, {
        name: inquiry.name,
        phone: inquiry.phone,
        message: `Interested in: ${inquiry.interest}`
      })
      setSent(true)
    } catch { setSent(true) }
    setLoading(false)
  }

  const SERVICES = [
    { icon:"🚗", title:"Used Car Sale",         desc:"Browse our verified inventory of quality pre-owned vehicles at fair prices." },
    { icon:"💰", title:"Used Car Purchase",      desc:"We buy your car at the best market price with instant evaluation." },
    { icon:"📋", title:"RTO Work",               desc:"Complete RTO documentation handled professionally and on time." },
    { icon:"🔄", title:"RC Transfer",            desc:"Hassle-free RC transfer with complete legal documentation support." },
    { icon:"🛡️", title:"Insurance Assistance",  desc:"Get the best insurance deals with our expert guidance." },
    { icon:"🤝", title:"Auto Consultancy",       desc:"Expert consultation for all your automobile needs." },
  ]
  const WHY = [
    { icon:"✅", title:"Verified Vehicles",          desc:"Every car undergoes a 50-point inspection before listing." },
    { icon:"📑", title:"Transparent Documentation",  desc:"Full history, clean titles, clear paperwork on every deal." },
    { icon:"⚡", title:"Fast RTO Processing",         desc:"Quick turnaround on all RTO and RC transfer work." },
    { icon:"🏆", title:"10+ Years Experience",       desc:"Trusted by 500+ families across Ahmedabad and Gujarat." },
    { icon:"💬", title:"After-Sale Support",          desc:"We don't disappear after the sale — always here to help." },
    { icon:"💎", title:"Best Market Price",           desc:"Competitive pricing with no hidden charges or surprise fees." },
  ]
  const TESTIMONIALS = [
    { name:"Rajesh Patel",  city:"Ahmedabad",  text:"Bought my Creta here and the experience was exceptional. Full transparency, no pressure tactics." },
    { name:"Suresh Mehta",  city:"Gandhinagar", text:"RTO work done in just 3 days! Usually it takes weeks. Shree Ganesh Motors is my go-to." },
    { name:"Priya Desai",   city:"Surat",       text:"Got a very fair price for my old Swift. They handled all the paperwork. Highly recommended!" },
  ]

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.videoBg}>
          <video autoPlay muted loop playsInline className={styles.video} poster="/hero-poster.jpg">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <div className={styles.videoVignette} />
        </div>
        <div className={styles.heroGlow} />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <span className={styles.heroBadge}><span className={styles.pulse}/> Gujarat's Trusted Dealership · Est. 2013</span>
            <h1 className={styles.heroH1}>Your Trusted<br/><em>Destination</em> for<br/>Quality Used Cars</h1>
            <p className={styles.heroSub}>Buy, Sell and Exchange Cars with Complete RTO Assistance. Trusted by 500+ families across Ahmedabad &amp; Gujarat.</p>
            <div className={styles.heroBtns}>
              <Link to="/cars" className="btn btn-primary btn-lg">View Cars →</Link>
              <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noreferrer" className="btn btn-green btn-lg">💬 WhatsApp Us</a>
            </div>
            <div className={styles.heroPills}>
              {["500+ Cars Sold","Verified Vehicles","Fast RTO Work","10+ Years Trust"].map(t=>(
                <span key={t} className={styles.pill}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.heroCard}>
            <h3>Quick Inquiry</h3>
            <p>Free consultation · Reply within 2 hours</p>
            {sent ? (
              <div className={styles.sentBox}>
                <span>✅</span>
                <strong>Inquiry Submitted!</strong>
                <span>We'll call you within 2 hours.</span>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className={styles.heroForm}>
                <div className="field">
                  <label>Your Name *</label>
                  <input className="input" placeholder="Rajesh Patel" value={inquiry.name} onChange={e=>setInquiry(v=>({...v,name:e.target.value}))} required/>
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input className="input" type="tel" placeholder="+91 98XXX XXXXX" value={inquiry.phone} onChange={e=>setInquiry(v=>({...v,phone:e.target.value}))} required/>
                </div>
                <div className="field">
                  <label>I'm Interested In</label>
                  <select className="input" value={inquiry.interest} onChange={e=>setInquiry(v=>({...v,interest:e.target.value}))}>
                    <option value="buying">Buying a Car</option>
                    <option value="selling">Selling My Car</option>
                    <option value="rto">RTO Work</option>
                    <option value="rc">RC Transfer</option>
                    <option value="insurance">Insurance Assistance</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? "Submitting…" : "Submit Inquiry →"}
                </button>
              </form>
            )}
            <a href="tel:+919998887669" className={styles.callLink}>📞 Or call us directly</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[{v:500,s:"+",l:"Cars Sold"},{v:10,s:"+",l:"Years Experience"},{v:1000,s:"+",l:"RTO Works Done"},{v:95,s:"%",l:"Happy Customers"}].map(s=>(
              <div key={s.l} className={styles.statCard}>
                <span className={styles.statNum}><Counter target={s.v} suffix={s.s}/></span>
                <span className={styles.statLabel}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="section">
        <div className="container">
          <div className={styles.sHead}>
            <div>
              <span className="tag">Our Inventory</span>
              <h2 className="section-title">Featured Cars</h2>
              <p className="section-sub">Handpicked, verified vehicles ready for their new home.</p>
            </div>
            <Link to="/cars" className="btn btn-outline">View All Cars →</Link>
          </div>

          {carsLoading ? (
            /* Skeleton while cars load */
            <CarGridSkeleton count={6} />
          ) : cars.length === 0 ? (
            <p style={{color:"var(--muted)",fontSize:"13px"}}>No featured cars yet — check back soon!</p>
          ) : (
            <div className={styles.carsGrid}>
              {cars.map(car => (
                <div key={car._id} className={`card ${styles.carCard}`}>
                  <div className={styles.carImgWrap}>
                    {car.images?.[0]
                      ? <img src={car.images[0]} alt={car.title} className={styles.carImg}/>
                      : <div className={styles.carImgPlaceholder}>🚗</div>}
                    {car.isSold && <span className={`badge badge-red ${styles.soldBadge}`}>SOLD</span>}
                  </div>
                  <div className={styles.carBody}>
                    <span className={styles.carBrand}>{car.brand}</span>
                    <h3 className={styles.carTitle}>{car.title}</h3>
                    <div className={styles.carMeta}>
                      <span>📅 {car.year}</span>
                      <span>⛽ {car.fuelType}</span>
                      <span>📍 {Number(car.kmDriven).toLocaleString("en-IN")} km</span>
                    </div>
                    <div className={styles.carFooter}>
                      <span className={styles.carPrice}>{fmtPrice(car.price)}</span>
                      <Link to={`/cars/${car._id}`} className="btn btn-primary btn-sm">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className={`section ${styles.servicesBg}`}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <span className="tag">What We Offer</span>
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map(s=>(
              <div key={s.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <span className="tag">Why Trust Us</span>
            <h2 className="section-title">Why Choose <em>Shree Ganesh Motors?</em></h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map(w=>(
              <div key={w.title} className={styles.whyItem}>
                <div className={styles.whyIcon}>{w.icon}</div>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`section ${styles.testimonialsBg}`}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <span className="tag">Customer Stories</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className={styles.testiGrid}>
            {TESTIMONIALS.map(t=>(
              <div key={t.name} className={`glass-card ${styles.testiCard}`}>
                <div className={styles.stars}>★★★★★</div>
                <blockquote>"{t.text}"</blockquote>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>{t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiCity}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELL CTA ── */}
      <section className={styles.sellCta}>
        <div className="container">
          <div className={styles.sellCtaInner}>
            <div>
              <span className="tag">Sell Your Car</span>
              <h2 className="section-title">Get the Best Price<br/>for Your Car</h2>
              <p className="section-sub">Free evaluation, instant quote, and hassle-free paperwork.</p>
            </div>
            <Link to="/sell-car" className="btn btn-primary btn-lg">Sell My Car →</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
export default Home
