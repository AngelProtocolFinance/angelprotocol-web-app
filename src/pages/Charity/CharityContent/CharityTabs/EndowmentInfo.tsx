import { useParams } from "react-router-dom";
import { CharityParams } from "@types-page/charity";
import ancIcon from "assets/images/anchor_protocol.png";
import { useDepositTransactionsQuery } from "services/flipslide/endowment_admin/endowment_admin";
import { useEndowmentBalance } from "services/terra/multicall/queriers";
import toCurrency from "helpers/toCurrency";

//TODO: refactor component markup
export function EndowmentInfo() {
  const { address } = useParams<CharityParams>();
  //this component will not be rendered if address is undefined or incorrect
  const { endowmentBalance } = useEndowmentBalance(address!);
  const { data } = useDepositTransactionsQuery(address!);
  const accountDetails = [
    {
      type: "Liquid Account",
      balance: `$${toCurrency(endowmentBalance?.liquid || 0)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-green-400",
    },
    {
      type: "Endowment Account",
      balance: `$${toCurrency(endowmentBalance?.locked || 0)}`,
      strategy: "Anchor Protocol",
      allocation: "100%",
      color: "bg-orange",
    },
  ];

  return (
    <div className="w-full text-left font-heading">
      <div className="flex flex-col gap-5 justify-between items-center min-h-r15 w-full bg-transparent shadow-none border-0 rounded-2xl mb-5">
        <div className="endowment_stats bg-white w-full min-h-r15 shadow-xl border-0 rounded-2xl p-5">
          <p className="uppercase font-bold text-thin-blue text-xl">
            Total Account Value
          </p>
          <p className="uppercase font-bold text-thin-blue text-6xl my-5">
            ${toCurrency(endowmentBalance?.total || 0)}
          </p>
          <p className="uppercase font-bold text-thin-blue text-sm">
            Total donations
          </p>
          <p className="uppercase font-bold text-thin-blue text-3xl">
            {data ? data.length : "-"}
          </p>
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

type Props = { className: string; account: any };
export function AccountInfo(props: Props) {
  return (
    <div
      className={`w-full lg:max-w-600 lg:w-3/4 min-h-r15 shadow-xl border-0 rounded-2xl p-5 ${props.className}`}
    >
      <p className="uppercase font-semibold text-white text-xl">
        {props.account.type}
      </p>
      <p className="uppercase font-bold text-white text-5xl my-5 tracking-wide">
        {props.account.balance}
      </p>
      <div className="flex justify-between w-30 h-16">
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Strategy</p>
          <p className="uppercase font-normal text-white text-sm tracking-wide flex flex-row items-center gap-2">
            <img
              src={ancIcon}
              alt="anchor protocol icon"
              className="h-6 w-6 rounded-xl inline-block"
            />{" "}
            {props.account.strategy}
          </p>
        </div>
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Allocation</p>
          <p className="uppercase font-normal text-white text-sm">
            {props.account.allocation}
          </p>
        </div>
      </div>
    </div>
  );
}
