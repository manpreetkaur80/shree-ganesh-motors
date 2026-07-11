// const cloudinary = require("../config/cloudinary");

// const uploadImage = async (req, res) => {
//   try {
//     const imageUrls = [];

//     for (const file of req.files) {
//       const result = await cloudinary.uploader.upload(
//         file.path,
//         {
//           folder: "shri-ganesh-motors",
//         }
//       );

//       imageUrls.push(result.secure_url);
//     }

//     res.status(200).json({
//       imageUrls,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   uploadImage,
// };.
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder:
              "shri-ganesh-motors",
          }
        );

      imageUrls.push(
        result.secure_url
      );
    }

    res.status(200).json({
      imageUrls,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};