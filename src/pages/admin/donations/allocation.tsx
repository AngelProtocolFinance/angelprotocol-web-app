import type { IAllocation } from "@better-giving/endowment";
import { NavLink } from "@remix-run/react";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { CircleHelp, HandCoins, Pencil, PiggyBank, Sprout } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  allocation: IAllocation;
  classes?: string;
  disabled?: boolean;
}
export function Allocation(props: Props) {
  return (
    <div className={`grid rounded-sm mt-4 ${props.classes ?? ""}`}>
      <div className="flex items-baseline gap-x-2 mb-1">
        <h4 className="mb-1">Distribution</h4>

        <NavLink
          title="Edit allocation settings"
          to="edit-alloc"
          replace
          preventScrollReset
          aria-disabled={props.disabled}
          className="hover:text-blue disabled:text-gray [&:is(.pending)]:text-gray"
        >
          <Pencil size={14} />
        </NavLink>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
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
        />
        <Row
          icon={<PiggyBank width={20} className="mr-2 text-amber" />}
          title={<span>Savings</span>}
          pct={props.allocation.liq}
        />

        <Row
          icon={<Sprout size={20} className="mr-2 text-green" />}
          title={<span>Investments</span>}
          pct={props.allocation.lock}
        />
      </div>
    </div>
  );
}

interface IRow {
  pct: number;
  icon: ReactNode;
  title: ReactNode;
}
function Row(props: IRow) {
  return (
    <div className="flex items-center border border-gray-l3 rounded p-4">
      {props.icon}
      {props.title}
      <span className="ml-12 text-gray font-medium text-sm font-heading">
        {props.pct ?? 50} %
      </span>
    </div>
  );
}
