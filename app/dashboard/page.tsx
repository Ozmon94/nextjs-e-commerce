import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import priceFormat from "@/util/PriceFormat";
import Image from "next/image";

const prisma = new PrismaClient();

export const revalidate = 0;
const fetchOrders = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return null;
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: {
      products: true,
    },
  });
  return orders ? orders : [];
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;
  if (orders.length === 0) return <div>No orders</div>;
  return (
    <div>
      <h1 className="text-bold">Your orders</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg p-8 my-12 bg-base-200">
            <h2 className="text-xs font-medium">
              Order reference: {order.id}{" "}
            </h2>
            <p className="text-xs py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p>Time: {new Date(order.createdAt).toLocaleString("pl-PL")}</p>

            <div className="flex flex-col gap-8">
              {order.products.map((product) => (
                <div className="py-2">
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      alt={product.name}
                      width={36}
                      height={36}
                      className="w-auto"
                      priority={true}
                    />
                    <p>{priceFormat(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-medium">Total: {priceFormat(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
