"use client";

import type { Product } from "@/lib/products";

import { useWishlist } from "@/context/WishlistContext";
import { HeartIcon } from "@/components/ui/HeartIcon";

type Props = { product: Product };

export function AddToWishlistButton({ product }: Props) {
  const { items, dispatch } = useWishlist();
  const isInWishlist = items.some((item) => item.product.id === product.id);

  function toggle() {
    if (isInWishlist) {
      dispatch({ type: "REMOVE", productId: product.id });
    } else {
      dispatch({
        type: "ADD",
        product: {
          id: product.id,
          name: product.name,
        },
      });
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
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border border-green-600 text-green-600 transition-colors hover:border-gray-400 hover:text-gray-600 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878] ${isInWishlist ? "bg-green-600 text-white hover:border-gray-400 hover:text-gray-600" : ""}`}
    >
      <HeartIcon filled={isInWishlist} />
    </button>
  );
}
