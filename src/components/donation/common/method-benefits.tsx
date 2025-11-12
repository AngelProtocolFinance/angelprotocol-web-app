import { APP_NAME } from "constants/env";
import { ChevronDown, LightbulbIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  classes?: string;
  /** {subject} */
  subject: "stock" | "crypto";
}
export function MethodBenefits({ classes = "", subject }: Props) {
  const [expanded, set_expanded] = useState(false);
  return (
    <div className={`${classes} grid gap-y-2`}>
      <div className="flex items-center gap-x-1">
        <LightbulbIcon
          size={16}
          className="stroke-amber self-start h-[1lh] shrink-0"
        />
        <h4 className="tex-sm text-gray-d1 font-medium">
          Benefits of donating appreciated {subject}
        </h4>
      </div>
      <p className={`text-sm ${expanded ? "" : "mask-b-from-1 pb-2"}`}>
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer {subject} through {APP_NAME}:
      </p>
      {!expanded && (
        <button
          onClick={() => set_expanded(true)}
          type="button"
          className="flex items-center -mt-4 justify-self-start text-[13px] text-blue-d1"
        >
          read more <ChevronDown size={16} />
        </button>
      )}
      {expanded && subject === "stock" && (
        <div className="grid rounded-sm bg-gray-l5 dark:bg-gray-d3 p-2">
          <span className="text-sm text-gray">
            NOTE: This is not financial advice! Please speak to your tax advisor
            or broker about your specific situation and country's tax laws.
          </span>
        </div>
      )}
      {expanded && (
        <p className="text-sm">
          If you held the {subject} for at least one year, you receive a tax
          deduction for the full value of the {subject} at the time of donation
          (not just the amount you paid for the {subject}).
        </p>
      )}
      {expanded && (
        <p className="text-sm">
          You avoid paying both capital gains tax and {subject} sales
          commissions. When you give appreciated {subject} directly to a
          nonprofit, your gift can be up to 20% larger because you avoid the
          taxes you'd incur from selling and donating the cash.
        </p>
      )}
    </div>
  );
}
