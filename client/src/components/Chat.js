import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import userProfileImg from "../assets/user-profile.jpg";
import chatBotProfileImg from "../assets/night-crawler.png";

// Initialize socket connection
const socket = io(process.env.REACT_APP_BACKEND_URL);

/**
 * Chat Component
 * Handles the display and interaction of the chat interface.
 *
 * @param {Object} props - Component props.
 * @param {string} props.crawledResponse - Response from the backend for display.
 * @returns {JSX.Element} - The rendered chat component.
 */
const Chat = ({ crawledResponse }) => {
  const [messages, setMessages] = useState([]); // State to manage the chat messages
  const [input, setInput] = useState(""); // State to manage the current input
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom of the messages

  /**
   * Fetches chat history from the backend on component mount.
   */
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const conversationId = JSON.parse(
          localStorage.getItem("conversationId")
        );

        if (userId && conversationId) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user-profile`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId, conversationId }),
            }
          );

          const data = await response.json();
          setMessages(data.chats || []);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error.message);
      }
    };

    fetchChats();
  }, []);

  /**
   * Scrolls to the bottom of the messages container when messages are updated.
   * Listens for bot responses from the backend and updates the chat.
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Listen for bot responses from the backend
    socket.on("bot_response", (botMessage) => {
      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    });

    // Cleanup the socket connection on unmount
    return () => {
      socket.off("bot_response");
    };
  }, [messages]);

  /**
   * Handles the submission of a new message.
   * Sends the user message to the backend and clears the input field.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
   */
  const sendMessage = (e) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);

      const userId = JSON.parse(localStorage.getItem("userId"));
      const conversationId = JSON.parse(localStorage.getItem("conversationId"));

      if (userId && conversationId) {
        // Emit user message to the backend
        socket.emit("user_message", {
          query: input,
          userId,
          conversationId,
        });
      }

      setInput(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="chat-component">
      <div className="messages-container">
        {crawledResponse && crawledResponse.length > 1 && (
          <div className="message-container bot">
            <img
              src={chatBotProfileImg}
              alt="Bot Profile"
              className="profile-image"
            />
            <div className="message bot">{crawledResponse}</div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <img
              src={
                message.sender === "user" ? userProfileImg : chatBotProfileImg
              }
              alt={`${message.sender} Profile`}
              className="profile-image"
            />
            <div className={`message ${message.sender}`}>{message.text}</div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          aria-label="Message input"
        />
        <button type="submit" aria-label="Send message">
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default Chat;
