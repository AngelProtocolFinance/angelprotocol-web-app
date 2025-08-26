import { CircleAlert } from "lucide-react";
import { Outlet, useLoaderData } from "react-router";
import type { DashboardData } from "./api";
import { Loaded } from "./loaded";
import { monthPeriod } from "./month-period";

export {
  dashboardData as loader,
  endowUpdateAction as action,
} from "./api";

export { ErrorBoundary } from "components/error";
export default function Dashboard() {
  const { alloc, bal, id } = useLoaderData<DashboardData>();
  const period = monthPeriod();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      {period.isPre && (
        <div className="bg-gray-l4 text-gray text-sm p-2 rounded-sm">
          <CircleAlert size={16} className="relative inline bottom-px mr-1" />
          Pending transactions are now locked for processing
        </div>
      )}

      <Loaded balances={bal} allocation={alloc} id={id} />
      {/** prompts render here */}
      <Outlet />
    </div>
  );
}
