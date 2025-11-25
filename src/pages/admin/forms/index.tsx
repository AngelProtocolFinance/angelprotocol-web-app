import { metas } from "helpers/seo";
import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types";
import { FormsList } from "./forms-list";

export { loader } from "./api";

export const meta: Route.MetaFunction = () =>
  metas({ title: "Donation forms" });

export default function Page({ loaderData: d }: Route.ComponentProps) {
  return (
    <div className="px-6 py-4 md:px-10 md:py-8">
      <h3 className="text-2xl mb-6">Donation forms</h3>
      <NavLink to="create">create form</NavLink>
      <FormsList {...d} />
      {/** form-create prompt */}
      <Outlet />
    </div>
  );
}
