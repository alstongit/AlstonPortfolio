"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      {/* (Original demo background retained for other uses) */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Omitted for brevity */}
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

/* Aurora‑matching subtle glow used under section heading */
export const LampGlow = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex w-full items-start justify-center pointer-events-none h-32 mix-blend-screen",
        className
      )}
      aria-hidden="true"
    >
      {/* Left cone (slightly stronger) */}
      <motion.div
        initial={{ opacity: 0.35, width: "10rem" }}
        whileInView={{ opacity: 0.8, width: "25rem" }}
        transition={{ delay: 0.05, duration: 0.7, ease: "easeInOut" }}
        className="absolute right-1/2 h-32 w-[25rem] bg-gradient-conic from-violet-300/65 via-indigo-300/20 to-transparent [--conic-position:from_70deg_at_center_top] blur-[2px]"
      />
      {/* Right cone */}
      <motion.div
        initial={{ opacity: 0.35, width: "10rem" }}
        whileInView={{ opacity: 0.8, width: "25rem" }}
        transition={{ delay: 0.05, duration: 0.7, ease: "easeInOut" }}
        className="absolute left-1/2 h-32 w-[25rem] bg-gradient-conic from-transparent via-indigo-300/20 to-fuchsia-400/65 [--conic-position:from_290deg_at_center_top] blur-[2px]"
      />
      {/* Core ellipse (brighter) */}
      <motion.div
        initial={{ width: "9rem", opacity: 0.35 }}
        whileInView={{ width: "22rem", opacity: 0.65 }}
        transition={{ delay: 0.12, duration: 0.7, ease: "easeInOut" }}
        className="absolute top-1 h-24 w-64 -translate-y-5 rounded-full bg-gradient-to-r from-violet-300/55 via-indigo-300/40 to-fuchsia-400/55 blur-2xl"
      />
      {/* Inner hotspot (brighter) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0.25 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
        className="absolute top-2 h-14 w-48 -translate-y-6 rounded-full bg-gradient-to-r from-violet-200/45 via-indigo-200/35 to-fuchsia-300/45 blur-xl"
      />
      {/* Underline beam (thicker & stronger) */}
      <motion.div
        initial={{ width: "0rem", opacity: 0 }}
        whileInView={{ width: "18rem", opacity: 0.9 }}
        transition={{ delay: 0.22, duration: 0.55, ease: "easeInOut" }}
        className="absolute top-0 h-1 w-[24rem] -translate-y-7 bg-gradient-to-r from-violet-400/75 via-indigo-400/60 to-fuchsia-400/75 shadow-[0_0_10px_2px_rgba(129,140,248,0.35)]"
      />
    </div>
  );
};
