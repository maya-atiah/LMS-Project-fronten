import React from "react";
import "../components.css";
import "../Attendance/Attendance.css";
import Navhead from "../../components/Navhead";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Dropdown from "react-multilevel-dropdown";
import swal from 'sweetalert';

function Attendance() {
  
  const [gradeSection, setGradeSection] = useState([]);
  const [student, setStudent] = useState([]);
  const [tableMood, setTableMood] = useState(false);
  const [gradeId, setGradeId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
 
  

  const fetchAttendance = async (e,id,status) => {
    // e.preventDefault();
    const res=await axios.post(`http://localhost:8000/api/attendance/${id}`, {status});
    
     swal({
      title: res.data.message,
    });
   
  };

  const fetchGradeSection = async () => {
    await axios
      .get("http://localhost:8000/api/grade")
      .then((res) => setGradeSection(res.data))
      .catch((err) => console.log(err));
  };

  const fetchallStudentByGradeSection = async (gradeId, sectionId) => {
    await axios
      .get(`http://localhost:8000/api/allStudent/${gradeId}/${sectionId}`)
      .then((res) =>{ setStudent(res.data);
        setTableMood(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // fetchAttendance();
    fetchGradeSection();
    fetchallStudentByGradeSection(1,1);
  }, []);

  useEffect(() => {
    if (sectionId !== null) {
      handleGetStudent();
    }
  }, [sectionId, gradeId]);

  const handleGetStudent = () => {
    fetchallStudentByGradeSection(gradeId, sectionId);
   
  };

  


  return (
    <div>
      <Navhead />

      <section>
        <div className='component-container'>
          <h1> Attendance</h1>
          <div className='form-attendance'>
            <div>
              <Dropdown
                title='Grade/Section'
                position='right'
                className='dropdown-attendance'
              >
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item
                        key={grade.id}
                        onClick={() => {
                          setGradeId(grade.id);
                        }}
                      >
                        {grade.name}
                        <Dropdown.Submenu position='right'>
                          {grade.sections.map((section) => {
                            return (
                              <Dropdown.Item
                                key={section.id}
                                onClick={() => {
                                  setSectionId(section.id);
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

        
          </div>
          <div>
            {tableMood && (
              <table className='attendance-table'>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student &&
                    student.map((student) => {
                      return (
                        <tr key={student.id}>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          <td>
                            {" "}
                            <form>
                              <div className='input-attendance'>
                                <div>
                                  {" "}
                                  <input
                                    type='radio'
                                    id='present'
                                    name='fav_language'
                                    value='present'
                                    onChange={(e) => fetchAttendance(e,student.id,e.target.value)}
                                  />
                                  <label>present</label>
                                </div>
                                <div>
                                  {" "}
                                  <input
                                    type='radio'
                                    id='abscent'
                                    name='fav_language'
                                    value='abscent'
                                    onChange={(e) => fetchAttendance(e,student.id,e.target.value)}
                                  />
                                  <label>abscent</label>
                                </div>
                                <div>
                                  <input
                                    type='radio'
                                    id='late'
                                    name='fav_language'
                                    value='late'
                                    onChange={(e) => fetchAttendance(e,student.id,e.target.value)}
                                  />
                                  <label for='late'>late</label>
                                </div>
                              </div>
                            </form>{" "}
                          </td>
                          <td>1111</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Attendance;
