import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./NotFound.module.css"

export default function NotFound() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow */}
      <div className={styles.glow} />

      <div className={styles.content}>
        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="Shree Ganesh Motors"
          className={styles.logo}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        {/* 404 number */}
        <motion.div
          className={styles.number}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404
        </motion.div>

        {/* Gold divider */}
        <div className={styles.divider} />

        {/* Message */}
        <motion.h1
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let us help you find what you need.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className={styles.btns}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/" className={styles.btnPrimary}>
            🏠 Go to Home
          </Link>
          <Link to="/cars" className={styles.btnOutline}>
            🚗 Browse Cars
          </Link>
          <a
            href="https://wa.me/919825086109"
            target="_blank"
            rel="noreferrer"
            className={styles.btnWa}
          >
            💬 WhatsApp Us
          </a>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className={styles.quickLinks}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span>Quick links:</span>
          <Link to="/sell-car">Sell Car</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
