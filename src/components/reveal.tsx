import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
  yOffset = 30,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger animation once when 15% of the element is in view
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Framer signature spring ease
      }}
    >
      {children}
    </motion.div>
  );
}

// A staggered wrapper for lists/grids
export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Individual item for StaggerReveal
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Text word-by-word stagger reveal
export function TextStaggerReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  as: Component = "div",
}: {
  text: string | ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: any;
}) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (typeof text !== 'string') {
     // fallback if it's node (has react elements)
     return <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: {opacity:0, y:20}, visible: {opacity:1, y:0, transition: {duration: 0.8, ease:[0.16,1,0.3,1]}} }} className={className}>{text}</motion.div>;
  }

  const words = text.split(" ");

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
