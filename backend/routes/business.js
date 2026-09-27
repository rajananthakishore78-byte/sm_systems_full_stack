const express = require("express");
const { readData, writeData } = require("../utils/db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/business
router.get("/", (req, res) => {
  const business = readData("business") || {};
  res.json(business);
});

// PUT /api/business (admin only) — updates any subset of fields
router.put("/", requireAdmin, (req, res) => {
  const business = readData("business") || {};
  const updated = { ...business, ...req.body };
  writeData("business", updated);
  res.json(updated);
});

module.exports = router;
