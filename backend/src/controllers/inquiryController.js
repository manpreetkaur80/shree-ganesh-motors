const Inquiry = require("../models/Inquiry");

const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(
      req.body
    );

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllInquiries = async (
  req,
  res
) => {
  try {
    const inquiries =
      await Inquiry.find();

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateInquiryStatus =
  async (req, res) => {
    try {
      const inquiry =
        await Inquiry.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      if (!inquiry) {
        return res.status(404).json({
          message: "Inquiry not found",
        });
      }

      res.status(200).json(inquiry);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
};