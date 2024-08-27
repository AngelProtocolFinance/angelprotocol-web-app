import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";
import { BsGraphUpArrow } from "react-icons/bs"; //icon-line-graph-up
import { IoPeople } from "react-icons/io5"; //icon-people
import { LiaPiggyBankSolid } from "react-icons/lia"; //icon-piggy-bank
import { MdOutlineOutput } from "react-icons/md"; //icon-output

import { useEndowBalanceQuery } from "services/apes";
import type { EndowmentBalances } from "types/aws";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Figure from "./Figure";
import { Schedule } from "./Schedule";
import { monthPeriod } from "./montPeriod";

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
        {(balances) => <Loaded {...balances} />}
      </QueryLoader>
    </div>
  );
}

function Loaded({
  classes = "",
  ...props
}: EndowmentBalances & { classes?: string }) {
  const period = monthPeriod();
  return (
    <div className={`${classes} mt-6`}>
      <h3 className="uppercase mb-4 font-black">Account Balances</h3>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          icon={<LiaPiggyBankSolid size={24} />}
          amount={`$ ${humanize(props.donationsBal - props.payoutsMade, 2)}`}
        />
        <Figure
          title="Investments"
          icon={<BsGraphUpArrow size={16} />}
          amount={`$ ${humanize(props.sustainabilityFundBal, 2)}`}
        />
        <Figure
          title="Contributions count"
          icon={<IoPeople size={17} />}
          amount={props.contributionsCount.toString()}
        />
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      <h3 className="my-4 font-medium">
        <span className="text-sm uppercase font-normal">Period</span>
        <span className="ml-2 uppercase text-sm">
          {period.from} - {period.to}
        </span>
      </h3>
      <Figure
        title="Pending allocations"
        icon={<MdOutlineOutput size={19} />}
        amount={`$ ${humanize(props.payoutsPending, 2)}`}
      />
      <Schedule periodNext={period.next} periodRemaining={period.distance} />
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
