import { metas } from "helpers/seo";
import { Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Loaded } from "./loaded";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const meta: Route.MetaFunction = () =>
  metas({ title: "Banking application review" });
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: bank }: Route.ComponentProps) {
  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20">
      <Loaded {...bank} />
      {/** prompts: approve, reject, success */}
      <Outlet />
    </div>
  );
}
