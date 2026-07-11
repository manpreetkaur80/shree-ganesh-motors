// const express = require("express");

// const {
//   createSellRequest,
//   getAllSellRequests,
// } = require("../controllers/sellRequestController");

// const router = express.Router();

// router.get("/", getAllSellRequests);

// router.post("/", createSellRequest);

// module.exports = router;

const express = require("express");
const { createSellRequest, getAllSellRequests } = require("../controllers/sellRequestController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// PUBLIC - customers submit
router.post("/", createSellRequest);

// PROTECTED - admin only
router.get("/", protect, getAllSellRequests);

module.exports = router;
