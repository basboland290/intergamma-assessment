"use client";

import type { Product } from "@/lib/products";

import { useWishlist } from "@/context/WishlistContext";
import { HeartIcon } from "@/components/ui/HeartIcon";

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
      <HeartIcon filled={isInWishlist} />
    </button>
  );
}
