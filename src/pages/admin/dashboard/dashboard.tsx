import { Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import type { DashboardData } from "./api";
import { Loaded } from "./loaded";

export { clientLoader } from "api/cache";
export { loader, endowUpdateAction as action } from "./api";

export { ErrorBoundary } from "components/error";
export default function Dashboard() {
  const data = useCachedLoaderData<DashboardData>();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <Loaded {...data} />
      <Outlet />
    </div>
  );
}
