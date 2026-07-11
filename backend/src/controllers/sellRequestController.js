const SellRequest = require("../models/SellRequest");

const createSellRequest = async (req, res) => {
  try {
    const request = await SellRequest.create(req.body);

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllSellRequests = async (req, res) => {
  try {
    const requests = await SellRequest.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createSellRequest,
  getAllSellRequests,
};