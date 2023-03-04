import React, { useEffect, useState } from "react";
import "../components.css";
import "../Courses/Courses.css";
import { Container, Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import axios from "axios";

function Courses() {

     
  const [course,setCourse]=useState([]);

  const fetchCourses=async()=>{
    const res=await axios.get('http://localhost:8000/api/user-grade-section');
    setCourse(res.data.data);
    console.log('course',course);
  }

  useEffect(()=>{
    fetchCourses();
  });

console.log('course',course);
  return (
    <div className='component-container'>
      <div className='course-title'> Courses</div>
      <Container >
        <Grid  container spacing={4}>
          {course.map((course) => (
            <Grid item xs={12} md={12} lg={4} key={course.id}>
              <CourseCard course={course}  />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Courses;
