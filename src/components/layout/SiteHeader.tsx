import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { cn } from "../../lib/utils";
import { site } from "../../content/site";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex items-center gap-2 font-display text-base font-medium text-ink"
      aria-label="Husain Bardanwala — home"
    >
      <span aria-hidden="true" className="wordmark-mark" />
      Husain Bardanwala
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    overlayRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[72px] border-b border-rule-on-cream transition-colors duration-300 max-md:h-[60px]",
          scrolled ? "bg-canvas/90 backdrop-blur-[12px]" : "bg-canvas",
        )}
      >
        <nav
          className="grid-frame h-full items-center"
          aria-label="Primary"
        >
          <div className="col-span-2 md:col-span-4 lg:col-span-6">
            <Wordmark />
          </div>

          <div className="col-span-2 flex items-center justify-end md:col-span-4 lg:col-span-6">
            <ul className="hidden items-center gap-8 lg:flex">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "nav-link text-mono-label text-ink/80 hover:text-ink",
                        isActive && "is-active text-ink",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  "block h-0.5 w-6 bg-navy-900 transition-transform duration-200",
                  menuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-navy-900 transition-transform duration-200",
                  menuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="site-menu"
          ref={overlayRef}
          tabIndex={-1}
          className="fixed inset-0 z-40 flex flex-col bg-canvas pt-[76px] lg:hidden"
        >
          <nav
            className="grid-frame flex-1 content-start"
            aria-label="Mobile"
          >
            <ul className="col-span-4 mt-8 flex flex-col gap-8">
              {site.nav.map((item, index) => (
                <li key={item.href} className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="text-mono-label text-orange"
                  >
                    0{index + 1}
                  </span>
                  <NavLink
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "font-display text-[clamp(2rem,8vw,3rem)] font-medium leading-none tracking-[-0.02em] text-ink",
                        isActive && "text-orange-deep",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              className="col-span-4 mb-10 text-mono-meta text-muted hover:text-orange-deep"
            >
              {site.email}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
