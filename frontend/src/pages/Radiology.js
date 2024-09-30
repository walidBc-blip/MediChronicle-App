import React, { useEffect, useState } from "react";
import "./Radiology.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXRay } from "@fortawesome/free-solid-svg-icons";

const Radiology = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const radiologyResults = [
    {
      test: "X-Ray",
      result: "Normal",
      date: "January 15, 2024",
      doctor: "Dr. Smith",
    },
    {
      test: "MRI",
      result: "Abnormal",
      date: "February 10, 2024",
      doctor: "Dr. Johnson",
    },
    {
      test: "CT Scan",
      result: "Normal",
      date: "March 5, 2024",
      doctor: "Dr. Lee",
    },
    {
      test: "Ultrasound",
      result: "Abnormal",
      date: "April 20, 2024",
      doctor: "Dr. Garcia",
    },
  ];

  return (
    <div className="radiology">
      <h2>
        <FontAwesomeIcon icon={faXRay} /> Radiology Results
      </h2>
      <ul className="radiology-list">
        {radiologyResults.map((result, index) => (
          <li key={index} className="radiology-item">
            <p className="test">Test: {result.test}</p>
            <p className="result">Result: {result.result}</p>
            <p className="date">Date Taken: {result.date}</p>
            <p className="doctor">Issued By: {result.doctor}</p>
          </li>
        ))}
      </ul>
      <a href="/" className="home-link">
        Go to Homepage
      </a>
    </div>
  );
};

export default Radiology;
