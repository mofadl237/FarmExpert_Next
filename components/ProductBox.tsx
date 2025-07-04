"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
interface IProps {
  fromColor: string;
  toColor: string;
  imageFront: string;
  title: string;
  titleColor: string;
  description: string[];
  buttonText:string;
  buttonLink:string
}
export default function ProductBox({
  fromColor,
  toColor,
  imageFront,
  title,
  titleColor,
  description,
  buttonText,
  buttonLink,
}: IProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="relative  w-full md:w-1/3  h-[30rem] perspective cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <CardContent className="absolute inset-0 backface-hidden   overflow-hidden">
          <div
            className="relative h-40 w-full bg-cover bg-top 
             [clip-path:polygon(0_0,100%_0,100%_70%,0_100%)] 
             before:content-['Vet Clinic'] before:absolute before:inset-0 
             before:bg-gradient-to-br 
             before:[clip-path:polygon(0_0,100%_0,100%_75vh,0_100%)]"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${fromColor}, ${toColor}), url('${imageFront}')`,
            }}
          >
            <div
              className={`absolute top-7 start-0 bg-[${titleColor}] text-white  px-5 py-3  text-2xl font-semibold uppercase`}
            >
              {title}
            </div>
          </div>

          <div className="p-4">
            <ul className="mt-2 text-sm space-y-1 text-center ">
              <li className=" pb-4 text-lg  ">
                
                {description[0]}
                <span className="h-[1px] block bg-gray-300 w-[75%] mt-4 mx-auto"></span>
              </li>
              <li className=" pb-4 text-lg  ">
                
                {description[1]}
                <span className="h-[1px] block bg-gray-300 w-[75%] mt-4 mx-auto"></span>
              </li>
              <li className=" pb-4 text-lg  ">
                
                {description[2]}
                <span className="h-[1px] block bg-gray-200 w-[75%] mt-4 mx-auto"></span>
              </li>
              <li className=" pb-4 text-lg  ">
                
                {description[3]}
              </li>
              
            </ul>
          </div>
        </CardContent>

        {/* Back Side */}
        <CardContent
          className="absolute inset-0 rotate-y-180 backface-hidden e flex items-center justify-center before:absolute before:inset-0 
             before:bg-gradient-to-br
             "
          style={{
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",

            backgroundImage: `linear-gradient(to bottom right, ${fromColor}, ${toColor}), url('${imageFront}')`,
          }}
        >
          <CardFooter>
            <Button
              variant="link"
              className=" z-30 bg-white text-black  hover:bg-gray-100"
              
            >
             <Link href={buttonLink}> {buttonText}</Link>
            </Button>
          </CardFooter>
        </CardContent>
      </motion.div>
    </Card>
  );
}
