import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import profilePic from "@/assets/profile.jpg";
import { useEffect, useState, useRef } from "react";
import { lenis } from "@/lib/lenis";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { isMobile, prefersReducedMotion, isLowEndDevice } from "@/lib/device";

export default function Hero() {
  const heroRef = useRef(null);
  const layers = useRef([]);
  const ctaRef = useRef(null);
  useLayoutEffect(() => {
    if (isMobile() || prefersReducedMotion() || isLowEndDevice()) return; // skip on mobile
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef);
      layers.current = q("[data-parallax]");
      if (!layers.current.length) return;
      const xSet = layers.current.map((el) => gsap.quickSetter(el, "x", "px"));
      const ySet = layers.current.map((el) => gsap.quickSetter(el, "y", "px"));
      function move(e) {
        const { innerWidth: w, innerHeight: h } = window;
        const rx = e.clientX / w - 0.5;
        const ry = e.clientY / h - 0.5;
        layers.current.forEach((el, i) => {
          const depth = parseFloat(el.dataset.depth || 1);
          xSet[i](rx * depth * 30);
          ySet[i](ry * depth * 30);
        });
      }
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white px-4">
      <div className="mb-8">
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="px-6 py-2 text-sm font-medium"
        >
          Available for Freelancing Projects
        </HoverBorderGradient>
      </div>

      <h1 className="text-4xl md:text-8xl font-bold text-center mb-6">
        Hi I&apos;m <span className="text-blue-500">Alston.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-5xl mx-auto items-center justify-items-center mb-6 py-8 md:py-12">
        <p className="text-gray-300 leading-relaxed text-lg text-center md:text-center">
          A final-year AI & Data Science student passionate about building
          scalable software. My experience spans full-stack development and applied
          machine learning, backed by a strong foundation in data structures and
          algorithms. I am eager to tackle complex engineering challenges and
          create impactful solutions.
        </p>
        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full bg-gray-700 overflow-hidden">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <TypewriterEffectSmooth
          roles={[
            [
              { text: "Full Stack ", className: "text-white" },
              { text: "Web Developer", className: "text-blue-500" },
            ],
            [
              { text: "AI ML ", className: "text-white" },
              { text: "Enthusiast", className: "text-blue-500" },
            ],
            [{ text: "Athlete", className: "text-blue-500" }],
          ]}
          typingSpeed={65}
          deletingSpeed={38}
          pauseAfterType={1200}
          pauseAfterDelete={300}
        />
      </div>

      <div ref={ctaRef} className="flex gap-4">
        <a
          href="https://drive.google.com/file/d/17o94wln1eCMcYWiaV6sUgssqwuPI0c2s/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition"
        >
          View CV
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#contact");
            if (lenis && target) {
              lenis.scrollTo(target, { duration: 1.15, easing: t => 1 - Math.pow(1 - t, 3) });
            } else {
              target?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Hire Me
        </a>
      </div>

      <script>
        {`window.addEventListener('error', e => {
          console.log('[GlobalError]', e.message, e.filename, e.lineno);
        });
        window.addEventListener('unhandledrejection', e => {
          console.log('[PromiseRejection]', e.reason);
        });`}
      </script>
    </section>
  );
}
