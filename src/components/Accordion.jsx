import React, { useState } from "react";
import '../styles/accordion.css';

function Accordion({ data }) {
  const [isActive, setIsActive] = useState(Array(data.length).fill(false));

  const toggleActive = (index) => {
    const newIsActive = [...isActive];
    newIsActive[index] = !newIsActive[index];
    setIsActive(newIsActive);
  };

  return (
    <div className="question-list">
      {data.map((item, index) => (
        <div key={item.id} className="accordion-item">
          <button
            className="accordion-title"
            onClick={() => toggleActive(index)}
            aria-expanded={isActive[index]}
            aria-controls={`answer-${index}`}
          >
            <h3>{item.title}</h3>
            <span>{isActive[index] ? "-" : "+"}</span>
          </button>
          <div
            id={`answer-${index}`}
            className={`accordion-answer ${isActive[index] ? "active" : ""}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;


