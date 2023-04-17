import Stipe from "stripe";
import Product from "@/app/components/Product";

const getProducts = async () => {
  const stipe = new Stipe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stipe.products.list();
  const productWithPrice = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stipe.prices.list({ product: product.id });
      const features = product.metadata.features || "";
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    })
  );
  return productWithPrice || [];
};
export default async function Home() {
  const products = await getProducts();
  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
