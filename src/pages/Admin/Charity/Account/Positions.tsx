import { AccountType } from "types/lists";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../Context";
import Investment from "../common/Investment";

type Props = {
  type: AccountType;
};

export default function Positions({ type }: Props) {
  const { id } = useAdminContext();
  console.log({ id, type });
  return (
    <div className="grid gap-3">
      <QueryLoader
        queryState={{ data: [], isLoading: false, isError: false }}
        messages={{
          loading: "Fetching investments..",
          error: "Failed to fetch investments",
          empty: "You don't have any investments",
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
