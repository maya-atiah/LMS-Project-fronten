import React from "react";
import "./Card.css";
import img from "./pfpic.png";
import trash from "./trash.png";
export const TeacherCard = (props) => {
  return (
    <div>
      <div className="cardFrame">
        <a href="#" className="deleteTeacherButten">
          <img src={trash} alt="" className="deleteTeacherButten"/></a>
        <img src={img} alt="img" width="90px" className="pfpic" />
        <div className="cardline"></div>
        <div className="p">
          <p>First Name: {props.firstName}</p>
          <p>Last Name: {props.lastName}</p>
          <p>Email: {props.email}</p>
          <p>Phone_nb: {props.phoneNumber}</p>
          <p>Course:</p>
        </div>
        <button className="editButton">
          <b>edit</b>
        </button>
      </div>
    </div>
  );
};
