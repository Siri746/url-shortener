const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const urlRoutes = require("./routes/urlRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/url", urlRoutes);

// root route
app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});