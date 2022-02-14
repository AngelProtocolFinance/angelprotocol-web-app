import { useConnectedWallet } from "@terra-money/wallet-provider";
import { unsdgs } from "pages/Fund/unsdgs";
import { useMemo } from "react";
import {
  FaExternalLinkAlt,
  FaFacebookSquare,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link, useRouteMatch } from "react-router-dom";
import { CharityParam } from "./types";
import {
  DonationInfoLoader,
  DonationStatsLoader,
} from "components/Loader/Charity";
import { app, site } from "types/routes";
import useDonater from "components/Transactors/Donater/useDonater";
import { useProfileState } from "services/aws/endowments/states";

export function DonationInfo() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const showDonater = useDonater({ to: "charity", receiver: charity_addr });
  const { profileState, isProfileLoading } = useProfileState(charity_addr);
  const sdg = unsdgs[+profileState.un_sdg];

  const wallet = useConnectedWallet();
  const isCharityOwner =
    wallet && wallet.walletAddress === profileState.charity_owner;

  const stats = useMemo(() => {
    return [
      {
        title: "Registration#",
        value: profileState.charity_registration_number || "N/A",
        rating: false,
      },
      {
        title: "Headquarters",
        value: profileState.country_city_origin || "N/A",
        rating: false,
      },
      // {
      //   title: " annual avg overhead",
      //   value: profileState.average_annual_budget,
      //   rating: false,
      // },
      {
        title: " annual avg donations",
        value: profileState.annual_revenue || "N/A",
        rating: false,
      },
      {
        title: " # of employees",
        value: profileState.number_of_employees || "N/A",
        rating: false,
      },
      {
        title: " navigator rating",
        value: profileState.charity_navigator_rating || "N/A",
        rating: true,
      },
    ];
  }, [profileState]);

  return (
    <div className="font-heading flex flex-row lg:flex-col self-start justify-between 2xl:p-0 2xl:justify-start lg:mt-0  2xl:flex-col 2xl:w-130">
      {isProfileLoading ? (
        <DonationInfoLoader />
      ) : (
        <div className="flex flex-col xl:w-128 2xl:min-h-1/2 bg-transparent px-0 2xl:px-10 mt-10 lg:mt-0 2xl:mt-0">
          {profileState.un_sdg && (
            <span className="inline-block text-center text-sm py-3 px-3 max-w-250 font-bold tracking-wide uppercase text-white bg-angel-blue bg-opacity-50 hover:bg-opacity-30 rounded-2xl mb-4">
              SDG #{profileState.un_sdg}: {sdg?.title}
            </span>
          )}
          {profileState.url ? (
            <a
              href={profileState.url}
              target="_blank"
              rel="noreferrer"
              className="text-5xl font-bold text-white uppercase tracking-wide hover:text-angel-blue"
            >
              <span>{profileState.charity_name}</span>
              <FaExternalLinkAlt className="inline ml-2 mt-1" size={15} />
            </a>
          ) : (
            <h2 className="text-5xl font-bold text-white uppercase tracking-wide">
              {profileState.charity_name}
            </h2>
          )}
          <div className="flex flex-row gap-2 mt-4">
            {isCharityOwner && (
              <Link
                to={`${site.app}/${app.charity_edit}/${charity_addr}`}
                className="disabled:bg-grey-accent uppercase bg-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 flex justify-center items-center block"
              >
                Edit Profile
              </Link>
            )}
            <button
              disabled={profileState.is_placeholder}
              onClick={showDonater}
              className="disabled:bg-grey-accent uppercase bg-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center"
            >
              DONATE NOW
            </button>
            {/* create a customizable IconButton component to replace all occurrences of this */}
            <div className="flex flex-row gap-2 lg:mb-2 ml-2 items-center lg:items-start lg:justify-start">
              {profileState.twitter_handle && (
                <IconButton
                  url={`https://twitter.com/${profileState.twitter_handle}`}
                  size={25}
                  color="#3FA8F5"
                  Icon={FaTwitter}
                />
              )}
              {profileState.linkedin_page && (
                <IconButton
                  url={`https://linkedin.com/${profileState.linkedin_page}`}
                  size={25}
                  color="#3FA8F5"
                  Icon={FaLinkedinIn}
                />
              )}
              {profileState.facebook_page && (
                <IconButton
                  url={`https://facebook.com/${profileState.facebook_page}`}
                  size={25}
                  color="#3FA8F5"
                  Icon={FaFacebookSquare}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {/* charity stats */}

      <div className="flex flex-col h-full 2xl:h-80 px-0 2xl:px-10 lg:mt-10 hidden lg:block">
        {isProfileLoading ? (
          <DonationStatsLoader />
        ) : (
          <>
            {stats.map(({ title, value, rating }: any, i: number) => (
              <StatsItem
                key={i}
                title={title}
                value={value}
                rating={rating}
              ></StatsItem>
            ))}
          </>
        )}
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
      className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey"
    >
      <props.Icon color="#3FA9F5" size={props.size} />
    </a>
  );
}
