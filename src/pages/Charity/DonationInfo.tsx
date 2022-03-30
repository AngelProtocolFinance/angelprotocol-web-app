import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import { useEndowmentCWs } from "services/terra/account/queriers";
import { useMember } from "services/terra/admin/queriers";
import useDonater from "components/Transactors/Donater/useDonater";
import {
  DonationInfoLoader,
  DonationStatsLoader,
} from "components/Loader/Charity";
import { unsdgs } from "constants/unsdgs";
import { app, site } from "constants/routes";
import { CharityParam } from "./types";
import Icon, { getIcon } from "components/Icons/Icons";

export function DonationInfo() {
  const { address: charity_addr } = useParams<CharityParam>();
  const showDonater = useDonater({ to: "charity", receiver: charity_addr! });
  const { profileState, isProfileLoading } = useProfileState(charity_addr!);
  const { cwContracts, isCWContractsLoading } = useEndowmentCWs(charity_addr);
  const { member } = useMember(cwContracts, isCWContractsLoading);
  const isUserAdminMember = !!member.weight;

  const sdg = unsdgs[+profileState.un_sdg];

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
      {
        title: " avg annual Budget",
        value: profileState.average_annual_budget || "N/A",
        rating: false,
      },
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
          <Link
            to={`${site.app}/${app.marketplace}`}
            className="flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue mb-4"
          >
            <Icon type="ArrowBack" size={15} /> back to marketplace
          </Link>
          {profileState.un_sdg && (
            <span className="inline-block text-center text-sm py-3 px-3 max-w-250 font-bold tracking-wide uppercase text-white bg-angel-blue/50 hover:bg-angel-blue/30 rounded-2xl mb-4">
              SDG #{profileState.un_sdg}: {sdg?.title}
            </span>
          )}
          <a
            href={profileState.url || ""}
            target="_blank"
            rel="noreferrer"
            className={`text-3xl font-bold text-white uppercase tracking-wide break-words ${
              profileState.url && "hover:text-angel-blue"
            }`}
          >
            <span>{profileState.charity_name}</span>
            {profileState.url && (
              <Icon
                type="ExternalLink"
                className="inline ml-2 mt-1"
                size={15}
              />
            )}
          </a>
          <div className="flex flex-row gap-2 mt-4">
            {isUserAdminMember && (
              <Link
                to={`${site.app}/${app.charity_edit}/${charity_addr}`}
                className="bg-orange uppercase text-white font-semibold rounded-xl md:w-48 w-52 h-12 flex justify-center items-center"
              >
                EDIT PROFILE
              </Link>
            )}
            {isUserAdminMember && (
              <Link
                to={`${site.app}/${app.endowment_admin}/${charity_addr}`}
                className="bg-orange uppercase text-white font-semibold rounded-xl md:w-48 w-52 h-12 flex justify-center items-center"
              >
                ADMIN
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
                  url={formatUrl(profileState.twitter_handle, "twitter")}
                  size={25}
                  color="#3FA8F5"
                  Icon={getIcon("Twitter")}
                />
              )}
              {profileState.linkedin_page && (
                <IconButton
                  url={formatUrl(profileState.linkedin_page, "linkedin")}
                  size={25}
                  color="#3FA8F5"
                  Icon={getIcon("Linkedin")}
                />
              )}
              {profileState.facebook_page && (
                <IconButton
                  url={formatUrl(profileState.facebook_page, "facebook")}
                  size={25}
                  color="#3FA8F5"
                  Icon={getIcon("Facebook")}
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

function formatUrl(
  url: string,
  socialMedia: "facebook" | "linkedin" | "twitter"
) {
  if (/http/.test(url)) {
    return url;
  } else {
    return `https://${socialMedia}.com/${url}`;
  }
}
