import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import { BsGraphUpArrow } from "react-icons/bs"; //icon-line-graph-up
import { IoPeople } from "react-icons/io5"; //icon-people
import { LiaPiggyBankSolid } from "react-icons/lia"; //icon-piggy-bank
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
          payoutsMade,
          sustainabilityFundBal,
        }) => {
          return (
            <>
              <h3 className="uppercase mb-4 font-black mt-6">
                Account Balances
              </h3>
              <div className="grid gap-4 @lg:grid-cols-2">
                <Balance
                  title="Savings"
                  icon={<LiaPiggyBankSolid size={24} />}
                  amount={`$ ${humanize(donationsBal - payoutsMade, 2)}`}
                />
                <Balance
                  title="Investments"
                  icon={<BsGraphUpArrow size={16} />}
                  amount={`$ ${humanize(sustainabilityFundBal, 2)}`}
                />
                <Balance
                  title="Contributions count"
                  icon={<IoPeople size={17} />}
                  amount={contributionsCount.toString()}
                />
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
