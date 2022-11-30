import { BalanceInfo } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { condense, humanize } from "helpers";
import { axlUSDCDenom } from "constants/tokens";
import { useProfileContext } from "../../../ProfileContext";

const CONTAINER_STYLE =
  "flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray md:items-start md:h-28 md:px-6 md:py-04";

export default function Balances() {
  const profile = useProfileContext();
  const queryState = useBalanceQuery({ id: profile.id });

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
        classes={{ container: CONTAINER_STYLE }}
      >
        {({ tokens_on_hand }) => (
          <Balance title="Total Value" amount={getTotal(tokens_on_hand)} />
        )}
      </QueryLoader>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
        classes={{ container: CONTAINER_STYLE }}
      >
        {({ tokens_on_hand }) => (
          <Balance
            title="Total Endowment Account"
            amount={getLocked(tokens_on_hand)}
          />
        )}
      </QueryLoader>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
        classes={{ container: CONTAINER_STYLE }}
      >
        {({ tokens_on_hand }) => (
          <Balance
            title="Total Liquid Account"
            amount={getLiquid(tokens_on_hand)}
          />
        )}
      </QueryLoader>
    </div>
  );
}

function Balance(props: { title: string; amount: number | string }) {
  return (
    <div className={CONTAINER_STYLE}>
      <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${humanize(condense(props.amount))}
      </p>
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
