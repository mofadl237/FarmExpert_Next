'use client'

import { useGetCattleECommerceByIDQuery } from "@/store/services/ECommerce"

interface IProps {
  id: number
}

const ProductDetails = ({ id }: IProps) => {
  const { data: cattle } = useGetCattleECommerceByIDQuery({id})

  return (
    <div>
      <h2>{cattle?.description}</h2>
      <h2>{cattle?.farmName}</h2>
    </div>
  )
}

export default ProductDetails
