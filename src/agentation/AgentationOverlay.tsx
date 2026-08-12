import { lazy, Suspense, useMemo } from "react";

const AGENTATION_SYNC_ENDPOINT = "http://localhost:4747";

export default function AgentationOverlay() {
  if (!import.meta.env.DEV) return null;

  const Agentation = useMemo(
    () =>
      lazy(() => import("agentation").then((m) => ({ default: m.Agentation }))),
    [],
  );

  return (
    <Suspense fallback={null}>
      <Agentation endpoint={AGENTATION_SYNC_ENDPOINT} />
    </Suspense>
  );
}
