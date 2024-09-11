import { useModalContext } from "contexts/ModalContext";
import type { BalanceMovement } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";

interface Props {
  endowId: number;
  balance: number;
  mov: BalanceMovement;
}

export function LiqActions(props: Props) {
  const { showModal } = useModalContext();
  return (
    <div className="mt-8 flex justify-end gap-x-2">
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            type: "liq-cash",
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
      <button
        type="button"
        onClick={() =>
          showModal(MoveFundForm, {
            type: "liq-lock",
            balance: props.balance,
            mov: props.mov,
            endowId: props.endowId,
            effect: "append",
          })
        }
        className="text-xs uppercase bg-blue-d1 text-white px-2 py-1 rounded-sm font-heading hover:bg-blue"
      >
        invest
      </button>
    </div>
  );
}
