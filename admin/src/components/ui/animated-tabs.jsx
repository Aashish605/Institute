import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const AnimatedTabs = ({ tabs, containerClassName, activeTabClassName, tabClassName, onTabChange }) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.value);
  const active = onTabChange ? internalActive : internalActive;

  const handleClick = (value) => {
    setInternalActive(value);
    if (onTabChange) onTabChange(value);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", containerClassName)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleClick(tab.value)}
          className={cn(
            "relative rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
            active === tab.value
              ? "text-white"
              : "text-gray-600 hover:text-gray-900",
            tabClassName,
          )}
        >
          {active === tab.value && (
            <motion.div
              layoutId="active-tab-pill"
              className={cn("absolute inset-0 rounded-lg bg-primary", activeTabClassName)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
