'use client'

import ProductDetails from "@/components/Render/ProductDetails"


const page = ({params}:{params:{productID:string}}) => {
  return (
    <div>
        <ProductDetails id={Number(params.productID)} />
    </div>
  )
}

export default page
