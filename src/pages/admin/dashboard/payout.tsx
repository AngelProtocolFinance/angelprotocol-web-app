import { format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
  bal_cash: number;
  threshold: number;
  next_payout: string;
  pm?: { bank_summary: string };
  classes?: string;
}

export function Payout({ classes = "", ...p }: Props) {
  const progress = Math.min(p.bal_cash / p.threshold, 1);
  return (
    <div className={`${classes}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="space-x-1 mb-1">
          <span className="text-xs uppercase  text-shadow-white text-shadow">
            total
          </span>
          <span className="font-semibold text-shadow-white text-shadow">
            ${humanize(p.bal_cash)}
          </span>
        </div>
        <div className="space-x-1">
          <span className="text-xs">of</span>
          <span className="text-sm text-gray-d1">${humanize(p.threshold)}</span>
          <Link
            to={{ pathname: "payout-min", search: `?min=${p.threshold}` }}
            replace
            preventScrollReset
            className="text-xs inline-block"
          >
            <PencilIcon size={12} />
          </Link>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-green) 0%, var(--color-green) ${Math.min(progress * 100, 100)}%, var(--color-green-l4) ${Math.min(progress * 100, 100)}%, var(--color-green-l4) 100%)`,
        }}
        className="py-1 rounded-full shadow-inner mb-2"
      />
      <p className="text-sm text-gray-d1">
        {progress < 1 ? "Once desired amount is accumulated, " : ""}
        will be paid out to{" "}
        {
          <Link
            to="../banking"
            className="text-blue hover:text-blue-d1 font-medium"
          >
            {p.pm?.bank_summary || "your default payout method"}
          </Link>
        }{" "}
        on{" "}
        {
          <span className="">
            {format(p.next_payout, "PP")}
            <span className="text-gray">
              - in {formatDistance(p.next_payout, new Date())}
            </span>
            .
          </span>
        }
      </p>
    </div>
  );
}
