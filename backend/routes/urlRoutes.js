const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json("Long URL is required");
    }

    const shortCode = shortid.generate();

    const url = new Url({
      longUrl,
      shortCode,
    });

    await url.save();

    res.status(201).json({
      longUrl,
      shortCode,
      shortUrl: `http://localhost:5000/${shortCode}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
