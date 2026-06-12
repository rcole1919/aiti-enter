/** Цена со скидкой (округление до целых рублей) */
export function getDiscountedPrice(price: number, discount?: number): number {
  if (!discount || discount <= 0) {
    return price;
  }
  return Math.round(price * (1 - discount / 100));
}
