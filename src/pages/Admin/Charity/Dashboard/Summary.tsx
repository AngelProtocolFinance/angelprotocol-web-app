import Icon from "components/Icon";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { humanize } from "helpers";
import type { ReactNode } from "react";
import type { Allocation, BalanceMovement, EndowmentBalances } from "types/aws";
import { MIN_PROCESSING_AMOUNT } from "./Schedule/common";

interface Props {
  balances: EndowmentBalances;
  alloc: Allocation;
  mov: BalanceMovement;
  classes?: string;
}

export function Summary({ classes = "", ...props }: Props) {
  const liqDonation = props.balances.payoutsPending * (props.alloc.liq / 100);
  const lockDonation = props.balances.payoutsPending * (props.alloc.lock / 100);
  const grantDonation =
    props.balances.payoutsPending * (props.alloc.cash / 100);

  const liqItems = [
    ["0", "from Donation", liqDonation] as const,
    ["1", "from Investment", props.mov["lock-liq"]] as const,
    ["2", "to Investment", -props.mov["liq-lock"]] as const,
    ["3", "to Grant", -props.mov["liq-cash"]] as const,
  ]
    .toSorted(([ka], [kb]) => ka.localeCompare(kb))
    .filter(([, , v]) => Math.abs(+v) > 0)
    .map(([, k, v]) => [k, v]);

  const lockItems = [
    ["0", "from Donation", lockDonation] as const,
    ["1", "from Savings", props.mov["liq-lock"]] as const,
    ["2", "to Savings", -props.mov["lock-liq"]] as const,
    ["3", "to Grant", -props.mov["lock-cash"]] as const,
  ]
    .toSorted(([ka], [kb]) => ka.localeCompare(kb))
    .filter(([, , v]) => Math.abs(+v) > 0)
    .map(([, k, v]) => [k, v]);

  const grantItems = [
    ["0", "from Donations", grantDonation] as const,
    ["1", "from Savings", props.mov["liq-cash"]] as const,
    ["2", "from Investment", props.mov["lock-cash"]] as const,
  ]
    .toSorted(([ka], [kb]) => ka.localeCompare(kb))
    .filter(([, , v]) => Math.abs(+v) > 0)
    .map(([, k, v]) => [k, v]);

  //no changes
  if (
    liqItems.length === 0 &&
    lockItems.length === 0 &&
    grantItems.length === 0
  )
    return null;

  return (
    <div className={`${classes} p-4 rounded border border-gray-l4`}>
      <h4 className="mb-6 flex items-center gap-2">
        <span>Projected Month End Balances</span>
        <Tooltip
          tip={
            <Content className="bg-navy-d4 text-gray-l2 text-xs p-2 rounded">
              This value does not reflect any potential growth from savings and
              investments
              <Arrow />
            </Content>
          }
        >
          <Icon type="Info" className="text-navy-l1" size={15} />
        </Tooltip>
      </h4>
      <div className="grid grid-cols-[auto_auto_auto_1fr]">
        <Balance
          title="Grants"
          balance={null}
          changes={grantItems as [string, number][]}
          classes="mb-4"
          tooltip={(change) => {
            if (change === 0) return null;
            if (change >= MIN_PROCESSING_AMOUNT) return null;
            return (
              <Tooltip
                tip={
                  <Content className="max-w-xs text-sm bg-navy-d4 text-gray-l4 p-3 rounded-lg">
                    Total Grant is less than minimum processing amount of $
                    {MIN_PROCESSING_AMOUNT} and would be carried over to the
                    next month.
                    <Arrow />
                  </Content>
                }
              >
                <Icon
                  type="Info"
                  size={16}
                  className="inline mr-auto text-amber"
                />
              </Tooltip>
            );
          }}
        />
        <Balance
          title="Savings"
          balance={props.balances.liq ?? 0}
          changes={liqItems as [string, number][]}
        />
        <Balance
          title="Investments"
          balance={props.balances.sustainabilityFundBal}
          changes={lockItems as [string, number][]}
          classes="mt-6"
        />
      </div>
    </div>
  );
}

interface IItem {
  title: string;
  balance: number | null;
  changes: [string, number][];
  classes?: string;
  tooltip?: (change: number) => ReactNode;
}

function Balance({ classes = "", ...props }: IItem) {
  const change = props.changes.reduce((sum, [, v]) => v + sum, 0);

  const headerAmount = props.balance === null ? change : props.balance + change;
  const changeAmount = props.balance === null ? null : change;

  return (
    <div
      className={`grid grid-cols-subgrid col-span-full gap-y-2 divide-y divide-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-subgrid items-center col-span-full">
        <p className="text-sm font-semibold mr-2">{props.title}</p>
        <p className="mr-2 flex items-center gap-1">
          <span className="font-heading">$ {humanize(headerAmount)}</span>
          {props.tooltip?.(change)}
        </p>
        {changeAmount !== null ? (
          <p
            className={`${
              changeAmount > 0 ? "text-green" : "text-red"
            } flex items-center font-heading text-sm`}
          >
            &#40;
            <Icon type={changeAmount < 0 ? "Dash" : "Plus"} size={14} />
            <span> $ {humanize(Math.abs(changeAmount))} &#41;</span>
          </p>
        ) : (
          <span />
        )}
      </div>
      {props.changes.length > 0 && (
        <div className="pt-2 grid grid-cols-subgrid col-span-full">
          {props.changes.map(([toOrFrom, value], idx) => (
            <div
              key={idx}
              className="grid grid-cols-subgrid col-span-full items-center"
            >
              <p className="flex items-center mr-4">
                <Icon
                  size={14}
                  className={`${
                    value > 0 ? "text-green" : "text-navy-l1"
                  } justify-self-end mr-2`}
                  type={value > 0 ? "ArrowRight" : "ArrowLeft"}
                />
                <span className="text-sm text-navy-l1">{toOrFrom}</span>
              </p>
              <p className="font-heading">$ {humanize(Math.abs(value))}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
