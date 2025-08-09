import Lenis from "@studio-freight/lenis";
import { isMobile, prefersReducedMotion, isLowEndDevice } from "./device";

let _lenis = null;
const canUse =
  typeof window !== "undefined" &&
  !isMobile() &&
  !prefersReducedMotion() &&
  !isLowEndDevice();

try {
  if (canUse) {
    _lenis = new Lenis({
      duration: 0.85,          // shorter = snappier
      easing: t => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: "vertical",
    });

    function raf(time) {
      _lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
} catch (e) {
  console.warn("Lenis init failed:", e);
  _lenis = null;
}

export const lenis = _lenis;