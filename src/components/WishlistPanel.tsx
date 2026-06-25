"use client";

import { useEffect, useRef } from "react";
import { useWishlist } from "@/context/WishlistContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function WishlistPanel({ isOpen, onClose }: Props) {
  const { items, dispatch } = useWishlist();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when panel opens
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Favorieten"
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-30 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Favorieten ({items.length})</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Sluit favorieten"
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Je hebt nog geen favorieten.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-2 border-b pb-4"
              >
                <span className="text-sm font-medium">{item.productId}</span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Verminder aantal"
                    onClick={() =>
                      item.quantity > 1
                        ? dispatch({
                            type: "SET_QUANTITY",
                            productId: item.productId,
                            quantity: item.quantity - 1,
                          })
                        : dispatch({
                            type: "REMOVE",
                            productId: item.productId,
                          })
                    }
                    className="w-7 h-7 border rounded flex items-center justify-center text-sm"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Verhoog aantal"
                    onClick={() =>
                      dispatch({
                        type: "SET_QUANTITY",
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="w-7 h-7 border rounded flex items-center justify-center text-sm"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    aria-label={`Verwijder ${item.productId} uit favorieten`}
                    onClick={() =>
                      dispatch({ type: "REMOVE", productId: item.productId })
                    }
                    className="text-red-500 hover:text-red-700 text-sm ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
