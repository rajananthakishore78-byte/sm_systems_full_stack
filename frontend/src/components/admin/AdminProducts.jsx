import React, { useEffect, useState } from "react";
import { api } from "../../api";
import ImageUploader from "./ImageUploader.jsx";

const emptyForm = {
  id: null,
  name: "",
  category: "",
  price: "",
  mrp: "",
  image: "",
  description: "",
  inStock: true,
  featured: false,
  specs: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startNew() {
    setForm(emptyForm);
    setEditing(true);
    setError("");
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      mrp: product.mrp,
      image: product.image || "",
      description: product.description || "",
      inStock: product.inStock,
      featured: product.featured,
      specs: Object.entries(product.specs || {}).map(([key, value]) => ({ key, value })),
    });
    setEditing(true);
    setError("");
  }

  function updateSpec(i, field, value) {
    setForm((f) => {
      const specs = [...f.specs];
      specs[i] = { ...specs[i], [field]: value };
      return { ...f, specs };
    });
  }

  function addSpecRow() {
    setForm((f) => ({ ...f, specs: [...f.specs, { key: "", value: "" }] }));
  }

  function removeSpecRow(i) {
    setForm((f) => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const specsObj = {};
    form.specs.forEach(({ key, value }) => {
      if (key.trim()) specsObj[key.trim()] = value;
    });

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      mrp: Number(form.mrp || form.price),
      image: form.image,
      description: form.description,
      inStock: form.inStock,
      featured: form.featured,
      specs: specsObj,
    };

    try {
      if (form.id) {
        await api.updateProduct(form.id, payload);
      } else {
        await api.createProduct(payload);
      }
      setEditing(false);
      load();
    } catch (err) {
      setError(err.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await api.deleteProduct(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-display font-semibold text-paper">Products</h2>
        {!editing && (
          <button
            onClick={startNew}
            className="px-4 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light"
          >
            + Add Product
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={onSubmit} className="border border-night-700 bg-night-900 p-5 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-paper/50 mb-1">Product Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block text-xs text-paper/50 mb-1">Category</label>
              <input
                required
                list="category-list"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
              <datalist id="category-list">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs text-paper/50 mb-1">Selling Price (₹)</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block text-xs text-paper/50 mb-1">MRP / Original Price (₹, optional)</label>
              <input
                type="number"
                min="0"
                value={form.mrp}
                onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-paper/50 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
            />
          </div>

          <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs text-paper/50">Specifications</label>
              <button type="button" onClick={addSpecRow} className="text-xs text-signal hover:text-signal-light">
                + Add spec
              </button>
            </div>
            <div className="space-y-2">
              {form.specs.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder="e.g. Resolution"
                    value={spec.key}
                    onChange={(e) => updateSpec(i, "key", e.target.value)}
                    className="flex-1 bg-night-800 border border-night-700 text-paper px-2 py-1.5 text-sm focus:outline-none focus:border-signal"
                  />
                  <input
                    placeholder="e.g. 4MP"
                    value={spec.value}
                    onChange={(e) => updateSpec(i, "value", e.target.value)}
                    className="flex-1 bg-night-800 border border-night-700 text-paper px-2 py-1.5 text-sm focus:outline-none focus:border-signal"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecRow(i)}
                    className="text-paper/40 hover:text-red-400 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-paper/70">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              />
              In stock
            </label>
            <label className="flex items-center gap-2 text-sm text-paper/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Show on homepage (featured)
            </label>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light disabled:opacity-60"
            >
              {saving ? "Saving…" : form.id ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-5 py-2 border border-night-600 text-paper text-sm hover:border-signal"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-paper/40">Loading…</p>
      ) : (
        <div className="border border-night-700 divide-y divide-night-700">
          {products.length === 0 && (
            <p className="p-4 text-sm text-paper/40">No products yet — add your first one above.</p>
          )}
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-paper truncate">{p.name}</p>
                <p className="text-xs text-paper/40">
                  {p.category} · ₹{p.price} {!p.inStock && "· Out of stock"} {p.featured && "· Featured"}
                </p>
              </div>
              <button
                onClick={() => startEdit(p)}
                className="text-xs text-signal hover:text-signal-light px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="text-xs text-paper/40 hover:text-red-400 px-2 py-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
