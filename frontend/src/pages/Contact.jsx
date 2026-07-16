import { useState } from "react"
import axios from "axios"
import styles from "./Contact.module.css"

const API = "http://localhost:5000/api"
const WA  = "919825086109"

function Contact() {
  const [form, setForm]     = useState({ name:"", phone:"", message:"" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}/inquiries`, { name: form.name, phone: form.phone, message: form.message })
      setSent(true)
    } catch { setSent(true) }
    setLoading(false)
  }

  const INFO = [
    { icon:"📍", label:"Address",       value:"Shop No.1, Shastri Nagar Shopping Center, Nr. Saibaba Temple, Naranpura, Ahmedabad – 380013" },
    { icon:"📞", label:"Phone",         value:"+91 98250 86109", href:"tel:+919825086109" },
    { icon:"💬", label:"WhatsApp",      value:"Chat with us", href:`https://wa.me/${WA}` },
    { icon:"✉️", label:"Email",         value:"sonusingh5508@gmail.com", href:"mailto:sonusingh5508@gmail.com" },
    { icon:"🕐", label:"Working Hours", value:"Mon – Sat: 9:00 AM – 7:00 PM" },
  ]

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <span className="tag">Get In Touch</span>
          <h1 className="section-title">Visit Our <em>Showroom</em></h1>
          <p className="section-sub">We'd love to meet you. Come visit us, call us, or send a message below.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Left — Info + Map */}
          <div className={styles.left}>
            <div className={styles.infoCard}>
              {INFO.map(item => (
                <div key={item.label} className={styles.infoItem}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={styles.infoValue}>{item.value}</a>
                      : <div className={styles.infoValue}>{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className={styles.ctaBtns}>
              <a href="tel:+919825086109" className="btn btn-outline btn-full">📞 Call Now</a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn btn-green btn-full">💬 WhatsApp Us</a>
            </div>

            {/* Map placeholder */}
            <div className={styles.mapWrap}>
             {/* ?<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3670.870913036604!2d72.55000757531506!3d23.06519367914395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDAzJzU0LjciTiA3MsKwMzMnMDkuMyJF!5e0!3m2!1sen!2sin!4v1784203710075!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe> */}
         
          <iframe
  src="https://www.google.com/maps?q=23.0651937,72.5525825&z=18&output=embed"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Shree Ganesh Motors Location"
></iframe>  </div>
          </div>

          {/* Right — Contact Form */}
          <div className={styles.formCard}>
            <h3>Send a Message</h3>
            <p>We reply within 2 hours during working hours.</p>

            {sent ? (
              <div className="empty-state" style={{padding:"48px 20px"}}>
                <span className="empty-icon">✅</span>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 2 hours.</p>
                <button className="btn btn-primary" onClick={()=>setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="field">
                  <label>Your Name *</label>
                  <input className="input" name="name" placeholder="Rajesh Patel" value={form.name} onChange={handleChange} required/>
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input className="input" name="phone" type="tel" placeholder="+91 98XXX XXXXX" value={form.phone} onChange={handleChange} required/>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea className="input" name="message" placeholder="How can we help you?" value={form.message} onChange={handleChange} style={{minHeight:"120px"}}/>
                </div>
                <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact
