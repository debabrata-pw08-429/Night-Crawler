const { model } = require("../config/geminiAI");

/**
 * Generates a response from the AI model based on the crawled content and user query.
 *
 * @param {string} crawledContent - The content of the crawled website.
 * @param {string} userQuery - The user's query to be answered by the AI.
 * @returns {Promise<string>} - The AI-generated response.
 * @throws {Error} - Throws an error if crawledContent is missing or if there is an issue with generating the response.
 */
exports.getAIResponse = async (crawledContent, userQuery) => {
  try {
    // Check if crawledContent is provided
    if (!crawledContent) {
      throw new Error("Crawled data not found for the given URL.");
    }

    // Create the prompt for the AI model
    const prompt = `
      The following is the content of the website:
      ${crawledContent}

      Respond to the user's query based on the website content. Please format the response properly for the User:
      Query: ${userQuery}
    `;

    // Integrate with Gemini AI model to generate content
    const result = await model.generateContent(prompt);

    // Retrieve the response from the AI model
    const response = await result.response;
    const text = await response.text();

    // Return the AI-generated text
    return text;
  } catch (error) {
    // Log and rethrow the error
    console.error("Error processing query:", error.message);
    throw error;
  }
};
