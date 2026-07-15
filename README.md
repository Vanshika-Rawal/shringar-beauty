# SHRINGAR — Premium Indian Beauty Marketplace

A production-ready luxury beauty marketplace built from the approved **SHRINGAR** design.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Firebase (Auth, Firestore, Storage).

> **Celebrate Your Beauty** — one luxurious destination for 500+ beauty brands across
> skincare, makeup, fragrance & wellness.

---

## ✨ Features

- **Storefront** — animated hero, 14 shoppable categories, trending/bestseller/new carousels,
  shop-by concern / ingredient / skin-type, featured brands, customer stories, Instagram grid, newsletter.
- **Shop** — search, category / brand / price filters, sorting, responsive product grid.
- **Product details** — gallery, quantity selector, wishlist, tabs (description / ingredients / how to use),
  related products, JSON-LD structured data.
- **Cart** — add / remove / update quantity, coupon support (`SHRINGAR10`, `GLOW15`),
  free-shipping progress, guest + Firestore persistence.
- **Wishlist** — user-specific, syncs across devices when signed in.
- **Checkout** — address form, payment method, order creation in Firestore.
- **Auth** — email/password signup, login, logout, forgot-password, protected routes, session management.
- **User dashboard** — profile, saved addresses, order history, wishlist, account settings.
- **Admin console** — secure admin-only route, product CRUD (+ image upload), order status management, user list.
- **SEO** — metadata, Open Graph, sitemap, robots, structured data.
- **Performance** — server components, `next/image`, route-level loading states, ISR-ready.

---

## 🗂 Project Structure

```
app/                      App Router pages
  layout.tsx              Root layout (fonts, providers, header/footer)
  page.tsx                Home
  shop/                   Listing + [id] product details
  cart/  wishlist/  checkout/
  login/  signup/  forgot-password/
  profile/                Dashboard (orders, addresses, settings)
  admin/                  Admin console (products, orders, users)
  brands/  offers/
  sitemap.ts  robots.ts  api/revalidate/
components/               Reusable UI (layout, home, shop, product, dashboard, auth, ui)
context/                  Auth / Cart / Wishlist / Toast providers
lib/firebase/             config + auth/products/cart/wishlist/orders/users/reviews/admin
lib/data/                 catalog seed data + icons (from the approved design)
lib/utils/                price formatting, cn(), auth-error mapping
types/                    Firestore collection schemas
middleware.ts             Route protection
firestore.rules / storage.rules
scripts/seed.ts           Populate Firestore with the catalog
```

---

## 🔥 Firestore Collections

| Collection   | Key fields |
|--------------|-----------|
| `users`      | uid, email, displayName, role (`user`/`admin`), addresses[] |
| `products`   | name, brand, category, price, mrp, rating, reviewCount, images[], tags[], stock |
| `categories` | name, slug, chip (gradient), iconSvg |
| `orders`     | userId, items[], subtotal, shipping, discount, total, status, address, paymentMethod |
| `cart`       | userId, items[], couponCode |
| `wishlist`   | userId, items[] |
| `reviews`    | productId, userId, userName, rating, text, verified |
| `coupons`    | code, type, value, minSubtotal, active |

Full TypeScript definitions live in [`types/index.ts`](types/index.ts).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js 18.18+** (or 20+) and npm.

### 2. Install
```bash
npm install
```

### 3. Configure Firebase
1. Create a project at <https://console.firebase.google.com>.
2. Enable **Authentication → Email/Password**.
3. Create a **Cloud Firestore** database.
4. Enable **Storage**.
5. Copy your web app config into a local env file:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in the `NEXT_PUBLIC_FIREBASE_*` values.

### 4. Deploy security rules
```bash
npm i -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage
```

### 5. Seed the catalog (optional)
Temporarily relax Firestore write rules (or run as an admin), then:
```bash
npm run seed
```

### 6. Run
```bash
npm run dev
# http://localhost:3000
```

### Making yourself an admin
After signing up, open Firestore → `users/{yourUid}` and set `role` to `admin`.
You can then access `/admin`.

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it at <https://vercel.com/new>.
3. Add the environment variables from `.env.local.example` in
   **Project Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js (`next build`).
5. Add your production domain to Firebase Auth **Authorized domains**
   and set `NEXT_PUBLIC_SITE_URL` to the deployed URL.

> Optional: set `REVALIDATE_SECRET` to protect the `/api/revalidate` webhook.

---

## 🎨 Design Fidelity

The UI is a faithful, production code conversion of the approved
**SHRINGAR Store** design — colors (`#5B4638`, `#C98F73`, `#D8B08C`, `#FAF7F2`…),
Playfair Display + Manrope typography, and every animation
(`fadeUp`, `floaty`, `blob`, `shimmer`, `petalfall`, `sheen`, `auraspin`, …)
are preserved in [`app/globals.css`](app/globals.css) and `tailwind.config.ts`.

Product imagery uses the design's gradient placeholder blocks until real
images are uploaded via the admin console (stored in Firebase Storage).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev`   | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint`  | Lint |
| `npm run seed`  | Seed Firestore with the catalog |

---

Crafted with love in India · © 2026 SHRINGAR Beauty
