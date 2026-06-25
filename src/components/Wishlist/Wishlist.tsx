"use client";

import { useEffect, useRef } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { WishlistItem } from "./WishlistItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function Wishlist({ isOpen, onClose }: Props) {
  const { items } = useWishlist();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
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
              <WishlistItem
                key={item.productId}
                productId={item.productId}
                quantity={item.quantity}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
