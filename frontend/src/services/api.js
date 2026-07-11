import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({ baseURL: API_URL })

// Attach JWT token to every request automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem("sgm_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If token expired/invalid → logout and redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (
      err.response?.status === 401 &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      localStorage.removeItem("sgm_token")
      localStorage.removeItem("isAdmin")
      window.location.href = "/admin/login"
    }
    return Promise.reject(err)
  }
)

export default api
