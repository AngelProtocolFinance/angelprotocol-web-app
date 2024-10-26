import { useModalContext } from "contexts/ModalContext";
import type { BalanceMovement } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";

interface Props {
  endowId: number;
  balance: number;
  mov: BalanceMovement;
  classes?: string;
  disabled?: boolean;
}

export function LockActions({ classes = "", ...props }: Props) {
  const { showModal } = useModalContext();
  return (
    <div className={`${classes} flex justify-end gap-x-2`}>
      <button
        type="button"
        disabled={props.disabled}
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Transfer to savings",
            type: "lock-liq",
            balance: props.balance,
            mov: props.mov,
            min: 50,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs font-bold rounded-md px-4 shadow-inner shadow-white/30 drop-shadow-sm py-1 bg-amber disabled:bg-gray-l3 text-white font-heading outline-blue-d1"
      >
        Save
      </button>
      <button
        disabled={props.disabled}
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Withdraw from investments",
            type: "lock-cash",
            min: 50,
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs px-4 py-1.5 rounded-md bg-gray-d2 disabled:bg-gray-l3 outline-blue-d1 text-white font-heading font-bold drop-shadow-sm shadow-inner shadow-white/30"
      >
        Withdraw
      </button>
    </div>
  );
}
