import CountdownTimer from "components/CountDownTimer/CountDownTimer";
import DappHead from "components/Headers/DappHead";
import { useSetModal } from "components/Nodal/Nodal";
import PriceGraph from "components/PriceGraph";
import { useState, useEffect, useMemo } from "react";
import { FaClock, FaStopwatch } from "react-icons/fa";
import { LaunchStatsProps } from ".";
import "./Auction.css";
import AuctionDetails from "./AuctionDetails";
import AuctionHistory from "./AuctionHistory";
import toCurrency from "helpers/toCurrency";
import { useGetLBPPairData } from "./useGetTokenSaleData";
import SwapSuite from "components/TransactionSuite/SwapSuite";
import Swapper from "components/Swapper/Swapper";
import displayTerraError from "helpers/displayTerraError";
import { LBPGraphDataUnavailable } from "contracts/Errors";
import useAuctionStats from "./useAuctionStats";
import useSaleStatus from "components/Swapper/useSaleStatus";
export default function Auction() {
  const { showModal } = useSetModal();

  const { is_live, message } = useSaleStatus();
  const { isLoading, lbpPairData, error } = useGetLBPPairData();

  // This could be extracted into a separate hook to be used accross the application.
  // An alternative would be using Error Boundaries
  //
  // https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
  useEffect(() => {
    if (!isLoading && error) {
      displayTerraError(new LBPGraphDataUnavailable(error), showModal);
    }
    //eslint-disable-next-line
  }, [isLoading, error]);

  return (
    <div className="grid grid-rows-a1 place-items-start pt-2">
      <DappHead />
      <div className="content-section">
        <h1 className="text-4xl font-bold font-heading pl-10 mb-5">HaloSwap</h1>
        <div className="auction-section">
          <div className="auction-data-section font-heading">
            <div className="flex items-baseline justify-start xl:hidden my-3">
              <button
                disabled={!is_live}
                onClick={() => showModal(SwapModal, {})}
                className="disabled:bg-grey-accent bg-angel-blue hover:bg-thin-blue focus:bg-thin-blue text-center px-6 h-12 rounded-3xl tracking-widest uppercase text-md font-bold text-white shadow-sm focus:outline-none mr-2"
              >
                Buy Halo
              </button>
              {message && <p>{message}</p>}
            </div>
            <AuctionStats />
            <PriceGraph
              error={error}
              isLoading={isLoading}
              lbpPairData={lbpPairData}
            />
          </div>
          <div className="hidden xl:w-2/5 xl:flex flex-col rounded items-center justify-center p-10">
            <p className="uppercase font-heading font-bold text-xl self-left mb-2">
              buy halo
            </p>
            <Swapper>
              <SwapSuite />
            </Swapper>
          </div>
        </div>
        <Tabs color="angel-blue" />
      </div>
    </div>
  );
}

function AuctionStats() {
  const { duration_days, end, start, ust_price } = useAuctionStats();

  return (
    <div className="w-full flex flex-wrap gap-5 mt-3">
      {duration_days !== -1 && duration_days !== 0 && (
        <StatsDetails
          title="Duration"
          value={`${duration_days} days`}
          Icon={FaClock}
        />
      )}
      <StatsDetails
        title="Ends in"
        value={<CountdownTimer deadline={end * 1000} start={start * 1000} />}
        Icon={FaStopwatch}
      />
      <StatsDetails title="Price" value={`UST ${toCurrency(ust_price, 6)}`} />
    </div>
  );
}

const StatsDetails = ({ title, value, Icon }: LaunchStatsProps) => {
  return (
    <div className="stats-item">
      <span className="text-xs font-light text-light-grey uppercase">
        {title}
      </span>
      <div className="flex items-center justify-center text-base xl:text-xl tracking-wide font-semibold text-white-grey font-heading">
        {typeof value === "string" ? (
          <span className="mr-2 capitalize">{value}</span>
        ) : (
          value
        )}
        {Icon && <Icon />}
      </div>
    </div>
  );
};

const Tabs = ({ color }: { color: string }) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap overflow-hidden p-10">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal tracking-wider font-heading" +
                  (openTab === 1
                    ? "text-white bg-angel-blue"
                    : "text-gray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                HaloSwap Details
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 w-full mb-6 rounded">
            <div className="py-7 pr-2 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <AuctionDetails />
                </div>
                <div
                  className={`max-h-600 overflow-scroll ${
                    openTab === 2 ? "block" : "hidden"
                  }`}
                  id="link2"
                >
                  <AuctionHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function SwapModal() {
  return (
    <Swapper>
      <SwapSuite inModal />
    </Swapper>
  );
}
