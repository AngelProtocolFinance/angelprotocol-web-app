import { NavLink } from "@remix-run/react";
import type { BalanceMovement } from "types/aws";

interface Props {
  endowId: number;
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
        className="[&:is(.pending)]:bg-gray-l3 [&:is(.pending)]:pointer-events-none text-xs font-bold rounded-md px-4 shadow-inner shadow-white/30 drop-shadow-sm py-1 bg-amber aria-disabled:bg-gray-l3 text-white font-heading outline-blue-d1"
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
        className="[&:is(.pending)]:bg-gray-l3 [&:is(.pending)]:pointer-events-none text-xs px-4 py-1.5 rounded-md bg-gray-d2 aria-disabled:bg-gray-l3 outline-blue-d1 text-white font-heading font-bold drop-shadow-sm shadow-inner shadow-white/30"
      >
        Withdraw
      </NavLink>
    </div>
  );
}
