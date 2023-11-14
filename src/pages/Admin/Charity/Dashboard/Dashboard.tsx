import { PropsWithChildren } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import Seo from "../Seo";
import Balance from "./Balance";

export default function Dashboard() {
  const { id } = useAdminContext();
  const queryState = useProfileQuery({ endowId: id }, { skip: !id });

  return (
    <div className="@container w-full max-w-4xl grid content-start mt-6">
      <Seo title="Endowment Dashboard" />
      <h3 className="uppercase font-extrabold text-2xl mb-4">Dashboard</h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: <LoaderSkeleton />,
          error: "Failed to get endowment info",
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
          const earningsPayoutsMade = totalEarnings - earningsPayoutsPending;
          return (
            <div className="grid gap-4 @lg:grid-cols-2">
              {/** Header */}
              <div className="col-span-2 grid @2xl:grid-cols-3 gap-4">
                <HeaderPart>
                  Pending payout:
                  <span className="flex items-center gap-1">
                    {payoutsPending}{" "}
                    <span className="text-2xs sm:text-xs font-normal">USD</span>
                  </span>
                </HeaderPart>
                <HeaderPart>
                  Total Contributions:
                  <span className="flex items-center gap-1">
                    {totalContributions}{" "}
                    <span className="text-2xs sm:text-xs font-normal">USD</span>
                  </span>
                </HeaderPart>
                <HeaderPart>
                  Contribution Count:
                  <span>{contributionsCount}</span>
                </HeaderPart>
              </div>

              {/** Balances */}
              <Balance
                type="Donations"
                current={donationsBal}
                pending={donationsBal}
                payedOut={payoutsMade - earningsPayoutsMade}
              />
              <Balance
                type="Sustainability Fund"
                current={sustainabilityFundBal}
                pending={earningsPayoutsPending}
                payedOut={earningsPayoutsMade}
              />
            </div>
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

function HeaderPart({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center items-center gap-5 p-4 rounded border border-prim bg-orange-l6 dark:bg-blue-d6 font-bold text-sm @sm:text-base font-heading">
      {children}
    </div>
  );
}
