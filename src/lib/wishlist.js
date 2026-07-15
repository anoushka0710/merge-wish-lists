export function createWishlist(name) {
  return { id: crypto.randomUUID(), name, items: {} };
}

export function addToWishlist(list, product) {
  return {
    ...list,
    items: {
      ...list.items,
      [product.id]: { addedAt: list.items[product.id]?.addedAt ?? Date.now() },
    },
  };
}

export function removeFromWishlist(list, productId) {
  const items = { ...list.items };
  delete items[productId];
  return { ...list, items };
}

export function mergeWishlists(a, b, name) {
  const items = { ...a.items };
  for (const [pid, meta] of Object.entries(b.items)) {
    items[pid] = items[pid] && items[pid].addedAt < meta.addedAt ? items[pid] : meta;
  }
  return { id: crypto.randomUUID(), name, items };
}