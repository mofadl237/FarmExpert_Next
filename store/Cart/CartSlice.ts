import {  ICattleECommerce, IMilkECommerce } from "@/interface";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface ICartState {
  count: number;
  milks: IMilkECommerce[];
  cattels: ICattleECommerce[];
  salaryAll:number,
}

const getInitialState = (): ICartState => {
 if (typeof window !== "undefined") {
    const milkProducts = localStorage.getItem("products");
    const cattleProducts = localStorage.getItem("productsCattle");
    const storedSalaryALL = localStorage.getItem("salaryAll");

    const milks: IMilkECommerce[] = milkProducts ? JSON.parse(milkProducts) : [];
    const cattels: ICattleECommerce[] = cattleProducts ? JSON.parse(cattleProducts) : [];

    return {
      milks,
      cattels,
      count: milks.length + cattels.length,
      salaryAll: storedSalaryALL ? +storedSalaryALL : 0,
    };
  }

  return {
    milks: [],
    cattels: [],
    count: 0,
    salaryAll: 0,
  };
};
// Define the initial state using that type
const initialState: ICartState =getInitialState();
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   
    milkProducts: (state, action: PayloadAction<IMilkECommerce>) => {
      const Product = state.milks.find(
        (p) => p.milkProductID === action.payload.milkProductID
      );
    //   if(!CookieServices.get('user')){
    //     return location.replace('/login');
    //   }

      if (Product) {
        Product.Quantity = (Product.Quantity || 1) + 1;
        toast.success("Products Already Found ++ Quantity");
      } else {
        state.milks.push({ ...action.payload, Quantity: 1 });
       toast.success("Add Success Products");
      }
      localStorage.setItem("products",JSON.stringify(state.milks))
    },
    cattleProducts: (state, action: PayloadAction<ICattleECommerce>) => {
      const Product = state.cattels.find(
        (p) => p.productID === action.payload.productID
      );
    //   if(!CookieServices.get('user')){
    //     return location.replace('/login');
    //   }

      if (Product) {
        Product.Quantity = (Product.Quantity || 1) + 1;
        toast.success("Products Already Found ++ Quantity");
      } else {
        state.cattels.push({ ...action.payload, Quantity: 1 });
       toast.success("Add Success Products");
      }
      localStorage.setItem("productsCattle",JSON.stringify(state.cattels))
    },
  },
});

export const {milkProducts,cattleProducts} = cartSlice.actions;

export default cartSlice.reducer;
