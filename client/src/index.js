import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <App />
    </SkeletonTheme>
  </React.StrictMode>
);
