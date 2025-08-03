import ProductDetails from "@/components/Render/ProductDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ productID: string }>;
}) {
  const { productID } = await params;
  return (
    <div className="mt-16">
      <h1 className="text-center text-secondary">Product ID : {productID}</h1>
      <ProductDetails id={Number(productID)} />
    </div>
  );
}
