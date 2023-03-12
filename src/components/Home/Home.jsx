import React from "react";
import "../components.css";
import { useState, useEffect } from "react";
import "./Home.css";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import stud from "../../assets/Images/student.png";
import teacher from "../../assets/Images/teacher.png";
import class2 from "../../assets/Images/class2.png";
import class1 from "../../assets/Images/class1.png";
import attend from "../../assets/Images/attandence.png";
import report from "../../assets/Images/report.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
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
      .get("http://localhost:8000/api/users/student")
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchTeachers = () => {
    axios
      .get("http://localhost:8000/api/users/teacher")
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data);
        console.log(setTeachers);
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

  const [section2] = useState([
    {
      img2: class2,
      title: "Grade:4",
      img1: class1,
      title2: "Grade:5",
      img3: class2,
      title3: "Grade:6",
    },
  ]);

  const [section3] = useState([
    {
      img2: attend,
      img1: report,
    },
  ]);

  return (
    <div>
      <Navhead />
      <section classNAme="home-section">
        <div className="component-container">
          <h1 className="home"> Home </h1>
          <div className="cards">
            {section1.map((card, i) => (
              <div key={i} className="card">
                <img src={card.img1} alt={card.title} />
                <h3>{card.title} </h3>
                <h1>{card.text1}</h1>
                {card.img2 && <img src={card.img2} alt={card.title} />}
                <h3>{card.title2} </h3>
                <h1>{card.text2}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="component-container">
          <h1 className="home"> Classes</h1>
          <div className="cards">
            {section2.map((card, i) => (
              <div key={i} className="card2">
                <img src={card.img2} alt={card.title} />
                {card.img1 && <img src={card.img1} alt={card.title} />}
                {card.img3 && <img src={card.img2} alt={card.title} />}
                <Link to="/classes">
                  <button className="btn1">View more</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="component-container">
          <div className="cards">
            {section3.map((card, i) => (
            <div key={i} className="card3">
            <div className="img-container">
              {card.img2 && <img src={card.img2} alt={card.title} />}
              <Link to="/Attendance">
                <button>Attendance</button>
              </Link>
            </div>
            <div className="img-container">
              {card.img1 && <img src={card.img1} alt={card.title} />}
              <Link to="/Reports">
                <button >Reports</button>
              </Link>
            </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
