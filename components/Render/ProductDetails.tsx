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
import { Car } from "lucide-react";

interface IProps {
  id: number;
}

const ProductDetails = ({ id }: IProps) => {
  const { data: cattle } = useGetCattleECommerceByIDQuery({ id });
  const [imgSrc, setImgSrc] = useState("/Cow2.jpg");
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
      <div className=" flex flex-col md:flex-row gap-6  ">
        <Image
          src={imgSrc}
          alt={`Image Description  ${id}`}
          width={400}
          height={200}
          className="object-cover  rounded-t-lg aspect-[3/2]"
          onError={() => setImgSrc("/Cow1.jpg")}
        />

        <div className=" space-y-3 md:space-y-8 w-full">
          <h2>Cattle Description : <span className="text-gray-400">{cattle?.description}</span></h2>
          <h2>Farm Nam : <span className="text-gray-400">{cattle?.farmName}</span></h2>
          <h2>Cattle Age : <span className="text-gray-400">{cattle?.age}</span></h2>
          <h2>Cattle Type :  <span className="text-gray-400">{cattle?.type}</span></h2>
<h2 className="text-4xl text-secondary font-extrabold">
  {cattle?.price?.toLocaleString("en-US")} EGP
</h2>
          <Button className="w-full"><Car/> Add To Cart</Button>
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
