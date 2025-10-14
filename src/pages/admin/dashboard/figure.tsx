import { Tooltip } from "components/tooltip";
import { ArrowRightIcon, CircleHelp } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
  title: string;
  /** e.g. $100,000 */
  amount: string;
  /** must be wrapped by tooltip content */
  tooltip?: ReactNode;
  to: string;
};

export function Figure(props: Props) {
  return (
    <div className="@container rounded-sm border border-gray-l3 p-4">
      <div className="flex items-center mb-4">
        <h4 className="">{props.title}</h4>
        {props.tooltip && (
          <Tooltip tip={props.tooltip}>
            <CircleHelp size={14} className="text-gray ml-1" />
          </Tooltip>
        )}

        <NavLink
          to={props.to}
          className="ml-auto text-blue hover:text-blue-d1 active:translate-x-0.5"
        >
          <ArrowRightIcon size={18} />
        </NavLink>
      </div>
      <div className="text-lg  ">{props.amount}</div>
      {/* {props.actions} */}
    </div>
  );
}
