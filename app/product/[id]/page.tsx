import Image from "next/image";
import { SearchParamsType } from "@/types/SearchParamsType";
import priceFormat from "@/util/PriceFormat";
import AddToCart from "@/app/product/[id]/AddToCart";

export default async function Product({ searchParams }: SearchParamsType) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-16">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={800}
        height={800}
        priority={true}
      />
      <div className="font-medium">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p>{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount
              ? priceFormat(searchParams.unit_amount)
              : "N/A"}
          </p>
        </div>
        <AddToCart {...searchParams} />
      </div>
    </div>
  );
}
