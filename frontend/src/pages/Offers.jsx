import React, { useEffect, useState } from "react";
import { api } from "../api";
import OfferCard from "../components/OfferCard.jsx";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getOffers()
      .then(setOffers)
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-display font-semibold text-paper">Offers &amp; Combos</h1>
      <p className="mt-2 text-paper/60 text-sm">
        Bundled deals and seasonal discounts — contact us to redeem any offer below.
      </p>

      <div className="mt-8">
        {loading ? (
          <p className="text-paper/40 text-sm">Loading offers…</p>
        ) : offers.length === 0 ? (
          <p className="text-paper/40 text-sm">No active offers right now — check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
