import { Link, Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { humanize } from "helpers/decimal";
import {
  ArrowDownToLineIcon,
  ArrowLeftRightIcon,
  CircleHelp,
  PlusIcon,
} from "lucide-react";
import type { LoaderData } from "./api";
import { Txs } from "./txs";

export { loader } from "./api";
export { clientLoader } from "api/cache";

export default function Page() {
  const data = useCachedLoaderData() as LoaderData;
  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <div className="font-bold text-2xl mb-4 flex items-baseline gap-x-2">
        <h3>Savings</h3>{" "}
        <Tooltip
          tip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
        >
          <CircleHelp size={16} className="text-gray ml-1" />
        </Tooltip>
      </div>
      <p className="text-xl font-heading font-semibold border border-gray-l4 p-4 rounded">
        ${humanize(data.bal_liq)}
      </p>
      <div className="grid @2xl:grid-cols-3 mt-4 gap-4">
        <button
          className="btn-blue rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2"
          disabled
        >
          <PlusIcon size={16} />
          Add Funds <span className="text-xs">( coming soon! )</span>
        </button>
        <Link
          to="withdraw"
          className="btn-outline rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowDownToLineIcon size={16} />
          Withdraw
        </Link>
        <button className="btn-amber rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2">
          <ArrowLeftRightIcon size={16} />
          Transfer
        </button>
      </div>
      <Txs id={data.id} classes="mt-8" />
      <Outlet />
    </div>
  );
}
