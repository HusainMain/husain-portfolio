import { useEffect } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/* ------------------------------------------------------------------ */
/* Cursor anatomy                                                     */
/* ------------------------------------------------------------------ */
const BALL_SIZE = 10;        // resting diameter of the navy ball
const BALL_HOVER_SIZE = 14;  // diameter over interactive elements
const TRAIL_COUNT = 14;      // number of fading dots in the tail
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
/* Elements the cursor should react to: links, buttons, and anything
   already opted in with data-cursor-pull. */
const INTERACTIVE_SELECTOR =
  "[data-cursor-pull], a, button, [role='button']";

/* Mouse-only affordance: touch devices report coarse pointers and must never see it. */
function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia(FINE_POINTER_QUERY).matches;
}

export function CustomCursor() {
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce || !hasFinePointer()) return;

    /* ---- The ball ---- */
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");
    Object.assign(cursor.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: `${BALL_SIZE}px`,
      height: `${BALL_SIZE}px`,
      backgroundColor: "var(--color-navy-900)",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate3d(-50%, -50%, 0)",
      willChange: "transform",
      transition:
        "background-color 0.15s ease, width 0.15s ease, height 0.15s ease",
      display: "none",
    });

    /* ---- The trail: fading dots that follow the ball with growing lag ---- */
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement("div");
      trail.setAttribute("aria-hidden", "true");
      const size = Math.max(BALL_SIZE * (1 - i / TRAIL_COUNT), 3);
      const opacity = 0.5 * (1 - i / TRAIL_COUNT);
      Object.assign(trail.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "var(--color-navy-900)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "9998",
        transform: "translate3d(-50%, -50%, 0)",
        willChange: "transform, opacity, background-color",
        transition: "background-color 0.15s ease",
        opacity: String(opacity),
        display: "none",
      });
      document.body.appendChild(trail);
      trails.push(trail);
    }

    document.body.appendChild(cursor);

    /* Mutable refs — no React re-renders needed for the follow loop. */
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const trailCurrent = trails.map(() => ({ x: 0, y: 0 }));
    let visible = false;
    let active = false;
    let rafId = 0;

    const applyCursorStyle = () => {
      const color = active ? "var(--color-orange-deep)" : "var(--color-navy-900)";
      cursor.style.backgroundColor = color;
      const size = active ? BALL_HOVER_SIZE : BALL_SIZE;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      /* Turn the whole tail orange when hovering an interactive element. */
      trails.forEach((t) => {
        t.style.backgroundColor = color;
      });
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;

      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

      let moving =
        Math.abs(target.x - current.x) > 0.5 ||
        Math.abs(target.y - current.y) > 0.5;
      let prevX = current.x;
      let prevY = current.y;

      /* Each dot chases the previous one (the ball for the first dot). */
      for (let i = 0; i < trails.length; i++) {
        const tc = trailCurrent[i];
        const lag = 0.1 + i * 0.02;
        tc.x += (prevX - tc.x) * lag;
        tc.y += (prevY - tc.y) * lag;
        if (Math.abs(prevX - tc.x) > 0.2 || Math.abs(prevY - tc.y) > 0.2) {
          moving = true;
        }
        trails[i].style.transform = `translate3d(${tc.x}px, ${tc.y}px, 0) translate(-50%, -50%)`;
        prevX = tc.x;
        prevY = tc.y;
      }

      if (moving) rafId = requestAnimationFrame(render);
      else rafId = 0;
    };

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        cursor.style.display = "block";
        trails.forEach((t) => (t.style.display = "block"));
      }
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const onLeaveWindow = () => {
      visible = false;
      cursor.style.display = "none";
      trails.forEach((t) => (t.style.display = "none"));
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    /* Activates over any interactive element. mouseover/mouseout bubble, so a
       single delegated listener covers current and future DOM nodes without
       per-element attachment or a mutation observer. */
    const onMouseOver = (event: MouseEvent) => {
      if (!(event.target as Element).closest(INTERACTIVE_SELECTOR)) return;
      if (!active) {
        active = true;
        applyCursorStyle();
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!(event.target as Element).closest(INTERACTIVE_SELECTOR)) return;
      const related = event.relatedTarget as Element | null;
      if (related?.closest(INTERACTIVE_SELECTOR)) return;
      if (active) {
        active = false;
        applyCursorStyle();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      trails.forEach((t) => t.remove());
      cursor.remove();
    };
  }, [reduce]);

  return null;
}
