import React from "react";
import { useState } from "react";
import "../Login/Login";
import "./Login.css";
import swal from "sweetalert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("https://lms-backend-production-9753.up.railway.app/api/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       swal({
  //         title: "Login successful",
  //         icon: "success",

  //       }).then(() => {
  // window.localStorage.setItem("token", data.token);
  //         window.location.href = "/Home";
  //         if(response.data.role=="teacher"){
  //           window.localStorage.setItem("token", data.token);
  //           window.location.href="/Attendance";
  //         }

  //         else if(response.data.role=="super admin"){
  //           window.localStorage.setItem("token", data.token);
  //           window.location.href = "/Home"
  //         }
  //       });

  //     } else {
  //       swal({
  //         title: "Login failed",
  //         text: data.message,
  //         icon: "error",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://lms-backend-production-9753.up.railway.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        swal({
          title: "Login successful",
          icon: "success",
        }).then(() => {
          window.localStorage.setItem("token", data.token);
          if (data.role === "teacher") {
            window.location.href = "/TeacherSide/Home";
          } else if (data.role === "super admin") {
            window.location.href = "/Home";
          } else {
          }
        });
      } else {
        swal({
          title: "Login failed",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-container-login'>
      <div className='adminlogin-box-container'>
        <form onSubmit={handleLogin}>
          <h3 className='title-login'>Log In</h3>

          <div>
            <label className='label-login'>Email address:</label>
            <input
              className='input-login'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div>
            <label className='label-login'>Password:</label>
            <input
              className='input-login'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <button className='button-login' type='submit'>
              Log In
            </button>
          </div>
          {/* <p className="href-login">
          <a href="/sign-up">Sign Up</a>
        </p> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
