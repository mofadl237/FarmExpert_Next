'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICattleECommerce, IMilkECommerce } from "@/interface"
import { getProducts } from "@/lib/utils"
import { cattleProducts, deleteAllProducts, deleteCattleProducts, deleteMilkProducts, milkProducts } from "@/store/Cart/CartSlice";
import { RootState } from "@/store/store";
import {   Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Link  from 'next/link';

const Page = () => {
  // 1- State
  const [products, setProducts] = useState<IMilkECommerce[] | null>(null);
  const [productsCattle, setProductsCattle] = useState<ICattleECommerce[] | null>(null);
  const dispatch = useDispatch();
  const {salaryAll} = useSelector((state:RootState) => state.cart) 

  //2- Handler
  const refreshProducts = () => {
    const milkData = getProducts("products");
    const cattleData = getProducts("productsCattle");
    setProducts(milkData ? JSON.parse(milkData) : []);
    setProductsCattle(cattleData ? JSON.parse(cattleData) : []);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

const DeleteAll = ()=>{
  dispatch(deleteAllProducts());
  refreshProducts();
}
const sendEmail = async ()=>{
  const res = await fetch('/api/send'
    ,{
    method:"POST"
  }
)
  console.log("REs ===> ",res);
}
const resetCart =()=>{
  localStorage.removeItem("products");
  localStorage.removeItem("productsCattle");
  localStorage.removeItem("salaryAll");
}
  if (!products?.length && !productsCattle?.length) {
    return (
      <h1 className="mt-16 h-screen flex justify-center items-center text-secondary text-3xl">
        Not Found Any Products!
      </h1>
    );
  }
  return (
    <div className="mt-16">
      <h1 className="text-center mt-4 mb-3 text-xl font-bold">All items will be sent via email</h1>
      {products && products.map((milk) => (
        <div key={milk.milkProductID} className='border-1 shadow-2xl bg-secondary justify-around  text-white mb-4 py-2  flex rounded-md  '>
          <h1>Farm Name : {milk.farmName}</h1>
          <h1>price Per Kg : {milk.pricePerKg}</h1>
          <h1>Weight : {milk.totalQuantity}</h1>
          <h1>Price : {milk.totalQuantity * milk.pricePerKg}</h1>
          <Badge>Quantity : {milk.Quantity}</Badge>
          <Button  onClick={()=>{dispatch(milkProducts(milk));  refreshProducts(); }} ><Plus/> </Button>
          <Button variant={'destructive'} onClick={()=>{dispatch(deleteMilkProducts(milk));  refreshProducts(); }} ><Trash2/> </Button>
          
        </div>
      ))}
      {productsCattle && productsCattle.map((cattle) => (
        
        <div key={cattle.productID} className='border-1 shadow-2xl bg-secondary justify-around  text-white mb-4 py-3  flex rounded-md  '>
          <h1>Farm Name : {cattle.farmName}</h1>
          <h1>Type : {cattle.type}</h1>
          <h1>price : {cattle.price }</h1>
          <Badge>Quantity : {cattle.Quantity!}</Badge> 
           <Button  onClick={()=>{dispatch(cattleProducts(cattle)); refreshProducts(); }} ><Plus/> </Button> 
           <Button variant={'destructive'} onClick={()=>{dispatch(deleteCattleProducts(cattle)); refreshProducts(); }} ><Trash2/> </Button> 
        </div>
      ))}
      <div className="bg-red-400 py-4 rounded-2xl mb-3">
        <h2 className="text-center text-primary font-extrabold text-2xl">Total : {salaryAll.toLocaleString("en-US")} EGP</h2>
      </div>
      <div className="flex justify-between mb-3 gap-4">
        <Button onClick={DeleteAll}  variant={'destructive'}>Delete All</Button>
        <Button className="flex-grow-1 "  onClick={()=> { resetCart();sendEmail() }} >
          <Link href='/en/e-commerce/payment'>
          Continue Shopping
          </Link>
          </Button>
      </div>
    </div>
  )
}

export default Page
