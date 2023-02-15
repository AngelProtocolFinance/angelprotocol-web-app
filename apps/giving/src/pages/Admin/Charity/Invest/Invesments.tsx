import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useVaultsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Investment from "./Investment";

type Props = {
  type: AccountType;
};

export default function Investments({ type }: Props) {
  const { id } = useAdminResources();
  const queryState = useVaultsQuery({
    endowId: id,
    acct_type: type,
  });
  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching investments..",
          error: "Failed to fetch investments",
          empty: "No investments found",
        }}
      >
        {(investments) => (
          <>
            {investments.map((inv) => (
              <Investment key={inv.address} {...inv} />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
