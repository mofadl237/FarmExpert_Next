"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedImage = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const images = [
    {
      src: "/services-1.png",
      className: "left-0 -top-8",
    },
    {
      src: "/services-2.png",
      className: "right-0 top-8",
    },
    {
      src: "/services-3.png",
      className: "left-[20%] top-40",
    },
  ];

  return (
    <div className="relative w-full h-[20rem] max-w-[600px] mx-auto mt-5 ">
      {images.map((img, index) => (
        <motion.div
          key={index}
          className={`absolute   w-[55%] rounded-sm shadow-[0_1.5rem_4rem_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer ${img.className}`}
          onHoverStart={() => setHovered(index)}
          onHoverEnd={() => setHovered(null)}
          animate={{
            scale: hovered === null ? 1 : hovered === index ? 1.05 : 0.95,
            zIndex: hovered === index ? 20 : 10,
            y: hovered === index ? -8 : 0,
          }}
          transition={{ duration: 0.1 }}
        >
          <Image
            src={img.src}
            alt={`Photo ${index + 1}`}
            width={300}
            height={300}
            className="rounded-sm hover:border-8 border-secondary"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedImage;
