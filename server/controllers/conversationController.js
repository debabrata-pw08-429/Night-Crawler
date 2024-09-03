const User = require("../models/UserModel");
const AIService = require("../services/aiService");

/**
 * Handles socket communication for sending and receiving messages.
 *
 * @param {Object} io - The Socket.IO server instance.
 */
exports.sendMessage = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    /**
     * Handles user messages.
     *
     * @param {Object} data - The data object containing user details and message.
     * @param {string} data.userId - The ID of the user sending the message.
     * @param {string} data.conversationId - The ID of the conversation.
     * @param {string} data.query - The message/query from the user.
     */
    socket.on("user_message", async (data) => {
      const { userId, conversationId, query } = data;

      try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Find the conversation within the user document
        const conversation = user.conversations.id(conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        // Store the user's message
        const userMessage = { text: query, sender: "user" };
        conversation.chats.push(userMessage);
        await user.save();

        // Generate AI response
        const crawledContent = conversation.crawled_Content.content;
        const aiResponse = await AIService.getAIResponse(crawledContent, query);

        // Store the AI's response
        const botMessage = { text: aiResponse, sender: "bot" };
        conversation.chats.push(botMessage);
        await user.save();

        // Send the AI response back to the client
        socket.emit("bot_response", aiResponse);
      } catch (error) {
        console.error("Error processing message:", error.message);
        socket.emit("error", error.message);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
