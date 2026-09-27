import React, { useState } from "react";
import { api, imageUrl } from "../../api";

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs text-paper/50 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 bg-night-800 border border-night-700 shrink-0 flex items-center justify-center overflow-hidden">
          {value ? (
            <img src={imageUrl(value)} alt="" className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-paper/20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="7" width="14" height="10" rx="1" />
              <path d="M17 10l4-2v8l-4-2" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="text-xs text-paper/60 file:mr-3 file:px-3 file:py-1.5 file:border-0 file:bg-night-700 file:text-paper file:text-xs file:cursor-pointer"
          />
          {uploading && <p className="text-xs text-signal mt-1">Uploading…</p>}
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-paper/40 hover:text-red-400 mt-1"
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
