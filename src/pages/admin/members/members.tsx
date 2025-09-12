import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/members";
import { List } from "./list";

export { members as loader, delete_action as action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: data }: Route.ComponentProps) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Manage Members</h3>
      <List {...data} />
    </div>
  );
}
