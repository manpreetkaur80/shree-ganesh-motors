
// const express = require("express");
// const Car = require("../models/Car");

// const {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
//   markAsSold,
// } = require("../controllers/carController");

// const router = express.Router();

// router.get("/", getCars);

// router.get("/seed", async (req, res) => {
//   const car = await Car.create({
//     title: "Honda City ZX",
//     brand: "Honda",
//     model: "City",
//     year: 2022,
//     fuelType: "Petrol",
//     transmission: "Manual",
//     kmDriven: 25000,
//     price: 850000,
//     description: "Well maintained car",
//   });

//   res.json(car);
// });

// router.get("/:id", getCarById);
// router.post("/", createCar);
// router.put("/:id", updateCar);
// router.put("/:id/sold", markAsSold);
// router.delete("/:id", deleteCar);

// module.exports = router;

const express = require("express");
const { createCar, getCars, getCarById, updateCar, deleteCar, markAsSold } = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// PUBLIC
router.get("/",    getCars);
router.get("/:id", getCarById);

// PROTECTED - admin only
router.post("/",        protect, createCar);
router.put("/:id",      protect, updateCar);
router.put("/:id/sold", protect, markAsSold);
router.delete("/:id",   protect, deleteCar);

module.exports = router;
