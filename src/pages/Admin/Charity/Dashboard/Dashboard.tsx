import ContentLoader from "components/ContentLoader";
import { ErrorStatus } from "components/Status";
import { CircleAlert } from "lucide-react";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Loaded } from "./Loaded";
import { monthPeriod } from "./monthPeriod";

export default function Dashboard() {
  const data: any = useLoaderData();
  const period = monthPeriod();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      {period.isPre && (
        <div className="bg-gray-l4 text-navy-l1 text-sm p-2 rounded">
          <CircleAlert size={16} className="relative inline bottom-px mr-1" />
          Pending transactions are now locked for processing
        </div>
      )}

      <Suspense fallback={<LoaderSkeleton />}>
        <Await
          resolve={data.data}
          errorElement={
            <ErrorStatus>Failed to get nonprofit organisation info</ErrorStatus>
          }
        >
          {([alloc, balance]) => (
            <Loaded balances={balance} allocation={alloc} />
          )}
        </Await>
      </Suspense>
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
