import { useModalContext } from "contexts/ModalContext";
import type { BalanceMovement } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";

interface Props {
  classes?: string;
  endowId: number;
  balance: number;
  mov: BalanceMovement;
}

export function LiqActions({ classes = "", ...props }: Props) {
  const { showModal } = useModalContext();
  return (
    <div className={`${classes} flex justify-end gap-x-2`}>
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Withdraw from savings",
            type: "liq-cash",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs px-3 py-1 rounded-full font-heading border border-gray-l2 hover:border-gray outline-gray-d1"
      >
        Withdraw
      </button>
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            title: "Invest savings",
            type: "liq-lock",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-green-d1 bg-green-l5 text-xs px-3 py-1 rounded-full font-heading border border-green-l2 hover:border-green-l1 outline-green"
      >
        Invest
      </button>
    </div>
  );
}
