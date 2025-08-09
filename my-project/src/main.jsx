import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { lenis } from "./lib/lenis";
import { isMobile, prefersReducedMotion, isLowEndDevice } from "./lib/device";

const enableScrollAnims =
  !isMobile() && !prefersReducedMotion() && !isLowEndDevice();

async function initGSAP() {
  if (!enableScrollAnims) return;
  const { default: gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
  }
  // small debounce for refresh after lazy sections mount
  requestIdleCallback?.(() => ScrollTrigger.refresh());
}

initGSAP();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
