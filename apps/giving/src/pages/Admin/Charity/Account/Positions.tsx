import QueryLoader from "@ap/components/query-loader";
import { useAdminResources } from "@ap/contexts/admin";
import { useAssetsQuery } from "@ap/services/juno";
import { AccountType } from "@ap/types/contracts";
import Investment from "../common/Investment";

type Props = {
  type: AccountType;
};

export default function Positions({ type }: Props) {
  const { id } = useAdminResources();
  const { data, ...rest } = useAssetsQuery({
    endowId: id,
  });

  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={{ data: data ? data[type].vaults : [], ...rest }}
        filterFn={(inv) => inv.invested > 0}
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
