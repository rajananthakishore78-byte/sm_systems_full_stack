const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

// Reads a JSON "table" (e.g. "products") and returns its parsed contents.
function readData(name) {
  const file = filePath(name);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  return raw.trim() ? JSON.parse(raw) : null;
}

// Writes a JS value back to a JSON "table", pretty-printed so it stays
// easy to open and hand-edit if you ever want to.
function writeData(name, data) {
  const file = filePath(name);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readData, writeData, DATA_DIR };
