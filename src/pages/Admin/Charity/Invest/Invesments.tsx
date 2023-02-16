import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useAssetsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Investment from "./Investment";

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
              <Investment key={inv.address} {...inv} />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
