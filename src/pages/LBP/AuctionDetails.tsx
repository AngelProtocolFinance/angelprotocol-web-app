import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Copier from "components/Copier/Copier";
import { Addr } from "components/Copier/types";
import useSaleStatus from "components/Swapper/useSaleStatus";
import LBP from "contracts/LBP";
import toCurrency from "helpers/toCurrency";
import { useMemo } from "react";
import { pool_balance } from "services/terra/placeholders";
import { terra } from "services/terra/terra";
import { LaunchStatsProps } from ".";

type AuctionLinkProps = {
  PreIcon?: any;
  content: string;
  url: string;
};

function AuctionLink({ PreIcon, content, url }: AuctionLinkProps) {
  return (
    <a
      href={url}
      className="icon-link py-1 pb-1.5 pr-4 px-3 bg-gray-100 inline-block shadow-md rounded-full mb-4"
      target="_blank"
      rel="noopenner noreferrer"
    >
      <img
        className="inline mr-2 w-5 text-angel-blue"
        alt="link icon"
        src={PreIcon}
      />
      <span className="text-sm text-angel-grey font-light">{content}</span>
    </a>
  );
}

export default function AuctionDetails() {
  const wallet = useConnectedWallet();
  const lbp = useMemo(() => new LBP(wallet), [wallet]);

  const { is_live, end, start } = useSaleStatus();
  const { data: pool = pool_balance } = terra.endpoints.pool.useQueryState(
    lbp.gen_pool_args()
  );
  const remaining_halo = new Dec(pool.token).div(1e6).toNumber();

  return (
    <div className="flex flex-wrap justify-between items-start font-heading">
      <div className="auction-details flex-grow">
        <div className="launch-description">
          <h1 className="text-md font-semibold text-white-grey mb-5">
            Launch Description
          </h1>
          <p className="text-md font-light text-white-grey mb-4">
            HALO is the governance token of Angel Protocol
          </p>
        </div>
        <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
          Launch Description
        </h1>
        <div className="w-full flex flex-wrap gap-5 mt-3">
          <Details title="status" value={is_live ? "Active" : "Inactive"} />
          <Details
            title="start date"
            value={new Date(start * 1000).toLocaleString()}
          />
          <Details
            title="end date"
            value={new Date(end * 1000).toLocaleString()}
          />
        </div>
        <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
          HaloSwap Statistics
        </h1>
        <div className="w-full flex flex-wrap gap-5 mt-3">
          {/* <Details title="Starting HALO" value="80000000.00000" /> */}
          <Details
            title="Remaining HALO"
            value={toCurrency(remaining_halo, 2)}
          />
        </div>
      </div>
      <div className="contract-details w-128 p-5">
        <p className="font-semibold text-md mb-4">
          HALO Token Contract Address
        </p>
        <div className="icon-link py-1 pb-1.5 px-3 bg-gray-100 inline-block shadow-md rounded-full mb-4">
          <span className="text-xs text-angel-grey font-light pr-1">
            {"terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9"}
          </span>
          <Copier
            text={"terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9" as Addr}
            colorClass="text-angel-blue"
          />
        </div>
        <p className="font-semibold text-md my-4">Links </p>
        <AuctionLink
          content="HALO Token on ET Finder"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9"
        />
        <AuctionLink
          content="HaloSwap Owner on ET Finder"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l"
        />
        <AuctionLink
          content="HaloSwap Pair  on ET Finder"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1j0zd9flhdckzlwulkaqzc4vlzg02nk4e4srcgl"
        />
        <AuctionLink
          content="HaloSwap Documentation"
          PreIcon={"/favicon.png"}
          url="https://bit.ly/HaloSwap"
        />
      </div>
    </div>
  );
}

const Details = ({ title, value, Icon }: LaunchStatsProps) => {
  return (
    <div className="stats-item">
      <span className="text-xs font-semibold text-white-gray capitalize">
        {title}
      </span>
      <div className="flex items-center justify-center text-md font-normal font-heading">
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
