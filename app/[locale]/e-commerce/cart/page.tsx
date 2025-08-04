'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICattleECommerce, IMilkECommerce } from "@/interface"
import { getProducts } from "@/lib/utils"
import {   Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<IMilkECommerce[] | null>(null);
  const [productsCattle, setProductsCattle] = useState<ICattleECommerce[] | null>(null);
 useEffect(() => {
    const milkData = getProducts("products");
    const cattleData = getProducts("productsCattle");

    setProducts(milkData ? JSON.parse(milkData) : []);
    setProductsCattle(cattleData ? JSON.parse(cattleData) : []);
  }, []);

  if (!products?.length && !productsCattle?.length) {
    return (
      <h1 className="mt-16 h-screen flex justify-center items-center">
        Not Found Any Products
      </h1>
    );
  }
  return (
    <div className="mt-16">
      Page Cart
      {products && products.map((milk) => (
        <div key={milk.milkProductID} className='border-1 shadow-2xl bg-secondary justify-around  text-white mb-4 py-2  flex rounded-md  '>
          <h1>Farm Name : {milk.farmName}</h1>
          <h1>price Per Kg : {milk.pricePerKg}</h1>
          <h1>Weight : {milk.totalQuantity}</h1>
          <h1>Price : {milk.totalQuantity * milk.pricePerKg}</h1>
          <Badge>Quantity : {milk.Quantity}</Badge>
          <Button variant={'destructive'} ><Trash2/> </Button>
          
        </div>
      ))}
      {productsCattle && productsCattle.map((cattle) => (
        <div key={cattle.productID} className='border-1 shadow-2xl bg-secondary justify-around  text-white mb-4 py-3  flex rounded-md  '>
          <h1>Farm Name : {cattle.farmName}</h1>
          <h1>Type : {cattle.type}</h1>
          <h1>price : {cattle.price}</h1>
          <Badge>Quantity : {cattle.Quantity!}</Badge> 
           <Button variant={'destructive'} ><Trash2/> </Button> 
        </div>
      ))}
    </div>
  )
}

export default Page
