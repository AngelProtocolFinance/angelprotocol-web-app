import { Tooltip } from "components/tooltip";
import { CircleHelp } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  /** e.g. $100,000 */
  amount: string;
  /** must be wrapped by tooltip content */
  tooltip?: ReactNode;
  actions?: ReactNode;
  perf?: ReactNode;
};

export default function Figure(props: Props) {
  return (
    <div className="@container rounded-sm border border-gray-l3 p-4">
      <div className="flex items-center mb-4">
        <h4 className="text-sm">{props.title}</h4>

        {props.tooltip && (
          <Tooltip tip={props.tooltip}>
            <CircleHelp size={14} className="text-gray ml-1" />
          </Tooltip>
        )}

        <span className="ml-auto">{props.icon}</span>
      </div>
      <div className="text-2xl font-medium font-heading">
        {props.amount} {props.perf}
      </div>
      {props.actions}
    </div>
  );
}
