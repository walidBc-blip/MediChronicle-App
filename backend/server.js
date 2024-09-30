// const app = require("./socket/socket.js");

// const server = require("./socket/socket.js");

const { app, server } = require("./socket/socket.js");
const messageRoutes = require("./routes/message.routes.js");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const app = express();
const port = 3001; // make sure this does not conflict with your React app's port

// Body parsing middleware to parse JSON
app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://admin:mediadmin@cluster0.3qsyp1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const medicalRoutes = require("./routes/medicalEntry");
app.use("/api/medical-entries", medicalRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/docs", express.static("docs"));

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
