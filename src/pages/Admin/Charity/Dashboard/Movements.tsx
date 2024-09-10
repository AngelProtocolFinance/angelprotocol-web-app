import Icon from "components/Icon";
import { humanize } from "helpers";
import type { ReactNode } from "react";
import type { BalanceMovement } from "types/aws";

type Flow = keyof BalanceMovement;
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

export function Movements({
  classes = "",
  ...props
}: BalanceMovement & { classes?: string }) {
  const movs = Object.entries(props).filter(([_, v]) => v > 0);

  if (movs.length === 0) return null;

  return (
    <div className={`p-4 grid rounded border border-gray-l4 ${classes}`}>
      <h4 className="grid border-b border-gray-l4 w-full pb-2">
        Pending transactions
      </h4>
      <div className="grid grid-cols-[auto_auto_auto_1fr_auto] mt-2">
        {Object.entries(props)
          .filter(([_, v]) => v > 0)
          .map(([k, v]) => (
            <div
              key={k}
              className="grid gap-x-2 grid-cols-subgrid col-span-full items-center"
            >
              {asset[k as Flow].icon}
              <span>{asset[k as Flow].title}</span>
              <span>$ {humanize(v)}</span>
              <span className="text-right">edit</span>
              <span>cancel</span>
            </div>
          ))}
      </div>
    </div>
  );
}
