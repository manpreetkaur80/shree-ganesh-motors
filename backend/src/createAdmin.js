const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    await Admin.create({
      // email: "sonusingh5508@gmail.com",
      email:"admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin Created");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

createAdmin();