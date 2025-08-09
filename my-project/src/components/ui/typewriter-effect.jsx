"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate("span", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      }, {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      });
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black opacity-0 hidden`, word.className)}>
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  roles,                 // array of arrays of segments [{text, className}]
  className,
  cursorClassName,
  typingSpeed = 70,       // ms per char while typing
  deletingSpeed = 40,     // ms per char while deleting
  pauseAfterType = 1200,  // ms pause when fully typed
  pauseAfterDelete = 350, // ms pause after fully deleted
  loop = true
}) => {
  // Fallback to single words prop (backward compatibility)
  const fallback = roles || [
    [{ text: "Full-Stack ", className: "text-white" },
     { text: "Web Developer", className: "text-blue-500" }],
    [{ text: "AI ML ", className: "text-white" },
     { text: "Enthusiast", className: "text-blue-500" }],
    [{ text: "Athlete", className: "text-blue-500" }]
  ];

  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef(false);

  const current = fallback[index];
  const fullString = current.map(s => s.text).join("");

  useEffect(() => {
    if (pauseRef.current) return;

    // Finished typing
    if (!deleting && charCount === fullString.length) {
      if (pauseAfterType >= 0) {
        pauseRef.current = true;
        setTimeout(() => {
          setDeleting(true);
          pauseRef.current = false;
        }, pauseAfterType);
      } else {
        setDeleting(true);
      }
      return;
    }

    // Finished deleting
    if (deleting && charCount === 0) {
      if (!loop && index === fallback.length - 1) return;
      if (pauseAfterDelete >= 0) {
        pauseRef.current = true;
        setTimeout(() => {
          setDeleting(false);
          setIndex(i => (i + 1) % fallback.length);
          pauseRef.current = false;
        }, pauseAfterDelete);
      } else {
        setDeleting(false);
        setIndex(i => (i + 1) % fallback.length);
      }
      return;
    }

    const t = setTimeout(() => {
      setCharCount(c => c + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(t);
  }, [charCount, deleting, fullString.length, index, fallback, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, loop]);

  // Build partial JSX preserving segment styling
  let remaining = charCount;
  const rendered = [];
  for (const seg of current) {
    if (remaining <= 0) break;
    if (remaining >= seg.text.length) {
      rendered.push(
        <span key={rendered.length} className={cn("dark:text-white text-black", seg.className)}>
          {seg.text}
        </span>
      );
      remaining -= seg.text.length;
    } else {
      rendered.push(
        <span key={rendered.length} className={cn("dark:text-white text-black", seg.className)}>
          {seg.text.slice(0, remaining)}
        </span>
      );
      remaining = 0;
    }
  }

  return (
    <div className={cn("flex items-center justify-center my-6", className)}>
      <div className="text-2xl md:text-4xl font-semibold leading-tight">
        {rendered}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className={cn(
            "inline-block align-middle ml-1 w-1.5 h-6 md:h-8 bg-blue-500 rounded-sm",
            cursorClassName
          )}
        />
      </div>
    </div>
  );
};
