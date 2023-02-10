import { PropsWithChildren } from "react";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useAssetQuery } from "services/juno/account";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";

export default function Balances({ type }: { type: AccountType }) {
  const { id } = useAdminResources();
  const queryState = useAssetQuery({ id, type });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{ loading: <Skeleton />, error: "Failed to get balances" }}
    >
      {({ total, free, invested, symbol }) => (
        <div className="grid grid-cols-3 gap-6">
          <Amount title="Total value" symbol={symbol}>
            {humanize(total, 2)}
          </Amount>
          <Amount title="Invested balances" symbol={symbol}>
            {humanize(invested, 2)}
          </Amount>
          <Amount title="Free balances" symbol={symbol}>
            {humanize(free, 2)}
          </Amount>
        </div>
      )}
    </QueryLoader>
  );
}

function Amount({
  classes = "",
  ...props
}: PropsWithChildren<{ classes?: string; title: string; symbol: string }>) {
  return (
    <div
      className={
        classes +
        " border border-prim py-4 px-5 rounded bg-orange-l6 dark:bg-blue-d6"
      }
    >
      <p className="text-xs text-gray-d1 dark:text-gray mb-2 uppercase">
        {props.title}
      </p>
      <span className="font-bold text-xl font-heading">
        {props.children}{" "}
        <span className="text-xs font-normal">{props.symbol}</span>
      </span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <ContentLoader className="h-24 rounded" />
      <ContentLoader className="h-24 rounded" />
      <ContentLoader className="h-24 rounded" />
    </div>
  );
}
