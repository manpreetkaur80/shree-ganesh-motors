const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    kmDriven: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    isSold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);