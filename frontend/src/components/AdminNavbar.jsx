import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./AdminNavbar.module.css"

const NAV = [
  { to:"/admin",                label:"Dashboard",     icon:"📊", end:true },
  { to:"/admin/manage-cars",    label:"Manage Cars",   icon:"🚗" },
  { to:"/admin/add-car",        label:"Add Car",       icon:"➕" },
  { to:"/admin/inquiries",      label:"Inquiries",     icon:"💬" },
  { to:"/admin/sell-requests",  label:"Sell Requests", icon:"💰" },
]

function AdminNavbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("sgm_token")
    navigate("/admin/login")
  }

  return (
    <>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.sideOpen : ""}`}>
        <div className={styles.sideTop}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="SGM" style={{width:"30px",height:"30px",objectFit:"contain",borderRadius:"50%",background:"#000",border:"1px solid var(--border)"}} />
            <div>
              <strong>Shri Ganesh Motors</strong>
              <em>Admin Panel</em>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav className={styles.nav}>
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Top bar (mobile) */}
      <header className={styles.topbar}>
        <button className={styles.burgerBtn} onClick={() => setOpen(v => !v)}>☰</button>
        <div className={styles.topTitle}>Admin Panel</div>
        <button className={styles.topLogout} onClick={handleLogout}>🚪 Logout</button>
      </header>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  )
}
export default AdminNavbar
