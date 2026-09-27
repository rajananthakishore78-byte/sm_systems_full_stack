# SecureView CCTV — Website (React + Node)

A full-stack website for a CCTV camera & accessories business: a public storefront (product
catalog, pricing, offers, about, contact) and a password-protected Admin Dashboard where you
update products, prices, images, offers and business info yourself — no code required after
setup.

```
cctv-shop/
├── backend/     Express API + JSON data files ("database") + image uploads
└── frontend/    React (Vite) storefront + Admin Dashboard
```

## How it's built

- **No database to install.** Products, offers, categories and your business info live in plain
  JSON files under `backend/data/`. The Admin Dashboard reads and writes these files for you.
  (You never need to open them by hand, though you can — they're just readable JSON.)
- **No online payments.** Every product has "WhatsApp / Call / Email" buttons instead of a cart,
  matching a business that closes sales by phone/WhatsApp and handles installation in person.
- **Image uploads** go through the Admin Dashboard and are stored in `backend/uploads/`, served
  by the API.

---

## 1. Prerequisites

Install [Node.js](https://nodejs.org) version 18 or later (includes `npm`). Check with:

```bash
node -v
```

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set:
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login (used only the very first time the
  server starts; change the password later from the Dashboard's Settings tab, not by editing this
  file again).
- `JWT_SECRET` — replace with any long random string.
- `CLIENT_ORIGIN` — the URL your frontend runs on (`http://localhost:5173` for local dev).

Start the API:

```bash
npm run dev
```

You should see `CCTV shop API running on http://localhost:5000`.

## 3. Frontend setup

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). The storefront loads sample products
and offers immediately — replace them with your own from the Admin Dashboard.

## 4. Log in to the Admin Dashboard

Go to `http://localhost:5173/admin/login` and sign in with the username/password you set in
`backend/.env`. From there you can:

- **Products** — add/edit/delete cameras & accessories, upload a photo, set price + original
  price (MRP), mark items "Featured" (shown on the homepage) or "Out of stock", add spec rows
  (resolution, night-vision range, warranty, etc.)
- **Offers** — bundle deals and seasonal discounts, each with its own image, discount badge and
  expiry date. Toggle "Active" to show/hide an offer without deleting it.
- **Business Info** — your business name, tagline, About text, "why choose us" points, phone,
  WhatsApp number, email, address, working hours, logo, homepage hero image, Google Maps embed
  link, and social links.
- **Categories** — the list customers filter products by.
- **Settings** — change your admin password.

Every change is instant on the live site — no redeploy needed.

---

## Customizing without touching code

Everything editors normally worry about is a Dashboard form:
- **Product image** → Products tab → Edit → upload a new photo.
- **Pricing** → Products tab → Edit → change "Selling Price" / "MRP".
- **Offers** → Offers tab → Add/Edit.
- **About / contact / hours** → Business Info tab.

If you're comfortable with code, you can also open `backend/data/*.json` directly — they're
plain, readable JSON and the server picks up changes on the next request.

## Deploying it for real customers

- **Backend**: deploy `backend/` to any Node host (Render, Railway, a VPS, etc.). Set the same
  environment variables from `.env` in your host's dashboard. Make sure `backend/uploads/`
  persists between deploys (use a persistent disk/volume) so uploaded images aren't lost.
- **Frontend**: run `npm run build` inside `frontend/` and deploy the generated `dist/` folder to
  any static host (Vercel, Netlify, etc.). Set `VITE_API_URL` (copy `frontend/.env.example` to
  `.env`) to your deployed backend's URL before building.
- Update `CLIENT_ORIGIN` in the backend's `.env` to your deployed frontend's URL, so the API
  accepts requests from it.

## Notes

- The very first time the backend starts, it creates the admin account from `.env` and writes it
  to `backend/data/admin.json` — this file is gitignored on purpose; don't commit it, and don't
  edit it by hand (use the Dashboard to change your password instead).
- The sample products/offers/business info included are placeholders — replace them with your own
  before going live.
