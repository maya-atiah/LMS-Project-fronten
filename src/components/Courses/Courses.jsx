import React, { useEffect, useState } from "react";
import "../components.css";
import "../Courses/Courses.css";
import { Container, Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PopupCourse from "../../components/Courses/PopupCourse";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Courses() {
  const [course, setCourse] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [subject, setSubject] = useState("");

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://lms-backend-production-9753.up.railway.app/api/user-grade-section"
    );
    setCourse(res.data.data);
  };

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this course!",
      icon: "warning",

      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "btn-danger",
          visible: true,
          closeModal: true,
          className: "orange-button",
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const newCourse = course.filter((course) => course.id !== id);
        await axios.delete(
          `https://lms-backend-production-9753.up.railway.app/api/deleteById/${id}`
        );
        setIsDeleted(true);
        setCourse(newCourse);
        swal("Poof!The course has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The Course is safe!");
      }
    });
  };

  const addCourse = async () => {
    await axios
      .post("https://lms-backend-production-9753.up.railway.app/api/course", {
        subject,
      })
      .then(() => {
        // setIsPending(false);
      });
    setButtonPopup(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    // addCourse();
  }, [isDeleted, buttonPopup]);

  const submitHandler = (e) => {
    e.preventDefault();
    addCourse();
    swal({
      title: "Course is added",
      icon: "success",
    });
  };

  return (
    <>
      <Navhead />

      <div className='component-container'>
        <div className='course-title' onClick={() => setButtonPopup(true)}>
          <div>Courses </div>
          <div className='addingCourse'>
            <AddCircleIcon /> Add Course
            <PopupCourse trigger={buttonPopup} setTrigger={setButtonPopup}>
              <Box
                component='form'
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete='off'
              >
                <Typography
                  gutterBottom
                  color='white'
                  variant='h4'
                  component='div'
                >
                  Add Course
                </Typography>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  placeholder='Write a Subject'
                  onChange={(e) => setSubject(e.target.value)}
                />

                <button className='btn-add-course' onClick={submitHandler}>
                  add
                </button>
              </Box>
            </PopupCourse>
          </div>
        </div>
        <Container>
          <Grid container spacing={3}>
            {course.map((course) => (
              <Grid item xs={12} md={6} lg={4} key={course.id}>
                <CourseCard course={course} handleDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Courses;
