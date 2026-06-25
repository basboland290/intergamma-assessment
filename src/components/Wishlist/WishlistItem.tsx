"use client";

import { useWishlist } from "@/context/WishlistContext";

type Props = {
  productId: string;
  quantity: number;
};

export function WishlistItem({ productId, quantity }: Props) {
  const { dispatch } = useWishlist();

  return (
    <div className="flex items-center justify-between gap-2 border-b pb-4">
      <span className="text-sm font-medium">{productId}</span>

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
          className="w-7 h-7 border rounded flex items-center justify-center text-sm"
        >
          −
        </button>
        <span className="w-4 text-center text-sm">{quantity}</span>
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
          className="w-7 h-7 border rounded flex items-center justify-center text-sm"
        >
          +
        </button>
        <button
          type="button"
          aria-label={`Verwijder ${productId} uit favorieten`}
          onClick={() => dispatch({ type: "REMOVE", productId })}
          className="text-red-500 hover:text-red-700 text-sm ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
