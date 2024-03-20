"use client";
import { motion } from "framer-motion";
type Position = "rightToLeft" | "leftToRight" | "topToBottom" | "bottomToTop";
const PageTransition = ({
  children,
  position = "rightToLeft",
  style,
  className,
}: {
  children: React.ReactNode;
  position?: Position;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const slideInPosition = {
    rightToLeft: {
      initial: { opacity: 0, x: 10, y: 0 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: -10, y: 0 },
      transition: { duration: 0.5 },
    },
    leftToRight: {
      initial: { opacity: 0, x: -10, y: 0 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 10, y: 0 },
      transition: { duration: 0.5 },
    },
    topToBottom: {
      initial: { opacity: 0, x: 0, y: -10 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 0, y: 10 },
      transition: { duration: 0.5 },
    },
    bottomToTop: {
      initial: { opacity: 0, x: 0, y: 10 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 0, y: -10 },
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.div
      {...slideInPosition[position]}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
