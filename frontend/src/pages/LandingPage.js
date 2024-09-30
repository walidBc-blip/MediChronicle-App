import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      {" "}
      {/* New wrapper with the brand color */}
      <div className="landing-container">
        <h1>Welcome to MediChronicle</h1>
        <p>
          Manage your health records, access your complete medical history, and
          more.
        </p>
        <div className="action-buttons">
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
