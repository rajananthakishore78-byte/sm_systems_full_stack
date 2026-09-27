import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminProducts from "../components/admin/AdminProducts.jsx";
import AdminOffers from "../components/admin/AdminOffers.jsx";
import AdminBusinessForm from "../components/admin/AdminBusinessForm.jsx";
import AdminCategories from "../components/admin/AdminCategories.jsx";
import AdminSettings from "../components/admin/AdminSettings.jsx";

const tabs = [
  { key: "products", label: "Products", Component: AdminProducts },
  { key: "offers", label: "Offers", Component: AdminOffers },
  { key: "business", label: "Business Info", Component: AdminBusinessForm },
  { key: "categories", label: "Categories", Component: AdminCategories },
  { key: "settings", label: "Settings", Component: AdminSettings },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("products");
  const ActiveComponent = tabs.find((t) => t.key === active).Component;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-semibold text-paper">Admin Dashboard</h1>
        <Link to="/" className="text-sm text-paper/50 hover:text-signal">
          ← Back to site
        </Link>
      </div>

      <div className="flex gap-6">
        <nav className="w-44 shrink-0 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`w-full text-left px-3 py-2 text-sm ${
                active === t.key
                  ? "bg-night-900 text-signal border-l-2 border-signal"
                  : "text-paper/60 hover:text-paper border-l-2 border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 min-w-0">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
