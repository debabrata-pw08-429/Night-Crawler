import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  RiDashboardHorizontalFill,
  RiChatHistoryFill,
  RiChatNewFill,
} from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";

/**
 * Sidebar component for navigating between different views.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setView - Function to set the current view.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
const Sidebar = ({ setView }) => {
  // State to manage the open/closed state of the sidebar
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the sidebar between open and closed states.
   */
  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  /**
   * Handles navigation to a specified view.
   *
   * @param {string} view - The view to navigate to.
   */
  const handleNavigation = (view) => {
    setView(view);
  };

  /**
   * Handles the creation of a new chat and reloads the page.
   */
  const handleNewChat = () => {
    localStorage.removeItem("conversationId");
    window.location.reload();
  };

  return (
    <div className={`sidebar ${isOpen ? "closed" : "open"}`}>
      {/* Toggle button for opening/closing the sidebar */}
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Sidebar content */}
      <div className={`sidebar-content ${isOpen ? "closed" : "open"}`}>
        <ul className="menu">
          <li onClick={() => handleNavigation("new-chat")}>
            <RiChatNewFill />
            <span className="menu-item" onClick={handleNewChat}>
              New Chat
            </span>
          </li>
          <li onClick={() => handleNavigation("dashboard")}>
            <RiDashboardHorizontalFill />
            <span className="menu-item">Dashboard</span>
          </li>
          <li onClick={() => handleNavigation("about-us")}>
            <RiChatHistoryFill />
            <span className="menu-item">About Us</span>
          </li>
        </ul>

        <div
          className="profile-settings"
          onClick={() => handleNavigation("settings")}
        >
          <IoSettingsSharp />
          <span className="menu-item">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
