import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useBusiness } from "../context/BusinessContext.jsx";
import { imageUrl } from "../api";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { business } = useBusiness();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-night-950/95 backdrop-blur border-b border-night-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <img
              src={business.logo ? imageUrl(business.logo) : "/logo.png"}
              alt={business.name || "SM Systems"}
              className="w-9 h-9 object-contain bg-white"
            />
            <span className="font-display font-semibold text-lg tracking-tight text-paper">
              {business.name || "SM Systems"}
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-signal" : "text-paper/70 hover:text-paper"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {business.phone && (
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="ml-3 px-4 py-2 text-sm font-semibold bg-signal text-night-950 hover:bg-signal-light transition-colors"
              >
                Call Now
              </a>
            )}
          </nav>

          <button
            className="md:hidden text-paper p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-night-700 px-4 pb-4 flex flex-col">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 text-sm font-medium border-b border-night-800 ${
                  isActive ? "text-signal" : "text-paper/80"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
