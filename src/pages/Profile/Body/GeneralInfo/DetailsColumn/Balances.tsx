import { BalanceInfo } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { condense, humanize } from "helpers";
import { axlUSDCDenom } from "constants/tokens";
import { useProfileContext } from "../../../ProfileContext";

export default function Balances() {
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
        container: `flex flex-col items-center justify-center w-full`,
      }}
    >
      {({ tokens_on_hand }) => <Content {...tokens_on_hand} />}
    </QueryLoader>
  );
}

function Content({ liquid, locked }: BalanceInfo) {
  const lockedAmount =
    locked.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;
  const liquidAmount =
    liquid.native.find((bal) => bal.denom === axlUSDCDenom)?.amount ?? 0;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
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
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray md:items-start md:h-28 md:px-6 md:py-04">
      <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${humanize(condense(props.amount))}
      </p>
    </div>
  );
}
