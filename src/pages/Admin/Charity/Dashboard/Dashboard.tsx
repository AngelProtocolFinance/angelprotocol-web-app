import { skipToken } from "@reduxjs/toolkit/query";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { Arrow, Content } from "components/Tooltip";
import { humanize } from "helpers";
import { useEndowBalanceQuery } from "services/apes";
import type { EndowmentBalances } from "types/aws";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Figure from "./Figure";
import { PayoutHistory } from "./PayoutHistory";
import { Schedule } from "./Schedule";
import { monthPeriod } from "./monthPeriod";

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

function Loaded({
  classes = "",
  ...props
}: EndowmentBalances & { classes?: string }) {
  const { id } = useAdminContext();
  const period = monthPeriod();
  return (
    <div className={`${classes} mt-6`}>
      <h3 className="uppercase mb-4 font-black">Account Balances</h3>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          icon={<Icon size={21} type="PiggyBank" strokeWidth={1.5} />}
          amount={`$ ${humanize(props.donationsBal - props.payoutsMade, 2)}`}
        />
        <Figure
          title="Investments"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg shadow-lg">
              <span className="block mb-2">
                Funds invested in a diversified portfolio comprising
              </span>
              <div>
                <p>50% - Domestic and international equities</p>
                <p>30% - Fixed income</p>
                <p>15% - Crypto</p>
                <p>5% - Cash</p>
              </div>
              <Arrow />
            </Content>
          }
          icon={<Icon type="Stocks" size={16} />}
          amount={`$ ${humanize(props.sustainabilityFundBal, 2)}`}
        />
        <Figure
          title="Contributions count"
          icon={<Icon type="Users" size={17} />}
          amount={props.contributionsCount.toString()}
        />
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      <h3 className="my-4 font-medium flex items-center">
        <span className="text-sm uppercase font-normal">Period</span>
        <span className="ml-2 uppercase text-sm">
          {period.from} - {period.to}
        </span>
        <p className="text-sm text-navy-l3 ml-auto">
          <span>Ends in </span>
          <span className="p-1 px-2 bg-navy-d4 text-gray-l4 text-xs rounded ml-1">
            in {period.distance}
          </span>
        </p>
      </h3>
      <Schedule
        amount={props.payoutsPending}
        periodNext={period.next}
        periodRemaining={period.distance}
      />

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />
      <PayoutHistory endowId={id} classes="mt-2" />
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
