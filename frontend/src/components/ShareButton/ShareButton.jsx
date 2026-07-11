import { useState, useRef, useEffect } from "react"
import styles from "./ShareButton.module.css"

export default function ShareButton({ title, price, url }) {
  const [open,   setOpen]   = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const shareUrl = url || window.location.href
  const shareText = `🚗 Check out this car: ${title} — ${price}\n${shareUrl}`

  // WhatsApp share
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
    setOpen(false)
  }

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea")
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setOpen(false)
  }

  // Native mobile share (works on Android/iOS)
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl })
      } catch { /* user cancelled */ }
    }
    setOpen(false)
  }

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share

  return (
    <div className={styles.wrap} ref={ref}>
      {/* Main share button */}
      <button
        className={styles.btn}
        onClick={() => setOpen(v => !v)}
        title="Share this car"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Share
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropTitle}>Share this car</div>

          {/* WhatsApp */}
          <button className={styles.dropItem} onClick={shareWhatsApp}>
            <span className={styles.dropIcon} style={{background:"rgba(37,211,102,.15)",color:"#25D366"}}>💬</span>
            <div>
              <div className={styles.dropLabel}>WhatsApp</div>
              <div className={styles.dropSub}>Share with contacts</div>
            </div>
          </button>

          {/* Native Share (mobile) */}
          {hasNativeShare && (
            <button className={styles.dropItem} onClick={nativeShare}>
              <span className={styles.dropIcon} style={{background:"rgba(59,130,246,.15)",color:"#60a5fa"}}>📤</span>
              <div>
                <div className={styles.dropLabel}>More Options</div>
                <div className={styles.dropSub}>Instagram, Gmail, SMS…</div>
              </div>
            </button>
          )}

          {/* Copy Link */}
          <button className={styles.dropItem} onClick={copyLink}>
            <span className={styles.dropIcon} style={{background:"rgba(201,168,76,.15)",color:"var(--gold)"}}>
              {copied ? "✅" : "🔗"}
            </span>
            <div>
              <div className={styles.dropLabel}>{copied ? "Copied!" : "Copy Link"}</div>
              <div className={styles.dropSub}>{copied ? "Link copied to clipboard" : "Copy page URL"}</div>
            </div>
          </button>
        </div>
      )}

      {/* Copied toast */}
      {copied && (
        <div className={styles.toast}>✅ Link copied!</div>
      )}
    </div>
  )
}
