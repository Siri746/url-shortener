const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const shortid = require("shortid");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  try {
    const shortCode = shortid.generate();

    const newUrl = new Url({
      longUrl,
      shortCode,
    });

    await newUrl.save();

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;