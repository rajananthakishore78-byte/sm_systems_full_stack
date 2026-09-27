const express = require("express");
const { readData, writeData } = require("../utils/db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/categories
router.get("/", (req, res) => {
  res.json(readData("categories") || []);
});

// PUT /api/categories (admin only) — replaces the whole list, e.g. ["Dome Cameras", ...]
router.put("/", requireAdmin, (req, res) => {
  if (!Array.isArray(req.body.categories)) {
    return res.status(400).json({ error: "Body must be { categories: [...] }." });
  }
  writeData("categories", req.body.categories);
  res.json(req.body.categories);
});

module.exports = router;
