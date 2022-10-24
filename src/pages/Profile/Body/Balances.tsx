import { memo } from "react";
import { BalanceInfo } from "types/contracts";
import { axlUSDCDenom } from "constants/tokens";

type Props = BalanceInfo & { className?: string };

function Balances({ liquid, locked, className = "" }: Props) {
  const lockedAmount =
    locked.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;
  const liquidAmount =
    liquid.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;

  return (
    <div
      className={`grid grid-rows-3 items-center justify-stretch gap-4 w-full xl:grid-rows-1 xl:grid-cols-3 xl:justify-center ${className}`}
    >
      <Balance
        title="Total Value"
        amount={Number(lockedAmount) + Number(liquidAmount)}
      />
      <Balance title="Total Endowment Account" amount={lockedAmount} />
      <Balance title="Total Liquid Account" amount={liquidAmount} />
    </div>
  );
}

function Balance(props: { title: string; amount: number | string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray-d1 xl:items-start xl:h-28 xl:px-6 xl:py-0">
      <h6 className="font-heading font-bold text-black text-xs tracking-wider uppercase dark:text-white">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${props.amount}
      </p>
    </div>
  );
}

export default memo(Balances);
