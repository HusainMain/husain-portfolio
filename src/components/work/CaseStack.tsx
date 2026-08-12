import type { CaseStudyStack } from "../../content/types";
import { TagRow } from "../ui/Tag";
import { Stagger } from "../motion/Stagger";

/** Stack section — grouped mono tags (frontend / backend / shared), progressive groups. */
export function CaseStack({ stack }: { stack: CaseStudyStack[] }) {
  return (
    <Stagger step={90} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stack.map((group) => (
        <div key={group.group} className="flex flex-col gap-3">
          <h3 className="text-mono-label text-muted">{group.group}</h3>
          <TagRow items={group.tags} />
        </div>
      ))}
    </Stagger>
  );
}