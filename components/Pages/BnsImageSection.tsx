"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const BnsImageSection = () => {
  return (
    <div>
      <div>
        <Image
          src={"/hero.jpg"}
          priority
          alt="hero"
          width={1920}
          height={1080}
        />
        <div className="h-10 w-full bg-black shadow text-white font-bold flex items-center overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {Array.from({ length: 10 }).map((_, id) => (
                  <div key={`${i}-${id}`} className="whitespace-nowrap mx-10">
                    Company {id + 1}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BnsImageSection;
