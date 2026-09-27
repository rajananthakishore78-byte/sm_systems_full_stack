import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, imageUrl } from "../api";
import ProductCard from "../components/ProductCard.jsx";
import OfferCard from "../components/OfferCard.jsx";
import { useBusiness } from "../context/BusinessContext.jsx";

export default function Home() {
  const { business } = useBusiness();
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    api.getProducts({ featured: "true" }).then(setFeatured).catch(() => {});
    api.getOffers().then((data) => setOffers(data.slice(0, 2))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-night-700 bg-night-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-signal border border-signal/40 px-3 py-1">
              <span className="rec-dot" /> LIVE &amp; RECORDING
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl font-display font-semibold text-paper leading-[1.1]">
              {business.tagline || "Watching over what matters, day and night."}
            </h1>
            <p className="mt-5 text-paper/60 max-w-md leading-relaxed">
              {business.about
                ? business.about.slice(0, 160) + (business.about.length > 160 ? "…" : "")
                : "Cameras, DVR/NVR systems, wiring and every accessory you need — with a team that helps you pick the right setup."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-6 py-3 bg-signal text-night-950 font-semibold hover:bg-signal-light transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/offers"
                className="px-6 py-3 border border-night-600 text-paper font-semibold hover:border-signal hover:text-signal transition-colors"
              >
                View Offers
              </Link>
            </div>
          </div>

          <div className="relative viewfinder text-signal aspect-[4/3] bg-night-900 border border-night-700">
            <span className="vf-tr" />
            <span className="vf-br" />
            {business.heroImage ? (
              <img src={imageUrl(business.heroImage)} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-paper/30">
                <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="6" width="15" height="12" rx="1" />
                  <path d="M17 10l5-3v10l-5-3" />
                </svg>
                <p className="text-xs font-mono">CAM 01 — ENTRANCE</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      {Array.isArray(business.whyChooseUs) && business.whyChooseUs.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {business.whyChooseUs.map((point, i) => (
            <div key={i} className="border border-night-700 p-4 text-sm text-paper/70">
              <span className="text-signal font-mono text-xs">0{i + 1}</span>
              <p className="mt-2 leading-snug">{point}</p>
            </div>
          ))}
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold text-paper">Popular Picks</h2>
            <Link to="/products" className="text-sm text-signal hover:text-signal-light">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Offers preview */}
      {offers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold text-paper">Current Offers</h2>
            <Link to="/offers" className="text-sm text-signal hover:text-signal-light">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
