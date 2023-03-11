import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import QueryLoader from "components/QueryLoader";
import Investment from "../common/Investment";

type Props = {
  type: AccountType;
};

export default function Investments({ type }: Props) {
  const { id } = useAdminResources();
  console.log({ id, type });

  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={{
          data: [{ address: "hello world" }],
          isLoading: false,
          isError: false,
        }}
        messages={{
          loading: "Fetching investments..",
          error: "Failed to fetch investments",
          empty: "No investments found",
        }}
      >
        {(investments) => (
          <>
            {investments.map(() => (
              <Investment />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
