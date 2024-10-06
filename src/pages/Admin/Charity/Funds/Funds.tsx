import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { useFundsEndowMemberOfQuery } from "services/aws/endow-funds";
import { useAdminContext } from "../../Context";
import { FundItem } from "./FundItem";

export function Funds() {
  const { id } = useAdminContext();
  const query = useFundsEndowMemberOfQuery({ endowId: id });
  return (
    <div className="grid gap-y-4 grid-cols-[auto_1fr_auto_auto_auto_auto] justify-items-start">
      <h3 className="text-3xl mb-2 col-span-full">My Fundraisers</h3>

      <QueryLoader
        messages={{
          loading: (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ),
          error: "Failed to get fundraisers",
          empty: "No fundraisers found.",
        }}
        queryState={query}
      >
        {(funds) => (
          <>
            {funds.map((fund) => (
              <FundItem key={fund.id} {...fund} endowId={id} />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}

export function Skeleton() {
  return (
    <div
      className="flex items-center gap-x-2 w-full col-span-full"
      aria-disabled={true}
    >
      <ContentLoader className="size-10 rounded-full" />
      <ContentLoader className="w-full h-10 rounded" />
    </div>
  );
}
