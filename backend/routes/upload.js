const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, safeName);
  },
});

const ALLOWED_TYPES = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_TYPES.includes(ext)) {
      return cb(new Error("Only image files (jpg, png, webp, gif) are allowed."));
    }
    cb(null, true);
  },
});

// POST /api/upload  (admin only, field name: "image")
router.post("/", requireAdmin, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image file received." });
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

module.exports = router;
