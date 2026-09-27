const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeaders() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  // ---- Public reads ----
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/api/products${qs ? `?${qs}` : ""}`).then(handle);
  },
  getProduct: (id) => fetch(`${API_BASE}/api/products/${id}`).then(handle),
  getOffers: (all = false) =>
    fetch(`${API_BASE}/api/offers${all ? "?all=true" : ""}`).then(handle),
  getBusiness: () => fetch(`${API_BASE}/api/business`).then(handle),
  getCategories: () => fetch(`${API_BASE}/api/categories`).then(handle),

  // ---- Auth ----
  login: (username, password) =>
    fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(handle),
  changePassword: (currentPassword, newPassword) =>
    fetch(`${API_BASE}/api/auth/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ currentPassword, newPassword }),
    }).then(handle),

  // ---- Admin: products ----
  createProduct: (product) =>
    fetch(`${API_BASE}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(product),
    }).then(handle),
  updateProduct: (id, product) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(product),
    }).then(handle),
  deleteProduct: (id) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    }).then(handle),

  // ---- Admin: offers ----
  createOffer: (offer) =>
    fetch(`${API_BASE}/api/offers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(offer),
    }).then(handle),
  updateOffer: (id, offer) =>
    fetch(`${API_BASE}/api/offers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(offer),
    }).then(handle),
  deleteOffer: (id) =>
    fetch(`${API_BASE}/api/offers/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    }).then(handle),

  // ---- Admin: business info & categories ----
  updateBusiness: (business) =>
    fetch(`${API_BASE}/api/business`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(business),
    }).then(handle),
  updateCategories: (categories) =>
    fetch(`${API_BASE}/api/categories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ categories }),
    }).then(handle),

  // ---- Admin: image upload ----
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: formData,
    }).then(handle);
  },
};

export function imageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

export { API_BASE };
