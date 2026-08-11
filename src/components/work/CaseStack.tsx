import type { CaseStudyStack } from "../../content/types";
import { TagRow } from "../ui/Tag";

/** Stack section — grouped mono tags (frontend / backend / shared). */
export function CaseStack({ stack }: { stack: CaseStudyStack[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {stack.map((group) => (
        <li key={group.group} className="flex flex-col gap-3">
          <h3 className="text-mono-label text-muted">{group.group}</h3>
          <TagRow items={group.tags} />
        </li>
      ))}
    </ul>
  );
}
