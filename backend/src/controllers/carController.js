
const Car = require("../models/Car");

const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(
      req.params.id
    );

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const markAsSold = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    car.isSold = true;

    const updatedCar = await car.save();

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  markAsSold,
};