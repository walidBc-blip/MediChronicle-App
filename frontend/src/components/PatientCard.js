import React from "react";
import "./PatientCard.css";

const PatientCard = ({ patient }) => {
  return (
    <div className="patient-card">
      <div className="patient-info">
        <h3 className="patient-name">{patient.name}</h3>
        <p className="patient-condition">{patient.condition}</p>
        <div className="patient-medication-info">
          <h4>Medications:</h4>
          <ul>
            {patient.medications.map((med, index) => (
              <li key={index}>
                {med.name} - {med.dosage}, {med.frequency}
              </li>
            ))}
          </ul>
        </div>
        <div className="patient-contact-info">
          <p>Phone: {patient.contact.phone}</p>
          <p>Email: {patient.contact.email}</p>
          <p>Address: {patient.contact.address}</p>
        </div>
        <p className="patient-next-appointment">
          Next Appointment: {new Date(patient.nextAppointment).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
