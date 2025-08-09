import Lenis from "@studio-freight/lenis";
import { isMobile, prefersReducedMotion } from "./device";

const disable = isMobile() || prefersReducedMotion();

export const lenis = disable
  ? null
  : new Lenis({
      duration: 1.1,
      easing: t => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

if (lenis) {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}