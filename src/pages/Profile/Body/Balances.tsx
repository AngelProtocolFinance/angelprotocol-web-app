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
      className={`grid grid-rows-3 items-center justify-stretch gap-4 w-full max-w-xs md:max-w-none md:grid-rows-1 md:grid-cols-3 md:justify-center ${className}`}
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
    <div className="flex flex-col justify-center items-center gap-2 h-20 py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray-d1 md:items-start md:h-28 md:px-6 md:py-0">
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
