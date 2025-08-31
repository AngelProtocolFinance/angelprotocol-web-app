import { NavLink } from "react-router";
import type { BalanceMovement } from "types/npo-balance";

interface Props {
  balance: number;
  mov: BalanceMovement;
  classes?: string;
  disabled?: boolean;
}

export function LockActions({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes} flex items-center justify-end gap-x-2`}>
      <NavLink
        replace
        preventScrollReset
        aria-disabled={props.disabled}
        to={{
          pathname: "move-funds",
          search: new URLSearchParams({
            flow: "lock-liq",
            effect: "append",
            min: "50",
          }).toString(),
        }}
        className="btn shadow-md btn-amber px-6 py-2 text-xs rounded-full"
      >
        Save
      </NavLink>
      <NavLink
        replace
        preventScrollReset
        to={{
          pathname: "move-funds",
          search: new URLSearchParams({
            flow: "lock-cash",
            effect: "append",
            min: "50",
          }).toString(),
        }}
        aria-disabled={props.disabled}
        className="btn btn-outline text-xs rounded-full px-4 py-2"
      >
        Withdraw
      </NavLink>
    </div>
  );
}
