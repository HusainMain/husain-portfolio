import { lazy, Suspense, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useLenis } from "lenis/react";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SkipLink } from "./components/layout/SkipLink";
import { SmoothScroll } from "./components/motion/SmoothScroll";
import Home from "./pages/Home";
const Work = lazy(() => import("./pages/work"));
const WorkSlug = lazy(() => import("./pages/WorkSlug"));
const Engineering = lazy(() => import("./pages/Engineering"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Route-change accessibility (Phase 5): scroll to top and move focus to the
 * main landmark (tabIndex -1, outline suppressed in styles/pages.css) so
 * screen-reader users land on the new document without a broken-looking ring.
 */
function App() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, lenis]);

  return (
    <SmoothScroll>
      <SkipLink />
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<WorkSlug />} />
            <Route path="engineering" element={<Engineering />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter entrance={pathname === "/" || pathname === "/about" || pathname === "/work"} />
    </SmoothScroll>
  );
}

export default App;
