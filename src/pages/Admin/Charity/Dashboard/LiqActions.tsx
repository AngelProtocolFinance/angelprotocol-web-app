import { Link } from "react-router-dom";
import type { BalanceMovement } from "types/aws";

interface Props {
  classes?: string;
  endowId: number;
  balance: number;
  mov: BalanceMovement;
  disabled?: boolean;
}

export function LiqActions({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes} flex justify-end gap-x-2`}>
      <Link
        replace
        preventScrollReset
        to={{
          pathname: "move-funds",
          search: new URLSearchParams({
            flow: "liq-cash",
            effect: "append",
          }).toString(),
        }}
        type="button"
        aria-disabled={props.disabled}
        className="text-xs px-4 py-1.5 rounded-md bg-gray-d2 aria-disabled:bg-gray-l3 outline-blue-d1 text-white font-heading font-bold drop-shadow-sm shadow-inner shadow-white/30"
      >
        Withdraw
      </Link>
      <Link
        replace
        preventScrollReset
        to={{
          pathname: "move-funds",
          search: new URLSearchParams({
            flow: "liq-lock",
            effect: "append",
            min: "50",
          }).toString(),
        }}
        type="button"
        aria-disabled={props.disabled}
        className="text-xs font-bold rounded-md px-4 shadow-inner shadow-white/30 drop-shadow-sm py-1 bg-green aria-disabled:bg-gray-l3 text-white font-heading outline-blue-d1"
      >
        Invest
      </Link>
    </div>
  );
}
