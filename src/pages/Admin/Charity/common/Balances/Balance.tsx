import { PropsWithChildren } from "react";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { condense, humanize } from "helpers";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { id } = useAdminResources();

  const query = useContractQuery("accounts.token-balance", {
    id,
    accounType: type === "locked" ? 0 : 1,
    token:
      "0xaBCe32FBA4C591E8Ea5A5f711F7112dC08BCee74" /** TODO: should come from registrar.accepted_tokens */,
  });
  console.log(query);

  return (
    <div className="@container rounded border border-prim bg-orange-l6 dark:bg-blue-d6">
      <h4 className="uppercase text-xl font-bold mb-5 pt-5 px-4">
        {type} account
      </h4>
      <p className="text-sm text-gray-d1 dark:text-gray mb-8 px-4">
        Balances are estimations. Click See details to view{" "}
        <span className="capitalize">{type}</span> Account details.
      </p>
      <QueryLoader
        queryState={query}
        classes={{ container: "text-sm text-gray-d1 dark:text-gray px-4" }}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {(balance) => {
          return (
            <div className="grid grid-cols-[auto_1fr] gap-y-5 justify-self-start gap-x-8 @lg:flex @lg:gap-x-8 px-4">
              <Amount
                title="Total value"
                classes="col-span-full @lg:mr-auto"
                symbol="USD"
              >
                {humanize(condense(balance), 2)}
              </Amount>
              <Amount title="Free balance" symbol="USD">
                {humanize(condense(balance), 2)}
              </Amount>
              <Amount title="Invested balance" symbol="USD">
                {humanize(0, 2)}
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
