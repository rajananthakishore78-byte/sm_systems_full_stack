import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    api
      .getProducts(params)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  function setCategory(cat) {
    const params = {};
    if (cat) params.category = cat;
    if (search) params.search = search;
    setSearchParams(params);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    setSearchParams(params);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-display font-semibold text-paper">All Products</h1>
      <p className="mt-2 text-paper/60 text-sm">
        Cameras, recorders, cables and accessories — filter by category or search by name.
      </p>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <form onSubmit={onSearchSubmit} className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-night-900 border border-night-700 text-paper text-sm px-3 py-2 focus:outline-none focus:border-signal"
            />
          </form>

          <h3 className="text-xs font-semibold tracking-wide text-signal mb-3">Category</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setCategory("")}
                className={`text-sm text-left w-full px-2 py-1.5 ${
                  !activeCategory ? "text-signal" : "text-paper/70 hover:text-paper"
                }`}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`text-sm text-left w-full px-2 py-1.5 ${
                    activeCategory === cat ? "text-signal" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          {loading ? (
            <p className="text-paper/40 text-sm">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-paper/40 text-sm">No products match that filter yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
