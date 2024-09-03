const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Crawls the specified website URL to extract text content, images, and links.
 *
 * @param {string} website_url - The URL of the website to crawl.
 * @returns {Promise<Object>} - An object containing the text content, image sources, and links extracted from the website.
 * @throws {Error} - Throws an error if there is an issue with fetching or parsing the website content.
 */
exports.crawlWebsite = async (website_url) => {
  try {
    // Fetch the website content
    const { data } = await axios.get(website_url);

    // Load the HTML content using Cheerio
    const $ = cheerio.load(data);

    // Initialize arrays to hold extracted data
    let textContent = "";
    let images = [];
    let links = [];

    // Extract text content from all paragraph elements
    $("p").each((i, el) => {
      textContent += $(el).text() + "\n";
    });

    // Extract image sources from all img elements
    $("img").each((i, el) => {
      const imgSrc = $(el).attr("src");
      if (imgSrc) {
        images.push(imgSrc);
      }
    });

    // Extract href attributes from all anchor elements
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href) {
        links.push(href);
      }
    });

    // Return the extracted data
    return { textContent, images, links };
  } catch (error) {
    // Log and throw an error if something goes wrong
    console.error("Error crawling website:", error.message);
    throw new Error("Error crawling website");
  }
};
