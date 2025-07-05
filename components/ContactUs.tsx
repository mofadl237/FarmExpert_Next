'use client'
import { useTranslations } from "next-intl";
import { AnimatedHeader } from "./AnimatedHeader"
import { usePathname } from "next/navigation";
import { ContactForm } from "./FormContact";

const ContactUs = () => {
    const t = useTranslations("");
    const pathname = usePathname();
    
      const isArabic = pathname.startsWith('/ar');
  return (
    <div className="bg-gradient-to-tr from-[#68CD75] to-[#2DB683] w-full h-screen flex justify-center items-center">
          <div className={`relative  w-[80%]  h-[70%]   md:h-[75%] bg-[url('/main-2.jpg')]  rounded-[4px] shadow-md bg-top`}>
            <div
              className={`absolute    h-[100%] w-full md:w-[60%] bg-[rgba(255,255,255,0.6)]  rounded-[4px] z-10 ${isArabic && 'end-0'} `}
              style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
            >
              <AnimatedHeader title={t("contact.title")} center />
              <div className="px-5">
                <ContactForm/>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ContactUs
      