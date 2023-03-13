import { React } from "react";
import "../components.css";
import {StudentCard} from "./StudentCard"
import "../../components/Students/Students.css"
import axios from "axios";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopupStudent from "./PopupStudent.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-multilevel-dropdown";


function Students() {
  const [student, setStudent] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  

  //////////////////////////////////////////////////////////
  const [table, setTable] = useState(false);
  const [gradeId, setGradeId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [title,setTitle]=useState('');
  const [gradeSection, setGradeSection] = useState([]);
 //////////////////////////////////////////////////////////


  const token = localStorage.getItem('token');
  const [name, setName] = useState("");
  const [letter, setLetter] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);

  //get
  const getAllStudents = () =>
  axios
    .get("http://localhost:8000/api/student")
    .then((response) => {
      setStudent(response.data.users);
      console.log(response.data.users);
    })
    .catch((error) => console.error(`Error : {${error}`));
const studentCard = student.map((object) => {
  return (
    <StudentCard
      key={object.id}
      firstName={object.firstName}
      lastName={object.lastName}
      email={object.email}
      phoneNumber={object.phoneNumber}
     
      getAllStudents={getAllStudents} // add getAllStudents to the props
      // fetchGradeSection={fetchGradeSection}
ww      //  fetchallStudentByGradeSection ={fetchallStudentByGradeSection }
     

    />
  );
});


///////////////////////////////////////////////////////////////
const fetchGradeSection = async () => {
  await axios
    .get("http://localhost:8000/api/grade")
    .then((res) => setGradeSection(res.data))
    .catch((err) => console.log(err));
};
///get students by grade/section
const fetchallStudentByGradeSection = async (gradeId, sectionId) => {
  await axios
    .get(`http://localhost:8000/api/allStudent/${gradeId}/${sectionId}`)
    .then((res) =>{ setStudent(res.data);
      setTable(true);
    })
    .catch((err) => console.log(err));
};
////////////////////////////////////////////////////////////////

const config1= {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }
}
//delete
const deleteStudent = async (id) => {
  const res = await axios.delete(`http://localhost:8000/api/user/${id}`, config1);


  if (res.status === 200) {
    const newStudent = student.filter((student) => student.id !== id);
    setIsDeleted(true);
    setStudent(newStudent);
  }

  
};

//add new student
const addStudent = async () => {
  const body = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role: "student",
    name,
    letter,
  };

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
 
  axios(config)
    .then(function (response) {
      // console.log("res ", JSON.stringify(response.data));
      setButtonPopup(false);
     
    })
    .catch(function (error) {
      console.log(error);
    });
  setButtonPopup(false);
};

useEffect(() => {
  getAllStudents();
  fetchGradeSection();
  fetchallStudentByGradeSection(1,1);
}, [isDeleted,buttonPopup]);

const submitHandler = (e) => {
  e.preventDefault();
  addStudent();
  window.alert("Student added successfully!");
};

useEffect(() => {
  if (sectionId !== null) {
    handleGetStudent();
  }
}, [sectionId, gradeId]);
const handleGetStudent = () => {
  fetchallStudentByGradeSection(gradeId, sectionId);
  setTitle(gradeSection.name)
 
};
  return (
    <>
      <Navhead />

     
   <div className="component-container">
          <div className="course-title" onClick={() => setButtonPopup(true)}>
          <div>Students </div>
          <div className='addingCourse'>

                <AddCircleIcon /> Add Student
              <PopupStudent
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
                    Add Student
                  </Typography>
                 
                    
                      <input
                        type="text"
                        id="firstName"
                        name="firstName" placeholder="First Name"
                        onChange={(e) => setFname(e.target.value)}
                      />
                    <br></br>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"  placeholder="Last Name"
                        onChange={(e) => setLname(e.target.value)}
                      />
                   
                  
                   <br></br>
                      <input
                        type="mail"
                        id="email"
                        name="email"  placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                 
                   
                     
                 <br></br>
                      <input
                        type="password"
                        id="password"
                        name="password"  placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                   <br></br>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"  placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                  
                   
                  <br></br>
                  {/* <input
                        type="text"
                        id="grade"
                        name="grade" placeholder="Grade"
                        onChange={(e) => setName(e.target.value)}
                      /> */}

<select id="grade" name="grade" onChange={(e) => setName(e.target.value)}  className="my-select">
  <option value="">-- Select section --</option>
  <option value="Grade 1">Grade 1</option>
  <option value="Grade 2">Grade 2</option>
  <option value="Grade 3">Grade 3</option>
  <option value="Grade 4">Grade 4</option>
  <option value="Grade 5">Grade 5</option>
  <option value="Grade 6">Grade 6</option>
  <option value="Grade 7">Grade 7</option>
  <option value="Grade 8">Grade 8</option>
  <option value="Grade 9">Grade 9</option>
  <option value="Grade 10">Grade 10</option>
  <option value="Grade 11">Grade 11</option>
  <option value="Grade 12">Grade 12</option>
</select>
    
    <br></br>
             

<select id="letter" name="letter" onChange={(e) => setLetter(e.target.value)}  className="my-select">
  <option value="">-- Select section --</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
  <option value="D">D</option>
  <option value="D">E</option>
  <option value="D">F</option>
  <option value="D">G</option>


</select>
   
                  {!isPending && (
                    <button className="btn-add-teacher" onClick={submitHandler}>
                      Add
                    </button>
                  )}
                  {isPending && (
                    <button className="btn-add-teacher" onClick={submitHandler}>
                      adding course
                      </button>
                     
                  )}
                </Box>
              </PopupStudent> 
              </div>
            </div>

            <div >
              <Dropdown
                title='Grade/Section '
                
                position='right'
                className='dropdown-attendance'
              >
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item
                        key={grade.id}
                        onClick={() => {
                          setGradeId(grade.id)
                          setTitle(grade.name)
                        }}
                      >
                        {grade.name}
                        <Dropdown.Submenu position='right'>
                          {grade.sections.map((section) => {
                            return (
                              <Dropdown.Item
                                key={section.id}
                                onClick={() => {
                                  setSectionId(section.id)
                                  setLetter(section.letter)
                                 
                                }}
                              >
                                {section.letter}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Submenu>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown>
              
            </div>
        
        
          <div>
            <Container>
            <Grid container spacing={3}>
            {student.map((each, key) => (
               <Grid item xs={12} md={12} lg={4} key={each.id}>
              <StudentCard
                key={key}
               student={each}
                deleteStudent={deleteStudent}
                // getAllStudents={getAllStudents}
                fetchallStudentByGradeSection={fetchallStudentByGradeSection}
                gradeId={gradeId}
                sectionId={sectionId}
              />
              </Grid>
            ))}
            </Grid>
            </Container>
          </div>
          </div>
         


    
       






    
      

      
    </>
  );



}

export default Students;
