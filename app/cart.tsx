import Link from "next/link";
import CartList from "../components/CartList";
import CartLayout from "../components/CartLayout";
import styles from "./cart.module.css";

export default function CartPage() {
  return (
    <CartLayout>
      <CartList />
      <Link href="/" className={styles.backLink}>
        ← Вернуться в каталог
      </Link>
    </CartLayout>
  );
}
