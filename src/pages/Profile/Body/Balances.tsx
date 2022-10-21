import { memo } from "react";
import { BalanceInfo } from "types/contracts";
import { axlUSDCDenom } from "constants/tokens";

function Balances({ liquid, locked }: BalanceInfo) {
  const lockedAmount =
    locked.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;
  const liquidAmount =
    liquid.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;

  return (
    <div className="grid grid-cols-3 items-center justify-cener gap-4 w-full">
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
    <div className="flex flex-col justify-center items-start px-6 gap-2 border border-gray-l2 rounded h-28">
      <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1">
        ${props.amount}
      </p>
    </div>
  );
}

export default memo(Balances);
