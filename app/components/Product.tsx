import Image from "next/image";
import priceFormat from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";
export default function Product({
  name,
  unit_amount,
  image,
  id,
  description,
  quantity,
  metadata,
}: ProductType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: {
          name,
          unit_amount,
          image,
          id,
          description,
          quantity,
          features,
        },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full object-cover rounded-lg"
          priority={true}
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount !== null ? priceFormat(unit_amount) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
}
