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
    <div className="w-full max-w-4xl grid content-start mt-6">
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
          totalContributions,
        }) => (
          <div className="grid gap-4 @4xl:grid-cols-2">
            <Balance
              type="Donations"
              total={donationsBal}
              free={payoutsPending}
              payedOut={payoutsMade}
            />
            <Balance
              type="Sustainability Fund"
              total={totalContributions - donationsBal}
              free={totalContributions - donationsBal - sustainabilityFundBal}
              payedOut={sustainabilityFundBal}
            />
            <div className="@container col-span-2 flex justify-end gap-5 items-center p-4 rounded border border-prim bg-orange-l6 dark:bg-blue-d6 font-bold text-sm sm:text-lg font-heading">
              Total Number of Contributions to Your Fund:
              <span>{contributionsCount}</span>
            </div>
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function LoaderSkeleton() {
  return (
    <div className="grid gap-4 @4xl:grid-cols-2">
      <ContentLoader className="h-60 w-full" />
      <ContentLoader className="h-60 w-full" />
      <ContentLoader className="h-16 w-full @4xl:col-span-2" />
    </div>
  );
}
