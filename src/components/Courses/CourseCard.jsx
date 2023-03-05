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

      <Card className='CardColor' sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image={Profile}
            alt='course'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {course.subject}
            </Typography>
            <strong>Courses are given by Teachers:</strong> 
            {course.teachers.map((x) => {
              return (
                <Typography variant='body2' color='text.secondary' key={x.id}>
                
                 {x.firstName} {x.lastName}
                </Typography>
              );
            })}
          </CardContent>
        </CardActionArea>
        <CardActions onClick={()=>handleDelete(course.id)}>
          <IconButton aria-label='delete' >
            <DeleteForeverRounded/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
