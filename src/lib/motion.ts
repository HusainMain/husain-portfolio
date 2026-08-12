import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let motionReady = false;

function initMotion() {
  if (motionReady) return;
  motionReady = true;
  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let syncedLenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function syncLenisWithGsap(lenis: Lenis | undefined) {
  initMotion();
  if (!lenis || syncedLenis === lenis) return;
  unsyncLenisWithGsap(syncedLenis);
  syncedLenis = lenis;
  tickerFn = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);
}

export function unsyncLenisWithGsap(lenis: Lenis | null | undefined) {
  if (!lenis || syncedLenis !== lenis) return;
  lenis.off("scroll", ScrollTrigger.update);
  if (tickerFn) gsap.ticker.remove(tickerFn);
  syncedLenis = null;
  tickerFn = null;
}
