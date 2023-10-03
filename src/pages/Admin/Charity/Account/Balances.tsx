import { EndowBalance } from "services/types";
import { AccountType } from "types/lists";
import { useEndowBalanceQuery } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { condense, humanize } from "helpers";
import { useAdminContext } from "../../Context";

const accountBalance = (type: AccountType, fetchedBalance: EndowBalance) =>
  //endow balance is in USDC
  condense(fetchedBalance[type][0].amount, 6).toNumber();

export default function Balances({ type }: { type: AccountType }) {
  const { id } = useAdminContext();
  console.log({ id, type });
  const query = useEndowBalanceQuery({ id });
  return (
    <QueryLoader
      queryState={query}
      messages={{ loading: <Skeleton />, error: "Failed to get balances" }}
    >
      {(balance) => (
        <div className="grid gap-4 @3xl:grid-cols-3 @3xl:gap-6">
          <Amount title="Total value" symbol="USDC">
            {accountBalance(type, balance)}
          </Amount>
          <Amount title="Invested balances" symbol="USDC">
            {0 /** FUTURE: get USDC value of all vault shares*/}
          </Amount>
          <Amount title="Free balances" symbol="USDC">
            {accountBalance(type, balance)}
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
