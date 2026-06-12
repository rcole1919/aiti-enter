"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCart, type Product } from "../../context/CartContext";
import { getDiscountedPrice } from "../../utils/price";
import styles from "./index.module.css";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, showLimitNotification } = useCart();
  const hasDiscount = Boolean(product.discount && product.discount > 0);
  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  const handleAddToCart = () => {
    const added = addToCart(product);
    if (!added) {
      showLimitNotification();
    }
  };

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" className={styles.name}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          {product.description}
        </Typography>
        <div className={styles.priceBlock}>
          {hasDiscount && (
            <Typography variant="body2" className={styles.oldPrice}>
              {product.price.toLocaleString("ru-RU")} ₽
            </Typography>
          )}
          <Typography variant="h5" color="primary" className={styles.price}>
            {discountedPrice.toLocaleString("ru-RU")} ₽
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={styles.addButton}
          onClick={handleAddToCart}
        >
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
