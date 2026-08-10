import { Link } from "react-router";
import { site } from "../../content/site";
import { Container } from "../ui/Container";
import { Rule } from "../ui/Rule";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900">
      <Container className="py-14 max-md:py-10">
        <div className="col-span-12 flex flex-wrap items-center justify-between gap-6 md:col-span-8 lg:col-span-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-base font-medium text-cream"
          >
            <span aria-hidden="true" className="wordmark-mark" />
            {site.name}
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-mono-label text-muted-on-navy transition-colors hover:text-orange-on-navy-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`mailto:${site.email}`}
            className="text-mono-meta text-orange-on-navy transition-colors hover:text-orange-on-navy-hi"
          >
            {site.email}
          </a>
        </div>

        <div className="col-span-12 my-8 md:col-span-8 lg:col-span-12">
          <Rule tone="navy" />
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 text-mono-meta text-muted-on-navy md:col-span-8 lg:col-span-12">
          <p>
            © {year} {site.name.toUpperCase()}
          </p>
          <p>{site.location.toUpperCase()}</p>
          <ul className="flex gap-x-8">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-orange-on-navy-hi"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
