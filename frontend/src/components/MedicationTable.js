import React from "react";
import "./MedicationTable.css";

const MedItem = ({ medItem }) => {
  return (
    <tr>
      <td>{medItem.medicine}</td>
      <td>{medItem.strength}</td>
      <td>{medItem.quantity}</td>
      <td>{medItem.refills}</td>
      <td>{medItem.date1}</td>
      <td>{medItem.date2}</td>
      <td>{medItem.prescribed}</td>
      <td>{medItem.type}</td>
      <td>{medItem.class}</td>
    </tr>
  );
};

const MedicationTable = ({ medList }) => {
  return (
    <table className="med-table">
      <thead>
        <tr>
          <th>Medicine</th>
          <th>Strength</th>
          <th>Quantity</th>
          <th>Refills</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Prescribed by</th>
          <th>Type</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {medList.map((medItem, index) => (
          <MedItem key={index} medItem={medItem} />
        ))}
      </tbody>
    </table>
  );
};

export default MedicationTable;
