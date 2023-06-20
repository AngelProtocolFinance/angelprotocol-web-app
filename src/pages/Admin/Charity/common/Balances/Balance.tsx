import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { AccountType } from "types/lists";
import { useEndowBalanceQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { condense, humanize } from "helpers";
import { PAYMENT_WORDS } from "constants/common";
import { adminRoutes, appRoutes } from "constants/routes";
import { useAdminResources } from "../../../Context";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { id } = useAdminResources();

  const query = useEndowBalanceQuery({
    id,
  });

  const link = `${appRoutes.admin}/${id}/${adminRoutes.account}/${type}`;

  return (
    <div className="@container rounded border border-prim bg-orange-l6 dark:bg-blue-d6">
      <h4 className="uppercase text-xl font-bold mb-5 pt-5 px-4">
        {PAYMENT_WORDS.accounts[type]} account
      </h4>
      <p className="text-sm text-gray-d1 dark:text-gray mb-8 px-4">
        Balances are estimations. Click See details to view{" "}
        <span className="capitalize">{PAYMENT_WORDS.accounts[type]}</span>{" "}
        Account details.
      </p>
      <QueryLoader
        queryState={query}
        classes={{ container: "text-sm text-gray-d1 dark:text-gray px-4" }}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {({ [type]: balances }) => {
          //TODO: show all token balances
          const bal = balances[0].amount;
          return (
            <div className="grid grid-cols-[auto_1fr] gap-y-5 justify-self-start gap-x-8 @lg:flex @lg:gap-x-8 px-4">
              <Amount
                title="Total value"
                classes="col-span-full @lg:mr-auto"
                symbol="USD"
              >
                {humanize(condense(bal), 2)}
              </Amount>
              <Amount title="Free balance" symbol="USD">
                {humanize(condense(bal), 2)}
              </Amount>
              <Amount title="Invested balance" symbol="USD">
                {humanize(0, 2)}
              </Amount>
            </div>
          );
        }}
      </QueryLoader>
      <Link
        to={link}
        className="block text-center py-3 text-sm font-bold uppercase border-t border-prim mt-4 bg-orange-l5 dark:bg-blue-d6 "
      >
        See details
      </Link>
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
