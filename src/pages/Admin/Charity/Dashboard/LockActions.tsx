import { useModalContext } from "contexts/ModalContext";
import type { BalanceMovement } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";

interface Props {
  endowId: number;
  balance: number;
  mov: BalanceMovement;
  classes?: string;
}

export function LockActions({ classes = "", ...props }: Props) {
  const { showModal } = useModalContext();
  return (
    <div className={`${classes} flex justify-end gap-x-2`}>
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Transfer to savings",
            type: "lock-liq",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs font-bold rounded-md px-4 shadow-inner shadow-white/30 drop-shadow-sm py-1 bg-amber text-white font-heading outline-blue-d1"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Withdraw from investments",
            type: "lock-cash",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs px-4 py-1.5 rounded-md bg-gray-d2 outline-blue-d1 text-white font-heading font-bold drop-shadow-sm shadow-inner shadow-white/30"
      >
        Withdraw
      </button>
    </div>
  );
}