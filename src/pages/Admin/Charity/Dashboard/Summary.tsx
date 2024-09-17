import Icon from "components/Icon";
import { humanize } from "helpers";
import type { Allocation, BalanceMovement, EndowmentBalances } from "types/aws";

interface Props {
  balances: EndowmentBalances;
  alloc: Allocation;
  mov: BalanceMovement;
  classes?: string;
}

export function Summary({ classes = "", ...props }: Props) {
  const liqDonation = props.balances.payoutsPending * (props.alloc.liq / 100);
  const lockDonation = props.balances.payoutsPending * (props.alloc.lock / 100);

  const liqItems = [
    ["Donation", liqDonation],
    ["Grant", -props.mov["liq-cash"]],
    ["Investment", -props.mov["liq-lock"]],
  ].filter(([, v]) => Math.abs(+v) > 0) as [string, number][];

  const lockItems = [
    ["Donation", lockDonation],
    ["Grant", -props.mov["lock-cash"]],
    ["Savings", -props.mov["lock-liq"]],
  ].filter(([, v]) => Math.abs(+v) > 0) as [string, number][];

  //no changes
  if (liqItems.length === 0 && lockItems.length === 0) return null;

  return (
    <div className={`${classes} p-4 rounded border border-gray-l4`}>
      <h4 className="mb-6">Ending balances</h4>
      <div className="grid grid-cols-[auto_auto_auto_1fr]">
        <Balance
          title="Savings"
          balance={props.balances.liq ?? 0}
          changes={liqItems}
        />
        <Balance
          title="Investments"
          balance={props.balances.sustainabilityFundBal}
          changes={lockItems}
          classes="mt-6"
        />
      </div>
    </div>
  );
}

interface IItem {
  title: string;
  balance: number;
  changes: [string, number][];
  classes?: string;
}

function Balance({ classes = "", ...props }: IItem) {
  const change = props.changes.reduce((sum, [, v]) => v + sum, 0);
  return (
    <div
      className={`grid grid-cols-subgrid col-span-full gap-y-2 divide-y divide-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-subgrid items-center col-span-full">
        <p className="text-sm font-semibold mr-2">{props.title}</p>
        <span className="font-heading mr-2">
          $ {humanize(props.balance + change)}
        </span>
        {change ? (
          <p
            className={`${
              change > 0 ? "text-green" : "text-red"
            } flex items-center font-heading text-sm`}
          >
            <Icon type={change < 0 ? "Dash" : "Plus"} size={14} />
            <span>$ {humanize(Math.abs(change))}</span>
          </p>
        ) : (
          <div />
        )}
      </div>
      {props.changes.length > 0 && (
        <div className="pt-2 grid grid-cols-subgrid col-span-full">
          {props.changes.map(([toOrFrom, value], idx) => (
            <div
              key={idx}
              className="grid grid-cols-subgrid col-span-full items-center"
            >
              <Icon
                size={14}
                className={`${
                  value > 0 ? "text-green" : "text-navy-l1"
                } justify-self-end mr-4`}
                type={value > 0 ? "ArrowRight" : "ArrowLeft"}
              />
              <p className="font-heading">$ {humanize(Math.abs(value))}</p>
              <p className="text-xs text-navy-l1">
                {value > 0 ? "from" : "to"}
              </p>
              <p className="ml-4 text-sm text-navy-l1">{toOrFrom}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
