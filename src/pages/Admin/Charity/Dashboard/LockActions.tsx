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
            type: "lock-liq",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-amber-d1 bg-amber-l5 text-xs px-3 py-1 rounded-full font-heading border border-amber-l2 hover:border-amber-l1 outline-amber"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            type: "lock-cash",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs px-3 py-1 rounded-full font-heading border border-gray-l2 hover:border-gray outline-blue-d1"
      >
        Withdraw
      </button>
    </div>
  );
}
