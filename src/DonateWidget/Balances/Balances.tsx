import { BalanceInfo } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { axlUSDCDenom } from "constants/tokens";
import Balance from "./Balance";

type Props = { profileId: number };

export default function Balances({ profileId }: Props) {
  const queryState = useBalanceQuery({ id: profileId });

  return (
    <div className="flex items-center gap-4 w-full">
      <Balance
        queryState={queryState}
        title="Total Value"
        getAmount={getTotal}
      />
      <Balance
        queryState={queryState}
        title="Total Endowment Account"
        getAmount={getLocked}
      />
      <Balance
        queryState={queryState}
        title="Total Current Account"
        getAmount={getLiquid}
      />
    </div>
  );
}

function getTotal(balance: BalanceInfo): number {
  return getLocked(balance) + getLiquid(balance);
}

function getLocked({ locked }: BalanceInfo): number {
  return Number(
    locked.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? "0"
  );
}

function getLiquid({ liquid }: BalanceInfo): number {
  return Number(
    liquid.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? "0"
  );
}
