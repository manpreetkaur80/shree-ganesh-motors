const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Contacted",
        "Closed",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inquiry",
  inquirySchema
);