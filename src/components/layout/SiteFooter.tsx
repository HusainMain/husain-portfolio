import { Link } from "react-router";
import { Mascot } from "page-mascot";
import { site } from "../../content/site";
import { Container } from "../ui/Container";
import { Rule } from "../ui/Rule";
import { FadeIn } from "../motion/FadeIn";

export function SiteFooter({ entrance = false }: { entrance?: boolean }) {
  const year = new Date().getFullYear();
  const inner = (
    <>
      <Container className="py-6 max-md:py-4">
        <div className="col-span-12 flex flex-wrap items-center justify-between gap-5 max-lg:gap-4 md:col-span-8 lg:col-span-12">
          <Link
            to="/"
            className="inline-flex max-md:min-h-11 max-md:-my-2.5 items-center gap-2 font-display text-base font-medium text-cream"
          >
            <span aria-hidden="true" className="wordmark-mark" />
            {site.name}
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 max-md:gap-x-5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="footer-nav-link max-md:py-3.5 text-mono-label text-muted-on-navy hover:text-orange-on-navy-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`mailto:${site.email}`}
            className="max-md:py-3.5 max-md:-my-[13px] min-w-0 truncate text-mono-meta text-orange-on-navy transition-colors hover:text-orange-on-navy-hi"
          >
            {site.email}
          </a>
        </div>

        <div className="col-span-12 my-4 flex justify-center md:col-span-8 lg:col-span-12">
          <span aria-hidden="true">
            <Mascot
              directions="/mascots/sheep-directions.webp"
              reactions="/mascots/sheep-reactions.webp"
            />
          </span>
        </div>

        <div className="col-span-12 my-4 md:col-span-8 lg:col-span-12">
          <Rule tone="navy" />
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-12">
          <p className="text-mono-meta text-muted-on-navy">
            © {year} {site.name.toUpperCase()}
          </p>
          <p className="mt-2 text-center text-mono-meta text-muted-on-navy">
            Designed and built end to end.
          </p>
        </div>
      </Container>
    </>
  );
  return <footer className="bg-navy-900">{entrance ? <FadeIn>{inner}</FadeIn> : inner}</footer>;
}
