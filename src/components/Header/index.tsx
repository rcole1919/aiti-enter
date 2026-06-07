"use client";

import Link from "next/link";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import styles from "./index.module.css";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Каталог
        </Link>
        <Link
          href="/cart"
          className={`${styles.link} ${styles.cartLink}`}
        >
          <Badge badgeContent={totalItems} color="primary">
            <ShoppingCartIcon />
          </Badge>
          Корзина
        </Link>
      </nav>
    </header>
  );
}
