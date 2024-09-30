import React from "react";
import { useUserContext } from "../contexts/UserContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useUserContext();

  // Log user object to see what data available
  console.log("User from context:", user);

  // Define mock data in the component
  const mockData = {
    testResults: [
      {
        date: "2023-08-01",
        type: "Bloodwork",
        result: "Normal",
      },
      {
        date: "2023-07-20",
        type: "MRI",
        result: "No issues detected",
      },
    ],
    appointments: [
      {
        date: "2023-09-10",
        time: "10:00 AM",
        doctor: "Dr. Jane Smith",
        specialty: "Primary Care Physician",
      },
      {
        date: "2023-10-05",
        time: "02:00 PM",
        doctor: "Dr. Raymond Holt",
        specialty: "Cardiologist",
      },
    ],
    medications: [
      {
        name: "Atorvastatin",
        dosage: "10mg",
        frequency: "Once a day",
      },
      {
        name: "Lisinopril",
        dosage: "20mg",
        frequency: "Once a day",
      },
    ],
    doctors: [
      {
        name: "Dr. Jane Smith",
        specialty: "Primary Care Physician",
      },
      {
        name: "Dr. Raymond Holt",
        specialty: "Cardiologist",
      },
    ],
  };

  // Use actual username from logged-in user's context or default to "Guest"
  const userName = user ? user.userName : "Guest";

  // Destructure the mock data for easier access
  const { testResults, appointments, medications, doctors } = mockData;

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h2>Welcome, {userName}</h2> {/* dynamically display user's name */}
      </section>
      <div className="home-content">
        <section className="test-results">
          <h3>Last Test Results:</h3>
          {testResults.map((test, index) => (
            <div key={index}>
              <p>
                {test.date}: {test.type} - {test.result}
              </p>
            </div>
          ))}
        </section>
        <section className="recent-appointments">
          <h3>Recent Appointments:</h3>
          {appointments.map((appointment, index) => (
            <div key={index}>
              <p>
                {appointment.date} at {appointment.time} with{" "}
                {appointment.doctor} ({appointment.specialty})
              </p>
            </div>
          ))}
        </section>
        <section className="current-medications">
          <h3>Current Medications:</h3>
          {medications.map((medication, index) => (
            <div key={index}>
              <p>
                {medication.name} - {medication.dosage} - {medication.frequency}
              </p>
            </div>
          ))}
        </section>
        <section className="my-doctors">
          <h3>My Doctors:</h3>
          {doctors.map((doctor, index) => (
            <div key={index}>
              <p>
                {doctor.name} - {doctor.specialty}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
