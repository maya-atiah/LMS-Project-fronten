import { DeleteForeverOutlined } from "@mui/icons-material";
import React from "react";
import "./TeacherCard.css";
import img from "./pfpic.png";
export const TeacherCard = (props) => {
  return (
    <div>
      <div className="cardFrameTeacher">
        <div href="#" className="deleteTeacherButtencontainer">
        <DeleteForeverOutlined/></div>
        <img src={img} alt="img" className="pfpic" />
        <div className="cardlineteachercard"></div>
        <div className="TeacherCardContent">
          <p>First Name: {props.firstName}</p>
          <p>Last Name: {props.lastName}</p>
          <p>Email: {props.email}</p>
          <p>Phone_nb: {props.phoneNumber}</p>
          <p>Course:</p>
        </div>
        <button className="editButtonTeacher">
          <b>edit</b>
        </button>
       
      </div>
    </div>
  );
};
