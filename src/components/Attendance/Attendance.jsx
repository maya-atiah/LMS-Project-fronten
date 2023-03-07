// import React from "react";
// import "../components.css";
// import Navhead from "../../components/Navhead";
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import { Table, TableBody, TableHead, TableRow } from "@mui/material";
// import TableContainer from '@mui/material/TableContainer';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { ThemeProvider,createMuiTheme } from "@material-ui/core/styles";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 1.5 + ITEM_PADDING_TOP,
//       width: 150,
//     },
//   },
// };

// const names = [
//   'Grade 1',
//   'Grade 2',
//   'Grade 3',
//   'Grade 4',

// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// const customTheme=createMuiTheme({
//   //theme settings
//   palette: {
//     primary: {
//       main: '#EE8B3A',
//     },
//     secondary: pink,
//   },
// })
// function Attendance() {



//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));
  
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//   }));

//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };



//   return (
//     <div>
//       <Navhead />

//       <section>
//         <div className='component-container'>
//           <h1> Attendance</h1>
//          <ThemeProvider> <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-name-label" className="demo-multiple-name-label">Grade</InputLabel>
//         <Select
//           labelId="demo-multiple-name-label"
//           id="demo-multiple-name"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Name" />}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div></ThemeProvider>
//           <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Student Name</StyledTableCell>
//             <StyledTableCell align="right">Calories</StyledTableCell>
//             <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
        
//             <StyledTableRow >
//               <StyledTableCell component="th" scope="row">
//              hi
//               </StyledTableCell>
//               <StyledTableCell align="right">hi</StyledTableCell>
//               <StyledTableCell align="right">hi</StyledTableCell>
//               <StyledTableCell align="right">hi</StyledTableCell>
//               <StyledTableCell align="right">hi</StyledTableCell>
//             </StyledTableRow>
      
//         </TableBody>
//       </Table>
//     </TableContainer>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Attendance;
