// DoctorsPage.js
import React, { useState, useEffect } from "react";
import "./DoctorsPage.css";
import { useUserContext } from "../contexts/UserContext";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      if (user && user.userName) {
        try {
          const response = await fetch(
            `/api/medical-entries/my-doctors/${user.userName}`
          );
          if (!response.ok) throw new Error("Network response was not ok.");
          const data = await response.json();
          setDoctors(data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchDoctors();
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialization.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="doctors-page">
      <h1>My Doctors</h1>
      <input
        type="text"
        placeholder="Search by doctor's name or specialty..."
        onChange={handleSearchChange}
        value={searchTerm}
        className="search-bar"
      />
      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div key={index} className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">
                Specialization: {doctor.specialization}
              </p>
              <p className="doctor-contact">Contact: {doctor.contact}</p>
              <p className="doctor-hospital">Hospital: {doctor.hospital}</p>
            </div>
          ))
        ) : (
          <p>No doctors match your search.</p> // display a message if no doctors are found
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
