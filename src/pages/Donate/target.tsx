import diversity from "assets/icons/diversity.svg";
import { humanize } from "helpers";
import { useEndowBalanceQuery } from "services/apes";

interface Props {
  endowId: number;
  target?: number | "smart";
  classes?: string;
}
export function Target({ target = 0, classes = "", endowId }: Props) {
  const { data } = useEndowBalanceQuery(endowId);

  if (!target) return null;

  return (
    <div className={classes}>
      <p className="mb-2">
        <img
          src={diversity}
          width={20}
          height={20}
          className="inline-block relative mr-2 bottom-1"
        />
        <span className="text-sm font-heading font-medium text-navy-l1">
          Help them reach the goal!
        </span>
      </p>
      <div className="h-1.5 w-full rounded-full bg-blue-l4 shadow-inner">
        <div
          style={{ width: "20%" }}
          className="h-full rounded-full bg-green"
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="flex items-center gap-x-1 text-sm text-navy-l1">
          <span className="font-medium">${humanize(150000, 0, true)}</span>
          <span className="text-xs">Raised</span>
        </p>
        <p className="flex items-center gap-x-1 text-sm text-navy-l1">
          <span className="font-medium">${humanize(20_000, 0, true)}</span>
          <span className="text-xs">Goal</span>
        </p>
      </div>
    </div>
  );
}
