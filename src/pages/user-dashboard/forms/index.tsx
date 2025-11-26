import { FormCard } from "components/form-card";
import { metas } from "helpers/seo";
import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types";
export { loader } from "./api";
export const meta: Route.MetaFunction = () =>
  metas({ title: "Donation forms" });
export default function Page({ loaderData: d }: Route.ComponentProps) {
  return (
    <div className="px-6 py-4 md:px-10 md:py-8">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-2xl">Donation forms</h3>
          <p className="mb-6 font-medium mt-1 text-gray-d1">
            Accept donations from your website today!
          </p>
        </div>
        <NavLink
          to="create"
          className="btn btn-blue text-sm normal-case px-4 py-2"
        >
          Create Form
        </NavLink>
      </div>
      <div className="grid gap-4 grid-cols-2">
        {d.items.map((f) => (
          <FormCard key={f.id} {...f} />
        ))}
      </div>
      {/** form-create prompt */}
      <Outlet />
    </div>
  );
}
