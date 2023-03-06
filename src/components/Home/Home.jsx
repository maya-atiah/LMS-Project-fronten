import React from "react";
import "../components.css";
import { useState } from "react";
import "./Home.css";
import Navhead from "../../components/Navhead";

import stud from "../../assets/Images/student.png";
import teacher from "../../assets/Images/teacher.png";

function Home() {

  const [cards] = useState([
    {
      title: "Total students ",
      text: "200",
      img: stud,
    },

    {
      title: "Total Teachers ",
      text: "50",
      img: teacher,
    },
  ]);

  // const [cards2] = useState([
  //   {
  //     title: "Total students ",
  //     text: "200",
  //     img: stud,
  //   },
  // ]);

  return (
    <div>
      <Navhead/>
      <section>
        <div className="component-container">
          <h1> Home</h1>
          <div className="cards">
            {cards.map((card, i) => (
              <div key={i} className="card">
                <img src={card.img} alt={card.title} />
                <h3>
                  {card.title}
                  {card.text}
                  {""}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="component-container">
          <h1> Home</h1>
          <div className="cards">
            {cards.map((card, i) => (
              <div key={i} className="card">
                <img src={card.img} alt={card.title} />
                <h3>
                  {card.title}
                  {card.text}
                  {""}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
