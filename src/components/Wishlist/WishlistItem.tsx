"use client";

import { useWishlist } from "@/context/WishlistContext";

import styles from "./WishlistItem.module.scss";

type Props = {
  productId: string;
  quantity: number;
};

export function WishlistItem({ productId, quantity }: Props) {
  const { dispatch } = useWishlist();

  return (
    <div
      className={`flex items-center justify-between gap-2 pb-4 ${styles.item}`}
    >
      <span className={styles.productId}>{productId}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Verminder aantal"
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
        <span className={styles.quantity}>{quantity}</span>
        <button
          type="button"
          aria-label="Verhoog aantal"
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
          aria-label={`Verwijder ${productId} uit favorieten`}
          onClick={() => dispatch({ type: "REMOVE", productId })}
          className={`ml-2 ${styles.removeButton}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
