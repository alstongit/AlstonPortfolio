import Lenis from "@studio-freight/lenis";

export const lenis = new Lenis({
  duration: 1.15, // adjust feel
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
  smoothTouch: false,
});

// RequestAnimationFrame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Optional debug
// window.lenis = lenis;