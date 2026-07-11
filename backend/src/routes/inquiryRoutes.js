// const express = require("express");

// const {
//   createInquiry,
//   getAllInquiries,
//   updateInquiryStatus,
// } = require("../controllers/inquiryController");

// const router = express.Router();

// router.get("/", getAllInquiries);

// router.post("/", createInquiry);

// router.put(
//   "/:id/status",
//   updateInquiryStatus
// );

// module.exports = router;

const express = require("express");
const { createInquiry, getAllInquiries, updateInquiryStatus } = require("../controllers/inquiryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// PUBLIC - customers submit
router.post("/", createInquiry);

// PROTECTED - admin only
router.get("/",           protect, getAllInquiries);
router.put("/:id/status", protect, updateInquiryStatus);

module.exports = router;
