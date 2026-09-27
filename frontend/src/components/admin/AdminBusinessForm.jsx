import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useBusiness } from "../../context/BusinessContext.jsx";
import ImageUploader from "./ImageUploader.jsx";

export default function AdminBusinessForm() {
  const { business, refresh } = useBusiness();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (business) {
      setForm({
        name: business.name || "",
        tagline: business.tagline || "",
        about: business.about || "",
        whyChooseUs: business.whyChooseUs || [],
        phone: business.phone || "",
        whatsapp: business.whatsapp || "",
        email: business.email || "",
        address: business.address || "",
        mapEmbed: business.mapEmbed || "",
        workingHours: business.workingHours || "",
        logo: business.logo || "",
        heroImage: business.heroImage || "",
        socialLinks: business.socialLinks || { instagram: "", facebook: "", youtube: "" },
      });
    }
  }, [business]);

  if (!form) return <p className="text-sm text-paper/40">Loading…</p>;

  function updatePoint(i, value) {
    setForm((f) => {
      const points = [...f.whyChooseUs];
      points[i] = value;
      return { ...f, whyChooseUs: points };
    });
  }

  function addPoint() {
    setForm((f) => ({ ...f, whyChooseUs: [...f.whyChooseUs, ""] }));
  }

  function removePoint(i) {
    setForm((f) => ({ ...f, whyChooseUs: f.whyChooseUs.filter((_, idx) => idx !== i) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      await api.updateBusiness({
        ...form,
        whyChooseUs: form.whyChooseUs.filter((p) => p.trim()),
      });
      await refresh();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || "Could not save business info.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-display font-semibold text-paper">Business Info</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-paper/50 mb-1">Business Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-paper/50 mb-1">About Your Business</label>
        <textarea
          rows={5}
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs text-paper/50">Why Choose Us (shown as bullet points)</label>
          <button type="button" onClick={addPoint} className="text-xs text-signal hover:text-signal-light">
            + Add point
          </button>
        </div>
        <div className="space-y-2">
          {form.whyChooseUs.map((point, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={point}
                onChange={(e) => updatePoint(i, e.target.value)}
                className="flex-1 bg-night-800 border border-night-700 text-paper px-2 py-1.5 text-sm focus:outline-none focus:border-signal"
              />
              <button type="button" onClick={() => removePoint(i)} className="text-paper/40 hover:text-red-400 px-2">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <ImageUploader value={form.logo} onChange={(url) => setForm({ ...form, logo: url })} label="Logo" />
        <ImageUploader
          value={form.heroImage}
          onChange={(url) => setForm({ ...form, heroImage: url })}
          label="Homepage Hero Image"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-paper/50 mb-1">Phone (with +country code)</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">WhatsApp Number (digits only, country code first)</label>
          <input
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            placeholder="919876543210"
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Working Hours</label>
          <input
            value={form.workingHours}
            onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-paper/50 mb-1">Address</label>
        <textarea
          rows={2}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>

      <div>
        <label className="block text-xs text-paper/50 mb-1">
          Google Maps Embed URL (optional — from Maps "Share → Embed a map")
        </label>
        <input
          value={form.mapEmbed}
          onChange={(e) => setForm({ ...form, mapEmbed: e.target.value })}
          placeholder="https://www.google.com/maps/embed?..."
          className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-paper/50 mb-1">Instagram URL</label>
          <input
            value={form.socialLinks.instagram}
            onChange={(e) =>
              setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })
            }
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Facebook URL</label>
          <input
            value={form.socialLinks.facebook}
            onChange={(e) =>
              setForm({ ...form, socialLinks: { ...form.socialLinks, facebook: e.target.value } })
            }
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">YouTube URL</label>
          <input
            value={form.socialLinks.youtube}
            onChange={(e) =>
              setForm({ ...form, socialLinks: { ...form.socialLinks, youtube: e.target.value } })
            }
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && <p className="text-sm text-signal">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Business Info"}
      </button>
    </form>
  );
}
