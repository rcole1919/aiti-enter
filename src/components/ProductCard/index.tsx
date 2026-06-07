"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCart } from "../../context/CartContext";
import styles from "./index.module.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
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
        <Typography variant="h5" color="primary" className={styles.price}>
          {product.price.toLocaleString("ru-RU")} ₽
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.addButton}
          onClick={() => addToCart(product)}
        >
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
