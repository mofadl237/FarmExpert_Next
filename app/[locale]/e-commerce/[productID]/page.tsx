'use client'

import ProductDetails from "@/components/Render/ProductDetails"

// import { useGetCattleECommerceByIDQuery } from "@/store/services/ECommerce"

const page = ({params}:{params:{productID:number}}) => {
// const {data:cattle}=useGetCattleECommerceByIDQuery({id:params.productID})
  return (
    <div>
        <ProductDetails id={params.productID} />
    </div>
  )
}

export default page
