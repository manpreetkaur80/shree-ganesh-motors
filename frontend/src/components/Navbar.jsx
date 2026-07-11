import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import styles from "./Navbar.module.css"

const PHONE = "+919998887669"
const WA    = "919825086109"
const WA_MSG = encodeURIComponent("Hello! I visited your website and I'm interested. Please help me.")

const LINKS = [
  { to: "/",         label: "Home",     end: true },
  { to: "/cars",     label: "Cars" },
  { to: "/services", label: "Services" },
  { to: "/sell-car", label: "Sell Car" },
  { to: "/contact",  label: "Contact" },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const { isDark, toggle }      = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>

          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="Shri Ganesh Motors" className={styles.logoImg} />
            <span className={styles.logoText}>
              <strong>Shree Ganesh Motors</strong>
              <em>Trusted Since 2013</em>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            {LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to} end={l.end}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + Theme Toggle */}
          <div className={styles.ctas}>
            {/* Theme Toggle */}
            <button
              className={styles.themeToggle}
              onClick={toggle}
              aria-label="Toggle theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <a href={`tel:${PHONE}`} className={styles.btnCall}>
              📞 Call
            </a>
            <a
              href={`https://wa.me/${WA}?text=${WA_MSG}`}
              target="_blank" rel="noreferrer"
              className={styles.btnWa}
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <div className={styles.mobileRight}>
            <button className={styles.themeToggleMobile} onClick={toggle} aria-label="Toggle theme">
              {isDark ? "☀️" : "🌙"}
            </button>
            <button className={styles.burger} onClick={() => setOpen(v => !v)} aria-label="Menu">
              <span className={`${styles.bar} ${open ? styles.bar1open : ""}`} />
              <span className={`${styles.bar} ${open ? styles.bar2open : ""}`} />
              <span className={`${styles.bar} ${open ? styles.bar3open : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) => `${styles.drawerLink} ${isActive ? styles.drawerActive : ""}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <div className={styles.drawerCtas}>
          <a href={`tel:${PHONE}`} className={`btn btn-outline btn-sm`} style={{flex:1,justifyContent:"center"}}>📞 Call</a>
          <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
             className="btn btn-green btn-sm" style={{flex:1,justifyContent:"center"}}>💬 WhatsApp</a>
        </div>
      </div>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  )
}
export default Navbar
