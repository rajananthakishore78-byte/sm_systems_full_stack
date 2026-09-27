const express = require("express");
const { readData, writeData } = require("../utils/db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

function generateId() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// GET /api/products  — supports ?category= and ?search= and ?featured=true
router.get("/", (req, res) => {
  let products = readData("products") || [];
  const { category, search, featured } = req.query;

  if (category) {
    products = products.filter((p) => p.category === category);
  }
  if (featured === "true") {
    products = products.filter((p) => p.featured);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }

  res.json(products);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const products = readData("products") || [];
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found." });
  res.json(product);
});

// POST /api/products  (admin only)
router.post("/", requireAdmin, (req, res) => {
  const products = readData("products") || [];
  const body = req.body;

  if (!body.name || body.price === undefined || !body.category) {
    return res.status(400).json({ error: "name, category and price are required." });
  }

  const newProduct = {
    id: generateId(),
    name: body.name,
    category: body.category,
    price: Number(body.price),
    mrp: body.mrp !== undefined ? Number(body.mrp) : Number(body.price),
    image: body.image || "",
    description: body.description || "",
    specs: body.specs || {},
    inStock: body.inStock !== undefined ? !!body.inStock : true,
    featured: !!body.featured,
  };

  products.push(newProduct);
  writeData("products", products);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id  (admin only)
router.put("/:id", requireAdmin, (req, res) => {
  const products = readData("products") || [];
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Product not found." });

  const body = req.body;
  products[idx] = {
    ...products[idx],
    ...body,
    price: body.price !== undefined ? Number(body.price) : products[idx].price,
    mrp: body.mrp !== undefined ? Number(body.mrp) : products[idx].mrp,
    id: products[idx].id, // id is never editable
  };

  writeData("products", products);
  res.json(products[idx]);
});

// DELETE /api/products/:id  (admin only)
router.delete("/:id", requireAdmin, (req, res) => {
  const products = readData("products") || [];
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Product not found." });

  const [removed] = products.splice(idx, 1);
  writeData("products", products);
  res.json({ message: "Product deleted.", product: removed });
});

module.exports = router;
