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
    title: ReactNode;
  };
} = {
  "liq-cash": {
    title: <span className="text-sm text-navy-l1">Grant</span>,
    icon: <Icon type="ArrowRight" className="text-navy-l1 size-4" />,
    source: "Savings",
  },
  "lock-cash": {
    title: <span className="text-sm text-navy-l1">Grant</span>,
    icon: <Icon type="ArrowRight" className="text-navy-l1 size-4" />,
    source: "Investments",
  },
  "liq-lock": {
    title: <span className="text-sm text-green">Invest</span>,
    icon: <Icon type="Sprout" className="text-green size-4" />,
    source: "Savings",
  },
  "lock-liq": {
    title: <span className="text-sm text-amber">Save</span>,
    icon: <Icon type="PiggyBank" className="text-navy-l1 size-4" />,
    source: "Investments",
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
      <div className="grid grid-cols-[auto_auto_auto_auto_auto_1fr] mt-4 gap-y-2">
        {movs.map((entry) => {
          const [k, v] = entry as [Flow, number];
          const a = asset[k];
          return (
            <div
              key={k}
              className="grid gap-x-2 grid-cols-subgrid col-span-full items-center"
            >
              {a.icon}
              {a.title}
              <span className="font-heading font-medium">$ {humanize(v)}</span>
              <span className="text-xs ml-2">from</span>
              <span className="text-sm">{a.source}</span>
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
                className="text-right bg-gray-l4 text-navy-d4 px-3 py-1 font-heading hover:bg-gray-l3 justify-self-end text-xs rounded-full"
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
