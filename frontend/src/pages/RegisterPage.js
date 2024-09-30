import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Patient",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset message
    setMessage("");

    // Validation checks
    if (!userInfo.username.trim()) {
      setMessage("Username is required");
      return;
    }

    if (!userInfo.password.trim()) {
      setMessage("Password is required");
      return;
    }

    // Ensure password length
    if (userInfo.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    try {
      const response = await fetch("/api/users/register", requestOptions);
      const data = await response.json();

      if (response.ok) {
        // Handle success
        setMessage("Registration successful! Redirecting to login...");

        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Handle errors
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("There was an error processing your request.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <h1 className="login-title">MediChronicle</h1>{" "}
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={handleChange}
          />

          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={userInfo.role}
            onChange={handleChange}
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            {/* add additional roles as needed */}
          </select>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
