import type { ReactNode } from "react";
import { Container } from "../components/ui/Container";

/** Placeholder for routes scheduled in later phases (see IMPLEMENTATION_PLAN.md §20). */
function Placeholder({ title, phase }: { title: string; phase: string }) {
  return (
    <section className="pt-[72px] max-md:pt-[60px]">
      <Container className="section-pad">
        <div className="col-span-12 flex min-h-[50vh] flex-col items-start justify-center md:col-span-8 lg:col-span-12">
          <p className="text-mono-label text-orange-deep">{phase}</p>
          <h1 className="text-section-title mt-4 text-navy-900">{title}</h1>
          <p className="mt-4 max-w-[48ch] text-muted">
            This route is scaffolded and will be implemented in a later phase.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function WorkPlaceholder(): ReactNode {
  return <Placeholder title="Work" phase="PHASE 4 — WORK INDEX" />;
}

export function WorkSlugPlaceholder(): ReactNode {
  return <Placeholder title="Case Study" phase="PHASE 3 — CASE STUDY TEMPLATE" />;
}

export function EngineeringPlaceholder(): ReactNode {
  return <Placeholder title="Engineering" phase="PHASE 5 — ENGINEERING" />;
}

export function AboutPlaceholder(): ReactNode {
  return <Placeholder title="About" phase="PHASE 5 — ABOUT" />;
}

export function ContactPlaceholder(): ReactNode {
  return <Placeholder title="Contact" phase="PHASE 5 — CONTACT" />;
}

export function NotFoundPlaceholder(): ReactNode {
  return <Placeholder title="Page not found" phase="404 — RECOVERY" />;
}
