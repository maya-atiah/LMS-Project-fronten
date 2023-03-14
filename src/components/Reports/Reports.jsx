import React from "react";
import Navhead from "../../components/Navhead";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Dropdown from "react-multilevel-dropdown";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function Reports() {
  const [gradeSection, setGradeSection] = useState([]);
  const [student, setStudent] = useState([]);
  const [gradeId, setGradeId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [pieChartData, setPieChartData] = useState({});
  const [title, setTitle] = useState("");
  const [letter, setLetter] = useState("");

  const fetchGradeSection = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/grade");
      setGradeSection(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllStudentByGradeSection = async (gradeId, sectionId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/allStudent/${gradeId}/${sectionId}`
      );
      const students = response.data;
      const studentCount = students.length; // Get the length of the array of students
      setStudent(studentCount);
      updatePieChartData(presentCount, absentCount, lateCount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/attendance/gradeSection/${sectionId}`
      );
      const fetchedAttendances = response.data.data;
      setAttendances(fetchedAttendances);
      updatePieChartData(presentCount, absentCount, lateCount);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePieChartData = (presentCount, absentCount, lateCount) => {
    setPieChartData({
      labels: ["Present", "Absent", "Late"],
      datasets: [
        {
          data: [presentCount, absentCount, lateCount],
          backgroundColor: ["#008000", "#ff0000", "#ff8c00"],
          hoverBackgroundColor: ["#008000", "#ff0000", "#ff8c00"],
        },
      ],
    });
  };

  const countPresentAttendances = () => {
    const presentAttendances = attendances.filter(
      (attendance) => attendance.status === "present"
    );
    setPresentCount(presentAttendances.length);
    updatePieChartData(presentAttendances.length, absentCount, lateCount);
  };

  const countAbsentAttendances = () => {
    const absentAttendances = attendances.filter(
      (attendance) => attendance.status === "abscent"
    );
    setAbsentCount(absentAttendances.length);
    updatePieChartData(presentCount, absentAttendances.length, lateCount);
  };

  const countLateAttendances = () => {
    const lateAttendances = attendances.filter(
      (attendance) => attendance.status === "late"
    );
    setLateCount(lateAttendances.length);
    updatePieChartData(presentCount, absentCount, lateAttendances.length);
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
  }, []);

  useEffect(() => {
    if (sectionId !== null) {
      fetchAllStudentByGradeSection(gradeId, sectionId);
      fetchAttendanceData();
    }
  }, [sectionId, gradeId]);

  useEffect(() => {
    countPresentAttendances();
    countLateAttendances();
    countAbsentAttendances();
  }, [attendances]);



  const section1 = [
    {
      title: "Total Students",
      text1: student,
      present: `Present: ${presentCount}`,
      absent: `Absent: ${absentCount}`,
      late: `Late: ${lateCount}`,
    },
  ];

  return (
    <div>
      <Navhead />

      <section>
        <div className="component-container">
          <h1> Reports</h1>
          <div className="form-attendance">
            <div>
              <Dropdown
                title="Filter By"
                position="right"
                className="dropdown-attendance"
              >
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item
                        key={grade.id}
                        onClick={() => {
                          setGradeId(grade.id);
                          setTitle(grade.name);
                        }}
                      >
                        {grade.name}
                        <Dropdown.Submenu position="right">
                          {grade.sections.map((section) => {
                            return (
                              <Dropdown.Item
                                key={section.id}
                                onClick={() => {
                                  setSectionId(section.id);
                                  setLetter(section.letter);
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
          <div className="attendance-gradename">
            {title} {letter}
          </div>
        </div>
      </section>
      <div className="component-container">
        <div className="cards">
          {section1.map((card, i) => (
            <div key={i} className="card">
              <h3>{card.title} </h3>
              <h2>{card.text1}</h2>
              <h2>{card.present}</h2>
              <h2>{card.absent}</h2>
              <h2>{card.late}</h2>
            </div>
          ))}
        </div>
        <div className="chart-container">
          {/* <Pie data={pieChartData} /> */}
        </div>
      </div>
    </div>
  );
}
export default Reports;
