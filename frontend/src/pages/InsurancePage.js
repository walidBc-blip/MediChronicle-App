import React from "react";
import "./InsurancePage.css";

const API_BASE_URL = "http://localhost:3001"; // Adjust as necessary

const patientInsurance = {
  plan: {
    name: "Comprehensive Health Coverage",
    description: "Full medical, dental, and vision coverage with a $10 co-pay.",
    benefits: [
      "Annual health check-ups",
      "Dental cleaning twice a year",
      "Access to all specialists with referral",
      "Vision exams and hardware coverage up to $300 annually",
    ],
    contact: {
      phone: "1-800-INSURANCE",
      email: "support@insuranceco.com",
      web: "www.insuranceco.com/portal",
    },
  },
  documents: [
    { title: "Policy Document", url: "/docs/policy.pdf" },
    { title: "Insurance Card", url: "/docs/insurance-card.pdf" },
  ],
  claims: [
    {
      id: 1,
      date: "2024-03-01",
      type: "Dental",
      status: "Processed",
      amount: "$120",
    },
  ],
};

const InsurancePage = () => {
  const { plan, documents, claims } = patientInsurance;

  return (
    <div className="insurance-page">
      <h1>My Insurance Plan</h1>
      <div className="plan-details">
        <h2>{plan.name}</h2>
        <p>{plan.description}</p>
        <h3>Benefits:</h3>
        <ul>
          {plan.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <h3>Contact Information:</h3>
        <p>Phone: {plan.contact.phone}</p>
        <p>
          Email:{" "}
          <a href={`mailto:${plan.contact.email}`}>{plan.contact.email}</a>
        </p>
        <p>
          Website:{" "}
          <a href={plan.contact.web} target="_blank" rel="noopener noreferrer">
            {plan.contact.web}
          </a>
        </p>
      </div>
      <div className="insurance-documents">
        <h3>Important Documents:</h3>
        {documents.map((doc, index) => (
          <a
            key={index}
            href={`${API_BASE_URL}${doc.url}`}
            className="document-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {doc.title}
          </a>
        ))}
      </div>
      <div className="claims-history">
        <h3>Recent Claims:</h3>
        <ul>
          {claims.map((claim) => (
            <li key={claim.id}>
              {claim.date} - {claim.type} - {claim.status} - {claim.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsurancePage;
