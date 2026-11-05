import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { contactDock } from "../../content/contact";
import { site } from "../../content/site";

/**
 * Instant flip — no spring, no easing. The key turns over the moment you
   hover and turns back the moment you leave.
 */
const INSTANT = { duration: 0 } as const;
const CAP_LIFT = { y: -6 } as const;

/** One letterpress key in the TALK dock. On hover the key flips instantly and
   the channel name on the back face scales up with the same instant snap, so
   the reveal feels like a physical toggle rather than an animation. */
function ContactKey({ keyObj }: { keyObj: (typeof contactDock.keys)[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li key={keyObj.letter}>
      <motion.a
        href={keyObj.href}
        aria-label={keyObj.ariaLabel}
        className={cn("contact-key", keyObj.primary && "contact-key--primary")}
        {...(keyObj.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(keyObj.download ? { download: "" } : {})}
        whileHover={CAP_LIFT}
        whileTap={{ scale: 0.94 }}
        transition={INSTANT}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span
          className={cn("contact-key__cap", isHovered && "contact-key__cap--hovered")}
          aria-hidden="true"
        >
          <motion.span
            className="contact-key__inner"
            animate={{ rotateX: isHovered ? 180 : 0 }}
            transition={INSTANT}
            style={{ willChange: isHovered ? "transform" : "auto" }}
          >
            {/* Front face: the letter recedes slightly as the key turns away. */}
            <motion.span
              className="contact-key__face contact-key__face--front"
              animate={{ scale: isHovered ? 0.78 : 1 }}
              transition={INSTANT}
            >
              {keyObj.letter}
            </motion.span>
            {/* Back face: always rotated away at rest (rotateX 180°), so it only
                becomes visible when the inner container flips on hover. Motion
                owns transform here, so rotateX must be declared in animate —
                otherwise Motion's scale-only inline style replaces the CSS
                rotateX and both faces show at once. */}
            <motion.span
              className="contact-key__face contact-key__face--back"
              animate={{
                rotateX: 180,
                scale: isHovered ? 1.25 : 0.9,
              }}
              transition={INSTANT}
            >
              {keyObj.label}
            </motion.span>
          </motion.span>
        </span>
        {/* Static fallback for touch / reduced motion — the reveal is never the only channel. */}
        <span className="contact-key__label" aria-hidden="true">
          {keyObj.label}
        </span>
      </motion.a>
    </li>
  );
}

/**
 * Contact dock — four letterpress keys spell TALK, one channel each.
 * Hover or focus a key: it flips and the channel name enlarges with a spring pop.
 * Touch and reduced-motion users get the channel names statically.
 */
export function ContactKeys() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    },
    [],
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current !== undefined) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked; the address stays selectable.
    }
  }

  return (
    <div className="contact-dock">
      <p className="text-mono-label text-cream/90">{contactDock.eyebrow}</p>

      <ul className="contact-case" aria-label="Ways to reach Husain">
        {contactDock.keys.map((key) => (
          <ContactKey key={key.letter} keyObj={key} />
        ))}
      </ul>

      <p className="contact-dock__hint text-mono-label">{contactDock.hint}</p>

      <div className="contact-dock__direct">
        <a href={`mailto:${site.email}`} className="contact-dock__email">
          {site.email}
        </a>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={copyEmail}
          data-copied={copied ? "true" : undefined}
          className="contact-dock__copy"
        >
          {copied ? contactDock.copiedLabel : contactDock.copyLabel}
        </motion.button>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? contactDock.copiedAnnouncement : ""}
        </span>
      </div>
    </div>
  );
}
