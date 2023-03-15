import React, { useState } from "react";
import Header from "../Header/Header";
import Calender from "../Calender/Calender";
import NavbarTeacher from "./NavbarTeacher";


const TeacherSide =()=>{

    const [navVisible, showNavbar] = useState(false);
    return (
        <div>
            <NavbarTeacher visible={navVisible} show={showNavbar} />
         <Header/>  
         <Calender /> 
        </div>
    )
}


export default TeacherSide;