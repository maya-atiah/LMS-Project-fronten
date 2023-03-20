import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import profile from "/home/hasan/Desktop/LMS-FRONT-FINAL/LMS-Project-frontend/src/assets/Images/logo.png";

const Error = () => {
  return (
    <div className="shadi">
      <h1>Ooops!</h1>
      <p>You don't have access to this page.</p>
      <p>Please log in to have access to the website.</p>

      <img src={profile} alt="" />
      <div className="home">
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default Error;
