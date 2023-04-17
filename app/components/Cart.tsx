"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import priceFormat from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/shopping-basket.png";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "@/app/components/Checkout";
import totalPrice from "@/util/TotalPrice";
import OrderConfirmed from "@/app/components/OrderConfirmed";
export default function Cart() {
  const cartStore = useCartStore();

  const price = totalPrice(cartStore.cart);

  return (
    <motion.div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-200 absolute right-0 top-0 w-full md:w-2/5  h-screen p-12 overflow-y-scroll"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            className="text-sm font-bold mb-10"
            onClick={cartStore.toggleCart}
          >
            Back to store
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            className="text-sm font-bold mb-10"
            onClick={() => cartStore.setCheckout("cart")}
          >
            Check your court
          </button>
        )}

        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => {
              return (
                <motion.div
                  className="flex p-4 gap-4 my-4 bg-base-100 rounded-md"
                  layout
                  key={item.id}
                >
                  <Image
                    className="rounded-md h-28"
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                  />
                  <div>
                    <h2>{item.name}</h2>
                    <div className="flex gap-2 text-lg">
                      <h2>Quantity: {item.quantity}</h2>{" "}
                      <button
                        onClick={() => cartStore.removeProduct({ ...item })}
                      >
                        <IoRemoveCircle />
                      </button>
                      <button onClick={() => cartStore.addProduct({ ...item })}>
                        <IoAddCircle />
                      </button>
                    </div>

                    <p className="text-sm">
                      {item.unit_amount ? priceFormat(item.unit_amount) : "N/A"}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
        <AnimatePresence>
          {cartStore.cart.length === 0 && cartStore.onCheckout === "cart" && (
            <motion.div
              layout
              className="flex flex-col items-center gap-12 text-2xl font-medium py-12"
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            >
              <h1>Uhhh ohhh.... it's empty</h1>
              <Image src={basket} alt="cart" height={160} width={160} />
            </motion.div>
          )}
          {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
            <motion.div layout>
              <p>Total: {price ? priceFormat(price) : "N/A"}</p>
              <button
                className="py-2 px-4 mt-4 bg-primary w-full rounded-md text-white"
                onClick={() => cartStore.setCheckout("checkout")}
              >
                Checkout
              </button>
            </motion.div>
          ) : null}
          {cartStore.onCheckout === "checkout" && <Checkout />}
          {cartStore.onCheckout === "success" && <OrderConfirmed />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
