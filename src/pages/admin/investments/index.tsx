import { NavLink, Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { humanize } from "helpers/decimal";
import {
  ArrowDownToLineIcon,
  ArrowLeftRightIcon,
  CircleHelp,
} from "lucide-react";
import type { LoaderData } from "./api";
import { SfPerf } from "./sf-perf";
import { Txs } from "./txs";

export { loader } from "./api";
export { clientLoader } from "api/cache";

export default function Page() {
  const { bal_lock, id, ...btxs_page1 } = useCachedLoaderData() as LoaderData;
  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <div className="font-bold text-2xl mb-4 flex items-baseline gap-x-2">
        <h3>Investments</h3>{" "}
        <Tooltip
          tip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg shadow-lg">
              <span className="block mb-2">
                Funds invested in a diversified portfolio comprising:
              </span>
              <div>
                <p>50% - Domestic and international equities</p>
                <p>30% - Fixed income</p>
                <p>15% - Crypto</p>
                <p>5% - Cash</p>
              </div>
              <Arrow />
            </Content>
          }
        >
          <CircleHelp size={16} className="text-gray ml-1" />
        </Tooltip>
      </div>
      <div className="text-xl font-heading font-semibold border border-gray-l4 p-4 rounded">
        ${humanize(bal_lock)} <SfPerf id={id} />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <NavLink
          to="withdraw"
          className="btn-outline rounded px-4.5 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowDownToLineIcon size={16} />
          Withdraw
        </NavLink>
        <NavLink
          to="transfer"
          className="btn-amber rounded px-4.5 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowLeftRightIcon size={16} />
          Transfer
        </NavLink>
      </div>
      <Txs page1={btxs_page1} classes="mt-8" />
      {/** prompts */}
      <Outlet />
    </div>
  );
}
