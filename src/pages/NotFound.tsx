import { ArrowLink } from "../components/ui/ArrowLink";

/**
 * 404 — editorial recovery page. The oversized number is aria-hidden; the
 * visible heading is provided for screen readers. Recovery links ≥44px.
 * Used by the "*" route and the unknown-project-slug fallback in WorkSlug.
 */
export default function NotFoundPage() {
  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-20 md:col-span-8 md:py-28 lg:col-span-8 lg:py-32">
          <span aria-hidden="true" className="case-kicker-rule" />
          <h1 className="sr-only">Page not found</h1>
          <p
            aria-hidden="true"
            className="mt-6 font-display font-medium leading-[0.9] tracking-[-0.03em] text-navy-900 text-[clamp(6rem,25vw,12rem)]"
          >
            404
          </p>
          <p className="text-mono-label mt-6 text-orange-deep">PAGE NOT FOUND</p>
          <p className="mt-5 max-w-[48ch] text-lead text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved —
            here&apos;s a way back.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ArrowLink to="/" className="min-h-11 items-center">
              Back home
            </ArrowLink>
            <ArrowLink to="/work" className="min-h-11 items-center">
              View selected work
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
