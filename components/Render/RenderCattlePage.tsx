
'use client'
import { useTranslations } from "next-intl";
import MainSection from "../ECommerce/MainSection"
import Paginator from "../Paginator";
import { useGetCattleECommerceQuery } from "@/store/services/ECommerce";
import { useState } from "react";
import { AnimatedSection } from "../Animation/AnimatedSection";
import { AnimatedHeader } from "../Animation/AnimatedHeader";
import SkeltonProduct from "../Skelton/SkeltonProduct";
import RenderCattleProducts from "./RenderCattleProducts";


const RenderCattlePage = () => {
        const t = useTranslations("");
          const [page, setPage] = useState(1);
          const { data: cattleResponse,isLoading } = useGetCattleECommerceQuery({ limit: 12, page });
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
      <MainSection imgSrc="/Cow3.jpg" description={t('ECommerce.mainSection')} title={t('ECommerce.mainSectionTitle')} />

      <AnimatedSection>
              <AnimatedHeader title={t("ECommerce.productsCattle")} center />
      
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4">
                {isLoading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <SkeltonProduct key={i} />
                    ))
                  : cattleResponse?.data &&
                    cattleResponse.data.map((cattle) => (
                      <RenderCattleProducts key={cattle.productID} cattle={cattle} />
                    ))}
              </div>
            </AnimatedSection>

            <Paginator
                    total={cattleResponse?.totalCount ?? 1}
                    pageCount={cattleResponse?.totalPages || 1}
                    isLoading={isLoading}
                    page={page}
                    onClickPrev={onClickPrev}
                    onClickNext={onClickNext}
                  />
    </div>
  )
}

export default RenderCattlePage
