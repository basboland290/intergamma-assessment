"use client";

import { useState } from "react";

import { useWishlist } from "@/context/WishlistContext";
import { Wishlist } from "@/components/Wishlist";
import { HeartIcon } from "@/components/ui/HeartIcon";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const { items } = useWishlist();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />

          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label={`Favorieten, ${count} ${count === 1 ? "artikel" : "artikelen"}`}
            aria-expanded={panelOpen}
            aria-controls="wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-[4px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#003878]"
          >
            <HeartIcon />

            <span
              aria-hidden="true"
              className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white ${count === 0 ? "hidden" : ""}`}
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
