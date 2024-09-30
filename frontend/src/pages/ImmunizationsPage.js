import React from "react";
import "./ImmunizationsPage.css";
import ImmunizationTable from "../components/ImmunizationTable";

const ImmunizationsPage = () => {
  return (
    <div className="immunizations-page">
      <h1>My Immunizations</h1>
      <ImmunizationTable />
    </div>
  );
};

export default ImmunizationsPage;
