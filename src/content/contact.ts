import { site } from "./site";
import type { LinkItem } from "./types";

/**
 * The four channels worth putting behind a key. LeetCode is a practice
 * profile, not a way to reach Husain, so it stays off the dock.
 */
function channel(label: string): LinkItem {
  const match = site.socials.find((social) => social.label === label);
  if (!match) throw new Error(`contact dock: unknown channel "${label}"`);
  return match;
}

export interface ContactKey {
  /** The letter that faces up in the type case. */
  letter: string;
  /** The channel revealed when the key flips. */
  label: string;
  href: string;
  /** Screen-reader name — the letter alone is decorative. */
  ariaLabel: string;
  external?: boolean;
  download?: boolean;
  /** The email key inverts to navy so the primary action reads first. */
  primary?: boolean;
}

export const contactDock: {
  eyebrow: string;
  hint: string;
  copyLabel: string;
  copiedLabel: string;
  copiedAnnouncement: string;
  keys: ContactKey[];
} = {
  eyebrow: "FOUR WAYS IN",
  hint: "HOVER A KEY",
  copyLabel: "COPY",
  copiedLabel: "COPIED",
  copiedAnnouncement: "Email address copied",
  keys: [
    {
      letter: "T",
      label: "Email",
      href: `mailto:${site.email}`,
      ariaLabel: `Email ${site.email}`,
      primary: true,
    },
    {
      letter: "A",
      label: "LinkedIn",
      href: channel("LinkedIn").url,
      ariaLabel: "LinkedIn (opens in a new tab)",
      external: true,
    },
    {
      letter: "L",
      label: "GitHub",
      href: channel("GitHub").url,
      ariaLabel: "GitHub (opens in a new tab)",
      external: true,
    },
    {
      letter: "K",
      label: "Résumé",
      href: site.resumeUrl,
      ariaLabel: "Résumé (PDF download)",
      download: true,
    },
  ],
};
