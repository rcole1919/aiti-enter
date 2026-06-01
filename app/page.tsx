import HomeLayout from "../components/HomeLayout";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <HomeLayout>
      <ProductGrid products={products} />
    </HomeLayout>
  );
}
