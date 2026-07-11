import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout        from "./layouts/MainLayout"
import Home              from "./pages/Home"
import Cars              from "./pages/Cars"
import CarDetails        from "./pages/CarDetails"
import SellCar           from "./pages/SellCar"
import Services          from "./pages/Services"
import Contact           from "./pages/Contact"
import NotFound          from "./pages/NotFound"
import Login             from "./admin/Login"
import AdminDashboard    from "./admin/AdminDashboard"
import ManageCars        from "./admin/ManageCars"
import AddCar            from "./admin/AddCar"
import EditCar           from "./admin/EditCar"
import Inquiries         from "./admin/Inquiries"
import SellRequests      from "./admin/SellRequests"
import ProtectedRoute    from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/"          element={<Home />} />
          <Route path="/cars"      element={<Cars />} />
          <Route path="/cars/:id"  element={<CarDetails />} />
          <Route path="/sell-car"  element={<SellCar />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/contact"   element={<Contact />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected admin */}
          <Route path="/admin"                  element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-cars"      element={<ProtectedRoute><ManageCars /></ProtectedRoute>} />
          <Route path="/admin/add-car"          element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/admin/edit-car/:id"     element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          <Route path="/admin/inquiries"        element={<ProtectedRoute><Inquiries /></ProtectedRoute>} />
          <Route path="/admin/sell-requests"    element={<ProtectedRoute><SellRequests /></ProtectedRoute>} />

          {/* 404 - catch all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
