import React from "react";
import { useUserContext } from "../contexts/UserContext";
import "./Doctorhomepage.css";

// card component to display various sections
const Card = ({ title, list, emptyMessage }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    {list.length > 0 ? (
      <ul className="card-list">
        {list.map((item, index) => (
          <li key={index} className="card-list-item">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="card-empty">{emptyMessage}</p>
    )}
  </div>
);

// Doctor's homepage component
const DoctorHomePage = () => {
  const { user } = useUserContext();
  const userName = user ? user.userName : "Guest"; // handle case where no user is logged in

  // dummy data for doctor's homepage
  const myPatients = [
    "John Doe - Diabetes",
    "Jane Smith - Hypertension",
    "Michael Brown - Asthma",
  ];
  const consultations = [
    "09/15/2024 - 10:00 AM with John Doe (Diabetes)",
    "09/16/2024 - 11:00 AM with Jane Smith (Hypertension)",
  ];
  const chatWithDoctor = ["09/14/2024 - 3:00 PM with Emily Clark"];
  const relatedDoctors = [
    "Dr. Sarah Linn - Endocrinologist",
    "Dr. Mark Sloan - Cardiologist",
  ];

  return (
    <div className="doctor-home-page">
      <header className="welcome-section">
        <h2>Welcome, Dr.{userName}</h2> {/* display user's name */}
      </header>
      <div className="home-content">
        <Card
          title="My Patients"
          list={myPatients}
          emptyMessage="No patients found."
        />
        <Card
          title="Upcoming Consultations"
          list={consultations}
          emptyMessage="No upcoming consultations."
        />
        <Card
          title="Recent Chats"
          list={chatWithDoctor}
          emptyMessage="No recent chats."
        />
        <Card
          title="Related Doctors"
          list={relatedDoctors}
          emptyMessage="No related doctors."
        />
      </div>
    </div>
  );
};

export default DoctorHomePage;
