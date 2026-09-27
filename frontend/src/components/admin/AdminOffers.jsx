import React, { useEffect, useState } from "react";
import { api } from "../../api";
import ImageUploader from "./ImageUploader.jsx";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  discountText: "",
  image: "",
  validTill: "",
  active: true,
};

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .getOffers(true)
      .then(setOffers)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startNew() {
    setForm(emptyForm);
    setEditing(true);
    setError("");
  }

  function startEdit(offer) {
    setForm({ ...offer });
    setEditing(true);
    setError("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      discountText: form.discountText,
      image: form.image,
      validTill: form.validTill,
      active: form.active,
    };

    try {
      if (form.id) {
        await api.updateOffer(form.id, payload);
      } else {
        await api.createOffer(payload);
      }
      setEditing(false);
      load();
    } catch (err) {
      setError(err.message || "Could not save offer.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Delete this offer? This cannot be undone.")) return;
    await api.deleteOffer(id);
    load();
  }

  async function toggleActive(offer) {
    await api.updateOffer(offer.id, { active: !offer.active });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-display font-semibold text-paper">Offers</h2>
        {!editing && (
          <button
            onClick={startNew}
            className="px-4 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light"
          >
            + Add Offer
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={onSubmit} className="border border-night-700 bg-night-900 p-5 mb-8 space-y-4">
          <div>
            <label className="block text-xs text-paper/50 mb-1">Offer Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
            />
          </div>

          <div>
            <label className="block text-xs text-paper/50 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-paper/50 mb-1">
                Discount Badge Text (e.g. "Flat 15% off")
              </label>
              <input
                value={form.discountText}
                onChange={(e) => setForm({ ...form, discountText: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block text-xs text-paper/50 mb-1">Valid Till (optional)</label>
              <input
                type="date"
                value={form.validTill}
                onChange={(e) => setForm({ ...form, validTill: e.target.value })}
                className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
              />
            </div>
          </div>

          <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

          <label className="flex items-center gap-2 text-sm text-paper/70">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Active (visible to customers)
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light disabled:opacity-60"
            >
              {saving ? "Saving…" : form.id ? "Save Changes" : "Add Offer"}
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
          {offers.length === 0 && (
            <p className="p-4 text-sm text-paper/40">No offers yet — add your first one above.</p>
          )}
          {offers.map((o) => (
            <div key={o.id} className="flex items-center gap-4 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-paper truncate">{o.title}</p>
                <p className="text-xs text-paper/40">
                  {o.discountText} {o.validTill && `· till ${o.validTill}`} {!o.active && "· Inactive"}
                </p>
              </div>
              <button
                onClick={() => toggleActive(o)}
                className="text-xs text-paper/60 hover:text-signal px-2 py-1"
              >
                {o.active ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => startEdit(o)}
                className="text-xs text-signal hover:text-signal-light px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(o.id)}
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
