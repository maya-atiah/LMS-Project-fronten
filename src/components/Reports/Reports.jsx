import React from "react";
import Navhead from "../../components/Navhead";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../components.css";
import Dropdown from "react-multilevel-dropdown";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../Reports/Report.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Reports() {
  const [gradeSection, setGradeSection] = useState([]);
  const [student, setStudent] = useState([]);
  const [gradeId, setGradeId] = useState();
  const [sectionId, setSectionId] = useState();
  const [attendances, setAttendances] = useState([]);
  const [presentCount, setPresentCount] = useState();
  const [absentCount, setAbsentCount] = useState();
  const [lateCount, setLateCount] = useState();
  const [pieChartData, setPieChartData] = useState({});
  const [title, setTitle] = useState("");
  const [letter, setLetter] = useState("");

  const fetchGradeSection = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-production-9753.up.railway.app/api/grade"
      );
      setGradeSection(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////////////////
  ////////////////////////

  const fetchtheattended = async (dd) => {
    const response = await axios.get(
      `https://lms-backend-production-9753.up.railway.app/api/attendance/status/${dd}`
    );
    console.log(response.data);
    console.log(response.data.present);
    setPresentCount(response.data.present);
    setAbsentCount(response.data.absent);
    setLateCount(response.data.late);
  };

  const fetchthestatus = async (grade, section) => {
    const response = await axios.get(
      `https://lms-backend-production-9753.up.railway.app/api/attendance/${grade}/${section}`
    );
    console.log(
      "this is the attendance status",
      response.data[0].gradeSectionId
    );
    fetchtheattended(response.data[0].gradeSectionId);
  };

  useEffect(() => {}, [presentCount, absentCount, lateCount, gradeId]);

  const fetchAllStudentByGradeSection = async (gradeId, sectionId) => {
    try {
      const response = await axios.get(
        `https://lms-backend-production-9753.up.railway.app/api/allStudent/${gradeId}/${sectionId}`
      );
      const students = response.data;
      const studentCount = students.length; // Get the length of the array of students
      setStudent(studentCount);
      updatePieChartData(presentCount, absentCount, lateCount);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePieChartData = (presentCount, absentCount, lateCount) => {
    setPieChartData({
      labels: ["Present", "Absent", "Late"],
      datasets: [
        {
          data: [presentCount, absentCount, lateCount],
          backgroundColor: ["#017f94", "#e06c0d", "#ff0000"],
          hoverBackgroundColor: ["#017f94", "#e06c0d", "#ff0000"],
        },
      ],
    });
  };

  const handleGetStudent = () => {
    fetchAllStudentByGradeSection(gradeId, sectionId);
    setTitle(gradeSection.name);
    const section = gradeSection
      .find((grade) => grade.id === gradeId)
      ?.sections.find((section) => section.id === sectionId);
    if (section) {
      setLetter(section.letter);
    }
  };

  useEffect(() => {
    fetchGradeSection();
  }, [attendances]);

  useEffect(() => {
    if (sectionId !== null) {
      fetchAllStudentByGradeSection(gradeId, sectionId);
      // fetchAttendanceData();
    }
  }, [sectionId, gradeId]);

  const section1 = [
    {
      title: `All Students: ${student}`,
      present: `Present: ${student === 0 ? 0 : presentCount}`,
      absent: `Absent: ${student === 0 ? 0 : absentCount}`,
      late: `Late: ${student === 0 ? 0 : lateCount}`,
    },
  ];

  return (
    <div>
      <Navhead />

      <section>
        <div className='component-container'>
          <h1 className='Reporttt'> Reports</h1>
          <div className='form-Reports'>
            <div>
              <Dropdown
                title='Filter By'
                position='right'
                className='dropdown-Report'
              >
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item
                        key={grade.id}
                        onClick={() => {
                          setGradeId(grade.id);
                          console.log(grade.id);
                          setTitle(grade.name);
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
                                  console.log(section.id);
                                  // fetchAttendanceData(section.id);
                                  setLetter(section.letter);
                                  fetchthestatus(gradeId, section.id);

                                  handleGetStudent();
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
          <div className='Report-gradename'>
            {title} {letter}
          </div>
        </div>
      </section>

      <section>
        <div
          className='component-container'
          style={{ display: gradeId ? "block" : "none" }}
        >
          <div className='cardoo'>
            {section1.map((card, i) => (
              <div key={i}>
                <h3>{card.title} </h3>
                <h2>{card.present}</h2>
                <h2>{card.absent}</h2>
                <h2>{card.late}</h2>
              </div>
            ))}
            <div className='piechar'>
              {student > 0 &&
                pieChartData &&
                pieChartData.labels &&
                pieChartData.datasets && <Pie data={pieChartData} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;
