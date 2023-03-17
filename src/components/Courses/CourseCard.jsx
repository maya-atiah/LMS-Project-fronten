import React from "react";
import Profile from "../../assets/Images/course2.png";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "../Courses/CourseCard.css";
import { DeleteForeverRounded } from "@mui/icons-material";
import swal from 'sweetalert';


export default function CourseCard({ course, handleDelete }) {

  return (
    <div>

      <Card className='course-CardColor' sx={{ maxWidth: 300 }}>
      <CardActions className="button-course-position">
          <IconButton
            aria-label='delete'
            onClick={() => handleDelete(course.id)}
           
          >
            <DeleteForeverRounded  className="delete-corse-button" />
          </IconButton>
        </CardActions>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image={Profile}
            alt='course'
          />
          <CardContent>
            <Typography gutterBottom color='white' variant='h5' component='div'>
              {course.subject}
            </Typography>
            <p className='course-para'>
              <strong>Courses are given by Teachers:</strong>{" "}
            </p>
            {course.teachers.map((x) => {
              return (
                <Typography variant='body1' color='white' key={x.id}>
                  {x.firstName} {x.lastName}
                </Typography>
              );
            })}
          </CardContent>
        </CardActionArea>
       
      </Card>
    </div>
  );
}
