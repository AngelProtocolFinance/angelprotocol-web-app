import useTooltip from "hooks/useTooltip";
import { IoIosCopy, IoMdInformationCircleOutline } from "react-icons/io";
import { usePairInfo } from "services/terra/hooks";
import { LaunchStatsProps } from ".";
import Copier from "components/Copier/Copier";
import { Addr } from "components/Copier/types";

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
    >
      <img className="inline mr-2 w-5 text-angel-blue" src={PreIcon} />
      <span className="text-sm text-angel-grey font-light">{content}</span>
    </a>
  );
}

export default function AuctionDetails() {
  const pairInfo = usePairInfo();
  const startDate = new Date(pairInfo.start_time * 1000);
  const endDate = new Date(pairInfo.end_time * 1000);
  const is_active = endDate.getTime() > new Date().getTime();

  return (
    <div className="flex flex-wrap justify-between items-start">
      <div className="auction-details flex-grow">
        {/* Launch description */}
        <div className="launch-description">
          <h1 className="text-md font-semibold text-white-grey mb-5">
            Launch Description
          </h1>
          <p className="text-md font-light text-white-grey mb-4">
            HALO is the governance token of Angel Protocol
          </p>
        </div>
        {/* END  Launch description */}
        {/* Launch details */}
        <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
          Launch Description
        </h1>
        <div className="auction-stats w-full flex flex-wrap gap-5 mt-3">
          <Details title="status" value={is_active ? "Active" : "Inactive"} />
          <Details title="start date" value={startDate.toLocaleString()} />
          <Details title="end date" value={endDate.toLocaleString()} />
        </div>
        {/* End Launch details */}
        {/* Auction statistics */}
        <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
          Auction statistics
        </h1>
        <div className="auction-stats w-full flex flex-wrap gap-5 mt-3">
          <Details title="Starting HALO" value="80000000.00000" />
          <Details title="Remaining HALO" value="1245851671.60214" />
        </div>
        {/* End Auction statistics */}
      </div>
      <div className="contract-details w-128 p-5">
        <p className="font-semibold text-md mb-4">
          HALO Token Contract Address
        </p>
        <div className="icon-link py-1 pb-1.5 px-3 bg-gray-100 inline-block shadow-md rounded-full mb-4">
          <span className="text-sm text-angel-grey font-light pr-1">
            {"terra1a2u20znw23hax47dmx6amuf33kk59pmg4q3ayq"}
          </span>
          <Copier
            text={"terra1a2u20znw23hax47dmx6amuf33kk59pmg4q3ayq" as Addr}
            colorClass="text-angel-blue"
          />
        </div>
        <p className="font-semibold text-md my-4">Links </p>
        <AuctionLink
          content="HALO Token on ET Finder"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1a2u20znw23hax47dmx6amuf33kk59pmg4q3ayq"
        />
        <AuctionLink
          content="Auction Owner on ET Finder"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l"
        />
        <AuctionLink
          content="Auction Liquidity Bootstrapping Pool Pair"
          PreIcon={"/favicon.png"}
          url="https://finder.extraterrestrial.money/testnet/address/terra1j0zd9flhdckzlwulkaqzc4vlzg02nk4e4srcgl"
        />
        <AuctionLink
          content="Token Launch Auction Documentation"
          PreIcon={"/favicon.png"}
          url="#"
        />
      </div>
    </div>
  );
}

const InfoCard = ({
  content,
  Icon = IoMdInformationCircleOutline,
}: {
  content: string;
  Icon?: any;
}) => {
  const { enter, exit, Tooltip } = useTooltip(InfoPopup);

  function InfoPopup() {
    return (
      <div className="absolute left-2 bg-white font-heading rounded-md text-sm shadow-lg z-10 p-4 text-left">
        <p className="text-sm font-light text-black">{content}</p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between relative bg-white text-angel-grey shadow-md rounded-lg p-3 mb-3"
      style={{ width: "180px" }}
    >
      <span className="font-light text-sm">{content}</span>
      <Icon
        className="cursor-pointer"
        onMouseEnter={enter}
        onMouseLeave={exit}
      />
      <Tooltip />
    </div>
  );
};

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
