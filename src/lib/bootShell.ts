/**
 * The first-paint shell is static markup in `index.html`: a copy of the entry
 * card's opening frame, painted from the document before any JavaScript has
 * been downloaded. It exists only for the gap between first paint and the
 * React commit, so it is removed — never animated out — once the app has
 * mounted. On the homepage the real card is committed in the same frame, so
 * the swap is invisible; on a repeat visit or with reduced motion the shell
 * was never shown and this is a no-op.
 *
 * Called from a layout effect so the removal lands before the browser paints
 * the frame in which React has taken over.
 */
export function releaseBootShell(): void {
  const root = document.documentElement;
  if (!root.hasAttribute("data-entry")) return;

  root.removeAttribute("data-entry");
  document.getElementById("boot")?.remove();
}
