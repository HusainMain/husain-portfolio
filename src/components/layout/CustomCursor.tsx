import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const TRAIL_FADE_MS = 800;
const TRAIL_SPACING_PX = 6;
const PULL_RADIUS_PX = 120;
const PULL_MAX_PX = 3;
const CURSOR_SIZE_PX = 16;
const MEASURE_INTERVAL_MS = 200;

interface TrailPoint {
  x: number;
  y: number;
  born: number;
}

interface CachedElement {
  el: HTMLElement;
  cx: number;
  cy: number;
}

export function CustomCursor() {
  const reduce = prefersReducedMotion();
  const pointsRef = useRef<TrailPoint[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const elementsRef = useRef<CachedElement[]>([]);
  const lastMeasureRef = useRef(0);

  const cursorElRef = useRef<HTMLElement | null>(null);
  const trailElRef = useRef<HTMLElement | null>(null);

  const measureElements = useCallback(() => {
    const now = performance.now();
    if (now - lastMeasureRef.current < MEASURE_INTERVAL_MS) return;
    lastMeasureRef.current = now;

    const pullables = document.querySelectorAll<HTMLElement>("[data-cursor-pull]");
    const cached: CachedElement[] = [];
    pullables.forEach((el) => {
      const rect = el.getBoundingClientRect();
      cached.push({
        el,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      });
    });
    elementsRef.current = cached;
  }, []);

  useEffect(() => {
    if (reduce) return;

    const cursorEl = document.createElement("div");
    cursorEl.id = "custom-cursor";
    cursorEl.setAttribute("aria-hidden", "true");
    cursorEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${CURSOR_SIZE_PX}px;
      height: ${CURSOR_SIZE_PX}px;
      background-color: transparent;
      border-left: 1px solid var(--color-orange-deep);
      pointer-events: none;
      z-index: 9999;
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
      transition: transform 0.15s ease, border-color 0.15s ease, border-width 0.15s ease;
      display: none;
      will-change: transform;
    `;
    document.body.appendChild(cursorEl);
    cursorElRef.current = cursorEl;

    const trailContainer = document.createElement("div");
    trailContainer.id = "custom-cursor-trail";
    trailContainer.setAttribute("aria-hidden", "true");
    trailContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9998;
      overflow: hidden;
      will-change: transform;
    `;
    document.body.appendChild(trailContainer);
    trailElRef.current = trailContainer;

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      const last = lastPointRef.current;
      if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < TRAIL_SPACING_PX) {
        return;
      }
      lastPointRef.current = { x: event.clientX, y: event.clientY };
      cursorRef.current = { x: event.clientX, y: event.clientY };
      pointsRef.current = [...pointsRef.current, { x: event.clientX, y: event.clientY, born: now }];
    };

    const onDown = () => {
      activeRef.current = true;
      if (cursorElRef.current) {
        cursorElRef.current.style.borderColor = "var(--color-orange)";
        cursorElRef.current.style.borderWidth = "2px";
      }
    };
    const onUp = () => {
      activeRef.current = false;
      if (cursorElRef.current) {
        cursorElRef.current.style.borderColor = "var(--color-orange-deep)";
        cursorElRef.current.style.borderWidth = "1px";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onUp);
    window.addEventListener("resize", measureElements);

    const loop = () => {
      const now = performance.now();

      /* Expire old trail points */
      pointsRef.current = pointsRef.current.filter((p) => now - p.born < TRAIL_FADE_MS);

      /* Re-measure element positions periodically (throttled) */
      measureElements();

      /* Render trail: batch DOM writes */
      const trailHtml = pointsRef.current
        .map((p) => {
          const age = now - p.born;
          const opacity = Math.max(0, 1 - age / TRAIL_FADE_MS);
          const size = 2 * opacity;
          return `<div style="position:absolute;left:${p.x}px;top:${p.y}px;width:${size}px;height:${size}px;background:var(--color-orange-deep);opacity:${opacity};border-radius:50%;transform:translate3d(-50%,-50%,0);"></div>`;
        })
        .join("");
      if (trailElRef.current) {
        trailElRef.current.innerHTML = trailHtml;
      }

      /* Render cursor */
      if (cursorElRef.current) {
        const cursorLeft = cursorRef.current.x - CURSOR_SIZE_PX / 2;
        const cursorTop = cursorRef.current.y - CURSOR_SIZE_PX / 2;
        const rotation = activeRef.current ? 45 : 0;
        cursorElRef.current.style.transform = `translate3d(${cursorLeft}px,${cursorTop}px,0) rotate(${rotation}deg)`;
        cursorElRef.current.style.display = "block";
      }

      /* Pull nearby text: read cached positions, write transforms */
      const cached = elementsRef.current;
      const px = cursorRef.current.x;
      const py = cursorRef.current.y;
      for (let i = 0; i < cached.length; i += 1) {
        const { el, cx, cy } = cached[i];
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < PULL_RADIUS_PX && dist > 1) {
          const k = 1 - dist / PULL_RADIUS_PX;
          const pullX = ((dx / dist) * PULL_MAX_PX * k).toFixed(2);
          const pullY = ((dy / dist) * PULL_MAX_PX * k).toFixed(2);
          el.style.transform = `translate3d(${pullX}px,${pullY}px,0)`;
        } else {
          el.style.transform = "";
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
      window.removeEventListener("resize", measureElements);
      cancelAnimationFrame(rafRef.current);
      if (cursorElRef.current) document.body.removeChild(cursorElRef.current);
      if (trailElRef.current) document.body.removeChild(trailElRef.current);
    };
  }, [reduce, measureElements]);

  if (reduce) return null;
  return null;
}
