const User = require("../models/UserModel");

/**
 * Creates a user profile with the provided details and uploads an optional profile image.
 *
 * @param {Object} req - The request object containing user details and an optional image file.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} The JSON response indicating success or failure.
 */
exports.createUserProfile = async (req, res) => {
  const { username, email } = req.body;
  const profileImage = req.file ? req.file.path : null;

  // Ensure the image file is provided
  if (!profileImage) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." });
  }

  // Construct the image URL
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    // Create a new user with the provided details
    const user = new User({
      username,
      email,
      profile_image: imageUrl, // Store the image URL in the database
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user profile:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Retrieves the profile of a user and their specific conversation details.
 *
 * @param {Object} req - The request object containing user ID and conversation ID.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} The JSON response with the conversation's chats or an error message.
 */
exports.getUserProfile = async (req, res) => {
  const { userId, conversationId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific conversation by conversationId within the user's conversations array
    const conversation = user.conversations.id(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Extract the chats from the conversation
    const chats = conversation.chats;

    // Respond with the chats
    return res.status(200).json({ chats });
  } catch (error) {
    console.error("Error retrieving user profile:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
