import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

const WA = "919825086109"

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Gold top border */}
      <div className={styles.goldBar} />

      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="Shree Ganesh Motors" className={styles.logoImg} />
            <div className={styles.logoText}>
              <strong>Shree Ganesh Motors</strong>
              <em>Trusted Since 2013</em>
            </div>
          </div>
          <p>Your trusted destination for quality used cars, RTO work, and complete automobile solutions in Ahmedabad, Gujarat.</p>
          <div className={styles.socials}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className={styles.social} title="WhatsApp">💬</a>
            <a href="tel:+919876543210" className={styles.social} title="Call">📞</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <nav className={styles.colLinks}>
            {[["Home","/"],["Cars","/cars"],["Services","/services"],["Sell Car","/sell-car"],["Contact","/contact"]].map(([l,t])=>(
              <Link key={t} to={t}>{l}</Link>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 className={styles.colTitle}>Our Services</h4>
          <nav className={styles.colLinks}>
            {["Used Car Sale","Used Car Purchase","RTO Work","RC Transfer","Insurance Assistance","Auto Consultancy"].map(s=>(
              <span key={s}>{s}</span>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <div className={styles.contactList}>
            <div className={styles.cItem}><span className={styles.cIcon}>📍</span><span>Shop No.1, Shastri Nagar Shopping Center, Nr. Saibaba Temple, Naranpura, Ahmedabad – 380013</span></div>
            <div className={styles.cItem}><span className={styles.cIcon}>📞</span><a href="tel:+919825086109">+91 98250 86109</a></div>
            <div className={styles.cItem}><span className={styles.cIcon}>💬</span><a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp Us</a></div>
            <div className={styles.cItem}><span className={styles.cIcon}>🕐</span><span>Mon – Sat: 9 AM – 7 PM</span></div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span>© {new Date().getFullYear()} Shree Ganesh Motors. All rights reserved.</span>
            <span className={styles.tagline}>Your Trusted Destination for Quality Used Cars</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
