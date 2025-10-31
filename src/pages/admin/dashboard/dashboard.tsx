import { Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/dashboard";
import { Loaded } from "./loaded";

export { loader, endowUpdateAction as action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";

export default CacheRoute(Dashboard);
function Dashboard({ loaderData: data }: Route.ComponentProps) {
  return (
    <div className="px-6 py-4 md:px-10 md:py-8 w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <Loaded {...data} />
      <Outlet />
    </div>
  );
}
