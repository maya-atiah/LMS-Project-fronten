import React from "react";
import "../components.css";
import { useState, useEffect } from "react";
import "../TeacherSide/HomeTeacher.css";
import { useNavigate } from "react-router-dom";
import stud from "../../assets/Images/student.png";
import teacher from "../../assets/Images/teacher.png";
import attend from "../../assets/Images/attandence.png";
import report from "../../assets/Images/report.png";
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherSide from "./TeacherSide";

function HomeTeacher() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }

    fetchStudents();
    fetchTeachers();
  }, [navigate]);

  const fetchStudents = () => {
    axios
      .get(
        "https://lms-backend-production-9753.up.railway.app/api/users/student"
      )
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchTeachers = () => {
    axios
      .get(
        "https://lms-backend-production-9753.up.railway.app/api/users/teacher"
      )
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => console.log(error));
  };

  const section1 = [
    {
      title: "Total Students",
      text1: students.total_students,
      img1: stud,
    },
    {
      title2: "Total Teachers",
      text2: teachers.total_teachers,
      img2: teacher,
    },
  ];

  const [section3] = useState([
    {
      img2: attend,
      img1: report,
      img3: stud,
    },
  ]);

  return (
    <div>
      <TeacherSide />
      <div className='component-container'>
        <h1 className='home'> Home </h1>

        <div className='cards'>
          <section className='home-section'>
            {section1.map((card, i) => (
              <div key={i} className='card'>
                <img src={card.img1} alt={card.title} />
                <div className='card-total-name1'>
                  <h3>{card.title} </h3>
                  <h1>{card.text1}</h1>
                </div>
                {card.img2 && <img src={card.img2} alt={card.title} />}
                <div className='card-total-name2'>
                  <h3>{card.title2} </h3>
                  <h1>{card.text2}</h1>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <section>
        <div className='component-container'>
          <div className='cards'>
            {section3.map((card, i) => (
              <div key={i} className='card3'>
                <div className='img-container'>
                  {card.img2 && <img src={card.img2} alt={card.title} />}
                  <Link to='/TeacherSide/Attendance'>
                    <button>Attendance</button>
                  </Link>
                </div>
                <div className='img-container'>
                  {card.img1 && <img src={card.img1} alt={card.title} />}
                  <Link to='/TeacherSide/Reports'>
                    <button>Reports</button>
                  </Link>
                </div>
                {/* <div className='img-container'>
                  {card.img3 && <img src={card.img3} alt={card.title} />}
                  <Link to='/Students'>
                    <button>Students</button>
                  </Link>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeTeacher;
