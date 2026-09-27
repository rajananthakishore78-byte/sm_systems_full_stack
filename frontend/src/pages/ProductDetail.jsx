import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, imageUrl } from "../api";
import InquiryButtons from "../components/InquiryButtons.jsx";

function formatINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | notfound

  useEffect(() => {
    setStatus("loading");
    api
      .getProduct(id)
      .then((data) => {
        setProduct(data);
        setStatus("ok");
      })
      .catch(() => setStatus("notfound"));
  }, [id]);

  if (status === "loading") {
    return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-paper/40 text-sm">Loading…</div>;
  }

  if (status === "notfound") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-paper/60">This product isn't available anymore.</p>
        <Link to="/products" className="text-signal hover:text-signal-light mt-3 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/products" className="text-sm text-paper/50 hover:text-signal">
        ← Back to products
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        <div className="relative viewfinder text-signal/70 aspect-square bg-night-900 border border-night-700">
          <span className="vf-tr" />
          <span className="vf-br" />
          {product.image ? (
            <img src={imageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-paper/20">
              <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="7" width="14" height="10" rx="1" />
                <path d="M17 10l4-2v8l-4-2" />
              </svg>
            </div>
          )}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-alert text-night-950 text-xs font-semibold px-2 py-1">
              {discountPct}% OFF
            </span>
          )}
        </div>

        <div>
          <p className="text-xs text-signal font-medium">{product.category}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-display font-semibold text-paper">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3 font-mono">
            <span className="text-2xl text-paper font-semibold">{formatINR(product.price)}</span>
            {hasDiscount && (
              <span className="text-paper/40 line-through">{formatINR(product.mrp)}</span>
            )}
          </div>

          <p className="mt-2 text-xs">
            {product.inStock ? (
              <span className="text-signal">● In stock</span>
            ) : (
              <span className="text-paper/40">● Out of stock</span>
            )}
          </p>

          <p className="mt-5 text-paper/70 leading-relaxed">{product.description}</p>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6 border border-night-700 divide-y divide-night-700">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-paper/50">{key}</span>
                  <span className="text-paper font-mono">{val}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <InquiryButtons productName={product.name} />
            <p className="mt-3 text-xs text-paper/40">
              We don't process payments online — reach out and our team will confirm price, stock and installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
