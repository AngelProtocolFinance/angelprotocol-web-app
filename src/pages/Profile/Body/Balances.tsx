import { BalanceInfo } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { axlUSDCDenom } from "constants/tokens";
import { useProfileContext } from "../ProfileContext";

type Props = { className: string };

export default function Balances({ className }: Props) {
  const profile = useProfileContext();
  const queryState = useBalanceQuery({ id: profile.id });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Fetching endowment balances",
        error: "Failed to get endowment balances ",
      }}
      classes={{
        container: `flex items-center justify-center w-full h-full ${className}`,
        loading: "text-black dark:text-white",
      }}
    >
      {({ tokens_on_hand }) => (
        <Content {...tokens_on_hand} className={className} />
      )}
    </QueryLoader>
  );
}

function Content({ liquid, locked, className }: BalanceInfo & Props) {
  const lockedAmount =
    locked.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;
  const liquidAmount =
    liquid.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;

  return (
    <div
      className={`grid grid-rows-3 items-center gap-4 w-full max-w-xs md:grid-rows-1 md:grid-cols-3 md:justify-items-end md:w-auto md:max-w-none ${className}`}
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
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full max-w-xs py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray-d1 md:items-start md:h-28 md:px-6 md:py-04">
      <h6 className="font-heading font-bold text-black text-xs tracking-wider uppercase dark:text-white">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${props.amount}
      </p>
    </div>
  );
}
