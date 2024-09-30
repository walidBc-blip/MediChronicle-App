const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const MedicalEntry = require("../models/MedicalEntry");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Uploading file:", file.originalname);
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      console.log("Saving file as:", filename);
      cb(null, filename);
    },
  }),
});

const router = express.Router();

router.post(
  "/add-entry",
  upload.array("attachments"),
  [
    body("patientName").not().isEmpty().trim().escape(),
    // add more validators as needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const entryData = {
        ...req.body,
        prescription: req.body.prescription || [],
        attachments: req.files.map((file) => file.path),
      };

      console.log("Received data for new entry:", entryData);
      const newEntry = new MedicalEntry(entryData);
      await newEntry.save();
      console.log("New medical entry added:", newEntry);
      res.status(201).send({ message: "Medical entry added successfully!" });
    } catch (error) {
      console.error("Error saving new entry:", error);
      res.status(400).send({ error: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const { patientName } = req.query;
    console.log("Fetching medical entries for patient:", patientName);
    if (!patientName) {
      console.log("No patient name provided in query");
      return res.status(400).json({ message: "Patient name is required" });
    }
    const entries = await MedicalEntry.find({ patientName: patientName });
    console.log("Found entries:", entries);
    res.json(entries);
  } catch (error) {
    console.error("Error fetching medical entries:", error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch unique doctors for a specific patient
router.get("/my-doctors/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const entries = await MedicalEntry.find({ patientName: userName });
    const doctors = entries.map((entry) => ({
      name: entry.doctorName,
      specialization: entry.doctorSpecialization,
      contact: entry.doctorContact,
      hospital: entry.hospitalName,
    }));

    // Remove duplicates
    const uniqueDoctors = Array.from(new Set(doctors.map((a) => a.name))).map(
      (name) => {
        return doctors.find((a) => a.name === name);
      }
    );

    console.log("Unique doctors for patient:", uniqueDoctors);
    res.json(uniqueDoctors);
  } catch (error) {
    console.error("Error fetching doctors for patient:", error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
