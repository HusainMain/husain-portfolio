import { ArrowLink } from "../components/ui/ArrowLink";
import { usePageMeta } from "../lib/meta";
import { FadeIn } from "../components/motion/FadeIn";

/**
 * 404 — editorial recovery page with a friendly snail mascot.
 * The snail replaces the oversized 404 number; recovery links ≥44px.
 * Used by the "*" route and the unknown-project-slug fallback in WorkSlug.
 */
export default function NotFoundPage() {
  usePageMeta({
    title: "Page not found — Husain Bardanwala",
    description: "The page you are looking for does not exist or has moved.",
    path: "/404",
  });

  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-20 md:col-span-8 md:py-28 lg:col-span-8 lg:py-32">
          <span aria-hidden="true" className="case-kicker-rule" />
          <h1 className="sr-only">Page not found</h1>

          <FadeIn>
            <div className="mt-8 flex justify-center" aria-hidden="true">
              <img
                src="/mascots/snail-404.svg"
                alt=""
                width="160"
                height="160"
                className="max-w-full h-auto"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-6 text-center text-mono-label text-orange-deep">
              PAGE NOT FOUND
            </p>
            <p className="mt-3 max-w-[48ch] mx-auto text-center text-lead text-muted">
              The page you&apos;re looking for doesn&apos;t exist or has moved —
              here&apos;s a way back.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
              <ArrowLink to="/" className="min-h-11 items-center">
                Back home
              </ArrowLink>
              <ArrowLink to="/work" className="min-h-11 items-center">
                View selected work
              </ArrowLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
