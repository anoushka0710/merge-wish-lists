import { createWishlist, addToWishlist, mergeWishlists } from "./wishlist.js";
import { products } from "../data/products.js";

let a = createWishlist("Mine");
let b = createWishlist("Theirs");
a = addToWishlist(a, products[0]); // earbuds
b = addToWishlist(b, products[0]); // same earbuds, added later
b = addToWishlist(b, products[3]); // lipstick

const merged = mergeWishlists(a, b, "Combined");
console.log(Object.keys(merged.items)); // ["p1", "p4"] — no duplicate, no error