import { PropsWithChildren } from "react";
import { AccountType, EndowmentBalance } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import { condenseToNum, humanize } from "helpers";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { id } = useAdminResources();
  const queryState = useBalanceQuery({ id });

  return (
    <div className="rounded border border-prim bg-orange-l6 dark:bg-blue-d6">
      <h4 className="uppercase text-xl font-bold mb-5 pt-5 px-4">
        {type} account
      </h4>
      <p className="text-sm text-gray-d1 dark:text-gray mb-8 px-4">
        Balances are estimations. Click See details to view{" "}
        <span className="capitalize">{type}</span> Account details.
      </p>
      <QueryLoader
        queryState={queryState}
        classes={{ container: "text-sm text-gray-d1 dark:text-gray px-4" }}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {(balance) => {
          const { free, total, invested } = getBreakdown(balance, type);
          return (
            <div className="flex gap-8 px-4">
              <Amount title="Total value" classes="mr-auto">
                {humanize(total, 0)}
              </Amount>
              <Amount title="Free balance">{humanize(free, 0)}</Amount>
              <Amount title="Invested balance">{humanize(invested, 0)}</Amount>
            </div>
          );
        }}
      </QueryLoader>
      <div className="text-center py-3 text-sm font-bold uppercase border-t border-prim mt-4 bg-orange-l5 dark:bg-blue-d6 ">
        See details
      </div>
    </div>
  );
}

function Amount({
  classes = "",
  ...props
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div className={classes}>
      <p className="text-xs text-gray-d1 dark:text-gray mb-1 uppercase">
        {props.title}
      </p>
      <span className="font-bold text-xl font-heading">$ {props.children}</span>
    </div>
  );
}

function getBreakdown(
  { tokens_on_hand, invested_liquid, invested_locked }: EndowmentBalance,
  type: AccountType
) {
  const coin = tokens_on_hand[type]
    .native[0] /** could just be ujunox (testnet) or uusdc (mainnet) */ || {
    amount: "0",
    denom: "",
  };
  const investments = type === "liquid" ? invested_liquid : invested_locked;

  const free = condenseToNum(coin.amount);
  const invested = condenseToNum(
    investments.reduce((sum, [_, balance]) => +balance + sum, 0)
  );

  const total = free + invested;

  return {
    free,
    invested,
    total,
  };
}
