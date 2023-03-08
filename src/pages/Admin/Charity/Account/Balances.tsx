import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";

export default function Balances({ type }: { type: AccountType }) {
  const { id } = useAdminResources();
  console.log({ id, type });
  return (
    <QueryLoader
      queryState={{
        data: { total: 0, free: 0, invested: 0, symbol: "USD" },
        isLoading: false,
        isError: false,
      }}
      messages={{ loading: <Skeleton />, error: "Failed to get balances" }}
    >
      {({ total, free, invested, symbol }) => (
        <div className="grid gap-4 @3xl:grid-cols-3 @3xl:gap-6">
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
