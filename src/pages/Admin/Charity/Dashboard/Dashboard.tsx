import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";
import { BsGraphUpArrow } from "react-icons/bs"; //icon-line-graph-up
import { IoArrowForwardOutline, IoPeople } from "react-icons/io5"; //icon-people, icon-arrow-right
import { LiaPiggyBankSolid } from "react-icons/lia"; //icon-piggy-bank
import { MdOutlineOutput } from "react-icons/md"; //icon-output
import { RiPencilFill } from "react-icons/ri"; //icon-pencil
import { useEndowBalanceQuery } from "services/apes";
import type { EndowmentBalances } from "types/aws";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Figure from "./Figure";
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

      <div className="w-full border-t border-gray-l4 mt-16" />

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
      <div className="p-4 grid rounded border border-gray-l4 mt-4">
        <div className="flex flex-row items-center justify-between space-y-0">
          <h4 className="mb-1">Allocation Settings</h4>
          <button className="h-8 w-8 p-0">
            <RiPencilFill className="h-4 w-4" />
            <span className="sr-only">Edit allocation settings</span>
          </button>
        </div>
        <p className="text-sm mb-4 text-gray">
          Will take effect on: {period.next}{" "}
          <span className="text-xs bg-gray text-white px-2 py-1 rounded">
            in {period.distance}
          </span>
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="flex items-center">
            <IoArrowForwardOutline className="h-4 w-4 mr-2" />
            Grants
          </span>
          <span className="font-bold">$20,000</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="flex items-center">
            <IoArrowForwardOutline className="h-4 w-4 mr-2" />
            Savings
          </span>
          <span className="font-bold">$20,000</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="flex items-center">
            <IoArrowForwardOutline className="h-4 w-4 mr-2" />
            Investments
          </span>
          <span className="font-bold">$60,000</span>
        </div>
      </div>
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
