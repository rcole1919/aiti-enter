import styles from "./index.module.css";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Каталог товаров</h1>
      <ProductGrid products={products} />
    </main>
  );
}
