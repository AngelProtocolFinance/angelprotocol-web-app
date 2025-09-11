import { Outlet, useLoaderData } from "react-router";
import type { DashboardData } from "./api";
import { Loaded } from "./loaded";

export { loader, endowUpdateAction as action } from "./api";

export { ErrorBoundary } from "components/error";
export default function Dashboard() {
  const data = useLoaderData<DashboardData>();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <Loaded {...data} />
      <Outlet />
    </div>
  );
}
