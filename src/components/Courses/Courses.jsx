import React, { useEffect, useState } from "react";
import "../components.css";
import "../Courses/Courses.css";
import { Container, Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PopupCourse from "../../components/Courses/PopupCourse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';


function Courses() {
  const [course, setCourse] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [subject, setSubject] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:8000/api/user-grade-section");
    setCourse(res.data.data);
    console.log("course", course);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/deleteById/${id}`
    );

    if (res.status === 200) {
      const newCourse = course.filter((course) => course.id !== id);
      setIsDeleted(true);
      setCourse(newCourse);
    }
  };


  const addCourse = async () => {
    await axios.post("http://localhost:8000/api/course", { subject })
    .then(()=>{
      setIsPending(false);
      navigate('/Courses');

    });
  };

  useEffect(() => {
    fetchCourses();
    addCourse();
  }, [isDeleted]);

  const submitHandler = (e) => {
    e.preventDefault();
    addCourse();
    setButtonPopup(false);
  };

  console.log("course", course);

  return (
    <div className='component-container'>
      <div className='course-title' onClick={() => setButtonPopup(true)}>
        <div>Courses </div>
        <div className='addingCourse'>
          <AddCircleIcon /> Add Course
          <PopupCourse
            trigger={buttonPopup}
            setTrigger={() => setButtonPopup(false)}
          >
            <Typography gutterBottom color='white' variant='h5' component='div'>
              Add Course
            </Typography>
            <Box
              component='form'
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                id='outlined-basic'
                label='Subject'
                variant='outlined'
                onChange={(e) => setSubject(e.target.value)}
              />
              {!isPending && (
                <Button variant='contained' onClick={submitHandler} >
                  add
                </Button>
              )}
              {isPending && (
                <Button variant='contained' onClick={submitHandler}>
                  adding Course
                </Button>
              )}
            </Box>
          </PopupCourse>
        </div>
      </div>
      <Container>
        <Grid container spacing={3}>
          {course.map((course) => (
            <Grid item xs={12} md={12} lg={4} key={course.id}>
              <CourseCard course={course} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Courses;
