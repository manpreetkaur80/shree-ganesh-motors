// const express = require("express");
// const multer = require("multer");

// const {
//   uploadImage,
// } = require("../controllers/uploadController");

// const router = express.Router();

// const upload = multer({
//   dest: "uploads/",
// });

// router.post(
//   "/",
//   upload.array("images", 20),
//   uploadImage
// );

// module.exports = router;

const express = require("express");
const multer  = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// PROTECTED - only admin can upload
router.post("/", protect, upload.array("images", 20), uploadImage);

module.exports = router;
