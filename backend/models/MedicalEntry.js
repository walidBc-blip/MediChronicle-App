const mongoose = require("mongoose");

const medicalEntrySchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String },
  date: { type: Date, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  prescription: [
    {
      medication: { type: String, required: false },
      dosage: { type: String, required: false },
    },
  ],
  nonPharmacologicalTreatments: String,
  doctorName: { type: String, required: true },
  doctorSpecialization: { type: String, required: true },
  doctorContact: { type: String, required: true },
  followUpInstructions: String,
  hospitalName: { type: String, required: true },
  attachments: [String],
});

const MedicalEntry = mongoose.model("MedicalEntry", medicalEntrySchema);

module.exports = MedicalEntry;
