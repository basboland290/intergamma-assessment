"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

export type WishlistItem = {
  productId: string;
  quantity: number;
};

type State = { items: WishlistItem[] };

type Action =
  | { type: "ADD"; productId: string }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "LOAD"; items: WishlistItem[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      if (state.items.find((i) => i.productId === action.productId)) {
        return state;
      }
      return {
        items: [...state.items, { productId: action.productId, quantity: 1 }],
      };
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.productId !== action.productId),
      };
    case "SET_QUANTITY":
      return {
        items: state.items.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case "LOAD":
      return { items: action.items };
  }
}

type ContextValue = {
  items: WishlistItem[];
  dispatch: React.Dispatch<Action>;
};

const WishlistContext = createContext<ContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load from localStorage after mount (hydration-safe)
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      dispatch({ type: "LOAD", items: JSON.parse(stored) });
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WishlistContext.Provider value={{ items: state.items, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
