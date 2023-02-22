import QueryLoader from "@ap/components/query-loader";
import { useAdminResources } from "@ap/contexts/admin";
import { useAssetsQuery } from "@ap/services/juno";
import { AccountType } from "@ap/types/contracts";
import Investment from "../common/Investment";

type Props = {
  type: AccountType;
};

export default function Investments({ type }: Props) {
  const { id } = useAdminResources();
  const { data, ...rest } = useAssetsQuery({
    endowId: id,
  });
  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={{ ...rest, data: data ? data[type].vaults : undefined }}
        messages={{
          loading: "Fetching investments..",
          error: "Failed to fetch investments",
          empty: "No investments found",
        }}
      >
        {(investments) => (
          <>
            {investments.map((inv) => (
              <Investment key={inv.address} {...inv} action="invest" />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
