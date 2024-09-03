import React, { useState } from "react";
import Logo from "../assets/night-crawler.png";

/**
 * Default profile image URL if no user profile image is available.
 */
const DEFAULT_PROFILE_IMAGE_URL =
  "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

/**
 * Retrieves the user's profile image from local storage or uses a default image.
 *
 * @returns {string} - The URL of the profile image.
 */
const getProfileImage = () => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  return userProfile?.profile_image || DEFAULT_PROFILE_IMAGE_URL;
};

/**
 * Navbar Component
 * Displays the navigation bar with a logo, website URL input, and user profile image.
 *
 * @param {Function} setCrawledResponse - Function to set the crawled response in parent component.
 * @returns {JSX.Element} - The rendered Navbar component.
 */
const Navbar = ({ setCrawledResponse }) => {
  const [url, setUrl] = useState("");

  /**
   * Updates local storage and sets the crawled response in the parent component.
   *
   * @param {Object} data - Data received from the backend containing AI chat response, user ID, and conversation ID.
   */
  const handleLocalStorage = (data) => {
    const { aiChatResponse, userId, conversationId } = data;
    localStorage.setItem("userId", JSON.stringify(userId));
    localStorage.setItem("conversationId", JSON.stringify(conversationId));
    setCrawledResponse(aiChatResponse.text);
  };

  /**
   * Handles the website crawling process by sending a request to the backend.
   *
   * @async
   */
  const handleCrawl = async () => {
    localStorage.removeItem("conversationId");
    const userId = JSON.parse(localStorage.getItem("userId"));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/crawl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ website_url: url, userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend.");
      }

      const data = await response.json();
      handleLocalStorage(data);
      // Reload the page to reflect changes (consider updating the UI dynamically instead)
      window.location.reload();
    } catch (error) {
      console.error("Error during website crawl:", error.message);
    }
  };

  return (
    <nav>
      <div>
        <div>
          <img src={Logo} alt="NightCrawler Logo" />
        </div>
        <div>NightCrawler</div>
      </div>
      <div className="website-selection">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
        />
        <button onClick={handleCrawl}>Crawl</button>
      </div>
      <div>
        <img src={getProfileImage()} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
