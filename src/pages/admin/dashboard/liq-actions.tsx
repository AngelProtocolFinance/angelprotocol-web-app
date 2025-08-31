import { NavLink } from "react-router";
import type { BalanceMovement } from "types/npo-balance";

interface Props {
  classes?: string;
  balance: number;
  mov: BalanceMovement;
  disabled?: boolean;
}

export function LiqActions({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes} flex justify-end gap-x-2`}>
      <NavLink
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
        className="btn btn-outline text-xs rounded-full px-4 py-2"
      >
        Withdraw
      </NavLink>
      <NavLink
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
        className="btn btn-green shadow-md text-xs rounded-full px-6 py-2"
      >
        Invest
      </NavLink>
    </div>
  );
}
