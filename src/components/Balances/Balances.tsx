import { BalanceInfo, EndowmentBalance } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { condense, humanize } from "helpers";
import { axlUSDCDenom } from "constants/tokens";

const CONTAINER_STYLE =
  "flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-gray-l2 dark:bg-blue-d6 dark:border-bluegray md:items-start md:h-28 md:px-6 md:py-04";

type Props = { profileId: number; direction?: "row" | "column" };

export default function Balances({ profileId, direction = "row" }: Props) {
  const queryState = useBalanceQuery({ id: profileId });

  return (
    <div
      className={`flex ${
        direction === "column" ? "flex-col" : ""
      } items-center gap-4 w-full`}
    >
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

function Balance(props: {
  queryState: { data?: EndowmentBalance; isLoading: boolean; isError: boolean };
  title: string;
  getAmount: (balance: BalanceInfo) => number;
}) {
  return (
    <QueryLoader
      queryState={props.queryState}
      messages={{
        loading: `Fetching ${props.title.toLowerCase()}`,
        error: `Failed to get ${props.title.toLowerCase()}`,
      }}
      classes={{ container: CONTAINER_STYLE }}
    >
      {({ tokens_on_hand }) => (
        <div className={CONTAINER_STYLE}>
          <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
            {props.title}
          </h6>
          <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
            ${humanize(condense(props.getAmount(tokens_on_hand)))}
          </p>
        </div>
      )}
    </QueryLoader>
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
