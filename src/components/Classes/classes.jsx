import React from "react";
import "../components.css";
import "../../style/index.css"
import Navhead from "../../components/Navhead";
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";

function Classes() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')&& window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  return(
   
   <div >
       <Navhead/>

  </div>
  )
}

export default Classes;
