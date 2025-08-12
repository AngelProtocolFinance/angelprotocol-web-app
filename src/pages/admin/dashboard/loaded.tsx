import { min_payout_amount } from "@better-giving/endowment/schema";
import { Link, NavLink, useNavigate } from "@remix-run/react";
import { Info } from "components/status";
import { Arrow, Content } from "components/tooltip";
import { format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import {
  ArrowDownToLineIcon,
  ArrowLeftRightIcon,
  ArrowRightIcon,
  HistoryIcon,
  PencilIcon,
} from "lucide-react";
import { use_admin_data } from "../use-admin-data";
import type { DashboardData } from "./api";
import { PayoutsTable } from "./common/payouts-table";
import { Figure } from "./figure";

interface Props extends DashboardData {
  classes?: string;
}
export function Loaded({ classes = "", ...props }: Props) {
  const now = new Date();
  const next_payout = new Date(props.next_payout);
  const data = use_admin_data();
  const payout_min = data?.endow.payout_minimum ?? min_payout_amount;

  const navigate = useNavigate();

  return (
    <div className={`${classes} mt-6`}>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          to="../savings"
          tooltip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          amount={`$ ${humanize(props.bal_liq, 2)}`}
        />
        <Figure
          title="Investments"
          to="../investments"
          tooltip={
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
          amount={`$ ${humanize(props.bal_lock, 2)}`}
          // perf={<SfPerf id={props.id} />}
        />
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

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      {/** div scopes when the sticky header ends */}
      <div className="@container/period mt-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-l3 pb-1">
          <h4 className="text-lg">Grants</h4>
          <Link
            to="grants"
            className="group flex items-center gap-x-1 text-blue hover:text-blue-d1"
          >
            <HistoryIcon
              size={18}
              className="group-hover:hidden @max-lg:hidden"
            />
            <ArrowRightIcon
              size={18}
              className=" @max-lg:hidden hidden @lg:group-hover:block group-active:translate-x-0.5"
            />
            <span className="text-sm">Grants History</span>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-1">
          <h5 className="text-lg text-gray-d1">${humanize(props.bal_cash)}</h5>
          <p className="text-sm text-gray mt-1">
            pays out {format(next_payout, "PP")}- in{" "}
            {formatDistance(next_payout, now)}.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray">Payout threshold</p>
          <div className="flex gap-x-1 items-center">
            <p className="font-semibold text-amber-d1">
              ${humanize(payout_min)}
            </p>
            <Link
              to={{ pathname: "payout-min", search: `?min=${payout_min}` }}
              replace
              preventScrollReset
              className="text-xs"
            >
              <PencilIcon size={12} />
            </Link>
          </div>
        </div>
        {props.pm ? (
          <div className="mt-4">
            <p className="text-sm text-gray">Default Payout Method</p>

            <Link
              to="../banking"
              className="text-blue hover:text-blue-d1 text-sm"
            >
              {props.pm.bankSummary}
            </Link>
          </div>
        ) : (
          <div className="flex items-center mt-4">
            <Info>No default payout method</Info>
            <Link
              to="../banking"
              className="text-sm text-blue hover:text-blue-d1"
            >
              Setup
            </Link>
          </div>
        )}
      </div>

      {props.recent_payouts.items.length > 0 ? (
        <PayoutsTable
          classes="mt-6"
          items={props.recent_payouts.items}
          load_next={
            props.recent_payouts.next ? () => navigate("payouts") : undefined
          }
        />
      ) : null}
    </div>
  );
}
