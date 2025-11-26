import type { IForm } from "lib/forms";
import { TagIcon } from "lucide-react";
import { NavLink, href } from "react-router";
import { Target } from "./target";

interface Props extends IForm {
  classes?: string;
}
export function FormCard({ classes = "", ...f }: Props) {
  const styles: Record<string, string | undefined> = {
    "--accent-primary": f.accent_primary,
    "--accent-secondary": f.accent_secondary,
  };
  return (
    <div
      style={styles}
      key={f.id}
      className="flex flex-col p-4 border border-gray-l3 rounded-b"
    >
      <h3 className="text-lg">{f.name}</h3>
      {f.program && (
        <p className="text-sm text-gray-d4 mt-1">
          <span className="text-2xs bg-gray-l3 p-1 rounded-xs">Program</span>{" "}
          <span className="text-sm font-medium text-gray">
            {f.program.name}
          </span>
        </p>
      )}
      <Target classes="mt-8 mb-4" target={f.target} progress={f.ltd} />
      <div className="flex items-center justify-between mt-auto">
        {f.tag && (
          <p className="pl-1 text-gray">
            <TagIcon size={13} className="inline-block  mr-1" />
            <span className=" text-sm">{f.tag}</span>
          </p>
        )}
        <NavLink
          to={href("/forms/:id/edit", { id: f.id })}
          className="btn btn-outline text-xs py-2 px-3.5 justify-self-end"
        >
          View
        </NavLink>
      </div>
    </div>
  );
}
