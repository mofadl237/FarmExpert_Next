"use client";

import {
  useGetCattleECommerceByIDQuery,
  useGetCattleECommerceByTypeQuery,
} from "@/store/services/ECommerce";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AnimatedHeader } from "../Animation/AnimatedHeader";
import { AnimatedSection } from "../Animation/AnimatedSection";
import RenderCattleProducts from "../ECommerce/RenderCattleProducts";
import SkeltonProduct from "../Skelton/SkeltonProduct";

interface IProps {
  id: number;
}

const ProductDetails = ({ id }: IProps) => {
  const { data: cattle } = useGetCattleECommerceByIDQuery({ id });
  const [imgSrc, setImgSrc] = useState("/main-2.jpg");
  const { data: cattlesType, isLoading } = useGetCattleECommerceByTypeQuery({
    type:String(cattle?.type),
  });
  
  useEffect(() => {
    if (cattle?.imageUrl) {
      setImgSrc(`https://farmxpertapi.runasp.net${cattle.imageUrl}`);
      
    }
  }, [cattle]);

  return (
    <>
      <Link
        href="/en/e-commerce"
        className="bg-green-700 text-white rounded-md my-3 w-20 py-5 mx-auto block text-center"
      >
        Back
      </Link>
      <div className=" flex gap-6 ">
        <Image
          src={imgSrc}
          alt={`Image Description  ${id}`}
          width={400}
          height={200}
          className="object-cover rounded-t-lg aspect-[3/2]"
          onError={() => setImgSrc("/main-2.jpg")}
        />

        <div className=" space-y-8 w-full">
          <h2>Cattle Description : {cattle?.description}</h2>
          <h2>Farm Nam : {cattle?.farmName}</h2>
          <h2>Cattle Age : {cattle?.age}</h2>
          <h2>Cattle Price : {cattle?.price}</h2>
          <h2>Cattle Type : {cattle?.type}</h2>
          <Button className="w-full">Add To Cart</Button>
        </div>
      </div>
      <AnimatedHeader title="Similar Products" center />
      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
          {" "}
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeltonProduct key={i} />
          ))}
        </div>
      ) : (
        <AnimatedSection>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
            {cattlesType?.data &&
              cattlesType.data.map((cattle) => (
                <RenderCattleProducts key={cattle.productID} cattle={cattle} />
              ))}
          </div>
        </AnimatedSection>
      )}
      <div></div>
    </>
  );
};

export default ProductDetails;
