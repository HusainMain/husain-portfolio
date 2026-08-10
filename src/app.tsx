import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SkipLink } from "./components/layout/SkipLink";
import Home from "./pages/Home";
const Work = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.WorkPlaceholder })),
);
const WorkSlug = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.WorkSlugPlaceholder })),
);
const Engineering = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.EngineeringPlaceholder })),
);
const About = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.AboutPlaceholder })),
);
const Contact = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.ContactPlaceholder })),
);
const NotFound = lazy(() =>
  import("./pages/placeholders").then((m) => ({ default: m.NotFoundPlaceholder })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <SiteHeader />
      <main id="main">
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
      <SiteFooter />
    </>
  );
}
