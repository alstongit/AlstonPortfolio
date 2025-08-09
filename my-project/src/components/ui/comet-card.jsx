"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn(
        "perspective-distant transform-3d",
        // Outer wrapper now only provides perspective; no rounded/border here
        // (leave className off this wrapper so it moves with the card)
      )}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
            rotateY,
            translateX,
            translateY,
            boxShadow:
              "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            transformStyle: "preserve-3d"
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.25 }
        }}
        // Move the styling classes (rounded, height, overflow, bg etc.) onto the moving element
        className={cn(
          "relative will-change-transform rounded-2xl overflow-hidden bg-[#121212]/70 backdrop-blur-md border border-white/10",
          "transition-colors",
          className
        )}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.55
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Subtle gradient edge to emphasize movement */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      </motion.div>
    </div>
  );
};
