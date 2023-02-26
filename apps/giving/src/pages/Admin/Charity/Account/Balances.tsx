import ContentLoader from "@giving/components/ContentLoader";
import QueryLoader from "@giving/components/QueryLoader";
import { useAdminResources } from "@giving/contexts/admin";
import { humanize } from "@giving/helpers";
import { useAssetsQuery } from "@giving/services/juno/custom";
import { AccountType } from "@giving/types/contracts";

export default function Balances({ type }: { type: AccountType }) {
  const { id } = useAdminResources();
  const { data, ...rest } = useAssetsQuery({ endowId: id });

  return (
    <QueryLoader
      queryState={{ data: data && data[type], ...rest }}
      messages={{ loading: <Skeleton />, error: "Failed to get balances" }}
    >
      {({ total, free, invested, symbol }) => (
        <div className="grid grid-cols-3 gap-6">
          <Amount title="Total value" symbol={symbol}>
            {total}
          </Amount>
          <Amount title="Invested balances" symbol={symbol}>
            {invested}
          </Amount>
          <Amount title="Free balances" symbol={symbol}>
            {free}
          </Amount>
        </div>
      )}
    </QueryLoader>
  );
}

type Props = {
  classes?: string;
  title: string;
  symbol: string;
  children: number;
};

function Amount({ classes = "", ...props }: Props) {
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
        {humanize(props.children, 2)}{" "}
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
