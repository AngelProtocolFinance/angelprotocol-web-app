import { Target } from "components/target";
import type { IForm } from "lib/forms";
import { NavLink, href } from "react-router";
import type { IPaginator } from "types/components";

interface Props extends IPaginator<IForm> {
  classes?: string;
}
export function FormsList({ items, classes = "" }: Props) {
  return (
    <div className={`${classes} grid gap-4 grid-cols-2`}>
      {items.map((form) => (
        <div key={form.id} className="p-4 border border-gray-l3 rounded">
          <div className="flex items-center justify-between">
            <NavLink
              to={href("/forms/:id/edit", { id: form.id })}
              className="btn btn-outline text-xs py-2 px-3.5"
            >
              Edit
            </NavLink>
          </div>
          <h3 className="text-lg">{form.name}</h3>
          <Target classes="mt-4" target={form.target} progress={form.ltd} />
        </div>
      ))}
    </div>
  );
}
