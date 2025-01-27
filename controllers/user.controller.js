import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createUser = async (req, res) => {
  try {
    const { name, handle } = req.body;
    const files = req.files;
    if (!name || !handle || !files) {
      return res.status(400).json({ message: "All fields are required.",success:false });
    }
    const uploadedImages = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "social_media_app" })
      )
    );

    const imageUrls = uploadedImages.map((result) => result.secure_url);

    const newUser = await User.create({ name, handle, images: imageUrls });
    res.status(201).json({ message: "User created successfully", user: newUser, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({message:`${users.length} users found` , users, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", success: false });
  }
};
