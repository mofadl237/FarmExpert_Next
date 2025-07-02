// components/SectionHeader.tsx
"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const AnimatedHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  center = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`my-8  ${center ? "text-center" : "text-start"} `}
    >
      <h2 className="py-8 text-sm sm:text-md md:text-4xl uppercase font-bold inline-block bg-gradient-to-r from-[#7ed56f] to-[#28b485] bg-clip-text text-transparent tracking-[0.2rem] transition-all duration-200  hover:scale-110 
    hover:skew-y-[2deg] 
    hover:skew-x-[15deg] 
    hover:[text-shadow:0.5rem_1rem_2rem_rgba(0,0,0,0.2)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
