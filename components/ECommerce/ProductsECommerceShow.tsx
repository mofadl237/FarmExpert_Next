'use client'
import { useTranslations } from "next-intl"
import RenderCattleProducts from "./RenderCattleProducts"
import { useGetCattleECommerceQuery } from "@/store/services/ECommerce"
import SkeltonProduct from "../Skelton/SkeltonProduct"
import { AnimatedHeader } from "../Animation/AnimatedHeader"
import { AnimatedSection } from "../Animation/AnimatedSection"

const ProductsECommerceShow = () => {
  //1- state
  const t= useTranslations("");
  const {data:CattleECommerce,isLoading}=useGetCattleECommerceQuery();
  if(isLoading){
    return <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4'> {Array.from({length:10}).map((_,i)=> <SkeltonProduct key={i}/>)}</div>
  }
  return (
    <AnimatedSection>
      <AnimatedHeader title={t("ECommerce.productsCattle")} center/>
    {/* <h2 className='my-3 bg-secondary px-3 py-7 text-3xl '></h2> */}
    {/* Map For This Add Link From Cattle ID */}
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 py-4'>
{
  CattleECommerce?.data   && CattleECommerce.data.map((cattle)=> <RenderCattleProducts key={cattle.productID} cattle={cattle}/>)
}
      </div>
    </AnimatedSection>
  )
}

export default ProductsECommerceShow
