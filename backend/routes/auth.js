const express = require("express");
const bcrypt = require("bcryptjs");
const { getAdmin, saveAdmin, signToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const admin = getAdmin();
  if (username !== admin.username) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const valid = bcrypt.compareSync(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = signToken(admin.username);
  res.json({ token, username: admin.username });
});

// PUT /api/auth/password  (change password, must be logged in)
router.put("/password", requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required." });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }

  const admin = getAdmin();
  const valid = bcrypt.compareSync(currentPassword, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Current password is incorrect." });
  }

  admin.passwordHash = bcrypt.hashSync(newPassword, 10);
  saveAdmin(admin);
  res.json({ message: "Password updated." });
});

module.exports = router;
