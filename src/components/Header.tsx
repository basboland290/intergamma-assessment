"use client";

import { useState } from "react";

import { useWishlist } from "@/context/WishlistContext";
import { Wishlist } from "@/components/Wishlist";
import { HeartIcon } from "@/components/ui/HeartIcon";
import { Logo } from "@/components/ui/Logo";

import styles from "./Header.module.scss";

export function Header() {
  const { items } = useWishlist();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-10 ${styles.header}`}>
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />

          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label={`Favorieten, ${count} ${count !== 1 ? "artikel" : "artikelen"}`}
            aria-expanded={panelOpen}
            aria-controls="wishlist"
            className={`relative flex items-center justify-center w-10 h-10 ${styles.wishlistButton}`}
          >
            <HeartIcon />

            <span
              aria-live="polite"
              className={`absolute -top-1 -right-1 flex items-center justify-center ${styles.badge} ${count === 0 ? "hidden" : ""}`}
            >
              {count}
            </span>
          </button>
        </div>
      </header>

      <Wishlist isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
