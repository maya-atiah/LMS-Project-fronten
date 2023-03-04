import React from "react";
import "./Card.css";
import img from "../pfpic.png";
export const TeacherCard = (props) => {
  return (
    <div>
      <div className="cardFrame">
        <a href="#" className="deleteTeacherButten">X</a>
        <img src={img} alt="img" width="80px" />
        <div className="cardline"></div>
        <div className="p">
          <p>First Name: {props.firstName}</p>
          <p>Last Name: {props.lastName}</p>
          <p>Email: {props.email}</p>
          <p>Phone_nb: {props.phoneNumber}</p>
          <p>Course:</p>
        </div>
        <button className="editButton">edit</button>
      </div>
    </div>
  );
};
