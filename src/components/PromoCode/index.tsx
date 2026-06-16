"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCartActions, useCartState } from "../../context/CartContext";
import styles from "./index.module.css";

export default function PromoCode() {
  const { isPromoApplied } = useCartState();
  const { applyPromoCode } = useCartActions();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const result = applyPromoCode(code.trim());

    if (result === "invalid") {
      setError("Неверный промокод");
      return;
    }

    setError("");
  };

  const handleChange = (value: string) => {
    setCode(value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <TextField
          label="Промокод"
          value={code}
          onChange={(event) => handleChange(event.target.value)}
          size="small"
          disabled={isPromoApplied}
          className={styles.input}
        />
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={isPromoApplied}
          className={styles.button}
        >
          Применить
        </Button>
        {error && (
          <Typography variant="body2" className={styles.error}>
            {error}
          </Typography>
        )}
        {isPromoApplied && (
          <Typography variant="body2" className={styles.success}>
            Промокод применён
          </Typography>
        )}
      </div>
    </div>
  );
}
