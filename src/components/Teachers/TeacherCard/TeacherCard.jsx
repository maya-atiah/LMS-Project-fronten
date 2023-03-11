import { DeleteForeverOutlined } from "@mui/icons-material";
import "./TeacherCard.css";
import img from "./pfpic.png";

export const TeacherCard = ({ teacher, deleteTeacher}) => {

  return (
    <div>
      <div className="cardFrameTeacher">
        <button
          className="deleteTeacherButtencontainer"
          onClick={() => deleteTeacher(teacher.id)}
        >
          <DeleteForeverOutlined />
        </button>

        <img src={img} alt="img" className="pfpic" />
        <div className="cardlineteachercard"></div>
        <div className="TeacherCardContent">
          <p>First Name: {teacher.firstName}</p>
          <p>Last Name: {teacher.lastName}</p>
          <p>Email: {teacher.email}</p>
          <p>Phone_nb: {teacher.phoneNumber}</p>
          <p>Course:</p>
        </div >
        <button className="editButtonTeacher">edit</button>
      </div>
    </div>
  );
};
