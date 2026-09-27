import React from "react";
import { imageUrl } from "../api";

export default function OfferCard({ offer }) {
  const validTill = offer.validTill
    ? new Date(offer.validTill).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="border border-night-700 bg-night-900 flex flex-col sm:flex-row overflow-hidden">
      <div className="sm:w-56 aspect-[4/3] sm:aspect-auto bg-night-800 flex items-center justify-center shrink-0">
        {offer.image ? (
          <img src={imageUrl(offer.image)} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-paper/20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12l2-7h14l2 7M3 12v7a1 1 0 001 1h16a1 1 0 001-1v-7M3 12h18" />
          </svg>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-semibold text-lg text-paper">{offer.title}</h3>
          {offer.discountText && (
            <span className="shrink-0 bg-alert text-night-950 text-xs font-semibold px-2 py-1">
              {offer.discountText}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-paper/70 leading-relaxed">{offer.description}</p>
        {validTill && (
          <p className="mt-auto pt-3 text-xs text-paper/40 font-mono">Valid till {validTill}</p>
        )}
      </div>
    </div>
  );
}
