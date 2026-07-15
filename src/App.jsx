import { useState } from "react";
import { products } from "./data/products.js";
import {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  mergeWishlists,
} from "./lib/wishlist.js";
import ProductGrid from "./components/ProductGrid.jsx";
import WishlistPanel from "./components/WishlistPanel.jsx";
import "./App.css";

export default function App() {
  const [listA, setListA] = useState(() => createWishlist("List A"));
  const [listB, setListB] = useState(() => createWishlist("List B"));
  const [merged, setMerged] = useState(null);

  // function handleAdd(target, product) {
  //   if (target === "A") setListA((prev) => addToWishlist(prev, product));
  //   else setListB((prev) => addToWishlist(prev, product));
  // }

  // function handleRemove(target, productId) {
  //   if (target === "A") setListA((prev) => removeFromWishlist(prev, productId));
  //   else setListB((prev) => removeFromWishlist(prev, productId));
  // }
 function handleToggle(target, product) {
    const setter = target === "A" ? setListA : setListB;
    const current = target === "A" ? listA : listB;
    setter(
      current.items[product.id]
        ? removeFromWishlist(current, product.id)
        : addToWishlist(current, product)
    );
  }

  function handleMerge() {
    setMerged(mergeWishlists(listA, listB, "Combined"));
  }

  return (
    <div className="app">
      <header className="topbar">
        <span className="logo">SWYM Store</span>
      </header>

      <ProductGrid
        products={products}
        listA={listA}
        listB={listB}
        onToggle={handleToggle}
      />

      <div className="panels">
        <WishlistPanel
          list={listA}
          products={products}
          onRemove={(id) => setListA((p) => removeFromWishlist(p, id))}
        />
        <WishlistPanel
          list={listB}
          products={products}
          onRemove={(id) => setListB((p) => removeFromWishlist(p, id))}
        />
      </div>

      <div className="merge-row">
        <button style={{color:'black'}} className="merge-btn" onClick={handleMerge}>
          Merge lists →
        </button>
      </div>

      {merged && (
        <div className="panels">
          <WishlistPanel
            list={merged}
            products={products}
            onRemove={(id) => setMerged((p) => removeFromWishlist(p, id))}
          />
        </div>
      )}
    </div>
  );
}