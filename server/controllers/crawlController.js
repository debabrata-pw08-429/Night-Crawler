const CrawlService = require("../services/crawlService");
const User = require("../models/UserModel");
const { extractDomain } = require("../utils/index");

/**
 * Handles the crawling of a website and updates or creates a user with the crawled data.
 *
 * @param {Object} req - The request object containing the website URL and user ID.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} The JSON response indicating success or failure.
 */
exports.crawlWebsite = async (req, res) => {
  const { website_url, userId } = req.body;

  try {
    // Find the user by ID or create a new guest user if not found
    let user = await User.findById(userId);

    if (!user) {
      // Create a new guest user if no user is found
      user = new User({
        username: "Guest User",
        email: `guest_${Date.now()}@example.com`, // Generate a unique guest email
        profile_image: "", // Optional: Set a default profile image or leave empty
        conversations: [], // Initialize with an empty conversations array
      });
    }

    // Crawl the website if not already done
    const crawledData = await CrawlService.crawlWebsite(website_url);

    // Structure the crawled content
    const crawledContent = {
      content: crawledData.textContent,
      images: crawledData.images,
      links: crawledData.links,
    };

    // Create an AI chat response with the result of the crawl
    const aiChatResponse = {
      text: `The website ${extractDomain(
        website_url
      )} has been successfully crawled. Feel free to ask me anything about the website.`,
      sender: "bot",
    };

    // Define a new conversation with the crawled content and initial AI response
    const newConversation = {
      website_url: website_url,
      crawled_Content: crawledContent,
      chats: [aiChatResponse], // Start with the AI response in the chats array
    };

    // Add the new conversation to the user's conversations
    user.conversations.push(newConversation);

    // Save the user document (either newly created or existing)
    await user.save();

    // Respond with success and the newly created conversation details
    return res.status(200).json({
      success: true,
      aiChatResponse: aiChatResponse,
      userId: user._id,
      conversationId: user.conversations[user.conversations.length - 1]._id,
    });
  } catch (error) {
    // Handle errors and respond with failure
    return res.status(500).json({ success: false, message: error.message });
  }
};
