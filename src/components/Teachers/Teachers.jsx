import { React } from "react";
import {TeacherCard} from "./TeacherCard/TeacherCard"
import "./Teacher.css";
import axios from "axios";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopupTeacher from "./PopupTeacher";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function Teachers() {
  const [teacher, setTeacher] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
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
    await axios.delete(`http://localhost:8000/api/user/${id}`);
    getAllTeachers();
  };

  const addTeacher = async () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    };
    // const response = await axios.post("http://localhost:8000/api/user",JSON.stringify(body));

    var data = JSON.stringify(body);

    var config = {
      method: "post",
      url: "http://localhost:8000/api/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("res ", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    setButtonPopup(false);
  };

  useEffect(() => {
    getAllTeachers();
  }, [buttonPopup]);
  const submitHandler = (e) => {
    e.preventDefault();
    addTeacher();
    // setButtonPopup(false);
  };

  return (
    <>
      <Navhead />

      <div className="Teachercontainer">
        <div className="allTeachersSection">
          <div className="titleTeacherAdd" onClick={() => setButtonPopup(true)}>
            <h3 className="allTeachersTitle">All Teachers</h3>
            <div className="addTeacher">
              <div className="alignAddTeacher">
                <AddCircleIcon /> <h3>Add Teacher</h3>
              </div>

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
                    Add Teacher
                  </Typography>
                  <div className="input">
                    <div className="input-label-flex">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className="input-label-flex">
                      {" "}
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <div className="input-label-flex">
                      {" "}
                      <label htmlFor="Email">Email</label>
                      <input
                        type="mail"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-label-flex">
                      {" "}
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="input-label-flex">
                      {" "}
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>{" "}
                    <div className="input-label-flex">
                      {" "}
                      <label htmlFor="role">role</label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  </div>

                  {!isPending && (
                    <button className="btn-add-teacher" onClick={submitHandler}>
                      add
                    </button>
                  )}
                  {isPending && (
                    <button className="btn-add-teacher" onClick={submitHandler}>
                      adding course
                    </button>
                  )}
                </Box>
              </PopupTeacher>
            </div>
          </div>
          <div className="Teachersline"></div>
          <div className="teacherCardsContainer">
            {teacher.map((each, key) => (
              <TeacherCard
                key={key}
                teacher={each}
                deleteTeacher={deleteTeacher}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="Teachercontainer"></div>
    </>
  );
}

export default Teachers;
