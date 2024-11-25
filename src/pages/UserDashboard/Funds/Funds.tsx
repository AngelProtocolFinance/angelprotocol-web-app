import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { Link } from "react-router-dom";
import { useUserFundsQuery } from "services/aws/users";
import { Fund } from "./Fund";

export function Funds() {
  const user = useAuthenticatedUser();
  const query = useUserFundsQuery(user.email);
  return (
    <div className="grid gap-y-4 grid-cols-[auto_auto_1fr_auto_auto] justify-items-start">
      <div className="flex items-center justify-between col-span-full mb-2 w-full border-b border-gray-l4 pb-4">
        <h3 className="text-3xl">My Fundraisers</h3>
        <Link
          to={appRoutes.funds + "/new"}
          className="btn-blue text-sm px-6 py-2 rounded-full"
        >
          Create
        </Link>
      </div>

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
          empty: "You currently don't have any fundraisers",
        }}
        queryState={query}
      >
        {(funds) => (
          <>
            {funds.map((fund) => (
              <Fund key={fund.id} {...fund} />
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
