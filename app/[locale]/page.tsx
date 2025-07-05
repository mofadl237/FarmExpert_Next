import { AnimatedHeader } from "@/components/AnimatedHeader";
import { AnimatedSection } from "@/components/AnimatedSection";
import Navbar from "@/components/Nav";
import { useTranslations } from "next-intl";
import AnimatedImage from "@/components/AnimatedImage";
import { FeatureBox } from "@/components/FeatureBox";
import { Activity, FileText, Stethoscope, Store } from "lucide-react";
import ProductBox from "@/components/ProductBox";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/FooterComponent";

export default function Home() {
  const t = useTranslations("");

  return (
    <>
      <Navbar />

      <main
        className="relative h-[85vh] mt-16 
  bg-[url('/main-2.jpg')] bg-cover bg-center sm:bg-top
  [clip-path:polygon(0_0,100%_0,100%_70vh,0_100%)]
  before:content-[''] before:absolute before:inset-0 
  before:bg-gradient-to-br before:from-green-300/80 before:to-emerald-500/50
  before:[clip-path:polygon(0_0,100%_0,100%_75vh,0_100%)]"
      >
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center px-4">
            <h1 className="text-[2rem] md:text-[4rem] lg:text-[6rem] tracking-[0.5rem] md:tracking-[1.5rem] lg:tracking-[2rem] font-bold">
              FarmExpert
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-[3rem] tracking-[0.3rem] md:tracking-[1rem] lg:tracking-[1.9rem]">
              Smart Cows Farm
            </h2>
          </div>
        </div>
      </main>
      {/* Section About Us */}
      <AnimatedSection className="h-screen ">
        <AnimatedHeader title={t("about.title")} center />

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-[55px]  md:gap-3">
          <div className="description sm:w-1/2 space-y-3">
            <div className="top">
              <h2 className="text-xl font-semibold">{t("about.subTitle1")}</h2>
              <p className="text-gray-600">{t("about.description1")}</p>
            </div>
            <div className="bottom">
              <h2 className="text-xl font-semibold">{t("about.subTitle2")}</h2>
              <p className="text-gray-600">{t("about.description2")}</p>
            </div>
          </div>

          <div className="imageDescription  sm:w-1/2 flex justify-center relative">
            <AnimatedImage />
          </div>
        </div>
      </AnimatedSection>

      {/* Section Products Feature */}
      <AnimatedSection>
        <section className="relative mt-40 py-[20rem] bg-gradient-to-br from-[#7ed56f]/80 to-[#28b485]/80 skew-y-[-7deg]">
          <div className="-skew-y-[-7deg] px-7 grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  gap-3 ">
            <FeatureBox
              icon={FileText}
              title={t("features.title4")}
              description={t("features.description2")}
            />
            <FeatureBox
              icon={Stethoscope}
              title={t("features.title3")}
              description={t("features.description2")}
            />
            <FeatureBox
              icon={Activity}
              title={t("features.title2")}
              description={t("features.description2")}
            />
            <FeatureBox
              icon={Store}
              title={t("features.title1")}
              description={t("features.description1")}
            />
          </div>
        </section>
      </AnimatedSection>
      {/* Products */}
      <AnimatedSection>
        <AnimatedHeader title={t("products.title")} center />
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <ProductBox
            fromColor="rgba(255, 187, 0, 0.6)"
            toColor="rgba(255, 120, 48, 0.6)"
            imageFront="/services-1.png"
            titleColor="#FF7730f9"
            title={t("products.product1.title")}
            description={[
              t("products.product1.description1"),
              t("products.product1.description2"),
              t("products.product1.description3"),
              t("products.product1.description4"),
            ]}
            buttonText="Visit the clinic"
            buttonLink="#"
          />
          <ProductBox
            fromColor="rgb(126, 213, 111,.6)"
            toColor="rgb(40, 180, 133,.6)"
            imageFront="/services-3.png"
            titleColor="#28b485d9"
            title={t("products.product2.title")}
            description={[
              t("products.product2.description1"),
              t("products.product2.description2"),
              t("products.product2.description3"),
              t("products.product2.description4"),
            ]}
            buttonText="Download App"
            buttonLink="#"
          />
          <ProductBox
            fromColor="rgb(41, 152, 255,.4)"
            toColor="rgb(86, 67, 250,.4)"
            imageFront="/services-4.png"
            titleColor="#5643fad9"
            title={t("products.product3.title")}
            description={[
              t("products.product3.description1"),
              t("products.product3.description2"),
              t("products.product3.description3"),
              t("products.product3.description4"),
            ]}
            buttonText="Download App"
            buttonLink="#"
          />
        </div>
      </AnimatedSection>
      {/* Contact */}
      <AnimatedSection>
        <ContactUs/>
      </AnimatedSection>
      {/* Footer */}
      <Footer/>
    </>
  );
}
