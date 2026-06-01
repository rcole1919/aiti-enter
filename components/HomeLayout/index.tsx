import styles from "./index.module.css";

interface IProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: IProps) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Каталог товаров</h1>
      {children}
    </main>
  );
};

export default HomeLayout;
