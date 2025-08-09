import './App.css'
import { AuroraBackground } from "./components/ui/aurora-background";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import TechStack from "./components/sections/TechStack";
import Contact from './components/sections/Contact';    

export default function App() {
  return (
    <AuroraBackground>
      <div className="flex flex-col w-full">
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </div>
    </AuroraBackground>
  );
}

