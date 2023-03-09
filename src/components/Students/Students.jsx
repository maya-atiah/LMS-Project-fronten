import { React } from "react";
import { useState, useEffect } from "react";

import axios from "axios";
// import { TeacherCard } from "./TeacherCard/TeacherCard.jsx";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";


function Students() {


  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
 


 

  return (
    <>
      <Navhead />

   
    </>
  );



}

export default Students;
