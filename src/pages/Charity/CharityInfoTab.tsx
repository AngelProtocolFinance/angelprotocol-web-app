import useProfile from "pages/Market/useProfile";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import toCurrency from "helpers/toCurrency";
import { CharityParam } from "./types";
import { CharityInfoBalance } from "services/aws/endowments/types";
import { charity } from "types/routes";
import anchorProtocol from "../../assets/images/anchor_protocol.png";

function OverviewTab() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const profile = useProfile(charity_addr);
  return (
    <div className="w-full max-h-3/4 md:max-h-auto bg-light-grey md:bg-transparent md:p-0 p-4 rounded-2xl lg:min-h-1/2 lg:py-10 lg:mt-2 2xl:mb-5 text-left overflow-y-scroll scroll-hidden">
      <span className="text-black md:text-white font-normal text-md inline-block mb-4">
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
      className={`w-full lg:max-w-600 lg:w-3/4 min-h-r15 shadow-xl border-0 rounded-2xl p-5 ${className}`}
    >
      <p className="uppercase font-semibold text-white text-xl">
        {account.type}
      </p>
      <p className="uppercase font-bold text-white text-5xl my-5 tracking-wide">
        {account.balance}
      </p>
      <div className="flex justify-between w-30 h-16">
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Strategy</p>
          <p className="uppercase font-normal text-white text-sm tracking-wide flex flex-row items-center gap-2">
            <img
              src={anchorProtocol}
              alt="anchor protocol icon"
              className="h-6 w-6 rounded-xl inline-block"
            />{" "}
            {account.strategy}
          </p>
        </div>
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Allocation</p>
          <p className="uppercase font-normal text-white text-sm">
            {account.allocation}
          </p>
        </div>
      </div>
    </div>
  );
}

// function AccountAction() {
//   return (
//     <div className="flex flex-col items-start lg:justify-end gap-2 w-115 min-h-r15">
//       <div>
//         <button className="capitalize bg-green-400 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
//           Withdraw (current)
//         </button>
//       </div>
//       <div>
//         <button className="capitalize bg-gray-300 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
//           Change (Strategy)
//         </button>
//       </div>
//     </div>
//   );
// }

function CharityEndowmentInfo({ data }: { data: CharityInfoBalance }) {
  const { total_liq, total_lock, overall } = data;

  const accountDetails = [
    {
      type: "Current Account",
      balance: `$${toCurrency(total_liq)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-green-400",
    },
    {
      type: "Principal Account",
      balance: `$${toCurrency(total_lock)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-orange",
    },
  ];

  return (
    <div className="w-full lg:min-h-1/2 lg:mt-5 text-left mt-10 font-heading">
      <div className="flex flex-col gap-5 justify-between items-center min-h-r15 w-full bg-transparent shadow-none border-0 rounded-2xl mb-5">
        <div className="endowment_stats bg-white w-full min-h-r15 shadow-xl border-0 rounded-2xl p-5">
          <p className="uppercase font-bold text-thin-blue text-xl">
            Endowment Balance
          </p>
          <p className="uppercase font-bold text-thin-blue text-6xl my-5">
            ${toCurrency(overall)}
          </p>
          {/*          <p className="uppercase font-bold text-thin-blue text-sm">
            Total donations
          </p>
          <p className="uppercase font-bold text-thin-blue text-3xl">154</p>*/}
        </div>
        {/* <div className="endowment_graph flex-grow bg-blue-100 hidden lg:block">
          <p className="text-center">Charts</p>

        </div> */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {accountDetails.map((account, i) => (
            <AccountInfo
              key={i}
              account={account}
              className={`${account.color}`}
            />
          ))}
        </div>
      </div>
      {/* <AccountAction /> turn on for admin features after V1 */}
    </div>
  );
}

//TODO: remove this component declaration inside component
// function CharityPrograms() {
//   function ProgramItem() {
//     return (
//       <div className="flex justify-between gap-5 w-full h-40 font-heading">
//         <div className="w-128 h-full bg-blue-200"></div>
//         <div className="w-full flex-grow h-full text-white">
//           <p className="uppercase text-2xl font-medium tracking-wide m-0">
//             Program name
//           </p>
//           <span className="text-xs inline-block">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
//             perspiciatis alias facilis dolorem! Eum non temporibus porro itaque
//             aliquam beatae laudantium quaerat ex dolor atque. Porro non id vel
//             aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Sequi perspiciatis alias facilis dolorem! Eum non temporibus porro
//             itaque aliquam beatae laudantium quaerat ex dolor atque. Porro non
//             id vel aliquam. Lorem ipsum dolor sit amet consectetur adipisicing
//             elit. Sequi perspiciatis alias facilis dolorem! Eum non temporibus
//             porro itaque aliquam beatae laudantium quaerat ex dolor atque. Porro
//             non id vel aliquam.
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2 w-full lg:min-h-1/2 lg:mt-5 text-left pb-10">
//       <ProgramItem></ProgramItem>
//       <ProgramItem></ProgramItem>
//       <ProgramItem></ProgramItem>
//     </div>
//   );
// }

type Props = {
  endowmentBalanceData: CharityInfoBalance;
};

export default function CharityInfoTab({ endowmentBalanceData }: Props) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}${charity.overview}`} component={OverviewTab} />
      <Route
        path={`${path}${charity.endowment}`}
        render={() => <CharityEndowmentInfo data={endowmentBalanceData} />}
      />
      <Route path={`${path}${charity.programs}`} component={OverviewTab} />
      <Route path={`${path}${charity.media}`} component={OverviewTab} />
      <Route path={`${path}${charity.governance}`} component={OverviewTab} />
      <Route path={`${path}`} component={OverviewTab} />
    </Switch>
  );
}
