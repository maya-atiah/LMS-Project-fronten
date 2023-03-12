import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaThLarge,
  FaBookOpen,
  FaBookReader,
  FaUserAlt,
  FaRegListAlt,
  FaRegNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/navbar.css";

const ICON_SIZE = 20;

function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const logOut = () => {
    window.location.href = "/";
    window.localStorage.clear();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={() => setVisible(!visible)}>
          <FaBars size={24} />
        </button>
      </div>
      <nav className={`nav ${visible ? "visible" : ""}`}>
        <div>
          <NavLink className="logo">
            <img src={require("../assets/Images/logo.png")} alt="logo" />
          </NavLink>
          <div className="links nav-top">
            <NavLink to="/Home" className="nav-link">
              <FaHome size={ICON_SIZE} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/Classes" className="nav-link">
              <FaThLarge size={ICON_SIZE} />
              <span>Classes</span>
            </NavLink>
            <NavLink to="/Courses" className="nav-link">
              <FaBookOpen size={ICON_SIZE} />
              <span>Courses </span>
            </NavLink>
            <NavLink to="/Teachers" className="nav-link">
              <FaUserAlt size={ICON_SIZE} />
              <span>Teachers</span>
            </NavLink>
            <NavLink to="/Students" className="nav-link">
              <FaBookReader size={ICON_SIZE} />
              <span>Students</span>
            </NavLink>
            <NavLink to="/Attendance" className="nav-link">
              <FaRegListAlt size={ICON_SIZE} />
              <span>Attendance</span>
            </NavLink>
            <NavLink to="/Reports" className="nav-link">
              <FaRegNewspaper size={ICON_SIZE} />
              <span>Reports</span>
            </NavLink>
          </div>
        </div>

        <div className="links">
          <NavLink to="/" className="nav-link">
            <FaSignOutAlt size={ICON_SIZE} />
            <span onClick={logOut}>Logout</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
