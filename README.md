# 🚗 Shree Ganesh Motors — Used Car Dealership Website

A full-stack web application for **Shree Ganesh Motors**, a trusted used car dealership in Ahmedabad, Gujarat. Built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

![Shree Ganesh Motors](./frontend/public/logo.png)

---

## 🌟 Live Features

### Public Website
- 🏠 **Home Page** — Hero video background, quick inquiry form, featured cars, stats, services, testimonials
- 🚗 **Cars Listing** — Search, filter by brand/fuel, responsive grid
- 🔍 **Car Detail** — Image gallery slider, specs, WhatsApp inquiry, share button
- 💰 **Sell Your Car** — Lead capture form
- 🛠️ **Services** — Service cards, customer delivery gallery with carousel
- 📞 **Contact** — Contact form, address, Google Maps
- 🌙 **Dark / Light Mode** toggle
- ⚡ **Loading Skeletons** — Premium shimmer loading states
- 🔗 **Share Button** — WhatsApp, copy link, native mobile share
- 📄 **404 Page** — Branded not found page

### Admin Dashboard (`/admin`)
- 🔐 **JWT Secured Login**
- 📊 **Dashboard** — Stats cards, recent listings, recent inquiries, gallery management
- 🚗 **Manage Cars** — Add, edit, delete, mark sold/unsold
- ➕ **Add / Edit Car** — Cloudinary image upload (up to 10 photos), brand autocomplete
- 💬 **Inquiries** — View, update status (Pending → Contacted → Closed), WhatsApp reply
- 💰 **Sell Requests** — View customer sell requests, WhatsApp reply
- 📸 **Gallery** — Upload/delete customer delivery photos

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 + Vite | UI framework & build tool |
| React Router v6 | Client-side routing |
| Axios | API calls |
| Framer Motion | Animations |
| CSS Modules | Scoped styling |
| Context API | Theme & state management |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Admin authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image storage |
| Multer | File upload handling |
| Nodemon | Development auto-restart |

---

## 📁 Project Structure

```
shri_ganesh_2.0/
├── frontend/                    # React + Vite app
│   ├── public/
│   │   ├── logo.png             # Business logo
│   │   ├── hero-bg.mp4          # Hero video background
│   │   ├── robots.txt           # SEO
│   │   └── sitemap.xml          # SEO sitemap
│   └── src/
│       ├── admin/               # Admin panel pages
│       │   ├── AddCar.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── BrandInput.jsx   # Searchable brand dropdown
│       │   ├── EditCar.jsx
│       │   ├── Inquiries.jsx
│       │   ├── Login.jsx
│       │   ├── ManageCars.jsx
│       │   └── SellRequests.jsx
│       ├── components/
│       │   ├── ShareButton/     # Car share functionality
│       │   ├── skeleton/        # Loading skeleton components
│       │   ├── AdminNavbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── ThemeContext.jsx  # Dark/light mode
│       ├── layouts/
│       │   └── MainLayout.jsx
│       ├── pages/
│       │   ├── CarDetails.jsx
│       │   ├── Cars.jsx
│       │   ├── Contact.jsx
│       │   ├── Home.jsx
│       │   ├── NotFound.jsx     # 404 page
│       │   ├── SellCar.jsx
│       │   └── Services.jsx
│       ├── services/
│       │   └── api.js           # Axios instance with JWT
│       ├── App.jsx
│       ├── index.css            # Global styles + CSS variables
│       └── main.jsx
│
└── backend/                     # Node.js + Express API
    └── src/
        ├── config/
        │   ├── cloudinary.js    # Cloudinary config
        │   └── db.js            # MongoDB connection
        ├── controllers/
        │   ├── authController.js
        │   ├── carController.js
        │   ├── galleryController.js
        │   ├── inquiryController.js
        │   ├── sellRequestController.js
        │   └── uploadController.js
        ├── middleware/
        │   └── authMiddleware.js  # JWT verification
        ├── models/
        │   ├── Admin.js
        │   ├── Car.js
        │   ├── Gallery.js
        │   ├── Inquiry.js
        │   └── SellRequest.js
        ├── routes/
        │   ├── authRoutes.js
        │   ├── carRoutes.js
        │   ├── galleryRoutes.js
        │   ├── inquiryRoutes.js
        │   ├── sellRequestRoutes.js
        │   └── uploadRoutes.js
        ├── app.js
        ├── createAdmin.js       # One-time admin account setup
        └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (free tier)

---

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/shri-ganesh-motors.git
cd shri-ganesh-motors
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shri_ganesh_motors
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create the admin account (run only once):
```bash
node src/createAdmin.js
```

Start the backend:
```bash
# Development
npm run dev

# Production
npm start
```

Backend runs on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔐 API Endpoints

### Public Routes (no auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cars` | Get all cars |
| `GET` | `/api/cars/:id` | Get single car |
| `POST` | `/api/inquiries` | Submit inquiry |
| `POST` | `/api/sell-requests` | Submit sell request |
| `GET` | `/api/gallery` | Get gallery photos |
| `POST` | `/api/auth/login` | Admin login |

### Protected Routes (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cars` | Add new car |
| `PUT` | `/api/cars/:id` | Update car |
| `PUT` | `/api/cars/:id/sold` | Toggle sold status |
| `DELETE` | `/api/cars/:id` | Delete car |
| `GET` | `/api/inquiries` | Get all inquiries |
| `PUT` | `/api/inquiries/:id/status` | Update inquiry status |
| `GET` | `/api/sell-requests` | Get all sell requests |
| `POST` | `/api/upload` | Upload images to Cloudinary |
| `POST` | `/api/gallery` | Add gallery photo |
| `DELETE` | `/api/gallery/:id` | Delete gallery photo |

---

## 🔑 Admin Access

Navigate to `/admin/login`

Default credentials (set in `createAdmin.js`):
```
Email:    admin@gmail.com
Password: admin123
```
> ⚠️ Change the password before deploying to production!

---

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node src/server.js`
6. Add all environment variables from `.env`
7. Deploy

---

## 📞 Business Info

**Shree Ganesh Motors**
- 📍 Shop No.1, Shastri Nagar Shopping Center, Nr. Saibaba Temple, Naranpura, Ahmedabad – 380013
- 📞 +91 99988 87669
- 💬 WhatsApp: +91 98250 86109
- 🕐 Mon – Sat: 9:00 AM – 7:00 PM

---

## 📄 License

This project is private and proprietary. All rights reserved © 2024 Shree Ganesh Motors.
