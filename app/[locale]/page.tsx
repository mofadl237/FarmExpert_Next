import { AnimatedHeader } from "@/components/Animation/AnimatedHeader";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import Navbar from "@/components/Nav";
import { useTranslations } from "next-intl";
import AnimatedImage from "@/components/Animation/AnimatedImage";
import { FeatureBox } from "@/components/Card/FeatureBox";
import { Activity, FileText, Stethoscope, Store } from "lucide-react";
import ProductBox from "@/components/Animation/ProductBox";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/FooterComponent";
import MainSection from "@/components/MainSection";

export default function Home() {
  const t = useTranslations("");

  return (
    <>
      <Navbar />

     <MainSection/>
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
