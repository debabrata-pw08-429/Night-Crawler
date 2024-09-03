import React from "react";
import Logo from "../assets/night-crawler.png";

const CTA = () => {
  return (
    <div className="cta">
      <img src={Logo} alt="" />

      <h3>Explore Any Website Instantly!</h3>

      <p>
        Submit Your Favorite Site <code>(e.g., https://www.crio.do/)</code> and
        Get AI-Powered Answers Without Even Scrolling!
      </p>
    </div>
  );
};

export default CTA;
