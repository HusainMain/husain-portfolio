import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";

/**
 * 05 / ENGINEERING TOOLKIT — four verified groups as compact mono chips that
 * wrap naturally. Full-frame content cell so the 4 columns align to the frame.
 * No bars, no percentages, no proficiency levels.
 */
export function ToolkitSection() {
  return (
    <CaseSection eyebrow="05 / ENGINEERING TOOLKIT" contentClassName="lg:col-span-12 lg:col-start-1">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {engineering.toolkit.groups.map((group) => (
          <div key={group.group}>
            <h3 className="text-mono-label text-muted">{group.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <li key={tag}>
                  <span className="chip inline-block">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}
