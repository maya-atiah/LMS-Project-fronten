import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// SideBare component
import Navhead from "../../components/Navhead";
// Components related to Teacher
import { TeacherCard } from "./TeacherCard/TeacherCard";
import PopupTeacher from "./PopupTeacher/PopupTeacher";
// @mui components
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import swal from 'sweetalert';
import "./Teacher.css";
import "../components.css"


function Teachers() {
  const [teacher, setTeacher] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);
  const token = localStorage.getItem('token');
  const [name, setName] = useState("");
  const [letter, setLetter] = useState("");
  const [subject, setSubject] = useState("");



  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  // Fetching all users
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

  const config1= {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }

  const deleteTeacher = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this teacher!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:8000/api/user/${id}`, config1);
        getAllTeachers();
        swal("Poof! The teacher has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The teacher is safe!");
      }
    });
  };
  
  // Posting a function
  const addTeacher = async () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role:"teacher",
      name,
      letter,
      subject,
    };
    // const response = await axios.post("http://localhost:8000/api/user",JSON.stringify(body));

    var data = JSON.stringify(body);

    var config = {
      method: "post",
      url: "http://localhost:8000/api/user",
      headers: {
        "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,

      },
      data: data,
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        console.log("res ", JSON.stringify(response.data));
      setButtonPopup(false);

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
    swal({
      title: "Teacher added successfully!",
      icon: "success",
    });
  };

  //grades, sections  and courses
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/grade")
      .then((response) => response.json())
      .then((data) => setGrades(data))
      .catch((error) => console.log(error));
  }, []);

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/section")
      .then((response) => response.json())
      .then((data) => setLetters(data["All Sections"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const [subjectt, setSubjectt] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8000/api/course/getAll")
        .then((response) => response.json())
        .then((data) => setSubjectt(data))
        .catch((error) => console.log(error));
    }, []);

  return (
    <>
      <Navhead />

      <div className="component-container">
        <div className="allTeachersSection">
          <div className="titleTeacherAdd">
            <div className="allTeachersTitle">All Teachers</div>
            <div className="addTeacher" onClick={() => setButtonPopup(true)}>
              <div className="alignAddTeacher">
                <AddCircleIcon /> <div className="Addd">Add Teacher</div>
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
                  <div className='input'>
                    <div className='input-label-flex'>
                     
                      <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='First Name'
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className='input-label-flex'>
                      {" "}
                     
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Last Name'
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <div className='input-label-flex'>
                      {" "}
                     
                      <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='input-label-flex'>
                      {" "}
                     
                      <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='input-label-flex'>
                      {" "}
                      
                      <input
                        type='text'
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder='Phone number'
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>{" "}
                    <div className='input-label-flex'>
                      {" "}
                     
                 
                    </div>
                    <br></br>
                      <select id="grade" name="grade" onChange={(e) => setSubjectt(e.target.value)} className="my-select-student">
  <option value="">-- Select a Course --</option>
  {subjectt.map((grade) => (
    <option key={grade.id} value={grade.subject}>
      {grade.subject}
    </option>
  ))}
  </select>   

  <br></br>
<select id="grade" name="grade" onChange={(e) => setName(e.target.value)} className="my-select-student">
  <option value="">-- Select a Grade --</option>
  {grades.map((grade) => (
    <option key={grade.id} value={grade.name}>
      {grade.name}
    </option>
  ))}


</select>
<br></br>

<select  id="letter" name="letter" onChange={(e) => setLetter(e.target.value)} className="my-select-student"> 
  <option value="">-- Select a letter --</option>
  {letters.map((letter, index) => (
    <option key={index} value={letter.letter}>
      {letter.letter}
    </option>
  ))}
</select>
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
          <div className="MTeachersline"></div>
          <div className="TeacherCardsContainer">
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
