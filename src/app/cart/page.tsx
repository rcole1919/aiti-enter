import CartList from "../../components/CartList";
import CartLayout from "../../components/CartLayout";
import BackToCatalog from "../../components/BackToCatalog";

export default function CartPage() {
  return (
    <CartLayout>
      <CartList />
      <BackToCatalog />
    </CartLayout>
  );
}
