import useTooltip from "hooks/useTooltip";
import { FaEthereum, FaLink } from "react-icons/fa";
import { IoIosCopy, IoMdInformationCircleOutline } from "react-icons/io";
import { LaunchStatsProps } from ".";

type AuctionLinkProps = {
  PreIcon?: any;
  content: string;
  PostIcon?: any;
  type?: "copy" | "link";
};

function AuctionLink({
  PreIcon,
  content,
  PostIcon,
  type = "copy",
}: AuctionLinkProps) {
  return (
    <a
      href="##"
      className="icon-link py-1 px-2 bg-gray-100 inline-block shadow-md rounded-2xl mb-4"
    >
      {PreIcon && <PreIcon className="inline mr-2 text-angel-blue" />}
      <span className="text-sm font-light">{content}</span>
      {PostIcon && (
        <PostIcon className="inline ml-2 text-angel-blue" size={15} />
      )}
    </a>
  );
}

export default function AuctionDetails() {
  return (
    <div className="flex flex-wrap justify-between items-start">
      <div className="auction-details flex-grow">
        {/* Launch description */}
        <div className="launch-description">
          <h1 className="text-md font-semibold text-black mb-5">
            Launch Description
          </h1>
          <p className="text-md font-light text-black mb-4">
            PETAL is the fractionalized Founder EtherTulip
          </p>
          <a href="##" className="more-info font-light hover:underline">
            More Info <FaLink className="inline ml-1" />
          </a>
        </div>
        {/* END  Launch description */}
        {/* Launch details */}
        <h1 className="text-md font-semibold text-black mb-3 mt-5">
          Launch Description
        </h1>
        <div className="auction-stats w-full flex flex-wrap gap-5 mt-3">
          <Details title="status" value="Active" />
          <Details
            title="start date"
            value="September 13, 2021, 10:00 AM GMT+1"
          />
          <Details
            title="end date"
            value="September 13, 2021, 10:00 AM GMT+1"
          />
        </div>
        {/* End Launch details */}
        {/* Auction statistics */}
        <h1 className="text-md font-semibold text-black mb-3 mt-5">
          Auction statistics
        </h1>
        <div className="auction-stats w-full flex flex-wrap gap-5 mt-3">
          <Details title="Start Balances" value="2500000000.00" />
          <Details title="Current Balances" value="1245851671.60" />
          <Details title="Total Sold" value="1254148328.40" />
          <Details
            title="Total Raised"
            value="1254148328.40"
            Icon={FaEthereum}
          />
        </div>
        {/* End Auction statistics */}
        <div className="info-card w-128">
          <p className="text-sm font-semibold text-gray-600 mb-2 mt-5">
            Enabled auction rights
          </p>
          {/* <InfoCard content="Stop/Start Trading" /> */}
          <InfoCard content="Change Weights" />
          <InfoCard content="Change Weights" />
        </div>
      </div>
      <div className="contract-details w-128 p-5">
        <p className="font-semibold text-md mb-4">Token Contract Address </p>
        <AuctionLink
          content="0x2e60f6c4ca05bc55a8e577deebd61fce727c4a6e"
          PreIcon={FaEthereum}
          PostIcon={IoIosCopy}
        ></AuctionLink>
        <p className="font-semibold text-md my-4">Links </p>
        <AuctionLink
          content="PETAL Token on Etherscan"
          PreIcon={FaEthereum}
        ></AuctionLink>
        <AuctionLink
          content="Auction Owner on Etherscan"
          PreIcon={FaEthereum}
        ></AuctionLink>
        <AuctionLink
          content="Auction Liquidity Bootstrapping Pool"
          PreIcon={FaEthereum}
        ></AuctionLink>
        <AuctionLink
          content="Token Launch Auction Documentation"
          PreIcon={FaEthereum}
        ></AuctionLink>
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
      <div className="absolute left-2 bg-white font-heading text-angel-grey rounded-md text-sm shadow-lg z-10 p-4 text-left">
        <p className="text-sm font-light">{content}</p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between relative bg-white shadow-md rounded-lg p-3 mb-3"
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
      <span className="text-xs font-semibold text-gray-400 capitalize">
        {title}
      </span>
      <div className="flex items-center justify-center text-md font-normal text-angel-grey font-heading">
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
