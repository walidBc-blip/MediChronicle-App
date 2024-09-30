import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useUserContext } from "../contexts/UserContext";

const Sidebar = () => {
  const { user } = useUserContext(); // get current user's role from context
  // console.log("Sidebar user:", user); // Debug: what does 'user' contain?

  if (!user) {
    console.log("No user logged in");
    return null;
  }

  return (
    <nav className="app-sidebar">
      <ul className="nav-list">
        {/* common links that all users should see */}
        {user && user.role === "Patient" && (
          <>
            {/* Patient-specific links */}
            <li className="nav-item">
              <NavLink to="/home" activeclassname="active" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/doctors" activeclassname="active">
                Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/insurance" activeclassname="active">
                Insurance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/immunizations" activeclassname="active">
                Immunizations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/medications" activeclassname="active">
                Medications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/consultations" activeclassname="active">
                Consultations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/account-settings" activeclassname="active">
                Account Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/radiology" activeclassname="active">
                Radiology
              </NavLink>
            </li>
          </>
        )}

        {user && user.role === "Doctor" && (
          <>
            {/* Doctor-specific links */}
            <li className="nav-item">
              <NavLink to="/Doctorhomepage" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/InputMedical" activeclassname="active">
                Add New Entry
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chat" activeclassname="active">
                Chat
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
