import React from "react";

const NotFound = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <button className="back-home-button" onClick={handleRedirect}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
