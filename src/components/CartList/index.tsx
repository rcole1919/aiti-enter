"use client";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";
import PromoCode from "../PromoCode";
import { getDiscountedPrice } from "../../utils/price";
import styles from "./index.module.css";

export default function CartList() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    discountedTotalPrice,
    isPromoApplied,
    showLimitNotification,
  } = useCart();

  const handleIncreaseQuantity = (productId: number, currentQuantity: number) => {
    const updated = updateQuantity(productId, currentQuantity + 1);
    if (!updated) {
      showLimitNotification();
    }
  };

  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        Корзина пуста. Добавьте товары из каталога.
      </p>
    );
  }

  return (
    <div className={styles.root}>
      <ul className={styles.items}>
        {items.map((item) => {
          const hasDiscount = Boolean(item.discount && item.discount > 0);
          const unitPrice = getDiscountedPrice(item.price, item.discount);
          const lineTotal = unitPrice * item.quantity;

          return (
            <li key={item.id} className={styles.item}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
              />
              <div className={styles.info}>
                <Typography variant="h6" className={styles.name}>
                  {item.name}
                </Typography>
                <div className={styles.priceBlock}>
                  {hasDiscount && (
                    <Typography variant="body2" className={styles.oldPrice}>
                      {item.price.toLocaleString("ru-RU")} ₽
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {unitPrice.toLocaleString("ru-RU")} ₽
                  </Typography>
                </div>
              </div>
              <div className={styles.quantity}>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Уменьшить количество"
                >
                  <RemoveIcon />
                </IconButton>
                <span className={styles.count}>{item.quantity}</span>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleIncreaseQuantity(item.id, item.quantity)
                  }
                  aria-label="Увеличить количество"
                >
                  <AddIcon />
                </IconButton>
              </div>
              <Typography variant="h6" className={styles.total}>
                {lineTotal.toLocaleString("ru-RU")} ₽
              </Typography>
              <IconButton
                onClick={() => removeFromCart(item.id)}
                aria-label="Удалить из корзины"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div className={styles.summary}>
        <PromoCode />
        {isPromoApplied ? (
          <div className={styles.totals}>
            <Typography variant="body1" className={styles.beforePromo}>
              Сумма до скидки: {totalPrice.toLocaleString("ru-RU")} ₽
            </Typography>
            <Typography variant="h5">
              Итого со скидкой: {discountedTotalPrice.toLocaleString("ru-RU")} ₽
            </Typography>
          </div>
        ) : (
          <Typography variant="h5">
            Итого: {totalPrice.toLocaleString("ru-RU")} ₽
          </Typography>
        )}
      </div>
    </div>
  );
}
