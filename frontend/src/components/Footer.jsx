import React from "react";
import { Link } from "react-router-dom";
import { useBusiness } from "../context/BusinessContext.jsx";

export default function Footer() {
  const { business } = useBusiness();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night-700 bg-night-900 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <h3 className="font-display font-semibold text-paper text-lg">
            {business.name || "SecureView CCTV"}
          </h3>
          <p className="mt-3 text-sm text-paper/60 leading-relaxed max-w-xs">
            {business.tagline || "Watching over what matters, day and night."}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wide text-signal mb-3">Navigate</h4>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link to="/products" className="hover:text-paper">Products</Link></li>
            <li><Link to="/offers" className="hover:text-paper">Offers</Link></li>
            <li><Link to="/about" className="hover:text-paper">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wide text-signal mb-3">Reach us</h4>
          <ul className="space-y-2 text-sm text-paper/70">
            {business.phone && <li>{business.phone}</li>}
            {business.email && <li>{business.email}</li>}
            {business.address && <li className="max-w-xs">{business.address}</li>}
            {business.workingHours && <li className="text-paper/50">{business.workingHours}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-night-800 py-4 text-center text-xs text-paper/40">
        © {year} {business.name || "SecureView CCTV"}. All rights reserved.
      </div>
    </footer>
  );
}
