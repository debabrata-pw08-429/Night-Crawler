const User = require("../models/UserModel");
const { extractDomain, formatDate } = require("../utils/index");

/**
 * Retrieves analytics data across all users' dashboards.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} The JSON response containing aggregated analytics data or an error message.
 */
exports.getDashboardAnalytics = async (req, res) => {
  try {
    // Fetch all users and their conversations
    const users = await User.find({}).populate("conversations.chats");

    // Initialize accumulators for the analytics data
    let totalQueries = 0;
    let websiteCrawlCounts = {};
    let chatHistoryData = [];

    users.forEach((user) => {
      user.conversations.forEach((conversation) => {
        const domain = extractDomain(conversation.website_url);

        // Accumulate website crawl counts
        websiteCrawlCounts[domain] = (websiteCrawlCounts[domain] || 0) + 1;

        // Accumulate total queries
        const queriesCount = Math.floor(conversation.chats.length / 2);
        totalQueries += queriesCount;

        // Map conversation data for chat history
        chatHistoryData.push({
          dateTime: formatDate(conversation.createdAt),
          userName: user.username,
          websiteURL: conversation.website_url,
          queries: queriesCount,
          conversationId: conversation._id,
        });
      });
    });

    // Sort the websites by crawl count in descending order
    const sortedCrawledArray = Object.entries(websiteCrawlCounts).sort(
      ([, countA], [, countB]) => countB - countA
    );

    // Prepare general data for the dashboard
    const generalData = {
      total_queries: totalQueries,
      unique_websites: Object.keys(websiteCrawlCounts).length,
      most_crawled: sortedCrawledArray[0]?.[0] || null, // Default to null if no websites
    };

    // Send response with success and aggregated analytics data
    res.status(200).json({
      success: true,
      chatHistoryData: chatHistoryData,
      generalData: generalData,
    });
  } catch (error) {
    // Log the error and send response with failure
    console.error("Error in getDashboardAnalytics:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
