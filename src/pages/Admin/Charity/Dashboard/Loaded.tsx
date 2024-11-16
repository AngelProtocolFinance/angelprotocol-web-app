import type { Allocation } from "@better-giving/endowment";
import { Arrow, Content } from "components/Tooltip";
import { humanize } from "helpers";
import { ChartSpline, PiggyBank, UsersRound } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import { useFetcher } from "react-router-dom";
import type { BalanceMovement } from "types/aws";
import type { EndowmentBalances } from "types/aws";
import Figure from "./Figure";
import { LiqActions } from "./LiqActions";
import { LockActions } from "./LockActions";
import { Movements } from "./Movements";
import { PayoutHistory } from "./PayoutHistory";
import { Schedule } from "./Schedule";
import { Summary } from "./Summary";
import { monthPeriod } from "./monthPeriod";

interface Props {
  balances: EndowmentBalances;
  allocation: Allocation;
  classes?: string;
}
export function Loaded({ classes = "", ...props }: Props) {
  const fetcher = useFetcher({ key: "bal-mov" });
  const { id } = useAdminContext();
  const period = monthPeriod();

  const nextMov = fetcher.json as unknown as BalanceMovement | undefined;

  const mov = nextMov ??
    props.balances.movementDetails ?? {
      "liq-cash": 0,
      "liq-lock": 0,
      "lock-cash": 0,
      "lock-liq": 0,
    };

  return (
    <div className={`${classes} mt-6`}>
      <h3 className="uppercase mb-4 font-black">Account Balances</h3>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          icon={<PiggyBank size={21} strokeWidth={1.5} />}
          amount={`$ ${humanize(props.balances.liq ?? 0, 2)}`}
          actions={
            <LiqActions
              disabled={period.isPre}
              classes="mt-8"
              endowId={id}
              mov={mov}
              balance={props.balances.liq ?? 0}
            />
          }
        />
        <Figure
          title="Investments"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg shadow-lg">
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
          amount={`$ ${humanize(props.balances.sustainabilityFundBal, 2)}`}
          actions={
            <LockActions
              disabled={period.isPre}
              classes="mt-8"
              balance={props.balances.sustainabilityFundBal ?? 0}
              endowId={id}
              mov={mov}
            />
          }
        />
        <Figure
          title="Contributions count"
          icon={<UsersRound size={17} />}
          amount={props.balances.contributionsCount.toString()}
        />
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      {/** div scopes when the sticky header ends */}
      <div className="@container/period">
        <h3 className="py-4 font-medium flex flex-col @lg/period:flex-row @lg/period:justify-between gap-y-2  sticky top-[4rem] bg-white z-10">
          <div className="flex items-center">
            <span className="text-sm uppercase font-normal">Period</span>
            <span className="ml-2 uppercase text-sm">
              {period.from} - {period.to}
            </span>
          </div>
          <p className="text-sm text-navy-l3">
            <span>Ends in </span>
            <span className="p-1 px-2 bg-navy-d4 text-gray-l4 text-xs rounded ml-1">
              in {period.distance}
            </span>
          </p>
        </h3>

        <Movements
          disabled={period.isPre}
          endowId={id}
          mov={mov}
          classes="mt-4"
          balance={(flow) => {
            switch (flow) {
              case "liq-lock":
              case "liq-cash":
                return props.balances.liq ?? 0;
              default:
                flow satisfies `lock-${string}`;
                return props.balances.sustainabilityFundBal;
            }
          }}
        />
        <Schedule
          disabled={period.isPre}
          amount={props.balances.payoutsPending}
          periodNext={period.next}
          periodRemaining={period.distance}
          allocation={props.allocation}
        />
      </div>
      <Summary
        classes="mt-4"
        alloc={props.allocation}
        balances={props.balances}
        mov={mov}
      />

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />
      <PayoutHistory classes="mt-2" />
    </div>
  );
}
