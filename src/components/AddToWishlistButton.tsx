"use client";

import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export function AddToWishlistButton({ product }: Props) {
  const { items, dispatch } = useWishlist();
  const isInWishlist = items.some((item) => item.productId === product.id);

  function toggle() {
    if (isInWishlist) {
      dispatch({ type: "REMOVE", productId: product.id });
    } else {
      dispatch({ type: "ADD", productId: product.id });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isInWishlist}
      aria-label={
        isInWishlist
          ? `Verwijder ${product.name} uit favorieten`
          : `Sla ${product.name} op in favorieten`
      }
      className={`flex items-center justify-center w-11 h-11 rounded border transition-colors shrink-0 ${
        isInWishlist
          ? "bg-green-600 border-green-600 text-white"
          : "border-green-600 text-green-600 hover:border-gray-400 hover:text-gray-600"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isInWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
