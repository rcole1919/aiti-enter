"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MAX_CART_ITEM_QUANTITY } from "../../constants/cart";
import styles from "./index.module.css";

type CartLimitNotificationProps = {
  open: boolean;
  onClose: () => void;
  /** Ключ для повторного показа при уже открытом уведомлении */
  notificationKey?: number;
};

const CartLimitNotification = ({
  open,
  onClose,
  notificationKey = 0,
}: CartLimitNotificationProps) => {
  return (
    <Snackbar
      key={notificationKey}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className={styles.snackbar}
    >
      <Alert
        onClose={onClose}
        severity="warning"
        variant="filled"
        className={styles.alert}
      >
        Можно добавить не более {MAX_CART_ITEM_QUANTITY} шт. одного товара
      </Alert>
    </Snackbar>
  );
};

export default CartLimitNotification;
