// src/components/sections/TechStack.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import htmlIcon from "@/assets/tech/html.svg";
import cssIcon from "@/assets/tech/css.svg";
import jsIcon from "@/assets/tech/javascript.svg";
import tailwindIcon from "@/assets/tech/tailwind.svg";
import reactIcon from "@/assets/tech/react.svg";
import nodeIcon from "@/assets/tech/nodejs.svg";
import expressIcon from "@/assets/tech/express.svg";
import mongoIcon from "@/assets/tech/mongodb.svg";
import nextIcon from "@/assets/tech/nextjs.svg";
import fastIcon from "@/assets/tech/fastapi.svg";
import pythonIcon from "@/assets/tech/python.svg";
import javaIcon from "@/assets/tech/java.svg";
import pgsqlIcon from "@/assets/tech/pgsql.svg";
import hfIcon from "@/assets/tech/hf-logo.svg";
import postIcon from "@/assets/tech/postman.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const techIcons = [
  htmlIcon,
  cssIcon,
  jsIcon,
  tailwindIcon,
  reactIcon,
  nodeIcon,
  expressIcon,
  postIcon,
  mongoIcon,
  nextIcon,
  fastIcon,
  pythonIcon,
  javaIcon,
  pgsqlIcon,
  hfIcon,
];

// Split into two halves
const midpoint = Math.ceil(techIcons.length / 2);
const firstRowIcons = techIcons.slice(0, midpoint);
const secondRowIcons = techIcons.slice(midpoint);

export default function TechStack() {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-heading", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".tech-underline", {
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".tech-row img", {
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={wrapRef} className="py-24 px-4 text-center text-white">
      {/* Heading + animated underline */}
      <h2 className="tech-heading text-4xl md:text-5xl font-bold">Tech Stack</h2>
      <div
        className={`tech-underline h-1 bg-blue-500 mx-auto w-56 mt-6 mb-8`}
      />
      <p className="text-gray-400">
        Technologies I use to build modern web applications.
      </p>

      {/* Scroller */}
      <div
        className="relative mt-16 space-y-12 max-w-5xl mx-auto overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Row 1 */}
        <div className="tech-row flex w-max animate-scroll-left gap-20">
          {[...firstRowIcons, ...firstRowIcons].map((icon, i) => (
            <img key={`r1-${i}`} src={icon} alt="" className="h-16 w-16" />
          ))}
        </div>

        {/* Row 2 */}
        <div className="tech-row flex w-max animate-scroll-right gap-20">
          {[...secondRowIcons, ...secondRowIcons].map((icon, i) => (
            <img key={`r2-${i}`} src={icon} alt="" className="h-16 w-16" />
          ))}
        </div>
      </div>
    </section>
  );
}