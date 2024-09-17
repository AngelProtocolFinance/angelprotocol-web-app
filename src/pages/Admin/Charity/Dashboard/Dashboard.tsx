import { skipToken } from "@reduxjs/toolkit/query";
import ContentLoader from "components/ContentLoader";
import { useEndowBalanceQuery } from "services/apes";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";

import { ErrorStatus } from "components/Status";
import { useEndowmentQuery } from "services/aws/aws";
import { Loaded } from "./Loaded";

export default function Dashboard() {
  const { id } = useAdminContext();
  const balQuery = useEndowBalanceQuery(id || skipToken);
  const endowQuery = useEndowmentQuery({
    id,
    fields: ["allocation"],
  });

  if (balQuery.isLoading || endowQuery.isLoading) {
    return <LoaderSkeleton />;
  }

  if (
    balQuery.isError ||
    !balQuery.data ||
    endowQuery.isError ||
    !endowQuery.data
  ) {
    return <ErrorStatus>Failed to get nonprofit organisation info</ErrorStatus>;
  }

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <Seo title="Nonprofit Dashboard" />
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>

      <Loaded
        balances={balQuery.data}
        allocation={
          endowQuery.data.allocation ?? { cash: 0, liq: 100, lock: 0 }
        }
      />
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
