import { PropsWithChildren } from "react";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useAssetQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { id } = useAdminResources();
  const queryState = useAssetQuery({ id, type });

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
        {({ total, free, invested, symbol }) => {
          return (
            <div className="flex gap-8 px-4">
              <Amount title="Total value" classes="mr-auto" symbol={symbol}>
                {humanize(total, 2)}
              </Amount>
              <Amount title="Free balance" symbol={symbol}>
                {humanize(free, 2)}
              </Amount>
              <Amount title="Invested balance" symbol={symbol}>
                {humanize(invested, 2)}
              </Amount>
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
}: PropsWithChildren<{ classes?: string; title: string; symbol: string }>) {
  return (
    <div className={classes}>
      <p className="text-xs text-gray-d1 dark:text-gray mb-1 uppercase">
        {props.title}
      </p>
      <span className="font-bold text-xl font-heading">
        {props.children}{" "}
        <span className="text-xs font-normal">{props.symbol}</span>
      </span>
    </div>
  );
}
