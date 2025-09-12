import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import { Outlet } from "react-router";
export { loader } from "./api";
import type { Route } from "./+types/layout";

export const meta: Route.MetaFunction = ({ location: l }) =>
  metas({
    title: "Registration Portal",
    url: `${BASE_URL}/${l.pathname}`,
  });

export default function Layout({ loaderData: user }: Route.ComponentProps) {
  return (
    <div className="grid content-start justify-items-center py-8">
      <Outlet context={user} />
    </div>
  );
}
