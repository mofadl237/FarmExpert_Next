"use client";
import { useTranslations } from "next-intl";
import RenderCattleProducts from "../Render/RenderCattleProducts";
import {
  useGetCattleECommerceQuery,
  useGetMilkECommerceQuery,
} from "@/store/services/ECommerce";
import SkeltonProduct from "../Skelton/SkeltonProduct";
import { AnimatedHeader } from "../Animation/AnimatedHeader";
import { AnimatedSection } from "../Animation/AnimatedSection";
import RenderMilkProducts from "../Render/RenderMilkProduct";

const ProductsECommerceShow = () => {
  //1- state
  const t = useTranslations("");
  const { data: CattleECommerce, isLoading } = useGetCattleECommerceQuery({
    limit: 8,
    page: 1,
  });
  const { data: MilkECommerce, isLoading: milkLoading } =
    useGetMilkECommerceQuery({ limit: 8, page: 1 });
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
        {" "}
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeltonProduct key={i} />
        ))}
      </div>
    );
  }
  return (
    <section>
      <AnimatedSection>
        <AnimatedHeader title={t("ECommerce.productsCattle")} center />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeltonProduct key={i} />
              ))
            : CattleECommerce?.data &&
              CattleECommerce.data.map((cattle) => (
                <RenderCattleProducts key={cattle.productID} cattle={cattle} />
              ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <AnimatedHeader title={t("ECommerce.productsMilk")} center />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
          {milkLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeltonProduct key={i} />
              ))
            : MilkECommerce?.data &&
              MilkECommerce.data.map((milk) => (
                <RenderMilkProducts key={milk.milkProductID} milk={milk} />
              ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default ProductsECommerceShow;
