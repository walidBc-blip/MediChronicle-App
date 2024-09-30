import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    };

    try {
      const response = await fetch("/api/users/login", requestOptions);
      const data = await response.json();

      if (response.ok) {
        login(data.token, data.role, data.userName, data.id); // Pass userName here
        if (data.role === "Doctor") {
          navigate("/Doctorhomepage"); // Redirect doctor to Doctor's Homepage
        } else {
          navigate("/home"); // Redirect other roles to Home page
        }
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("There was an error processing your request.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="login-title">MediChronicle</h1>{" "}
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={loginInfo.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
