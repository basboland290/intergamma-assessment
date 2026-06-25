"use client";

import type { Product } from "@/lib/products";

import { useWishlist } from "@/context/WishlistContext";
import { HeartIcon } from "@/components/ui/HeartIcon";

import styles from "./AddToWishlistButton.module.scss";

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
      className={`flex items-center justify-center w-11 h-11 shrink-0 ${styles.button} ${isInWishlist ? styles.active : ""}`}
    >
      <HeartIcon filled={isInWishlist} />
    </button>
  );
}
