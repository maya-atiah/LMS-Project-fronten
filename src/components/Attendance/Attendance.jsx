import React from "react";
import "../components.css";
import Navhead from "../../components/Navhead";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Dropdown from "react-multilevel-dropdown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 1.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const names = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Attendance() {

const [attendee,setAttendee]=useState();

const fetchAttendance=async()=>{
  const res=await axios.get('http://localhost:8000/api/attendance');
  setAttendee(res.data);
  console.log(attendee);
}
console.log(attendee);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(()=>{
    fetchAttendance();
},[])

  const [attendee, setAttendee] = useState();
  const [gradeSection, setGradeSection] = useState();

  const fetchAttendance = async () => {
    const res = await axios.get("http://localhost:8000/api/attendance");
    setAttendee(res.data);
    // console.log(attendee);
  };

  const fetchGradeSection = async () => {
    const res = await axios.get("http://localhost:8000/api/grade");
    setGradeSection(res.data);
    console.log(gradeSection);
  };

  // console.log(attendee);
  console.log(gradeSection);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    fetchAttendance();
    fetchGradeSection();
  }, []);

  return (
    <div>
      <Navhead />

      <section>
        <div className='component-container'>
          <h1> Attendance</h1>
          <div className='form-attendance'>
            <div>
              <Dropdown title="Grade/Section" position='right' className="dropdown-attendance">
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item  key={grade.id}>
                        {grade.name}
                        <Dropdown.Submenu position='right'>
                          {grade.sections.map((section) => {
                             return (
                            <Dropdown.Item key={section.id}>{section.letter}</Dropdown.Item>)
                          })}
                        </Dropdown.Submenu>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown>
            </div>
            {/* <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel
                  id='demo-multiple-name-label'
                  className='demo-multiple-name-label'
                >
                  Section
                </InputLabel>
                <Select
                  labelId='demo-multiple-name-label'
                  id='demo-multiple-name'
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label='Name' />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> */}
            <div>
              <button className='submit-attendance'>Submit</button>
            </div>
          </div>
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell align='right'></StyledTableCell>
                  <StyledTableCell align='right'>Last Name</StyledTableCell>
                  <StyledTableCell align='right'>Status</StyledTableCell>
                  <StyledTableCell align='right'>Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component='th' scope='row'>
                    hi
                  </StyledTableCell>
                  <StyledTableCell align='right'>hi</StyledTableCell>
                  <StyledTableCell align='right'>hi</StyledTableCell>
                  <StyledTableCell align='right'>hi</StyledTableCell>
                  <StyledTableCell align='right'>hi</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
          <div>
            <table className='attendance-table'>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

              <tr>
                <td>Maya</td>
                <td>Atiah</td>
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
                        />
                        <label>abscent</label>
                      </div>
                      <div>
                        <input
                          type='radio'
                          id='late'
                          name='fav_language'
                          value='late'
                        />
                        <label for='late'>late</label>
                      </div>
                    </div>
                  </form>{" "}
                </td>
                <td>1111</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Attendance;
