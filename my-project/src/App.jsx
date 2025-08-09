import './App.css';
import { AuroraBackground } from "./components/ui/aurora-background";
import Hero from "./components/sections/Hero";
import { Suspense, lazy } from "react";

const Projects = lazy(() => import("./components/sections/Projects"));
const TechStack = lazy(() => import("./components/sections/TechStack"));
const Contact = lazy(() => import("./components/sections/Contact"));

export default function App() {
  return (
    <AuroraBackground>
      <div className="flex flex-col w-full">
        <Hero />
        <Suspense fallback={<div className="py-24 text-center text-gray-400">Loading…</div>}>
          <Projects />
          <TechStack />
          <Contact />
        </Suspense>
      </div>
    </AuroraBackground>
  );
}

