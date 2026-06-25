import Image from "next/image";

import type { Product } from "@/lib/products";
import { AddToWishlistButton } from "./AddToWishlistButton";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[4px] border border-gray-200 bg-white">
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
        <h2 className="line-clamp-3 text-sm font-semibold leading-[1.35]">
          {product.name}
        </h2>
        <p className="line-clamp-2 flex-1 text-xs text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-bold leading-none text-gray-900">
            {product.price}
          </span>
          <AddToWishlistButton product={product} />
        </div>
      </div>
    </article>
  );
}
