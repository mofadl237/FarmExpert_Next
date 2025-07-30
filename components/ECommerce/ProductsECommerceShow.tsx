'use client'
import { useTranslations } from "next-intl"
import RenderCattleProducts from "./RenderCattleProducts"
import { useGetCattleECommerceQuery } from "@/store/services/ECommerce"

const ProductsECommerceShow = () => {
  //1- state
  const t= useTranslations("");
  const {data:CattleECommerce}=useGetCattleECommerceQuery();
  // console.log("CattleECommerce ===> ",CattleECommerce.data)
  return (
    <div>
    <h2 className='my-3 bg-secondary px-3 py-7 text-3xl '>{t("ECommerce.productsCattle")}</h2>
    {/* Map For This Add Link From Cattle ID */}
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4'>
{
  CattleECommerce?.data   && CattleECommerce.data.map((cattle)=> <RenderCattleProducts key={cattle.productID} cattle={cattle}/>)
}
      </div>
    </div>
  )
}

export default ProductsECommerceShow
