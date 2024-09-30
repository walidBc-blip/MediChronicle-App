const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Admin"],
    required: true,
  },
  patientId: {
    type: String,
    unique: true,
    sparse: true, // the index will only be enforced on documents with a patientId
  },
  doctorId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // other fields
});

userSchema.pre("save", function (next) {
  // only generate ID if its a new user
  if (this.isNew) {
    if (this.role === "Patient") {
      this.patientId = "P-" + shortid.generate();
    } else if (this.role === "Doctor") {
      this.doctorId = "D-" + shortid.generate();
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
