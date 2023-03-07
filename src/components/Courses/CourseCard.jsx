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

export default function CourseCard({ course ,handleDelete}) {
  

  return (
    <div>
      {/* <Card elevation={1}>
          <CardHeader
            action={
              <IconButton>
                <DeleteOutlined />
              </IconButton>
            }
            title='Subject'
            subheader={course.subject}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
             Hi
            </Typography>
          </CardContent>
        </Card> */}

      <Card className='course-CardColor' sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='100'
            image={Profile}
            alt='course'
          />
          <CardContent>
            <Typography gutterBottom color='white'variant='h5' component='div'>
              {course.subject}
            </Typography>
           <p className="course-para"><strong>Courses are given by Teachers:</strong> </p> 
            {course.teachers.map((x) => {
              return (
                <Typography variant='body1' color='white' key={x.id}>
                
                 {x.firstName} {x.lastName} 
                </Typography>
              );
            })}
          </CardContent>
        </CardActionArea>
        <CardActions >
          <IconButton aria-label='delete' onClick={()=>handleDelete(course.id)} >
            <DeleteForeverRounded />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
