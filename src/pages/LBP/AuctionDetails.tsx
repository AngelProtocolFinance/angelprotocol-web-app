import Copier from "components/Copier/Copier";
import { Addr } from "components/Copier/types";
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
      <span className="text-md text-angel-grey font-light">{content}</span>
    </a>
  );
}

export default function AuctionDetails() {
  return (
    <div className="auction-details font-heading">
      <div className="launch-description mb-10">
        <h1 className="text-md font-semibold text-white-grey mb-5">
          Launch Description
        </h1>
        <p className="text-md font-light text-white-grey mb-4">
          HALO is the governance token of Angel Protocol, launched following a
          number of months work together with Delphi Labs. Details of how the
          token works can be found{" "}
          <a
            className="font-light text-angel-blue"
            href="https://members.delphidigital.io/reports/angel-protocol-token-design/"
          >
            here
          </a>
          .
        </p>
        <p className="text-md font-light text-white-grey mb-4">
          Expanding on these tokenomics, do take a look at the recent four-part
          series starting with{" "}
          <a
            className="font-light text-angel-blue"
            href="https://angelprotocol.medium.com/halo-the-charitable-token-part-1-dc9e667b7dea?source=friends_link&sk=a62acb7590231090bb3da0febc7808cd"
          >
            Article One
          </a>{" "}
          from Angel Protocol.
        </p>
        <p className="text-md font-light text-white-grey mb-4">
          Finally, for a quick video introduction to the $HALO token and what it
          enables. Do watch and share{" "}
          <a
            className="font-light text-angel-blue"
            href="https://youtu.be/sDAVEc2UYd4"
          >
            this short video
          </a>
          .
        </p>
      </div>
      <div className="launch-details flex flex-row">
        <div className="lg:w-2/3 md:w-full">
          <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
            Launch Details
          </h1>
          <div className="w-full flex flex-wrap gap-5 mt-3">
            <Details title="status" value={"Inactive"} />
            <Details
              title="start date"
              value={new Date(1639926000000).toLocaleString()}
            />
            <Details
              title="end date"
              value={new Date(1640185200000).toLocaleString()}
            />
          </div>
          <h1 className="text-md font-semibold text-white-grey mb-3 mt-5">
            HaloSwap Statistics
          </h1>
          <div className="w-full flex flex-wrap gap-5 mt-3">
            <Details title="Starting HALO" value="80,000,000.00" />
            <Details title="Ending HALO" value="49,562,362.15" />
          </div>
        </div>
        <div className="contract-details lg:w-1/3 md:w-full flex flex-col">
          <p className="font-semibold text-md mb-4">
            HALO Token Contract Address
          </p>
          <div className="icon-link py-1 pb-1.5 px-3 bg-gray-100 inline-block shadow-md rounded-full mb-4">
            <span className="text-xs text-angel-grey font-light pr-1">
              {"terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq"}
            </span>
            <Copier
              text={"terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq" as Addr}
              colorClass="text-angel-blue"
            />
          </div>
          <p className="font-semibold text-md my-4">Links </p>
          <AuctionLink
            content="HALO Token on ET Finder"
            PreIcon={"/favicon.png"}
            url="https://finder.extraterrestrial.money/mainnet/address/terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq"
          />
          <AuctionLink
            content="HaloSwap Owner on ET Finder"
            PreIcon={"/favicon.png"}
            url="https://finder.extraterrestrial.money/mainnet/address/terra1numzqm5mgr56ftd4y8mfen7705nfs4vpz5jf0s"
          />
          <AuctionLink
            content="HaloSwap Pair  on ET Finder"
            PreIcon={"/favicon.png"}
            url="https://finder.extraterrestrial.money/mainnet/address/terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e"
          />
          <AuctionLink
            content="HaloSwap Documentation"
            PreIcon={"/favicon.png"}
            url="https://bit.ly/HaloSwap"
          />
          <AuctionLink
            content="HaloSwap Terms & Conditions"
            PreIcon={"/favicon.png"}
            url="https://drive.google.com/file/d/19R5CiaZny7UYAIKNlRc4ssvqJDhETzKk/view?usp=sharing"
          />
        </div>
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
