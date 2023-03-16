import {DeleteForeverRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import PopupTeacher from "../PopupTeacher/PopupTeacher";

import "./TeacherCard.css";
import img from "./pfpic.png";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import swal from 'sweetalert';

export const TeacherCard = ({
  teacher,
  deleteTeacher,
  getAllTeachers,
  
}) => {
  const handleUpdate = () => {
    setButtonPopup(true);
  };

  const token = localStorage.getItem('token');
  const config= {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }
  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);

  const submithandler = (e) => {
    e.preventDefault();
    setIsPending(true);
    const updateTeacher = {
      id: teacher.id,
      firstName: firstName || teacher.firstName,
      lastName: lastName || teacher.lastName,
      email: email || teacher.email,
      phoneNumber: phoneNumber || teacher.phoneNumber,
    };
    axios
      .put(
        `http://localhost:8000/api/user/${teacher.id}`,
        updateTeacher,
        config
      )
      .then(() => {
        setIsPending(false);
        setButtonPopup(false);
        getAllTeachers();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
      setTimeout(() => {
        setIsPending(false);
        window.location.reload(); // reload the page
      }, 100);
  };

 
  //   const reload = () => {
  //   window.location.reload();
  // };
  return (
    <div>
      <div className="cardFrameTeacher">
        <button
          className="deleteTeacherButtencontainer"
          onClick={() => deleteTeacher(teacher.id)}
        >
          <DeleteForeverRounded />
        </button>
        <img src={img} alt="img" className="pfpic" />
        <div className="cardlineteachercard"></div>
        <div className="TeacherCardContent">
          <p>
            <strong>First Name:</strong>
            {teacher.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {teacher.lastName}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {teacher.phoneNumber}
          </p>
        </div>
        <div className="editButtonTeacher">
          <button className="editButtonTeacher2" onClick={handleUpdate}>
            Edit
          </button>
          <PopupTeacher
            trigger={buttonPopup}
            setTrigger={() => setButtonPopup(false)}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography
                gutterBottom
                color="white"
                variant="h4"
                component="div"
              >
                Update
              </Typography>
              <input
                className="input-label-flex"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
              />

              <input
                className="input-label-flex"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
              <input
                className="input-label-flex"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-label-flex"
                type="text"
                id="phoneNumber"
                name="phonenumber"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {!isPending && (
                <button className="btn-add-teacher" onClick={submithandler}>
                  Edit
                </button>
              )}
              {isPending && (
                <button className="btn-add-teacher" onClick={submithandler}>
                  Editing...
                </button>
              )}
            </Box>
          </PopupTeacher>
        </div>{" "}
      </div>
    </div>
  );
};
