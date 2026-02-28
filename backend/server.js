const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const Url = require("./models/Url");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/url", urlRoutes);

// redirect route
app.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));