// import { unsdgs } from "pages/Fund/unsdgs";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import useProfile from "pages/Market/useProfile";
import { useMemo } from "react";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useRouteMatch } from "react-router-dom";
import { CharityParam } from "./types";

function StatsItem({
  title,
  value,
  rating,
}: {
  title: string;
  value: string;
  rating: Boolean;
}) {
  return (
    <div className="paragraph mb-4">
      <p className="text-base text-white font-light text-xs tracking-wide uppercase">
        {title}
      </p>
      <p
        className={`text-base text-white text-xl font-semibold capitalize break-words w-115 ${
          rating && "text-leaf-green"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

interface DonationInfoProps {
  openModal: (type: "edit" | "donation") => void;
}

type IconButtonProps = {
  url: string;
  Icon: any;
  color: string;
  size: string | number;
};

function IconButton(props: IconButtonProps) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey"
    >
      <props.Icon color="#3FA9F5" size={props.size} />
    </a>
  );
}

export function DonationInfo({ openModal }: DonationInfoProps) {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const profile = useProfile(charity_addr);
  // const sdg = unsdgs[+profile.un_sdg];

  const wallet = useConnectedWallet();
  const isCharityOwner =
    wallet && wallet.walletAddress === profile.charity_owner;

  const stats = useMemo(() => {
    return [
      {
        title: "Registration#",
        value: profile.charity_registration_number,
        rating: false,
      },
      {
        title: "Headquarters",
        value: profile.country_city_origin,
        rating: false,
      },
      // {
      //   title: " annual avg overhead",
      //   value: profile.average_annual_budget,
      //   rating: false,
      // },
      {
        title: " annual avg donations",
        value: profile.annual_revenue,
        rating: false,
      },
      {
        title: " # of employees",
        value: profile.number_of_employees,
        rating: false,
      },
      {
        title: " navigator rating",
        value: profile.charity_navigator_rating || "N/A",
        rating: true,
      },
    ];
  }, [profile]);

  return (
    <div className="font-heading flex flex-row lg:flex-col self-start justify-between 2xl:p-0 2xl:justify-start lg:mt-0  2xl:flex-col 2xl:w-130 py-2">
      <div className="flex flex-col xl:w-128 2xl:min-h-1/2 bg-transparent px-0 2xl:px-10 mt-10 lg:mt-0 2xl:mt-0">
        {/* <span className="inline-block text-center text-sm py-3 px-3 max-w-250 font-semibold uppercase text-gray-200 bg-angel-blue bg-opacity-50 hover:bg-opacity-30 rounded-2xl border-t border-b border-opacity-20 2xl:-mt-4">
          SDG #{profile.un_sdg}: {sdg.title}
        </span> */}
        <h2 className="text-4xl font-bold text-white uppercase tracking-wide">
          {profile.charity_name}
        </h2>
        <div className="flex flex-col items-start sm:items-center sm:flex-wrap sm:flex-row  gap-4 mt-4">
          {isCharityOwner && (
            <button
              onClick={() => openModal("edit")}
              className="disabled:bg-grey-accent uppercase bg-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center"
            >
              Edit Profile
            </button>
          )}
          <button
            disabled={profile.is_placeholder}
            onClick={() => openModal("donation")}
            className="disabled:bg-grey-accent uppercase bg-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center"
          >
            DONATE NOW
          </button>
          {/* create a customizable IconButton component to replace all occurrences of this */}
          <div className="flex flex-row gap-2 lg:gap-5 lg:-mt-2 items-start lg:justify-start">
            {profile.twitter_handle && (
              <IconButton
                url={`https://twitter.com/${profile.twitter_handle}`}
                size={25}
                color="#3FA8F5"
                Icon={FaTwitter}
              />
            )}
            {profile.linkedin_page && (
              <IconButton
                url={`https://linkedin.com/${profile.linkedin_page}`}
                size={25}
                color="#3FA8F5"
                Icon={FaLinkedinIn}
              />
            )}
            {profile.facebook_page && (
              <IconButton
                url={`https://facebook.com/${profile.facebook_page}`}
                size={25}
                color="#3FA8F5"
                Icon={FaFacebookSquare}
              />
            )}
          </div>
        </div>
      </div>
      {/* charity stats */}

      <div className="flex flex-col h-full 2xl:h-80 px-0 2xl:px-10 lg:mt-10 hidden lg:block">
        {stats.map(({ title, value, rating }: any, i: number) => (
          <StatsItem
            key={i}
            title={title}
            value={value}
            rating={rating}
          ></StatsItem>
        ))}
      </div>

      {/* charity stats */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeInfoModal}
        contentLabel="Example Modal"
        className="absolute inset-1/2 bottom-auto right-auto max-w-4/5 min-h-modal rounded-3xl bg-white transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-center">
          <div className="p-4 mx-auto text-thin-blue">
            <h2 className="text-2xl uppercase font-bold mb-2">charity info</h2>
            <CharityInfo />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
