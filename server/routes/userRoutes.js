const express = require("express");
const multer = require("multer");
const {
  createUserProfile,
  getUserProfile,
} = require("../controllers/userController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  // Set the destination for file uploads
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Set the filename for the uploaded file
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

// Route to get user profile based on user ID and conversation ID
router.post("/user-profile", getUserProfile);

// Route to create or update user profile, including profile image upload
router.post(
  "/user-profile/settings",
  upload.single("profile_image"), // Middleware to handle single file upload
  createUserProfile
);

module.exports = router;
