// const express = require("express");

// const {
//   createGallery,
//   getGallery,
//   deleteGallery,
// } = require(
//   "../controllers/galleryController"
// );

// const router = express.Router();

// router.get("/", getGallery);

// router.post("/", createGallery);

// router.delete(
//   "/:id",
//   deleteGallery
// );

// module.exports = router;

const express = require("express");
const { createGallery, getGallery, deleteGallery } = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// PUBLIC - gallery visible to everyone
router.get("/", getGallery);

// PROTECTED - admin only
router.post("/",      protect, createGallery);
router.delete("/:id", protect, deleteGallery);

module.exports = router;
