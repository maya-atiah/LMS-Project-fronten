import { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Classes from "./components/Classes/classes";
import Courses from "./components/Courses/Courses";
import Teachers from "./components/Teachers/Teachers";
import Attendance from "./components/Attendance/Attendance";
import Reports from "./components/Reports/Reports";
import Students from "./components/Students/Students.jsx";
import AttendanceTeacher from "./components/TeacherSide/AttendanceTeacher";
import ReportsTeacher from "./components/TeacherSide/ReportsTeacher";
import HomeTeacher from "./components/TeacherSide/HomeTeacher";
import "./style/index.css";
import LoginPage from "./components/Login/Login";

function App() {

  return (


    <BrowserRouter>
      <div className="App">
        {/* <Navbar visible={navVisible} show={showNavbar} /> */}
        {/* <Header />   */}
        {/* <Calender /> */}
        {/* <Home/> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Teachers" element={<Teachers />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/TeacherSide/Attendance" element={<AttendanceTeacher />} />
          <Route path="/TeacherSide/Reports"   element={<ReportsTeacher />} />
          <Route path="/TeacherSide/Home" element={<HomeTeacher/>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
