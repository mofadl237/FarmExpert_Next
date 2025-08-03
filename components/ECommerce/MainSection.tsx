import Image from "next/image";

interface IProps{
    imgSrc:string;
    description:string;
    title:string;
}
const MainSection = ({imgSrc,description,title}:IProps) => {
  return (
    <>
      <section className="my-4 p-4 bg-primary w-full">
        <div className="flex flex-col justify-center align-bottom sm:flex-row gap-4  ">
          <div className=" space-y-6 p-3  flex justify-center items-center flex-col">
            <h1 className=" font-black text-[1.2rem] sm:text-[2rem]">{title}</h1>

            <p className="mt-4 text-base text-pretty text-gray-400 sm:text-lg/relaxed">
              {description}
            </p>

            
          </div>

          <Image src={imgSrc} width={300} height={400} alt=" Alternative" className="rounded-full"/>
        </div>
      </section>
    </>
  );
};

export default MainSection;
