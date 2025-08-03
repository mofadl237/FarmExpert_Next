import { ICattleECommerce } from "@/interface";
import { Cat, Heading } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface IProps{
    cattle :ICattleECommerce;
}


const RenderCattleProducts = ( {cattle}:IProps) => {
    const t = useTranslations("");
    const [imgSrc, setImgSrc] = useState(
    `https://farmxpertapi.runasp.net${cattle.imageUrl}`
  )
  return (
    <div className="w-full "> 
      <Link href={`/en/e-commerce/${cattle.productID}`}>
      <Image src={imgSrc} alt='Products' width={300} height={200} className="object-cover w-full rounded-t-lg aspect-[3/2]"  onError={()=>setImgSrc('/Cow2.jpg')}/>
      <div className="px-2 py-2 bg-secondary">

        <h2 className='flex gap-2 items-center'>
        <span><Heading className='w-[20px] h-[20px] text-primary'/> </span>
        {t("ECommerce.cattleName")}{cattle.name}
      </h2>
      <div className="flex  justify-between">
        <p className='flex gap-2 items-center'>
        <span><Cat className='w-[20px] h-[20px] text-primary'/> </span>
        {t("ECommerce.CattleCategory")}{cattle.type}
      </p>
      <p>{t("ECommerce.cattlePrice")}{cattle.price}</p>
      </div>
      <p className="text-center text-primary">{t("ECommerce.farmName")}{cattle.farmName}</p>
      </div>

      </Link>
    </div>
  )
}

export default RenderCattleProducts
