import validator from "validator";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "enter a strong password",
      });
    }

    //hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ success: false, message: error.message });
  }
};

// api for user Login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email:", email, "password:", password);

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.json({ success: false, message: error.message });
  }
};

// api to get user profile data

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Update user data (without image)
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // If an image is provided, upload and update it
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    // Send success response
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
