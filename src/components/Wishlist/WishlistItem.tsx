"use client";

import { useWishlist } from "@/context/WishlistContext";

import styles from "./WishlistItem.module.scss";

type Props = {
  productId: string;
  name: string;
  quantity: number;
};

export function WishlistItem({ productId, name, quantity }: Props) {
  const { dispatch } = useWishlist();

  return (
    <article
      className={`flex items-center justify-between gap-2 pb-4 ${styles.item}`}
    >
      <span className={`line-clamp-1 ${styles.name}`}>{name}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Verminder aantal van ${name}`}
          onClick={() =>
            quantity > 1
              ? dispatch({
                  type: "SET_QUANTITY",
                  productId,
                  quantity: quantity - 1,
                })
              : dispatch({ type: "REMOVE", productId })
          }
          className={`flex items-center justify-center ${styles.stepperButton}`}
        >
          −
        </button>
        <span className={styles.quantity} aria-label={`Aantal: ${quantity}`}>
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Verhoog aantal van ${name}`}
          onClick={() =>
            dispatch({
              type: "SET_QUANTITY",
              productId,
              quantity: quantity + 1,
            })
          }
          className={`flex items-center justify-center ${styles.stepperButton}`}
        >
          +
        </button>
        <button
          type="button"
          aria-label={`Verwijder ${name} uit favorieten`}
          onClick={() => dispatch({ type: "REMOVE", productId })}
          className={`ml-2 ${styles.removeButton}`}
        >
          ✕
        </button>
      </div>
    </article>
  );
}
