import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="font-mono text-signal text-sm">SIGNAL LOST</p>
      <h1 className="mt-3 text-3xl font-display font-semibold text-paper">Page not found</h1>
      <p className="mt-3 text-paper/60">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-signal hover:text-signal-light">
        ← Back to home
      </Link>
    </div>
  );
}
