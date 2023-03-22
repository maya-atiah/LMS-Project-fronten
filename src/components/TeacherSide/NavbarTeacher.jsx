import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaRegListAlt,
  FaRegNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../../style/navbar.css";
import logo from '../../assets/Images/logo.png';

const ICON_SIZE = 20;

function NavbarTeacher() {
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
      <div className='mobile-nav'>
        <button className='mobile-nav-btn' onClick={() => setVisible(!visible)}>
          <FaBars size={24} />
        </button>
      </div>
      <nav className={`nav ${visible ? "visible" : ""}`}>
        <div>
          <NavLink className='logo'>
            <img src={logo} alt='logo' />
          </NavLink>
          <div className='links nav-top'>
            <NavLink to='/TeacherSide/Home' className='nav-link'>
              <FaHome size={ICON_SIZE} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to='/TeacherSide/Attendance' className='nav-link'>
              <FaRegListAlt size={ICON_SIZE} />
              <span>Attendance</span>
            </NavLink>
            <NavLink to='/TeacherSide/Reports' className='nav-link'>
              <FaRegNewspaper size={ICON_SIZE} />
              <span>Reports</span>
            </NavLink>
          </div>
        </div>

        <div className='links'>
          <NavLink to='/' className='nav-link'>
            <FaSignOutAlt size={ICON_SIZE} />
            <span onClick={logOut}>Logout</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default NavbarTeacher;
