const Gallery = require("../models/Gallery");

const createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create(
      req.body
    );

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getGallery = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Photo deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGallery,
  getGallery,
  deleteGallery,
};