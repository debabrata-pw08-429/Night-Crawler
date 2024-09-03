import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * Dashboard Component
 * Displays general statistics and chat history for the user.
 *
 * @returns {JSX.Element} - The rendered dashboard component.
 */
const Dashboard = () => {
  const [chatHistory, setChatHistory] = useState([]); // State to manage chat history
  const [generalData, setGeneralData] = useState({}); // State to manage general statistics

  /**
   * Fetches chat history and general data from the backend on component mount.
   */
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();
        setGeneralData(data.generalData || {});

        data.chatHistoryData.sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );

        setChatHistory(data.chatHistoryData || []);
      } catch (error) {
        console.error("Failed to fetch chat history:", error.message);
      }
    };

    fetchChatHistory();
  }, []);

  /**
   * Handles the action of viewing a chat.
   *
   * @param {string} userName - The name of the user whose chat is being viewed.
   */
  const handleViewChat = (userName) => {
    alert(`Viewing chat from: ${userName}`);
  };

  /**
   * Handles the action of deleting a chat.
   *
   * @param {string} userName - The name of the user whose chat is being deleted.
   */
  const handleDeleteChat = (userName) => {
    alert(`Deleting chat from: ${userName}`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>{generalData.total_queries || 0}</h3>
          <p>Total Queries</p>
        </div>
        <div className="dashboard-card">
          <h3>{generalData.unique_websites || 0}</h3>
          <p>Unique Websites Crawled</p>
        </div>
        <div className="dashboard-card">
          <h3>{generalData.most_crawled || "N/A"}</h3>
          <p>Most Crawled</p>
        </div>
      </div>
      <div className="chat-history">
        <h3>Chat History</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>User Name</th>
                <th>Website URL</th>
                <th>No. of Queries</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chatHistory.map((chat) => (
                <tr key={chat.conversationId}>
                  <td>{chat.dateTime}</td>
                  <td>{chat.userName}</td>
                  <td>{chat.websiteURL}</td>
                  <td>{chat.queries}</td>
                  <td>
                    <button
                      onClick={() => handleViewChat(chat.userName)}
                      aria-label={`View chat from ${chat.userName}`}
                    >
                      <GrView />
                    </button>
                    <button
                      onClick={() => handleDeleteChat(chat.userName)}
                      aria-label={`Delete chat from ${chat.userName}`}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
