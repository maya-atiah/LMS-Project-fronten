import React from "react";
import "../components.css";
import "./Class.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PopupClass from "../../components/Classes/PopupClass";
import swal from "sweetalert";
import Select from "react-select";

function Classes() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setGrade] = useState("");
  const [sectionIds, setsection] = useState("[]");
  const [classes, setclass] = useState([]);

  useEffect(() => {
    loadclass();
  }, [buttonPopup]);

  //get
  const loadclass = async () => {
    const res = await axios.get("http://localhost:8000/api/grade");
    setclass(res.data);
  };

  //delete
  const deleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this grade!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "btn-danger",
          visible: true,
          closeModal: true,
          className: "orange-button",
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:8000/api/grade/${id}`);
        loadclass();
        swal("Poof! The grade has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The grade is safe!");
      }
    });
  };

  //add new grade with sections
  const addClass = async () => {
    const capacity = 50;
    const body = {
      name,
      capacity,
      sectionIds,
    };

    try {
      const response = await fetch("http://localhost:8000/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        swal({
          title: "Grade added successfully!",
          icon: "success",
        });
        setButtonPopup(false);
        loadclass();
      } else {
        const error = await response.json();
        console.error(error);
        if (error.error === "Grade already exists") {
          // Grade already exists, so add the new section to it
          const gradeId = error.grade.id;
          const sectionId = sectionIds[0];
          const sectionCapacity = capacity;
          const sectionResponse = await fetch(
            `http://localhost:8000/api/grade/${gradeId}/section/${sectionId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ capacity: sectionCapacity }),
            }
          );
          if (sectionResponse.ok) {
            // Display a success message to the user
            swal({
              title: "Section added to existing grade successfully",
              icon: "success",
            });
            setButtonPopup(false);
            loadclass();
          } else {
            const sectionError = await sectionResponse.json();
            console.error(sectionError);
            alert(sectionError.error);
          }
        } else {
          alert(error.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addClass();
  };

  ////////////////////////////////////////////////////////////////////////////////////////////

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/grade")
      .then((response) => response.json())
      .then((data) => setGrades(data))
      .catch((error) => console.log(error));
  }, []);

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/section")
      .then((response) => response.json())
      .then((data) => setLetters(data["All Sections"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Navhead />

      <div className='component-container'>
        <div className='grade-title' onClick={() => setButtonPopup(true)}>
          <div>Grades </div>
          <div className='addingCourse'>
            <AddCircleIcon /> Add Grade
            <PopupClass
              trigger={buttonPopup}
              setTrigger={() => setButtonPopup(false)}
            >
              <Box
                component='form'
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete='off'
              >
                <Typography
                  gutterBottom
                  color='white'
                  variant='h4'
                  component='div'
                >
                  Add New Grade
                </Typography>

                <input
                  type='text'
                  id='Grade'
                  // name="Grade"
                  placeholder='Grade name'
                  name='name'
                  onChange={(e) => setGrade(e.target.value)}
                />

                <br></br>

                {console.log("ssHGHJ", sectionIds[0])}
                <Select
                  isMulti
                  name='letters'
                  options={letters.map((letter) => ({
                    value: letter.id,
                    label: letter.id,
                  }))}
                  className='my-select-student'
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setsection(selectedValues);
                  }}
                />

                <button className='btn-add-course' onClick={submitHandler}>
                  add
                </button>
              </Box>
            </PopupClass>
          </div>
        </div>
        <br></br> <br></br>
        <div>
          <table className='table-class'>
            <thead>
              <tr className='first--'>
                <th>Class</th>
                <th>Section</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((item, index) => {
                return (
                  <tr className='' key={index}>
                    <td> {item.name} </td>

                    <td>
                      {item.sections.map((section, index) => (
                        <td key={index}> {section.letter}</td>
                      ))}
                    </td>

                    <td>
                      {" "}
                      <button
                        alt=''
                        className='button'
                        onClick={() => deleteUser(item.id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Classes;
