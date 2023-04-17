"use client";

import { useCartStore } from "@/store";
import { AddToCartType } from "@/types/AddToCartType";
import { useState } from "react";

export default function AddToCart({
  name,
  id,
  quantity,
  unit_amount,
  image,
}: AddToCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, unit_amount, quantity, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 cursor-pointer btn btn-primary "
      >
        {added ? "Adding to cart" : "Add to cart"}
      </button>
    </>
  );
}
