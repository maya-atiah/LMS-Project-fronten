import React from "react";
import { useState } from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar";
import Calender from "./Calender/Calender";

const Navhead=()=>{
    const [navVisible, showNavbar] = useState(false);
  return (
<div>
         <Navbar visible={navVisible} show={showNavbar} />
         <Header />  
         {/* <Calender /> */}
</div>

  )
}
export default Navhead;