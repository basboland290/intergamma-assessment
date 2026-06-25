"use client";

import { useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";

import { useWishlist } from "@/context/WishlistContext";

import { WishlistItem } from "./WishlistItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

export function Wishlist({ isOpen, onClose, triggerRef }: Props) {
  const { items } = useWishlist();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

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
          className="fixed inset-0 z-20 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <FocusTrap active={isOpen}>
        <div
          id="wishlist"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
          aria-hidden={!isOpen}
          inert={!isOpen || undefined}
          className={`fixed top-0 right-0 z-30 flex h-full w-full max-w-[480px] flex-col bg-white shadow-[-4px_0_16px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 id="wishlist-title" className="text-lg font-bold">
              Favorieten ({count})
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Sluit favorieten"
              className="rounded-[4px] text-xl font-bold text-gray-500 hover:text-gray-900 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878]"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">
                Je hebt nog geen favorieten.
              </p>
            ) : (
              items.map((item) => (
                <WishlistItem
                  key={item.product.id}
                  productId={item.product.id}
                  name={item.product.name}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
        </div>
      </FocusTrap>
    </>
  );
}
