"use client";
import { motion, useScroll, useSpring } from "motion/react";

// A thin line under the menu that fills as you read down the page.
export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div aria-hidden style={{ scaleX }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand" />;
}
