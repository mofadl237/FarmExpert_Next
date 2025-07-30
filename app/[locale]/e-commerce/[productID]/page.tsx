'use client'

import { useGetCattleECommerceByIDQuery } from "@/store/services/ECommerce"

const Page = ({params}:{params:{productID:string}}) => {
const {data:cattle}=useGetCattleECommerceByIDQuery({id:Number(params.productID)})
  return (
    <div>
        <h1>{cattle?.description}</h1>
        <h1>{cattle?.farmName}</h1>
    </div>
  )
}

export default Page
