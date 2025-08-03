'use client'
import { useTranslations } from "next-intl";
import MainSection from "../ECommerce/MainSection";
import Paginator from "../Paginator";
import { useGetMilkECommerceQuery } from "@/store/services/ECommerce";
import { useState } from "react";
import RenderMilkProducts from "./RenderMilkProduct";
import SkeltonProduct from "../Skelton/SkeltonProduct";
import { AnimatedHeader } from "../Animation/AnimatedHeader";
import { AnimatedSection } from "../Animation/AnimatedSection";

const RenderMilkPage = () => {
  const t = useTranslations("");
  const [page, setPage] = useState(1);
  const { data: milkResponse,isLoading } = useGetMilkECommerceQuery({ limit: 12, page });
  //2- Handler
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  //3- Render
  return (
    <div>
      <MainSection
        imgSrc="/milk-1.jpg"
        description={t("ECommerce.mainSectionMilkDescription")}
        title={t("ECommerce.mainSectionMilkTitle")}
      />

<AnimatedSection>
        <AnimatedHeader title={t("ECommerce.productsMilk")} center />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeltonProduct key={i} />
              ))
            : milkResponse?.data &&
              milkResponse.data.map((milk) => (
                <RenderMilkProducts key={milk.milkProductID} milk={milk} />
              ))}
        </div>
      </AnimatedSection>

      <Paginator
        total={milkResponse?.totalCount ?? 1}
        pageCount={milkResponse?.totalPages || 1}
        isLoading={isLoading}
        page={page}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </div>
  );
};

export default RenderMilkPage;
