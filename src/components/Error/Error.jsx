import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import profile from "../..//assets/Images/logo.png";

const Error = () => {
  return (
    <div className="shadi">
      <div className="eeeeeeerrorCaaaaaaard">
        <img src={profile} alt="" className="imgEroro" />
        <div>
          <h1>ERROR 404</h1>
          <h4>This page isn't found.</h4>
        </div>
        <div className="errorHomeend">
          <Link to="/Home" className="asdf"><h2>Go Home</h2> </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
