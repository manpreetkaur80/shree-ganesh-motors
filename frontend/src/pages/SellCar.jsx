import { useState } from "react"
import axios from "axios"
import styles from "./SellCar.module.css"

const API = "http://localhost:5000/api"

function SellCar() {
  const [formData, setFormData] = useState({ name:"", phone:"", brand:"", model:"", year:"", expectedPrice:"", description:"" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}/sell-requests`, formData)
      setSent(true)
    } catch { setSent(true) }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <span className="tag">Sell Your Car</span>
          <h1 className="section-title">Get the Best Price<br/>for <em>Your Car</em></h1>
          <p className="section-sub">Free evaluation · Instant quote · Zero hassle · Quick payment</p>
          <div className={styles.steps}>
            {[["📸","Share Details"],["📞","We Call You"],["🔍","Inspection"],["💰","Get Paid"]].map(([icon,label],i)=>(
              <div key={label} className={styles.step}>
                <span className={styles.stepIcon}>{icon}</span>
                <span className={styles.stepLabel}>{label}</span>
                {i < 3 && <span className={styles.stepArrow}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.formCard}>
            {sent ? (
              <div className="empty-state" style={{padding:"60px 20px"}}>
                <span className="empty-icon">✅</span>
                <h3>Request Submitted!</h3>
                <p>We'll contact you within 2 hours with a free evaluation.</p>
                <button className="btn btn-primary" onClick={()=>setSent(false)}>Submit Another</button>
              </div>
            ) : (
              <>
                <h3>Your Details</h3>
                <p>We'll contact you within 2 hours for a free evaluation</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row2}>
                    <div className="field"><label>Full Name *</label><input className="input" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required/></div>
                    <div className="field"><label>Phone Number *</label><input className="input" name="phone" type="tel" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleChange} required/></div>
                  </div>
                  <div className={styles.divLabel}>Car Details</div>
                  <div className={styles.row2}>
                    <div className="field"><label>Car Brand *</label>
                      <select className="input" name="brand" value={formData.brand} onChange={handleChange} required>
                        <option value="">Select Brand</option>
                        {["Maruti Suzuki","Hyundai","Honda","Toyota","Tata","Mahindra","Ford","Kia","MG","Other"].map(b=><option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="field"><label>Car Model *</label><input className="input" name="model" placeholder="e.g. Swift, Creta, City" value={formData.model} onChange={handleChange} required/></div>
                  </div>
                  <div className={styles.row2}>
                    <div className="field"><label>Manufacturing Year *</label>
                      <select className="input" name="year" value={formData.year} onChange={handleChange} required>
                        <option value="">Select Year</option>
                        {Array.from({length:20},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className="field"><label>Expected Price (₹) *</label><input className="input" name="expectedPrice" type="number" placeholder="e.g. 500000" value={formData.expectedPrice} onChange={handleChange} required/></div>
                  </div>
                  <div className="field"><label>Additional Details</label><textarea className="input" name="description" placeholder="Condition, KM driven, any modifications, accident history…" value={formData.description} onChange={handleChange}/></div>
                  <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>{loading?"Submitting…":"Submit Sell Request →"}</button>
                </form>
              </>
            )}
          </div>

          {/* Why sell with us */}
          <div className={styles.sidebar}>
            <h4>Why Sell With Us?</h4>
            <div className={styles.reasons}>
              {[
                {icon:"💰",title:"Best Market Price",desc:"We offer the best price based on current market rates."},
                {icon:"⚡",title:"Fast Process",desc:"Get an offer within 24 hours of inspection."},
                {icon:"📑",title:"We Handle Paperwork",desc:"Complete RC transfer and documentation handled by us."},
                {icon:"🤝",title:"Trusted Dealer",desc:"10+ years in business, 500+ satisfied sellers."},
              ].map(r=>(
                <div key={r.title} className={styles.reason}>
                  <span className={styles.reasonIcon}>{r.icon}</span>
                  <div><strong>{r.title}</strong><p>{r.desc}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.contactBox}>
              <p>Prefer to call directly?</p>
              <a href="tel:+919998887669" className="btn btn-outline btn-full">📞 Call Now</a>
              <a href="https://wa.me/919825086109" target="_blank" rel="noreferrer" className="btn btn-green btn-full">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SellCar
