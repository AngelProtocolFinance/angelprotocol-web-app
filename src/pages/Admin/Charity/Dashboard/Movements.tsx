import Icon from "components/Icon";
import { useModalContext } from "contexts/ModalContext";
import { humanize, roundDownToNum } from "helpers";
import type { ReactNode } from "react";
import type { BalanceMovement } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";

type Flow = keyof BalanceMovement;

type Balances = { [K in Flow]: number };

const asset: {
  [K in Flow]: {
    icon: ReactNode;
    source: string;
    title: string;
  };
} = {
  "liq-cash": {
    title: "Grant",
    icon: <Icon type="ArrowRight" className="text-navy-l1 size-4" />,
    source: "Savings",
  },
  "lock-cash": {
    title: "Grant",
    icon: <Icon type="ArrowRight" className="text-navy-l1 size-4" />,
    source: "Investment",
  },
  "liq-lock": {
    title: "Invest",
    icon: <Icon type="Sprout" className="text-green" />,
    source: "Savings",
  },
};

interface Props {
  endowId: number;
  mov: BalanceMovement;
  balances: Balances;
  classes?: string;
}

export function Movements({ classes = "", ...props }: Props) {
  const { showModal } = useModalContext();
  const movs = Object.entries(props.mov).filter(([_, v]) => v > 0);
  if (movs.length === 0) return null;

  return (
    <div className={`p-4 grid rounded border border-gray-l4 ${classes}`}>
      <h4 className="grid border-b border-gray-l4 w-full pb-2">
        Pending transactions
      </h4>
      <div className="grid grid-cols-[auto_auto_auto_1fr] mt-2">
        {movs.map((entry) => {
          const [k, v] = entry as [Flow, number];
          const a = asset[k];
          return (
            <div
              key={k}
              className="grid gap-x-2 grid-cols-subgrid col-span-full items-center"
            >
              {a.icon}
              <span>{a.title}</span>
              <span>
                $ {humanize(v)} from:{a.source}
              </span>
              <button
                type="button"
                onClick={() =>
                  showModal(MoveFundForm, {
                    type: k,
                    balance: props.balances[k],
                    mov: props.mov,
                    endowId: props.endowId,
                    effect: "override",
                    initAmount: roundDownToNum(v, 2),
                  })
                }
                className="text-right"
              >
                edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
