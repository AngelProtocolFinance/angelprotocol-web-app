import { Info } from "components/Status";
import { Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import type { PayoutMethod } from "types/aws";
import Table from "./Table";

export default function PayoutMethods() {
  const methods = useLoaderData() as PayoutMethod[];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-left text-lg uppercase">Current Banking Details</h1>
        <Link to="new" className="btn-green pl-2 pr-4 py-2 text-xs">
          <Plus className="mr-2" size={16} />
          <span>New</span>
        </Link>
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
