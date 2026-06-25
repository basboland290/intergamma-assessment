import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToWishlistButton } from "@/components/AddToWishlistButton";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded shadow-sm overflow-hidden h-full">
      <div className="relative w-full aspect-[4/3] bg-gray-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-2">
        <h2 className="text-sm font-semibold leading-snug line-clamp-3">
          {product.name}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* price — gamma uses very large bold text */}
        <p className="text-3xl font-bold text-gray-900 leading-none mt-auto">
          {product.price}
        </p>

        {/* actions row: cart button + wishlist square */}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded py-2 px-3 transition-colors"
            aria-label={`Voeg ${product.name} toe aan winkelwagen`}
          >
            {/* + icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {/* cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          <AddToWishlistButton product={product} />
        </div>
      </div>
    </article>
  );
}
