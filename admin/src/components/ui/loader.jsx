import { motion } from "motion/react";

export const LoaderOne = () => {
  const transition = (x) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: "loop",
    delay: x * 0.2,
    ease: "easeInOut",
  });
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(i)}
          className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
        />
      ))}
    </div>
  );
};

export const LoaderThree = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1"
    strokeLinecap="round" strokeLinejoin="round"
    className="h-20 w-20 stroke-primary [--fill-final:#f7921d] [--fill-initial:#004e8f33]"
  >
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <motion.path
      initial={{ pathLength: 0, fill: "var(--fill-initial)" }}
      animate={{ pathLength: 1, fill: "var(--fill-final)" }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
    />
  </motion.svg>
);
