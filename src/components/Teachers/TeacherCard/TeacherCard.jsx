import { DeleteForeverOutlined } from "@mui/icons-material";
import "./TeacherCard.css";
import img from "./pfpic.png";
import axios from "axios";
import { useEffect, useState } from "react";

export const TeacherCard = (props) => {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    getAllTeachers();
  }, []);

  const getAllTeachers = () =>
    axios.get("http://localhost:8000/api/teacher").then((response) => {
      setTeacher(response.data.users);
      console.log(response.data.users);
    });
  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:8000/api/teacher/${id}`);
    getAllTeachers();
  };
console.log(teacher.id)
  return (
    <div>
      <div className="cardFrameTeacher">
        <button className="deleteTeacherButtencontainer" onClick={() => deleteTeacher(teacher.id)}>
          <DeleteForeverOutlined />
        </button>

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
