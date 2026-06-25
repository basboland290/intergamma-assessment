import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard/ProductCard";

export default function Home() {
  const products = getProducts();

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Boormachines</h1>
      <p className="text-sm text-gray-500 mb-6">{products.length} resultaten</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}
