import type { Allocation } from "@better-giving/endowment";
import { NavLink } from "@remix-run/react";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { humanize } from "helpers";
import { CircleHelp, HandCoins, Pencil, PiggyBank, Sprout } from "lucide-react";
import type { ReactNode } from "react";
import { allocationOptions, toAllocOptValue } from "./common";

interface Props {
  amount: number;
  allocation: Allocation;
  classes?: string;
  periodNext: string;
  periodRemaining: string;
  disabled?: boolean;
}
export function Schedule(props: Props) {
  const presetOpt = allocationOptions.find(
    (opt) => opt.value === toAllocOptValue(props.allocation)
  );

  return (
    <div className="p-4 grid rounded-sm border border-gray-l4 mt-4">
      <div className="grid border-b border-gray-l4 w-full pb-2">
        <h4 className="mb-1">Current Month Donations</h4>
        <p className="font-heading font-medium">$ {humanize(props.amount)}</p>
      </div>
      <div className="flex items-center mt-4 gap-x-2">
        <h4 className="mb-1">Distribution</h4>
        {presetOpt ? (
          <div className="text-sm flex items-center gap-x-1 bg-blue-l4 rounded-full px-3 py-1">
            <span className="scale-75">{presetOpt.icon}</span>
            <span className="text-xs text-gray">{presetOpt.label}</span>
          </div>
        ) : null}

        <NavLink
          title="Edit allocation settings"
          to="edit-alloc"
          replace
          preventScrollReset
          aria-disabled={props.disabled}
          className="hover:text-blue disabled:text-gray [&:is(.pending)]:text-gray"
        >
          <Pencil className="h-4 w-4" />
        </NavLink>
      </div>

      <div className="grid grid-cols-[auto_auto_auto_1fr_auto_auto] gap-y-3 gap-x-2 mt-4">
        <Row
          icon={<HandCoins className="h-4 w-4 mr-2 text-gray" />}
          title={
            <div className="flex items-center">
              <span>Grants</span>
              <Tooltip
                tip={
                  <Content className="max-w-xs bg-gray-d4 p-4 text-gray-l4 text-sm shadow-lg rounded-lg">
                    Donations received through Better Giving that will
                    distributed to your bank account.
                    <Arrow />
                  </Content>
                }
              >
                <CircleHelp size={14} className="text-gray ml-1" />
              </Tooltip>
            </div>
          }
          pct={props.allocation.cash}
          amount={props.amount}
        />
        <Row
          icon={<PiggyBank width={20} className="mr-2 text-amber" />}
          title={<span>Savings</span>}
          pct={props.allocation.liq}
          amount={props.amount}
        />

        <Row
          icon={<Sprout size={20} className="mr-2 text-green" />}
          title={<span>Investments</span>}
          pct={props.allocation.lock}
          amount={props.amount}
        />
      </div>
    </div>
  );
}

interface IRow {
  amount: number;
  pct: number;
  icon: ReactNode;
  title: ReactNode;
}
function Row(props: IRow) {
  const val = props.amount * (props.pct / 100);
  return (
    <div className="grid grid-cols-subgrid col-span-full items-center">
      {props.icon}
      {props.title}
      <span className="ml-2 text-gray font-medium text-sm font-heading">
        {props.pct ?? 50} %
      </span>
      <span className="text-right">$</span>
      <span className="text-left font-heading font-medium">
        {humanize(val)}
      </span>
    </div>
  );
}
