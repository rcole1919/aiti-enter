import React from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";
import styles from "./index.module.css";

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={3} className={styles.grid}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
