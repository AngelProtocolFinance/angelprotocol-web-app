import { min_payout_amount } from "@better-giving/endowment/schema";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
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
  PlusIcon,
} from "lucide-react";
import type { BalanceMovement } from "types/npo-balance";
import { use_admin_data } from "../use-admin-data";
import type { DashboardData } from "./api";
import { PayoutsTable } from "./common/payouts-table";
import Figure from "./figure";
import { monthPeriod } from "./month-period";
import { Movements } from "./movements";
// import { SfPerf } from "./sf-perf";

interface Props extends DashboardData {
  classes?: string;
}
export function Loaded({ classes = "", ...props }: Props) {
  const now = new Date();
  const next_payout = new Date(props.next_payout);
  const data = use_admin_data();
  const payout_min = data?.endow.payout_minimum ?? min_payout_amount;
  const fetcher = useFetcher({ key: "bal-mov" });
  const period = monthPeriod();

  const nextMov = fetcher.json as unknown as BalanceMovement | undefined;

  const mov = nextMov ??
    props.bal.movementDetails ?? {
      "liq-cash": 0,
      "liq-lock": 0,
      "lock-cash": 0,
      "lock-liq": 0,
    };

  const navigate = useNavigate();

  return (
    <div className={`${classes} mt-6`}>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          to="savings"
          tooltip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          amount={`$ ${humanize(props.bal.liq ?? 0, 2)}`}
        />
        <Figure
          title="Investments"
          to="investments"
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
          amount={`$ ${humanize(props.bal.sustainabilityFundBal, 2)}`}
          // perf={<SfPerf id={props.id} />}
        />
      </div>
      <div className="grid @2xl:grid-cols-3 mt-4 gap-4">
        <button
          className="btn-blue rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2"
          disabled
        >
          <PlusIcon size={16} />
          Add Funds <span className="text-xs">( coming soon! )</span>
        </button>
        <button className="btn-outline rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2">
          <ArrowDownToLineIcon size={16} />
          Withdraw
        </button>
        <button className="btn-amber rounded-full px-4.5 py-2.5 text-sm flex items-center gap-2">
          <ArrowLeftRightIcon size={16} />
          Transfer
        </button>
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      {/** div scopes when the sticky header ends */}
      <div className="@container/period mt-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-l3 pb-1">
          <h4 className="text-lg">Grants</h4>
          <Link
            to="grants-history"
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
          <h5 className="text-lg text-gray-d1">
            ${humanize(props.bal.cash ?? 0)}
          </h5>
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

        <Movements
          disabled={period.isPre}
          mov={mov}
          classes="mt-4"
          balance={(flow) => {
            switch (flow) {
              case "liq-lock":
              case "liq-cash":
                return props.bal.liq ?? 0;
              default:
                flow satisfies `lock-${string}`;
                return props.bal.sustainabilityFundBal;
            }
          }}
        />
      </div>
      {/* <Summary
        classes="mt-4"
        alloc={props.allocation}
        balances={props.balances}
        mov={mov}
      /> */}

      {(props.bal.cash || 0) < 0 ? null : (
        <PayoutsTable
          classes="mt-6"
          records={props.recent_payouts.items}
          onLoadMore={
            props.recent_payouts.next ? () => navigate("payouts") : undefined
          }
          isLoading={false}
          disabled={false}
        />
      )}
    </div>
  );
}
