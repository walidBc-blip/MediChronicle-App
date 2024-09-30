import React from "react";
import "./ImmunizationTable.css";

const immunization_data = [
  {
    vaccine: "DPT/DtaP/DT/Td",
    type: "Regular",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "",
    type: "Booster",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "Hepatitis A",
    type: "Regular",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "Hepatitis B",
    type: "Regular",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "Polio",
    type: "Regular",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "HPV",
    type: "1st dose",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
  {
    vaccine: "",
    type: "2nd dose",
    date1: "01/01/2024",
    administered: "Cleveland Clinic Abu Dhabi",
    date2: "02/02/2024",
  },
];

const ImmunizationItem = ({ vaxxItem }) => {
  return (
    <tr
      className={
        vaxxItem.type.toLowerCase().includes("booster") ? "booster" : ""
      }
    >
      <td>{vaxxItem.vaccine || "Vaccine Name Pending"}</td>
      <td>{vaxxItem.type}</td>
      <td>{vaxxItem.date1}</td>
      <td>{vaxxItem.administered}</td>
      <td>{vaxxItem.date2}</td>
    </tr>
  );
};

const ImmunizationTable = () => {
  return (
    <div className="immunotable-container">
      <table className="immunization-table">
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Type</th>
            <th>Date Given</th>
            <th>Administered by</th>
            <th>Next Dose</th>
          </tr>
        </thead>
        <tbody>
          {immunization_data.map((item, index) => (
            <ImmunizationItem key={index} vaxxItem={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImmunizationTable;
