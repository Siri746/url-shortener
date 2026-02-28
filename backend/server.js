const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

// VERY IMPORTANT
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

connectDB();

app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));