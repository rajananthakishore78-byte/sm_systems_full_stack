import React, { useState } from "react";
import { api } from "../../api";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";

export default function AdminSettings() {
  const { logout, username } = useAdminAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSaving(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSaved(true);
    } catch (err) {
      setError(err.message || "Could not change password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-sm">
      <h2 className="text-lg font-display font-semibold text-paper mb-1">Account Settings</h2>
      <p className="text-sm text-paper/50 mb-5">Logged in as {username}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-paper/50 mb-1">Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">New Password (min. 6 characters)</label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Confirm New Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-night-800 border border-night-700 text-paper px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {saved && <p className="text-sm text-signal">Password updated.</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-signal text-night-950 text-sm font-semibold hover:bg-signal-light disabled:opacity-60"
        >
          {saving ? "Saving…" : "Change Password"}
        </button>
      </form>

      <button onClick={logout} className="mt-10 text-sm text-paper/50 hover:text-red-400">
        Log out
      </button>
    </div>
  );
}
