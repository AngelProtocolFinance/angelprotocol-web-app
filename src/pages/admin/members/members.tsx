import { useLoaderData } from "react-router";
import type { LoaderData } from "./api";
import { List } from "./list";

export { members as loader, deleteAction as action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Members() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Manage Members</h3>
      <List {...data} />
    </div>
  );
}
