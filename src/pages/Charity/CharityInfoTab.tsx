import useProfile from "pages/Market/useProfile";
import { useRouteMatch } from "react-router-dom";
import { CharityParam } from "./Charity";
import useWithdraw from "../Withdraw/useWithdraw";
import toCurrency from "helpers/toCurrency";

function OverviewTab() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const profile = useProfile(charity_addr);
  return (
    <div className="w-full lg:min-h-1/2 lg:py-10 lg:mt-2 2xl:mb-5 text-left">
      <span className="text-white font-normal text-md inline-block mb-4">
        {profile.charity_overview}
      </span>
    </div>
  );
}

function AccountInfo({
  className,
  account,
}: {
  className: string;
  account: any;
}) {
  return (
    <div
      className={`w-124 min-h-r15 shadow-xl border-0 rounded-2xl p-5 ${className}`}
    >
      <p className="uppercase font-semibold text-white text-xl">
        {account.type}
      </p>
      <p className="uppercase font-bold text-white text-7xl my-5 tracking-wide">
        {account.balance}
      </p>
      <div className="flex justify-between w-30 h-16">
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-semibold text-white text-md">Strategy</p>
          <p className="uppercase font-normal text-white text-xs">
            {account.strategy}
          </p>
        </div>
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-semibold text-white text-md">
            Allocation
          </p>
          <p className="uppercase font-normal text-white text-xs">
            {account.allocation}
          </p>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AccountAction() {
  return (
    <div className="flex flex-col items-start lg:justify-end gap-2 w-115 min-h-r15">
      <div>
        <button className="capitalize bg-green-400 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
          Withdraw (current)
        </button>
      </div>
      <div>
        <button className="capitalize bg-gray-300 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
          Change (Strategy)
        </button>
      </div>
    </div>
  );
}

function CharityEndowmentInfo() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const { locked, liquid, overall } = useWithdraw(charity_addr);
  const accountDetails = [
    {
      type: "Current Account",
      balance: `$${toCurrency(liquid)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-green-400",
    },
    {
      type: "Principal Account",
      balance: `$${toCurrency(locked)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-orange",
    },
  ];

  return (
    <div className="w-full lg:min-h-1/2 lg:mt-5 text-left mt-10">
      <div className="flex flex-wrap gap-5 justify-between items-center min-h-r15 w-full bg-transparent shadow-none border-0 rounded-2xl mb-5">
        <div className="endowment_stats bg-white w-124 min-h-r15 shadow-xl border-0 rounded-2xl p-6">
          <p className="uppercase font-semibold text-thin-blue text-xl">
            Endowment Balance
          </p>
          <p className="uppercase font-bold text-thin-blue text-7xl my-5">
            ${toCurrency(overall)}
          </p>
          <p className="uppercase font-medium text-thin-blue text-sm">
            Total donations
          </p>
          <p className="uppercase font-semibold text-thin-blue text-3xl">154</p>
        </div>
        {/* <div className="endowment_graph flex-grow bg-blue-100 hidden lg:block">
          <p className="text-center">Charts</p>
        </div> */}
        {accountDetails.map((account) => (
          <AccountInfo
            account={account}
            className={`${account.color}`}
          ></AccountInfo>
        ))}
      </div>
      {/* <div className="flex gap-2 flex-col lg:flex-row">
        {mockAccountDetails.map((account) => (
          <AccountInfo
            account={account}
            className={`${account.color}`}
          ></AccountInfo>
        ))}
      </div> */}
      {/* <AccountAction /> turn on for admin features after V1 */}
    </div>
  );
}

//TODO: remove this component declaration inside component
function CharityPrograms() {
  function ProgramItem() {
    return (
      <div className="flex justify-between gap-5 w-full h-40 font-heading">
        <div className="w-128 h-full bg-blue-200"></div>
        <div className="w-full flex-grow h-full text-white">
          <p className="uppercase text-2xl font-medium tracking-wide m-0">
            Program name
          </p>
          <span className="text-xs inline-block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            perspiciatis alias facilis dolorem! Eum non temporibus porro itaque
            aliquam beatae laudantium quaerat ex dolor atque. Porro non id vel
            aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sequi perspiciatis alias facilis dolorem! Eum non temporibus porro
            itaque aliquam beatae laudantium quaerat ex dolor atque. Porro non
            id vel aliquam. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sequi perspiciatis alias facilis dolorem! Eum non temporibus
            porro itaque aliquam beatae laudantium quaerat ex dolor atque. Porro
            non id vel aliquam.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full lg:min-h-1/2 lg:mt-5 text-left pb-10">
      <ProgramItem></ProgramItem>
      <ProgramItem></ProgramItem>
      <ProgramItem></ProgramItem>
    </div>
  );
}

export default function CharityInfoTab({
  activeTab = "overview",
}: {
  activeTab: string;
}) {
  //TODO: use enums or maybe just implement this over react-router
  return (
    <>
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "endowment" && <CharityEndowmentInfo />}
      {activeTab === "programs" && <CharityPrograms />}
      {activeTab === "media" && <OverviewTab />}
      {activeTab === "governance" && <OverviewTab />}
    </>
  );
}
