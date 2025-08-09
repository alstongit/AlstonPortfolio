import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "./lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// Keep ScrollTrigger in sync with Lenis
lenis.on("scroll", ScrollTrigger.update);
// OPTIONAL if layout changes later: ScrollTrigger.addEventListener("refresh", () => lenis.resize());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
