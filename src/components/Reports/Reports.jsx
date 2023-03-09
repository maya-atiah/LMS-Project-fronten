import React from "react";
import "../components.css"
import Navhead from "../../components/Navhead";
import { useNavigate } from 'react-router-dom';
import { useEffect} from "react";


function Reports() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  return(
    <>
    <Navhead/>
    <div className="component-container">hasan
   
   </div></>
  )
}

export default Reports;
