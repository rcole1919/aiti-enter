import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./index.css";

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card">
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" className="product-name">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="product-description"
        >
          {product.description}
        </Typography>
        <Typography variant="h5" color="primary" className="product-price">
          {product.price.toLocaleString("ru-RU")} ₽
        </Typography>
        <Button variant="contained" color="primary" className="add-to-cart-btn">
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
