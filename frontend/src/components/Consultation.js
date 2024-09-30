import React from "react";
import "./Consultation.css";

const Consultation = ({ consultation }) => {
  return (
    <div className="consultation">
      <h3>Consultation: {consultation.category}</h3>
      <h4>
        {consultation.provider} - Appointment Date: {consultation.date}
      </h4>
      <p>{consultation.desc}</p>
      <div className="file">
        <p
          style={{
            textAlign: "right",
            paddingRight: "1vw",
            paddingBottom: "1vh",
          }}
        >
          Attached files:
        </p>
      </div>
    </div>
  );
};

export default Consultation;
