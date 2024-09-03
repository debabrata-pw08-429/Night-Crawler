const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true, enum: ["user", "bot"] },
});

const conversationSchema = new mongoose.Schema(
  {
    website_url: { type: String, required: true },
    crawled_Content: {
      content: { type: String },
      images: [{ type: String }],
      links: [{ type: String }],
      createdAt: { type: Date, default: Date.now },
    },
    crawled_Response: { type: String, required: false },
    chats: [chatSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: false },
  profile_image: { type: String },
  conversations: [conversationSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
