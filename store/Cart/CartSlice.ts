import { ICattleECommerce, IMilkECommerce } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { toast } from "sonner";

interface ICartState {
  count: number;
  milks: IMilkECommerce[];
  cattels: ICattleECommerce[];
  salaryAll: number;
}


const getInitialState = (): ICartState => {
  if (typeof window !== "undefined") {
    const milkProducts = localStorage.getItem("products");
    const cattleProducts = localStorage.getItem("productsCattle");
    const storedSalaryALL = localStorage.getItem("salaryAll");
    
    const milks: IMilkECommerce[] = milkProducts
      ? JSON.parse(milkProducts)
      : [];
    const cattels: ICattleECommerce[] = cattleProducts
      ? JSON.parse(cattleProducts)
      : [];

    const salaryAll =
      milks.reduce((acc, p) => acc + p.pricePerKg * (p.totalQuantity || 0), 0) +
      cattels.reduce((acc, c) => acc + c.price, 0);

    return {
      milks,
      cattels,
      count: milks.length + cattels.length,
      salaryAll: storedSalaryALL ? +storedSalaryALL : salaryAll,
    };
  }
  // مش عند ال Browser يرجع دا بقا وفاضين ميملاش الا لو عند ال USeClient
  return { milks: [], cattels: [], count: 0, salaryAll: 0 };
};

const initialState: ICartState = getInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    milkProducts: (state, action: PayloadAction<IMilkECommerce>) => {
      const Product = state.milks.find(
        (p) => p.milkProductID === action.payload.milkProductID
      );

    
      if (Product) {
        Product.Quantity = (Product.Quantity || 1) + 1;
        toast.success("Products Already Found ++ Quantity");
      } else {
        state.milks.push({ ...action.payload, Quantity: 1 });
        toast.success("Add Success Products");
      }

      // التغرات اللي عاوزها تسمع عند الكل بقا
      state.count = state.milks.length + state.cattels.length;
      state.salaryAll =
        state.milks.reduce(
          (acc, p) => acc + p.pricePerKg * (p.totalQuantity || 0),
          0
        ) + state.cattels.reduce((acc, c) => acc + c.price, 0);

      localStorage.setItem("products", JSON.stringify(state.milks));
      localStorage.setItem("salaryAll", state.salaryAll.toString());
    },

    cattleProducts: (state, action: PayloadAction<ICattleECommerce>) => {
      const Product = state.cattels.find(
        (p) => p.productID === action.payload.productID
      );
      const price = action.payload.price;

      if (Product) {
        Product.Quantity = (Product.Quantity || 1) + 1;
        Product.price = Product.Quantity * price;
        toast.success("Products Already Found ++ Quantity");
      } else {
        state.cattels.push({ ...action.payload, Quantity: 1 });
        toast.success("Add Success Products");
      }

      state.count = state.milks.length + state.cattels.length;
      state.salaryAll =
        state.milks.reduce(
          (acc, p) => acc + p.pricePerKg * (p.totalQuantity || 0),
          0
        ) + state.cattels.reduce((acc, c) => acc + c.price, 0);

      localStorage.setItem("productsCattle", JSON.stringify(state.cattels));
      localStorage.setItem("salaryAll", state.salaryAll.toString());
    },

    deleteMilkProducts: (state, action: PayloadAction<IMilkECommerce>) => {
      state.milks = state.milks.filter(
        (p) => p.milkProductID !== action.payload.milkProductID
      );

      toast.success("Delete Success Products");

      state.count = state.milks.length + state.cattels.length;
      state.salaryAll =
        state.milks.reduce(
          (acc, p) => acc + p.pricePerKg * (p.totalQuantity || 0),
          0
        ) + state.cattels.reduce((acc, c) => acc + c.price, 0);

      localStorage.setItem("products", JSON.stringify(state.milks));
      localStorage.setItem("salaryAll", state.salaryAll.toString());
    },

    deleteCattleProducts: (state, action: PayloadAction<ICattleECommerce>) => {
      state.cattels = state.cattels.filter(
        (p) => p.productID !== action.payload.productID
      );

      toast.success("Delete Success Products");

      state.count = state.milks.length + state.cattels.length;
      state.salaryAll =
        state.milks.reduce(
          (acc, p) => acc + p.pricePerKg * (p.totalQuantity || 0),
          0
        ) + state.cattels.reduce((acc, c) => acc + c.price, 0);

      localStorage.setItem("productsCattle", JSON.stringify(state.cattels));
      localStorage.setItem("salaryAll", state.salaryAll.toString());
    },
  },
});

export const {
  milkProducts,
  cattleProducts,
  deleteMilkProducts,
  deleteCattleProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
