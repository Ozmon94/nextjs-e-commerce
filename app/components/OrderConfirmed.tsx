"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.clearCart();
    cartStore.setPaymentIntent("");
  }, []);
  return (
    <motion.div
      className="flex flex-col justify-center items-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div>
        <h1>Your order has been placed.</h1>
        <h2>Check your email for the receipt.</h2>
      </div>
      <div>
        <Link href={"/dashboard"}>
          <button
            className="font-medium"
            onClick={() => {
              setTimeout(() => {
                cartStore.setCheckout("cart");
              }, 1000);
              cartStore.toggleCart();
            }}
          >
            Check your order
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
