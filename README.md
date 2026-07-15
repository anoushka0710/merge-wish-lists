# SWYM Store

A simple e-commerce storefront demo built to showcase one core feature: **merging two wishlists into one, safely and without duplicates.**

## Tech stack

- **React** (functional components + hooks) — UI layer
- **Vite** — dev server and build tool
- **Plain CSS** — no framework, hand-written styles in `App.css`
- **Vanilla JS data layer** — the wishlist logic (`src/lib/wishlist.js`) has zero framework dependencies and could be reused outside React
- **picsum.photos** — seeded placeholder product images (same seed = same image every load)

No backend, no database — all state lives in React's `useState` and resets on page refresh.

## Folder structure

```
wish-list-merge/
├── src/
│   ├── data/
│   │   └── products.js       # hardcoded product catalog
│   ├── lib/
│   │   └── wishlist.js       # createWishlist, addToWishlist, removeFromWishlist, mergeWishlists
│   ├── components/
│   │   ├── ProductGrid.jsx   # product cards + heart-to-wishlist buttons
│   │   └── WishlistPanel.jsx # renders a single wishlist's items
│   ├── App.jsx               # top-level state + layout
│   └── App.css
├── index.html
└── package.json
```

## Core data shapes

**Product**
```js
{ id, name, price, category, blurb, image }
```

**Wishlist**
```js
{ id, name, items: { [productId]: { addedAt } } }
```

Items are stored as an object keyed by product ID rather than an array. This is the design decision the whole merge feature depends on — see below.

## Functionalities

- Browse a product grid (electronics + cosmetics categories)
- Add/remove any product to either of two independent wishlists (List A, List B) via heart-toggle buttons
- Each wishlist shows its items with name, category, price, and a remove (×) button
- **Merge two wishlists into a combined list** with one click
- Merged list can itself have items removed, independently of the source lists
- Responsive layout: product grid reflows by width, wishlist panels stack vertically on narrow screens

## How merging works

`mergeWishlists(a, b, name)` takes the union of both lists' `items` objects:

```js
export function mergeWishlists(a, b, name) {
  const items = { ...a.items };
  for (const [pid, meta] of Object.entries(b.items)) {
    items[pid] = items[pid] && items[pid].addedAt < meta.addedAt ? items[pid] : meta;
  }
  return { id: crypto.randomUUID(), name, items };
}
```

Because items are keyed by product ID, a product that exists in both lists can only ever occupy one key — there's no duplicate to filter out. If both lists have the same product, the one added earlier (`addedAt`) is kept as the canonical entry.

This makes the merge:
- **Commutative** — `merge(A, B)` produces the same item set as `merge(B, A)`
- **Idempotent** — merging the same pair twice produces an identical result, so re-running a merge is always safe

## Workflow (user flow)

1. User browses the product grid at the top of the page.
2. Clicking the heart button on a product (♥ A or ♥ B) adds it to that wishlist; clicking again removes it.
3. Both wishlists render live below the grid, each showing its own item count and totals.
4. Clicking **Merge lists →** combines List A and List B into a new "Combined" list, rendered in a third panel below.
5. The combined list can be edited (items removed) without affecting the original List A or List B.
6. Re-clicking merge at any point regenerates the combined list from the current state of A and B.

## Running the project

```bash
npm install
npm run dev
```

## WEBISTE LINK
https://merge-wish-lists-deploy.vercel.app/
