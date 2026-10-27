import { useEffect } from "react";

export const SITE_NAME = "Husain Bardanwala";
export const OG_IMAGE = "/og.png";

export interface PageMeta {
  /** Full document title, including the name. */
  title: string;
  /** 140–160 character description for search and social. */
  description: string;
  /** Route path beginning with "/" — used for canonical and og:url. */
  path: string;
}

function setMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps title, description, canonical and social metadata in sync with the
 * current route. The static tags in index.html cover the first paint and
 * crawlers that do not execute JavaScript; this hook is what makes each
 * route distinct in the tab, in search results, and when shared.
 */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const url = window.location.origin + path;

    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setCanonical(url);

    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });

    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
  }, [title, description, path]);
}
