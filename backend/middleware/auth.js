const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const ADMIN_FILE = path.join(__dirname, "..", "data", "admin.json");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// Creates the admin account the first time the server ever runs, using the
// username/password from .env. After that, admin.json is the source of truth
// (change the password from the Admin Dashboard, not by editing .env).
function ensureAdminExists() {
  if (fs.existsSync(ADMIN_FILE)) return;

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = bcrypt.hashSync(password, 10);

  fs.writeFileSync(
    ADMIN_FILE,
    JSON.stringify({ username, passwordHash }, null, 2),
    "utf-8"
  );
  console.log(`Admin account created. Username: "${username}" — log in and consider changing the password.`);
}

function getAdmin() {
  const raw = fs.readFileSync(ADMIN_FILE, "utf-8");
  return JSON.parse(raw);
}

function saveAdmin(admin) {
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2), "utf-8");
}

function signToken(username) {
  return jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

// Express middleware: protects any route that only the admin should reach.
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Login required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") throw new Error("Not an admin token");
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expired or invalid. Please log in again." });
  }
}

module.exports = { ensureAdminExists, getAdmin, saveAdmin, signToken, requireAdmin };
