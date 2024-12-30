import { humanize, roundDownToNum } from "helpers";
import { HandCoins, PiggyBank, Sprout } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { BalanceMovement } from "types/aws";

type Flow = keyof BalanceMovement;

const asset: {
  [K in Flow]: {
    icon: ReactNode;
    source: string;
    title: ReactNode;
  };
} = {
  "liq-cash": {
    title: <span className="text-sm text-navy-l1">Grant</span>,
    icon: <HandCoins className="text-navy-l1 size-4" />,
    source: "Savings",
  },
  "lock-cash": {
    title: <span className="text-sm text-navy-l1">Grant</span>,
    icon: <HandCoins className="text-navy-l1 size-4" />,
    source: "Investments",
  },
  "liq-lock": {
    title: <span className="text-sm text-green">Invest</span>,
    icon: <Sprout className="text-green size-4" />,
    source: "Savings",
  },
  "lock-liq": {
    title: <span className="text-sm text-amber">Save</span>,
    icon: <PiggyBank className="text-amber size-4" />,
    source: "Investments",
  },
};

interface Props {
  endowId: number;
  mov: BalanceMovement;
  balance: (flow: Flow) => number;
  classes?: string;
  disabled?: boolean;
}

export function Movements({ classes = "", ...props }: Props) {
  const movs = Object.entries(props.mov).filter(([_, v]) => v > 0);

  if (movs.length === 0) return null;

  return (
    <div className={`p-4 grid rounded border border-gray-l4 ${classes}`}>
      <h4 className="grid border-b border-gray-l4 w-full pb-2">
        Pending Transactions
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
              <Link
                replace
                preventScrollReset
                to={{
                  pathname: "move-funds",
                  search: new URLSearchParams({
                    flow: k,
                    effect: "override",
                    initAmount: roundDownToNum(v, 2).toString(),
                  }).toString(),
                }}
                aria-disabled={props.disabled}
                className="text-right bg-gray-l4 disabled:bg-gray-l5 text-navy-d4 aria-disabled:text-gray px-3 py-1 font-heading hover:bg-gray-l3 justify-self-end text-xs rounded-full"
              >
                edit
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
