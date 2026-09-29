require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { ensureAdminExists } = require("./middleware/auth");

ensureAdminExists();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: CLIENT_ORIGINS.length === 1 ? CLIENT_ORIGINS[0] : CLIENT_ORIGINS,
  })
);
app.use(express.json());

// Serve uploaded product/offer images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/offers", require("./routes/offers"));
app.use("/api/business", require("./routes/business"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/upload", require("./routes/upload"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`CCTV shop API running on http://localhost:${PORT}`);
});
