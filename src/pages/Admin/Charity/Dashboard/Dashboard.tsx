import Seo from "../Seo";

import Icon from "components/Icon";
import { useLoaderData } from "react-router-dom";
import { Loaded } from "./Loaded";
import { monthPeriod } from "./monthPeriod";

export default function Dashboard() {
  const [alloc, balance]: any = useLoaderData();
  const period = monthPeriod();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <Seo title="Nonprofit Dashboard" />
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      {period.isPre && (
        <div className="bg-gray-l4 text-navy-l1 text-sm p-2 rounded">
          <Icon
            type="Info"
            size={16}
            className="relative inline bottom-px mr-1"
          />
          Pending transactions are now locked for processing
        </div>
      )}

      <Loaded balances={balance} allocation={alloc} />
    </div>
  );
}
