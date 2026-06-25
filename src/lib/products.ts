import productsData from "@/data/products.json";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export function getProducts(): Product[] {
  return productsData as Product[];
}
