import { AddToCartType } from "@/types/AddToCartType";

const totalPrice = (cart: AddToCartType[]) => {
  const price = cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity;
  }, 0);
  return price ? price : 0;
};

export default totalPrice;
