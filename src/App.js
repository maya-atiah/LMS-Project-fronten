import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Classes from "./components/Classes/classes";
import Courses from "./components/Courses/Courses";
import Teachers from "./components/Teachers/Teachers";
import Attendance from "./components/Attendance/Attendance";
import Reports from "./components/Reports/Reports";
import Header from "./components/Header/Header";
import Calender from "./components/Calender/Calender";
import "./style/index.css";
import LoginPage from "./components/Login/Login";

function App() {

  // const [navVisible, showNavbar] = useState(false);

  return (

   
    <BrowserRouter>
      <div className="App">
        {/* <Navbar visible={navVisible} show={showNavbar} /> */}
         {/* <Header />   */}
         {/* <Calender /> */}
         {/* <Home/> */}
        <Routes>
        <Route path="/" element={ <LoginPage/>} />
       
          <Route path="/Home" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Teachers" element={<Teachers />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Reports" element={<Reports />} />
        </Routes> 
       
      </div>
    </BrowserRouter>
  );
}

export default App;
