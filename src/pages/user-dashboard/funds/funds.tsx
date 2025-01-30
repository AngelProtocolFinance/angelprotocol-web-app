import { Link } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { appRoutes } from "constants/routes";
import type { LoaderData } from "./api";
import { Fund } from "./fund";

export { userFunds as loader } from "./api";
export { ErrorBoundary } from "components/error";
export { clientLoader } from "api/cache";

export default function Funds() {
  const { funds } = useCachedLoaderData<LoaderData>();

  const items =
    funds.length === 0 ? (
      <Info>You currently don't have any fundraisers</Info>
    ) : (
      <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4">
        {funds.map((fund) => (
          <Fund key={fund.id} {...fund} />
        ))}
      </div>
    );
  return (
    <div className="grid">
      <div className="flex items-center justify-between mb-2 w-full border-b border-gray-l3 pb-4">
        <h3 className="text-3xl">My Fundraisers</h3>
        <Link
          to={appRoutes.funds + "/new"}
          className="btn btn-blue text-sm px-6 py-2 rounded-full"
        >
          Create
        </Link>
      </div>
      {items}
    </div>
  );
}
