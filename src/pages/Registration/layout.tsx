import { Outlet, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
export { loader } from "./api";

export const meta: MetaFunction = ({ location: l }) =>
  metas({
    title: "Registration Portal",
    url: `${BASE_URL}/${l.pathname}`,
  });
export default function Layout() {
  const user = useLoaderData();
  return (
    <div className="grid content-start justify-items-center py-8">
      <Outlet context={user} />
    </div>
  );
}
