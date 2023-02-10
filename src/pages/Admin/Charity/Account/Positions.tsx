import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useVaultsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Investment from "../common/Investment";

type Props = {
  type: AccountType;
};

export default function Positions({ type }: Props) {
  const { id } = useAdminResources();
  const queryState = useVaultsQuery({
    endowId: id,
    acct_type: type,
  });

  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={queryState}
        // filterFn={(inv) => inv.invested > 0}
        messages={{
          loading: "Fetching investments..",
          error: "Failed to fetch investments",
          empty: "You don't have any investments",
        }}
      >
        {(investments) => (
          <>
            {investments.map((inv) => (
              <Investment key={inv.address} {...inv} action="redeem" />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
