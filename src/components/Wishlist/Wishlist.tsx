"use client";

import { useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";

import { useWishlist } from "@/context/WishlistContext";

import { WishlistItem } from "./WishlistItem";
import styles from "./Wishlist.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function Wishlist({ isOpen, onClose }: Props) {
  const { items } = useWishlist();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
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
          className={`fixed inset-0 z-20 ${styles.backdrop}`}
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
          className={`fixed top-0 right-0 h-full z-30 flex flex-col ${styles.panel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}
        >
          <div
            className={`flex items-center justify-between p-4 ${styles.header}`}
          >
            <h2 id="wishlist-title" className={styles.title}>
              Favorieten ({count})
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Sluit favorieten"
              className={styles.closeButton}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <p className={styles.empty}>Je hebt nog geen favorieten.</p>
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
