import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith("/admin")
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [pathname])
  return (
    <>
      {!isAdmin && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}
export default MainLayout
