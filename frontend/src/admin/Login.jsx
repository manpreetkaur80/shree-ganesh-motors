import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./Login.module.css"

function Login() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [show,     setShow]     = useState(false)
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      const { token } = res.data

      localStorage.setItem("sgm_token", token)
      localStorage.setItem("isAdmin", "true")

      navigate("/admin")
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password. Please try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}/>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <img
            src="/logo.png"
            alt="SGM"
            style={{
              width:"56px", height:"56px",
              objectFit:"contain", borderRadius:"50%",
              border:"2px solid rgba(201,168,76,.4)"
            }}
          />
        </div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.sub}>Shree Ganesh Motors · Dealer Dashboard</p>

        {error && <div className={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="field">
            <label>Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="sonusingh5508@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <div className={styles.passWrap}>
              <input
                className="input"
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{paddingRight:"42px"}}
              />
              <button
                type="button"
                className={styles.eye}
                onClick={() => setShow(v => !v)}
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{marginTop:"8px"}}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <div className={styles.hint}>🔒 JWT Secured · Owner access only</div>
      </div>
    </div>
  )
}

export default Login
