const express = require("express");
const { readData, writeData } = require("../utils/db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

function generateId() {
  return "o" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// GET /api/offers — public visitors only see active offers by default
router.get("/", (req, res) => {
  let offers = readData("offers") || [];
  if (req.query.all !== "true") {
    offers = offers.filter((o) => o.active);
  }
  res.json(offers);
});

// GET /api/offers/:id
router.get("/:id", (req, res) => {
  const offers = readData("offers") || [];
  const offer = offers.find((o) => o.id === req.params.id);
  if (!offer) return res.status(404).json({ error: "Offer not found." });
  res.json(offer);
});

// POST /api/offers (admin only)
router.post("/", requireAdmin, (req, res) => {
  const offers = readData("offers") || [];
  const body = req.body;

  if (!body.title || !body.description) {
    return res.status(400).json({ error: "title and description are required." });
  }

  const newOffer = {
    id: generateId(),
    title: body.title,
    description: body.description,
    discountText: body.discountText || "",
    image: body.image || "",
    validTill: body.validTill || "",
    active: body.active !== undefined ? !!body.active : true,
  };

  offers.push(newOffer);
  writeData("offers", offers);
  res.status(201).json(newOffer);
});

// PUT /api/offers/:id (admin only)
router.put("/:id", requireAdmin, (req, res) => {
  const offers = readData("offers") || [];
  const idx = offers.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Offer not found." });

  offers[idx] = { ...offers[idx], ...req.body, id: offers[idx].id };
  writeData("offers", offers);
  res.json(offers[idx]);
});

// DELETE /api/offers/:id (admin only)
router.delete("/:id", requireAdmin, (req, res) => {
  const offers = readData("offers") || [];
  const idx = offers.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Offer not found." });

  const [removed] = offers.splice(idx, 1);
  writeData("offers", offers);
  res.json({ message: "Offer deleted.", offer: removed });
});

module.exports = router;
