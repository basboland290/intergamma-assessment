"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { WishlistPanel } from "@/components/WishlistPanel";

export function Header() {
  const { items } = useWishlist();
  const count = items.length;
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-green-700 text-lg">Gamma</span>

          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label={`Favorieten, ${count} item${count !== 1 ? "s" : ""}`}
            className="relative flex items-center justify-center w-10 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

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

      <WishlistPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
