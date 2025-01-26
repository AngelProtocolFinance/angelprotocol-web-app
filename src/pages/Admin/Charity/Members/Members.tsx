import { useCachedLoaderData } from "api/cache";
import { List } from "./List";
import type { LoaderData } from "./api";

export { clientLoader } from "api/cache";
export { members as loader, deleteAction as action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Members() {
  const data = useCachedLoaderData<LoaderData>();
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Manage Members</h3>
      <List {...data} />
    </div>
  );
}
