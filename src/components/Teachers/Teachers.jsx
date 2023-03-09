import { React } from "react";
import { useState, useEffect } from "react";
import "./Teacher.css";
import axios from "axios";
import { TeacherCard } from "./TeacherCard/TeacherCard.jsx";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";


function Teachers() {
  const [teacher, setTeacher] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
 


  const getAllTeachers = () =>
    axios
      .get("http://localhost:8000/api/teacher")
      .then((response) => {
        setTeacher(response.data.users);
        console.log(response.data.users);
      })
      .catch((error) => console.error(`Error : {${error}`));
  const teacherCard = teacher.map((object) => {
    return (
      <TeacherCard
        key={object.id}
        firstName={object.firstName}
        lastName={object.lastName}
        email={object.email}
        phoneNumber={object.phoneNumber}
      />
    );
  });
  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:8000/api/teacher/${id}`);
   getAllTeachers();
 };
  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <>
      <Navhead />

      <div className='Teachercontainer'>
        <div className='allTeachersSection'>
          <p className='allTeachersTitle'>All Teachers</p>
          <div className='Teachersline'></div>
          <div className='teacherCardsContainer'>{teacherCard}</div>
        </div>
      </div>
    </>
  );



}

export default Teachers;
