import { useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Settings from "./components/Settings";
import CTA from "./components/CTA";
import { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";

/**
 * Main Application Component
 * Manages the view state and renders components based on the current view.
 */
const App = () => {
  const [view, setView] = useState("new-chat"); // State to manage the current view
  const [crawledResponse, setCrawledResponse] = useState(""); // State to manage the crawled response data

  /**
   * Function to render the component based on the current view.
   * Uses a switch statement for conditional rendering.
   *
   * @returns {JSX.Element} - The component to be rendered.
   */
  const renderComponent = () => {
    switch (view) {
      case "new-chat":
        return (
          <>
            <Navbar setCrawledResponse={setCrawledResponse} />

            {!localStorage.getItem("conversationId") && <CTA />}

            <Chat crawledResponse={crawledResponse} />
          </>
        );
      case "dashboard":
        return <Dashboard />;
      case "about-us":
        return <NotFound />;
      case "settings":
        return <Settings />;
      default:
        return (
          <>
            <Navbar />
            <Chat />
          </>
        );
    }
  };

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="container-fluid">
        <Sidebar setView={setView} />
        <div className="main-component">{renderComponent()}</div>
      </div>
    </SkeletonTheme>
  );
};

export default App;
