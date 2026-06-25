"use client";

import { useWishlist } from "@/context/WishlistContext";

type Props = {
  productId: string;
  name: string;
  quantity: number;
};

export function WishlistItem({ productId, name, quantity }: Props) {
  const { dispatch } = useWishlist();

  return (
    <article className="flex items-center justify-between gap-2 border-b border-gray-200 pb-4">
      <span className="line-clamp-1 text-sm font-medium">{name}</span>

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
          className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] border border-gray-200 text-sm focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878]"
        >
          −
        </button>
        <span className="w-4 text-center text-sm" aria-label={`Aantal: ${quantity}`}>
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
          className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] border border-gray-200 text-sm focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878]"
        >
          +
        </button>
        <button
          type="button"
          aria-label={`Verwijder ${name} uit favorieten`}
          onClick={() => dispatch({ type: "REMOVE", productId })}
          className="ml-2 rounded-[4px] text-sm text-red-500 hover:text-red-700 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878]"
        >
          ✕
        </button>
      </div>
    </article>
  );
}
