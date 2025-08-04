import { IMilkECommerce } from "@/interface";
import { Car } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {  milkProducts } from "@/store/Cart/CartSlice";

interface IProps {
  milk: IMilkECommerce;
}

const RenderMilkProducts = ({ milk }: IProps) => {
  const t = useTranslations("");
const dispatch =useDispatch();
const addCart =()=>{
  dispatch(milkProducts(milk))
}
  return (
    <div className="w-full ">
      <Image
        src="/milk-1.jpg"
        alt="Products"
        width={300}
        height={200}
        className="object-cover w-full rounded-t-lg aspect-[3/2]"
      />
      <div className="px-2 py-2 bg-secondary">
        <div className="flex  justify-between">
          <p className="">
            {t("ECommerce.totalQuantity")}
            <span className='text-blue-900'>{milk.totalQuantity}</span>
          </p>
          <p>
            {t("ECommerce.milkPrice")}
            <span className='text-blue-900'>{milk.pricePerKg}</span>
            
          </p>
        </div>
        <p className="">
          {t("ECommerce.totalPrice")}
          <span className='text-blue-900'>{(milk.totalQuantity * milk.pricePerKg).toLocaleString("en-US")} EGP</span>
        </p>
        <p>
          {" "}
          {t("ECommerce.Notes")}
          <span className='text-blue-900'>{milk.notes}</span>
        </p>
        <p>
          {t("ECommerce.productionDate")}
          <span className='text-blue-900'>{new Date(milk.productionDate).toLocaleDateString()}</span>
        </p>
        <p className="text-center text-primary">
          {t("ECommerce.farmName")}
          <span className='text-blue-900'>{milk.farmName}</span>
        </p>
      </div>
      <Button className="w-full mt-3" onClick={addCart}>
        <Car /> Add To Cart
      </Button>
    </div>
  );
};

export default RenderMilkProducts;
