import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <h3 className="doctor-name">{doctor.name}</h3>
        <p className="doctor-specialty">{doctor.specialty}</p>
        <p className="doctor-description">{doctor.description}</p>
        <div className="doctor-contact-info">
          <p>Phone: {doctor.contact.phone}</p>
          <p>Email: {doctor.contact.email}</p>
          <p>Address: {doctor.contact.address}</p>
        </div>
        <p className="doctor-next-appointment">
          Next Appointment: {new Date(doctor.nextAppointment).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
