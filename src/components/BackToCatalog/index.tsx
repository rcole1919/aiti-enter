import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./index.module.css";

export default function BackToCatalog() {
  return (
    <Link href="/" className={styles.link}>
      <ArrowBackIcon className={styles.icon} />
      <span>Вернуться в каталог</span>
    </Link>
  );
}
