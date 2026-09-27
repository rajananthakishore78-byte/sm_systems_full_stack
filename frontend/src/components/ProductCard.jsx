import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../api";

function formatINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export default function ProductCard({ product }) {
  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group border border-night-700 hover:border-signal/60 bg-night-900 transition-colors flex flex-col"
    >
      <div className="relative viewfinder text-night-600 group-hover:text-signal/70 transition-colors aspect-[4/3] bg-night-800 overflow-hidden">
        <span className="vf-tr" />
        <span className="vf-br" />
        {product.image ? (
          <img
            src={imageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-paper/20">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="7" width="14" height="10" rx="1" />
              <path d="M17 10l4-2v8l-4-2" />
            </svg>
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-alert text-night-950 text-xs font-semibold px-2 py-0.5">
            {discountPct}% OFF
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 bg-night-950/70 flex items-center justify-center text-xs font-semibold tracking-wide text-paper/80">
            OUT OF STOCK
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-signal/80 font-medium">{product.category}</p>
        <h3 className="mt-1 font-display font-medium text-paper leading-snug">{product.name}</h3>
        <div className="mt-auto pt-3 flex items-baseline gap-2 font-mono">
          <span className="text-lg text-paper font-semibold">{formatINR(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-paper/40 line-through">{formatINR(product.mrp)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
