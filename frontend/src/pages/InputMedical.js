import React, { useState } from "react";
import "./InputMedical.css";

const MedicalEntryForm = ({ onAddMedicalEntry }) => {
  const [entryDetails, setEntryDetails] = useState({
    patientName: "",
    patientId: "",
    date: "",
    symptoms: "",
    diagnosis: "",
    prescription: [{ medication: "", dosage: "" }],
    nonPharmacologicalTreatments: "",
    doctorName: "",
    doctorSpecialization: "",
    doctorContact: "",
    followUpInstructions: "",
    hospitalName: "",
    attachments: [],
  });

  // Add  key state for the file input
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith("medication") || name.startsWith("dosage")) {
      // Handle prescription medications and dosages
      const index = parseInt(name.split("-")[1]);
      const key = name.split("-")[0];
      const updatedPrescription = [...entryDetails.prescription];
      updatedPrescription[index][key] = value;
      setEntryDetails((prev) => ({
        ...prev,
        prescription: updatedPrescription,
      }));
    } else if (files) {
      setEntryDetails((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
    } else {
      setEntryDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddMedication = () => {
    setEntryDetails((prev) => ({
      ...prev,
      prescription: [...prev.prescription, { medication: "", dosage: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out any empty prescription entries
    const filledPrescriptions = entryDetails.prescription.filter(
      (prescription) =>
        prescription.medication.trim() && prescription.dosage.trim()
    );

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("patientName", entryDetails.patientName);
    formData.append("patientId", entryDetails.patientId);
    formData.append("date", entryDetails.date);
    formData.append("symptoms", entryDetails.symptoms);
    formData.append("diagnosis", entryDetails.diagnosis);

    // Append only filled prescriptions
    filledPrescriptions.forEach((prescription, index) => {
      formData.append(
        `prescription[${index}][medication]`,
        prescription.medication
      );
      formData.append(`prescription[${index}][dosage]`, prescription.dosage);
    });

    formData.append(
      "nonPharmacologicalTreatments",
      entryDetails.nonPharmacologicalTreatments
    );
    formData.append("doctorName", entryDetails.doctorName);
    formData.append("doctorSpecialization", entryDetails.doctorSpecialization);
    formData.append("doctorContact", entryDetails.doctorContact);
    formData.append("followUpInstructions", entryDetails.followUpInstructions);
    formData.append("hospitalName", entryDetails.hospitalName);
    entryDetails.attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await fetch("/api/medical-entries/add-entry", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Medical entry added successfully!");
        setEntryDetails({
          patientName: "",
          patientId: "",
          date: "",
          symptoms: "",
          diagnosis: "",
          prescription: [{ medication: "", dosage: "" }],
          nonPharmacologicalTreatments: "",
          doctorName: "",
          doctorSpecialization: "",
          doctorContact: "",
          followUpInstructions: "",
          hospitalName: "",
          attachments: [],
        });

        // Reset the file input by changing the key
        setFileInputKey(Date.now());
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error submitting medical entry:", error);
      alert("Error submitting medical entry. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Patient Name:
        <input
          type="text"
          name="patientName"
          value={entryDetails.patientName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Patient ID:
        <input
          type="text"
          name="patientId"
          value={entryDetails.patientId}
          onChange={handleChange}
        />
      </label>
      <label>
        Date of Consultation:
        <input
          type="date"
          name="date"
          value={entryDetails.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Symptoms:
        <textarea
          name="symptoms"
          value={entryDetails.symptoms}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Diagnosis:
        <input
          type="text"
          name="diagnosis"
          value={entryDetails.diagnosis}
          onChange={handleChange}
          required
        />
      </label>
      {entryDetails.prescription.map((item, index) => (
        <React.Fragment key={index}>
          <label>
            Medication Name:
            <input
              type="text"
              name={`medication-${index}`}
              value={item.medication}
              onChange={handleChange}
            />
          </label>
          <label>
            Dosage:
            <input
              type="text"
              name={`dosage-${index}`}
              value={item.dosage}
              onChange={handleChange}
            />
          </label>
        </React.Fragment>
      ))}
      <button
        type="button"
        onClick={handleAddMedication}
        style={{ marginBottom: "10px" }}
      >
        Add Another Medication
      </button>
      <label>
        Non-pharmacological Treatments:
        <input
          type="text"
          name="nonPharmacologicalTreatments"
          value={entryDetails.nonPharmacologicalTreatments}
          onChange={handleChange}
        />
      </label>
      <label>
        Doctor's Name:
        <input
          type="text"
          name="doctorName"
          value={entryDetails.doctorName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Doctor's Specialization:
        <input
          type="text"
          name="doctorSpecialization"
          value={entryDetails.doctorSpecialization}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Doctor's Contact Information:
        <input
          type="text"
          name="doctorContact"
          value={entryDetails.doctorContact}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Follow-up Instructions:
        <textarea
          name="followUpInstructions"
          value={entryDetails.followUpInstructions}
          onChange={handleChange}
        />
      </label>
      <label>
        Hospital/Clinic Name:
        <input
          type="text"
          name="hospitalName"
          value={entryDetails.hospitalName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Attach Reports:
        <input
          type="file"
          name="attachments"
          onChange={handleChange}
          multiple
          key={fileInputKey}
        />
      </label>
      <button type="submit">Add Medical Entry</button>
    </form>
  );
};

export default MedicalEntryForm;
