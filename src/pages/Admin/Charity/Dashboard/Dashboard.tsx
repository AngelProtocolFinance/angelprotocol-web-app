import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import type { PropsWithChildren } from "react";
import { useEndowBalanceQuery } from "services/apes";
import Seo from "../Seo";
import Balance from "./Balance";

export default function Dashboard() {
  const { id } = useAdminContext();
  const queryState = useEndowBalanceQuery(id, { skip: !id });

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
        {({
          contributionsCount,
          donationsBal,
          payoutsPending,
          payoutsMade,
          sustainabilityFundBal,
          totalEarnings,
          totalContributions,
        }) => {
          const earningsPayoutsPending = payoutsPending - donationsBal;
          const earningsPayoutsMade = isNaN(totalEarnings)
            ? 0
            : totalEarnings - earningsPayoutsPending;
          const donationsPaidOut = payoutsMade - earningsPayoutsMade;
          return (
            <>
              <h3 className="uppercase mb-2 font-black mt-6">
                Account Balances
              </h3>
              <div className="grid gap-4 @lg:grid-cols-2">
                {/** Balances */}
                <Balance
                  type="Donations"
                  current={donationsBal}
                  pending={donationsBal}
                  paidOut={donationsPaidOut}
                />
                <Balance
                  type="Sustainability Fund"
                  current={sustainabilityFundBal}
                  pending={earningsPayoutsPending}
                  paidOut={earningsPayoutsMade}
                />

                {/** General info */}
                <div className="col-span-2 grid @2xl:grid-cols-3 gap-4">
                  <DataPart>
                    Pending payout:
                    <span className="flex items-center gap-1">
                      {humanize(payoutsPending, 2)}{" "}
                      <span className="text-2xs sm:text-xs font-normal">
                        USD
                      </span>
                    </span>
                  </DataPart>
                  <DataPart>
                    Total Contributions:
                    <span className="flex items-center gap-1">
                      {humanize(totalContributions, 2)}{" "}
                      <span className="text-2xs sm:text-xs font-normal">
                        USD
                      </span>
                    </span>
                  </DataPart>
                  <DataPart>
                    Contribution Count:
                    <span>{contributionsCount}</span>
                  </DataPart>
                </div>
              </div>
            </>
          );
        }}
      </QueryLoader>
    </div>
  );
}

function LoaderSkeleton() {
  return (
    <div className="grid gap-4 @lg:grid-cols-2">
      <div className="col-span-2 grid @2xl:grid-cols-3 gap-4">
        <ContentLoader className="h-14" />
        <ContentLoader className="h-14" />
        <ContentLoader className="h-14" />
      </div>
      <ContentLoader className="h-60 w-full" />
      <ContentLoader className="h-60 w-full" />
    </div>
  );
}

function DataPart({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center items-center gap-5 p-4 rounded border border-blue-l2 bg-blue-l5 dark:bg-blue-d6 font-bold text-sm @sm:text-base font-heading">
      {children}
    </div>
  );
}
