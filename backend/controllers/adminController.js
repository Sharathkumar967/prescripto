import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      phone,
    } = req.body;

    const imageFile = req.file;

    console.log("requesting data", req.body);
    if (
      (!name,
      !email,
      !password,
      !speciality,
      !degree,
      !experience,
      !about,
      !fees,
      !address,
      !phone,
      !imageFile)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // upload the image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error in addDoctor API: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Api for admin Login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get All Doctors api route for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find()
      .sort({ date: -1 })
      .select("-password");

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors };
