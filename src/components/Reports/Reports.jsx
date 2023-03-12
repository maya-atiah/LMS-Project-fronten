import React from "react";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Report.css";
import FilterProduct from "../../components/FilterClasses/FilterClass";


function Reports() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate]);

  const [filteredclasses, setFilteredClasses] = useState([
    {
      Grade: "Grade",
      Total: "Total number of students:",
      Absent: "Absent",
      Present: "Present",
      Late: "Late",
    },


  ]);

  function onFilterValueSelected(filterValue) {
    setFilteredClasses([
      {
        Grade: filterValue,
        Total: "Total number of students:",
        Absent: "Absent",
        Present: "Present",
        Late: "Late",
      },

  
    ]);
  }


  
  return (
    <>
      <Navhead />
      <div>
        <section className="report_Section">
          <div className="component-container">
            <div className="reportdiv">
              <h1> Reports</h1>
              <FilterProduct FilterValueSelected={onFilterValueSelected} />
            </div>
            <div className="report_cards">
              {filteredclasses.map((card, i) => (
                <div key={i} className="report_Card">
                  <h3 className="reportheader">
                     {card.Grade}</h3>
                  <p>{card.Total}</p>
                  <p>{card.Absent}</p>
                  <p>{card.Present}</p>
                  <p>{card.Late}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Reports;
