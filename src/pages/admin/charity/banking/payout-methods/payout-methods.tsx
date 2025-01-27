import { NavLink } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { Plus } from "lucide-react";
import type { LoaderData } from "./api";
import Table from "./table";

export { loader } from "./api";

export { ErrorBoundary } from "components/error";
export default function PayoutMethods() {
  const { methods } = useCachedLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-left text-lg uppercase">Current Banking Details</h1>
        <NavLink to="new" className="btn-green pl-2 pr-4 py-2 text-xs">
          <Plus className="mr-2" size={16} />
          <span>New</span>
        </NavLink>
      </div>

      {methods.length === 0 ? (
        <Info>No payout methods found</Info>
      ) : (
        <div className="grid col-span-full overflow-x-auto">
          <Table methods={methods} />
        </div>
      )}
    </div>
  );
}
