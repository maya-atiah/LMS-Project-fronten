import React, { useState, useEffect } from "react";
import "./Attendance.css";
import Dropdown from "react-multilevel-dropdown";
import axios from "axios";

function Attendance() {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState([]);

  // const [levelName, setLevelName] = useState([]);
  // const [sectionName, setSectionName] = useState([]);

  // const handleLevelName =(levelName)=>{
  //     setLevelName = levelName;
  // }

  // const handleSectionName =(sectionName)=>{
  //     setSectionName = sectionName;
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/levels`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect((levelName, sectionName) => {
    axios
      .get(`http://localhost:8000/api/listStudent/${levelName}/${sectionName}`)
      .then((response) => {
        setStudent(response.student);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const dropdownStyles = {
    fontSize: "24px",
  };

  const [tableMood, setTableMood] = useState(false);

  const handleGetStudent = () => {
    setTableMood(true);
  };
  return (
    <div className='attendances'>
      <div className='section'>
        <Dropdown
          className='dropdownSection'
          title=' Select Sections'
          position='right'
          buttonVariant='primary'
          style={dropdownStyles}
        >
          {data.map((card) => (
            <Dropdown.Item
              key={card.id}
              style={dropdownStyles}
              className='childSection'
            >
              {card.levelName}
              <Dropdown.Submenu position='right'>
                {card.sections.map((section) => (
                  <Dropdown.Item key={card.id}>
                    <h3 onClick={handleGetStudent}>
                      Section {section.sectionName}
                    </h3>
                  </Dropdown.Item>
                ))}
              </Dropdown.Submenu>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      {tableMood && (
        <div className='createAttendance'>
          <div className='gradeAndSection'>
            <div className='gradeAttendance'>Grade 1</div>
            <div className='sectionAttendance'>Section A</div>
          </div>
          <div className='table'>
            <ul>
              <li>Student Name</li>
              <li>Attendance</li>
            </ul>
          </div>
          <div className='tableStudent'>
            {student.map((student) => (
              <ul key={student.id}>
                <li>
                  {student.firstName} {student.lastName}
                </li>
                <button className='present'>Present</button>
                <button className='absent'>Absent</button>
                <button className='late'>Late</button>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
