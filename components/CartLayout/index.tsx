import styles from "./index.module.css";

interface IProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: IProps) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Корзина</h1>
      {children}
    </main>
  );
};

export default CartLayout;
