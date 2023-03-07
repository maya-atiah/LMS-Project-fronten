import React from 'react';
import { Component, useState , useEffect} from "react";
import "../Login/Login";
import "./Login.css"
import Home from '../Home/Home';

const LoginPage=()=>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("login successful");
        window.localStorage.setItem("token", data.token);

        window.location.href = "/Home";
        // localStorage.setItem("token", data.token); // Store token in localStorage
        // setIsLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // if (isLoggedIn) {

  //   return <Home />;
  // }

    return (
        <div className="main-container-login">
            <div className="adminlogin-box-container">
            <form onSubmit={handleLogin} >
        <h3 className="title-login">Log In</h3>

        <div>
          <label className="label-login">Email address:</label>
          <input
            className="input-login"
            type="email"
            placeholder="Enter your email" value={email} onChange={handleEmailChange}
            
          />
        </div>

        <div>
          <label className="label-login">Password:</label>
          <input
            className="input-login"
            type="password"
            placeholder="Enter your password" value={password} onChange={handlePasswordChange}
            
          />
        </div>

        <div >
          <button className="button-login" type="submit">
           Log In
          </button>
        </div>
        {/* <p className="href-login">
          <a href="/sign-up">Sign Up</a>
        </p> */}
      </form>
            </div>
        </div>
    )
}

export default LoginPage;