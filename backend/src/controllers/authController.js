// const Admin = require("../models/Admin");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const loginAdmin = async (req, res) => {
// try {
// const { email, password } = req.body;

// ```
// const admin = await Admin.findOne({
//   email,
// });

// if (!admin) {
//   return res.status(401).json({
//     message: "Invalid Credentials",
//   });
// }

// const isMatch = await bcrypt.compare(
//   password,
//   admin.password
// );

// if (!isMatch) {
//   return res.status(401).json({
//     message: "Invalid Credentials",
//   });
// }

// const token = jwt.sign(
//   {
//     id: admin._id,
//   },
//   process.env.JWT_SECRET,
//   {
//     expiresIn: "7d",
//   }
// );

// res.status(200).json({
//   token,
// });
// ```

// // } catch (error) {
// // res.status(500).json({
// // message: error.message,
// // });
// // }
// } catch (error) {
//   console.error("LOGIN ERROR:", error);
//   res.status(500).json({ message: error.message });
// }
// };

// module.exports = {
// loginAdmin,
// };
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin };
