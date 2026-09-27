import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newCat, setNewCat] = useState("");

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  function updateCat(i, value) {
    setCategories((c) => c.map((cat, idx) => (idx === i ? value : cat)));
  }

  function removeCat(i) {
    setCategories((c) => c.filter((_, idx) => idx !== i));
  }

  function addCat() {
    if (!newCat.trim()) return;
    setCategories((c) => [...c, newCat.trim()]);
    setNewCat("");
  }

  async function save() {
    setSaving(true);
    try {
      await api.updateCategories(categories.filter((c) => c.trim()));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-display font-semibold text-paper mb-5">Product Categories</h2>
      <p className="text-sm text-paper/50 mb-4">
        These appear as filters on the Products page. Renaming a category here won't rename it on
        existing products — update those from the Products tab if needed.
      </p>

      <div className="space-y-2 mb-4">
        {categories.map((cat, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={cat}
              onChange={(e) => updateCat(i, e.target.value)}
              className="flex-1 bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
            />
            <button onClick={() => removeCat(i)} className="text-paper/40 hover:text-red-400 px-2">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="New category name"
          className="flex-1 bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
        <button onClick={addCat} className="px-4 py-2 border border-night-600 text-paper text-sm hover:border-signal">
          Add
        </button>
      </div>

      {saved && <p className="text-sm text-signal mb-3">Saved.</p>}

      <button
        onClick={save}
        disabled={saving}
        className="px-5 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Categories"}
      </button>
    </div>
  );
}
