import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contact = () => {
  const contactLinks = [
    { icon: <FaTwitter size={22} />, text: "Twitter", href: "https://x.com/alston7_5" },
    { icon: <MdEmail size={22} />, text: "Email Me", href: "mailto:alstondsouza57@gmail.com" },
    { icon: <FaGithub size={22} />, text: "GitHub", href: "https://github.com/alstongit" },
    { icon: <FaLinkedin size={22} />, text: "LinkedIn", href: "https://www.linkedin.com/in/alston-dsouza-384230257/" },
  ];

  const secRef = useRef(null);
  const linksRef = useRef(null);
  const lineRef = useRef(null);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLine(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 80%", once: true },
      });
      gsap.from(".contact-line", {
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: { trigger: secRef.current, start: "top 80%", once: true },
      });
      gsap.from(".contact-links a", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: linksRef.current, start: "top 85%", once: true },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={secRef} className="w-full flex flex-col items-center text-center py-24 px-6">
      {/* Heading */}
      <h2 className="contact-heading text-4xl font-bold mb-4">
        <span className="text-white text-5xl">Contact</span>{" "}
        <span className="text-blue-500 text-5xl">Me</span>
      </h2>

      {/* Animated underline */}
      <div
        ref={lineRef}
        className={`contact-line h-1 bg-blue-500 mb-6 w-48 transition-all duration-700 ease-out origin-left
          ${showLine ? "opacity-100" : "opacity-0"}`}
      />

      {/* Intro Text */}
      <p className="text-gray-400 max-w-xl mb-12">
        Whether you have a question, a project proposal, or just want to say hello, my inbox is always open. Feel free to reach out!
      </p>

      {/* Links */}
      <div ref={linksRef} className="contact-links flex flex-col gap-4 w-full max-w-sm">
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-gray-300 px-6 py-3 rounded-lg transition-colors duration-200"
          >
            {link.icon}
            <span className="text-lg">{link.text}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
