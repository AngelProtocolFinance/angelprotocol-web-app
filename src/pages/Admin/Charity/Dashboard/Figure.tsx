import Icon from "components/Icon";
import { Tooltip } from "components/Tooltip";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  /** e.g. $100,000 */
  amount: string;
  /** must be wrapped by tooltip content */
  tooltip?: ReactNode;
};

export default function Figure(props: Props) {
  return (
    <div className="@container rounded border border-gray-l4 p-4">
      <div className="flex items-center mb-4">
        <h4 className="text-sm">{props.title}</h4>

        {props.tooltip && (
          <Tooltip
            trigger={
              <Icon type="Question" size={14} className="text-gray ml-1" />
            }
          >
            {props.tooltip}
          </Tooltip>
        )}

        <span className="ml-auto">{props.icon}</span>
      </div>
      <p className="text-2xl font-medium">{props.amount}</p>
    </div>
  );
}
