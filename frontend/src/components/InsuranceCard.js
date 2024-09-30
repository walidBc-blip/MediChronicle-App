// src/components/InsuranceCard.js
import React from "react";
import "./InsuranceCard.css";

const InsuranceCard = ({ insurance }) => {
  return (
    <div className="insurance-card">
      <h3>{insurance.company}</h3>
      <p>Policy Number: {insurance.policyNumber}</p>
      <p>Coverage: {insurance.coverage}</p>
      <p>Contact: {insurance.contact}</p>
    </div>
  );
};

export default InsuranceCard;
