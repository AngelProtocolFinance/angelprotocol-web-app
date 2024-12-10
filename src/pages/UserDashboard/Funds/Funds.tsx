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
    <div className="grid">
      <div className="flex items-center justify-between mb-2 w-full border-b border-gray-l4 pb-4">
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
          loading: <Skeleton />,
          error: "Failed to get fundraisers",
          empty: "You currently don't have any fundraisers",
        }}
        queryState={query}
      >
        {(funds) => (
          <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4">
            {funds.map((fund) => (
              <Fund key={fund.id} {...fund} />
            ))}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4"
      aria-disabled={true}
    >
      <ContentLoader className="h-60 rounded-lg" />
      <ContentLoader className="h-60 rounded-lg" />
      <ContentLoader className="h-60 rounded-lg" />
      <ContentLoader className="h-60 rounded-lg" />
      <ContentLoader className="h-60 rounded-lg" />
      <ContentLoader className="h-60 rounded-lg" />
    </div>
  );
}
