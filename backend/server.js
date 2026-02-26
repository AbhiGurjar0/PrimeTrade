const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
require("dotenv").config();
// connect to database
connectDB();


const app = express();
const PORT = 3000;

// middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    origin:"https://primetrade-dy01.onrender.com",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// example API
app.get("/api/test", (req, res) => {
  res.json({
    message: "API working",
    status: "success",
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
