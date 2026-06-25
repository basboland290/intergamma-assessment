"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { Wishlist } from "@/components/Wishlist";
import { HeartIcon } from "@/components/ui/HeartIcon";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const { items } = useWishlist();
  const count = items.length;
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />

          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label={`Favorieten, ${count} item${count !== 1 ? "s" : ""}`}
            className="relative flex items-center justify-center w-10 h-10"
          >
            <HeartIcon />

            {count > 0 && (
              <span
                aria-live="polite"
                className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <Wishlist isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
