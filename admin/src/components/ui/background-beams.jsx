import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = React.memo(({ className }) => {
  const paths = Array.from({ length: 50 }, (_, i) => {
    const startX = -380 + i * 7;
    const startY = -189 - i * 8;
    return `M${startX} ${startY}C${startX} ${startY} ${startX + 68} ${216 - i * 8} ${startX + 532} ${343 - i * 8}C${startX + 996} ${470 - i * 8} ${startX + 1064} ${875 - i * 8} ${startX + 1064} ${875 - i * 8}`;
  });

  return (
    <div className={cn("absolute inset-0 flex h-full w-full items-center justify-center", className)}>
      <svg className="pointer-events-none absolute z-0 h-full w-full" width="100%" height="100%" viewBox="0 0 696 316" fill="none" xmlns="http://www.w3.org/2000/svg">
        {paths.map((path, i) => (
          <motion.path
            key={`path-${i}`}
            d={path}
            stroke={`url(#gradient-${i})`}
            strokeOpacity="0.08"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {paths.map((_, i) => (
            <motion.linearGradient
              id={`gradient-${i}`}
              key={`gradient-${i}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + Math.random() * 8}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            >
              <stop stopColor="#004e8f" stopOpacity="0" />
              <stop stopColor="#004e8f" />
              <stop offset="32.5%" stopColor="#f7921d" />
              <stop offset="100%" stopColor="#f7921d" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
