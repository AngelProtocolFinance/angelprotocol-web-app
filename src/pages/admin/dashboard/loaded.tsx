import { min_payout_amount } from "@better-giving/endowment/schema";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import { Info } from "components/status";
import { Arrow, Content } from "components/tooltip";
import { format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { ChartSpline, PencilIcon, PiggyBank, UsersRound } from "lucide-react";
import type { BalanceMovement } from "types/npo-balance";
import { use_admin_data } from "../use-admin-data";
import type { DashboardData } from "./api";
import { PayoutsTable } from "./common/payouts-table";
import Figure from "./figure";
import { LiqActions } from "./liq-actions";
import { LockActions } from "./lock-actions";
import { monthPeriod } from "./month-period";
import { Movements } from "./movements";
import { SfPerf } from "./sf-perf";

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
          tooltip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          icon={<PiggyBank size={21} strokeWidth={1.5} />}
          amount={`$ ${humanize(props.bal.liq ?? 0, 2)}`}
          actions={
            <LiqActions
              disabled={period.isPre}
              classes="mt-8"
              mov={mov}
              balance={props.bal.liq ?? 0}
            />
          }
        />
        <Figure
          title="Investments"
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
          icon={<ChartSpline size={16} />}
          amount={`$ ${humanize(props.bal.sustainabilityFundBal, 2)}`}
          perf={<SfPerf id={props.id} />}
          actions={
            <LockActions
              disabled={period.isPre}
              classes="mt-8"
              balance={props.bal.sustainabilityFundBal ?? 0}
              mov={mov}
            />
          }
        />
        <Figure
          title="Contributions count"
          icon={<UsersRound size={17} />}
          amount={props.bal.contributionsCount.toString()}
        />
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      {/** div scopes when the sticky header ends */}
      <div className="@container/period mt-4">
        <h4 className="text-lg mb-2">Grants</h4>
        <div className="flex flex-wrap items-center gap-x-1">
          <h5 className="text text-gray-d1">
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
