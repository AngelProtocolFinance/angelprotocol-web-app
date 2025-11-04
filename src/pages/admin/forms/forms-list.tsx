import { type IForm, is_form_expired } from "@better-giving/forms";
import { Target } from "components/target";
import { NavLink } from "react-router";
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
            {form.recipient_type === "fund" ? (
              <span className="bg-lilac inline-block mb-2 text-xs px-2 py-0.5 rounded">
                Fundraiser
              </span>
            ) : form.recipient_type === "program" ? (
              <span className="bg-green-l4 inline-block mb-2 text-xs px-2 py-0.5 rounded">
                Program
              </span>
            ) : (
              <span className="bg-blue-l4 inline-block mb-2 text-xs px-2 py-0.5 rounded">
                Nonprofit
              </span>
            )}

            <NavLink
              aria-disabled={
                form.status !== "active" || is_form_expired(form.expiration)
              }
              to={form.id}
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
