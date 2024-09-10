import { skipToken } from "@reduxjs/toolkit/query";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { useEndowBalanceQuery } from "services/apes";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";

import { Loaded } from "./Loaded";

export default function Dashboard() {
  const { id } = useAdminContext();
  const queryState = useEndowBalanceQuery(id || skipToken);

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <Seo title="Nonprofit Dashboard" />
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: <LoaderSkeleton />,
          error: "Failed to get nonprofit organisation info",
        }}
      >
        {(balances) => <Loaded {...balances} />}
      </QueryLoader>
    </div>
  );
}

function LoaderSkeleton() {
  return (
    <div className="grid gap-4 @lg:grid-cols-2">
      <ContentLoader className="h-40" />
      <ContentLoader className="h-40" />
      <ContentLoader className="h-40" />
      <ContentLoader className="h-2 col-span-full" />

      <ContentLoader className="h-60 col-span-full" />
      <ContentLoader className="h-60 col-span-full" />
    </div>
  );
}
