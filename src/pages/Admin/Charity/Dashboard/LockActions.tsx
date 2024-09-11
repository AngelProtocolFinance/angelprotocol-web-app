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
    <div className={`${classes} flex justify-end`}>
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
        className="text-xs uppercase bg-blue-d1 text-white px-2 py-1 rounded-sm font-heading hover:bg-blue"
      >
        withdraw
      </button>
    </div>
  );
}
