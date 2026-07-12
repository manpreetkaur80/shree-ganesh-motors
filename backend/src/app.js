const express = require("express");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const app = express();
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const sellRequestRoutes = require("./routes/sellRequestRoutes");
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://shree-ganesh-motors.vercel.app"
  ],
  credentials: true
}))
app.use(express.json());

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.get("/", (req, res) => {
  res.send("Shri Ganesh Motors API Running");
});
app.use("/api/sell-requests",sellRequestRoutes);
module.exports = app;

