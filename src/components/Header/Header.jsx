import React from "react";
import "./Header.css";
import Profile from '../../assets/Images/Option-A.jpg'
function Header() {
  return (
    <div className="header-container ">
     <img className="header-image" src={Profile}/>
    </div>
  );
}

export default Header;
