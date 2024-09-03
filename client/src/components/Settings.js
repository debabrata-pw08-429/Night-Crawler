import React, { useState } from "react";
import axios from "axios";

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
 * Retrieves profile data from local storage or sets default values.
 *
 * @returns {Object} - The user's profile data.
 */
const getProfileData = () => {
  return JSON.parse(localStorage.getItem("userProfile")) || {};
};

function Settings() {
  const profileData = getProfileData();
  const [name, setName] = useState(profileData.username || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  /**
   * Handles the image file upload and sets preview.
   *
   * @param {Object} e - The event object containing file data.
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file for FormData
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Display image preview
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Enables editing mode.
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Saves the updated profile data and handles redirection.
   *
   * @async
   */
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user-profile/settings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear and update local storage with new profile data
      localStorage.clear();
      localStorage.setItem("userProfile", JSON.stringify(response.data.data));
      localStorage.setItem("userId", JSON.stringify(response.data.data._id));

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="settings">
      <div className="profile-section">
        <h2>Profile Settings</h2>

        <div className="profile-section-inputs">
          <div className="profile-section-image">
            <img
              src={getProfileImage()}
              alt="Profile"
              className={profileImage ? "" : "placeholder"}
            />
          </div>

          <div className="profile-info">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={!isEditing}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={!isEditing}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleEdit} disabled={isEditing}>
            Edit
          </button>
          <button onClick={handleSave} disabled={!isEditing}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
