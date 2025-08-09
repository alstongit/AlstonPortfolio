// src/components/sections/Projects.jsx
import { CometCard } from "@/components/ui/comet-card";
import { projectsData } from "@/data/projectsData";
import { ExternalLink } from "lucide-react";
import { LampGlow } from "@/components/ui/lamp"; // added
import { useLayoutEffect, useRef, useEffect } from "react";
import { isMobile, prefersReducedMotion, isLowEndDevice } from "@/lib/device";

export default function Projects() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (isMobile() || prefersReducedMotion() || isLowEndDevice()) {
      // Ensure cards are visible when animations are disabled
      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card) => {
        card.style.opacity = "1";
      });
      return;
    }

    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".project-card");

        // Set initial state explicitly
        gsap.set(cards, { opacity: 0, y: 60, rotateX: 15 });

        gsap.to(cards, {
          // Changed from 'from' to 'to' for better control
          opacity: 1, // Make sure this animates to full opacity
          y: 0,
          rotateX: 0,
          transformOrigin: "top center",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }, sectionRef);
    })();
    return () => ctx && ctx.revert();
  }, []);

  useEffect(() => {
    if (isMobile() || prefersReducedMotion()) return; // skip heavy hover math
    // init tilt (your existing useCardTilt or logic)
  }, []);

  return (
    <section ref={sectionRef} className="text-white py-20 px-4">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold">My Projects</h2>

        {/* Lamp glow under heading */}
        <div className="relative mt-11">
          <LampGlow />
        </div>

        {/* Pushed description down so glow appears to shine onto it */}
        <p className="-mt-30 text-gray-300 max-w-2xl mx-auto relative">
          A showcase of my web development journey, featuring full-stack
          applications, mini projects, and landing pages.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 lg:gap-x-15">
            {projectsData.map((project, index) => (
              <CometCard
                key={index}
                className="project-card rounded-xl h-[380px] flex flex-col justify-between max-w-sm mx-auto w-full overflow-hidden opacity-100" // Added opacity-100
              >
                {/* Image */}
                <div className="h-48 w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Bottom content */}
                <div className="p-5 relative flex flex-col flex-1">
                  {/* External link icon */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>

                  {/* Title */}
                  <h3 className="text-lg font-semibold">{project.title}</h3>

                  {/* URL */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-300"
                  >
                    {project.url.replace(/^https?:\/\//, "")}
                  </a>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300" // Removed backdrop-blur and increased opacity
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}