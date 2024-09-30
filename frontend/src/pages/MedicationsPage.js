import React from "react";
import "./MedicationsPage.css";
import MedicationTable from "../components/MedicationTable";

const act_med = [
  {
    id: 1,
    medicine: "Adderall",
    strength: "200mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. John Smith",
    type: "Tablet",
    class: "Antibiotic",
  },
  {
    id: 2,
    medicine: "Amoxicillin",
    strength: "50mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Jane Doe",
    type: "Liquid",
    class: "Antidepressant",
  },
  {
    id: 3,
    medicine: "Ibuprofen",
    strength: "200mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Richard Roe",
    type: "Capsule",
    class: "Laxative",
  },
];

const past_med = [
  {
    id: 4,
    medicine: "Melatonin",
    strength: "200mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Emily Taylor",
    type: "Topical",
    class: "Muscle Relaxant",
  },
  {
    id: 5,
    medicine: "Lisinopril",
    strength: "20mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Alan Grant",
    type: "Injection",
    class: "Sedative",
  },
  {
    id: 6,
    medicine: "Albuterol",
    strength: "100mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Clara Oswald",
    type: "Inhaler",
    class: "Steroid",
  },
  {
    id: 7,
    medicine: "Atorvastatin",
    strength: "10mg",
    quantity: "30ct",
    refills: "1",
    date1: "01/01/2024",
    date2: "02/02/2024",
    prescribed: "Dr. Henry Wu",
    type: "Drops",
    class: "Antiviral",
  },
];

const MedicationsPage = () => {
  return (
    <div className="medications-page">
      <h1>My Medications</h1>
      <section className="medications-section">
        <h2>Active Medications</h2>
        <MedicationTable medList={act_med} />
      </section>
      <hr className="solid" />
      <section className="medications-section">
        <h2>Past Medications</h2>
        <MedicationTable medList={past_med} />
      </section>
    </div>
  );
};

export default MedicationsPage;
